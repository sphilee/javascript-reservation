import 'babel-polyfill';

import Controller from './reserve-controller';
import BookingTicketView from './view/bookingTicketView';

const bookingTicketView = new BookingTicketView('.section_booking_ticket');

const controller = new Controller(bookingTicketView);

const setView = () => controller.setView();
window.addEventListener('load', setView);