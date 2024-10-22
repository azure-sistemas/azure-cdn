﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_baseConverter.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export declare class BaseConverter {
    protected _model: any;
    popupOptions: {
        height: number;
        visible: ko.Observable<boolean>;
        title: any;
        confirmMessage: string;
        infoMessage: string;
        linkText: string;
        linkUrl: string;
        container: (element: HTMLElement) => JQuery<HTMLElement>;
        buttons: {
            toolbar: string;
            location: string;
            widget: string;
            options: {
                text: any;
                onClick: () => void;
            };
        }[];
    };
    convert(model: any): void;
    protected _applyChanges(): void;
    protected _cancel(): void;
}
