﻿/**
* DevExpress HTML/JS Reporting (chart\_control.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ChartViewModel } from './components/models/_chart';
import { IChartControlCallbacks } from './_initializer';
import { IDataSourceInfo, FieldListProvider } from '@devexpress/analytics-core/analytics-internal';
import { ISize } from '@devexpress/analytics-core/analytics-elements';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export interface IChartControlOptions {
    chartSource?: any;
    chart?: ChartViewModel;
    dataSource: ko.Observable<IDataSourceInfo> | ko.Computed<IDataSourceInfo>;
    size?: ISize;
    disabled?: ko.Observable<boolean> | ko.Computed<boolean>;
    callbacks?: IChartControlCallbacks;
    parameters?: ko.ObservableArray;
}
export declare class ChartControlViewModel extends Disposable {
    getInfo(): import("@devexpress/analytics-core/analytics-utils").ISerializationInfoArray;
    getControlFactory(): import("@devexpress/analytics-core/analytics-utils").ControlsFactory;
    isSeriesPropertyDisabled(name: any): boolean;
    isSeriesTemplatePropertyDisabled(name: any): boolean;
    private _getSeriesActualArgumentScaleType;
    private _initSeries;
    private _initChartElementFunctions;
    constructor(options: IChartControlOptions);
    getPath(propertyName: string): string;
    serialize(): any;
    save(): any;
    isPropertyDisabled(name: string): boolean;
    chart: ChartViewModel;
    onSave: (data: any) => void;
    dataSource: ko.Observable<IDataSourceInfo> | ko.Computed<IDataSourceInfo>;
    seriesDataMember: ko.Observable<string> | ko.Computed<string>;
    dataMember: ko.Observable<string> | ko.Computed<string>;
    fieldListProvider: ko.Observable<FieldListProvider>;
    parameters: ko.ObservableArray;
}
