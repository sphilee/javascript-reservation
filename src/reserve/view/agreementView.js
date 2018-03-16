import View from '../../shared/View';
import Pikaday from 'pikaday';

export default class extends View {
    constructor(el) {
        super(el);
        this.totalEl = this.qs('#totalCount');
        this.fieldEl = this.qs('#datepicker');
        this.checkerEl = this.qs('.chk_agree');
        this.phoneEl = this.qs('.tel');
        this.emailEl = this.qs('.email');
        this.nameEl = this.qs('.name');
        this.registerEvent();
    }

    registerEvent() {
        const events = {
            agreement: () => {
                this.delegate('.btn_agreement', 'click', e => {
                    e.preventDefault();
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
            },
            checker: ()=>{
                this.checkerEl.addEventListener('click', e => this.emit('@check',{
                    checked : e.currentTarget.checked 
                }));
            },
            phone : ()=>{
                this.phoneEl.addEventListener('blur',e => this.emit('@phone',{
                    number : e.currentTarget.value 
                }));
            },
            name : ()=>{
                this.nameEl.addEventListener('blur',e => this.emit('@name',{
                    name : e.currentTarget.value 
                }));
            },
            email : ()=>{
                this.emailEl.addEventListener('blur',e => this.emit('@email',{
                    email : e.currentTarget.value 
                }));
            }
        };

        Object.values(events).forEach(event=>event());
        return this;
    }

    render(total) {
        this.totalEl.innerHTML = total;
    }

    addError(name) {
        if(name ==='phone'){
            this.phoneEl.classList.add('error');
        } else if(name === 'email'){
            this.emailEl.classList.add('error');
        }
    }
    
    removeError(name) {
        if(name ==='phone'){
            this.phoneEl.classList.remove('error');
        } else if(name === 'email'){
            this.emailEl.classList.remove('error');
        }
    }

}