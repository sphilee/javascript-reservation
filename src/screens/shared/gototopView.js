import View from './View';

export default class extends View {
    constructor(el) {
        super(el);
        this.registerEvent();
    }

    registerEvent() {
        this.el.addEventListener('click', e => {
            e.preventDefault();
            document.documentElement.scrollTop = 0;
        });
    }

}