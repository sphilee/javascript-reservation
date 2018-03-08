import View from './View.js';

export default class extends View {
    constructor(el) {
        super(el);
        this.state = {};
    }

    bind(bindCmd) {
        const bindCommands = {
            count: () => {
                this.delegate('.btn_plus_minus', 'click', e => {
                    this.calculateCount(e.delegateTarget);
                });
            }
        };

        bindCommands[bindCmd]();
        return this;
    }

    calculateCount(targetEl) {
        if (!targetEl.classList.contains('disabled')) {
            const sum = +targetEl.dataset.count;
            const countEl = sum > 0
                ? targetEl.previousElementSibling
                : targetEl.nextElementSibling;
            countEl.value = +countEl.value + sum;
            this.checkDisabled(countEl);
        }

    }

    checkDisabled(countEl) {
        if (countEl.value === '0') {
            countEl
                .classList
                .add('disabled');
            countEl
                .previousElementSibling
                .classList
                .add('disabled');
        } else {
            countEl
                .classList
                .remove('disabled');
            countEl
                .previousElementSibling
                .classList
                .remove('disabled');
        }

    }
}