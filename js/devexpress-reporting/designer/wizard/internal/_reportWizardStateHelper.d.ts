﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_reportWizardStateHelper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IReportWizardState } from '../reportWizardState';
import { ReportViewModel } from '../../controls/xrReport';
export declare class ReportWizardStateHelper {
    static applyDataBindings(state: IReportWizardState, model: ReportViewModel): void;
    static applyPageSetup(state: IReportWizardState, model: ReportViewModel): void;
}
