﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_bindings.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xrCheckbox_1 = require("../xrCheckbox");
var ko = require("knockout");
var svgAttrs = ko.bindingHandlers['svgAttrs'];
ko.bindingHandlers['svgAttrs'] = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        svgAttrs.update(element, valueAccessor, allBindingsAccessor, viewModel);
        if (viewModel instanceof xrCheckbox_1.XRCheckBoxSurface) {
            element.setAttribute('preserveAspectRatio', 'none');
        }
    }
};
