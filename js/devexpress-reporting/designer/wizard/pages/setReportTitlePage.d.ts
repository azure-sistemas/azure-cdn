﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\setReportTitlePage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IReportTitleState } from '../reportWizardState';
import * as ko from 'knockout';
import { WizardPageBase, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
export declare class SetReportTitlePage extends WizardPageBase {
    initialize(data: IReportTitleState): JQuery.Promise<any, any, any>;
    canNext(): boolean;
    canFinish(): boolean;
    commit(): JQuery.Promise<any, any, any>;
    reportTitle: ko.Observable<string>;
}
export declare function _registerSetReportTitlePage(factory: PageFactory): void;
