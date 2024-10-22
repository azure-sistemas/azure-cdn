﻿/**
* DevExpress HTML/JS Reporting (rich-edit\customizeToolbarActions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { RichEdit } from 'devexpress-richedit';
import { EventManager } from '@devexpress/analytics-core/analytics-utils';
export declare type ToolbarActionType = 'ButtonGroup' | 'Button' | 'ComboBox' | 'ColorBox';
export declare var ToolbarActionId: {
    ParagraphAlignmentButtonGroup: string;
    HyperlinkButton: string;
    ClearFormattingButton: string;
    FontStyleButtonGroup: string;
    ToggleCaseButton: string;
    FontSizeComboBox: string;
    FontComboBox: string;
    FontColorBox: string;
    BackgroundColorBox: string;
};
export declare var ToolbarGroupId: {
    AlignmentAndFormatting: string;
    FontStyleAndCase: string;
    FontSize: string;
    Font: string;
    FontColor: string;
    BackgroundColor: string;
};
export interface IToolbarAction {
    id?: string;
    visible?: boolean;
    template?: string;
    text?: string;
    items?: (IToolbarAction | any)[];
    actionType?: ToolbarActionType;
    action?: (rich: RichEdit, value: any) => void;
    hint?: string;
    icon?: string;
    defaultValue?: any;
    selectionMode?: 'multiple' | 'single';
}
export interface IToolbarGroup {
    id: string;
    visible?: boolean;
    template?: string;
    items: (IToolbarAction | any)[];
    title?: string;
}
export interface ICustomizeToolbarActionsEventArgs {
    actions: IToolbarAction[];
    getById: (id: string) => IToolbarGroup | IToolbarAction;
}
export interface IRichEditEvents {
    'customizeToolbarActions': ICustomizeToolbarActionsEventArgs;
}
export declare var events: (newVal?: EventManager<any, IRichEditEvents>) => EventManager<any, IRichEditEvents>;
