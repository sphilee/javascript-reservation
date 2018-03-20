'use strict';

import ticketModel from '../models/ticketModel';
import BookingTicketView from '../view/bookingTicketView';

describe("bookingTicketView unit Test", () => {
    let bookingTicketView;

    beforeAll(() => {
        // Set up our document body
        document.body.innerHTML = `<div class="section_booking_ticket">
        <div class="ticket_body">
            <div class="qty">
                <div class="count_control"></div>
                <div class="qty_info_icon">
                    <strong class="product_amount">
                        <span>성인</span>
                    </strong>
                    <strong class="product_price">
                        <span class="price">10,200</span>
                        <span class="price_type">원</span>
                    </strong>
                    <em class="product_dsc">10,200원 (15% 할인가)</em>
                </div>
            </div>
            <div class="qty">
                <div class="count_control"></div>
                <div class="qty_info_icon">
                    <strong class="product_amount">
                        <span>유아</span>
                    </strong>
                    <strong class="product_price">
                        <span class="price">6,800</span>
                        <span class="price_type">원</span>
                    </strong>
                    <em class="product_dsc">6,800원 (15% 할인가)</em>
                </div>
            </div>
            <div class="qty">
                <div class="count_control"></div>
                <div class="qty_info_icon">
                    <strong class="product_amount">
                        <span>세트1</span>
                    </strong>
                    <strong class="product_price">
                        <span class="price">20,000</span>
                        <span class="price_type">원</span>
                    </strong>
                    <em class="product_dsc">2인 관람권 (17% 할인가)</em>
                </div>
            </div>
            <div class="qty">
                <div class="count_control"></div>
                <div class="qty_info_icon">
                    <strong class="product_amount">
                        <span>청소년</span>
                    </strong>
                    <strong class="product_price">
                        <span class="price">8,500</span>
                        <span class="price_type">원</span>
                    </strong>
                    <em class="product_dsc">8,500원 (15% 할인가)</em>
                </div>
            </div>
        </div>
    </div>
    
    <template id="ticket">
        <div class="clearfix" data-id="{{id}}">
            <a href="#" class="btn_plus_minus spr_book2 ico_minus3 {{min}}" title="빼기" data-sum="-1"> </a>
            <input type="tel" class="count_control_input {{min}}" value="{{count}}" readonly title="수량">
            <a href="#" class="btn_plus_minus spr_book2 ico_plus3 {{max}}" title="더하기" data-sum="1">
            </a>
        </div>
        <div class="individual_price {{color}}">
            <span class="total_price">{{total}}</span>
            <span class="price_type">원</span>
        </div>
    </template>`;

        //support closest
        window.Element.prototype.closest = function (selector) {
            let el = this;
            while (el) {
                if (el.matches(selector)) {
                    return el;
                }
                el = el.parentElement;
            }
        };

        bookingTicketView = new BookingTicketView('.section_booking_ticket');
        ticketModel.list().then(data => bookingTicketView.render(data));
    });

    test('initial', () => {
        const TOTAL_COUNT = 16;

        const countInput = Array.from(bookingTicketView.qsa('.count_control_input'))
            .map(e =>+e.value).reduce((acc, cur) => acc + cur, 0);
        expect(countInput).toBe(TOTAL_COUNT);
    });

    test('btn_plus_minus click', done => {
        const SELECT3_COUNT = 3;
        const select = 3;

        const count = +bookingTicketView.qs(`.qty:nth-child(${select}) .count_control_input`).value;
        expect(count).toBe(SELECT3_COUNT);

        bookingTicketView.on('@count', e => {
            expect(e.detail.sum).toBe(1)
            expect(e.detail.id).toBe(select)
            done();
        });
        simulateClick(bookingTicketView.qs(`.qty:nth-child(${select}) .ico_plus3`));
    });

    function simulateClick(elem) {
        // Create our event (with options)
        let evt = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        // If cancelled, don't dispatch our event
        let canceled = !elem.dispatchEvent(evt);
    };

});