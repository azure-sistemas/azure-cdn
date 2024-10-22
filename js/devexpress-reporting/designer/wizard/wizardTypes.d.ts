﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\wizardTypes.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FullscreenReportWizard } from './fullscreenReportWizard';
import { DataSourceWizard, FullscreenDataSourceWizard } from '@devexpress/analytics-core/analytics-wizard';
export declare type WizardTypeString = 'SingleQueryDataSourceWizard' | 'DataSourceWizard' | 'ReportWizard';
export declare type WizardRunType = 'NewViaReportWizard' | 'DataSourceWizard' | 'DesignInReportWizard';
export declare type CommandRunType = WizardRunType | 'LocalizationCommand';
export declare type WizardType = DataSourceWizard | FullscreenDataSourceWizard | FullscreenReportWizard;
