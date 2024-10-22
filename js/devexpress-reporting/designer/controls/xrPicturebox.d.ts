﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrPicturebox.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRControlViewModel, XRControlSurface } from './xrControl';
import { ImageSource } from '../../common/imageSource';
import { ElementViewModel, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import * as ko from 'knockout';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { IResizeHandler } from '@devexpress/analytics-core/analytics-internal';
export declare class XRPictureBoxViewModel extends XRControlViewModel {
    constructor(model: any, parent: ElementViewModel, serializer?: ModelSerializer);
    isAlignmentDisabled(): boolean;
    isPropertyDisabled(propertyName: string): any;
    imageAlignment: ko.Observable<string> | ko.Computed<string>;
    imageUrl: ko.Observable<string> | ko.Computed<string>;
    imageSource: ko.Observable<ImageSource>;
    _sizing: ko.Observable<string> | ko.Computed<string>;
    sizing: ko.Observable<string> | ko.Computed<string>;
    isSmallerImage: ko.Observable<boolean> | ko.Computed<boolean>;
    readonly isAutoSize: boolean;
    imageRatio: {
        x: number;
        y: number;
    };
    originalImageWidth: ko.Observable<number>;
    originalImageHeight: ko.Observable<number>;
}
export declare class XRPictureBoxSurface extends XRControlSurface {
    private _createBackgroundPosition;
    private _createBackimage;
    private _createBackgroundOrigin;
    constructor(control: XRPictureBoxViewModel, context: ISurfaceContext);
    getResizeOptions(resizeHandler: IResizeHandler): IResizeHandler;
    selectiontemplate: string;
    getAdornTemplate(): string;
    _control: XRPictureBoxViewModel;
    resizeDisabled: ko.Computed<boolean>;
    resizeOptions: IResizeHandler;
}
