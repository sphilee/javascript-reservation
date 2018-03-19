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
        slideView.showSlides({Immediately:true});
        expect(slideView.slideListEl.style.transform).toBe(`translateX(${ -slideView.state.index * 100}%)`);
        expect(slideView.slideListEl.style.transitionDuration).toBe("0s");

        slideView.showSlides({Immediately:false});
        expect(slideView.slideListEl.style.transform).toBe(`translateX(${ -slideView.state.index * 100}%)`);
        expect(slideView.slideListEl.style.transitionDuration).toBe("0.5s");

    });

});