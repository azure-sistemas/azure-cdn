﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\formattingrules.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReportViewModel } from '../xrReport';
import { ObjectStorageItem } from '../../dataObjects/objectStorageItem';
import { ISerializationInfoArray, Disposable, IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class FormattingRule extends Disposable {
    static createNew(report?: any): FormattingRule;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, parent: ReportViewModel, serializer?: IModelSerializer);
    getPath(propertyName: any): string;
    className: () => string;
    displayType(): any;
    controlType: string;
    selected: ko.Observable<boolean> | ko.Computed<boolean>;
    name: ko.Observable<string> | ko.Computed<string>;
    parent: ReportViewModel;
    dataSource: ko.Observable<ObjectStorageItem> | ko.Computed<ObjectStorageItem>;
    dataMember: ko.Observable<string> | ko.Computed<string>;
    condition: ko.Observable<string> | ko.Computed<string>;
}
export declare class FormattingRuleLink {
    static createNew(rule: FormattingRule): FormattingRuleLink;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    value: ko.Observable<FormattingRule> | ko.Computed<FormattingRule>;
}
