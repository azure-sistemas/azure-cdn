﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_template.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { QualitativeSummaryOptionsModel, NumericSummaryOptionsModel, DateTimeSummaryOptionsModel } from './_summaryOptions';
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export interface IViewBindableProperty {
    model: ko.Observable<any>;
    type: ko.Observable<string> | ko.Computed<string>;
}
export declare enum ScaleType {
    Qualitative = 0,
    Numerical = 1,
    DateTime = 2,
    Auto = 3
}
export declare var ScaleTypeMap: {
    [key: string]: ScaleType;
};
export declare class SeriesTemplateViewModel extends SerializableModel {
    static from(model: any, serializer?: IModelSerializer): SeriesTemplateViewModel;
    static toJson(value: SeriesTemplateViewModel, serializer: any, refs: any): any;
    updateByView(view: SeriesViewViewModel): void;
    preInitProperties(model: any): void;
    _isOnlyNumericArgumentScaleTypeSupported(): boolean;
    private _getCurrentSeriesPointsSortingKeys;
    private _adjustArgumentScaleType;
    private _updateSeriesPointsSortingKey;
    _isPropertyDisabled(name: string): boolean;
    constructor(model: any, serializer?: IModelSerializer, info?: ISerializationInfoArray);
    isPropertyVisible(propertyName: any): boolean;
    viewBindable: IViewBindableProperty;
    viewType: ko.Observable<string> | ko.Computed<string>;
    view: ko.Observable<SeriesViewViewModel>;
    label: SeriesLabelViewModel;
    argumentDataMember: ko.Observable<string> | ko.Computed<string>;
    argumentScaleType: ko.Observable<string> | ko.Computed<string>;
    valueScaleType: ko.Observable<string> | ko.Computed<string>;
    valueDataMembers: any;
    filterString: any;
    _filterString: any;
    qualitativeSummaryOptions: QualitativeSummaryOptionsModel;
    numericSummaryOptions: NumericSummaryOptionsModel;
    dateTimeSummaryOptions: DateTimeSummaryOptionsModel;
    _actualArgumentScaleType: ko.Observable<ScaleType>;
}
import { SeriesLabelViewModel } from './_label';
import { SeriesViewViewModel } from './_view';
