function tagsFactory ($q, hoodie) {
    'ngInject'

    const store = hoodie.store('tag');

    return {
        add: function () {
            return $q.when(store.add.apply(store, arguments));
        },
        update: function () {
            return $q.when(store.update.apply(store, arguments));
        },
        findAll: function () {
            return $q.when(store.findAll.apply(store, arguments));
        },
        remove: function () {
            return $q.when(store.remove.apply(store, arguments));
        }
    };
}

export default function (app) {
    app.factory('tags', tagsFactory);
}