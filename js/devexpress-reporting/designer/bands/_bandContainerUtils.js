﻿/**
* DevExpress HTML/JS Reporting (designer\bands\_bandContainerUtils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xrDetailBand_1 = require("./xrDetailBand");
var xrVerticalBand_1 = require("./xrVerticalBand");
var _bandUtils_1 = require("./_bandUtils");
function addBandToContainer(container, control) {
    control.parentModel(container);
    if (control instanceof xrDetailBand_1.DetailBand) {
        container.bands().filter(function (x) { return x instanceof xrVerticalBand_1.VerticalBandViewModel; }).forEach(function (x) { return container.removeChild(x); });
    }
    else if (control instanceof xrVerticalBand_1.VerticalBandViewModel) {
        if (container.bands().every(function (x) { return !(x instanceof xrVerticalBand_1.VerticalBandViewModel); })) {
            var detailBand = container.bands().filter(function (x) { return x instanceof xrDetailBand_1.DetailBand; })[0];
            detailBand && container.removeChild(detailBand);
            if (control.controlType !== 'VerticalDetailBand')
                container.createChild({ '@ControlType': 'VerticalDetailBand', '@HeightF': container.root.dpi() });
        }
        else {
            var band = container.bands().filter(function (x) { return x instanceof xrVerticalBand_1.VerticalBandViewModel; })[0];
            if (band)
                control.height(band.height());
        }
    }
    _bandUtils_1.insertBand(container.bands, control);
}
exports.addBandToContainer = addBandToContainer;
