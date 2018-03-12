import View from '../../shared/View';

export default class extends View {
    constructor(el) {
        super(el);
        this.qtyList = this.qsa('.count_control');
        this.registerEvent();
    }

    registerEvent() {
        const events = {
            count: () => {
                this.delegate('.btn_plus_minus', 'click', e => {
                    e.preventDefault();
                    e.delegateTarget.classList.contains('disabled') || this.emit('@count', {
                        sum: + e.delegateTarget.dataset.sum,
                        id: + e.delegateTarget.parentNode.dataset.id
                    });
                });
            }
        };

        Object.values(events).forEach(event=>event());
        return this;
    }

    render(data) {
        data.forEach((item, i) => {
            const {id, price, count} = item;
            const total = price * count;
            const min = count ? '' : 'disabled';
            const max = count < 10 ? '' : 'disabled';
            const color = total > 0 ? 'on_color' : '';
            this.qtyList[i].innerHTML = this.template('ticket', {id, total, count, min, max, color});
        });
        return this;
    }

    

}