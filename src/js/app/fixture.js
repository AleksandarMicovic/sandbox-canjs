require(['can/util/fixture'], function(Fixture) {
    var HANDS = [
	{
	    id: "a1ec23e9b9ab43a88222d9949ee26499",
	    name: "Jovan Jovanavić",
	    age: 25
	},
	{
	    id: "djnkasdlassdsdndk",
	    name: "Ai Watanabe",
	    age: 29
	},
	{
	    id: "djnkasdlaasdsndk",
	    name: "Chris Christian",
	    age: 29
	},
	{
	    id: "djnkasdsadlasndk",
	    name: "Pamela Spamela",
	    age: 29
	}
    ];

    Fixture('GET /hands', function(request, response) {
	return HANDS;
    });
});
