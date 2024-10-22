﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_masterDetailWizardUtils.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FieldListController } from '../../internal/fieldlist/_fieldListController';
import { IDataMemberInfo, IDisplayedValue } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { TreeListItemViewModel, DataMemberTreeListController } from '@devexpress/analytics-core/analytics-widgets-internal';
import { DataMemberTreeNode, FieldTreeNode } from '@devexpress/analytics-core/analytics-wizard-internal';
import { FieldInfo } from './_utils';
export interface IMasterDetailInfoBase {
    name: string;
    displayName: string;
    specifics: string;
}
export interface IMasterDetailFieldInfo extends IMasterDetailInfoBase {
    checked: boolean;
}
export interface IMasterDetailQueryInfo extends IMasterDetailInfoBase {
    path: string;
    checked: boolean;
    fields: IMasterDetailFieldInfo[];
    relations: IMasterDetailQueryInfo[];
}
export declare class MasterDetailInfoBase implements IMasterDetailInfoBase {
    name: string;
    specifics: string;
    constructor(name: string, specifics: string, displayName?: string);
    displayName: string;
}
export interface IMasterDetailReportTree {
    name: string;
    displayName?: string;
    path: string;
    fields: IDataMemberInfo[];
    level: number;
}
export declare class MasterDetailFieldInfo extends MasterDetailInfoBase implements IMasterDetailFieldInfo {
    constructor(field: FieldTreeNode);
    checked: boolean;
}
export declare class MasterDetailQueryInfo extends MasterDetailInfoBase implements IMasterDetailQueryInfo {
    private _complexFields;
    private _complexRelations;
    private _expandComplexFieds;
    constructor(dataMember: DataMemberTreeNode);
    path: string;
    checked: boolean;
    fields: IMasterDetailFieldInfo[];
    relations: IMasterDetailQueryInfo[];
}
export declare class DataMemberCustomCheckedTreeNode extends DataMemberTreeNode {
    constructor(name: string, displayName: string, specifics: string, isChecked: boolean, path: string, afterCheckToggled?: (node: DataMemberTreeNode) => void);
    setChecked(value: boolean): void;
}
export declare class MasterDetailTreeListController extends DataMemberTreeListController {
    constructor(hideDataMemberSubItems: any);
    canSelect(value: TreeListItemViewModel): boolean;
    hasItems(item: IDataMemberInfo): boolean;
    hideDataMemberSubItems: ko.Observable<boolean> | ko.Computed<boolean>;
}
export declare class AvailableFieldsTreeListController extends FieldListController {
    constructor(rootItems: any);
    itemsFilter(item: DataMemberTreeNode): boolean;
    isDraggable(item: TreeListItemViewModel): boolean;
    rootItems: any;
}
export interface ISummaryDataMemberInfo extends IDataMemberInfo {
    path?: string;
    fields?: ISummaryDataMemberInfo[];
    parent?: {
        path?: string;
        displayName?: string;
    };
}
export declare class SummaryInfo extends FieldInfo {
    constructor(data: Array<IDisplayedValue>);
}
export declare class SummaryInfoFieldlist extends SummaryInfo {
    constructor();
    field: ko.Observable<ISummaryDataMemberInfo>;
    selectedPath: ko.Observable<string>;
    displayName: ko.Computed<string>;
}
