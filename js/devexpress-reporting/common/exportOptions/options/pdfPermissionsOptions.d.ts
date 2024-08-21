﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\options\pdfPermissionsOptions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
export declare class PdfPermissionsOptions {
    static from(model: any, serializer?: IModelSerializer): PdfPermissionsOptions;
    static toJson(value: any, serializer: any, refs: any): any;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
}
export declare var pdfExportPermissionsOptionsSerializationInfo: ISerializationInfoArray;
