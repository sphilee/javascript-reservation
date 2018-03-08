import ticketTemplate from '../template/ticket-tpl.html';
import View from './View.js';

export default class extends View {
    constructor(el) {
        super(el);
        this.qtyList = this.qsa('.count_control');
        this.state = {};
    }

    bind(bindCmd) {
        const bindCommands = {
            count: () => {
                this.delegate('.btn_plus_minus', 'click', e => e.delegateTarget.classList.contains('disabled') || this.emit('@count', {
                    sum: + e.delegateTarget.dataset.sum,
                    id: + e.delegateTarget.parentNode.dataset.id
                }));
            }
        };

        bindCommands[bindCmd]();
        return this;
    }

    render(data) {
        data.forEach((item, i) => {
            const {id, price, count} = item;
            const total = price * count;
            const min = count
                ? ''
                : 'disabled';
            const max = count < 10
                ? ''
                : 'disabled';
            const color = total > 0
                ? 'on_color'
                : '';
            const ticketHTML = ticketTemplate({
                id,
                total,
                count,
                min,
                max,
                color
            });
            this.qtyList[i].innerHTML = ticketHTML;
        });
        return this;
    }

}