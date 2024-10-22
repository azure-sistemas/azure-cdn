﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\metadata\parameters\parameter.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
export declare var valueSourceSettingsTypes: {
    value: string;
    displayValue: string;
    localizationId: string;
}[];
export declare var extendValueSourceSettingsTypes: any;
export declare var parameterValueSerializationInfo: ISerializationInfo;
export declare var parameterExpressionSerializationInfo: ISerializationInfo;
export declare var parameterLookUpSettingsSerializationInfo: ISerializationInfo;
export declare var valueSourceSettingsSerializationInfo: ISerializationInfo;
export declare var parameterNameSerializationInfo: {
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
};
export declare var parameterSerializationInfo: ISerializationInfoArray;
