﻿/**
* DevExpress HTML/JS Reporting (designer\tools\smartTags\smartTagContainer.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Point } from '@devexpress/analytics-core/analytics-elements';
import { Disposable, IDisposable } from '@devexpress/analytics-core/analytics-utils';
import { ReportSurface } from '../../controls/xrReport';
import { XRReportElementViewModel } from '../../controls/xrReportelement';
import { SurfaceSelection } from '@devexpress/analytics-core/analytics-internal';
export interface ISmartTag extends IDisposable {
    onClick: () => void;
    imageTemplateName: string;
    templateName?: string;
}
export declare class SmartTagModel extends Disposable {
    constructor(selection: SurfaceSelection, reportSurface: ko.Observable<ReportSurface>, offset: ko.Observable<number> | ko.Computed<number>);
    getMargin(reportElement: XRReportElementViewModel): string;
    margin: ko.Observable<string>;
    position: Point;
    smartTags: ko.ObservableArray<ISmartTag>;
    visible: ko.Observable<boolean>;
}
