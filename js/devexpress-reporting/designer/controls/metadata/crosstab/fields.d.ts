﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\crosstab\fields.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
export declare var crossTabFieldName: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    defaultVal: string;
};
export declare var crossTabGroupInterval: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    defaultVal: string;
    valuesArray: import("@devexpress/analytics-core/analytics-utils").IDisplayedValue[];
};
export declare var crossTabGroupIntervalNumericRange: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    defaultVal: number;
};
export declare var crossTabSummaryType: any;
export declare var crossTabSortBySummaryInfo: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    info: any[];
};
export declare var crossTabDataFieldInfoBase: ISerializationInfoArray;
export declare var crossTabDataFieldInfo: ISerializationInfo[];
export declare var sortOrderdefaultValAscending: any;
export declare var crossTabGroupFieldInfoBase: ISerializationInfoArray;
export declare var crossTabGroupFieldInfo: ISerializationInfo[];
export declare var rowFields: ISerializationInfo;
export declare var columnFields: ISerializationInfo;
export declare var dataFields: ISerializationInfo;
