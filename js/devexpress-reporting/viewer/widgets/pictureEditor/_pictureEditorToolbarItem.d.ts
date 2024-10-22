﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_pictureEditorToolbarItem.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PictureEditorActionId } from './_pictureEditorTypes';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class PictureEditorToolbarItem implements IPictureEditorToolbarItem {
    constructor(options: IPictureEditorToolbarItemOptions);
    dispose(): void;
    id: PictureEditorActionId;
    icon: string;
    title: string;
    active: ko.Observable<boolean> | ko.Computed<boolean>;
    renderedHandler: (element: HTMLElement, model: any) => void;
    action: (e: any, model: any) => void;
}
export declare class PopupComponentBase extends Disposable {
    private _component;
    getComponent(): IPopupComponent;
    onContentReady: (e: {
        element: any;
        component: IPopupComponent;
        model: any;
    }) => void;
    closeOnOutsideClick: (e: {
        target: HTMLElement;
    }) => boolean;
    dispose(): void;
}
export declare class PictureEditorToolbarItemWithPopup extends PictureEditorToolbarItem implements IPictureEditorToolbarItemWithPopup {
    private _popup;
    constructor(options: IPictureEditorToolbarItemWithTemplateOptions<IPictureEditorActionPopupOptions>);
    dispose(): void;
    template: string;
    templateOptions: IPictureEditorActionPopup;
}
export interface IPictureEditorToolbarItem extends IPictureEditorToolbarItemOptions {
    dispose: () => void;
}
export interface IPictureEditorToolbarItemWithPopup extends IPictureEditorToolbarItemWithTemplateOptions<IPictureEditorActionPopup> {
    dispose: () => void;
}
export interface IPictureEditorToolbarItemWithTemplateOptions<T> extends IPictureEditorToolbarItemOptions {
    template: string;
    templateOptions?: T;
}
export interface IPictureEditorToolbarItemOptions {
    id: PictureEditorActionId;
    icon: string;
    action?: (e: any, model: any) => void;
    active: ko.Observable<boolean> | ko.Computed<boolean>;
    renderedHandler?: (element: HTMLElement, model: any) => void;
    title: string;
}
export interface IPictureEditorActionPopup extends IPictureEditorActionPopupOptions {
    component: IPopupComponent;
    onContentReady: (e: {
        element: any;
        component: IPopupComponent;
        model: IPictureEditorActionPopupOptions;
    }) => void;
    onShown: (e: {
        element: any;
        component: IPopupComponent;
        model: IPictureEditorActionPopupOptions;
    }) => void;
    closeOnOutsideClick: (e: {
        target: any;
    }) => boolean;
}
export interface IPopupComponent {
    content: () => Element;
    $element: () => JQuery;
    dispose: () => void;
    registerKeyHandler: (key: string, handler: (e: any) => void) => void;
}
export interface IPictureEditorActionPopupOptions {
    width: string;
    height: string;
    contentTemplate: string;
    contentData: any;
    container: string;
    target: string;
    boundary: string | any;
    getPositionTarget: () => any;
    visible: ko.Observable<boolean> | ko.Computed<boolean>;
}
