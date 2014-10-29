require(['can/util/fixture'], function(Fixture) {
    /////////////
    // HELPERS //
    /////////////

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

    var CROP_TYPES = [
        "apple orchard", "corn field", "strawberry patches", "wheat field"
    ];

    var LIVESTOCK_TYPES = [
        "cows", "chickens", "turkeys", "pigs", "horses"
    ];

    ///////////
    // HANDS //
    ///////////

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
        };
    });

    // Instead of repeating queries in fixtures below, resolve Fixture.store first.

    var hands = [];

    $.each(HANDS.findAll(), function(i, hand) {
        hands.push(hand);
    });

    hands = hands[3];

    Fixture('GET /hands', function(request, response) {
        response(hands);
    });

    Fixture('GET /hands/{id}', function(request, response) {
        response(hands[request.data.id]);
    });

    Fixture('PUT /hands/{id}', function(request, response) {
        can.extend(hands[request.data.id], request.data);
        response({});
    });

    Fixture('POST /hands', function(request, response) {
        hands.push({
            id: hands.length,
            name: request.data.name,
            title: request.data.title,
            gps_latitude: 44.8100145,
            gps_longitude: 20.4010089,
            working_now: request.data.working_now,
            task: request.data.task,
            picture: "assets/images/avatar.png",
            current_map: "assets/images/maps/map_" + Fixture.rand(1, 8) + ".png"
        });
        response(hands[hands.length-1]);
    });

    Fixture('DELETE /hands/{id}', function(request, response) {
        delete hands[request.data.id];
        response({});
    });

    ///////////
    // CROPS //
    ///////////

    var CROPS = Fixture.store(8, function(i) {
        return {
            id: i,
            type_of_crop: Fixture.rand(CROP_TYPES, 1)[0],
            gps_latitude: 44.8100145,
            gps_longitude: 20.4010089,
            width: Fixture.rand(1, 4),
            length: Fixture.rand(1, 4),
            average_yield: Fixture.rand(500, 10000),
            location: "assets/images/maps/map_" + Fixture.rand(1, 8) + ".png"
        };
    });

    // Instead of repeating queries in fixtures below, resolve Fixture.store first.

    var crops = [];

    $.each(CROPS.findAll(), function(i, crop) {
        crops.push(crop);
    });

    crops = crops[3];

    Fixture('GET /crops', function(request, response) {
        response(crops);
    });

    Fixture('GET /crops/{id}', function(request, response) {
        response(crops[request.data.id]);
    });

    Fixture('PUT /crops/{id}', function(request, response) {
        can.extend(crops[request.data.id], request.data);
        response({});
    });

    Fixture('POST /crops', function(request, response) {
        crops.push({
            id: crops.length,
            type: request.data.type_of_crop,
            average_yield: request.data.average_yield,
            location: "assets/images/maps/map_" + Fixture.rand(1, 8) + ".png",
            width: request.data.width,
            length: request.data.width
        });
        response(crops[crops.length-1]);
    });

    Fixture('DELETE /crops/{id}', function(request, response) {
        delete crops[request.data.id];
        response({});
    });

    ///////////////
    // LIVESTOCK //
    ///////////////

    var LIVESTOCK = Fixture.store(3, function(i) {
        return {
            id: i,
            location: "assets/images/maps/map_" + Fixture.rand(1, 8) + ".png",
            animal_type: Fixture.rand(LIVESTOCK_TYPES, 1)[0],
            quantity: Fixture.rand(20, 150),
            gps_latitude: 44.8100145,
            gps_longitude: 44.8100145
        };
    });

    // Instead of repeating queries in fixtures below, resolve Fixture.store first.

    var livestock = [];

    $.each(LIVESTOCK.findAll(), function(i, animal) {
        livestock.push(animal);
    });

    livestock = livestock[3];

    Fixture('GET /livestock', function(request, response) {
        response(livestock);
    });

    Fixture('GET /livestock/{id}', function(request, response) {
        response(livestock[request.data.id]);
    });

    Fixture('PUT /livestock/{id}', function(request, response) {
        can.extend(livestock[request.data.id], request.data);
        response({});
    });

    Fixture('POST /livestock', function(request, response) {
        livestock.push({
            id: livestock.length,
            location: "assets/images/maps/map_" + Fixture.rand(1, 8) + ".png",
            animal_type: request.data.animal_type,
            quantity: request.data.quantity,
            gps_latitude: request.data.gps_latitude,
            gps_longitude: request.data.gps_longitude
        });
        response(livestock[livestock.length-1]);
    });

    Fixture('DELETE /livestock/{id}', function(request, response) {
        delete livestock[request.data.id];
        response({});
    });
});
