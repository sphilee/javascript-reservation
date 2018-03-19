'use strict';

import TabView from '../view/tabView';

describe("tabView unit Test", () => {
    let tabView;
    const data = require('../../../mock/main_products.json');
    const dataCount = '10개';

    beforeAll(() => {
        // Set up our document body
        document.body.innerHTML = `<div class="event">
        <div class="section_event_tab">
            <ul class="event_tab_lst tab_lst_min">
                <li class="item" data-category="0">
                    <!-- [D] 활성화 된 anchor는 active 추가 -->
                    <a class="anchor">
                        <span>전체리스트</span>
                    </a>
                </li>
                <li class="item" data-category="1">
                    <a class="anchor">
                        <span>전시</span>
                    </a>
                </li>
                <li class="item" data-category="2">
                    <a class="anchor">
                        <span>뮤지컬</span>
                    </a>
                </li>
                <li class="item" data-category="3">
                    <a class="anchor">
                        <span>콘서트</span>
                    </a>
                </li>
                <li class="item" data-category="4">
                    <a class="anchor">
                        <span>클래식</span>
                    </a>
                </li>
                <!-- <li class="item" data-category="5">
                    <a class="anchor">
                        <span>연극</span>
                    </a>
                </li>
                <li class="item" data-category="6">
                    <a class="anchor"> <span>클래스</span> </a>
                </li>
                <li class="item" data-category="7">
                    <a class="anchor"> <span>체험</span> </a>
                </li>
                <li class="item" data-category="8">
                    <a class="anchor last"> <span>키즈</span> </a>
                </li> -->
            </ul>
        </div>
        <div class="section_event_lst">
            <p class="event_lst_txt">바로 예매 가능한 행사가
                <span class="pink"></span> 있습니다</p>
            <div class="wrap_event_box" data-category="0">
                <!-- [D] lst_event_box 가 2컬럼으로 좌우로 나뉨, 더보기를 클릭할때마다 좌우 ul에 li가 추가됨 -->
                <ul class="lst_event_box">
                </ul>
                <ul class="lst_event_box">
                </ul>
                <!-- 더보기 -->
                <div class="more">
                    <button class="btn">
                        <span>더보기</span>
                    </button>
                </div>
            </div>
            <div class="wrap_event_box" data-category="1">
                <!-- [D] lst_event_box 가 2컬럼으로 좌우로 나뉨, 더보기를 클릭할때마다 좌우 ul에 li가 추가됨 -->
                <ul class="lst_event_box">
                </ul>
                <ul class="lst_event_box">
                </ul>
                <!-- 더보기 -->
                <div class="more">
                    <button class="btn">
                        <span>더보기</span>
                    </button>
                </div>
            </div>
            <div class="wrap_event_box" data-category="2">
                <!-- [D] lst_event_box 가 2컬럼으로 좌우로 나뉨, 더보기를 클릭할때마다 좌우 ul에 li가 추가됨 -->
                <ul class="lst_event_box">
                </ul>
                <ul class="lst_event_box">
                </ul>
                <!-- 더보기 -->
                <div class="more">
                    <button class="btn">
                        <span>더보기</span>
                    </button>
                </div>
            </div>
            <div class="wrap_event_box" data-category="3">
                <!-- [D] lst_event_box 가 2컬럼으로 좌우로 나뉨, 더보기를 클릭할때마다 좌우 ul에 li가 추가됨 -->
                <ul class="lst_event_box">
                </ul>
                <ul class="lst_event_box">
                </ul>
                <!-- 더보기 -->
                <div class="more">
                    <button class="btn">
                        <span>더보기</span>
                    </button>
                </div>
            </div>
            <div class="wrap_event_box" data-category="4">
                <!-- [D] lst_event_box 가 2컬럼으로 좌우로 나뉨, 더보기를 클릭할때마다 좌우 ul에 li가 추가됨 -->
                <ul class="lst_event_box">
                </ul>
                <ul class="lst_event_box">
                </ul>
                <!-- 더보기 -->
                <div class="more">
                    <button class="btn">
                        <span>더보기</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <template id="itemList">
        <li class="item" data-field="{{fileId}}">
            <a href="detail.html" class="item_book">
                <div class="item_preview">
                    <img alt="{{name}}" class="img_thumb" src="{{saveFileName}}">
                    <span class="img_border"></span>
                </div>
                <div class="event_txt">
                    <h4 class="event_txt_tit">
                        <span>{{name}}</span>
                        <small class="sm">{{placeName}}</small>
                    </h4>
                    <p class="event_txt_dsc">{{description}}</p>
                </div>
            </a>
        </li>
    </template>`;

        tabView = new TabView('.event');
        tabView.render('category', data);
    });

    test('initial', () => {

        expect(tabView.state.index).toBe(0);
        expect(tabView.state.categoryData[0]).toMatchObject(data);
        expect(tabView.countEl.innerHTML).toBe(dataCount);
        expect(tabView.qs('.active .more').style.display).toBe('block');
    });

    test('seletedTab', async() => {
        tabView.setIndex(1)
            .setCategoryData()
            .renderCategory();

        expect(tabView.state.index).toBe(1);
        expect(tabView.state.categoryData[1]).toHaveLength(3);
        expect(tabView.countEl.innerHTML).toBe('3개');
    });

    test('setIndex', async() => {
        tabView.setIndex(2);

        expect(tabView.state.index).toBe(2);
    });

});