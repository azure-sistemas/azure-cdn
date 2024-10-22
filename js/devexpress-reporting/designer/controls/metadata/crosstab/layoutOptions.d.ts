﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\crosstab\layoutOptions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { parseBool } from '@devexpress/analytics-core/analytics-utils';
export declare var crossTabLayoutOptionsInfo: ({
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    defaultVal: string;
    valuesArray: {
        displayValue: string;
        value: string;
        localizationId: string;
    }[];
    from?: undefined;
} | {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    defaultVal: boolean;
    from: typeof parseBool;
    valuesArray?: undefined;
})[];
export declare var crossTabLayoutOptions: {
    propertyName: string;
    modelName: string;
    localizationId: string;
    displayName: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    info: ({
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
        defaultVal: string;
        valuesArray: {
            displayValue: string;
            value: string;
            localizationId: string;
        }[];
        from?: undefined;
    } | {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
        defaultVal: boolean;
        from: typeof parseBool;
        valuesArray?: undefined;
    })[];
};
