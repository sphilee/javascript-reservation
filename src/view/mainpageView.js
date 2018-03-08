import categoryTemplate from '../template/category-tpl.html';
import {throttle} from '../helpers';
import View from './View.js';

export default class extends View {
    constructor(el) {
        super(el);
        this.imgListEl = this.qs('.visual_img');
        this.categoryTabListEl = this.qsa('.event_tab_lst .anchor');
        this.categoryBoxListEl = this.qsa('.wrap_event_box');
        this.countEl = this.qs('.pink');
        this.cloneNodes();
        this.state = {
            index: 1,
            thresHoldL: 0,
            thresHoldR: this.imgListEl.childElementCount - 1,
            autoplaySpeed: 2000,
            clicked: false,
            categoryIndex: 0,
            categoryList: []
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
                    this.checkClick();
                }, 1000));
            },
            autoplay: () => {
                setInterval(() => this.state.clicked || this.emit('@move', {
                    index: this.state.index,
                    direction: 1
                }), this.state.autoplaySpeed);
            },
            more: () => {
                this.delegate('.more > .btn', 'click', () => this.renderProduct());
            },
            eventTab: () => {
                this.delegate('.event_tab_lst > .item', 'click', e => {
                    const targetIndex = +e.delegateTarget.dataset.category;
                    Array
                        .from(this.categoryTabListEl)
                        .forEach(tab => tab.className = +tab.parentNode.dataset.category === targetIndex
                            ? 'anchor active'
                            : 'anchor');
                    const targetData = targetIndex
                        ? this
                            .state
                            .data
                            .filter(item => item.fileId === targetIndex)
                        : this.state.data;
                    this
                        .setCategoryIndex(targetIndex)
                        .renderSelectedBox()
                        .renderCategory(targetData);
                });
            }
        };

        bindCommands[bindCmd]();
        return this;
    }

    render(viewCmd, ...params) {
        const viewCommands = {
            category: () => {
                this.category(...params);
            }
        };

        viewCommands[viewCmd]();
        return this;
    }

    category(data) {
        this
            .setData(data)
            .renderSelectedBox()
            .renderCategory(data);
    }

    renderSelectedBox() {
        Array
            .from(this.categoryBoxListEl)
            .forEach(food => food.className = this.state.categoryIndex === + food.dataset.category
                ? 'wrap_event_box active'
                : 'wrap_event_box');
        return this;
    }

    renderCategory(data) {
        if (!this.state.categoryList[this.state.categoryIndex]) {
            this
                .fetchProduct(data)
                .renderCount()
                .renderProduct();
        }
        return this;
    }

    fetchProduct(data) {
        this.state.categoryList[this.state.categoryIndex] = data.map(item => {
            const {fileId, name, saveFileName, placeName, description} = item;
            return categoryTemplate({fileId, name, saveFileName, placeName, description});
        });
        return this;
    }

    renderCount() {
        this.countEl.innerHTML = this.state.categoryList[this.state.categoryIndex].length + "개";
        return this;
    }

    renderProduct() {
        if (this.state.categoryList[this.state.categoryIndex].length) {
            const lst_event_boxEl = this.qsa('.active .lst_event_box');
            lst_event_boxEl[0].insertAdjacentHTML('beforeend', this.state.categoryList[this.state.categoryIndex].splice(0, 2));
            lst_event_boxEl[1].insertAdjacentHTML('beforeend', this.state.categoryList[this.state.categoryIndex].splice(0, 2));
        }
        this
            .qs('.active .more')
            .style
            .display = this.state.categoryList[this.state.categoryIndex].length
            ? 'block'
            : 'none';
        return this;
    }

    cloneNodes() {
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

    checkClick() {
        this.state.clicked = true;
        this.clickClear && clearTimeout(this.clickClear);
        this.clickClear = setTimeout(() => {
            this.state.clicked = false;
        }, 3000);
    }

    setData(data) {
        this.state.data = data;
        return this;
    }

    setCategoryIndex(index) {
        this.state.categoryIndex = index;
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