﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_progressBarUtils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _sizeUtils_1 = require("./_sizeUtils");
var ko = require("knockout");
var $ = require("jquery");
function getUpdateProgressBarCallback(progressBarSettings, designerModel, reportPreview, rootElement, $window) {
    if ($window === void 0) { $window = $(window); }
    var keepProgressBarVisible = !progressBarSettings || progressBarSettings.keepOnVisibleArea !== false;
    var position = _sizeUtils_1.stringToPosition(progressBarSettings && progressBarSettings.position);
    reportPreview.progressBar.setPosition(position);
    if (!keepProgressBarVisible)
        return $.noop;
    var $root = $(rootElement);
    var $progress = $root.find('.dxrd-preview-progress');
    var updateProgressBarPosition = _sizeUtils_1.getDockedElementCallback($progress, $root, $window, '.dxrd-preview-progress', position);
    designerModel._addDisposable(reportPreview.progressBar.visible.subscribe(function (isVisible) {
        isVisible && updateProgressBarPosition(rootElement);
    }));
    var wrappedUpdateProgressPosition = function () {
        if (reportPreview.progressBar && ko.unwrap(reportPreview.progressBar.visible))
            updateProgressBarPosition(rootElement);
    };
    window.addEventListener('scroll', wrappedUpdateProgressPosition);
    designerModel._addDisposable({
        dispose: function () {
            window.removeEventListener('scroll', wrappedUpdateProgressPosition);
        }
    });
    return wrappedUpdateProgressPosition;
}
exports.getUpdateProgressBarCallback = getUpdateProgressBarCallback;
