define(['can/control', 'can/view', 'can/view/stache'], function(Control, View) {
    return Control.extend({
	init: function() {
	    this.data = {};
	    this.render_template = View.view("dashboard_template");
	},
	render: function() {
	    var rendered = this.render_template({}, {});
	    $("#content").html(rendered);
	}
    });
});
