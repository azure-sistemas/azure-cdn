﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\options\pdfPasswordSecurityOptions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer, ISerializationInfoArray, ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
export declare class PdfPasswordSecurityOptions {
    static from(model: any, serializer?: IModelSerializer): PdfPasswordSecurityOptions;
    static toJson(value: any, serializer: any, refs: any): any;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    isPropertyDisabled(name: string): boolean;
    hasSensitiveData(): boolean;
    openPassword: ko.Observable<string> | ko.Computed<string>;
    permissionsPassword: ko.Observable<string> | ko.Computed<string>;
}
export declare var pdfEncryptionLevel: ISerializationInfo;
export declare var pdfExportPasswordSecurityOptionsSerializationInfo: ISerializationInfoArray;
