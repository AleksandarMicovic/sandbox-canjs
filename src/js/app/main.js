require.config({
    baseUrl: "js/",
    paths: {
	jquery: "vendor/jquery/jquery.min",
	bootstrap: "vendor/bootstrap/bootstrap.min",
	can: "vendor/can/can",
	canStache: "vendor/can/can/view/stache"
    },
    shim: {
        bootstrap: {
	    deps: ['jquery']
	}
    }
});

require([
  'jquery',
  'can',
  'canStache',
  'bootstrap'
], function($, can, canStache) {
    $(document).ready(function() {
	alert("sup");
    });
});
