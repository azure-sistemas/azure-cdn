﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\configureCrossTabPage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IHoverInfo } from '@devexpress/analytics-core/analytics-internal';
import { IDataMemberInfo, ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import { ITreeListOptions } from '@devexpress/analytics-core/analytics-widgets-internal';
import { FullscreenWizardPageFactory, WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as ko from 'knockout';
import { FieldInfo, IReportWizardFieldsCallback } from '../../internal/_utils';
import { IReportWizardState } from '../../reportWizardState';
import { SelectDataMembersPage } from '../selectDataMembersPage';
export declare class SelectCrossTabDataMember extends SelectDataMembersPage {
    private _pageRendered;
    private _firstRenderNode;
    private _dragHelperContent;
    private _itemsProvider;
    private _controller;
    private _timeout;
    private _createCrossTabLeafTreeNode;
    private _createCrossTabTreeNode;
    private _afteCheck;
    private _findFirstCheckedField;
    constructor(_fieldListCallBack: IReportWizardFieldsCallback, _hideDataMemberSubItems?: boolean);
    commit(): JQuery.Promise<any, any, any>;
    _signleFieldMemberFieldListModel: ITreeListOptions;
    _title: string;
    _icon: string;
}
export declare class ConfigureCrossTabPage extends WizardPageBase {
    stateName: string;
    itemInfo: ISerializationInfo;
    protected _title: string;
    constructor(stateName: string, itemInfo: ISerializationInfo, title: string, localizationId: string);
    _removeInfo(item: FieldInfo): void;
    addInfo(fieldName?: string): void;
    setFieldDefaultValue(defaultVal: any, fieldInfo: FieldInfo): void;
    initialize(state: IReportWizardState, stateChanged?: boolean): JQuery.Promise<any, any, any>;
    canFinish(): boolean;
    changeAlways: boolean;
    underCursor: ko.Observable<IHoverInfo> | ko.Computed<IHoverInfo>;
    isDroppable: ko.Computed<boolean>;
    _crossTabFields: ko.ObservableArray<IDataMemberInfo>;
    _template: string;
    fieldInfos: ko.ObservableArray<FieldInfo>;
    _icon: string;
    _fieldName: any;
    _valueName: any;
}
export declare function _registerConfigureCrossTabPage(factory: FullscreenWizardPageFactory, pageId: string, title: string, localizationId: string, info: ISerializationInfo): void;
