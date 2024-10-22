﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\chooseAvailableDataSourcePage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _ReportWizardOptions } from '../internal/utils';
import { PageFactory, ChooseAvailableItemPage } from '@devexpress/analytics-core/analytics-wizard';
export declare function _convertToStateDataSource(dataSource: any): string;
export declare function _restoreDataSourceFromState(dataSource: any): any;
export declare class ChooseAvailableDataSourcePage extends ChooseAvailableItemPage {
    commit(): JQuery.Promise<any, any, any>;
    _getSelectedItem(state: any): any;
    readonly createNewOperationText: any;
}
export declare function _registerChooseAvailableDataSourcePage(factory: PageFactory, reportWizardOptions: _ReportWizardOptions): void;
