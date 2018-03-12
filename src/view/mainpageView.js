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
            slideIndex: 1,
            thresHoldL: 0,
            thresHoldR: this.imgListEl.childElementCount - 1,
            autoplaySpeed: 2000,
            clicked: false,
            categoryIndex: 0,
            categoryHTML: [],
            categoryData: []
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
                        index: this.state.slideIndex,
                        direction: + e.delegateTarget.dataset.direction
                    });
                    this.checkClick();
                }, 1000));
            },
            autoplay: () => {
                setInterval(() => this.state.clicked || this.emit('@move', {
                    index: this.state.slideIndex,
                    direction: 1
                }), this.state.autoplaySpeed);
            },
            more: () => {
                this.delegate('.more > .btn', 'click', () => this.renderProduct());
            },
            eventTab: () => {
                this.delegate('.event_tab_lst > .item', 'click', e => this.emit('@tab', {
                    index: + e.delegateTarget.dataset.category
                }));
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
            .setInitData(data)
            .renderCategory();
    }

    renderCategory() {
        this
            .renderSelectedTab()
            .renderSelectedBox()
            .renderCount()
            .renderContents();
        return this;
    }

    renderSelectedTab() {
        Array
            .from(this.categoryTabListEl)
            .forEach(tab => tab.className = +tab.parentNode.dataset.category === this.state.categoryIndex
                ? 'anchor active'
                : 'anchor');
        return this;
    }

    renderSelectedBox() {
        Array
            .from(this.categoryBoxListEl)
            .forEach(food => food.className = this.state.categoryIndex === + food.dataset.category
                ? 'wrap_event_box active'
                : 'wrap_event_box');
        return this;
    }

    renderContents() {
        const {categoryHTML, categoryIndex} = this.state;
        if (!categoryHTML[categoryIndex]) {
            this
                .fetchProduct()
                .renderProduct();
        }
        return this;
    }

    fetchProduct() {
        const {categoryData, categoryHTML, categoryIndex} = this.state;
        categoryHTML[categoryIndex] = categoryData[categoryIndex].map(item => {
            const {fileId, name, saveFileName, placeName, description} = item;
            return this.template("itemList", {fileId, name, saveFileName, placeName, description});
        });
        return this;
    }

    renderCount() {
        const {categoryData, categoryIndex} = this.state;
        this.countEl.innerHTML = categoryData[categoryIndex].length + "개";
        return this;
    }

    renderProduct() {
        const {categoryHTML, categoryIndex} = this.state;
        if (categoryHTML[categoryIndex].length) {
            const lst_event_boxEl = this.qsa('.active .lst_event_box');
            lst_event_boxEl[0].insertAdjacentHTML('beforeend', categoryHTML[categoryIndex].splice(0, 2));
            lst_event_boxEl[1].insertAdjacentHTML('beforeend', categoryHTML[categoryIndex].splice(0, 2));
        }
        this
            .qs('.active .more')
            .style
            .display = categoryHTML[categoryIndex].length
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

    setCategoryData() {
        const {categoryData, categoryIndex} = this.state;
        if (categoryIndex) {
            categoryData[categoryIndex] = categoryData[0].filter(item => item.fileId === categoryIndex);
        }
        return this;
    }

    setInitData(targetData) {
        const {categoryData, categoryIndex} = this.state;
        if (!categoryData[categoryIndex]) {
            categoryData[categoryIndex] = targetData;
        }
        return this;
    }

    setCategoryIndex(index) {
        this.state.categoryIndex = index;
        return this;
    }

    setSlideIndex(index) {
        this.state.slideIndex = index;
        return this;
    }

    showSlides({Immediately}) {
        this.imgListEl.style.transitionDuration = Immediately
            ? '0s'
            : '0.5s';
        this.imgListEl.style.transform = `translateX(${ - this.state.slideIndex * 100}%)`;
        return this;
    }

}