import View from '../../shared/View';

export default class extends View {
    constructor(el) {
        super(el);
    }

    ableButton(){
        this.el.classList.remove('disable');
    }

    
    diableButton(){
        this.el.classList.add('disable');
    }

}