define(['can/construct', 'router'], function(Construct, Router) {
    return Construct.extend({
        init: function() {
            // To get the application going, we need to insantiate the router.
            // Everything else should follow naturally.

            var router = new Router();
        }
    });
});
