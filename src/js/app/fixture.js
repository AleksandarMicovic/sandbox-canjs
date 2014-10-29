require(['can/util/fixture'], function(Fixture) {
    var FIRST_NAMES = [
	"Dion", "Nazem", "Ivan", "Katarina", "John", "Akiho",
	"Alice", "Emily", "Phil", "David", "Mark", "Joffrey"
    ];

    var LAST_NAMES = [
	"Phaneuf", "Kadri", "Kessel", "Gardiner", "Clarkson", "Bozak",
	"Van-Riemsdyk", "Lupul", "Franson", "Winnik", "Reimer", "Bernier"
    ];

    var JOBS = [
	"Picker", "Driver", "Manager", "Herder", "Animal Specialist", "Scientist"
    ];

    var TASKS = [
	"picking corn", "picking apples", "picking strawberries", "feeding cows",
	"feeding chickens", "driving", "unpacking", "packing", "auditing"
    ];

    var HANDS = Fixture.store(15, function(i) {
	return {
	    id: i,
	    name: Fixture.rand(FIRST_NAMES, 1)[0] + " " + Fixture.rand(LAST_NAMES, 1)[0],
	    title: Fixture.rand(JOBS, 1)[0],
	    gps_latitude: 44.8100145,
	    gps_longitude: 20.4010089,
	    working_now: Fixture.rand([true, false], 1)[0],
	    task: Fixture.rand(TASKS, 1)[0],
	    picture: "assets/images/avatar.png",
	    current_map: "assets/images/maps/map_" + Fixture.rand(1, 8) + ".png"
	}
    });

    // Build individual lists that are going to be used app-wide.

    var hands = [];

    $.each(HANDS.findAll(), function(i, hand) {
	hands.push(hand);
    });

    hands = hands[3];

    Fixture('GET /hands', function(request, response) {
	return hands;
    });

    Fixture('GET /hands/{id}', function(request, response) {
	return hands[request.data.id];
    });
});
