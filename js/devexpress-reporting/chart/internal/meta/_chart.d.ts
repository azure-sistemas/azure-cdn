﻿/**
* DevExpress HTML/JS Reporting (chart\internal\meta\_chart.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
export declare var commonSeriesPointsSortingKeys: {
    value: string;
    displayValue: string;
    localizationId: string;
}[], bubbleSeriesPointsSortingKeys: {
    value: string;
    displayValue: string;
    localizationId: string;
}[], rangeSeriesPointsSortingKeys: {
    value: string;
    displayValue: string;
    localizationId: string;
}[], stockSeriesPointsSortingKeys: {
    value: string;
    displayValue: string;
    localizationId: string;
}[];
export declare var seriesPointsSorting: ISerializationInfo, seriesPointsSortingKey: ISerializationInfo, legendTextPattern: ISerializationInfo, _argumentScaleTypeValidatorOptions: {
    _seriesViewModel: any;
    onInitialized: (e: any) => void;
    validationRules: {
        type: string;
        reevaluate: boolean;
        validationCallback: (params: any) => boolean;
    }[];
}, argumentScaleType: ISerializationInfo, valueScaleType: ISerializationInfo, labelsVisibility: ISerializationInfo, argumentDataMember: ISerializationInfo, valueDataMembersSerializable: ISerializationInfo;
export declare var barPositionValues: {
    value: string;
    displayValue: string;
    localizationId: string;
}[];
export declare var piePositionValues: {
    value: string;
    displayValue: string;
    localizationId: string;
}[];
export declare var funnelPositionValues: {
    value: string;
    displayValue: string;
    localizationId: string;
}[];
export declare var waterfallPositionValues: {
    value: string;
    displayValue: string;
    localizationId: string;
}[];
export declare var padding: ISerializationInfo;
export declare var seriesLabelSerializationsInfo: ISerializationInfoArray;
export declare var seriesLabel: ISerializationInfo;
export declare var pivotGridDataSourceOptions: ISerializationInfo;
export declare var valuesSerializable: ISerializationInfo, argumentSerializable: ISerializationInfo, colorSerializable: ISerializationInfo;
export declare var seriesPointSerializationsInfo: ISerializationInfo[];
export declare var points: ISerializationInfo;
export declare var createViewsArray: (limitation: any) => any[];
export declare var view: ISerializationInfo;
export declare var viewBindableSerializationInfo: ISerializationInfo;
export declare var qualitativeSummaryOptions: ISerializationInfo;
export declare var numericSummaryOptions: ISerializationInfo;
export declare var dateTimeSumaryOptions: ISerializationInfo;
export declare var seriesTemplateSerializationsInfo: ISerializationInfoArray;
export declare var seriesTemplate: ISerializationInfo;
export declare var seriesSerializationsInfo: ISerializationInfoArray;
export declare var seriesSerializable: ISerializationInfo;
export declare var seriesDataMember: ISerializationInfo;
export declare var dataContainerSerializationsInfo: ISerializationInfoArray;
export declare var dataContainer: ISerializationInfo;
export declare var emptyChartTextSerializationsInfo: ISerializationInfoArray;
export declare var emptyChartText: ISerializationInfo;
export declare var titleSerializationsInfo: ISerializationInfoArray;
export declare var titles: ISerializationInfo;
export declare var legendSerializationsInfo: ISerializationInfoArray;
export declare var legend: ISerializationInfo;
export declare var additionalLegendSerializationsInfo: ISerializationInfoArray;
export declare var legends: ISerializationInfo;
export declare var appearanceName: ISerializationInfo;
export declare var paletteName: ISerializationInfo;
export declare var backImage: ISerializationInfo;
export declare var chartSerializationsInfo: ISerializationInfoArray;
export declare var chart: ISerializationInfo;
export declare var chartDataMember: ISerializationInfo;
export declare var chartSeriesDataMember: ISerializationInfo;
export declare var fakeChartSerializationInfo: ISerializationInfoArray;
export declare var chartControlSerializationsInfo: ISerializationInfoArray;
