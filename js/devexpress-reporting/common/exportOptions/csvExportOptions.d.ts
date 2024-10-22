﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\csvExportOptions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class CsvExportOptions {
    static from(model: any, serializer?: IModelSerializer): CsvExportOptions;
    static toJson(value: any, serializer: any, refs: any): any;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    isPropertyDisabled(name: string): boolean;
    useCustomSeparator: ko.Observable<boolean> | ko.Computed<boolean>;
    separator: ko.Observable<string> | ko.Computed<string>;
    defaultSeparatorValue: string;
}
