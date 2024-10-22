﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\imageExportOptionsPreview.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ImageExportOptions } from '../../common/exportOptions/imageExportOptions';
import { ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
export declare class ImageExportOptionsPreview extends ImageExportOptions {
    static toJson(value: any, serializer: any, refs: any): any;
    getInfo(): ISerializationInfoArray;
    _getVariableInfo(): ISerializationInfoArray;
}
export declare class ImageExportOptionsMergedPreview extends ImageExportOptionsPreview {
    _getVariableInfo(): ISerializationInfoArray;
    isPropertyDisabled(name: string): boolean;
    constructor(model: any, serializer: any);
}
