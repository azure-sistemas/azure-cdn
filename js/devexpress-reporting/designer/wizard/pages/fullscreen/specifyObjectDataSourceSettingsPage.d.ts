﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\specifyObjectDataSourceSettingsPage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _ReportWizardOptions } from '../../internal/utils';
import { FullscreenWizardPageFactory, SpecifyObjectDataSourceSettingsPage as AnalyticSpecifyObjectDataSourceSettingsPage } from '@devexpress/analytics-core/analytics-wizard';
export declare class SpecifyObjectDataSourceSettingsPage extends AnalyticSpecifyObjectDataSourceSettingsPage {
    private _dataSourceId;
    canNext(): boolean;
    initialize(state: any): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<any, any, any>;
}
export declare function _registerSpecifyObjectDataSourceSettingsPage(factory: FullscreenWizardPageFactory, wizardOptions: _ReportWizardOptions): void;
