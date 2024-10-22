﻿/**
* DevExpress HTML/JS Reporting (chart\internal\meta\_series.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
export declare var typeNameSerializable: ISerializationInfo;
export declare var barSeriesViewGroup: string[];
export declare var bar3DSeriesViewGroup: string[];
export declare var barWidth: ISerializationInfo;
export declare var colorEach: ISerializationInfo;
export declare var borderSerializationsInfo: ISerializationInfoArray;
export declare var border: ISerializationInfo;
export declare var fillMode: ISerializationInfo;
export declare var fillStyleOptionsSerialize: ISerializationInfo;
export declare var fillMode3D: ISerializationInfo;
export declare var fillStyle: ISerializationInfo;
export declare var viewSerializationsInfo: ISerializationInfoArray;
export declare var fillModeMapper: {
    'Empty': any[];
    'Solid': ISerializationInfo[];
    'Gradient': ISerializationInfoArray;
    'Hatch': ISerializationInfoArray;
};
