﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_htmlMarkUpConverter.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var TextTag = (function () {
    function TextTag(node, inheritValues) {
        this.node = node;
        this.inheritValues = inheritValues;
        this.value = null;
        this.element = null;
        this.hasChildNodes = false;
        this.value = this.node.getAttribute && this.node.getAttribute(ValueConverter.ValueAttrName);
        if (this.value)
            this.value = this.value.trim();
    }
    TextTag.prototype.createElement = function () {
        this.element = document.createTextNode(this.node.outerHTML || this.node.textContent || this.node['data']);
    };
    TextTag.prototype.setProperties = function (parameters, inheritValues) { };
    TextTag.prototype.appendTo = function (el) {
        el.appendChild(this.element);
    };
    return TextTag;
}());
var SpanTag = (function (_super) {
    __extends(SpanTag, _super);
    function SpanTag() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hasChildNodes = true;
        return _this;
    }
    SpanTag.prototype.createElement = function () {
        this.element = document.createElement('span');
        if (this.inheritValues.backcolor) {
            this.element.style.backgroundColor = 'inherit';
        }
    };
    return SpanTag;
}(TextTag));
var AnchorTag = (function (_super) {
    __extends(AnchorTag, _super);
    function AnchorTag() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hasChildNodes = true;
        return _this;
    }
    AnchorTag.prototype.createElement = function () {
        this.element = document.createElement('a');
    };
    AnchorTag.prototype.setProperties = function () {
        this.element.href = 'javascript:void(0);';
    };
    return AnchorTag;
}(TextTag));
var ImageTag = (function (_super) {
    __extends(ImageTag, _super);
    function ImageTag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageTag.prototype.appendTo = function (el) { };
    return ImageTag;
}(TextTag));
var SimpleTag = (function (_super) {
    __extends(SimpleTag, _super);
    function SimpleTag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimpleTag.prototype.createElement = function () {
        this.element = document.createElement(this.node.nodeName);
    };
    return SimpleTag;
}(SpanTag));
var ColorTag = (function (_super) {
    __extends(ColorTag, _super);
    function ColorTag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorTag.prototype.setProperties = function () {
        this.element.style.color = analytics_utils_1.colorFromString(this.value)();
    };
    return ColorTag;
}(SpanTag));
var BackColorTag = (function (_super) {
    __extends(BackColorTag, _super);
    function BackColorTag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BackColorTag.prototype.setProperties = function () {
        this.element.style.backgroundColor = analytics_utils_1.colorFromString(this.value)();
        this.inheritValues.backcolor = true;
    };
    return BackColorTag;
}(SpanTag));
var SizeTag = (function (_super) {
    __extends(SizeTag, _super);
    function SizeTag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SizeTag.prototype.setProperties = function (parameters) {
        var sizeValue;
        var textValue = this.value;
        if (textValue && (textValue[0] === '+' || textValue[0] === '-')) {
            var _val = parseFloat(textValue.substr(1));
            sizeValue = this.inheritValues.fontSize + (textValue[0] === '+' ? _val : _val * (-1));
        }
        else {
            sizeValue = parseFloat(textValue);
        }
        if (!isNaN(sizeValue))
            this.element.style.fontSize = sizeValue + (parameters.fontUnit || 'pt');
        else
            sizeValue = this.inheritValues.fontSize;
        this.inheritValues.fontSize = sizeValue;
    };
    return SizeTag;
}(SpanTag));
var ValueConverter = (function () {
    function ValueConverter(_displayNameParameters) {
        this._displayNameParameters = _displayNameParameters;
        this._regExp = /<(<*)(\/?)(\s*\w+\s*)(=(\s*.+?\s*)|\b[^>]*)?>/gm;
    }
    ValueConverter.prototype._createTag = function (node, inheritValues) {
        if (!this._checkValidTag(node.nodeName) || node.nodeName === '#text') {
            return new TextTag(node, inheritValues);
        }
        else if (node.nodeName === 'COLOR') {
            return new ColorTag(node, inheritValues);
        }
        else if (node.nodeName === 'BACKCOLOR') {
            return new BackColorTag(node, inheritValues);
        }
        else if (node.nodeName === 'HREF') {
            return new AnchorTag(node, inheritValues);
        }
        else if (node.nodeName === 'SIZE') {
            return new SizeTag(node, inheritValues);
        }
        else if (node.nodeName === 'IMG') {
            return new ImageTag(node, inheritValues);
        }
        else if (node.nodeName !== '#text') {
            return new SimpleTag(node, inheritValues);
        }
    };
    ValueConverter.prototype._parceToXml = function (str) {
        var matches;
        while ((matches = this._regExp.exec(str)) !== null) {
            if (matches.index === this._regExp.lastIndex) {
                this._regExp.lastIndex++;
            }
            var fullmatch = matches[0];
            var escapeTag = matches[1];
            var closingTag = matches[2] === '/' ? '/' : '';
            var tag = matches[3];
            var value = matches[5];
            var replacedStr = '';
            if (this._checkValidTag(tag) && !escapeTag) {
                if (value) {
                    replacedStr = '<' + tag + ' ' + ValueConverter.ValueAttrName + "='" + value + "'>";
                }
                else {
                    replacedStr = '<' + closingTag + tag + '>';
                }
            }
            else {
                var _fullmatch = fullmatch;
                if (!!escapeTag) {
                    _fullmatch = _fullmatch.slice(escapeTag.length);
                }
                var $spanEscape = $('<span>');
                replacedStr = $spanEscape.text(_fullmatch)[0].innerHTML;
            }
            str = str.replace(fullmatch, replacedStr);
        }
        str = str.replace(/<nbsp>/g, '&nbsp;');
        str = str.replace(/<br>/g, this._displayNameParameters.wordWrap ? '<br>' : '');
        return str;
    };
    ValueConverter.prototype._checkValidTag = function (tag) {
        switch (tag.toLocaleLowerCase()) {
            case 'href':
            case 'color':
            case 'backcolor':
            case 'size':
            case 'img':
            case 'image':
            case 'br':
            case 'b':
            case 'i':
            case 'u':
            case 'nbsp':
            case 's': return true;
        }
        return false;
    };
    ValueConverter.prototype._createTree = function (treeElement, writeTo, inheritValues) {
        var _this = this;
        if (inheritValues === void 0) { inheritValues = { fontSize: this._displayNameParameters.fontSize || 0 }; }
        if (treeElement.childNodes.length > 0) {
            var childNodes = Array.prototype.slice.call(treeElement.childNodes);
            childNodes.forEach(function (node) {
                var tag = _this._createTag(node, { fontSize: inheritValues.fontSize, backcolor: inheritValues.backcolor });
                tag.createElement();
                tag.setProperties(_this._displayNameParameters);
                tag.appendTo(writeTo);
                if (tag.hasChildNodes)
                    _this._createTree(node, tag.element, tag.inheritValues);
            });
        }
    };
    ValueConverter.prototype.appendTo = function (element) {
        if (!element)
            return;
        var fragment = document.createDocumentFragment();
        var temp = document.createElement('div');
        fragment.appendChild(temp);
        ko.utils.setHtml(element, '');
        ko.utils.setHtml(temp, this._parceToXml(this._displayNameParameters.text));
        this._createTree(temp, element);
        fragment.removeChild(temp);
    };
    ValueConverter.ValueAttrName = 'value';
    return ValueConverter;
}());
exports.ValueConverter = ValueConverter;
