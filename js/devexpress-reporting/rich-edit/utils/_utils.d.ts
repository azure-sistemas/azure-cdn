﻿/**
* DevExpress HTML/JS Reporting (rich-edit\utils\_utils.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IToolbarAction } from '../customizeToolbarActions';
import { XRRichTextStreamType } from '../../designer/controls/xrRichText';
import { CommandId } from 'devexpress-richedit';
export interface IToolbarComponent extends IToolbarAction {
    command?: CommandId;
    title?: string;
}
export declare enum RichAction {
    OpenDocument = 0,
    SaveDocument = 1,
    NewDocument = 2
}
export interface IRichCore {
    commandManager: any;
    model: any;
    viewManager: any;
}
export interface INativeRich {
    core: IRichCore;
}
export interface IRichLoadData {
    dataFormat: XRRichTextStreamType;
    data: string;
    oldText: string;
}
