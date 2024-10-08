﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\extension.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
export declare class ExtensionModel {
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    key: ko.Observable<string> | ko.Computed<string>;
    value: ko.Observable<string> | ko.Computed<string>;
}
