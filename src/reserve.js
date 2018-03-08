import 'babel-polyfill';

import Controller from './reserve-controller';

const controller = new Controller();

const setView = () => controller.setView();
window.addEventListener('load', setView);