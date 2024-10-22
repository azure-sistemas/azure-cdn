﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_createIDataMemberInfoByName.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createIDataMemberInfoByName(name, specifics) {
    if (specifics === void 0) { specifics = 'list'; }
    return {
        displayName: name,
        name: name,
        specifics: specifics,
        isList: specifics === 'list' ? true : false
    };
}
exports.createIDataMemberInfoByName = createIDataMemberInfoByName;
