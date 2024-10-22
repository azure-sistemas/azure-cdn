﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrSparkline.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRControlViewModel } from './xrControl';
import { TodoControlSurface } from './_xrTodoControl';
import { ElementViewModel, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import * as ko from 'knockout';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
export declare class XRSparklineViewModel extends XRControlViewModel {
    createView(model: any, serializer?: any): {
        'type': ko.Observable<any>;
        'getInfo': () => any;
    };
    constructor(model: any, parent: ElementViewModel, serializer?: ModelSerializer);
    getPath(propertyName: any): any;
    view: any;
    dataSource: ko.Observable<any>;
    dataMember: ko.Observable<string> | ko.Computed<string>;
    sparklineFake: any;
    valueMember: ko.Observable<string> | ko.Computed<string>;
}
export declare class XRSparkLineSurface extends TodoControlSurface {
    constructor(control: XRControlViewModel, context: ISurfaceContext);
}
