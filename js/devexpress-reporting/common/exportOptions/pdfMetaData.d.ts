﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\pdfMetaData.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, fromEnum } from '@devexpress/analytics-core/analytics-utils';
export declare var pdfACompatibilityValues: {
    None: string;
    PdfA1b: string;
    PdfA2b: string;
    PdfA3b: string;
};
export declare var pdfACompatibility: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    defaultVal: string;
    from: typeof fromEnum;
    valuesArray: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[];
};
export declare var pdfUACompatibilityValues: {
    None: string;
    PdfUA1: string;
};
export declare var pdfUACompatibility: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    defaultVal: string;
    from: typeof fromEnum;
    valuesArray: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[];
};
export declare var pdfExportOptionsSerializationInfo: ISerializationInfoArray;
