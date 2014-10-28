define(['can/model'], function(Model) {
    return Model.extend({
        findAll: 'GET /hands.json',
	findOne: 'GET /hands/{id}.json',
        create: 'POST /hands.json',
        update: 'PUT /hands/{id}.json',
        destroy: 'DELETE /hands/{id}.json'
    }, {});
});
