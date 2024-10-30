"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TextEditor_content, _TextEditor_state, _TextEditor_history, _TextString_text;
class TextEditor {
    constructor() {
        _TextEditor_content.set(this, void 0);
        _TextEditor_state.set(this, void 0);
        _TextEditor_history.set(this, void 0);
        __classPrivateFieldSet(this, _TextEditor_content, "", "f");
        __classPrivateFieldSet(this, _TextEditor_state, 1, "f");
        __classPrivateFieldSet(this, _TextEditor_history, [new TextString("")], "f");
    }
    getContent() {
        return __classPrivateFieldGet(this, _TextEditor_content, "f");
    }
    setContent(content) {
        var _a, _b;
        __classPrivateFieldSet(this, _TextEditor_content, content, "f");
        __classPrivateFieldGet(this, _TextEditor_history, "f")[__classPrivateFieldSet(this, _TextEditor_state, (_b = __classPrivateFieldGet(this, _TextEditor_state, "f"), _a = _b++, _b), "f"), _a] = new TextString(content);
    }
    undoContent() {
        if (__classPrivateFieldGet(this, _TextEditor_state, "f") - 2 >= 0) {
            __classPrivateFieldSet(this, _TextEditor_state, __classPrivateFieldGet(this, _TextEditor_state, "f") - 1, "f");
            __classPrivateFieldGet(this, _TextEditor_history, "f").pop();
            __classPrivateFieldSet(this, _TextEditor_content, __classPrivateFieldGet(this, _TextEditor_history, "f")[__classPrivateFieldGet(this, _TextEditor_state, "f") - 1].getText(), "f");
        }
        else {
            throw "You have reached the original state back.";
        }
    }
}
_TextEditor_content = new WeakMap(), _TextEditor_state = new WeakMap(), _TextEditor_history = new WeakMap();
class TextString {
    constructor(text) {
        _TextString_text.set(this, void 0);
        __classPrivateFieldSet(this, _TextString_text, text, "f");
    }
    getText() {
        return __classPrivateFieldGet(this, _TextString_text, "f");
    }
}
_TextString_text = new WeakMap();
const btn = document.querySelectorAll("button");
const txtBox = document.querySelector(".text-box");
const tE = new TextEditor();
btn[0].onclick = function () {
    tE.setContent(txtBox.value);
    console.log(txtBox.value);
};
btn[1].onclick = function () {
    try {
        tE.undoContent();
        txtBox.value = tE.getContent();
    }
    catch (error) {
        console.warn(error);
    }
};
