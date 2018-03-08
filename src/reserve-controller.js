import {delegate} from './helpers';
import ticketModel from './models/ticketModel';
export default class {
    constructor(bookingTicketView) {
        this.bookingTicketView = bookingTicketView;
    }

    setView() {
        this.fetchTicket();
        this
            .bookingTicketView
            .bind('count')
            .on('@count', e => this.calculateCount(e.detail));
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

    calculateCount({id,sum}) {
        ticketModel.addCount(id,sum);
        this.fetchTicket();
    }

}