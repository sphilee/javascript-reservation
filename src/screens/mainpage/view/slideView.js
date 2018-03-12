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
            clicked: false
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
            }
        };

        Object.values(events).forEach(event=>event());
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
        return this;
    }

}