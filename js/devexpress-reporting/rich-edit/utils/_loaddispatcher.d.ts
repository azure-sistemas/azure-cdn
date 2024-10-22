﻿/**
* DevExpress HTML/JS Reporting (rich-edit\utils\_loaddispatcher.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { RichAction } from './_utils';
import { XRRichEditControlModel } from './_model';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
interface DispatcherData {
    queueAction: RichAction;
    ready: () => void;
    documentConverted: (result: string) => void;
    documentFormat: any;
    base64: any;
    errorCallBack: () => void;
}
export declare class RichEditLoadDispatcher extends Disposable {
    protected richEdit: XRRichEditControlModel;
    constructor(richEdit: XRRichEditControlModel);
    process(element: DispatcherData): void;
}
export {};
