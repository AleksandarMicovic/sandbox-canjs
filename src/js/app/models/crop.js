// A crop is a field on a farm. Usually crops are devoted to one
// product such as raspberries. Here, we define all methods used to
// interact with the API.

define(['can/model'], function(Model) {
    return Model.extend({
        findAll: 'GET /crops',
        findOne: 'GET /crops/{id}',
        create: 'POST /crops',
        update: 'PUT /crops/{id}',
        destroy: 'DELETE /crops/{id}'
    }, {});
});
