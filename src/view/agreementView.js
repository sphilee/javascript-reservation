import View from './View.js';

export default class extends View {
    constructor(el) {
        super(el);
    }

    bind(bindCmd) {
        const bindCommands = {
            agreement: () => {
                this.delegate('.btn_agreement', 'click', e => {
                    const detailEl = e.delegateTarget.nextElementSibling;
                    if (detailEl.classList.contains('open')) {
                        detailEl.classList.remove('open');
                    } else{
                        detailEl.classList.add('open');
                    }
                });
            }
        };

        bindCommands[bindCmd]();
        return this;
    }

}