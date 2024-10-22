﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\sortingOptions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BandViewModel } from '../../bands/xrBand';
import { ReportViewModel } from '../xrReport';
import { ISerializationInfoArray, Disposable, IModelSerializer, ISerializableModel } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class SortingOptions extends Disposable implements ISerializableModel {
    private _info;
    private _fieldNameInfo;
    targetBand: ko.Observable<BandViewModel>;
    fieldName: ko.Observable<string> | ko.Computed<string>;
    private _getFieldNames;
    getInfo(): ISerializationInfoArray;
    isPropertyDisabled(name: string): boolean;
    resetValue(): void;
    constructor(model: {}, report: ReportViewModel, serializer?: IModelSerializer);
    getPath(propertyName: string): any;
}
