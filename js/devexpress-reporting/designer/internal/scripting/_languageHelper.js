﻿/**
* DevExpress HTML/JS Reporting (designer\internal\scripting\_languageHelper.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _reportCompleter_1 = require("./_reportCompleter");
var ace_1 = require("ace-builds/src-noconflict/ace");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var mode_csharp_1 = require("ace-builds/src-noconflict/mode-csharp");
var mode_vbscript_1 = require("ace-builds/src-noconflict/mode-vbscript");
analytics_widgets_internal_1.aceAvailable(!!ace_1.default);
if (!window['ace'] && analytics_widgets_internal_1.aceAvailable()) {
    ace_1.default.config.setModuleUrl('ace/mode/csharp', mode_csharp_1.default);
    ace_1.default.config.setModuleUrl('ace/mode/vbscript', mode_vbscript_1.default);
}
var LanguageHelper = (function () {
    function LanguageHelper(report) {
        this._report = report;
    }
    LanguageHelper.prototype.getLanguageMode = function () {
        if (this._report()) {
            var scriptLanguage = this._report().scriptLanguage();
            switch (scriptLanguage) {
                case 'CSharp':
                    return 'ace/mode/csharp';
                case 'VisualBasic':
                    return 'ace/mode/vbscript';
                default:
                    return 'ace/mode/text';
            }
        }
    };
    LanguageHelper.prototype.createNewHandler = function (eventName, eventArgsType) {
        if (this._report()) {
            var scriptLanguage = this._report().scriptLanguage();
            switch (scriptLanguage) {
                case 'CSharp':
                    return '\r\nprivate void ' + eventName + '(object sender, ' + eventArgsType + ' e) {\r\n\r\n}\r\n';
                case 'VisualBasic':
                    return '\r\nPrivate Sub ' + eventName + '(ByVal sender As Object, ByVal e As ' + eventArgsType + ')\r\n\r\nEnd Sub\r\n';
                case 'JScript':
                    return '\r\nprivate final function ' + eventName + '(sender : System.Object, e : ' + eventArgsType + ') {\r\n\r\n}\r\n';
            }
        }
    };
    LanguageHelper.prototype.getFunctionNamesFromScript = function (scripts) {
        if (this._report()) {
            var keyWords = { 'CSharp': 'void ', 'VisualBasic': 'Sub ', 'JScript': 'function ' };
            var scriptLanguage = this._report().scriptLanguage();
            var events = [];
            if (scripts) {
                var lines = scripts.match(new RegExp(keyWords[scriptLanguage] + '(([A-Z])|[a-z])\\w+\\(', 'g'));
                lines && lines.forEach(function (line) {
                    events.push(line.substring(keyWords[scriptLanguage].length, line.length - 1));
                });
            }
            return events;
        }
    };
    LanguageHelper.prototype.createCompleters = function (editor, bindingContext, viewModel) {
        return [new _reportCompleter_1.ReportCompleter(bindingContext.$root.model, editor, viewModel.guid)];
    };
    return LanguageHelper;
}());
exports.LanguageHelper = LanguageHelper;
