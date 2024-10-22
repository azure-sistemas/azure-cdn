﻿/**
* DevExpress HTML/JS Reporting (chart\internal\meta\_diagram.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
export declare var diagram: ISerializationInfo;
export declare var secondaryAxesX: ISerializationInfo;
export declare var secondaryAxesY: ISerializationInfo;
export declare var panes: ISerializationInfo;
export declare var diagramSerializationsInfo: ISerializationInfoArray;
export declare var diagramMapper: {
    [key: string]: {
        info: ISerializationInfoArray;
        type: string;
    };
};
