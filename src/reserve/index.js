import 'babel-polyfill';

import Controller from './controller';

const controller = new Controller();

const setView = () => controller.setView();
window.addEventListener('load', setView);