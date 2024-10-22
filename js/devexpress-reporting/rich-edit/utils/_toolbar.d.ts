﻿/**
* DevExpress HTML/JS Reporting (rich-edit\utils\_toolbar.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IToolbarAction, IToolbarGroup } from '../customizeToolbarActions';
import { IToolbarComponent } from './_utils';
import { Locker } from '../../common/utils/_locker';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import { getParentContainer } from '@devexpress/analytics-core/analytics-internal';
import { RichEdit, CommandStateChangedEventArgs, CommandId } from 'devexpress-richedit';
import * as ko from 'knockout';
export interface IValueConverter {
    toModel: (value: any) => any;
    fromModel: (value: any) => any;
}
interface IComponentBase {
    template: string;
    id: string;
    visible: boolean;
    items?: ComponentCommon[];
    _updateStateInternal?(commandIdMap?: Record<number, boolean>): void;
}
interface IItem extends IToolbarAction {
    command: CommandId;
    value?: any;
}
export interface IOptions extends ICommandOptions {
    visible: ko.Subscribable<boolean>;
    fonts: string[];
}
interface ICommandOptions {
    commandManager: any;
    executeCommand: (command: CommandId, params?: any, setFocus?: boolean) => void;
    richEditPublic: RichEdit;
}
declare abstract class ComponentCommon extends Disposable implements IComponentBase {
    protected locker: Locker;
    protected options: ICommandOptions;
    protected abstract updateState(): void;
    protected abstract needUpdateState(commandIdMap: Record<number, boolean>): boolean;
    _updateStateInternal(commandIdMap?: Record<number, boolean>): void;
    protected _executeCommand(value?: any, command?: CommandId): any;
    executeCommand(value?: any, command?: number): void;
    constructor(options: ICommandOptions, info: IToolbarComponent);
    unwrapItem(item: IToolbarComponent): IItem;
    protected getConverter(): IValueConverter;
    init(info?: IToolbarComponent): void;
    protected hasCustomValue(): boolean;
    id: string;
    template: string;
    text: string;
    visible: boolean;
    action: (rich: RichEdit, value: any) => void;
    value: ko.Observable;
    itemKey: string;
}
export declare class CustomComponent extends ComponentCommon {
    protected updateState(): void;
    protected needUpdateState(_commandIdMap: Record<number, boolean>): boolean;
}
export declare class Component extends ComponentCommon {
    private _command;
    protected needUpdateState(commandIdMap: Record<number, boolean>): boolean;
    init(info: IToolbarComponent): void;
    protected updateState(): void;
    item: IItem;
}
export declare class ComponentButtonGroup extends ComponentCommon {
    constructor(options: any, info?: IToolbarComponent);
    protected needUpdateState(commandIdMap: Record<number, boolean>): boolean;
    init(info: IToolbarComponent): void;
    private onSelectItems;
    getCommand(item?: IItem): CommandId;
    protected updateState(): void;
    selectedItems: ko.ObservableArray<IItem>;
    selectionMode: 'multiple' | 'single';
    itemKey: string;
    items: IItem[];
}
export declare class ComponentButton extends Component {
    constructor(options: any, info: IToolbarComponent);
    clickAction(): void;
    icon: string;
    hint: string;
}
export declare class ComponentComboBox extends Component {
    constructor(options: any, info: IToolbarComponent);
    protected hasCustomValue(): boolean;
    items: any[];
    validationRules: any[];
    supportCustomValue: boolean;
}
export declare class ComponentFontSizeComboBox extends ComponentComboBox {
    validationRules: {
        type: string;
    }[];
    supportCustomValue: boolean;
}
export declare class ComponentColorPicker extends Component {
    constructor(options: any, info: IToolbarComponent);
    protected getConverter(): IValueConverter;
    protected hasCustomValue(): boolean;
}
export declare class ComponentCollection implements IToolbarGroup {
    id: any;
    title: string;
    visible: boolean;
    template: string;
    constructor(id: any, title?: string, visible?: boolean, template?: string);
    showTitle: () => string;
    items: IComponentBase[];
}
export declare class ToolbarSurface extends Disposable {
    private _popover;
    private _getDefaultItems;
    private _initComponentCollection;
    private _initComponents;
    private _extendTemplateOptions;
    constructor(options: IOptions);
    onCommandStateChanged(sender: RichEdit, args: CommandStateChangedEventArgs): void;
    onContentReady: (e: {
        element: any;
        component: import("../../viewer/widgets/pictureEditor/_pictureEditorToolbarItem").IPopupComponent;
        model: any;
    }) => void;
    getPositionTarget: (element: HTMLElement) => HTMLElement;
    closeOnOutsideClick: (e: any) => boolean;
    template: string;
    parentClass: string;
    visible: ko.Subscribable<boolean>;
    getPopupContainer: typeof getParentContainer;
    componentCollection: ComponentCollection[];
}
export {};
