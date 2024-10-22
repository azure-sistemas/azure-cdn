﻿/**
* DevExpress HTML/JS Reporting (designer\controls\getNearestBand.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xrBand_1 = require("../bands/xrBand");
function getNearestBand(target) {
    var bandModel = null;
    var model = target;
    do {
        if (model instanceof xrBand_1.BandViewModel)
            bandModel = model;
        model = model.parentModel();
    } while (!bandModel && model);
    return bandModel;
}
exports.getNearestBand = getNearestBand;
