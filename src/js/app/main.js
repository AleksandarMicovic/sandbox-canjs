// Define a list of all modules in our project, along with dependencies,
// if any exist.

require.config({
    baseUrl: "js/",
    paths: {
        // Libraries (vendor/third-party)

        jquery: "vendor/jquery/jquery.min",
        bootstrap: "vendor/bootstrap/bootstrap.min",
        can: "vendor/can/can",

        // App (the backbone of the application)

        app: "app/app",
        router: "app/router",
        fixture: "app/fixture",

        // Models (the M in MVC)

        models_hand: "app/models/hand",
        models_crop: "app/models/crop",
        models_livestock: "app/models/livestock",


        // Views (the V in MVC)
        // No "real" JS views as they're stored in index.html as templates.

        // Controllers (the C in MVC)

        controllers_dashboard: "app/controllers/dashboard",
        controllers_livestock: "app/controllers/livestock",
        controllers_crops: "app/controllers/crops",
        controllers_hands: "app/controllers/hands"

    }, shim: {
        bootstrap: {
            deps: ['jquery']
        }
    }
});

require(['jquery', 'app', 'bootstrap', 'fixture' ], function($, App) {
    $(function() {
        // Elegant single point of entry. Nobody is stepping on anybody's toes.
        app = new App();
    });
});
