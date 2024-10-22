﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_initializer.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IWebDocumentViewerModel, IBindingSettings, IPreviewCustomizationHandler } from '../utils/initializer';
import { PreviewModel, PreviewDisposableModel } from './_previewModel';
export declare function createDesktopPreview(bindingSettings: IBindingSettings): PreviewModel;
export declare function createPreview(bindingSettings: IBindingSettings): JQueryDeferred<PreviewDisposableModel>;
export declare function createAndInitPreviewModel(viewerModel: IWebDocumentViewerModel, element: Element, callbacks?: IPreviewCustomizationHandler, applyBindings?: boolean): JQueryDeferred<PreviewDisposableModel>;
export declare function createPreviewModel(viewerModel: IWebDocumentViewerModel, element: Element, callbacks?: IPreviewCustomizationHandler, applyBindings?: boolean): JQueryDeferred<PreviewDisposableModel>;
export declare function initPreviewModel(previewModel: any, viewerModel: IWebDocumentViewerModel): void;
