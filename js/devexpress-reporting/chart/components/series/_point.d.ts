﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_point.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SeriesViewModel } from './_series';
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class SeriesPointModel extends SerializableModel {
    static separator: string;
    static getSerializationValue(array: Array<ko.Observable<any>>, dateConverter: any): any[];
    static createNew(series: any): SeriesPointModel;
    static getPointModelBySeries(series: SeriesViewModel): {
        '@ValuesSerializable': any;
    };
    static getDefaultValueByScaleType(scaleType: string): Date | 0;
    static valueToJsonObject(value: any): string;
    private _valueDataMembersToString;
    private _assignValueDataMembers;
    constructor(model: any, series: SeriesViewModel, serializer?: IModelSerializer);
    readonly isDateType: boolean;
    argumentSerializable: ko.Observable | ko.Computed;
    argumentSerializableInfo: ko.Computed;
    valuesSerializable: ko.Observable | ko.Computed;
    series: SeriesViewModel;
    arrayValueDataMemberNames: string[];
}
