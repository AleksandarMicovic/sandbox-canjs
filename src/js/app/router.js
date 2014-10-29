define(['can/route',
	'can/control',
	'controllers_dashboard',
	'controllers_livestock',
	'controllers_crops',
	'controllers_hands',
	'can/control/route',
	], 
	function(Route,
		Control,
		Dashboard,
		Livestock,
		Crops,
		Hands) {

			var views = {
				dashboard: new Dashboard("#content"),
				livestock: new Livestock("#content"),
				crops: new Crops("#content"),
				hands: new Hands("#content"),
			}

			Route(":page");
			Route("page/:id");

			Route.ready();

			var params = Route.deparam(window.location.hash);
			var page = window.location.hash.replace("#!", "");

			if (!$.isEmptyObject(params)) {
				if (!params.id) {
					views[page].list();
				}
				$(".nav [data-item=" + page + "]").parent().addClass("active");
			} else if (page === "") {
				views.dashboard.list();
			}

			return Control.extend({
				init: function() {
				},
				':page route': function(data) {
					views[data.page].list();

					$("#navigation li").removeClass("active");
					$(".nav [data-item=" + Route.attr('page') + "]").parent().addClass("active");
				},
				
			});
});
