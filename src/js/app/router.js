define(['can/route',
    'can/control',
    'controllers_dashboard',
    'controllers_livestock',
    'controllers_crops',
    'controllers_hands',
    'can/control/route',
    ], 
    function(Route, Control, Dashboard, Livestock, Crops, Hands) {
        // Before setting up a router, we instantiate our views, and store them
        // in an object so that we can more elegantly decide what to render without
        // if-statements in the router.

        var views = {
            dashboard: new Dashboard("#content"),
            livestock: new Livestock("#content"),
            crops: new Crops("#content"),
            hands: new Hands("#content"),
        }

        // Our app is simple enough that we only require two types of routes.

        Route(":page");
        Route("page/:id");

        Route.ready();

        // And finally, now that insantiation is done, we initialize our router. Thanks
        // to bunching up the views earlier, our router is small and elegant, with most
        // work being devoted to properly handling refreshing states.

        return Control.extend({
            init: function() {
                // When refreshing the page, routing does not fire. So, we get the ball
                // rolling here.

                var params = Route.deparam(window.location.hash);
                var page = window.location.hash.replace("#!", "");

                if (!$.isEmptyObject(params)) {
                    // We essentially check here if we're using the first route, and if
                    // so, to render the corresponding view the user is refreshing on.

                    if (!params.id) {
                        views[page].list();
                    }

                    // We should also fill our our navigation, so that it's properly highlighted.

                    $(".nav [data-item=" + page + "]").parent().addClass("active");

                } else if (page === "") {
                    // By default, show the dashboard.

                    Route.attr('page', 'dashboard');
                }
            },
            ':page route': function(data) {
                // Call the appropriate view to take over.

                views[data.page].list();

                // Recolour the navigation bar.

                $("#navigation li").removeClass("active");
                $(".nav [data-item=" + Route.attr('page') + "]").parent().addClass("active");
            },
            
        });
});
