﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\expressionBinding.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export interface IExpressionBinding {
    eventName: ko.Observable<string>;
    propertyName: ko.Observable<string>;
    expression: ko.Observable<string>;
}