import './css/swipecustom.scss';
import 'babel-polyfill';

import Controller from './controller';
import MainpageView from './view/mainpageView';

const mainpageView = new MainpageView('.event');
const url = 'https://cdn.rawgit.com/code-squad/javascript-reservation/master/mock/main_produc' +
        'ts.json';

const controller = new Controller(url, mainpageView);

const setView = () => controller.setView();
window.addEventListener('load', setView);