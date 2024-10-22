﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\parameterHelper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IEnumType } from '../../common/customTypes';
import { IParametersCustomizationHandler } from '../utils/initializer';
import { ISerializationInfo, IDisplayedValue } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
export interface IParameter {
    getParameterDescriptor: () => IParameterDescriptor;
    value: ko.Observable | ko.Computed;
    type: any;
    isMultiValue: any;
    selectAllValues: any;
    allowNull: any;
    multiValueInfo: ko.Observable<ISerializationInfo> | ko.Computed<ISerializationInfo>;
    tag?: any;
}
export interface IParameterDescriptor {
    description: string;
    name: string;
    type: string;
    value: any;
    visible: boolean;
    enabled: boolean;
    multiValue?: boolean;
    selectAllValues?: boolean;
    allowNull?: boolean;
    tag?: any;
}
export declare function getEditorType(typeString: any): any;
export declare class ParameterHelper {
    private _knownEnums;
    private _customizeParameterEditors;
    private _isKnownEnumType;
    static getSerializationValue(value: any, dateConverter: any): any;
    static createDefaultDataSource(store: ArrayStore): DataSource;
    initialize(knownEnums?: Array<IEnumType>, callbacks?: IParametersCustomizationHandler): void;
    createInfo(parameter: IParameter): ISerializationInfo;
    addShowCleanButton(info: ISerializationInfo, parameter: IParameter): void;
    assignValueStore(info: ISerializationInfo, parameter: IParameter): void;
    createMultiValue(parameter: IParameter, value?: any): {
        value: ko.Observable<any>;
        getInfo: () => ISerializationInfo[];
    };
    createMultiValueArray(fromArray: Array<any>, parameter: IParameter, convertSingleValue?: (val: any) => any): ko.ObservableArray<{
        value: ko.Observable<any>;
        getInfo: () => ISerializationInfo[];
    }>;
    isEnumType(parameter: IParameter): boolean;
    getItemsSource(parameterDescriptor: IParameterDescriptor, items: Array<IDisplayedValue>, sort?: boolean): any;
    getEnumCollection(parameter: IParameter): Array<IDisplayedValue>;
    getParameterInfo(parameter: IParameter): ISerializationInfo;
    getValueConverter(type: string): (val: any) => any;
    customizeParameterLookUpSource: (parameter: IParameterDescriptor, items: Array<IDisplayedValue>) => any;
    getUnspecifiedDisplayText: () => any;
}
