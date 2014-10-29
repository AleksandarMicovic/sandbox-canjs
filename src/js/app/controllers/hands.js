define(['models_hand',
    'can/control',
    'can/view',
    'can/view/stache'], function(Hand, Control, View) {
        return Control.extend({
            init: function(content) {
                this.model = null;

                // We only have two templates to worry about. So we pre-build them here
                // for spped. We'll be passing in data contexts later.

                this.list_template = View.view.render("hands_list_template");
                this.edit_template = View.view.render("hands_edit_template");
            },

            /////////////
            // ROUTING //
            /////////////

            'hands/:id route': function(data) {
                // Because hands/3 and hands/new both match hands/:id, we make the
                // distinction between them here. A "create" context is passed to the
                // same edit template to change things around to make it more
                // appropriate for creating objects, instead of editing.

                if (data.id === "new") {
                    this.render(this.edit_template, {
                        create: true
                    });
                } else {
                    this.edit(data.id);   
                }
            },

            ///////////////
            // LISTENERS //
            ///////////////

            '#create click': function(el, ev) {
                // This event listens for the create button on the create screen
                // to be clicked.

                ev.preventDefault();
                ev.stopPropagation();

                // We could serialize JSON, but it's a bit uglier since the standard
                // jQuery serializer serializes to URL, and to get a JSON serialization
                // the data has to be massaged. Not worth it for four attributes.

                this.model = new Hand({
                    name: $("[name=name]").val(),
                    title: $("[name=title]").val(),
                    task: $("[name=task]").val(),
                    working_now: $("[name=working_now]").is(":checked")
                });

                // Once we successfully create a new hand, go back (or "redirect")
                // back to the hands page.

                this.model.save(function(hand) {
                    window.location.hash = "#!hands"
                });              
            },

            '#delete click': function(el, ev) {
                // This event listens for the delete button on the edit screen to be
                // clicked.

                var that = this;

                // Once we have successfully deleted a hand, go back (or "redirect")
                // to the hands page.

                this.model.destroy(function() {
                    that.model = null;
                    window.location.hash = "#!hands"
                });
            },

            '#edit click': function(el, ev) {
                ev.preventDefault();
                ev.stopPropagation();

                // Better to use binding here to track for changes, but for readability
                // and organization, we'll just do everything one-by-one.

                this.model.attr("name", $("[name=name]").val());
                this.model.attr("title", $("[name=title]").val());
                this.model.attr("task",  $("[name=task]").val());
                this.model.attr("working_now", $("[name=working_now]").is(":checked"));

                // Once we successfully create a new hand, go back (or "redirect")
                // back to the hands page.

                this.model.save(function(hand) {
                    window.location.hash = "#!hands"
                });
            },

            /////////////
            // METHODS //
            /////////////

            list: function() {
                // This is the main hands page, where we list all hands.

                var hands = [];
                var that = this;

                Hand.findAll({}, function(response) {
                    var counter = 0;
                    $.each(response, function(i, hand) {
                        // Deleted entries still retain undefined in fixtures.
                        // Because of this, we also need to use a separate counter
                        // since hand.number will not be continuous, which means there
                        // will be problems rendering. The rendering logic that would fail
                        // would be bootstrap's neat separatingg and position of the two
                        // panels. This is akin to have an odd/even row colouring.

                        if (hand != undefined) {
                            hand.number = counter;
                            hands.push(hand);
                            counter++;
                        }
                    });

                    var data = {
                        hands: hands
                    };

                    that.render(that.list_template, data);
                });
            },

            edit: function(id) {
                // This is the edit part of the hands page, where the user selected a
                // hand to edit.

                var that = this;

                Hand.findOne({id: id}, function(hand) {
                    // Because our editing template is two-faced, make sure to disable the
                    // create switch, because we want to use the edit template for editing.

                    var data = {
                        hand: hand,
                        create: false
                    }

                    that.model = Hand.parseModel(hand);
                    that.render(that.edit_template, data);
                })
            },

            render: function(template, data) {
                // Render our template to the screen!

                var rendered = template(data, { 
                    // Create a helper method, that's similar to odd/even row colourings. 
                    // Only in this case, we'll use it to evenly position elements.

                    oddEven: function(input) {
                        return input.context.number % 2 == 0 ? 'col-md-offset-1' : '';
                    }
                });

                $("#content").fadeOut(250, function() {
                    $("#content").html("");
                    $("#content").html(rendered);
                    $("#content").fadeIn(250);
                });    
            }
        });
});
