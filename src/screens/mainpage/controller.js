import {delegate} from '../shared/helpers';
import SlideView from './view/slideView';
import TabView from './view/tabView';
export default class {
    constructor(url) {
        this.url = url;
        this.slideView = new SlideView('.container_visual');
        this.tabView = new TabView('.event');
    }

    setView() {
        this.slideView
            .on('@move', e => this.moveSlide(e.detail))
            .on('@transitionend', e => this.resetSlide(e.detail));
        this.fetchTab(this.url);
        
        delegate('body', 'a', 'click', e => e.preventDefault());
        delegate('body', '.gototop', 'click', () => document.documentElement.scrollTop = 0);
    }

    moveSlide({index, direction}) {
        this.slideView
            .setIndex(index += direction)
            .showSlides({Immediately: false});
    }

    resetSlide({index, thresHoldL, thresHoldR}) {
        if (index <= thresHoldL) {
            this.ImmediatelyMoveSlide(thresHoldR - 1);
        } else if (index >= thresHoldR) {
            this.ImmediatelyMoveSlide(thresHoldL + 1);
        }
    }

    ImmediatelyMoveSlide(index) {
        this.slideView
            .setIndex(index)
            .showSlides({Immediately: true});
    }

    async fetchTab(url) {
        const response = await fetch(url);
        const data = await response.json();
        this.tabView
            .render('category', data)
            .on('@tab', e => this.seletedTab(e.detail));
    }

    seletedTab({index}) {
        this.tabView
            .setIndex(index)
            .setCategoryData()
            .renderCategory();
    }


}