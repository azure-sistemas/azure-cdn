const azrFramework_tipoStatus = Object.freeze({
    Todos: 0,
    Ativos: 1,
    Inativos: 2,
});

function RemoveLegacyLink() {
    if (typeof legacy !== 'undefined') {

        $('#linkModuloAntigo').slideUp();
    }
}

function GetAzureDataSource(query, parametros = "{}", timeOut = 30) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'POST',
            url: "/Componente/GetAzureDataSource",
            data: { query: query, parameters: parametros, timeOut: timeOut },
            success: function (dataSource) {
                resolve(dataSource);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            }
        });
    });
}

function getState(componentId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/Componente/GetState/`,
            headers: {
                "Accept": "text/html",
                "Content-Type": "text/html"
            },
            data: { componentId: componentId, route: currentRoute },
            method: "GET",
            dataType: "json",
            success: function (dataSource) {
                resolve(dataSource);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 200) resolve(null);
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            }
        });
    });
}

function removeOrClearVisibleIndex(params, columns) {

    if (!params || params.trim() === '') {
        return columns;
    }

    const paramsArray = params.split(',').map(param => param.trim());

    const removedFields = [];

    columns = columns.filter(column => {

        const shouldRemove = paramsArray.some(param => {
            if (param.endsWith('%[R]')) {
                const prefix = param.slice(0, -4);
                if (column.dataField && column.dataField.startsWith(prefix)) {
                    removedFields.push(column.dataField);
                    return true;
                }
            }
            else if (param.endsWith('[R]')) {
                const fieldName = param.slice(0, -3);
                if (column.dataField === fieldName) {
                    removedFields.push(column.dataField);
                    return true;
                }
            }
            else if (param.endsWith('%')) {
                const prefix = param.slice(0, -1);
                if (column.dataField && column.dataField.startsWith(prefix)) {
                    column.visibleIndex = null;
                    return false;
                }
            }
            else {
                if (column.dataField === param) {
                    column.visibleIndex = null;
                    return false;
                }
            }
        });
        return !shouldRemove;
    });
    //console.log(removedFields);
    return columns;
}

function saveState(componentId, state, resetFilter = false, keepSelectedRowsKeys = true, itensToRemoveOrClearVisibleIndex = '') {
    return new Promise((resolve, reject,) => {

        //if (resetFilter && state.filterValue !== undefined) {
        //    state.filterValue = [];
        //}
        if (resetFilter && state.hasOwnProperty('filterValue')) {
            delete state.filterValue;
        }

        if (keepSelectedRowsKeys == false && state.selectedRowKeys !== undefined) {
            state.selectedRowKeys = null;
        }

        const updatedColumns = removeOrClearVisibleIndex(itensToRemoveOrClearVisibleIndex, state.columns);

        $.ajax({
            url: "/Componente/SaveState/",
            method: 'PUT',
            data: { componentId: componentId, route: currentRoute, state: JSON.stringify({ ...state, columns: updatedColumns }) },
            success: (data) => resolve(data),
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 200) resolve(null);
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            }
        });
    });
}

function AutoLoad(componentName, keepSelectedRowsKeys = true, resetFilter = false, itensToRemoveOrClearVisibleIndex = '') {
    return {
        enabled: true,
        type: "custom",
        customLoad: function () {
            return getState(componentName);
        },
        customSave: function (state) {
            saveState(componentName, state, resetFilter, keepSelectedRowsKeys, itensToRemoveOrClearVisibleIndex);
        }
    };
}
/**
 * Função para adicionar os botões de redefinição do state persistence, utilizar na propriedade Toolbar do dxDataGrid
 * @param {string} elementId - Id do dataGrid
 * @param {Array} otherButtons - Array com outros botões para aplicar no toolbar do grid
 * @returns
 */
function AutoResetStateForToolbar(elementId, otherButtons = []) {
    otherButtons = Array.isArray(otherButtons) ? otherButtons : [otherButtons];
    const response = {
        items: otherButtons
    };
    if (!elementId) {
        console.error("Id do grid não encontrado");
        return response;
    }
    response.items.push({
        location: "after",
        widget: "dxButton",
        locateInMenu: "auto",
        showText: "inMenu",
        options: {
            hint: "Restaurar layout original do grid",
            text: "Restaurar layout original do grid",
            icon: "deletetable",
            onClick: () => {
                var result = DevExpress.ui.dialog.confirm("Deseja restaurar layout original do grid?", "Restaurar");
                result.done((dialogResult) => {
                    if (dialogResult) {
                        const datagrid = DevExpress.ui.dxDataGrid.getInstance(`#${elementId}`);
                        datagrid.state({});
                        datagrid.refresh();
                    }
                });
            }
        }
    });
    return response;
}

/**
 * Esta função deve ser utilizada no onToolbarPreparing que foi depreciado, utilize o método AutoResetStateForToolbar() na propriedade Toolbar
 * @param {any} otherButtons
 * @returns
 */
function AutoResetState(otherButtons) {

    return function (e) {

        var datagrid = e.component;

        for (var i in otherButtons) {
            e.toolbarOptions.items.unshift(otherButtons[i]);
        }

        e.toolbarOptions.items.unshift({
            location: "after",
            widget: "dxButton",
            locateInMenu: "auto",
            options: {
                hint: "Restaurar layout original do grid",
                //icon: "pulldown",
                icon: "deletetable",
                onClick: function () {
                    var result = DevExpress.ui.dialog.confirm("Deseja restaurar layout original do grid?", "Restaurar");
                    result.done(function (dialogResult) {
                        if (dialogResult) {
                            datagrid.state({});
                            datagrid.refresh();
                        }
                    });
                }
            }
        });
    };
}

function Azr_DataSource_Familias(callback = null) {

    if (callback != null) {
        $.ajax({
            type: 'POST',
            url: "/Componente/GetFamiliasGrid",
            success: function (dataSource) {
                callback(dataSource);
            }
        });
    }
}

const syncTreeViewSelection = function (treeViewInstance, value) {
    if (!value) {
        treeViewInstance.unselectAll();
    } else {
        treeViewInstance.selectItem(value);
    }
};

function Load_Azr_TreeView_PlanoConta(arrayComp, nomeComponente = '', tipos = ['C', 'D', 'CD'], placeholder = '', label = '', callback = null) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: "/Componente/GetPlanoConta",
            async: true,
            data: { tipos: tipos },
            success: function (response) {

                var id = `#${nomeComponente}`;

                if (nomeComponente != '') {
                    var comp = $(id).dxDropDownBox({
                        valueExpr: 'CD_PLANO_CONTA',
                        displayExpr: 'DS_PLANO_CONTA',
                        placeholder: placeholder,
                        showClearButton: true,
                        labelMode: 'floating',
                        label: label,
                        dataSource: response,
                        contentTemplate(e) {
                            const value = e.component.option('value');
                            const $treeView = $('<div>').dxTreeView({
                                dataSource: response,
                                dataStructure: 'plain',
                                keyExpr: 'CD_PLANO_CONTA',
                                parentIdExpr: 'CD_PLANO_CONTA_PAI',
                                selectionMode: 'single',
                                displayExpr: 'DS_PLANO_CONTA',
                                searchEnabled: true,
                                selectByClick: true,
                                onContentReady(args) {
                                    syncTreeViewSelection(args.component, value);
                                },
                                selectNodesRecursive: false,
                                onItemSelectionChanged(args) {
                                    const selectedKeys = args.component.getSelectedNodeKeys();
                                    e.component.option('value', selectedKeys);
                                },
                            });

                            treeView = $treeView.dxTreeView('instance');

                            e.component.on('valueChanged', (args) => {
                                syncTreeViewSelection(treeView, args.value);
                                e.component.close();
                            });

                            return $treeView;
                        },
                    }).dxDropDownBox("instance");

                    arrayComp[nomeComponente] = { Type: 'dxDropDownBox', Component: comp, Name: nomeComponente };

                    resolve(arrayComp[nomeComponente]);
                }

                if (callback != null) {
                    callback(id, response, arrayComp[nomeComponente]);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 200) resolve(new Error('Não encontrado'));
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            }
        });
    });
}

function LoadModal(obj) {
    $(`#containerModal`).append(
        `
<button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Large modal</button>
<button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lgx">Large modal</button>
<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style="padding-right: 0">
       <div class="modal-dialog modal-lg">
         <div class="modal-content">
           trossox  
         </div>
       </div>
     </div>

        <div class="modal fade bd-example-modal-lgx" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style="padding-right: 0">
       <div class="modal-dialog modal-lg">
         <div class="modal-content">
           trossozx
         </div>
       </div>
     </div>`);
}

function Azr_DataSource_FornecedoresGrid(callback = null) {

    if (callback != null) {
        $.ajax({
            type: 'POST',
            url: "/Componente/GetFornecedoresGrid",
            success: function (dataSource) {
                callback(dataSource);
            }
        });
    }
}

function Azr_DataSource_OrigemProduto(callback = null) {

    if (callback != null) {
        $.ajax({
            type: 'POST',
            url: "/Componente/GetOrigemProduto",
            success: function (dataSource) {
                callback(dataSource);
            }
        });
    }
}

function Azr_DataSource_TipoProdutoSPED(callback = null) {

    if (callback != null) {
        $.ajax({
            type: 'POST',
            url: "/Componente/GetTipoProdutoSPED",
            success: function (dataSource) {
                callback(dataSource);
            }
        });
    }
}

function Load_Azr_Lookup_UnidadeMedida(arrayComp, nomeComponente = '', status = azrFramework_tipoStatus.Todos, placeholder = '', label = '', callback = null) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: "/Componente/GetUnidadeMedida",
            data: { status: status },
            async: true,
            success: function (response) {

                var id = `#${nomeComponente}`;

                if (nomeComponente != '') {
                    var comp = $(id).dxLookup({
                        dropDownOptions: {
                            closeOnOutsideClick: true,
                            showTitle: false,
                            title: label,
                        },
                        dataSource: new DevExpress.data.DataSource({
                            store: response,
                            key: "CD_PESQUISA"
                        }),
                        searchEnabled: true,
                        searchExpr: ['DS_PESQUISA'],
                        cleanSearchOnOpening: true,
                        displayExpr: 'DS_PESQUISA',
                        valueExpr: 'CD_PESQUISA',
                        placeholder: placeholder,
                        labelMode: 'floating',
                        label: label,
                        showClearButton: true,
                        showPopupTitle: true
                    }).dxLookup("instance");

                    arrayComp[nomeComponente] = { Type: 'dxLookup', Component: comp };
                }

                if (callback != null) {
                    callback(id, response, arrayComp[nomeComponente]);
                }

                resolve(arrayComp[nomeComponente]);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 200) resolve(new Error('Não encontrado'));
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            }
        });
    });
}

function Load_Azr_TagBox_Marca(arrayComp, nomeComponente, placeholder = '', label = '', readOnly = false) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: "/Componente/GetMarca",
            async: true,
            success: function (response) {

                var comp = $(`#${nomeComponente}`).dxTagBox({
                    dataSource: new DevExpress.data.DataSource({
                        store: response,
                        key: "DS_PESQUISA"
                    }),
                    searchEnabled: true,
                    searchExpr: ['DS_PESQUISA'],
                    cleanSearchOnOpening: true,
                    displayExpr: 'DS_PESQUISA',
                    valueExpr: 'DS_PESQUISA',
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: label,
                    },
                    labelMode: 'floating',
                    label: label,
                    placeholder: placeholder,
                    showClearButton: false,
                    applyValueMode: 'instantly',
                    showSelectionControls: true,
                    readOnly: readOnly,
                }).dxTagBox("instance");

                arrayComp[nomeComponente] = { Type: 'dxTagBox', Component: comp };

                resolve(arrayComp[nomeComponente]);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 200) resolve(new Error('Não encontrado'));
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            }
        });
    });
}

function Load_Azr_Lookup_Marca(arrayComp, nomeComponente, placeholder = '', label = '', callback = null) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: "/Componente/GetMarca",
            async: true,
            success: function (response) {

                var id = `#${nomeComponente}`;

                var comp = $(id).dxLookup({
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: label,
                    },
                    dataSource: new DevExpress.data.DataSource({
                        store: response,
                        key: "DS_PESQUISA"
                    }),
                    searchEnabled: true,
                    searchExpr: ['DS_PESQUISA'],
                    cleanSearchOnOpening: true,
                    displayExpr: 'DS_PESQUISA',
                    valueExpr: 'DS_PESQUISA',
                    placeholder: placeholder,
                    labelMode: 'floating',
                    label: label,
                    showClearButton: true,
                    showPopupTitle: true
                }).dxLookup("instance");

                arrayComp[nomeComponente] = { Type: 'dxLookup', Component: comp };

                if (callback != null) {
                    callback(id, response, arrayComp[nomeComponente]);
                }

                resolve(arrayComp[nomeComponente]);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 200) resolve(new Error('Não encontrado'));
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            }
        });
    });
}

function Load_Azr_Lookup_CategoriaFinanceira(nomeComponente, arrayComp, status = azrFramework_tipoStatus.Todos, placeholder = 'Selecione uma categoria', label = 'Categoria Financeira') {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: "/Componente/GetCategoriaFinanceira",
            data: { status: status },
            success: function (response) {
                var comp = $(`#${nomeComponente}`).dxLookup({
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: label,
                    },
                    dataSource: new DevExpress.data.DataSource({
                        store: response,
                        key: "CD_CATEGORIA"
                    }),
                    displayExpr: function (item) {
                        return item && `${item.CD_CATEGORIA} - ${item.DS_CATEGORIA}`;
                    },
                    searchEnabled: true,
                    searchExpr: ['DS_CATEGORIA'],
                    cleanSearchOnOpening: true,
                    valueExpr: 'CD_CATEGORIA',
                    placeholder: placeholder,
                    labelMode: 'floating',
                    label: label,
                    showClearButton: true,
                    showPopupTitle: true
                }).dxLookup("instance");

                arrayComp[nomeComponente] = { Type: 'dxLookup', Component: comp, Name: nomeComponente };

                resolve(arrayComp[nomeComponente]);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 200) resolve(new Error('Não encontrado'));
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            }
        });
    });
}

function Load_Azr_Lookup_FormaPagamento(nomeComponente, arrayComp, status = azrFramework_tipoStatus.Todos, placeholder = 'Selecione uma forma de pagamento', label = 'Forma Pagamento') {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: "/Componente/GetFormaPagamento",
            asyn: true,
            data: { status: status },
            success: function (response) {
                var comp = $(`#${nomeComponente}`).dxLookup({
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: label,
                    },
                    dataSource: new DevExpress.data.DataSource({
                        store: response,
                        key: "CD_FORMA_PAGAMENTO"
                    }),
                    displayExpr: function (item) {
                        return item && `${item.CD_FORMA_PAGAMENTO} - ${item.DS_FORMA_PAGAMENTO}`;
                    },
                    searchEnabled: true,
                    searchExpr: ['DS_FORMA_PAGAMENTO'],
                    cleanSearchOnOpening: true,
                    valueExpr: 'CD_FORMA_PAGAMENTO',
                    placeholder: placeholder,
                    labelMode: 'floating',
                    label: label,
                    showClearButton: true,
                    showPopupTitle: true
                }).dxLookup("instance");

                arrayComp[nomeComponente] = { Type: 'dxLookup', Component: comp, Name: nomeComponente };

                resolve(arrayComp[nomeComponente]);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 200) resolve(new Error('Não encontrado'));
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            }
        });
    });
}

function Load_Azr_Lookup_ContaCorrente(nomeComponente, arrayComp, filial = null, status = azrFramework_tipoStatus.Todos, placeholder = 'Selecione uma conta corrente', label = 'Conta Corrente') {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: "/Componente/GetContaCorrente",
            data: { filial: filial, status: status },
            success: function (response) {
                var comp = $(`#${nomeComponente}`).dxLookup({
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: label,
                    },
                    dataSource: new DevExpress.data.DataSource({
                        store: response,
                        key: "CD_CHAVE"
                    }),
                    displayExpr: function (item) {
                        return item && `${item.DS_PESQUISA}`;
                    },
                    searchEnabled: true,
                    searchExpr: ['DS_PESQUISA'],
                    cleanSearchOnOpening: true,
                    valueExpr: 'CD_CHAVE',
                    placeholder: placeholder,
                    labelMode: 'floating',
                    label: label,
                    showClearButton: true,
                    showPopupTitle: true
                }).dxLookup("instance");

                arrayComp[nomeComponente] = { Type: 'dxLookup', Component: comp, Name: nomeComponente };

                resolve(arrayComp[nomeComponente]);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 200) resolve(new Error('Não encontrado'));
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            }
        });
    });
}

function Load_Azr_Lookup_TipoDocumento(nomeComponente, arrayComp, status = azrFramework_tipoStatus.Todos, placeholder = 'Selecione um tipo de documento', label = 'Tipo Documento') {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: "/Componente/GetTipoDocumento",
            async: true,
            data: { status: status },
            success: function (response) {
                var comp = $(`#${nomeComponente}`).dxLookup({
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: label,
                    },
                    dataSource: new DevExpress.data.DataSource({
                        store: response,
                        key: "CD_TIPO_DOCUMENTO"
                    }),
                    displayExpr: function (item) {
                        return item && `${item.CD_TIPO_DOCUMENTO} - ${item.DS_TIPO_DOCUMENTO}`;
                    },
                    searchEnabled: true,
                    searchExpr: ['DS_TIPO_DOCUMENTO'],
                    cleanSearchOnOpening: true,
                    valueExpr: 'CD_TIPO_DOCUMENTO',
                    placeholder: placeholder,
                    labelMode: 'floating',
                    label: label,
                    showClearButton: true,
                    showPopupTitle: true
                }).dxLookup("instance");

                arrayComp[nomeComponente] = { Type: 'dxLookup', Component: comp, Name: nomeComponente };

                resolve(arrayComp[nomeComponente]);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 200) resolve(new Error('Não encontrado'));
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            }
        });
    });
}

function Load_Azr_Lookup_CentroCusto(nomeComponente, arrayComp, status = azrFramework_tipoStatus.Todos, placeholder = 'Selecione um centro de custo', label = 'Centro de Custo') {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: "/Componente/GetCentroCusto",
            async: true,
            data: { status: status },
            success: function (response) {
                var comp = $(`#${nomeComponente}`).dxLookup({
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: label,
                    },
                    dataSource: new DevExpress.data.DataSource({
                        store: response,
                        key: "CD_CENTRO_CUSTO"
                    }),
                    displayExpr: function (item) {
                        return item && `${item.CD_CENTRO_CUSTO} - ${item.DS_CENTRO_CUSTO}`;
                    },
                    searchEnabled: true,
                    searchExpr: ['DS_CENTRO_CUSTO'],
                    cleanSearchOnOpening: true,
                    valueExpr: 'CD_CENTRO_CUSTO',
                    placeholder: placeholder,
                    labelMode: 'floating',
                    label: label,
                    showClearButton: true,
                    showPopupTitle: true
                }).dxLookup("instance");

                arrayComp[nomeComponente] = { Type: 'dxLookup', Component: comp, Name: nomeComponente };

                resolve(arrayComp[nomeComponente]);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 200) resolve(new Error('Não encontrado'));
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            }
        });
    });
}

function Load_Azr_Lookup_Cliente(nomeComponente, arrayComp, status = azrFramework_tipoStatus.Todos, placeholder = 'Selecione um cliente', label = 'Cliente') {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: "/Componente/GetClientes",
            async: true,
            data: { status: status },
            success: function (response) {
                var comp = $(`#${nomeComponente}`).dxLookup({
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: label,
                    },
                    dataSource: new DevExpress.data.DataSource({
                        store: response,
                        key: "CD_CPF_CNPJ"
                    }),
                    displayExpr: function (item) {
                        return item && `${item.CD_CPF_CNPJ} - ${item.DS_PESQUISA}`;
                    },
                    searchEnabled: true,
                    searchExpr: ['DS_PESQUISA'],
                    cleanSearchOnOpening: true,
                    valueExpr: 'CD_CPF_CNPJ',
                    placeholder: placeholder,
                    labelMode: 'floating',
                    label: label,
                    showClearButton: true,
                    showPopupTitle: true
                }).dxLookup("instance");

                arrayComp[nomeComponente] = { Type: 'dxLookup', Component: comp };
                resolve(arrayComp[nomeComponente]);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 200) resolve(new Error('Não encontrado'));
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            }
        });
    });
}

function Load_Azr_Lookup_FornecedorV2(nomeComponente, arrayComp, status = azrFramework_tipoStatus.Todos, placeholder = 'Selecione um fornecedor', label = 'Fornecedor') {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: "/Componente/GetFornecedores",
            data: { status: status },
            success: function (response) {
                var comp = $(`#${nomeComponente}`).dxLookup({
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: label,
                    },
                    dataSource: new DevExpress.data.DataSource({
                        store: response,
                        key: "CD_FORNECEDOR"
                    }),
                    displayExpr: function (item) {
                        return item && `${item.CD_FORNECEDOR} - ${item.DS_FANTASIA_RAZAO_SOCIAL}`;
                    },
                    searchEnabled: true,
                    searchExpr: ['CD_FORNECEDOR', 'DS_FANTASIA_RAZAO_SOCIAL'],
                    cleanSearchOnOpening: true,
                    valueExpr: 'CD_FORNECEDOR',
                    placeholder: placeholder,
                    labelMode: 'floating',
                    label: label,
                    showClearButton: true,
                    showPopupTitle: true
                }).dxLookup("instance");

                arrayComp[nomeComponente] = { Type: 'dxLookup', Component: comp, Name: nomeComponente };

                resolve(arrayComp[nomeComponente]);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 200) resolve(new Error('Não encontrado'));
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            }
        });
    });
}

function Load_Azr_Lookup_Almoxarifado(arrayComp, nomeComponente, status = '', placeholder = '', label = '') {
    var vParametrosConsulta = { CD_STATUS: status.length > 0 ? status : null };

    return new Promise((resolve, reject) => {
        GetAzureDataSource(28, JSON.stringify(vParametrosConsulta)).then((result) => {
            if (result.success) {
                var comp = $(`#${nomeComponente}`).dxLookup({
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: label,
                    },
                    dataSource: new DevExpress.data.DataSource({
                        store: result.data,
                        key: "CD_ALMOXARIFADO"
                    }),
                    searchEnabled: true,
                    searchExpr: ['DS_ALMOXARIFADO_PESQUISA'],
                    cleanSearchOnOpening: true,
                    displayExpr: 'DS_ALMOXARIFADO_PESQUISA',
                    valueExpr: 'CD_ALMOXARIFADO',
                    placeholder: placeholder,
                    labelMode: 'floating',
                    label: label,
                    showClearButton: true,
                    showPopupTitle: true
                }).dxLookup("instance");

                arrayComp[nomeComponente] = { Type: 'dxLookup', Component: comp };

                resolve(arrayComp[nomeComponente]);
            }
            else {
                reject();
            }
        });
    });
}

function Load_Azr_TagBox_Almoxarifado(arrayComp, nomeComponente, status = '', placeholder = '', label = '', readOnly = false) {
    var vParametrosConsulta = { CD_STATUS: status.length > 0 ? status : null };

    return new Promise((resolve, reject) => {
        GetAzureDataSource(28, JSON.stringify(vParametrosConsulta)).then((result) => {
            if (result.success) {
                var comp = $(`#${nomeComponente}`).dxTagBox({
                    dataSource: new DevExpress.data.DataSource({
                        store: result.data,
                        key: "CD_ALMOXARIFADO"
                    }),
                    searchEnabled: true,
                    searchExpr: ['DS_ALMOXARIFADO_PESQUISA'],
                    cleanSearchOnOpening: true,
                    displayExpr: 'DS_ALMOXARIFADO_PESQUISA',
                    valueExpr: 'CD_ALMOXARIFADO',
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: label,
                    },
                    labelMode: 'floating',
                    label: label,
                    placeholder: placeholder,
                    showClearButton: false,
                    applyValueMode: 'instantly',
                    showSelectionControls: true,
                    readOnly: readOnly,
                }).dxTagBox("instance");

                arrayComp[nomeComponente] = { Type: 'dxLookup', Component: comp };

                resolve(arrayComp[nomeComponente]);
            }
            else {
                reject();
            }
        });
    });
}

function Load_Azr_Lookup_Filial2(arrayComp, nomeComponente, status = azrFramework_tipoStatus.Todos, apenasPermitidas = 0, placeholder = '', label = '', callback = null) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: "/Componente/GetFilial",
            data: { status: status, apenasPermitidas: apenasPermitidas },
            success: function (response) {
                var id = `#${nomeComponente}`;

                var comp = $(id).dxLookup({
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: label,
                    },
                    dataSource: new DevExpress.data.DataSource({
                        store: response,
                        key: "CD_PESQUISA"
                    }),
                    searchEnabled: true,
                    searchExpr: ['DS_PESQUISA'],
                    cleanSearchOnOpening: true,
                    displayExpr: 'DS_PESQUISA',
                    valueExpr: 'CD_PESQUISA',
                    placeholder: placeholder,
                    labelMode: 'floating',
                    label: label,
                    showClearButton: true,
                    showPopupTitle: true
                }).dxLookup("instance");

                arrayComp[nomeComponente] = { Type: 'dxLookup', Component: comp, Name: nomeComponente };

                resolve(arrayComp[nomeComponente]);

                if (callback != null) {
                    callback(id, response, arrayComp[nomeComponente]);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 200) resolve(new Error('Não encontrado'));
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            }
        });
    });
}

function Load_Azr_Lookup_Filial(nomeComponente, arrayComp) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: "/GestaoEstrategica/GetFiliais",
            async: true,
            success: function (response) {

                var comp = $(`#${nomeComponente}`).dxLookup({
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: 'Filial',
                    },
                    dataSource: new DevExpress.data.DataSource({
                        store: response,
                        key: "CD_PESQUISA"
                    }),
                    searchEnabled: true,
                    searchExpr: ['DS_PESQUISA'],
                    cleanSearchOnOpening: true,
                    displayExpr: 'DS_PESQUISA',
                    valueExpr: 'CD_PESQUISA',
                    placeholder: "Selecione uma filial",
                    labelMode: 'floating',
                    label: "Filial",
                    showClearButton: true,
                    showPopupTitle: true
                }).dxLookup("instance");

                arrayComp[nomeComponente] = { Type: 'dxLookup', Component: comp };
                resolve(arrayComp[nomeComponente]);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 200) resolve(new Error('Não encontrado'));
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            }
        });

    });
}

function Load_Azr_Lookup_Produto(nomeComponente, arrayComp, status = '') {
    var vParametrosConsulta = { CD_STATUS: status.length > 0 ? status : null };

    return new Promise((resolve, reject) => {
        GetAzureDataSource(29, JSON.stringify(vParametrosConsulta)).then((result) => {
            if (result.success) {
                var comp = $(`#${nomeComponente}`).dxLookup({
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: 'Produto',
                    },
                    dataSource: new DevExpress.data.DataSource({
                        store: result.data,
                        key: "CD_PRODUTO"
                    }),
                    searchEnabled: true,
                    searchExpr: ['DS_PRODUTO_PESQUISA'],
                    cleanSearchOnOpening: true,
                    displayExpr: 'DS_PRODUTO_PESQUISA',
                    valueExpr: 'CD_PRODUTO',
                    placeholder: "Selecione um produto",
                    labelMode: 'floating',
                    label: "Produto",
                    showClearButton: true,
                    showPopupTitle: true
                }).dxLookup("instance");

                arrayComp[nomeComponente] = { Type: 'dxLookup', Component: comp };

                resolve(arrayComp[nomeComponente]);
            }
            else {
                reject(result);
            }
        });
    });
}

function Load_Azr_Lookup_Fornecedor(nomeComponente, arrayComp) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: "/GestaoEstrategica/GetFornecedores",
            async: true,
            success: function (response) {

                var comp = $(`#${nomeComponente}`).dxLookup({
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: 'Fornecedor',
                    },
                    dataSource: new DevExpress.data.DataSource({
                        store: response,
                        key: "CD_PESQUISA"
                    }),
                    searchEnabled: true,
                    searchExpr: ['DS_PESQUISA'],
                    cleanSearchOnOpening: true,
                    displayExpr: 'DS_PESQUISA',
                    valueExpr: 'CD_PESQUISA',
                    placeholder: "Selecione um fornecedor",
                    labelMode: 'floating',
                    label: "Fornecedor",
                    showClearButton: true,
                    showPopupTitle: true
                }).dxLookup("instance");

                arrayComp[nomeComponente] = { Type: 'dxLookup', Component: comp };
                resolve(arrayComp[nomeComponente]);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 200) resolve(new Error('Não encontrado'));
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            }
        });
    });
}

function Load_Azr_DropDownBox_FamiliaProduto(arrayComp, nomeComponente, label = '', status = azrFramework_tipoStatus.Todos, valueOf = 'exato') {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: "/Componente/GetFamilia",
            async: true,
            data: { status: status },
            success: (data) => {
                var comp = new DevExpress.ui.dxDropDownBox(`#${nomeComponente}`, {
                    valueExpr: "Value",
                    displayExpr: "text",
                    placeholder: "",
                    labelMode: 'floating',
                    label: label,
                    showClearButton: true,
                    dataSource: new DevExpress.data.CustomStore({
                        loadMode: "raw",
                        key: "id",
                        load: () => data,
                    }),
                    contentTemplate: (e) => {
                        let $div = $("<div>");
                        new DevExpress.ui.dxTreeView($div, {
                            dataSource: e.component.getDataSource(),
                            dataStructure: "plain",
                            keyExpr: "id",
                            parentIdExpr: "parentId",
                            selectionMode: "single",
                            displayExpr: "text",
                            searchEnabled: true,
                            selectByClick: true,
                            onItemSelectionChanged: (args) => {
                                if (valueOf == 'completo') {
                                    const selectedKeys = args.component.getSelectedNodeKeys();
                                    e.component.option("valueExpr", 'id');
                                    e.component.option("value", selectedKeys);
                                    return;
                                }
                                e.component.option("valueExpr", 'Value');
                                e.component.option("value", args.itemData.Value);
                            }
                        });
                        return $div;
                    },
                });

                arrayComp[nomeComponente] = { Type: 'dxDropDownBox', Component: comp };
                resolve(arrayComp[nomeComponente]);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 200) resolve(new Error('Não encontrado'));
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            }
        });
    });
}

function GetValuesOf_AzrComponents(arrayOfComponents, allowNullComponents = false) {
    var valores = new Object();

    for (x in arrayOfComponents) {
        var obj = arrayOfComponents[x];

        var value = obj.Component.option('value');

        if (allowNullComponents) {
            valores[x] = null;
        }

        if (value != null) {
            if (obj.Type == 'dxDropDownBox' && value?.length > 0) {
                var value = value[0];
                if (value.includes('_')) {
                    value = value.substring(value.lastIndexOf("_") + 1);
                }
                valores[x] = value;
            }
            else if (obj.Type == 'dxTagBox') {
                if (value?.length > 0) {
                    valores[x] = value.join(',');
                }
            }
            else {
                valores[x] = value;
            }
        }
    }

    return valores;
}

function cpfValidation(value) {
    if (!value) return false

    // Aceita receber o valor como string, número ou array com todos os dígitos
    const validTypes =
        typeof value === 'string' || Number.isInteger(value) || Array.isArray(value)

    // Elimina valores com formato inválido
    if (!validTypes) return false

    // Guarda todos os dígitos em um array
    const numbers = value.toString().match(/\d/g).map(Number)

    // Valida quantidade de dígitos
    if (numbers.length !== 11) return false

    // Elimina valores inválidos com todos os dígitos repetidos
    const items = [...new Set(numbers)]
    if (items.length === 1) return false

    // Separa número base do dígito verificador
    const base = numbers.slice(0, 9)
    const digits = numbers.slice(9)

    // Cálculo base
    const calc = (n, i, x) => n * (x - i)

    // Utilitário de soma
    const sum = (r, n) => r + n

    // Cálculo de dígito verificador
    const digit = (n) => {
        const rest = n % numbers.length
        return rest < 2 ? 0 : numbers.length - rest
    }

    // Cálculo sobre o número base
    const calc0 = base.map((n, i) => calc(n, i, numbers.length - 1)).reduce(sum, 0)
    // 1o. dígito verificador
    const digit0 = digit(calc0)

    // Valida 1o. digito verificador
    if (digit0 !== digits[0]) return false

    // Cálculo sobre o número base + 1o. dígito verificador
    const calc1 = base
        .concat(digit0)
        .map((n, i) => calc(n, i, numbers.length))
        .reduce(sum, 0)
    // 2o. dígito verificador
    const digit1 = digit(calc1)

    // Valida 2o. dígito verificador
    return digit1 === digits[1]
}

function cnpjValidation(value) {
    if (!value) return false

    // Aceita receber o valor como string, número ou array com todos os dígitos
    const isString = typeof value === 'string'
    const validTypes = isString || Number.isInteger(value) || Array.isArray(value)

    // Elimina valor em formato inválido
    if (!validTypes) return false

    // Filtro inicial para entradas do tipo string
    if (isString) {
        // Limita ao máximo de 18 caracteres, para CNPJ formatado
        if (value.length > 18) return false

        // Teste Regex para veificar se é uma string apenas dígitos válida
        const digitsOnly = /^\d{14}$/.test(value)
        // Teste Regex para verificar se é uma string formatada válida
        const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value)

        // Se o formato é válido, usa um truque para seguir o fluxo da validação
        if (digitsOnly || validFormat) true
        // Se não, retorna inválido
        else return false
    }

    // Guarda um array com todos os dígitos do valor
    const match = value.toString().match(/\d/g)
    const numbers = Array.isArray(match) ? match.map(Number) : []

    // Valida a quantidade de dígitos
    if (numbers.length !== 14) return false

    // Elimina inválidos com todos os dígitos iguais
    const items = [...new Set(numbers)]
    if (items.length === 1) return false

    // Cálculo validador
    const calc = (x) => {
        const slice = numbers.slice(0, x)
        let factor = x - 7
        let sum = 0

        for (let i = x; i >= 1; i--) {
            const n = slice[x - i]
            sum += n * factor--
            if (factor < 2) factor = 9
        }

        const result = 11 - (sum % 11)

        return result > 9 ? 0 : result
    }

    // Separa os 2 últimos dígitos de verificadores
    const digits = numbers.slice(12)

    // Valida 1o. dígito verificador
    const digit0 = calc(12)
    if (digit0 !== digits[0]) return false

    // Valida 2o. dígito verificador
    const digit1 = calc(13)
    return digit1 === digits[1]

    // Referência: https://pt.wikipedia.org/wiki/Cadastro_Nacional_da_Pessoa_Jur%C3%ADdica
}

/**
 * Função para gerar um data source DevExpress que retorna dados sob demanda
 * @param {object} parameters - Parâmetros utilizados para fazer o GET e gerar o data source
 * @param {string|string[]} parameters.key - Utilizado para seleção de manipulação dos itens no data source, necessário ser um dado único
 * @param {object|Function} parameters.optionsUser - Utilizado para enviar parâmetros personalizados para a requisição GET por meio de query parameters
 * @param {string} parameters.endpoint - Endpoint utilizado no GET da requisição
 * @param {string} parameters.namePropResult - Nome da propriedade que resultará nos dados recebidos da API, caso seja null, retornará diretamente o resultado
 * @param {Function} parameters.callback - Método para tratar os dados antes de devolver para o componente
 */
function createCustomDataSourcePaginate(parameters) {
    const isNotEmpty = (value) => value !== undefined && value !== null && value !== '';
    return new DevExpress.data.DataSource({
        key: parameters?.key,
        useDefaultSearch: true,
        load: (options) => {
            return new Promise((resolve, reject) => {
                if (!parameters || typeof (parameters) != 'object')
                    reject(new Error('Parâmetros de Data Source inválidos'));
                try {
                    const paramNames = [
                        'skip', 'take', 'requireTotalCount', 'requireGroupCount',
                        'sort', 'filter', 'totalSummary', 'group', 'groupSummary',
                    ];
                    const loadOptions = {};
                    paramNames
                        .filter((paramName) => isNotEmpty(options[paramName]))
                        .forEach((paramName) => { loadOptions[paramName] = JSON.stringify(options[paramName]); });

                    Object.assign(loadOptions, typeof parameters?.optionsUser == 'object' ? parameters?.optionsUser : {});
                    Object.assign(loadOptions, typeof parameters?.optionsUser == 'function' ? parameters?.optionsUser() : {});
                    Object.assign(loadOptions, typeof options?.userData == 'object' ? options?.userData : {});

                    fetch(`${parameters?.endpoint}?${new URLSearchParams(loadOptions).toString()}`)
                        .then((resp) => resp.json())
                        .then((resp) => {
                            const result = parameters?.namePropResult == null ? resp : resp[parameters?.namePropResult];
                            const response = typeof parameters?.callback == 'function' ? parameters.callback(result) : result;
                            resolve(response);
                        })
                        .catch((error) => { throw new Error(`Erro ao gerar data: ${error}`); });
                } catch (e) {
                    reject(new Error(`Falha ao gerar Data Source.${e.message ? ' Erro: ' + e.message : ''}`));
                }
            })
        },
        byKey: async function (key) {
            const filtros = {
                filter: [[this._key, "=", key]],
                skip: 0,
                take: 20,
            }
            let result = await this._loadFunc(filtros);
            return result.data[0] ?? null;
        },
    });
}

class modalMessage {
    container;
    titleIconClass;
    titleText;
    messageIconClass;
    message;
    okButton;
    okButtonOptions;
    abortButton;
    abortButtonOptions;
    exitButton;
    exitButtonOptions;
    onModalClosed;

    constructor(containerID, options = this.optionsDefault) {
        //MESCLA AS OPÇÕES ENVIADAS COM AS OPÇÕES PADRÃO PARA O BOTÃO OK
        if (options.okButton != "undefined") {
            options.okButton = {
                ...this.optionsDefault.okButton,
                ...options.okButton
            };
        }

        //MESCLA AS OPÇÕES ENVIADAS COM AS OPÇÕES PADRÃO PARA O BOTÃO ABORTAR
        if (options.abortButton != "undefined") {
            options.abortButton = {
                ...this.optionsDefault.abortButton,
                ...options.abortButton
            };
        }

        //MESCLA AS OPÇÕES ENVIADAS COM AS OPÇÕES PADRÃO PARA O BOTÃO SAIR
        if (options.exitButton != "undefined") {
            options.exitButton = {
                ...this.optionsDefault.exitButton,
                ...options.exitButton
            };
        }

        //MESCLA AS OPÇÕES ENVIADAS COM AS OPÇÕES PADRÃO
        if (options != "undefined") {
            options = {
                ...this.optionsDefault,
                ...options
            };
        }

        this.container = $(`#${containerID}`);
        this.titleIconClass = options.titleIconClass;
        this.titleText = options.titleText;
        this.messageIconClass = options.messageIconClass;
        this.message = options.message;
        this.okButtonOptions = options.okButton;
        this.abortButtonOptions = options.abortButton;
        this.exitButtonOptions = options.exitButton;
        this.onModalClosed = options.onModalClosed;
    }

    //DEFINE AS OPÇÕES PADRÃO
    optionsDefault = {
        titleIconClass: null,
        onModalClosed: null,
        titleIconClass: null,
        titleText: null,
        messageIconClass: null,
        message: null,
        okButton: {
            index: 1,
            visible: false,
            onClick: null,
        },
        abortButton: {
            index: 2,
            visible: false,
            onClick: null,
        },
        exitButton: {
            index: 3,
            visible: false,
            onClick: null,
        },
    }

    //EVENTO CLICK DO BOTÃO OK
    _okButtonClick = () => {
        if (typeof (this.okButtonOptions.onClick) === 'function') {
            this.okButtonOptions.onClick();
        }
    }

    //EVENTO CLICK DO BOTÃO ABORTAR
    _abortButtonClick = () => {
        if (typeof (this.abortButtonOptions.onClick) === 'function') {
            this.abortButtonOptions.onClick();
        }
    }

    //EVENTO CLICK DO BOTÃO SAIR
    _exitButtonClick = () => {
        if (typeof (this.exitButtonOptions.onClick) === 'function') {
            this.exitButtonOptions.onClick();
        }
    }

    //EVENTO CLOSED DO MODAL
    _onModalClosed = () => {
        if (typeof (this.onModalClosed) === 'function') {
            this.onModalClosed();
        }
    }

    showModal = () => {
        this.container.replaceWith(this.template());
        this.container.modal("toggle");
    }

    showExitPageModal = () => {
        this.titleText = "Confirma&ccedil;&atilde;o";
        this.messageIconClass = "fa fa-question-circle";
        this.message = "<h4>Deseja realmente fechar a tela e retornar ao painel central?</h4>";
        this.abortButtonOptions = {
            index: 1,
            visible: true,
        };
        this.exitButtonOptions = {
            index: 2,
            visible: true,
            onClick: () => { window.open('../Home/InicioRapido', '_parent'); },
        };

        this.container.replaceWith(this.template());
        this.container.modal("toggle");
    }

    showQuestionModal = (message, title = "Confirma&ccedil;&atilde;o", callBackOkButton = function () { }, callBackAbortButton = function () { }) => {
        this.titleText = title;
        this.messageIconClass = "fa fa-question-circle";
        this.message = message;
        this.okButtonOptions = {
            index: 1,
            visible: true,
            onClick: callBackOkButton
        };

        this.abortButtonOptions = {
            index: 2,
            visible: true,
            onClick: callBackAbortButton
        };

        this.container.replaceWith(this.template());
        this.container.modal("toggle");
    }


    //FUNÇÃO QUE MONTA O TEMPLATE
    template = () => {
        $.div = this.container
            .empty()
            .removeClass()
            .off()
            .addClass("modal fade")
            .attr("data-backdrop", "static")
            .attr("data-keyboard", "false")
            .attr("tabindex", "-1")
            .attr("role", "dialog")
            .attr("aria-hidden", "true")
            .on('hidden.bs.modal', this._onModalClosed)
            .append($("<div>")
                .addClass("modal-dialog modal-dialog-centered modal-lg")
                .attr("role", "document")
                .append($("<div>")
                    .addClass("modal-content")
                    .append($("<section>")
                        .addClass("card card-default")
                        .append($("<header>")
                            .addClass("card-header mb-0")
                            .append($("<h2>")
                                .addClass("card-title")
                                .append($("<span>")
                                    .addClass(this.titleIconClass)
                                )
                                .append($("<span>")
                                    .html(this.titleText)
                                )
                            )
                        )
                        .append($("<div>")
                            .addClass("card-body")
                            .append($("<div>")
                                .addClass("modal-wrapper modal-block-primary")
                                .append($("<div>")
                                    .addClass("modal-icon")
                                    .append($("<div>")
                                        .addClass(this.messageIconClass)
                                    )
                                )
                                .append($.divMessage = $("<div>")
                                    .addClass("modal-text")
                                )
                            )
                        )
                        .append($("<footer>")
                            .addClass("card-footer")
                            .append($("<div>")
                                .addClass("row")
                                .append($.divButtons = $("<div>")
                                    .addClass("col-lg-12 text-right")
                                )
                            )
                        )
                    )
                )
            );

        const isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);
        if (isHTML(this.message)) {
            $.divMessage.append(this.message)
        }
        else {
            $.divMessage.text(this.message)
        }

        //CRIAÇÃO DOS BOTÕES COM ORDERNAÇÃO BASEADA NO ÍNDICE
        let buttons = [
            $.extend({}, { type: "ok" }, this.okButtonOptions),
            $.extend({}, { type: "abort" }, this.abortButtonOptions),
            $.extend({}, { type: "exit" }, this.exitButtonOptions)
        ]

        buttons = buttons.sort((a, b) => (a.index - b.index));

        for (var indice in buttons) {
            if (buttons[indice].type == "ok") {
                //CRIA O BOTÃO OK E INCLUI NO TEMPLATE
                this.okButton = this.createButton("btn btn-xs btn-default ml-1", "fa fa-thumbs-o-up mr-2", "OK", this.okButtonOptions.visible, this.okButtonOptions.onClick)
                $.divButtons.append(this.okButton)
            }
            else if (buttons[indice].type == "abort") {
                //CRIA O BOTÃO ABORTAR E INCLUI NO TEMPLATE
                this.abortButton = this.createButton("btn btn-xs btn-danger ml-1", "fa fa-reply mr-2", "Abortar", this.abortButtonOptions.visible, this.abortButtonOptions.onClick)
                $.divButtons.append(this.abortButton)
            }
            else if (buttons[indice].type == "exit") {
                //CRIA O BOTÃO SAIR E INCLUI NO TEMPLATE
                this.exitButton = this.createButton("btn btn-xs btn-primary ml-1", "fa fa-thumbs-o-up mr-2", "Sair", this.exitButtonOptions.visible, this.exitButtonOptions.onClick)
                $.divButtons.append(this.exitButton)
            }
        }

        return $.div;
    }

    //FUNÇÃO QUE CRIA O BOTÃO
    createButton = (buttonClass, iconClass, text, visible, onClick) => {
        $.button = $("<button>")
            .addClass(buttonClass)
            .attr("type", "button")
            .attr("data-dismiss", "modal")
            .on("click", onClick)
            .append($("<i>")
                .addClass(iconClass)
            )
            .append($("<span>")
                .text(text)
            )

        if (!visible) $.button.hide();

        return $.button
    }
}

function InjectMomentJs() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/vendor/mustache/mustache.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Erro ao carregar moment.js"));
        document.head.appendChild(script);
    });
}

function CreateDxPopUp({ titulo = 'Informa\u00E7\u00E3o', iconClass = 'fa fa-circle-info mr-2', show = true, idTemplate, dataTemplate = {} } = {}) {
    const loadMustache = InjectMomentJs();
    const $body = $('body');
    let $popupInfo = $('#popupInfo'), $contentPopupInfo = $('#contentPopupInfo');

    if ($popupInfo.length == 0) {
        $popupInfo = $('<popup id="popupInfo">');
        $body.append($popupInfo);
    }
    if ($contentPopupInfo.length == 0) {
        $contentPopupInfo = $(`
            <script type="text/html" id="contentPopupInfo">
                <section class="card card-default h-100">
                    <header class="card-header mb-0">
                        <h2 class="card-title">
                            <i class="{{iconClass}}"></i>
                            {{titulo}}
                        </h2>
                    </header>
                    <div class="card-body">
                        {{{conteudo}}}
                    </div>
                    <footer class="card-footer">
                        <div class="row">
                            <div class="col-12 text-right">
                                <div id="btn_sair"></div>
                            </div>
                        </div>
                    </footer>
                </section>
            </script>`);
        $body.append($contentPopupInfo);
    }

    const popup = new DevExpress.ui.dxPopup($popupInfo[0], {
        minWidth: 208,
        maxWidth: 800,
        width: '90vw',
        minHeight: 282,
        height: 'auto',
        showCloseButton: false,
        showTitle: false,
        onShowing({ component }) {
            component._$wrapper.css('z-index', 997);
            promise.then(($section) => {
                this.content.append($section);
            })
        },
        contentTemplate(content) {
            this.content = content.addClass('p-0');
        },
    })

    const promise = new Promise((resolve) => {
        loadMustache.then(() => {
            let renderConteudo = null;
            if (idTemplate) {
                const conteudo = $(`${idTemplate?.includes('#') ? '' : '#'}${idTemplate}`).html();
                renderConteudo = mustache.render(conteudo, { dataTemplate });
            }
            const render = mustache.render($contentPopupInfo.html(), { titulo, iconClass, conteudo: renderConteudo });
            const $section = $(render);
            this.btnSair = new DevExpress.ui.dxButton($section.find('#btn_sair'), {
                text: 'Fechar',
                icon: 'fa fa-right-from-bracket',
                onClick: () => popup.hide(),
            });
            resolve($section);
        });
    })

    if (show)
        popup.show();

    return popup;
}