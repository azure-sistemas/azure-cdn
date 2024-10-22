﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\legacy\addGroupingLevelPage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ListViewModel } from '../../_utils';
import { ILegacyReportWizardState } from '../../reportWizardState';
import { IDataMemberInfo } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { WizardPageBase, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
export declare class LegacyAddGroupingLevelPage extends WizardPageBase {
    private initialFields;
    fields: ListViewModel<string>;
    groups: ListViewModel<{
        fields: ko.ObservableArray<string>;
    }>;
    canFinish(): boolean;
    addNewGroup: () => void;
    appendFieldsToGroup: () => void;
    removeGroup: () => void;
    isCreateGroupEnabled(): boolean;
    isAppendToGroupEnabled(): boolean;
    isRemoveGroupEnabled(): boolean;
    moveUp: () => void;
    moveDown: () => void;
    isMoveUpEnabled(): boolean;
    isMoveDownEnabled(): boolean;
    fieldDblClick: (field: any) => void;
    fieldClick: (e: {
        itemData: any;
    }) => void;
    groupDblClick: (group: any) => void;
    groupClick: (e: {
        itemData: any;
    }) => void;
    initialize(state: ILegacyReportWizardState): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<{
        groups?: string[][];
        summaryOptionsColumns?: IDataMemberInfo[];
    }, any, any>;
}
export declare function _registerLegacyAddGroupingLevelPage(factory: PageFactory): void;
