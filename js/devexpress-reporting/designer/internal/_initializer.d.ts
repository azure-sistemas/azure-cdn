﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_initializer.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IReportDesignerInitializationData, IReportDesignerCustomizationHandler, IReportDesignerInitializationModel } from '../utils/inititalizer';
import { IPreviewCustomizationHandler } from '../../viewer/utils/initializer';
import { IEnumType } from '../../common/customTypes';
import { ILocalizationSettings } from '@devexpress/analytics-core/analytics-internal';
export declare function createReportDesigner(element: Element, data: IReportDesignerInitializationData, callbacks: {
    designer?: IReportDesignerCustomizationHandler;
    preview?: IPreviewCustomizationHandler;
}, localizationSettings?: ILocalizationSettings, knownEnums?: Array<IEnumType>, designerHandlerUri?: string, previewHandlerUri?: string, rtl?: boolean, applyBindings?: boolean): JQueryDeferred<any>;
export declare function createReportDesignerFromModel(model: IReportDesignerInitializationModel, element: Element, callbacks?: {
    designer?: IReportDesignerCustomizationHandler;
    preview?: IPreviewCustomizationHandler;
}, applyBindings?: boolean): JQueryDeferred<any>;
