define(['models_hand',
        'can/control',
	'can/view',
	'can/view/stache'], function(Hand, Control, View) {
    return Control.extend({
	init: function() {
	    this.data = {};
	    this.list_template = View.view.render("hands_list_template");
	    this.current_template = this.list_template;
	},
	list: function() {
	    var hands = [];
	    var that = this;

	    Hand.findAll({}, function(response) {
		$.each(response, function(i, hand) {
		    hand.number = i;
		    hands.push(hand);
		});

		var data = {
		    hands: hands
		}

		console.log(data);

		that.render(data)
	    });
	},
	render: function(data) {
	    var rendered = this.current_template(data, { 
		oddEven: function(input) {
		    return input.context.number % 2 == 0 ? 'col-md-offset-1':'';
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
