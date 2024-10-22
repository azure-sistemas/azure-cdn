﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\crosstab\defenitions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { floatFromModel, ISerializationInfo, parseBool } from '@devexpress/analytics-core/analytics-utils';
export declare var crossTabCellWidth: {
    propertyName: string;
    modelName: string;
    localizationId: string;
    defaultVal: number;
    from: typeof floatFromModel;
};
export declare var crossTabColumnDefinitionInfo: ({
    propertyName: string;
    modelName: string;
    localizationId: string;
    defaultVal: number;
    from: typeof floatFromModel;
} | {
    propertyName: string;
    modelName: string;
    defaultVal: string;
    valuesArray: import("@devexpress/analytics-core/analytics-utils").IDisplayedValue[];
} | {
    propertyName: string;
    modelName: string;
    defaultVal: boolean;
    from: typeof parseBool;
})[];
export declare var crossTabCellHeight: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    defaultVal: number;
    from: typeof floatFromModel;
};
export declare var crossTabRowDefinitionInfo: ({
    propertyName: string;
    modelName: string;
    defaultVal: boolean;
    from: typeof parseBool;
} | {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    defaultVal: number;
    from: typeof floatFromModel;
} | {
    propertyName: string;
    modelName: string;
    defaultVal: string;
    valuesArray: import("@devexpress/analytics-core/analytics-utils").IDisplayedValue[];
})[];
export declare var rowDefinitions: ISerializationInfo;
export declare var columnDefinitions: ISerializationInfo;
