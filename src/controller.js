import {checkLocalStorage} from './helpers';
export default class {
    constructor(url, mainpageView) {
        this.url = url;
        this.mainpageView = mainpageView;
    }

    setView() {
        this.fetchMainpage(this.url);
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
            this
                .mainpageView
                .setIndex(thresHoldR - 1)
                .showSlides({Immediately: true});
        } else if (index >= thresHoldR) {
            this
                .mainpageView
                .setIndex(thresHoldL + 1)
                .showSlides({Immediately: true});
        }
    }

}