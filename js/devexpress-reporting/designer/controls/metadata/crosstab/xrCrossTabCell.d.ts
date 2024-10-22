﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\crosstab\xrCrossTabCell.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { floatFromModel, ISerializationInfoArray, parseBool } from '@devexpress/analytics-core/analytics-utils';
export declare var autoSizeMode: import("@devexpress/analytics-core/analytics-utils").IDisplayedValue[];
export declare var rowVisible: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    defaultVal: boolean;
    from: typeof parseBool;
};
export declare var columnVisible: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    defaultVal: boolean;
    from: typeof parseBool;
};
export declare var rowAutoHeightMode: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    defaultVal: string;
    valuesArray: import("@devexpress/analytics-core/analytics-utils").IDisplayedValue[];
};
export declare var columnAutoWidthMode: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    defaultVal: string;
    valuesArray: import("@devexpress/analytics-core/analytics-utils").IDisplayedValue[];
};
export declare var crossTabCellOptionsInfo: (import("@devexpress/analytics-core/analytics-utils").ISerializationInfo | {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    defaultVal: string;
} | {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    defaultVal: boolean;
    from: typeof parseBool;
})[];
export declare var columnIndex: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    defaultVal: number;
    from: typeof floatFromModel;
    alwaysSerialize: boolean;
    disabled: boolean;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
};
export declare var rowIndex: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    defaultVal: number;
    from: typeof floatFromModel;
    alwaysSerialize: boolean;
    disabled: boolean;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
};
export declare var cellserializtionInfoBase: ISerializationInfoArray;
export declare var cellserializtionInfo: ISerializationInfoArray;
