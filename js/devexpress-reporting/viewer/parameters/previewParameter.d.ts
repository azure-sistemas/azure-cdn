﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\previewParameter.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IParameterDescriptor, IParameter } from './parameterHelper';
import { IPreviewParameterInfo } from './previewParametersViewModel';
import { PreviewParameterHelper } from './previewParameterHelper';
import { ISerializationInfo, IDisplayedValue, Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export interface IPreviewParameterDescriptor extends IParameterDescriptor {
    hasLookUpValues?: boolean;
}
export declare class PreviewParameter extends Disposable implements IParameter {
    static _compareValues(value1: any, value2: any): boolean;
    constructor(parameterInfo: IPreviewParameterInfo, parameterHelper: PreviewParameterHelper);
    getParameterDescriptor: () => IParameterDescriptor;
    safeAssignObservable(name: string, value: ko.Observable<any>): void;
    initialize(value: any, parameterHelper: PreviewParameterHelper): void;
    hasSeparator: ko.Observable<boolean>;
    hasVerticalLabel: ko.Observable<boolean>;
    valueInfo: ko.Observable<ISerializationInfo>;
    value: ko.Observable<any>;
    _value: ko.Observable<any>;
    _originalLookUpValues: Array<IDisplayedValue>;
    _originalValue: any;
    isRange: boolean;
    tag: any;
    type: string;
    path: string;
    isFilteredLookUpSettings: boolean;
    hasBindedExpressions: boolean;
    hasVisibleExpression: boolean;
    lookUpValues: ko.ObservableArray<IDisplayedValue>;
    valueStoreCache: any;
    allowNull: boolean;
    isMultiValue: boolean;
    selectAllValues: boolean;
    isMultiValueWithLookUp: boolean;
    multiValueInfo: ko.Observable<ISerializationInfo>;
    visible: ko.Observable<boolean>;
    enabled: ko.Observable<boolean>;
    intTypes: string[];
    floatTypes: string[];
    isTypesCurrentType: (types: string[], type: string) => boolean;
}
