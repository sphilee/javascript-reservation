import {delegate} from './helpers';
import ticketModel from './models/ticketModel';
import BookingTicketView from './view/bookingTicketView';
import AgreementView from './view/agreementView';
import Pikaday from 'pikaday';
export default class {
    constructor() {
        this.bookingTicketView = new BookingTicketView('.section_booking_ticket');
        this.agreementView = new AgreementView('.section_booking_form');
        const field = document.getElementById('datepicker');
        this.picker = new Pikaday({
            field,
            format: 'YYYY-MM-DD',
            onSelect: () => {
                field.innerHTML = this.picker.getMoment().format('YYYY.M.D');
            }
        });
    }

    setView() {
        this.fetchTicket();
        this
            .bookingTicketView
            .bind('count')
            .on('@count', e => this.calculateCount(e.detail));

        this
            .agreementView
            .bind('agreement');

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

}