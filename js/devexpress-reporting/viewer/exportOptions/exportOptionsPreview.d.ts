﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\exportOptionsPreview.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ExportOptions } from '../../common/exportOptions/exportOptions';
import { ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
export declare class ExportOptionsPreview extends ExportOptions {
    _generateFromFunction(exportType: any): (model: any, serializer: any) => any;
    _generateInfo(): ISerializationInfoArray;
    hasSensitiveData(): boolean;
    getInfo(): ISerializationInfoArray;
}
export declare class ExportOptionsMergedPreview extends ExportOptionsPreview {
    _generateInfo(): ISerializationInfoArray;
}
