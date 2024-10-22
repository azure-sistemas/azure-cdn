﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\specifyLabelSettingsPage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _ReportWizardOptions } from '../../internal/utils';
import { FullscreenWizardPageFactory, FullscreenWizardPage } from '@devexpress/analytics-core/analytics-wizard';
export declare class SpecifyLabelSettingsPage extends FullscreenWizardPage {
    private _reportWizardOptions;
    constructor(_reportWizardOptions: _ReportWizardOptions);
    registerSections(): void;
    canNext(): boolean;
    getNextSectionId(sectionId: string): string;
}
export declare function _registerSpecifyLabelSettingsPage(factory: FullscreenWizardPageFactory, reportWizardOptions: _ReportWizardOptions): void;
