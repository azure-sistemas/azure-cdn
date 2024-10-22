﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\options\pdfExportDocumentOptions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer, ISerializationInfoArray, ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
export declare class PdfExportDocumentOptions {
    static from(model: any, serializer?: IModelSerializer): PdfExportDocumentOptions;
    static toJson(value: any, serializer: any, refs: any): any;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
}
export declare var author: ISerializationInfo;
export declare var application: ISerializationInfo;
export declare var title: ISerializationInfo;
export declare var subject: ISerializationInfo;
export declare var pdfExportDocumentOptionsSerializationInfo: ISerializationInfoArray;
