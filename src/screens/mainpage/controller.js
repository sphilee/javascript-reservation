import {delegate} from '../shared/helpers';
import MainpageView from './view/mainpageView';

export default class {
    constructor(url) {
        this.url = url;
        this.mainpageView = new MainpageView('.event');
    }

    setView() {
        this.fetchMainpage(this.url);
        delegate('body', 'a', 'click', e => e.preventDefault());
        delegate('body', '.gototop', 'click', () => document.documentElement.scrollTop = 0);
    }

    async fetchMainpage(url) {
        const response = await fetch(url);
        const data = await response.json();
        this
            .mainpageView
            .render('category', data)
            .bind('transitionend')
            .bind('slidesNavi')
            .bind('autoplay')
            .bind('more')
            .bind('eventTab')
            .on('@move', e => this.moveSlide(e.detail))
            .on('@transitionend', e => this.resetSlide(e.detail))
            .on('@tab', e => this.seletedTab(e.detail));
    }

    seletedTab({index}) {
        this
            .mainpageView
            .setCategoryIndex(index)
            .setCategoryData()
            .renderCategory();
    }

    moveSlide({index, direction}) {
        this
            .mainpageView
            .setSlideIndex(index += direction)
            .showSlides({Immediately: false});
    }

    resetSlide({slideIndex, thresHoldL, thresHoldR}) {
        if (slideIndex <= thresHoldL) {
            this.ImmediatelyMoveSlide(thresHoldR - 1);
        } else if (slideIndex >= thresHoldR) {
            this.ImmediatelyMoveSlide(thresHoldL + 1);
        }
    }

    ImmediatelyMoveSlide(index) {
        this
            .mainpageView
            .setSlideIndex(index)
            .showSlides({Immediately: true});

    }

}