import './css/swipecustom.scss';
import 'babel-polyfill';

import Controller from './mainpage-controller';

const url = 'https://cdn.rawgit.com/code-squad/javascript-reservation/master/mock/main_produc' +
        'ts.json';

const controller = new Controller(url);

const setView = () => controller.setView();
window.addEventListener('load', setView);