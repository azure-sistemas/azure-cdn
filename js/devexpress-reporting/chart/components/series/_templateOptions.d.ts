﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_templateOptions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ValueWeightDataMembers } from '../../internal/data/_valueWeight';
import { Value1Value2DataMembers } from '../../internal/data/_value1Value2';
import { StockValueDataMembers } from '../../internal/data/_stockValue';
export declare var viewTypesDataMembers: {
    'BubbleSeriesView': typeof ValueWeightDataMembers;
    'OverlappedRangeBarSeriesView': typeof Value1Value2DataMembers;
    'SideBySideRangeBarSeriesView': typeof Value1Value2DataMembers;
    'RangeAreaSeriesView': typeof Value1Value2DataMembers;
    'RangeArea3DSeriesView': typeof Value1Value2DataMembers;
    'OverlappedGanttSeriesView': typeof Value1Value2DataMembers;
    'SideBySideGanttSeriesView': typeof Value1Value2DataMembers;
    'StockSeriesView': typeof StockValueDataMembers;
    'CandleStickSeriesView': typeof StockValueDataMembers;
};
export declare var mapTypes: {
    [key: string]: string;
};
export declare var onlyNumericArgumentSupportedSeriesViewTypes: Array<string>;
