// Livestock are essential to a farm, and can be any type of animal
// for any kind of purpose. Here, we define all methods used to
// interact with the API.

define(['can/model'], function(Model) {
    return Model.extend({
        findAll: 'GET /livestock',
        findOne: 'GET /livestock/{id}',
        create: 'POST /livestock',
        update: 'PUT /livestock/{id}',
        destroy: 'DELETE /livestock/{id}'
    }, {});
});
