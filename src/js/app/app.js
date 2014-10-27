define(['can/construct',
	'router'], function(Construct, Router) {
    return Construct.extend({
	init: function() {
	    var router = new Router();
	}
    });
});
