﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\metadata\parameters\rangeSettings.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import { PropertyGridEditorFlat } from '@devexpress/analytics-core/analytics-widgets';
export declare var rangeEditor: {
    custom: string;
    editorType: typeof PropertyGridEditorFlat;
};
export declare var rangeBoundaryParameterInfos: (ISerializationInfo | {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    defaultVal: string;
    validationRules: {
        type: string;
        validationCallback: (options: any) => boolean;
        readonly message: any;
    }[];
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
})[];
export declare var rangeSettingsInfos: ISerializationInfo[];
