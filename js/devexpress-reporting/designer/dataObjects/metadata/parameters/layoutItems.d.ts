﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\metadata\parameters\layoutItems.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare var groupLayoutItemInfo: ({
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
} | {
    propertyName: string;
    modelName: string;
    array: boolean;
})[];
export declare var parameterLayoutItemInfo: ({
    propertyName: string;
    modelName: string;
    link: boolean;
} | {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
})[];
export declare var separatorLayoutItemInfo: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
}[];
export declare var parameterPanelLayoutMapper: {
    'Parameter': ({
        propertyName: string;
        modelName: string;
        link: boolean;
    } | {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    })[];
    'Separator': {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    }[];
    'Group': ({
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    } | {
        propertyName: string;
        modelName: string;
        array: boolean;
    })[];
};
