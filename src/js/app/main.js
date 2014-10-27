require.config({
    baseUrl: "js/",
    paths: {
	// Libraries

	jquery: "vendor/jquery/jquery.min",
	bootstrap: "vendor/bootstrap/bootstrap.min",
	can: "vendor/can/can",

	// App

	app: "app/app",
	router: "app/router",

	// Models

	// Views
	// No "real" JS views as they're stored in index.html as templates.

	// Controllers

	controllers_dashboard: "app/controllers/dashboard",
	controllers_livestock: "app/controllers/livestock"
    },
    shim: {
        bootstrap: {
	    deps: ['jquery']
	}
    }
});

require([
    'jquery',
    'app',
    'bootstrap'
], function($, App) {
    $(function() {
	app = new App();
    });
});
