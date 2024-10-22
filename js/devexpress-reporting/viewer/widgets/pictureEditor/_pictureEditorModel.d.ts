﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_pictureEditorModel.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ImageAlignment, ImageSizeMode } from '../../editing/editingField';
import { PictureEditMode } from './pictureEditMode';
import { IPictureEditorToolbarItem } from './_pictureEditorToolbarItem';
import { Painter } from './_painter';
import { PictureEditorActionProvider } from './_pictureEditorActionProvider';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class PictureEditorModel extends Disposable {
    private $element;
    private _initialImage;
    private _initialAlignment;
    private _initialSizeMode;
    private _initialImageType;
    private _pointerDownHandler;
    private _pointerUpHandler;
    private _pointerCancelHandler;
    private _callbacks;
    private GESTURE_COVER_CLASS;
    private ACTIVE_POPUP_CLASS;
    private _getPopupContent;
    private _takeFocus;
    private _releaseFocus;
    private _wrapButtonAction;
    private _initActions;
    private _loadImage;
    private _addEvents;
    constructor(options: IPictureEditorOptions, element: HTMLElement);
    changeActiveButton(selectedItem: any): void;
    applyBindings(): void;
    dispose(): void;
    getImage(): string;
    reset(image: any, alignment: any, sizeMode: any, imageType: any): void;
    getCurrentOptions(): IImageEditValue;
    actionsProvider: PictureEditorActionProvider;
    editMode: PictureEditMode;
    actions: Array<IPictureEditorToolbarItem>;
    painter: Painter;
    active: ko.Observable<boolean> | ko.Computed<boolean>;
    canDraw: ko.Observable<boolean> | ko.Computed<boolean>;
    zoom: ko.Observable<number> | ko.Computed<number>;
}
export interface IPictureEditorCallbacks {
    onFocusOut: (s: any) => void;
    onFocusIn?: (s: any) => void;
    onDraw: (s: any) => void;
    customizeActions?: (s: PictureEditorModel, actions: Array<IPictureEditorToolbarItem>) => void;
}
export interface IImageEditValue {
    sizeMode: ImageSizeMode;
    alignment: ImageAlignment;
    imageType: string;
    image: string;
}
export interface IPictureEditorOptions {
    image: ko.Observable<string> | ko.Computed<string>;
    imageType: ko.Observable<string> | ko.Computed<string>;
    imageMode: ko.Observable<PictureEditMode> | ko.Computed<PictureEditMode>;
    sizeMode: ko.Observable<ImageSizeMode> | ko.Computed<ImageSizeMode>;
    alignment: ko.Observable<ImageAlignment> | ko.Computed<ImageAlignment>;
    callbacks: IPictureEditorCallbacks;
    active: ko.Observable<boolean> | ko.Computed<boolean>;
    zoom: ko.Observable<number> | ko.Computed<number>;
    popupOptions: IPictureEditorPopupTargetOptions;
}
export interface IPictureEditorPopupTargetOptions {
    target?: string;
    container?: string;
    boundary?: string;
}
export interface IClickEvent {
    target: HTMLElement;
}
