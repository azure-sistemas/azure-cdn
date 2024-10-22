﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_utils.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataMemberInfo, PathRequest } from '@devexpress/analytics-core/analytics-utils';
import { ISelectionTarget } from '@devexpress/analytics-core/analytics-internal';
import { ElementViewModel, ISize } from '@devexpress/analytics-core/analytics-elements';
import { TreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
export declare function selectTreeListItem(item: TreeListItemViewModel, event: JQueryEventObject): void;
export declare function getExpressionPath(container: any, pathRequest: string | PathRequest): string;
export declare function getFirstSurfaceParentByType(target: ISelectionTarget, checkBandsType: (target: ISelectionTarget) => boolean): any;
export declare function getUsefulReportWidth(surface?: ReportSurface): ISize;
export declare function createPictureBox(container: ElementViewModel, bindingPath: string, dataBindingMode: string): any;
export declare var _checkBandsType: (target: any) => boolean;
export declare function createSimpleControl(controlType: string, dropTargetControl: ElementViewModel): any;
export declare function assignBinding(control: any, container: any, bindingName: string, item: TreeListItemViewModel, dataBindingMode: any): any;
export declare function isList(data: IDataMemberInfo): boolean;
export declare function dragDropComponentAdded(model: any, parent: any): void;
import { ReportSurface } from '../../controls/xrReport';
