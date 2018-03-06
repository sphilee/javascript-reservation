import './css/swipecustom.scss';

import Controller from './controller';
import MainpageView from './view/mainpageView';

const mainpageView = new MainpageView('.container_visual');

const controller = new Controller(mainpageView);

const setView = () => controller.setView();
window.addEventListener('load', setView);