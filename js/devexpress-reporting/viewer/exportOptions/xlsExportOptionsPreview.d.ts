﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\xlsExportOptionsPreview.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XlsExportOptions } from '../../common/exportOptions/xlsExportOptions';
import { ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
export declare class XlsExportOptionsPreview extends XlsExportOptions {
    static toJson(value: any, serializer: any, refs: any): any;
    getInfo(): ISerializationInfoArray;
    _getVariableInfo(): ISerializationInfoArray;
}
export declare class XlsExportOptionsMergedPreview extends XlsExportOptionsPreview {
    _getVariableInfo(): ISerializationInfoArray;
    isPropertyDisabled(name: string): boolean;
    constructor(model: any, serializer: any);
}
