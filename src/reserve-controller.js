import {delegate} from './helpers';
import ticketModel from './models/ticketModel';
import personModel from './models/personModel';
import BookingTicketView from './view/bookingTicketView';
import AgreementView from './view/agreementView';
import ReserveView from './view/reserveView';
export default class {
    constructor() {
        this.bookingTicketView = new BookingTicketView('.section_booking_ticket');
        this.agreementView = new AgreementView('.section_booking_form');
        this.reserveView = new ReserveView('.bk_btn_wrap');
    }

    setView() {
        this.fetchTicket();
        this
            .bookingTicketView
            .bind('count')
            .on('@count', e => this.calculateCount(e.detail));

        this
            .agreementView
            .bind('agreement')
            .bind('pikaday')
            .bind('checker')
            .bind('phone')
            .bind('name')
            .bind('email')
            .on('@check', e => this.setAgree(e.detail).checkForm())
            .on('@phone', e => this.setPhone(e.detail).checkForm())
            .on('@name', e => this.setName(e.detail).checkForm())
            .on('@email', e => this.setEmail(e.detail).checkForm());

        delegate('body', '.gototop', 'click', () => document.documentElement.scrollTop = 0);
        delegate('body', 'a', 'click', e => e.preventDefault());
    }

    fetchTicket() {
        ticketModel
            .list()
            .then(data => {
                this
                    .bookingTicketView
                    .render(data);
            });
        this
            .agreementView
            .render(ticketModel.getTotal());
    }

    calculateCount({id, sum}) {
        ticketModel.addCount(id, sum);
        this.fetchTicket();
    }

    setPhone({number}) {
        var phoneRegEx = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
        if (number.match(phoneRegEx)) {
            personModel.setPhone(number);
        } else {
            personModel.setPhone(null);
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

    setEmail({email}) {
        personModel.setEmail(email);
        return this;
    }

    checkForm(){
        if(personModel.isValid() && ticketModel.getTotal()){
            this.reserveView.ableButton();
        } else {
            this.reserveView.diableButton();
        }
    }

}