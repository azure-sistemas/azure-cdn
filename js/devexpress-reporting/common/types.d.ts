﻿/**
* DevExpress HTML/JS Reporting (common\types.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export interface IKeyValuePair<T> {
    Key: string;
    Value: T;
}
export declare function convertMapToKeyValuePair(object: any): any[];
