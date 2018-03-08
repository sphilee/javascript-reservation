import View from './View.js';
import Pikaday from 'pikaday';

export default class extends View {
    constructor(el) {
        super(el);
        this.totalEl = this.qs('#totalCount');
        this.fieldEl = this.qs('#datepicker');
    }

    bind(bindCmd) {
        const bindCommands = {
            agreement: () => {
                this.delegate('.btn_agreement', 'click', e => {
                    const detailEl = e.delegateTarget.nextElementSibling;
                    if (detailEl.classList.contains('open')) {
                        detailEl.classList.remove('open');
                    } else {
                        detailEl.classList.add('open');
                    }
                });
            },
            pikaday: () => {
                const picker = new Pikaday({
                    field: this.fieldEl,
                    format: 'YYYY-MM-DD',
                    onSelect: () => {
                        this.fieldEl.innerHTML = picker.getMoment().format('YYYY.M.D');
                    }
                });
            }
        };

        bindCommands[bindCmd]();
        return this;
    }

    render(total) {
        this.totalEl.innerHTML = total;
    }

}