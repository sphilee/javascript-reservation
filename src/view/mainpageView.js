import {throttle} from '../helpers';
import View from './View.js';

export default class extends View {
    constructor(el) {
        super(el);
        this.imgListEl = this.qs('.visual_img');
        this.clone();
        this.state = {
            index: 1,
            thresHoldL: 0,
            thresHoldR: this.imgListEl.childElementCount - 1,
            autoplaySpeed: 2000,
            clicked: false
        };
    }

    bind(bindCmd) {
        const bindCommands = {
            transitionend: () => {
                this.on('transitionend', () => this.emit('@transitionend', this.state));
            },
            slidesNavi: () => {
                this.delegate('.slides_navi > a', 'click', throttle(e => {
                    this.emit('@move', {
                        index: this.state.index,
                        direction: + e.delegateTarget.dataset.direction
                    });
                    this.state.clicked = true;
                    this.clickClear && clearTimeout(this.clickClear);
                    this.clickClear = setTimeout(() => {
                        this.state.clicked = false;
                    }, 3000);
                }, 1000));
            },
            autoplay: () => {
                setInterval(() => {
                    this.state.clicked || this.emit('@move', {
                        index: this.state.index,
                        direction: 1
                    });
                }, this.state.autoplaySpeed);
            }
        };

        bindCommands[bindCmd]();
        return this;
    }

    clone() {
        const firstClone = this
            .imgListEl
            .firstElementChild
            .cloneNode(true);
        const lastClone = this
            .imgListEl
            .lastElementChild
            .cloneNode(true);

        this
            .imgListEl
            .appendChild(firstClone);
        this
            .imgListEl
            .insertBefore(lastClone, this.imgListEl.firstElementChild);
        return this;
    }

    setIndex(index) {
        this.state.index = index;
        return this;
    }

    showSlides({Immediately}) {
        this.imgListEl.style.transitionDuration = Immediately
            ? '0s'
            : '0.5s';
        this.imgListEl.style.transform = `translateX(${ - this.state.index * 100}%)`;
        return this;
    }

}