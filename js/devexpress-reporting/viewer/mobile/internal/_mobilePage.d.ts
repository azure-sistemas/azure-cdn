/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_mobilePage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PreviewPage, IPreviewPageOwner } from '../../internal/_page';
import { IBrickNode } from '../../utils/utils';
export declare class MobilePreviewPage extends PreviewPage {
    constructor(preview: IPreviewPageOwner, pageIndex: number, processClick?: (target: IBrickNode) => void, loading?: ko.Observable<boolean>);
    maxZoom: number;
}
