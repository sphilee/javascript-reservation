import 'babel-polyfill';

import Controller from './reserve-controller';
import BookingTicketView from './view/bookingTicketView';
import AgreementView from './view/agreementView';

const bookingTicketView = new BookingTicketView('.section_booking_ticket');
const agreementView = new AgreementView('.section_booking_form');

const controller = new Controller(bookingTicketView, agreementView);

const setView = () => controller.setView();
window.addEventListener('load', setView);