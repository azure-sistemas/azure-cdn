﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\utils.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IReportWizardCallbacks } from './_utils';
import { IReportWizardSettings } from '../../utils/inititalizer';
import { IDataSourceInfo } from '@devexpress/analytics-core/analytics-internal';
import { _DataSourceWizardOptionsBase } from '@devexpress/analytics-core/analytics-wizard';
export declare class _ReportWizardOptions extends _DataSourceWizardOptionsBase<IReportWizardCallbacks> {
    callbacks: IReportWizardCallbacks;
    wizardSettings: IReportWizardSettings;
    dataSources: ko.PureComputed<IDataSourceInfo[]>;
    hideDataMemberSubItems: boolean;
}
