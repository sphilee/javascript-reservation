import SlideView from './view/slideView';
import TabView from './view/tabView';
import GototopView from '../shared/gototopView';

export default class {
    constructor(url) {
        this.url = url;
        this.slideView = new SlideView('.container_visual');
        this.tabView = new TabView('.event');
        this.gototopView = new GototopView('.gototop');
    }

    setView() {
        this.slideView
            .on('@move', e => this.moveSlide(e.detail))
            .on('@transitionend', e => this.resetSlide(e.detail))
            .on('@touchmove', e => this.checkMoveType(e.detail))
            .on('@touchend', e => {
                e.detail.moveType < 0 && this.checkMoveType(e.detail);
                this.checkDistance(e.detail);
                this.slideView.initTouchInfo();
            });
        this.fetchTab(this.url);
    }
    
    checkDistance({index, startIndex}) {
        const Hdistance = startIndex - index;
        if (Hdistance > 0.2) {
            this.moveSlide({
                index,
                direction: Hdistance - 1
            });
        } else if (Hdistance < -0.2) {
            this.moveSlide({
                index,
                direction: Hdistance + 1
            });
        } else {
            this.moveSlide({
                index,
                direction: Hdistance
            });
        }
    }

    checkMoveType({startX, startY, startIndex, HSlope, width, x, y}) {
        const Hdistance = (startX - x) / width;
        this.ImmediatelyMoveSlide(startIndex + Hdistance);

        const moveX = Math.abs(startX - x);
        const moveY = Math.abs(startY - y);
        const distance = moveX + moveY;
        if (distance < 25) {
            return this;
        }
        const slope = parseFloat((moveY / moveX).toFixed(2), 10);
        slope > HSlope ? this.slideView.setMoveType(1) : this.slideView.setMoveType(0);
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