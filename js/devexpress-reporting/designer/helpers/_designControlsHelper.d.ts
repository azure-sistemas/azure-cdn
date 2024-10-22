﻿/**
* DevExpress HTML/JS Reporting (designer\helpers\_designControlsHelper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DesignControlsHelper as AnalyticDesignControlsHelper, SurfaceSelection } from '@devexpress/analytics-core/analytics-internal';
import { ReportViewModel } from '../controls/xrReport';
export declare class DesignControlsHelper extends AnalyticDesignControlsHelper {
    private _xrPdfSignatureCollection;
    dispose(): void;
    getNameProperty(model: any): any;
    protected _setName(value: any): void;
    protected _setDefaultText(value: any): void;
    protected _getNamePrefix(value: any): any;
    constructor(target: ReportViewModel, selection: SurfaceSelection);
}
