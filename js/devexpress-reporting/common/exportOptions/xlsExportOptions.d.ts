﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\xlsExportOptions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
export declare class XlsExportOptions {
    static from(model: any, serializer?: IModelSerializer): XlsExportOptions;
    static toJson(value: any, serializer: any, refs: any): any;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    isPropertyDisabled(name: string): boolean;
    hasSensitiveData(): boolean;
    xlsExportMode: ko.Observable<string> | ko.Computed<string>;
    encryptionOptions: {
        password: ko.Observable<string>;
    };
}
