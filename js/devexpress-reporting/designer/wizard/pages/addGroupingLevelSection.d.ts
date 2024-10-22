﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\addGroupingLevelSection.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IMasterDetailReportTree } from '../internal/_masterDetailWizardUtils';
import { IReportWizardState } from '../reportWizardState';
import { IDataMemberInfo, Disposable } from '@devexpress/analytics-core/analytics-utils';
import { WizardPageBase, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
export interface IGroupFieldDataMemberInfo extends IDataMemberInfo {
    visible?: ko.Observable<boolean>;
}
export declare class _GroupsFieldStore extends Disposable {
    private _onChange;
    dispose(): void;
    dataSource: ko.ObservableArray<IGroupFieldDataMemberInfo>;
    constructor(query: IMasterDetailReportTree, _onChange: () => void);
    getSelectedFieldsFlat(): IGroupFieldDataMemberInfo[];
    getSelectedFields(): string[][];
    groups: ko.ObservableArray<_GroupField>;
    isCreateGroupEnabled(): boolean;
    path: string;
    addGroupText: () => any;
    displayName: string;
    add(): void;
    remove(index: any): void;
    moveUpDisabled(index: any): boolean;
    moveDownDisabled(index: any): boolean;
    moveup(index: any): void;
    movedown(index: any): void;
}
export declare class _GroupField extends Disposable {
    private _store;
    private _onChange;
    private _updateDataSource;
    constructor(_store: _GroupsFieldStore, _onChange: () => void);
    getOptions(options: any): any;
    value: any;
    fields: ko.ObservableArray<string>;
}
export declare class AddGroupFieldsPage extends WizardPageBase {
    dispose(): void;
    canFinish(): boolean;
    private _mergeGroups;
    initialize(state: IReportWizardState): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<any, any, any>;
    _reportTree: IMasterDetailReportTree[];
    _groupInfos: ko.ObservableArray<_GroupsFieldStore>;
}
export declare function _registerAddGroupFieldsPage(factory: PageFactory): void;
