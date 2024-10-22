﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\utils\_mobileActionList.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { MobileReportPreview } from '../mobilePreview';
import { ExportOptionsModel } from '../../exportOptions/exportOptionsModel';
import { PreviewParametersViewModel } from '../../parameters/previewParametersViewModel';
import { MobileSearchViewModel } from '../internal/_mobileSearch';
import { IPreviewCustomizationHandler } from '../../utils/initializer';
import * as ko from 'knockout';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
export interface IMobileActionContent {
    name: string;
    data: any;
    dispose?: () => void;
}
export interface IMobileAction {
    imageClassName: string;
    clickAction: () => void;
    visible?: any;
    content?: IMobileActionContent;
}
export declare class MobileActionList extends Disposable {
    actions: IMobileAction[];
    constructor(actions: IMobileAction[]);
    dispose(): void;
    visible: ko.Observable<boolean>;
}
export interface IPreviewActionsMobileOptions {
    reportPreview: MobileReportPreview;
    exportModel: ExportOptionsModel;
    parametersModel: PreviewParametersViewModel;
    searchModel: MobileSearchViewModel;
    exportTypes: ko.ObservableArray<{
        text: string;
        format: string;
    }>;
    callbacks: IPreviewCustomizationHandler;
}
export declare function getPreviewActionsMobile(options: IPreviewActionsMobileOptions): MobileActionList;
