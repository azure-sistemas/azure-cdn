﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\imageExportOptions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
export declare class ImageExportOptions {
    static from(model: any, serializer?: IModelSerializer): ImageExportOptions;
    static toJson(value: any, serializer: any, refs: any): any;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    isPropertyDisabled(name: string): boolean;
    imageExportMode: ko.Observable<string> | ko.Computed<string>;
}
