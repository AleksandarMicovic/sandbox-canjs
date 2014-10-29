define(['models_crop',
    'can/control',
    'can/view',
    'can/view/stache'], function(Crop, Control, View) {
        return Control.extend({
            init: function(content) {
                this.data = {};
                this.model = null;
                this.list_template = View.view.render("crops_list_template");
                this.edit_template = View.view.render("crops_edit_template");
            },

            'crops/:id route': function(data) {
                if (data.id === "new") {
                    this.render(this.edit_template, {
                        create: true
                    });
                } else {
                    this.edit(data.id);   
                }
            },

            '#create-crop click': function(el, ev) {
                ev.preventDefault();
                ev.stopPropagation();

                this.model = new Crop({
                    type_of_crop: $("[name=type_of_crop]").val(),
                    gps_latitude: $("[name=gps_latitude]").val(),
                    gps_longitude: $("[name=gps_longitude]").val(),
                    average_yield: $("[name=average_yield]").val(),
                    width: $("[name=width]").val(),
                    length: $("[name=length]").val()
                });

                this.model.save(function(crop) {
                    window.location.hash = "#!crops"
                });              
            },

            '#delete-crop click': function(el, ev) {
                var that = this;

                this.model.destroy(function() {
                    that.model = null;
                    window.location.hash = "#!crops"
                });
            },

           '#edit-crop click': function(el, ev) {
                ev.preventDefault();
                ev.stopPropagation();

                // Better to use binding here to track for changes, but for readability
                // and organization, we'll just do everything one-by-one.

                this.model.attr("type_of_crop", $("[name=type_of_crop]").val());
                this.model.attr("gps_latitude", $("[name=gps_latitude]").val());
                this.model.attr("gps_longitude", $("[name=gps_longitude]").val());
                this.model.attr("average_yield", $("[name=average_yield]").val());
                this.model.attr("width", $("[name=width]").val());
                this.model.attr("length", $("[name=length]").val());

                this.model.save(function(hand) {
                    window.location.hash = "#!crops"
                });
            },

            list: function() {
                var crops = [];
                var that = this;

                Crop.findAll({}, function(response) {
                    var counter = 0;
                    $.each(response, function(i, crop) {
                        // Deleted entries still retain undefined in fixtures.
                        crops.push(crop);
                    });

                    var data = {
                        crops: crops
                    };

                    that.render(that.list_template, data);
                });
            },

            edit: function(id) {
                var that = this;

                Crop.findOne({id: id}, function(crop) {
                    var data = {
                        crop: crop,
                        create: false
                    }

                    that.model = Crop.parseModel(crop);
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
