'use strict';

import ReserveButtonView from '../view/reserveButtonView';

describe("reserveButtonView unit Test", () => {
    let reserveButtonView;

    beforeAll(() => {
        // Set up our document body
        document.body.innerHTML = `<div class="bk_btn_wrap disable">
        <button type="button" class="bk_btn">
            <i class="spr_book ico_naver_s"></i>
            <span>예약하기</span>
        </button>
    </div>`;

        reserveButtonView = new ReserveButtonView('.bk_btn_wrap');
    });

    
    test('initial', () => {
        expect(reserveButtonView.el.classList.contains('disable')).toBe(true);
    });

    test('ableButton', () => {
        expect(reserveButtonView.el.classList.contains('disable')).toBe(true);
        reserveButtonView.ableButton();
        expect(reserveButtonView.el.classList.contains('disable')).toBe(false);
    });

    
    test('diableButton', () => {
        expect(reserveButtonView.el.classList.contains('disable')).toBe(false);
        reserveButtonView.diableButton();
        expect(reserveButtonView.el.classList.contains('disable')).toBe(true);
    });


});