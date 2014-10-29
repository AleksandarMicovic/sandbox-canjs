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

	models_hand: "app/models/hand",
	models_crop: "app/models/crop",
	models_livestock: "app/models/livestock",


	// Views
	// No "real" JS views as they're stored in index.html as templates.

	// Controllers

	controllers_dashboard: "app/controllers/dashboard",
	controllers_livestock: "app/controllers/livestock",
	controllers_crops: "app/controllers/crops",
	controllers_hands: "app/controllers/hands",

	// Fixture

	fixture: "app/fixture"
}, shim: {
	bootstrap: {
		deps: ['jquery']
	}
}});

require([
	'jquery',
	'app',
	'bootstrap',
	'fixture'
	], function($, App) {
		$(function() {
			app = new App();
		});
	});
