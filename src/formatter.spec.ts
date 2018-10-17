import 'mocha'
import { expect } from 'chai'
import { StringReplacer, insertHtmlDelsToText } from './formatter'

describe('StringReplacer', () => {
    it('replaces char at middle with a string', () => {
        const r = new StringReplacer("aaa")
        r.replaceAtIndex(1, "xx")
        expect(r.finalize()).to.equal("axxa")
    })
    it('replaces char at the beginning with a string', () => {
        const r = new StringReplacer("aaa")
        r.replaceAtIndex(0, "xx")
        expect(r.finalize()).to.equal("xxaa")
    })
    it('replaces char at the end with a string', () => {
        const r = new StringReplacer("aaa")
        r.replaceAtIndex(2, "xx")
        expect(r.finalize()).to.equal("aaxx")
    })
    it('replaces char multiple times', () => {
        const r = new StringReplacer("aaaaa")
        r.replaceAtIndex(0, "xx")
        r.replaceAtIndex(1, "yy")
        r.replaceAtIndex(2, "zz")
        expect(r.finalize()).to.equal("xxyyzzaa")
    })
})

describe('insertHtmlDelsToText', () => {
    it('ignores strings with no dashes', () => {
        expect(insertHtmlDelsToText("aaaaaa")).to.equal("aaaaaa")
    })
    it('ignores strings with a single dash', () => {
        expect(insertHtmlDelsToText("-aaaaaa")).to.equal("-aaaaaa")
        expect(insertHtmlDelsToText("aaaaaa-")).to.equal("aaaaaa-")
        expect(insertHtmlDelsToText("aaa-aaa")).to.equal("aaa-aaa")
        expect(insertHtmlDelsToText("aaa -aaa")).to.equal("aaa -aaa")
        expect(insertHtmlDelsToText("aaa- aaa")).to.equal("aaa- aaa")
        expect(insertHtmlDelsToText("aaa - aaa")).to.equal("aaa - aaa")
    })
    it('format strings with a pair of correct dashes', () => {
        expect(insertHtmlDelsToText("-aaaaaa-")).to.equal("<del>aaaaaa</del>")
        expect(insertHtmlDelsToText("-aaa- aaa")).to.equal("<del>aaa</del> aaa")
        expect(insertHtmlDelsToText("aaa -aaa-")).to.equal("aaa <del>aaa</del>")
        expect(insertHtmlDelsToText("aa -aa- aa")).to.equal("aa <del>aa</del> aa")
    })
    it('ignore strings with a pair of wrong dashes', () => {
        expect(insertHtmlDelsToText("-aaa-aaa")).to.equal("-aaa-aaa")
        expect(insertHtmlDelsToText("aaa-aaa-")).to.equal("aaa-aaa-")
        expect(insertHtmlDelsToText("aa-aa-aa")).to.equal("aa-aa-aa")
    })
    it('format string with a pair of correct dashes and a wrong dash', () => {
        expect(insertHtmlDelsToText("-aaa-aaa-")).to.equal("<del>aaa-aaa</del>")
        expect(insertHtmlDelsToText("-a-aa- aaa")).to.equal("<del>a-aa</del> aaa")
        expect(insertHtmlDelsToText("-aaa- a-aa")).to.equal("<del>aaa</del> a-aa")
        expect(insertHtmlDelsToText("aaa -a-aa-")).to.equal("aaa <del>a-aa</del>")
        expect(insertHtmlDelsToText("a-aa -aaa-")).to.equal("a-aa <del>aaa</del>")
        expect(insertHtmlDelsToText("aa -a-a- aa")).to.equal("aa <del>a-a</del> aa")
        expect(insertHtmlDelsToText("a-a -aa- aa")).to.equal("a-a <del>aa</del> aa")
    })
    it('format string with a pair of correct dashes and a correct dash', () => {
        expect(insertHtmlDelsToText("-a -aa- aaa")).to.equal("<del>a -aa</del> aaa")
        expect(insertHtmlDelsToText("-aaa- a -aa")).to.equal("<del>aaa</del> a -aa")
        expect(insertHtmlDelsToText("aaa -a -aa-")).to.equal("aaa <del>a -aa</del>")
        expect(insertHtmlDelsToText("a- aa -aaa-")).to.equal("a- aa <del>aaa</del>")
        expect(insertHtmlDelsToText("aa -a- a- aa")).to.equal("aa <del>a- a</del> aa")
        expect(insertHtmlDelsToText("aa -a -a- aa")).to.equal("aa <del>a -a</del> aa")
        expect(insertHtmlDelsToText("a- a -aa- aa")).to.equal("a- a <del>aa</del> aa")
    })
    it('format string with two pairs of correct dashes', () => {
        expect(insertHtmlDelsToText("a -a- aa -a- a")).to.equal("a <del>a</del> aa <del>a</del> a")
        expect(insertHtmlDelsToText("-aa- aa -a- a")).to.equal("<del>aa</del> aa <del>a</del> a")
        expect(insertHtmlDelsToText("a -a- aa -aa-")).to.equal("a <del>a</del> aa <del>aa</del>")
        expect(insertHtmlDelsToText("-aa- aa -aa-")).to.equal("<del>aa</del> aa <del>aa</del>")
    })
    it('format string with two enclosing pairs of correct dashes', () => {
        expect(insertHtmlDelsToText("a -a -aa- a- a")).to.equal("a <del>a -aa- a</del> a")
    })
})