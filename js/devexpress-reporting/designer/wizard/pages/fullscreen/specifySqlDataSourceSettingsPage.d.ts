﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\specifySqlDataSourceSettingsPage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _ReportWizardOptions } from '../../internal/utils';
import { FullscreenWizardPageFactory, SpecifySqlDataSourceSettingsPage as SpecifyAnalyticSqlDataSourceSettingsPage } from '@devexpress/analytics-core/analytics-wizard';
export declare class SpecifySqlDataSourceSettingsPage extends SpecifyAnalyticSqlDataSourceSettingsPage {
    registerSections(): void;
    commit(): JQuery.Promise<any, any, any>;
}
export declare function _registerSpecifySqlDataSourceSettingsPage(factory: FullscreenWizardPageFactory, wizardOptions: _ReportWizardOptions): void;
