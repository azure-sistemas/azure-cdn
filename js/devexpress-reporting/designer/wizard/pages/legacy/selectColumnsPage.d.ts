﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\legacy\selectColumnsPage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IReportWizardFieldsCallback } from '../../internal/_utils';
import { ILegacyReportWizardState } from '../../reportWizardState';
import { ListViewModel } from '../../_utils';
import { IDataMemberInfo } from '@devexpress/analytics-core/analytics-utils';
import { WizardPageBase, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
export declare class LegacySelectColumnsPage extends WizardPageBase {
    private _fieldListsCallback;
    private _selectedPath;
    private _fields;
    constructor(getFieldListItems: IReportWizardFieldsCallback);
    canFinish(): boolean;
    canNext(): boolean;
    selectedPath(): any;
    reset(): void;
    initialize(state: ILegacyReportWizardState): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<{
        fields?: IDataMemberInfo[];
    }, any, any>;
    isSelectEnable(): boolean;
    isUnselectEnable(): boolean;
    select: () => void;
    selectAll: () => void;
    unselect: () => void;
    unselectAll: () => void;
    availableFieldDblClick: (field: any) => void;
    availableFieldClick: (e: {
        itemData: any;
    }) => void;
    selectedFieldDblClick: (field: any) => void;
    selectedFieldClick: (e: {
        itemData: any;
    }) => void;
    availableFields: ListViewModel<IDataMemberInfo>;
    selectedFields: ListViewModel<IDataMemberInfo>;
}
export declare function _registerLegacySelectColumnsPage(factory: PageFactory, fieldListItemsCallback: IReportWizardFieldsCallback): void;
