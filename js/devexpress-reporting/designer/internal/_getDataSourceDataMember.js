﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_getDataSourceDataMember.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getDataSourceDataMember(control) {
    var dataSource = null, dataMember = null;
    while (!dataSource && control) {
        dataSource = dataSource || control['dataSource'] && control['dataSource']();
        dataMember = dataMember || control['dataMember'] && control['dataMember']();
        control = control.parentModel();
    }
    return { dataSource: dataSource, dataMember: dataMember };
}
exports.getDataSourceDataMember = getDataSourceDataMember;
