import 'babel-polyfill';

import Controller from './controller';
import './css/pikaday.css';
import '../shared/css/style.css';

const controller = new Controller();

const setView = () => controller.setView();
window.addEventListener('load', setView);