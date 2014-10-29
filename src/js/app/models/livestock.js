define(['can/model'], function(Model) {
    return Model.extend({
        findAll: 'GET /livestock',
        findOne: 'GET /livestock/{id}',
        create: 'POST /livestock',
        update: 'PUT /livestock/{id}',
        destroy: 'DELETE /livestock/{id}'
    }, {});
});
