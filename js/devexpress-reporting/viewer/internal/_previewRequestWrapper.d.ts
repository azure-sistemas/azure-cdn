﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_previewRequestWrapper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IBrickNode, IDocumentOperationResult } from '../utils/utils';
import { IBookmarkNode } from '../documentMap/_documentMapModel';
import { IKeyValuePair } from '../../common/types';
import { IEditingFieldModel, IEditingFieldHtmlProvider } from '../editing/editingField';
import { ReportPreview } from '../reportPreview';
import { PreviewParametersViewModel } from '../parameters/previewParametersViewModel';
import { SearchViewModel } from '../search/_searchViewModel';
import { IPreviewCustomizationHandler } from '../utils/initializer';
export interface IGetPageResponse extends IGetBrickMapResult {
    width: number;
    height: number;
    base64string: string;
}
export interface IGetBrickMapResult {
    brick: IBrickNode;
    columnWidthArray: Array<number>;
}
export declare enum ColumnSortOrder {
    None = 0,
    Ascending = 1,
    Descending = 2
}
export interface ISortingFieldInfo {
    fieldName?: string;
    sortOrder?: ColumnSortOrder;
}
export interface IGeneratedDocumentData {
    documentMap?: IBookmarkNode;
    drillDownKeys?: Array<IKeyValuePair<boolean>>;
    sortingState?: Array<IKeyValuePair<Array<ISortingFieldInfo>>>;
    exportOptions?: string;
    canPerformContinuousExport?: boolean;
    editingFields?: Array<IEditingFieldModel>;
    displayName?: string;
    errors?: any;
}
export declare class PreviewRequestWrapper implements IEditingFieldHtmlProvider {
    private _callbacks?;
    private _reportPreview;
    private _parametersModel;
    private _searchModel;
    constructor(handlers?: {
        [key: string]: Function;
    }, _callbacks?: IPreviewCustomizationHandler);
    static getProcessErrorCallback(reportPreview?: ReportPreview, defaultErrorMessage?: string, showMessage?: boolean): (message: string, jqXHR: any, textStatus: any) => void;
    static getPage(url: any, ignoreError?: () => boolean): JQueryPromise<IGetPageResponse>;
    initialize(reportPreview: ReportPreview, parametersModel: PreviewParametersViewModel, searchModel: SearchViewModel): void;
    findTextRequest(text: any, ignore: ko.Observable<boolean>): JQueryPromise<any>;
    stopBuild(id: any): void;
    sendCloseRequest(documentId: string, reportId?: string): void;
    startBuildRequest(shouldIgnoreError?: () => boolean): JQueryPromise<any>;
    getBuildStatusRequest(documentId: any, shouldIgnoreError: () => boolean): JQueryPromise<any>;
    getDocumentData(documentId: any, shouldIgnoreError: () => boolean): JQueryPromise<IGeneratedDocumentData>;
    customDocumentOperation(documentId: string, serializedExportOptions: string, editindFields: any[], customData: string, hideMessageFromUser?: boolean): JQueryPromise<IDocumentOperationResult>;
    openReport(reportName: any): any;
    drillThrough(customData: string): any;
    getStartExportOperation(arg: string): any;
    getExportStatusRequest(operationId: string): any;
    getEditingFieldHtml(value: string, editingFieldIndex: number): any;
}
