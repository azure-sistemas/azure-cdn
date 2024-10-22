﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\pdfExportOptions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { PdfPasswordSecurityOptions } from './options/pdfPasswordSecurityOptions';
export declare class PdfExportOptions {
    static from(model: any, serializer?: IModelSerializer): PdfExportOptions;
    static toJson(value: any, serializer: any, refs: any): any;
    isPropertyDisabled(propertyName: string): boolean;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    hasSensitiveData(): boolean;
    pdfACompatibility: ko.Observable<string> | ko.Computed<string>;
    pdfUACompatibility: ko.Observable<string>;
    pdfPasswordSecurityOptions: PdfPasswordSecurityOptions;
}
