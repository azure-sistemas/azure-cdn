/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_chartFieldListExtender.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IPathRequest, IDataMemberInfo } from '@devexpress/analytics-core/analytics-utils';
import { IItemsExtender } from '@devexpress/analytics-core/analytics-internal';
export declare class ChartFieldListExtender implements IItemsExtender {
    beforeItemsFilled(request: IPathRequest, items: IDataMemberInfo[]): boolean;
}
