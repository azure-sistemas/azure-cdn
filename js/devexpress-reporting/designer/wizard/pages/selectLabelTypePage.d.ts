﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\selectLabelTypePage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IReportWizardState } from '../reportWizardState';
import { ILabelDetails, ILabelProduct, IPaperKind } from '../internal/labelWizardUtils';
import * as ko from 'knockout';
import { WizardPageBase, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
export declare class SelectLabelTypePage extends WizardPageBase {
    constructor();
    initialize(state: IReportWizardState): JQueryPromise<{
        labelProducts: ILabelProduct[];
        paperKinds: IPaperKind[];
        labelDetails: ILabelDetails[];
    }>;
    canNext(): boolean;
    canFinish(): boolean;
    commit(): JQuery.Promise<{
        labelDetails: ILabelDetails;
    }, any, any>;
    _selectedPaperSize: ko.Computed<IPaperKind>;
    _labelData: {
        labelProducts: ILabelProduct[];
        paperKinds: IPaperKind[];
        labelDetails: ILabelDetails[];
    };
    _selectedLabelProduct: ko.Observable<ILabelProduct>;
    _selectedLabelDetails: ko.Observable<ILabelDetails>;
    _labelDetails: ko.Observable<any>;
    _width: ko.PureComputed<string>;
    _height: ko.PureComputed<string>;
    _paperType: ko.PureComputed<string>;
    _pageSizeText: ko.PureComputed<string>;
}
export declare function _registerSelectLabelTypePage(factory: PageFactory): void;
