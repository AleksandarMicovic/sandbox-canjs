define(['models_crop', 'can/control', 'can/view', 'can/view/stache'], function(Crop, Control, View) {
    return Control.extend({
        init: function(content) {
            this.model = null;

            // We only have two templates to worry about. So we pre-build them here
            // for spped. We'll be passing in data contexts later.

            this.list_template = View.view.render("crops_list_template");
            this.edit_template = View.view.render("crops_edit_template");
        },

        /////////////
        // ROUTING //
        /////////////

        'crops/:id route': function(data) {
            // Because crops/3 and crops/new both match cropk/:id, we make the
            // distinction between them here. A "create" context is passed to
            // the same edit template to change things around to make it more
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

        '#create-crop click': function(el, ev) {
            // This event listens for the create button on the create screen
            // to be clicked.

            ev.preventDefault();
            ev.stopPropagation();

            // We could serialize JSON, but it's a bit uglier since the standard
            // jQuery serializer serializes to URL, and to get a JSON serialization
            // the data has to be massaged. Not worth it for six attributes.

            this.model = new Crop({
                type_of_crop: $("[name=type_of_crop]").val(),
                gps_latitude: $("[name=gps_latitude]").val(),
                gps_longitude: $("[name=gps_longitude]").val(),
                average_yield: $("[name=average_yield]").val(),
                width: $("[name=width]").val(),
                length: $("[name=length]").val()
            });

            // Once we successfully create a new crop, go back (or "redirect")
            // back to the crops page.

            this.model.save(function(crop) {
                window.location.hash = "#!crops"
            });              
        },

        '#delete-crop click': function(el, ev) {
            // This event listens for the delete button on the edit screen to be
            // clicked.

            var that = this;

            // Once we have successfully deleted a crop, go back (or "redirect")
            // to the crops page.


            this.model.destroy(function() {
                that.model = null;
                window.location.hash = "#!crops"
            });
        },

        '#edit-crop click': function(el, ev) {
            ev.preventDefault();
            ev.stopPropagation();

            // We could serialize JSON, but it's a bit uglier since the standard
            // jQuery serializer serializes to URL, and to get a JSON serialization
            // the data has to be massaged. Not worth it for four attributes.

            this.model.attr("type_of_crop", $("[name=type_of_crop]").val());
            this.model.attr("gps_latitude", $("[name=gps_latitude]").val());
            this.model.attr("gps_longitude", $("[name=gps_longitude]").val());
            this.model.attr("average_yield", $("[name=average_yield]").val());
            this.model.attr("width", $("[name=width]").val());
            this.model.attr("length", $("[name=length]").val());

            // Once we have successfully updated a crop, go back (or "redirect")
            // to the crops page.

            this.model.save(function(crop) {
                window.location.hash = "#!crops"
            });
        },

        /////////////
        // METHODS //
        /////////////

        list: function() {
            // This is the main crops page, where we list all crops.

            var crops = [];
            var that = this;

            Crop.findAll({}, function(response) {
                var counter = 0;
                $.each(response, function(i, crop) {
                    // Deleted entries still retain undefined in fixtures, so
                    // we need to be sure to skip them.   

                    if (crop != undefined) {
                        crops.push(crop);
                    }
                });

                var data = {
                    crops: crops
                };

                // Once we have gathered our crops, render them to the page.

                that.render(that.list_template, data);
            });
        },

        edit: function(id) {
            // This is the edit part of the crop page, where the user selected a
            // crop to edit.

            var that = this;

            Crop.findOne({id: id}, function(crop) {
                // Because our editing template is two-faced, make sure to disable the
                // create switch, because we want to use the edit template for editing.

                var data = {
                    crop: crop,
                    create: false
                }

                that.model = Crop.parseModel(crop);
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
