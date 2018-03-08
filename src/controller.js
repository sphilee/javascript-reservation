import {checkLocalStorage, delegate} from './helpers';
export default class {
    constructor(url, mainpageView) {
        this.url = url;
        this.mainpageView = mainpageView;
    }

    setView() {
        this.fetchMainpage(this.url);
        delegate('body', 'a', 'click', e => e.preventDefault());
        delegate('body', '.gototop', 'click', () => document.documentElement.scrollTop = 0);
    }

    async fetchMainpage(url) {
        const data = await checkLocalStorage(url);
        this
            .mainpageView
            .render('category', data)
            .bind('transitionend')
            .bind('slidesNavi')
            .bind('autoplay')
            .bind('more')
            .bind('eventTab')
            .on('@move', e => this.moveSlide(e.detail))
            .on('@transitionend', e => this.resetSlide(e.detail));
    }

    moveSlide({index, direction}) {
        this
            .mainpageView
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
        this
            .mainpageView
            .setIndex(index)
            .showSlides({Immediately: true});

    }

}