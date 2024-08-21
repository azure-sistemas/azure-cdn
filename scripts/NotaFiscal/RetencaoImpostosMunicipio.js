var oLoadPanel = null;
var dsMunicipio = [];
var oLkpMunicipioContainer = null;
var oLkpMunicipio = null;
var oNbxPcAliquotaContainer = null;
var oNbxPcAliquota = null;
var oTxtTextoLegal = null;
var oChkValorProdutos = null;
var oChkFrete = null;
var oChkSeguro = null;
var oChkOutrasDespesas = null;
var oChkICMSST = null;
var oChkFCPST = null;
var oChkIPI = null;
var oSelectedFilter = null;
var oGridRetencaoImpostoMunicipio = null;
var dsRetencaoImpostoCliente = [];
var vClientesSelecionadoCarregamento = null;
var oGridRetencaoImpostoCliente = null;
var oBtnSalvar = null;
var FocusedMunicipio = null;
var vCodImposto = null;
var vCodMunicipio = null;
var vOperacao = null;
var vLkpMunicipioValidationRules = { validationRules: [{ type: "required", message: "Município é Obrigatório", }], validationGroup: "Cadastro" };
var vNbxPcAliquotaValidationRules = { validationRules: [{ type: "required", message: "Alíquota é Obrigatória", }], validationGroup: "Cadastro" };
var vEmptyValidationRules = { validationRules: [{ type: "stringLength", min: 0, message: "", }] };

$(document).ready(function () {
    oLoadPanel = $("#loadPanel").dxLoadPanel({
        shadingColor: "rgba(0,0,0,0.4)",
        message: "Carregando...",
        visible: false,
        showIndicator: true,
        showPane: true,
        shading: true,
        hideOnOutsideClick: false,
    }).dxLoadPanel("instance");

    oLoadPanel.show();

    oLkpMunicipioContainer = $("#lkpMunicipio");

    oLkpMunicipio = $("#lkpMunicipio").dxLookup({
        searchExpr: ["DS_MUNICIPIO_UF"],
        displayExpr: "DS_MUNICIPIO_UF",
        valueExpr: "CD_MUNICIPIO",
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: "Município",
        },
        labelMode: "floating",
        label: "Município *",
        placeholder: "",
        showClearButton: true,
        onValueChanged(e) {
            alteraMunicipio(oLkpMunicipio.option("value"));
        },
    }).dxLookup("instance");

    oNbxPcAliquotaContainer = $("#nbxPcAliquota");

    oNbxPcAliquota = $("#nbxPcAliquota").dxNumberBox({
        value: "",
        format: "##0.####",
        min: 0.0001,
        max: 100,
        step: 0.0001,
        showClearButton: true,
        showSpinButtons: true,
        labelMode: "floating",
        label: "% Alíquota *",
    }).dxNumberBox("instance");

    oTxtTextoLegal = $("#txtTextoLegal").dxTextArea({
        labelMode: "floating",
        label: "Texto Legal",
        height: undefined,
        autoResizeEnabled: true,
        maxLength: 2000,
    }).dxTextArea("instance");

    oChkValorProdutos = $("#chkValorProdutos").dxCheckBox({
        value: true,
        readOnly: true,
        text: "Valor dos Produtos",
    }).dxCheckBox("instance");

    oChkFrete = $("#chkFrete").dxCheckBox({
        value: false,
        text: "Frete",
    }).dxCheckBox("instance");

    oChkSeguro = $("#chkSeguro").dxCheckBox({
        value: false,
        text: "Seguro",
    }).dxCheckBox("instance");

    oChkOutrasDespesas = $("#chkOutrasDespesas").dxCheckBox({
        value: false,
        text: "Outras Despesas",
    }).dxCheckBox("instance");

    oChkICMSST = $("#chkICMSST").dxCheckBox({
        value: false,
        text: "ICMSST",
    }).dxCheckBox("instance");

    oChkFCPST = $("#chkFCPST").dxCheckBox({
        value: false,
        text: "FCPST",
    }).dxCheckBox("instance");

    oChkIPI = $("#chkIPI").dxCheckBox({
        value: false,
        text: "IPI",
    }).dxCheckBox("instance");

    oGridRetencaoImpostoMunicipio = $("#gridRetencaoImpostoMunicipio").dxDataGrid({
        keyExpr: ["Cd_Imposto", "Cd_Municipio"],
        hoverStateEnabled: true,
        showBorders: true,
        showRowLines: true,
        focusedRowEnabled: true,
        focusedRowKey: FocusedMunicipio,
        allowColumnResizing: true,
        columnsAutoWidth: true,
        cellHintEnabled: true,
        allowColumnReordering: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,
        columnHidingEnabled: true,
        sorting: { mode: "multiple" },
        selection: { mode: "single" },
        groupPanel: { visible: false },
        pager: {
            visible: true,
            allowedPageSizes: [10, 15, 20, 50, 100],
            showPageSizeSelector: false,
            showNavigationButtons: true
        },
        paging: { pageSize: 20 },
        export: {
            enabled: true,
            allowExportSelectedData: false
        },
        onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet("Retenção Imposto Município");

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Retencao_Imposto_Municipio.xlsx");
                });
            });
            e.cancel = true;
        },
        searchPanel: {
            visible: true,
            highlightCaseSensitive: false,
            highlightSearchText: true,
            placeholder: "Procurar...",
        },
        filterRow: { visible: true, applyFilter: "auto" },
        headerFilter: {
            visible: true,
            allowSearch: true
        },
        filterPanel: { visible: true },
        columnChooser: { enabled: true, allowSearch: true, height: 350 },
        editing: {
            mode: "form",
            allowUpdating: false,
            startEditAction: "click",
            allowAdding: false,
            allowDeleting: true,
            useIcons: true,
        },
        columns: [
            {
                dataField: "Cd_Municipio",
                caption: "Código Município",
                width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                allowHiding: false,
            },
            {
                dataField: "Ds_Municipio",
                caption: "Nome Município",
                //width: 250,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                allowHiding: false,
            },
            {
                dataField: "Pc_Aliquota",
                caption: "% Alíquota",
                width: 100,
                format: "###,###,###,##0.0000",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "center",
                cssClass: "column-data-grid",
                allowHiding: false,
            },
            {
                name: "GrupoBase",
                dataField: "BASE",
                caption: "",
                cssClass: "column-data-grid",
                alignment: "center",
                visible: true,
                columns: [
                    {
                        name: "ValorProdutosGrupoBase",
                        dataField: "Ds_Valor_Liquido_Produtos_Compoe_Base",
                        caption: "Valor Produtos",
                        width: 120,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        allowHiding: false,
                    },
                    {
                        name: "FreteGrupoBase",
                        dataField: "Ds_Valor_Frete_Compoe_Base",
                        caption: "Frete",
                        width: 118,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        allowHiding: false,
                    },
                    {
                        name: "SeguroGrupoBase",
                        dataField: "Ds_Valor_Seguro_Compoe_Base",
                        caption: "Seguro",
                        width: 118,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        allowHiding: false,
                    },
                    {
                        name: "OutrasDespesasGrupoBase",
                        dataField: "Ds_Valor_Outras_Despesas_Compoe_Base",
                        caption: "Outras Despesas",
                        width: 126,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        allowHiding: false,
                    },
                    {
                        name: "ICMSSTGrupoBase",
                        dataField: "Ds_Valor_ICMSST_Compoe_Base",
                        caption: "ICMSST",
                        width: 118,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        allowHiding: false,
                    },
                    {
                        name: "FCPSTGrupoBase",
                        dataField: "Ds_Valor_FCPST_Compoe_Base",
                        caption: "FCPST",
                        width: 118,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        allowHiding: false,
                    },
                    {
                        name: "IPIGrupoBase",
                        dataField: "Ds_Valor_IPI_Compoe_Base",
                        caption: "IPI",
                        width: 118,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        allowHiding: false,
                    }
                ]
            },
            { type: "buttons", width: 30, }
        ],
        onCellPrepared: function (e) {
            if (e.rowType === "header") {
                if (e.column.dataField === "BASE") {
                    e.cellElement.css("color", "#f05b41");
                    e.cellElement.css("font-weight", "bold");
                    e.cellElement.css("background-color", "#f8f9fa");

                }
            }
        },
        onCellClick: function (e) {
            if (e.rowType === "data" && e.column.type != "adaptive") {
                if (document.getElementById("cadastroRetencaoImpostos").style.display === "none") {
                    closeConsultaPanel();
                }

                oLkpMunicipio.option("dataSource", dsMunicipio);
                oLkpMunicipio.option("value", e.data.Cd_Municipio);
            }
        },
        onInitialized(e) {
            new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        e.component.updateDimensions();
                    }
                });
            }).observe(e.element[0]);
        },
        onFocusedRowChanged: function (e) {
            if (e.row != "") {
                FocusedMunicipio = e.component.option("focusedRowKey")
            } else {
                FocusedMunicipio = null;
            }
        },
        onRowRemoving: function (e) {
            e.cancel = true;

            oLoadPanel.show();

            var vParametrosExclusao = JSON.stringify({
                Cd_Imposto: e.data.Cd_Imposto,
                Cd_Municipio: e.data.Cd_Municipio
            });

            $.ajax({
                type: "POST",
                url: "/NotaFiscal/ExcluirMunicipioRetencaoImposto",
                data: { pRetencaoImpostoMunicipio: vParametrosExclusao },
                success: function (response) {
                    if (response.result == "error") {
                        exibeMensagem("error", "Ocorreu um erro ao excluir o registro", response.msg);
                    }
                    else {
                        exibeMensagem("success", "Operação realizada!", "Registro excluído com sucesso");

                        if (vCodMunicipio == e.data.Cd_Municipio) {
                            limpaCamposMunicipio(true);
                        }

                        carregaMunicipios();
                    }

                    oLoadPanel.hide();
                },
                failure: function (response) {
                    exibeMensagem("error", "Ocorreu um erro ao excluir o registro", response.msg);

                    oLoadPanel.hide();
                }
            });
        },
        toolbar: {
            items: [
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        icon: "refresh",
                        hint: "Atualiza lista de Municípios",
                        onClick() {
                            carregaMunicipios();
                        },
                    },
                },
                "exportButton",
                "searchPanel",
            ],
        },
    }).dxDataGrid("instance");

    oGridRetencaoImpostoCliente = $("#gridRetencaoImpostoCliente").dxDataGrid({
        dataSource: [],
        keyExpr: ["Cd_Imposto", "Cd_Municipio", "Cd_CPF_CNPJ"],
        hoverStateEnabled: true,
        showBorders: true,
        showRowLines: true,
        allowColumnResizing: true,
        columnsAutoWidth: true,
        cellHintEnabled: true,
        allowColumnReordering: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,
        columnHidingEnabled: true,
        width: "100%",
        sorting: { mode: "multiple" },
        selection: { mode: "multiple", showCheckBoxesMode: "always" },
        groupPanel: { visible: false },
        pager: {
            visible: true,
            allowedPageSizes: [10, 15, 20, 50, 100],
            showPageSizeSelector: true,
            showNavigationButtons: true
        },
        paging: { pageSize: 20 },
        export: {
            enabled: true,
            allowExportSelectedData: false
        },
        onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet("Retenção Imposto Cliente");

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Retencao_Imposto_Cliente.xlsx");
                });
            });
            e.cancel = true;
        },
        searchPanel: {
            visible: true,
            highlightCaseSensitive: false,
            highlightSearchText: true,
            placeholder: "Procurar...",
        },
        filterRow: { visible: true, applyFilter: "auto" },
        headerFilter: {
            visible: true,
            allowSearch: true
        },
        filterPanel: { visible: true },
        columnChooser: { enabled: true, allowSearch: true, height: 350 },
        editing: {
            mode: "batch",
            allowUpdating: true,
            startEditAction: "click",
            allowAdding: false,
            allowDeleting: false,
            useIcons: true,
        },
        columns: [
            { type: "selection", width: 30, },
            { dataField: "Cd_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: "center", cssClass: "column-data-grid", allowHiding: false, },
            { dataField: "Ds_Fantasia", caption: "Nome Fantasia", width: 200, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: "left", cssClass: "column-data-grid", allowHiding: true, hidingPriority: 111, },
            { dataField: "Ds_Participante", caption: "Participante", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: "center", cssClass: "column-data-grid", allowHiding: true, hidingPriority: 110, },
            { dataField: "Ds_Orgao_Publico", caption: "Orgão Público", width: 110, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: "center", cssClass: "column-data-grid", allowHiding: true, hidingPriority: 109, },
            { dataField: "Ds_Cliente_Atuacao", width: 150, caption: "Atuação", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: "left", cssClass: "column-data-grid", allowHiding: true, hidingPriority: 108, },
            { dataField: "Ds_Ramo_Atividade", width: 150, caption: "Ramo", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: "left", cssClass: "column-data-grid", allowHiding: true, hidingPriority: 107, },
            { dataField: "Ds_Categoria_Cliente", width: 150, caption: "Categoria", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: "left", cssClass: "column-data-grid", allowHiding: true, hidingPriority: 106, },

            { dataField: "Ds_Razao_Social", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: "left", cssClass: "column-data-grid", visible: false, allowHiding: true, hidingPriority: 105, },
            { dataField: "Cd_Inscricao_Estadual", caption: "IE/RG", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: "left", cssClass: "column-data-grid", visible: false, allowHiding: true, hidingPriority: 104, },
            { dataField: "Ds_Contato", caption: "Contato", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: "left", cssClass: "column-data-grid", visible: false, allowHiding: true, hidingPriority: 103, },
            { dataField: "Ds_Optante_Simples", caption: "Optante Simples", width: 110, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: "center", cssClass: "column-data-grid", visible: false, allowHiding: true, hidingPriority: 102, },
            { dataField: "Ds_Nao_Contribuinte_ICMS", caption: "Não Contribuinte ICMS", width: 110, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: "center", cssClass: "column-data-grid", visible: false, allowHiding: true, hidingPriority: 101, },
            { dataField: "Ds_Status", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: "center", cssClass: "column-data-grid", visible: false, allowHiding: true, hidingPriority: 100, },
        ],
        toolbar: {
            items: [
                "saveButton",
                "revertButton",
                {
                    location: "after",
                    widget: "dxButton",
                    locateInMenu: "auto",
                    options: {
                        hint: "Restaurar layout original do grid",
                        icon: "deletetable",
                        onClick: function () {
                            var result = DevExpress.ui.dialog.confirm("Deseja restaurar layout original do grid?", "Restaurar");
                            result.done(function (dialogResult) {
                                if (dialogResult) {
                                    oGridRetencaoImpostoCliente.state({});
                                    oGridRetencaoImpostoCliente.refresh();

                                    ajustaLayoutGrids();

                                    selecionaClientesParticipantes();                                }
                            });
                        }
                    }
                },
                "exportButton",
                "columnChooserButton",
                "searchPanel"
            ],
        },
        stateStoring: AutoLoad('gridRetencaoImpostoCliente'),
        onSelectionChanged: function (e) {
            e.currentSelectedRowKeys.forEach(function (key) {
                var rowIndex = e.component.getRowIndexByKey(key);

                if (vClientesSelecionadoCarregamento.indexOf("|" + key.Cd_CPF_CNPJ + "|") >= 0) {
                    vClientesSelecionadoCarregamento = vClientesSelecionadoCarregamento.replace("|" + key.Cd_CPF_CNPJ + "|", "");
                } else {
                    e.component.cellValue(rowIndex, "Ds_Participante", "Sim");
                }
            })

            e.currentDeselectedRowKeys.forEach(function (key) {
                var rowIndex = e.component.getRowIndexByKey(key);

                e.component.cellValue(rowIndex, "Ds_Participante", null);
            })
        },
        onSaving: function (e) {
            oLoadPanel.show();

            var vRetencaoImpostoCliente = [];

            e.changes.forEach(function (participanteAlterado) {
                vRetencaoImpostoCliente.push({
                    Cd_Imposto: vCodImposto,
                    Cd_Municipio: vCodMunicipio,
                    Cd_CPF_CNPJ: participanteAlterado.key.Cd_CPF_CNPJ,
                    Lg_Participante: participanteAlterado.data.Ds_Participante == null ? false : true
                });
            });

            var vParametrosGravacao = JSON.stringify({
                Cd_Imposto: vCodImposto,
                Cd_Municipio: vCodMunicipio,
                RetencaoImpostoCliente: vRetencaoImpostoCliente
            });

            $.ajax({
                type: "POST",
                url: "/NotaFiscal/SalvarClientesRetencaoImposto",
                data: { pRetencaoImpostoMunicipio: vParametrosGravacao },
                success: function (responseData) {
                    if (responseData.result == "error") {
                        exibeMensagem("error", "Erro ao salvar os clientes participantes para retenção de imposto", responseData.msg);

                        e.cancel = true;
                    } else {
                        exibeMensagem("success", "Operação realizada!", "Registros salvos com sucesso");

                        dsRetencaoImpostoCliente = responseData.dataSource.RetencaoImpostoCliente;

                        oGridRetencaoImpostoCliente.option("dataSource", dsRetencaoImpostoCliente);
                    }

                    oLoadPanel.hide();
                },
                fail: function (responseData) {
                    exibeMensagem("error", "Erro ao salvar os clientes participantes para retenção de imposto", responseData.msg);

                    e.cancel = true;

                    oLoadPanel.hide();
                }
            });
        },
        onEditCanceling: function (e) {
            oGridRetencaoImpostoCliente.deselectAll();
        },
        onEditCanceled: function (e) {
            selecionaClientesParticipantes();
        },
        onCellPrepared: function (e) {
            if (e.rowType == "filter" && e.column.type == "selection") {
                let grid = e.component;

                var selectedFilter = $("<div />").dxSelectBox({
                    dataSource: ["Todos", "Sim", "Não"],
                    value: "Todos",
                    onValueChanged: function (args) {

                        if (args.value == "Todos") {
                            grid.clearFilter("dataSource");

                        } else {

                            let filter = [];
                            let keys = grid.getSelectedRowKeys();

                            keys.forEach(function (key) {

                                filter.push([["Cd_Imposto", key.Cd_Imposto], ["Cd_Municipio", key.Cd_Municipio], ["Cd_CPF_CNPJ", key.Cd_CPF_CNPJ]]);
                                filter.push("or");
                            })

                            filter.pop();
                            args.value == "Não" ? filter = ["!", filter] : null;

                            grid.filter(filter);
                        }
                    },
                    dropDownOptions: { width: 100 }
                });

                oSelectedFilter = selectedFilter.dxSelectBox("instance");

                e.cellElement.html(selectedFilter);
                e.cellElement.addClass("dx-editor-cell");
            }
            else if (e.rowType === "data") {
                if (e.column.dataField === "Ds_Status") {
                    if (e.value === "Inativo") {
                        e.cellElement.css("color", "#d00000");
                        e.cellElement.css("font-weight", "bold");
                    };
                }
            }
        },
        onInitialized(e) {
            new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        e.component.updateDimensions();
                    }
                });
            }).observe(e.element[0]);
        },
    }).dxDataGrid("instance");

    oBtnSalvar = $("#btnSalvar").dxButton({
        text: "Salvar Configurações para Retenção",
        icon: "save",
        type: "success",
        onClick(e) {
            oLkpMunicipioContainer.dxValidator(vLkpMunicipioValidationRules);
            oNbxPcAliquotaContainer.dxValidator(vNbxPcAliquotaValidationRules);

            const validationResult = DevExpress.validationEngine.validateGroup("Cadastro");

            if (!validationResult.isValid) {
                DevExpress.ui.notify({
                    message: "Por favor, verifique o preenchimento dos campos obrigatórios.",
                    type: "error",
                    displayTime: 5000,
                });
            }
            else {
                oLoadPanel.show();

                oLkpMunicipioContainer.dxValidator(vEmptyValidationRules);
                oNbxPcAliquotaContainer.dxValidator(vEmptyValidationRules);

                var vParametrosGravacao = JSON.stringify({
                    Cd_Imposto: vCodImposto,
                    Cd_Municipio: oLkpMunicipio.option("value"),
                    Pc_Aliquota: oNbxPcAliquota.option("value"),
                    Ds_Texto_Legal: oTxtTextoLegal.option("value"),
                    Lg_Valor_Liquido_Produtos_Compoe_Base: oChkValorProdutos.option("value"),
                    Lg_Valor_Frete_Compoe_Base: oChkFrete.option("value"),
                    Lg_Valor_Seguro_Compoe_Base: oChkSeguro.option("value"),
                    Lg_Valor_Outras_Despesas_Compoe_Base: oChkOutrasDespesas.option("value"),
                    Lg_Valor_ICMSST_Compoe_Base: oChkICMSST.option("value"),
                    Lg_Valor_FCPST_Compoe_Base: oChkFCPST.option("value"),
                    Lg_Valor_IPI_Compoe_Base: oChkIPI.option("value")
                });

                $.ajax({
                    type: "POST",
                    url: "/NotaFiscal/SalvarMunicipioRetencaoImposto",
                    data: { pRetencaoImpostoMunicipio: vParametrosGravacao },
                    success: function (responseData) {
                        if (responseData.result == "error") {
                            exibeMensagem("error", "Erro ao salvar os dados da retenção de imposto para o município selecionado", responseData.msg);
                        } else {
                            exibeMensagem("success", "Operação realizada!", "Registro salvo com sucesso");

                            carregaMunicipios();

                            if (vOperacao == "I") {
                                vOperacao = "A";

                                exibeGridClientes();

                                exibeAvisoSelecaoClientes();
                            }
                        }

                        oLoadPanel.hide();
                    },
                    fail: function (responseData) {
                        exibeMensagem("error", "Erro ao salvar os dados da retenção de imposto para o município selecionado", responseData);

                        oLoadPanel.hide();
                    }
                });
            }
        },
    }).dxButton("instance");

    //Consulta Municípios
    GetAzureDataSource(14, "{ }").then((result) => {
        if (result.success) {
            dsMunicipio = result.data;

            oLkpMunicipio.option("dataSource", dsMunicipio);
        }
        else {
            dsMunicipio = [];

            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: "error",
                displayTime: 5000,
            });
        }
    });
});

$(window).bind("load", function () {
    oLoadPanel.hide();

    $("#cardCabecalho").show("fast");
    $("#cardCadastro").show("fast");
});

function configuraGridConsulta(pExibirGrupoBaseCalculo) {
    if (pExibirGrupoBaseCalculo == true) {
        oGridRetencaoImpostoMunicipio.columnOption("GrupoBase", "caption", "Composição da Base de Cálculo");
    }
    else {
        oGridRetencaoImpostoMunicipio.columnOption("GrupoBase", "caption", "");
    }
};

function openConsultaPanel() {
    const pageWidth = document.documentElement.scrollWidth;

    if (pageWidth > 1600) {
        $("#principalRetencaoImpostos").removeClass("col-lg-12").addClass("col-lg-9");
        $("#consultaRetencaoImpostos").removeClass("col-lg-12").addClass("col-lg-3");
        $("#consultaRetencaoImpostos").removeClass("panelConsultaLateral").addClass("panelConsultaLateral");

        document.getElementById("divBtnExpandirFecharConsulta").style.display = "block";
        document.getElementById("divBtnFecharConsulta").style.display = "none";

        document.getElementById("consultaRetencaoImpostos").style.display = "block";

        configuraGridConsulta(false);

        ajustaLayoutGrids();
    }
    else {
        expandirConsultaPanel();
    }
};

function closeConsultaPanel() {
    $("#principalRetencaoImpostos").removeClass("col-lg-9").addClass("col-lg-12");

    document.getElementById("consultaRetencaoImpostos").style.display = "none";
    document.getElementById("cadastroRetencaoImpostos").style.display = "block";

    configuraGridConsulta(false);

    ajustaLayoutGrids();
};

function expandirConsultaPanel() {
    $("#consultaRetencaoImpostos").removeClass("col-lg-3").addClass("col-lg-12");
    $("#consultaRetencaoImpostos").removeClass("panelConsultaLateral");

    document.getElementById("cadastroRetencaoImpostos").style.display = "none";

    document.getElementById("divBtnExpandirFecharConsulta").style.display = "none";
    document.getElementById("divBtnFecharConsulta").style.display = "block";

    document.getElementById("consultaRetencaoImpostos").style.display = "block";

    configuraGridConsulta(true);

    ajustaLayoutGrids();
};

function ajustaLayoutGrids() {
    $("#gridRetencaoImpostoCliente").dxDataGrid("instance").updateDimensions();
    $("#gridRetencaoImpostoMunicipio").dxDataGrid("instance").updateDimensions();
};

function exibirEsconderPaineis(el, paramDisplay) {
    var display;

    if (paramDisplay === "block" || paramDisplay === "none") {
        display = paramDisplay;
    } else {
        if (document.getElementById(el).style.display === "none") {
            display = "block";
        } else {
            display = "none";
        };
    };

    document.getElementById(el).style.display = display;
}

function exibeMensagem(pTipo, pTitulo, pTexto) {

    var configuration = { title: pTitulo, text: pTexto, type: pTipo }

    if (pTipo == "error") {
        configuration.addclass = "stack-bar-top";
        configuration.stack = { "dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0 };
        configuration.width = "100%";
        configuration.hide = false;
    }
    else if (pTipo == "info") {
        configuration.addclass = "notification-warning stack-bar-top";
        configuration.stack = { "dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0 };
        configuration.width = "100%";
    }

    new PNotify(configuration);
};

function abrirModal(e) {
    $(e).modal("toggle");
};

function rolarPara(elemento) {
    $("html, body").animate({ scrollTop: $(elemento).offset().top }, 600);
};

function alteraImposto(pCodImposto) {
    document.getElementById("panelMunicipio").style.display = "block";

    vCodImposto = pCodImposto;

    limpaCampos();

    carregaMunicipios();
};

function carregaMunicipios() {
    oLoadPanel.show();

    var vParametrosConsulta = JSON.stringify({
        Cd_Imposto: vCodImposto
    });

    //Consulta municípios configurados para o imposto selecionado
    $.ajax({
        type: "POST",
        url: "/NotaFiscal/CarregaMunicipiosRetencaoImposto",
        data: { pRetencaoImpostoMunicipio: vParametrosConsulta },
        success: function (responseData) {
            if (typeof responseData == "string") {
                exibeMensagem("error", "Erro ao executar a consulta dos municípios configurados para o imposto selecionado", responseData);
            } else {
                oGridRetencaoImpostoMunicipio.option("dataSource", responseData);
            }

            oLoadPanel.hide();
        },
        fail: function (responseData) {
            exibeMensagem("error", "Erro ao executar a consulta dos municípios configurados para o imposto selecionado", responseData);

            oLoadPanel.hide();
        }
    });
};

function alteraMunicipio(pCodMunicipio) {
    vCodMunicipio = pCodMunicipio;

    oLoadPanel.show();

    limpaCamposMunicipio(false);

    if (vCodMunicipio != null) {
        dsRetencaoImpostoCliente = [];

        var vParametrosConsulta = JSON.stringify({
            Cd_Imposto: vCodImposto,
            Cd_Municipio: vCodMunicipio
        });

        //Consulta rentenção de imposto do município selecionado
        $.ajax({
            type: "POST",
            url: "/NotaFiscal/CarregaRetencaoImpostoMunicipio",
            data: { pRetencaoImpostoMunicipio: vParametrosConsulta },
            success: function (responseData) {
                if (typeof responseData == "string") {
                    exibeMensagem("error", "Erro ao executar a consulta dos clientes do município selecionado", responseData);
                } else {
                    oNbxPcAliquota.option("value", responseData.Pc_Aliquota);
                    oTxtTextoLegal.option("value", responseData.Ds_Texto_Legal);

                    oChkFrete.option("value", responseData.Lg_Valor_Frete_Compoe_Base);
                    oChkSeguro.option("value", responseData.Lg_Valor_Seguro_Compoe_Base);
                    oChkOutrasDespesas.option("value", responseData.Lg_Valor_Outras_Despesas_Compoe_Base);
                    oChkICMSST.option("value", responseData.Lg_Valor_ICMSST_Compoe_Base);
                    oChkFCPST.option("value", responseData.Lg_Valor_FCPST_Compoe_Base);
                    oChkIPI.option("value", responseData.Lg_Valor_IPI_Compoe_Base);

                    dsRetencaoImpostoCliente = responseData.RetencaoImpostoCliente;

                    oGridRetencaoImpostoCliente.option("dataSource", dsRetencaoImpostoCliente);

                    selecionaClientesParticipantes();

                    if (responseData.Pc_Aliquota != null) {
                        vOperacao = "A";

                        exibeGridClientes();
                    }
                    else {
                        vOperacao = "I";
                    }
                }

                oLoadPanel.hide();
            },
            fail: function (responseData) {
                exibeMensagem("error", "Erro ao executar a consulta dos clientes do município selecionado", responseData);

                oLoadPanel.hide();
            }
        });
    }

    oLoadPanel.hide();
};

function exibeGridClientes() {
    exibirEsconderPaineis("cardClientesParticipantes", "block");
    exibirEsconderPaineis("cardObservacoesClientes", "block");
};

function exibeAvisoSelecaoClientes() {
    abrirModal("#ModalAvisoSelecaoClientes");
};

function selecionaClientesParticipantes() {
    if (dsRetencaoImpostoCliente.length > 0) {
        var clientesParticipantes = [];
        clientesParticipantes = DevExpress.data.query(dsRetencaoImpostoCliente).filter(["Lg_Participante", "=", true]).toArray();

        vClientesSelecionadoCarregamento = "";

        clientesParticipantes.forEach(function (clienteParticipante) {
            vClientesSelecionadoCarregamento += "|" + clienteParticipante.Cd_CPF_CNPJ + "|";

            oGridRetencaoImpostoCliente.selectRows({ Cd_Imposto: clienteParticipante.Cd_Imposto, Cd_Municipio: clienteParticipante.Cd_Municipio, Cd_CPF_CNPJ: clienteParticipante.Cd_CPF_CNPJ }, true);
        });
    }
};

function proximoMunicipio() {
    const filterExpr = oGridRetencaoImpostoMunicipio.getCombinedFilter(true);
    const dataSource = oGridRetencaoImpostoMunicipio.getDataSource();
    const loadOptions = dataSource.loadOptions();

    dataSource
        .store()
        .load({ filter: filterExpr, sort: loadOptions.sort, group: loadOptions.group })
        .then((result) => {
            var b = result;
            if (loadOptions.group != null) {
                function retornaLista(a) {
                    var lista = [];
                    for (i of a) {
                        i.items.forEach(b => {
                            lista.push(b);
                        })
                    }
                    return lista;
                }
                for (let index = 0; index < loadOptions.group.length; index++) {
                    b = retornaLista(b);
                }
                result = b;
            }

            oLkpMunicipio.option("dataSource", dsMunicipio);

            if (vCodMunicipio == null) {
                oLkpMunicipio.option('value', result[0].Cd_Municipio)
            } else {
                var vRegistroLocalizado = false;

                for (i in result) {
                    if (result[i].Cd_Municipio === vCodMunicipio) {
                        var atual = result[parseInt(i) + 1];

                        vRegistroLocalizado = true;

                        if (atual == undefined) {
                            oLkpMunicipio.option('value', result[0].Cd_Municipio)
                        } else {
                            oLkpMunicipio.option('value', atual.Cd_Municipio)
                        }
                        break;
                    }
                }

                if (vRegistroLocalizado == false) {
                    oLkpMunicipio.option('value', result[0].Cd_Municipio)
                }
            }
        })
};

function municipioAnterior() {
    const filterExpr = oGridRetencaoImpostoMunicipio.getCombinedFilter(true);
    const dataSource = oGridRetencaoImpostoMunicipio.getDataSource();
    const loadOptions = dataSource.loadOptions();

    dataSource
        .store()
        .load({ filter: filterExpr, sort: loadOptions.sort, group: loadOptions.group })
        .then((result) => {
            var b = result;
            if (loadOptions.group != null) {
                function retornaLista(a) {
                    var lista = [];
                    for (i of a) {
                        i.items.forEach(b => {
                            lista.push(b);
                        })
                    }
                    return lista;
                }
                for (let index = 0; index < loadOptions.group.length; index++) {
                    b = retornaLista(b);
                }
                result = b;
            }

            oLkpMunicipio.option("dataSource", dsMunicipio);

            if (vCodMunicipio == null) {
                oLkpMunicipio.option('value', result[parseInt(result.length) - 1].Cd_Municipio)
            } else {
                var vRegistroLocalizado = false;

                for (i in result) {
                    if (result[i].Cd_Municipio === vCodMunicipio) {
                        var atual = result[parseInt(i) - 1];

                        vRegistroLocalizado = true;

                        if (atual == undefined) {
                            oLkpMunicipio.option('value', result[parseInt(result.length) - 1].Cd_Municipio)
                        } else {
                            oLkpMunicipio.option('value', atual.Cd_Municipio)
                        }
                        break;
                    }
                }

                if (vRegistroLocalizado == false) {
                    oLkpMunicipio.option('value', result[parseInt(result.length) - 1].Cd_Municipio)
                }
            }
        })
};

function limpaCampos() {
    oGridRetencaoImpostoMunicipio.option("dataSource", null);

    limpaCamposMunicipio(true);
};

function limpaCamposMunicipio(pLimpaMunicipioSelecionado) {
    if (pLimpaMunicipioSelecionado == true) {
        oLkpMunicipio.option("dataSource", dsMunicipio);
        oLkpMunicipio.option("value", null);
    }

    exibirEsconderPaineis("cardClientesParticipantes", "none");
    exibirEsconderPaineis("cardObservacoesClientes", "none");

    oNbxPcAliquota.option("value", null);
    oTxtTextoLegal.option("value", null);

    oChkFrete.option("value", false);
    oChkSeguro.option("value", false);
    oChkOutrasDespesas.option("value", false);
    oChkICMSST.option("value", false);
    oChkFCPST.option("value", false);
    oChkIPI.option("value", false);

    oGridRetencaoImpostoCliente.option("dataSource", null);
    oGridRetencaoImpostoCliente.refresh();

    vOperacao = null;
};
