// A farm hand is a regular farm employee who also dabbles in physical
// labour, should it be required. Here, we define all methods used to
// interact with the API.

define(['can/model'], function(Model) {
    return Model.extend({
        findAll: 'GET /hands',
        findOne: 'GET /hands/{id}',
        create: 'POST /hands',
        update: 'PUT /hands/{id}',
        destroy: 'DELETE /hands/{id}'
    }, {});
});
