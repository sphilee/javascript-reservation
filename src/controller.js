export default class {
    constructor(mainSlideView) {
        this.mainSlideView = mainSlideView;
    }

    setView() {
        this
            .mainSlideView
            .bind('transitionend')
            .bind('slidesNavi')
            .bind('autoplay')
            .on('@move', e => this.moveSlide(e.detail))
            .on('@transitionend', e => this.resetSlide(e.detail));
    }

    moveSlide({index, direction}) {
        this
            .mainSlideView
            .setIndex(index += direction)
            .showSlides({Immediately: false});
    }

    resetSlide({index, thresHoldL, thresHoldR}) {
        if (index === thresHoldL) {
            this
                .mainSlideView
                .setIndex(thresHoldR - 1)
                .showSlides({Immediately: true});
        } else if (index === thresHoldR) {
            this
                .mainSlideView
                .setIndex(thresHoldL + 1)
                .showSlides({Immediately: true});
        }
    }

}