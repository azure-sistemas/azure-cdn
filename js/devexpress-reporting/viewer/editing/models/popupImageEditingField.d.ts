﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\models\popupImageEditingField.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IPainterOptions } from '../../widgets/pictureEditor/_painter';
import { IPopupComponent } from '../../widgets/pictureEditor/_pictureEditorToolbarItem';
import { ImageEditingFieldViewModel } from './imageEditingField';
import { IEditingFieldViewModel } from '../editingField';
import * as ko from 'knockout';
export interface IImageEditingFieldPopupData {
    contentData: PopupImageEditingFieldViewModel;
    paintData: IPainterOptions;
    contentTemplate: string;
    isVisible: (element: HTMLElement) => boolean;
    getContainer: () => string;
    getPositionTarget: (element: HTMLElement) => JQuery;
    showContent: ko.Observable<boolean>;
    onShown: (e: {
        element: any;
        component: any;
    }) => void;
    onHiding: (e: {
        element: any;
        component: any;
    }) => void;
    onContentReady: (e: {
        element: any;
        component: IPopupComponent;
    }) => void;
    renderedHandler: (element: HTMLElement, model: any) => void;
}
export declare class PopupImageEditingFieldViewModel extends ImageEditingFieldViewModel implements IEditingFieldViewModel {
    parentPopupClass: string;
    private _popupInitializedClass;
    private _getPopupContainer;
    private _getPainterModel;
    private _getPictureEditorModel;
    private _resetPictureEditor;
    private _resetPainter;
    isPopupActive(element: any): boolean;
    getPainter(): IPainterOptions;
    getPopupData(): IImageEditingFieldPopupData;
    activateEditor(viewModel: any, e: any): void;
    popupData: IImageEditingFieldPopupData;
    painterData: IPainterOptions;
    template: string;
}
export declare var DefaultImageEditingFieldViewModel: typeof PopupImageEditingFieldViewModel;
