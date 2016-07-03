function expensesFactory ($q, hoodie) {
    'ngInject';

    const store = hoodie.store('expense');

    return {
        add: store.add.bind(store),
        update: store.update.bind(store),
        findAll: store.findAll.bind(store),
        find: store.find.bind(store),
        findByMonth
    };

    function findByMonth (date) {
        const year = date.getYear();
        const month = date.getMonth();

        const promise = store.findAll().then((data) =>
            data.filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate.getYear() === year && expenseDate.getMonth() === month;
            })
        );

        return $q.when(promise);
    }
}

export default function (app) {
    app.factory('expenses', expensesFactory);
}