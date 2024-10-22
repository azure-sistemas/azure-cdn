﻿/**
* DevExpress HTML/JS Reporting (designer\internal\scripting\_reportCompleter.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _reportScriptService_1 = require("../../services/_reportScriptService");
var _reportDummyCreator_1 = require("./_reportDummyCreator");
var ReportCompleter = (function () {
    function ReportCompleter(report, editorInstance, guid) {
        this.completions = [];
        this.report = report;
        this.editorInstance = editorInstance;
        this.guid = guid;
        this.oldPrefix = null;
    }
    ReportCompleter.prototype.__getCompletions = function (editor, session, pos, prefix, callback) {
        var self = this;
        _reportScriptService_1.ReportScriptService.getCompletions(editor, session, pos, prefix, callback, this.report(), this.editorInstance, this.guid())
            .done(function (result) {
            if (result) {
                if (result.State === 1) {
                    _reportScriptService_1.ReportScriptService.setCodeDom(self.guid(), JSON.stringify({
                        'XtraReportsLayoutSerializer': _reportDummyCreator_1.ReportDummyCreator._createDummy(self.report().serialize())
                    })).done(function (result) {
                        self.guid(result.Guid);
                        self.__getCompletions(editor, session, pos, prefix, callback);
                    });
                }
                else {
                    var errors = [];
                    if (result.Errors.length > 0) {
                        var linesCount = editor.getSession().getLength();
                        result.Errors.forEach(function (error) {
                            if (error.Line < linesCount && error.Line >= 0) {
                                errors.push({
                                    row: error.Line + 1,
                                    column: error.Column,
                                    text: error.ErrorNumber + ' - ' + error.ErrorText,
                                    type: error.IsWarning ? 'warning' : 'error'
                                });
                            }
                        });
                        editor.getSession().setAnnotations(errors);
                    }
                    self.completions = result.Completions;
                    callback(null, result.Completions);
                }
            }
        });
    };
    ReportCompleter.prototype.getCompletions = function (editor, session, pos, prefix, callback) {
        if (!this.oldPrefix || prefix[0] !== this.oldPrefix) {
            this.oldPrefix = prefix[0];
            this.__getCompletions(editor, session, pos, prefix, callback);
        }
        else if (this.oldPrefix == prefix[0] && this.completions.length > 0) {
            callback(null, this.completions);
        }
    };
    return ReportCompleter;
}());
exports.ReportCompleter = ReportCompleter;
