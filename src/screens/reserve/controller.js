import ticketModel from './models/ticketModel';
import personModel from './models/personModel';
import BookingTicketView from './view/bookingTicketView';
import AgreementView from './view/agreementView';
import ReserveButtonView from './view/reserveButtonView';
import GototopView from '../shared/gototopView';

export default class {
    constructor() {
        this.bookingTicketView = new BookingTicketView('.section_booking_ticket');
        this.agreementView = new AgreementView('.section_booking_form');
        this.reserveButtonView = new ReserveButtonView('.bk_btn_wrap');
        this.gototopView = new GototopView('.gototop');
    }

    setView() {
        this.fetchTicket();
        this.bookingTicketView
            .on('@count', e => this.calculateCount(e.detail));

        this.agreementView
            .on('@check', e => this.setAgree(e.detail).checkForm())
            .on('@phone', e => this.setPhone(e.detail).checkForm())
            .on('@name', e => this.setName(e.detail).checkForm())
            .on('@email', e => this.setEmail(e.detail).checkForm());

    }

    fetchTicket() {
        ticketModel.list().then(data => this.bookingTicketView.render(data));
        this.agreementView.render(ticketModel.getTotal());
    }

    calculateCount({id, sum}) {
        ticketModel.addCount(id, sum);
        this.fetchTicket();
    }

    setPhone({number}) {
        const phoneRegEx = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
        if (number.match(phoneRegEx)) {
            this.agreementView.removeError('phone');
            personModel.setPhone(number);
        } else {
            this.agreementView.addError('phone');
            personModel.setPhone(null);
        }
        return this;
    }

    setEmail({email}) {
        const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.match(emailRegEx)) {
            this.agreementView.removeError('email');
            personModel.setEmail(email);
        } else {
            this.agreementView.addError('email');
            personModel.setEmail(null);
        }
        return this;
    }

    setAgree({checked}) {
        personModel.setAgreement(checked);
        return this;
    }

    setName({name}) {
        personModel.setName(name);
        return this;
    }
    checkForm(){
        if(personModel.isValid() && ticketModel.getTotal()){
            this.reserveButtonView.ableButton();
        } else {
            this.reserveButtonView.diableButton();
        }
    }

}