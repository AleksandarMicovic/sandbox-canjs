define(['can/model'], function(Model) {
    return Model.extend({
        findAll: 'GET /crops',
        findOne: 'GET /crops/{id}',
        create: 'POST /crops',
        update: 'PUT /crops/{id}',
        destroy: 'DELETE /crops/{id}'
    }, {});
});
