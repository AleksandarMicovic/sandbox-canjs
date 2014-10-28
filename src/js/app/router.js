define(['can/route',
	'can/control',
        'controllers_dashboard',
        'controllers_livestock',
        'controllers_crops',
        'controllers_inventory',
        'controllers_hands',
        'controllers_transactions',
       	'can/control/route',
       ], 
       function(Route,
		Control,
		Dashboard,
		Livestock,
		Crops,
		Inventory,
		Hands,
	        Transactions) {


    var dashboard = new Dashboard();
    var livestock = new Livestock();
    var crops = new Crops();
    var inventory = new Inventory();
    var hands = new Hands();
    var transactions = new Transactions();

    Route.ready(false);

    var hash = window.location.hash.replace('#!', '');

    if (hash !== "") {
        Route.attr("page", hash);
    }

    Route.ready(true);

    return Control.extend({
	init: function() {
	    // If there is no route, by default route to the dashboard.

	    if (Route.attr("page") == undefined) {
		Route.attr("page", "dashboard");
	    }
	},
        'li click': function(li) {
	    console.log('dasn');
	},
	'route': function(data) {
	    // Empty route. Ignore, since we default to dashboard.
	},
	':page route': function(data) {
	    if (data.page === "dashboard") {
		dashboard.render();
	    } else if (data.page === "livestock") {
		livestock.render();
	    } else if (data.page === "crops") {
		crops.render();
	    } else if (data.page === "inventory") {
		inventory.render();
	    } else if (data.page === "hands") {
		hands.list();
	    } else if (data.page === "transactions") {
		transactions.render();
	    }

	    // Update navigation.
	    
	    $("#navigation li").removeClass("active");
	    $(".nav [href=#" + data.page + "]").parent().addClass("active");
	}
    });
});
