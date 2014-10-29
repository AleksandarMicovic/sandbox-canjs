define(['models_hand', 'models_livestock', 'can/control', 'can/view', 'can/view/stache'], 
    function(Hand, Livestock, Control, View) {
        return Control.extend({
            init: function() {
                // Our app is very simple. The dashboard really only knows about one template.
                // We pre-build our templates here for speed, and pass in data context later.

                this.render_template = View.view("dashboard_template");
            },
            list: function() {
                // Here is where we render the dashboard.

                var that = this;

                // Here we gather our results -- hands that are working at the moment, and
                // the total number of livestock on our farm.

                var hands = Hand.findAll({}, function(response) {
                    var hands = [];
                    var animals = [];

                    $.each(response, function(i, hand) {
                        // Deleted entries still retain undefined in fixtures, so
                        // we need to be sure to skip them.

                        if (hand != undefined) {
                            if (hand.working_now) {
                                hands.push(hand);
                            }
                        }
                    });

                    Livestock.findAll({}, function(response) {
                        $.each(response, function(i, animal) {

                        // Deleted entries still retain undefined in fixtures, so
                        // we need to be sure to skip them.

                        if (animal != undefined) {
                            animals.push(animal);
                        }
                    }); 

                        var rendered = that.render_template({
                            hands: hands,
                            animals: animals
                        }, {});

                        // Once we've gathered everything, render our template.

                        $("#content").fadeOut(250, function() {
                            $("#content").html("");
                            $("#content").html(rendered);
                            $("#content").fadeIn(250);
                        });                 
                    }); 
                });
            }
        });
    }
);
