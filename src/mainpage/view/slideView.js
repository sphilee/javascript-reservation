import View from '../../shared/View';
import throttle from 'lodash.throttle';

export default class extends View {
    constructor(el) {
        super(el);
        this.slideListEl = this.qs('.visual_img');
        this.cloneNodes();

        this.state = {
            index: 1,
            thresHoldL: 0,
            thresHoldR: this.slideListEl.childElementCount - 1,
            autoplaySpeed: 2000,
            clicked: false,
            width: window.innerWidth,
            HSlope: ((window.innerHeight / 2) / window.innerWidth).toFixed(2) * 1,
            startIndex: 1,
            moveType: -1,
            startX: -1,
            startY: -1,
            startTime: 0,
            startEvent: false
        };
        this.registerEvent();
    }

    registerEvent() {
        const events = {
            transitionend: () => {
                this.on('transitionend', () => this.emit('@transitionend', this.state));
            },
            slidesNavi: () => {
                this.delegate('.slides_navi > a', 'click', throttle(e => {
                    e.preventDefault();
                    this.emit('@move', {
                        index: this.state.index,
                        direction: +e.delegateTarget.dataset.direction
                    });
                    this.checkClick();
                }, 1000));
            },
            autoplay: () => {
                setInterval(() => this.state.clicked || this.emit('@move', {
                    index: this.state.index,
                    direction: 1
                }), this.state.autoplaySpeed);
            },
            touch: () => {
                this.on('touchstart', throttle(e => {
                    this.initTouchInfo();
                    this.state.clicked = true;
                    this.state.startIndex = this.state.index;
                    this.state.startX = e.changedTouches[0].pageX;
                    this.state.startY = e.changedTouches[0].pageY;
                    this.state.startTime = e.timeStamp;
                    this.state.startEvent = true;
                }, 1000));
                this.on('touchmove', e => {
                    if (this.state.startEvent) {
                        this.emit('@touchmove', Object.assign(this.state, {
                            x: e.changedTouches[0].pageX,
                            y: e.changedTouches[0].pageY
                        }));
                        (this.state.moveType === 0) && e.preventDefault();
                    }
                });
                this.on('touchend', e => {
                    this.checkClick();
                    this.state.startEvent && this.emit('@touchend', Object.assign(this.state, {
                        x: e.changedTouches[0].pageX,
                        y: e.changedTouches[0].pageY
                    }));
                });
            }
        };

        Object.values(events).forEach(event=>event());
        return this;
    }

    initTouchInfo() {
        this.state.moveType = -1;
        this.state.startX = -1;
        this.state.startY = -1;
        this.state.startTime = 0;
        this.state.startEvent = false;
    }

    setMoveType(type) {
        this.state.moveType = type;
        return this;
    }

    cloneNodes() {
        const firstClone = this.slideListEl.firstElementChild.cloneNode(true);
        const lastClone = this.slideListEl.lastElementChild.cloneNode(true);

        this.slideListEl.appendChild(firstClone);
        this.slideListEl.insertBefore(lastClone, this.slideListEl.firstElementChild);
        return this;
    }

    checkClick() {
        this.state.clicked = true;
        this.clickClear && clearTimeout(this.clickClear);
        this.clickClear = setTimeout(() => this.state.clicked = false, 3000);
    }

    setIndex(index) {
        this.state.index = index;
        return this;
    }

    showSlides({Immediately}) {
        this.slideListEl.style.transitionDuration = Immediately ? '0s' : '0.5s';
        this.slideListEl.style.transform = `translateX(${ -this.state.index * 100}%)`;
        this.slideListEl.dataset.index = this.state.index;
        return this;
    }

}