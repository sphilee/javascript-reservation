import {delegate} from './helpers';
export default class {
    constructor(bookingTickectView) {
        this.bookingTickectView = bookingTickectView;
    }

    setView() {

        this.bookingTickectView.bind('count');
        delegate('body', 'a', 'click', e => e.preventDefault());
        delegate('body', '.gototop', 'click', () => document.documentElement.scrollTop = 0);
    }

}