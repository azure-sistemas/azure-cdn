﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrRichText.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRControlViewModel, XRControlSurface } from './xrControl';
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { ElementViewModel, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import * as ko from 'knockout';
import { IFileUploadResult } from '@devexpress/analytics-core/analytics-internal';
export declare enum XRRichTextStreamType {
    RtfText = 0,
    PlainText = 1,
    HtmlText = 2,
    XmlText = 3
}
export declare class XRRichViewModel extends XRControlViewModel {
    private static _hiddenProperties;
    private _toStreamType;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, parent: ElementViewModel, serializer?: ModelSerializer);
    readonly textEditableProperty: ko.Observable<string>;
    format: ko.Observable<XRRichTextStreamType>;
    foreColor: ko.Observable<string> | ko.Computed<string>;
    serializableRtfString: ko.Observable<string> | ko.Computed<string>;
    _newDocumentData: ko.Observable<IFileUploadResult>;
    font: ko.Observable<string> | ko.Computed<string>;
    textRtf: ko.Observable<string>;
    _rtf: ko.Observable<string>;
}
export declare class XRRichSurface extends XRControlSurface {
    private _lastRequest;
    private _innerUpdate;
    private _sendCallback;
    constructor(control: XRRichViewModel, context: ISurfaceContext);
    imageSrc: ko.Observable<string>;
    isLoading: ko.Observable<boolean>;
}
