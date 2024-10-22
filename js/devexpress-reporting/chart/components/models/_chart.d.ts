﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_chart.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DiagramViewModel } from '../_diagram';
import { TitleViewModel } from './_title';
import { AdditionalLegendViewModel } from './_additionalLegend';
import { DataContainerViewModel } from './_dataContainer';
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class ChartViewModel extends SerializableModel {
    static from(model: any, serializer?: IModelSerializer): ChartViewModel;
    static toJson(value: any, serializer: any, refs: any): any;
    private _patchView;
    private _patchSeries;
    _createDiagram(model: any, oldType: ko.Observable<string>, serializer: any): void;
    constructor(model: any, serializer?: IModelSerializer);
    barDistance: ko.Observable<number>;
    barDistanceFixed: ko.Observable<number>;
    titles: ko.ObservableArray<TitleViewModel>;
    legends: ko.ObservableArray<AdditionalLegendViewModel>;
    dataContainer: DataContainerViewModel;
    diagram: ko.Observable<DiagramViewModel> | ko.Computed<DiagramViewModel>;
}
