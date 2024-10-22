﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_page.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { EditingField, IEditingFieldViewModel } from '../editing/editingField';
import { IBrickNode } from '../utils/utils';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { PreviewEditingFieldsKeyboardHelper } from '../accessibility/_previewEditingFieldsKeyboardHelper';
export interface IPreviewPageOwner {
    _pageWidth: any;
    _pageHeight: any;
    _zoom: ko.Observable<number> | ko.Computed<number>;
    _currentDocumentId: ko.Observable<string> | ko.Computed<string>;
    _unifier: ko.Observable<string> | ko.Computed<string>;
    _pageBackColor?: ko.Observable<string> | ko.Computed<string>;
    _editingFields: ko.Observable<EditingField[]>;
    loading?: ko.Observable<boolean> | ko.Computed<boolean>;
    processClick?: (target: IBrickNode) => void;
    _closeDocumentRequests?: {
        [key: string]: boolean;
    };
}
export declare class PreviewPage extends Disposable {
    private _initializeEditingFields;
    private _getPixelRatio;
    private _onPageLoaded;
    private _onPageLoadFailed;
    constructor(preview: IPreviewPageOwner, pageIndex: number, processClick?: (target: IBrickNode) => void, loading?: ko.Observable<boolean>);
    updateSize(zoom?: number): number;
    clearBricks(): void;
    dispose(): void;
    _setPageImgSrc(documentId: string, unifier: string, zoom?: number): void;
    _clear(): void;
    initializeBrick(brick: IBrickNode, processClick: (target: IBrickNode) => void, zoom: ko.Observable<number> | ko.Computed<number>, editingFieldBricks: IBrickNode[]): void;
    clickToBrick(s: PreviewPage, e: JQueryEventObject): void;
    getBricksFlatList(brick: IBrickNode): IBrickNode[];
    editingFields: ko.Computed<IEditingFieldViewModel[]>;
    isClientVisible: ko.Observable<boolean>;
    documentId: ko.Observable<string> | ko.Computed<string>;
    originalHeight: ko.Observable<number>;
    originalWidth: ko.Observable<number>;
    selectBrick: (path: string, ctrlKey?: boolean) => void;
    resetBrickRecusive: (brick: IBrickNode) => void;
    getBricks: (pageIndex: number) => void;
    loadingText: string;
    realZoom: ko.Observable<number>;
    actualResolution: number;
    isEmpty: boolean;
    pageIndex: number;
    pageLoading: ko.Observable<boolean> | ko.Computed<boolean>;
    _currentScaleFactor: any;
    currentScaleFactor: ko.Observable<number>;
    zoom: ko.Observable<number> | ko.Computed<number>;
    width: ko.Observable<number> | ko.Computed<number>;
    height: ko.Observable<number> | ko.Computed<number>;
    color: string;
    imageHeight: ko.Observable<number>;
    imageWidth: ko.Observable<number>;
    imageSrc: ko.Observable<string>;
    displayImageSrc: ko.Observable<string>;
    brick: ko.Observable<IBrickNode>;
    brickLoading: ko.Observable<boolean>;
    brickColumnWidthArray: Array<number>;
    bricks: ko.Computed<IBrickNode[]>;
    activeBricks: ko.Computed<IBrickNode[]>;
    clickableBricks: ko.Computed<IBrickNode[]>;
    active: ko.Observable<boolean>;
    maxZoom: number;
    disableResolutionReduction: boolean;
    editingFieldsKeyboardHelper: PreviewEditingFieldsKeyboardHelper;
    private _lastGetPageDeferred;
    private _lastZoom;
    private _selectedBrickPath;
    private _isDisposed;
}
