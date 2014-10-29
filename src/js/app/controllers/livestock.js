define(['models_livestock',
    'can/control',
    'can/view',
    'can/view/stache'], function(Livestock, Control, View) {
        return Control.extend({
            init: function(content) {
                this.model = null;

                // We only have two templates to worry about. So we pre-build them here
                // for spped. We'll be passing in data contexts later.

                this.list_template = View.view.render("livestock_list_template");
                this.edit_template = View.view.render("livestock_edit_template");
            },

            /////////////
            // ROUTING //
            /////////////

            'livestock/:id route': function(data) {
                // Because livestock/3 and livestock/new both match livestock/:id, we
                // make the distinction between them here. A "create" context is
                // passed to the same edit template to change things around to make it more
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

            '#create-livestock click': function(el, ev) {
                // This event listens for the create button on the create screen
                // to be clicked.

                ev.preventDefault();
                ev.stopPropagation();

                // We could serialize JSON, but it's a bit uglier since the standard
                // jQuery serializer serializes to URL, and to get a JSON serialization
                // the data has to be massaged. Not worth it for four attributes.

                this.model = new Livestock({
                    animal_type: $("[name=animal_type]").val(),
                    quantity: $("[name=quantity]").val(),
                    gps_latitude: $("[name=gps_latitude]").val(),
                    gps_longitude: $("[name=gps_longitude]").val()
                });

                // Once we successfully create a new livestock, go back (or "redirect")
                // back to the livestock page.

                this.model.save(function(livestock) {
                    window.location.hash = "#!livestock"
                });              
            },

            '#delete-livestock click': function(el, ev) {
                // This event listens for the delete button on the edit screen to be
                // clicked.

                var that = this;

                // Once we have successfully deleted a livestock, go back (or "redirect")
                // to the livestock page.

                this.model.destroy(function() {
                    that.model = null;
                    window.location.hash = "#!livestock"
                });
            },

            '#edit-livestock click': function(el, ev) {
                // This event lists for the edit button on the edit screen to be clicked.

                ev.preventDefault();
                ev.stopPropagation();

                // We could serialize JSON, but it's a bit uglier since the standard
                // jQuery serializer serializes to URL, and to get a JSON serialization
                // the data has to be massaged. Not worth it for four attributes.

                this.model.attr("animal_type", $("[name=animal_type]").val());
                this.model.attr("quantity", $("[name=quantity]").val());
                this.model.attr("gps_latitude", $("[name=gps_latitude]").val());
                this.model.attr("gps_longitude", $("[name=gps_longitude]").val());

                // Once we have successfully updated a livestock, go back (or "redirect")
                // to the livestock page.

                this.model.save(function(livestock) {
                    window.location.hash = "#!livestock"
                });
            },

            /////////////
            // METHODS //
            /////////////

            list: function() {
                // This is the main livestock page, where we list all livestock.

                var livestock = [];
                var that = this;

                Livestock.findAll({}, function(response) {
                    $.each(response, function(i, animal) {
                        // Deleted entries still retain undefined in fixtures, so
                        // we need to be sure to skip them.

                        livestock.push(animal);
                    });

                    var data = {
                        livestock: livestock
                    };

                    // Once we have gathered our livestock, render them to the page.

                    that.render(that.list_template, data);
                });
            },

            edit: function(id) {
                // This is the edit part of the livestock page, where the user selected a
                // livestock to edit.

                var that = this;

                Livestock.findOne({id: id}, function(livestock) {
                    // Because our editing template is two-faced, make sure to disable the
                    // create switch, because we want to use the edit template for editing.

                    var data = {
                        livestock: livestock,
                        create: false
                    }

                    that.model = Livestock.parseModel(livestock);
                    that.render(that.edit_template, data);
                })
            },

            render: function(template, data) {
                // Render our template to the screen!

                var rendered = template(data, {});

                $("#content").fadeOut(250, function() {
                    $("#content").html("");
                    $("#content").html(rendered);
                    $("#content").fadeIn(250);
                });    
            }
        });
});
