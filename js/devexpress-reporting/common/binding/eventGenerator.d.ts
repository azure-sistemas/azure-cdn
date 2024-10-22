﻿/**
* DevExpress HTML/JS Reporting (common\binding\eventGenerator.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class EventGenerator {
    static generateCustomizeLocalizationCallback(fireEvent: (eventName: any, args?: any) => void): (localizationCallbacks: JQueryPromise<any>[]) => void;
    static generateDesignerEvents(fireEvent: (eventName: any, args?: any) => void): {
        customizeActions: (actions: any) => void;
        reportTabClosing: (tab: any, deffered: any) => boolean;
        reportTabClosed: (tab: any) => void;
        customizeParameterEditors: (parameter: any, info: any) => void;
        customizeParameterLookUpSource: (parameter: any, items: any) => any;
        exitDesigner: () => void;
        reportSaving: (args: any) => void;
        reportSaved: (args: any) => void;
        reportOpening: (args: any) => void;
        reportOpened: (args: any) => void;
        tabChanged: (tab: any) => void;
        onServerError: (args: any) => void;
        customizeParts: (parts: any) => void;
        componentAdded: (args: any) => void;
        customizeSaveDialog: (popup: any) => void;
        customizeSaveAsDialog: (popup: any) => void;
        customizeOpenDialog: (popup: any) => void;
        customizeToolbox: (controlsFactory: any) => void;
        customizeLocalization: (localizationCallbacks: JQueryPromise<any>[]) => void;
        customizeFieldListActions: (item: any, actions: any) => void;
        beforeRender: (designerModel: any) => void;
        customizeWizard: (type: string, wizard: any) => void;
    };
    static generatePreviewEvents(fireEvent: (eventName: any, args?: any) => void, prefix?: string): {
        previewClick: (pageIndex: any, brick: any, defaultHandler: any) => boolean;
        documentReady: (documentId: any, reportId: any, pageCount: any) => void;
        editingFieldChanged: (field: any, oldValue: any, newValue: any) => any;
        parametersSubmitted: (model: any, parameters: any) => void;
        parametersInitialized: (model: any, info: any, submit: any, shouldRequestParameters: any) => void;
        parametersReset: (model: any, parameters: any) => void;
        customizeParameterLookUpSource: (parameter: any, items: any) => any;
        customizeParameterEditors: (parameter: any, info: any) => void;
        customizeActions: (actions: any) => void;
        customizeParts: (parts: any) => void;
        customizeExportOptions: (options: any) => void;
        onServerError: (args: any) => void;
        onExport: (args: any) => void;
    };
}
