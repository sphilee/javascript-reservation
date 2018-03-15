import View from '../../shared/View';

export default class extends View {
    constructor(el) {
        super(el);
        this.categoryTabListEl = this.qsa('.event_tab_lst .anchor');
        this.categoryBoxListEl = this.qsa('.wrap_event_box');
        this.countEl = this.qs('.pink');
        this.state = {
            index: 0,
            categoryHTML: [],
            categoryData: []
        };
        this.registerEvent();
    }

    registerEvent() {
        const events = {
            more: () => {
                this.delegate('.more > .btn', 'click', () => this.renderProduct());
            },
            eventTab: () => {
                this.delegate('.event_tab_lst > .item', 'click', e => this.emit('@tab', {
                    index: + e.delegateTarget.dataset.category
                }));
            }
        };

        Object.values(events).forEach(event=>event());
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
        this.setInitData(data)
            .renderCategory();
    }

    renderCategory() {
        this.renderSelectedTab()
            .renderSelectedBox()
            .renderCount()
            .renderContents();
        return this;
    }

    renderSelectedTab() {
        Array.from(this.categoryTabListEl)
            .forEach(tab => tab.className = +tab.parentNode.dataset.category === this.state.index
                ? 'anchor active' : 'anchor');
        return this;
    }

    renderSelectedBox() {
        Array.from(this.categoryBoxListEl)
            .forEach(food => food.className = +food.dataset.category === this.state.index
                ? 'wrap_event_box active' : 'wrap_event_box');
        return this;
    }

    renderContents() {
        const {categoryHTML, index} = this.state;
        if (!categoryHTML[index]) {
            this.fetchProduct().renderProduct();
        }
        return this;
    }

    fetchProduct() {
        const {categoryData, categoryHTML, index} = this.state;
        categoryHTML[index] = categoryData[index].map(item => {
            const {fileId, name, saveFileName, placeName, description} = item;
            return this.template("itemList", {fileId, name, saveFileName, placeName, description});
        });
        return this;
    }

    renderCount() {
        const {categoryData, index} = this.state;
        this.countEl.innerHTML = categoryData[index].length + "개";
        return this;
    }

    renderProduct() {
        const lst_event_boxEl = this.qsa('.active .lst_event_box');
        const {categoryHTML, index} = this.state;
        let cnt = 4;
        while(cnt-- && categoryHTML[index].length){
            lst_event_boxEl[1-cnt%2].insertAdjacentHTML('beforeend', categoryHTML[index].shift());
        }
        this.qs('.active .more').style.display = categoryHTML[index].length
            ? 'block' : 'none';
        return this;
    }


    setCategoryData() {
        const {categoryData, index} = this.state;
        if (index) {
            categoryData[index] = categoryData[0].filter(item => item.fileId === index);
        }
        return this;
    }

    setInitData(targetData) {
        const {categoryData, index} = this.state;
        if (!categoryData[index]) {
            categoryData[index] = targetData;
        }
        return this;
    }

    setIndex(index) {
        this.state.index = index;
        return this;
    }

}