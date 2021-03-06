export default {
    data : [
        {
            id: 1,
            type: '성인',
            price: 10200,
            count: 0
        }, {
            id: 2,
            type: '유아',
            price: 6800,
            count: 10
        }, {
            id: 3,
            type: '세트1',
            price: 20000,
            count: 3
        }, {
            id: 4,
            type: '청소년',
            price: 8500,
            count: 3
        }
    ],
    list() {
        return Promise.resolve(this.data);
    },

    getTotal() {
        return this
            .data
            .reduce((acc, cur) => acc + cur.count, 0);
    },

    addCount(id, sum) {
        const data = this
            .data
            .filter(item => item.id === id)[0];
        data.count += sum;
    }
};