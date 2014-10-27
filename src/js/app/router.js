define(['can/route',
	'can/control',
        'controllers_dashboard',
        'controllers_livestock'], 
       function(router, Control, Dashboard, Livestock) {
    
    return can.Control.extend({
	init: function() {
	    // Instantiate our views first.

	    this.dashboard = new Dashboard();
	    this.livestock = new Livestock();

	    router.ready();

	    this.bind_navigation();
	    this.bind_page_changed();

	    if (router.attr("page") == undefined) {
		router.attr("page", "dashboard");
	    } else {
		this.update_navigation(router.attr("page"));
		this.call_view(router.attr("page"));
	    }
	},
	bind_navigation: function() {
	    $("#navigation a").click(function(ev) {
		ev.preventDefault();
		router.attr("page", $(this).attr("href").substr(1));
	    });
	},
	bind_page_changed: function() {
	    var that = this;

	    router.bind("page", function(ev, new_value) {
		that.update_navigation(new_value);
		that.call_view(new_value);
	    });
	},
	update_navigation: function(value, first_run) {
	    $("#navigation a").each(function() {		    
		var name = $(this).attr('href').substr(1);

		if (name === value) {
		    $(this).parent().addClass("active");
		} else {
		    $(this).parent().removeClass("active");
		}
	    }); 
	},
	call_view: function(value) {
	    if (value === "dashboard") {
		this.dashboard.render();
	    } else if (value == "livestock") {
		this.livestock.render();
	    }
	}
    });
});

