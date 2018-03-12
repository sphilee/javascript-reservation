import {expect} from 'chai';
import {JSDOM} from "jsdom";

describe('mocha tests', function () {

    const {document} = (new JSDOM(`...`)).window;

    it('has document', function () {
        const div = document.createElement('div');
        expect(div.nodeName).eql('DIV');
    });

});