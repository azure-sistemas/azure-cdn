﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\parameter.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IParameter, IParameterDescriptor } from '../../../viewer/parameters/parameterHelper';
import { ILocalizedControl, DefaultLocalizationProvider } from '../../controls/utils/_localizationUtils';
import { ParameterTypesHelper } from './parameterTypesHelper';
import { ObjectProperties } from '@devexpress/analytics-core/analytics-widgets';
import { ReportViewModel } from '../../controls/xrReport';
import { ObjectStorageItem, ObjectItem } from '../objectStorageItem';
import { ObjectsStorage } from '../objectStorage';
import { ISerializationInfo, ISerializationInfoArray, Disposable, IDataMemberInfo, IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class Parameter extends Disposable implements IParameter, IDataMemberInfo, ILocalizedControl {
    _report: ReportViewModel;
    static propertiesWithExpressions: string[];
    static ParametersRefString: string;
    static defaultGuidValue: string;
    static availableRangeSettingTypes: string[];
    private _parameterHelper;
    __localizationProvider: DefaultLocalizationProvider<ILocalizedControl>;
    readonly _localizationProvider: DefaultLocalizationProvider<ILocalizedControl>;
    getLocalizationProperty(propertyName: string): import("../../controls/utils/_localizationUtils").LocalizedProperty;
    getLocalizationProperties(): import("../../controls/utils/_localizationUtils").LocalizedProperty[];
    applyLocalization(propertyName: string, propertyValue: any): void;
    private _initializeValue;
    private _preDeserialize;
    private _processObsoleteProperties;
    private _getExpressionActions;
    preprocessInfo(info: ISerializationInfoArray): void;
    getInfo(): ISerializationInfoArray;
    appendExpressionObjInfo(info: ISerializationInfoArray): void;
    getActionClassName(propertyName: string): {
        'dxrd-editormenu-expressions': boolean;
        'dxd-icon-accented': boolean;
    };
    constructor(model: any, _report: ReportViewModel, serializer?: IModelSerializer);
    isPropertyVisible(name: string): boolean;
    getParameterDescriptor(): IParameterDescriptor;
    assign(parameter: Parameter): void;
    getRangeParameters(): IDataMemberInfo[];
    readonly name: string;
    readonly specifics: string;
    readonly icon: string;
    readonly defaultValue: any;
    readonly displayName: string;
    readonly isList: boolean;
    readonly dragData: {
        noDragable: boolean;
    };
    isPropertyDisabled(propertyName: any): any;
    templateName: string;
    actionProviders: any[];
    _expressionActions: {
        [key: string]: IModelAction[];
    };
    expressionObj: {};
    info: ISerializationInfoArray;
    propertyExpressionMapper: PropertyExpressionMapper;
    _type: ko.Observable<ObjectStorageItem> | ko.Computed<ObjectStorageItem>;
    _obsoleteValue: ko.Observable | ko.Computed;
    _isEditing: ko.Observable<boolean>;
    objectsStorage: ObjectsStorage;
    valueSourceSettings: ko.Observable<ObjectItem> | ko.Computed<ObjectItem>;
    parameterName: ko.Observable<string> | ko.Computed<string>;
    description: ko.Observable<string> | ko.Computed<string>;
    tag: ko.Observable | ko.Computed;
    type: ko.Computed<string>;
    collapsed: ko.Observable<boolean> | ko.Computed<boolean>;
    valueSourceSettingsType: ko.Observable<string>;
    visible: ko.Observable<boolean> | ko.Computed<boolean>;
    enabled: ko.Observable<boolean>;
    value: ko.Observable | ko.Computed;
    valueInfo: ko.Observable<ISerializationInfo> | ko.Computed<ISerializationInfo>;
    isMultiValue: ko.Observable<boolean> | ko.Computed<boolean>;
    selectAllValues: ko.Observable<boolean> | ko.Computed<boolean>;
    allowNull: ko.Observable<boolean> | ko.Computed<boolean>;
    multiValueInfo: ko.Observable<ISerializationInfo> | ko.Computed<ISerializationInfo>;
    parameterTypesHelper: ParameterTypesHelper;
    valueSourceSettingsHelper: ValueSourceSettingsHelper;
    viewmodel: ObjectProperties;
}
import { ValueSourceSettingsHelper } from './valueSourceSettingsHelper';
import { PropertyExpressionMapper } from './propertyExpressionMapper';
import { IModelAction } from '@devexpress/analytics-core/analytics-internal';
