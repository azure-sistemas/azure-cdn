﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\metadata.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo, ISerializationInfoArray, IDisplayedValue } from '@devexpress/analytics-core/analytics-utils';
export interface ISerializationInfoWithBindings extends ISerializationInfo {
    bindingName?: string;
}
export declare var textAlignmentValues: {
    value: string;
    displayValue: string;
    localizationId: string;
}[];
export declare var borderDashStyleValues: {
    value: string;
    displayValue: string;
    localizationId: string;
}[];
export declare var stylePrioritySerializationInfo: ISerializationInfoArray;
export declare var xlsxFormatString: ISerializationInfo;
export declare var name: ISerializationInfo;
export declare var displayName: ISerializationInfo;
export declare var text: ISerializationInfo;
export declare var textArea: ISerializationInfo;
export declare var textTrimming: ISerializationInfo;
export declare var size: ISerializationInfo;
export declare var location: ISerializationInfo;
export declare var defaultBooleanValuesArray: Array<IDisplayedValue>;
export declare var tag: ISerializationInfo;
export declare var lockedInUserDesigner: ISerializationInfo;
export declare var visible: ISerializationInfo;
export declare var backColor: ISerializationInfo;
export declare var foreColor: ISerializationInfo;
export declare var font: ISerializationInfo;
export declare var expressionableFont: ISerializationInfo;
export declare var expressionableFontInfo: ISerializationInfoArray;
export declare var borderColor: ISerializationInfo;
export declare var borders: ISerializationInfo;
export declare var borderWidth: ISerializationInfo;
export declare var borderDashStyle: ISerializationInfo;
export declare var paddingString: ISerializationInfo;
export declare var padding: ISerializationInfo;
export declare var textAlignment: ISerializationInfo;
export declare var textFitMode: ISerializationInfo;
export declare var angle: ISerializationInfo;
export declare var canGrow: ISerializationInfo;
export declare var canShrink: ISerializationInfo;
export declare var multiline: ISerializationInfo;
export declare var wordWrap: ISerializationInfo;
export declare var allowMarkupText: ISerializationInfo;
export declare var autoWidth: ISerializationInfo;
export declare var keepTogether: ISerializationInfo;
export declare var keepTogetherDefaultValueFalse: ISerializationInfo;
export declare var processDuplicatesTarget: ISerializationInfo;
export declare var processDuplicatesMode: ISerializationInfo;
export declare var processNullValues: ISerializationInfo;
export declare var reportPrintOptionsSerializationInfo: ISerializationInfoArray;
export declare var dataAdapter: ISerializationInfo;
export declare var dataSource: ISerializationInfo;
export declare var dataMember: ISerializationInfo;
export declare var filterString: ISerializationInfo;
export declare var filterStringEditable: ISerializationInfo;
export declare var bookmark: ISerializationInfo;
export declare var bookmarkParent: ISerializationInfo;
export declare var navigateUrl: ISerializationInfo;
export declare var target: ISerializationInfo;
export declare var nullValueText: ISerializationInfo;
export declare function getSummaryFunctionValues(): Array<IDisplayedValue>;
export declare var summaryFunctionValues: Array<IDisplayedValue>;
export declare var textFormatString: ISerializationInfo;
export declare function createSummarySerializationInfo(summaryFunctions?: IDisplayedValue[]): ISerializationInfoArray;
export declare var summarySerializationInfo: ISerializationInfoArray;
export declare var summary: ISerializationInfo;
export declare var reportPrintOptions: ISerializationInfo;
export declare var lineWidth: ISerializationInfo;
export declare var lineStyle: ISerializationInfo;
export declare var dpi: ISerializationInfo;
export declare var canPublish: ISerializationInfo;
export declare var rtl: ISerializationInfo;
export declare var imageType: ISerializationInfo;
export declare var paddingGroup: ISerializationInfo[];
export declare var accessibleDescription: ISerializationInfo;
export declare var cells: {
    propertyName: string;
    modelName: string;
    array: boolean;
};
export declare var sortOrder: {
    propertyName: string;
    modelName: string;
    displayName: string;
    localizationId: string;
    defaultVal: string;
    editor: import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    valuesArray: {
        value: string;
        displayValue: string;
        localizationId: string;
    }[];
};
