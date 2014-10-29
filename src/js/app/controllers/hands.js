define(['models_hand',
    'can/control',
    'can/view',
    'can/view/stache'], function(Hand, Control, View) {
        return Control.extend({
            init: function(content) {
                this.data = {};
                this.model = null;
                this.list_template = View.view.render("hands_list_template");
                this.edit_template = View.view.render("hands_edit_template");
            },

            'hands/:id route': function(data) {
                if (data.id === "new") {
                    this.render(this.edit_template, {
                        create: true
                    });
                } else {
                    this.edit(data.id);   
                }
            },

            '#create click': function(el, ev) {
                ev.preventDefault();
                ev.stopPropagation();

                this.model = new Hand({
                    name: $("[name=name]").val(),
                    title: $("[name=title]").val(),
                    task: $("[name=task]").val(),
                    working_now: $("[name=working_now]").is(":checked")
                });

                this.model.save(function(hand) {
                    window.location.hash = "#!hands"
                });              
            },

            '#delete click': function(el, ev) {
                console.log("deleting!")
                var that = this;

                this.model.destroy(function() {
                    that.model = null;
                    window.location.hash = "#!hands"
                });
            },

            '#edit click': function(el, ev) {
                ev.preventDefault();
                ev.stopPropagation();

                // Better to use binding here to track for changes, but for readability
                // and organization, we'll juse do everything one-by-one.

                this.model.attr("name", $("[name=name]").val());
                this.model.attr("title", $("[name=title]").val());
                this.model.attr("task",  $("[name=task]").val());
                this.model.attr("working_now", $("[name=working_now]").is(":checked"));

                console.log("Trying to save", this.model);

                this.model.save(function(hand) {
                    window.location.hash = "#!hands"
                });
            },

            list: function() {
                var hands = [];
                var that = this;

                Hand.findAll({}, function(response) {
                    var counter = 0;
                    $.each(response, function(i, hand) {
                        // Deleted entries still retain undefined in fixtures.
                        // Because of this, we need to use a separate counter here
                        // since hand.number will not be continuous, which means there
                        // will be problems rendering.

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
                var that = this;

                Hand.findOne({id: id}, function(hand) {
                    var data = {
                        hand: hand,
                        create: false
                    }

                    that.model = Hand.parseModel(hand);
                    that.render(that.edit_template, data);
                })
            },

            render: function(template, data) {
                var rendered = template(data, { 
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
