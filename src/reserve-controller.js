import {delegate} from './helpers';
import ticketModel from './models/ticketModel';
export default class {
    constructor(bookingTicketView, agreementView) {
        this.bookingTicketView = bookingTicketView;
        this.agreementView = agreementView;
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
    }

    calculateCount({id, sum}) {
        ticketModel.addCount(id, sum);
        this.fetchTicket();
    }

}