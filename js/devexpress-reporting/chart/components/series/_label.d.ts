﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_label.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
export declare class SeriesLabelViewModel extends SerializableModel {
    static from(model: any, serializer?: IModelSerializer): SeriesLabelViewModel;
    static toJson(value: any, serializer: any, refs: any): any;
    constructor(model: any, serializer?: IModelSerializer);
    typeNameSerializable: ko.Observable<string> | ko.Computed<string>;
    seriesLabelPosition: ko.Observable<string>;
}
