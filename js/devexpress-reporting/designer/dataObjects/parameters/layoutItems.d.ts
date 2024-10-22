﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\layoutItems.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
export declare class ParameterPanelLayoutItem extends SerializableModel {
    constructor(model: any, serializer: any);
    preInitProperties(model: any): void;
    layoutItemType: ko.Observable<string>;
    items: ko.ObservableArray<ParameterPanelLayoutItem>;
}
