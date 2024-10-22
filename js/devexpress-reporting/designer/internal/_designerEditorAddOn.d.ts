﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_designerEditorAddOn.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { EditorAddOn, IModelAction, PopupService } from '@devexpress/analytics-core/analytics-internal';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
export declare class DesignerEditorAddOn extends EditorAddOn {
    imageTemplateName: string;
    constructor(editor: Editor, popupService: PopupService, imageTemplateName?: string);
    onPopupShown(popupService: PopupService): void;
    showPopup(_: any, element: any): void;
}
export declare class ExpressionEditorAddOn extends DesignerEditorAddOn {
    actionFilter(action: IModelAction): boolean;
    onPopupShown(popupService: PopupService): void;
}
export declare class ValueEditorAddOn extends DesignerEditorAddOn {
    onPopupShown(popupService: PopupService): void;
    actionFilter(action: IModelAction): boolean;
}
