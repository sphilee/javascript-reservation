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