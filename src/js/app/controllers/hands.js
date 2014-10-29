define(['models_hand',
        'can/control',
	'can/view',
	'can/view/stache'], function(Hand, Control, View) {
    return Control.extend({
	init: function() {
	    this.data = {};
	    this.list_template = View.view.render("hands_list_template");
	    this.edit_template = View.view.render("hands_edit_template");
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

		that.render(that.list_template, data);
	    });
	},
	edit: function(id) {
	    var that = this;

	    Hand.findOne({id: id}, function(hand) {
		var data = {
		    hand: hand
		}

		that.render(that.edit_template, data);
	    })
	},
	render: function(template, data) {
	    var rendered = template(data, { 
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
