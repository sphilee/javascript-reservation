'use strict';

import SlideView from '../view/slideView';

describe("slideView unit Test", () => {
    let slideView;

    beforeAll(() => {
        // Set up our document body
        document.body.innerHTML = `<div class="container_visual">
        <ul class="visual_img" data-index="1">
            <li class="item">
            </li>
            <li class="item">
            </li>
            <li class="item">
            </li>
        </ul>
        <div class="slides_navi">
            <a href="#" class="slides_prev" data-direction="-1"></a>
            <a href="#" class="slides_next" data-direction="1"></a>
        </div>
    </div>`;

    //support closest
    window.Element.prototype.closest = function (selector) {
        var el = this;
        while (el) {
            if (el.matches(selector)) {
                return el;
            }
            el = el.parentElement;
        }
    };

    slideView = new SlideView('.container_visual');

    });

    test('initial', () => {
        const state = {
            index: 1,
            thresHoldL: 0,
            thresHoldR: 4,
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

        expect(slideView.state).toMatchObject(state);
    });

    test('initTouchInfo', () => {
        slideView.initTouchInfo();

        expect(slideView.state.moveType).toBe(-1);
        expect(slideView.state.startX).toBe(-1);
        expect(slideView.state.startY).toBe(-1);
        expect(slideView.state.startTime).toBe(0);
        expect(slideView.state.startEvent).toBe(false);
    });

    test('setMoveType', () => {
        slideView.setMoveType(0);

        expect(slideView.state.moveType).toBe(0);
    });

    test('cloneNodes', () => {
        expect(slideView.slideListEl.childElementCount).toBe(5);

        slideView.cloneNodes();

        expect(slideView.slideListEl.childElementCount).toBe(7);
    });

    test('checkClick', async() => {
        slideView.checkClick();
        expect(slideView.state.clicked).toBe(true);

        await expect(slideView.checkClick()).resolves.toEqual(false);

    });

    test('setIndex', () => {
        expect(slideView.state.index).toBe(1);

        slideView.setIndex(3);

        expect(slideView.state.index).toBe(3);

    });

    test('showSlides', () => {
        slideView.showSlides({Immediately: true});
        expect(slideView.slideListEl.style.transform).toBe(`translateX(${ - slideView.state.index * 100}%)`);
        expect(slideView.slideListEl.style.transitionDuration).toBe("0s");

        slideView.showSlides({Immediately: false});
        expect(slideView.slideListEl.style.transform).toBe(`translateX(${ - slideView.state.index * 100}%)`);
        expect(slideView.slideListEl.style.transitionDuration).toBe("0.5s");

    });

    test('slides_navi click', done => {
        slideView.on('@move', e => {
            expect(e.detail.direction).toBe(-1);
            done();
        });

        simulateClick(slideView.qs('.slides_prev'));

    });

    test('touchstart', () => {
        const [x,y] = [5, 7];
        simulateTouch(slideView.el, 'touchstart', x, y);

        expect(slideView.state.clicked).toBe(true);
        expect(slideView.state.startIndex).toBe(slideView.state.index);
        expect(slideView.state.startX).toBe(x);
        expect(slideView.state.startY).toBe(y);
        expect(slideView.state.startEvent).toBe(true);

    });

    test('touchmove', done => {
        const [x, y] = [21, 23];

        slideView.on('@touchmove', e => {
            expect(e.detail.x).toBe(x);
            expect(e.detail.y).toBe(y);
            done();
        });

        simulateTouch(slideView.el, 'touchmove', x, y);

    });

    test('touchend', done => {
        const [x,y] = [12, 14];

        slideView.on('@touchend', e => {
            expect(e.detail.x).toBe(x);
            expect(e.detail.y).toBe(y);
            done();
        });

        simulateTouch(slideView.el, 'touchend', x, y);

    });

    function simulateClick(elem) {
        // Create our event (with options)
        var evt = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        // If cancelled, don't dispatch our event
        var canceled = !elem.dispatchEvent(evt);
    };

    function simulateTouch(el, event, x, y) {
        const e = document.createEvent('Event');
        e.initEvent(event, true, true);
        e.changedTouches = [
            {
                pageX: x,
                pageY: y
            }
        ];
        return el.dispatchEvent(e);
    };

});
