import 'babel-polyfill';

import Controller from './reserve-controller';
import BookingTickectView from './view/bookingTicketView';

const bookingTickectView = new BookingTickectView('.section_booking_ticket');

const controller = new Controller(bookingTickectView);

const setView = () => controller.setView();
window.addEventListener('load', setView);