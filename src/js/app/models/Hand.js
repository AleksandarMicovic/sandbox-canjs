define(['can/model'], function(Model) {
    return Model.extend({
        findAll: 'GET something',
        create: 'POST something',
        update: 'PUT something',
        destroy: 'DELETE something'
    }, {});
});
