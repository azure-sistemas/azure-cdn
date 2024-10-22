﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_parametersViewModel.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AddParameterDialog, EditParametersDialog } from '../../tools/dialogs/parametersDialogs';
import { ReportViewModel } from '../../controls/xrReport';
import { Parameter } from '../../dataObjects/parameters/parameter';
import { Disposable, IPathRequest, IDataMemberInfo, IAction } from '@devexpress/analytics-core/analytics-utils';
import { IActionsProvider, IItemsExtender } from '@devexpress/analytics-core/analytics-internal';
export declare class ParametersViewModel extends Disposable implements IActionsProvider, IItemsExtender {
    _addParametersDialog: AddParameterDialog;
    _editParametersDialog: EditParametersDialog;
    constructor(report: ReportViewModel);
    parameters: ko.ObservableArray<Parameter>;
    addAction: {
        clickAction: () => void;
        imageClassName: string;
        imageTemplateName: string;
        text: string;
        displayText: () => any;
    };
    removeAction: {
        clickAction: (item: any) => void;
        imageClassName: string;
        imageTemplateName: string;
        text: string;
        displayText: () => any;
    };
    editAction: {
        clickAction: (item: any) => void;
        imageClassName: string;
        imageTemplateName: string;
        text: string;
        displayText: () => any;
    };
    getActions(context: any): IAction[];
    add: () => void;
    remove: (parameter: Parameter) => void;
    edit: (parameter: Parameter) => void;
    beforeItemsFilled(request: IPathRequest, items: IDataMemberInfo[]): boolean;
    afterItemsFilled(request: IPathRequest, items: IDataMemberInfo[]): void;
}
