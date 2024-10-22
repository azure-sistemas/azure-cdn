﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\configureReportPageSettingsAndColorSchemeSection.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ConfigureReportPageSettingsPage } from './configureReportPageSettingsPage';
import { ChooseReportColorSchemePage } from './colorSchemePage';
import { IReportWizardState } from '../reportWizardState';
import { WizardPageBase, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
export declare class ConfigurePageSettingsPage extends WizardPageBase {
    _configureReportPageSettingsPage: ConfigureReportPageSettingsPage;
    _colorSchemePage: ChooseReportColorSchemePage;
    _colorSchemePageVisible: boolean;
    dispose(): void;
    addColorScheme(name: string, color: string, position?: number): void;
    removeColorScheme(...names: string[]): void;
    removeAllColorSchemes(): void;
    setCustomColor(color: string): void;
    onChange(callback: any): void;
    canNext(): boolean;
    canFinish(): boolean;
    initialize(state: IReportWizardState): JQuery.Promise<any, any, never>;
    commit(): JQuery.Promise<any, any, any>;
}
export declare function _registerConfigureReportPageSettingsSection(factory: PageFactory): void;
