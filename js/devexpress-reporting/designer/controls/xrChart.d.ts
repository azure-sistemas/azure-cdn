﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrChart.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRControlViewModel, XRControlSurface } from './xrControl';
import { ChartViewModel } from '../../chart/components/models/_chart';
import { ChartControlViewModel } from '../../chart/_control';
import { ChartLocalizationProvider } from './utils/_localizationUtils';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { ElementViewModel, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import * as ko from 'knockout';
export declare class XRChartViewModel extends XRControlViewModel {
    static assignValueDataMembers(chart: ChartViewModel, str: string): void;
    static setDataMembers(chart: ChartViewModel, isPivotGrid: boolean): void;
    private _createChartModel;
    createLocalizationProvider(): ChartLocalizationProvider;
    constructor(model: any, parent: ElementViewModel, serializer?: ModelSerializer);
    isPropertyDisabled(name: string): any;
    getPath(propertyName: string): string;
    pivotGridDataSourceOptions: ko.Computed<any>;
    isPivotGridDataSource: ko.Observable<boolean> | ko.Computed<boolean>;
    seriesDataMember: ko.Observable<string> | ko.Computed<string>;
    dataMember: ko.Observable<string> | ko.Computed<string>;
    chart: ChartViewModel;
    chartModel: ChartControlViewModel;
    dataSource: ko.Observable | ko.Computed;
    realDataSource: ko.Observable | ko.Computed;
    controlParameters: ko.ObservableArray<any>;
}
export declare class XRChartSurface extends XRControlSurface {
    constructor(control: XRChartViewModel, context: ISurfaceContext);
    designTime: ko.Observable<boolean>;
    isLoading: ko.Observable<boolean>;
    imageSrc: ko.Observable<string>;
    runDesignerButtonText(): any;
}
