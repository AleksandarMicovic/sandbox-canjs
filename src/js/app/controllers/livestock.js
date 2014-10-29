define(['models_livestock',
    'can/control',
    'can/view',
    'can/view/stache'], function(Livestock, Control, View) {
        return Control.extend({
            init: function(content) {
                this.data = {};
                this.model = null;
                this.list_template = View.view.render("livestock_list_template");
                this.edit_template = View.view.render("livestock_edit_template");
            },

            'livestock/:id route': function(data) {
                if (data.id === "new") {
                    this.render(this.edit_template, {
                        create: true
                    });
                } else {
                    this.edit(data.id);   
                }
            },

            '#create-livestock click': function(el, ev) {
                ev.preventDefault();
                ev.stopPropagation();

                this.model = new Livestock({
                    animal_type: $("[name=animal_type]").val(),
                    quantity: $("[name=quantity]").val(),
                    gps_latitude: $("[name=gps_latitude]").val(),
                    gps_longitude: $("[name=gps_longitude]").val()
                });

                this.model.save(function(livestock) {
                    window.location.hash = "#!livestock"
                });              
            },

            '#delete-livestock click': function(el, ev) {
                var that = this;

                this.model.destroy(function() {
                    that.model = null;
                    window.location.hash = "#!livestock"
                });
            },

           '#edit-livestock click': function(el, ev) {
                ev.preventDefault();
                ev.stopPropagation();

                // Better to use binding here to track for changes, but for readability
                // and organization, we'll just do everything one-by-one.

                this.model.attr("animal_type", $("[name=animal_type]").val());
                this.model.attr("quantity", $("[name=quantity]").val());
                this.model.attr("gps_latitude", $("[name=gps_latitude]").val());
                this.model.attr("gps_longitude", $("[name=gps_longitude]").val());

                this.model.save(function(hand) {
                    window.location.hash = "#!livestock"
                });
            },

            list: function() {
                var livestock = [];
                var that = this;

                Livestock.findAll({}, function(response) {
                    var counter = 0;
                    $.each(response, function(i, animal) {
                        // Deleted entries still retain undefined in fixtures.
                        livestock.push(animal);
                    });

                    var data = {
                        livestock: livestock
                    };

                    that.render(that.list_template, data);
                });
            },

            edit: function(id) {
                var that = this;

                Livestock.findOne({id: id}, function(livestock) {
                    var data = {
                        livestock: livestock,
                        create: false
                    }

                    that.model = Livestock.parseModel(livestock);
                    that.render(that.edit_template, data);
                })
            },

            render: function(template, data) {
                var rendered = template(data, {});

                $("#content").fadeOut(250, function() {
                    $("#content").html("");
                    $("#content").html(rendered);
                    $("#content").fadeIn(250);
                });    
            }
        });
});
