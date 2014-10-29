define(['can/model'], function(Model) {
    return Model.extend({
        findAll: 'GET /hands',
        findOne: 'GET /hands/{id}',
        create: 'POST /hands',
        update: 'PUT /hands/{id}',
        destroy: 'DELETE /hands/{id}'
    }, {});
});
