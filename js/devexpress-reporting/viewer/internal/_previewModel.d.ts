﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_previewModel.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReportPreview } from '../reportPreview';
import { PreviewParametersViewModel } from '../parameters/previewParametersViewModel';
import { ExportOptionsModel } from '../exportOptions/exportOptionsModel';
import { SearchViewModel } from '../search/_searchViewModel';
import { DocumentMapModel } from '../documentMap/_documentMapModel';
import { ActionLists } from './_actions';
import { Disposable, TabPanel, DisposableType } from '@devexpress/analytics-core/analytics-utils';
import { IDesignerPart } from '@devexpress/analytics-core/analytics-internal';
import { IDocumentOperationResult } from '../utils/utils';
export interface IPreviewModelBase {
    rootStyle: string | {
        [key: string]: boolean;
    };
    reportPreview: ReportPreview;
    parametersModel: PreviewParametersViewModel;
    exportModel: ExportOptionsModel;
    searchModel: SearchViewModel;
    rtl: boolean;
    parts?: IDesignerPart[];
    updateSurfaceSize?: () => void;
    resizeCallback?: () => void;
    _addDisposable?: (obj: any) => void;
}
export interface IPreviewModel extends IPreviewModelBase {
    documentMapModel: DocumentMapModel;
    tabPanel: TabPanel;
    actionLists: ActionLists;
    accessibilityCompliant: boolean;
}
export declare class PreviewDisposableModel extends Disposable implements IPreviewModelBase {
    rootStyle: string | {
        [key: string]: boolean;
    };
    reportPreview: ReportPreview;
    parametersModel: PreviewParametersViewModel;
    exportModel: ExportOptionsModel;
    searchModel: SearchViewModel;
    rtl: boolean;
    parts?: IDesignerPart[];
    resizeCallback?: () => void;
    updateSurfaceSize?: () => void;
    constructor(options: IPreviewModelBase);
    _addDisposable(object: DisposableType): void;
    dispose(): void;
    GetParametersModel(): PreviewParametersViewModel;
    OpenReport(reportName: string): void;
    Print(pageIndex?: number): void;
    ExportTo(format: string, inlineResult?: boolean): void;
    GetCurrentPageIndex(): number;
    GoToPage(pageIndex: number): void;
    Close(): void;
    ResetParameters(): void;
    StartBuild(): void;
    PerformCustomDocumentOperation(customData?: string, hideMessageFromUser?: boolean): JQueryPromise<IDocumentOperationResult>;
}
export declare class PreviewModel extends PreviewDisposableModel implements IPreviewModel {
    documentMapModel: DocumentMapModel;
    tabPanel: TabPanel;
    actionLists: ActionLists;
    accessibilityCompliant: boolean;
    constructor(options: IPreviewModel);
}
