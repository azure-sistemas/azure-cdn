var oLoadPanel = null;

//CADASTRO BANCO
var oGridBancos = null;
var oLblNomeBancoTituloCadBanco = null;
var oImgBancoCadBanco = null;
var oTxtCdBanco = null;
var oTxtCdBancoDigito = null;
var oTxtDsBanco = null;
var oLkpStatusBanco = null;

//CADASTRO AGÊNCIA
var oGridAgencias = null;
var oLblNomeBancoTituloCadAgencia = null;
var oLblNomeAgenciaTituloCadAgencia = null;
var oImgBancoCadAgencia = null;
var oLkpBancos = null;
var oTxtCdAgencia = null;
var oTxtCdAgenciaDigito = null;
var oTxtDsAgencia = null;
var oTxtDsContatoAgencia = null;
var oNbxCdDDDAgencia = null;
var oTxtDsTelefoneAgencia = null;
var oLkpStatusAgencia = null;

//CADASTRO CONTA CORRENTE
var oGridContasCorrentes = null;
var oLkpAgenciasBancarias = null;
var oTxtCdContaCorrente = null;
var oTxtCdContaCorrenteDigito = null;
var oTxtDsContaCorrente = null;
var oLkpStatusContaCorrente = null;
var oTagFiliaisConta = null;

//CADASTRO CONTA CORRENTE - DADOS CNAB COBRANÇA
var oChkInformadoNumeroInicialArquivoRemessa = null;
var oNbxNrUltimoArquivoRemessaOutroSistema = null;
var oTxtNrConvenioCobranca = null;
var oTxtNrCendente = null;
var oTxtNrCendenteDigito = null;
var oNbxNrCarteira = null;
var oTxtNrCarteiraVariacao = null;
var oTxtNrModalidae = null;
var oTxtEspecieBoleto = null;
var oTxtEspecieCNAB = null;
var oTxtCdComposicaoNossoNumero = null;
var oTxtCdPostoCooperativaCredito = null;
var oChkPermiteAlterarDadosReimpressaoBoleto = null;

//CADASTRO CONTA CORRENTE - DADOS CNAB PAGAMENTO
var oTxtNrConvenioPagamento = null;

//CADASTRO CONTA CORRENTE - DADOS INTEGRAÇÃO API PIX
var oLkpFormaPagamentoPix = null;
var oTxtDsBeneficiarioPix = null;
var oTxtDsEmailBeneficiarioPix = null;
var oTxtCdCPFCNPJBeneficiarioPix = null;
var oTxtCdCEPBeneficiarioPix = null;
var oLkpMunicipioBeneficiarioPix = null;
var oTxtCdChavePIX = null;
var oTxtCdChaveAcessoPix = null;
var oTxtCdSenhaPix = null;
var oTxtCdIdentificadorAcessoAPIPix = null;
var oTxtCdVersaoWebServicePix = null;
var oTxtCdLoginIntegracaoPix = null;
var oTxtCdSenhaIntegracaoPix = null;

//CADASTRO CONTA CORRENTE - DADOS INTRUÇÃO BOLETO
var oGridInstrucoesBoleto = null;
var dsInstrucoesBoleto = [];
var dsMensagemPadrao = null;

//VARIÁVEIS E OBJETOS DE USO GERAL
var vProcedimento = "";
var vContaEdicao = null;
var vFiliaisSelecionadas = null;
var vNrSequenciaInstrucao = null;
var vNomeAgenciaTitulo = "";
var vNomeContaTitulo = "";
var dsStatus = [
    { CD_STATUS: 'A', DS_STATUS: "Ativo" },
    { CD_STATUS: 'I', DS_STATUS: "Inativo" },
];

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

    (async () => {
        oLoadPanel.show();

        await inicializaModulo();

        formatButtons();

        //***********************************
        //* CADASTRO DE BANCOS - INICIO
        //***********************************

        oGridBancos = $("#gridBancos").dxDataGrid({
            dataSource: [],
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            showColumnLines: false,
            rowAlternationEnabled: false,
            wordWrapEnabled: true,
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            sorting: {
                mode: "multiple",
            },
            allowColumnResizing: true,
            columnsAutoWidth: true,
            cellHintEnabled: true,
            allowColumnReordering: true,
            groupPanel: {
                visible: true,
                emptyPanelText: "Agrupar",
            },
            paging: {
                pageSize: 50,
            },
            pager: {
                visible: true,
                allowedPageSizes: [10, 20, 50],
                showPageSizeSelector: false,
                showNavigationButtons: true
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet("Bancos");

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Bancos.xlsx");
                    });
                });
                e.cancel = true;
            },
            filterRow: {
                visible: true,
                applyFilter: "auto",
            },
            headerFilter: {
                visible: true,
                allowSearch: true
            },
            filterPanel: {
                visible: true,
            },
            columnChooser: {
                enabled: true,
                allowSearch: true,
                width: 300,
                height: 500,
            },
            keyExpr: "CD_BANCO",
            columns: [
                {
                    dataField: "DS_BANCO_LOGO",
                    caption: null,
                    width: 60,
                    allowFiltering: false,
                    allowSorting: false,
                    alignment: "center",
                    cssClass: "column-data-grid",
                    cellTemplate: function (e, x) {
                        e.append(`<figure class="mb-0">
                                    <img src="${x.data.DS_BANCO_LOGO}?${new Date()}" style="width: 40px; height: 40px;" class="rounded-circle">
                                  </figure>`);
                    },
                },
                {
                    dataField: "DS_PESQUISA",
                    caption: "Banco",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    allowFiltering: true,
                    alignment: "left",
                    cssClass: "column-data-grid",
                    visible: true,
                },
                {
                    dataField: "CD_BANCO",
                    caption: "Código Banco",
                    width: 80,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    allowFiltering: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                    visible: false,
                },
                {
                    dataField: "DS_BANCO",
                    caption: "Nome do Banco",
                    width: 90,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "left",
                    allowHeaderFiltering: true,
                    allowHiding: false,
                    cssClass: "column-data-grid",
                    visible: false,
                },
                {
                    dataField: "DS_IMAGEM_EDITAR_BANCO",
                    caption: "Editar",
                    width: 60,
                    allowEditing: false,
                    allowSorting: false,
                    allowHeaderFiltering: false,
                    allowFiltering: false,
                    alignment: "center",
                    cssClass: "column-data-grid",
                    cellTemplate: $("#imgGridEditarBanco"),
                },
            ],
            onCellClick: function (e) {
                if (e.rowType === "data") {
                    if (e.column.caption == "Editar") {
                        editarBanco(e.data.CD_BANCO, e.data.DS_BANCO_LOGO);
                    }
                }
            },
            onCellPrepared: function (e) {
                if (e.rowType === "data") {
                    if (e.column.dataField === "DS_STATUS_BANCO") {
                        if (e.value === "Inativo") {
                            e.cellElement.css("color", "#d00000");
                            e.cellElement.css("font-weight", "bold");
                        };
                    }
                };
                if (e.rowType === "group") {
                    e.cellElement.css("color", "#f05b41");
                    e.cellElement.css("background-color", "white");
                };
            },
            toolbar: {
                items: [
                    {
                        location: "after",
                        widget: "dxButton",
                        locateInMenu: "auto",
                        options: {
                            icon: "plus",
                            text: "Novo Banco",
                            hint: "Cadastrar uma nova instituição bancária",
                            type: "success",
                            onClick() {
                                novoBanco();
                            },
                        },
                    },
                    {
                        name: "groupPanel",
                        locateInMenu: "auto",
                    },
                    "exportButton",
                    "columnChooserButton",
                    "searchPanel",
                ],
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

        oLblNomeBancoTituloCadBanco = document.getElementById("lblNomeBancoTituloCadBanco");

        oImgBancoCadBanco = document.getElementById("imgBancoCadBanco");

        oTxtCdBanco = $("#txt_Cd_Banco").dxTextBox({
            labelMode: "floating",
            label: "Banco *",
            maxLength: 5,
        }).dxValidator({ validationRules: [{ type: "required", message: "Código do Banco Obrigatório", }], validationGroup: "Banco" }).dxTextBox("instance");

        oTxtCdBancoDigito = $("#txt_Cd_Banco_Digito").dxTextBox({
            labelMode: "floating",
            label: "Dígito *",
            maxLength: 3,
        }).dxValidator({ validationRules: [{ type: "required", message: "Dígito do Banco Obrigatório", }], validationGroup: "Banco" }).dxTextBox("instance");

        oTxtDsBanco = $("#txt_Ds_Banco").dxTextBox({
            labelMode: "floating",
            label: "Nome do Banco *",
            maxLength: 30,
            valueChangeEvent: "keyup",
            onKeyUp: function (e) {
                oLblNomeBancoTituloCadBanco.innerText = oTxtDsBanco.option("value").toString().toUpperCase();
            },
        }).dxValidator({ validationRules: [{ type: "required", message: "Nome do Banco Obrigatório", }], validationGroup: "Banco" }).dxTextBox("instance");

        oLkpStatusBanco = $("#lkp_Status_Banco").dxLookup({
            dataSource: dsStatus,
            elementAttr: {
                class: "status_ativo",
            },
            searchExpr: ["DS_STATUS"],
            displayExpr: "DS_STATUS",
            valueExpr: "CD_STATUS",
            value: "A",
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: "Status",
            },
            labelMode: "floating",
            label: "Status",
            placeholder: "",
            showClearButton: false,
            onValueChanged(e) {
                if (e.value == "I") {
                    e.component.option("elementAttr", { class: "status_inativo" });
                } else {
                    e.component.option("elementAttr", { class: "status_ativo" });
                };
            },
        }).dxLookup("instance");

        //***********************************
        //* CADASTRO DE BANCOS - FIM
        //***********************************

        //***********************************
        //* CADASTRO DE AGENCIAS - INICIO
        //***********************************

        oGridAgencias = $("#gridAgencias").dxDataGrid({
            dataSource: [],
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            showColumnLines: false,
            rowAlternationEnabled: false,
            wordWrapEnabled: true,
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            sorting: {
                mode: "multiple",
            },
            allowColumnResizing: true,
            columnsAutoWidth: true,
            cellHintEnabled: true,
            allowColumnReordering: true,
            groupPanel: {
                visible: true,
                emptyPanelText: "Agrupar",
            },
            paging: {
                pageSize: 50,
            },
            pager: {
                visible: true,
                allowedPageSizes: [10, 20, 50],
                showPageSizeSelector: false,
                showNavigationButtons: true
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet("Agencias");

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "AgênciasBancárias.xlsx");
                    });
                });
                e.cancel = true;
            },
            filterRow: {
                visible: true,
                applyFilter: "auto",
            },
            headerFilter: {
                visible: true,
                allowSearch: true
            },
            filterPanel: {
                visible: true,
            },
            columnChooser: {
                enabled: true,
                allowSearch: true,
                width: 300,
                height: 500,
            },
            keyExpr: "CD_CHAVE",
            columns: [
                {
                    dataField: "DS_BANCO_LOGO",
                    caption: null,
                    width: 60,
                    allowFiltering: false,
                    allowSorting: false,
                    alignment: "center",
                    cssClass: "column-data-grid",
                    cellTemplate: function (e, x) {
                        e.append(`<figure class="mb-0">
                                      <img src="${x.data.DS_BANCO_LOGO}?${new Date()}" style="width: 40px; height: 40px;" class="rounded-circle">
                                  </figure>`);

                    },
                },
                {
                    dataField: "DS_BANCO_CODIGO_NOME",
                    caption: "Banco",
                    width: 200,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    allowFiltering: true,
                    alignment: "left",
                    cssClass: "column-data-grid",
                    visible: true,
                },
                {
                    dataField: "CD_BANCO",
                    caption: "Código Banco",
                    width: 80,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    allowFiltering: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                    visible: false,
                },
                {
                    dataField: "CD_AGENCIA",
                    caption: "Agência",
                    width: 90,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    allowHeaderFiltering: true,
                    allowHiding: false,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "DS_AGENCIA",
                    caption: "Nome da Agência",
                    //width: 80,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    alignment: "left",
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "DS_STATUS_AGENCIA",
                    caption: "Status",
                    width: 75,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                    visible: true,
                },
                {
                    dataField: "DS_IMAGEM_EDITAR_AGENCIA",
                    caption: "Editar",
                    width: 60,
                    allowEditing: false,
                    allowSorting: false,
                    allowHeaderFiltering: false,
                    allowFiltering: false,
                    alignment: "center",
                    cssClass: "column-data-grid",
                    cellTemplate: $("#imgGridEditarAgencia"),
                },
            ],
            onCellClick: function (e) {
                if (e.rowType === "data") {
                    if (e.column.caption == "Editar") {
                        editarAgencia(e.data.CD_BANCO, e.data.CD_AGENCIA);
                    }
                }
            },
            onCellPrepared: function (e) {
                if (e.rowType === "data") {
                    if (e.column.dataField === "DS_STATUS_AGENCIA") {
                        if (e.value === "Inativo") {
                            e.cellElement.css("color", "#d00000");
                            e.cellElement.css("font-weight", "bold");
                        };
                    }
                };
                if (e.rowType === "group") {
                    e.cellElement.css("color", "#f05b41");
                    e.cellElement.css("background-color", "white");
                };
            },
            toolbar: {
                items: [
                    {
                        location: "after",
                        widget: "dxButton",
                        locateInMenu: "auto",
                        options: {
                            icon: "plus",
                            text: "Nova Agência",
                            hint: "Cadastrar uma nova agência bancária",
                            type: "success",
                            onClick() {
                                novaAgencia();
                            },
                        },
                    },
                    {
                        name: "groupPanel",
                        locateInMenu: "auto",
                    },
                    "exportButton",
                    "columnChooserButton",
                    "searchPanel",
                ],
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

        oLblNomeBancoTituloCadAgencia = document.getElementById("lblNomeBancoTituloCadAgencia");

        oLblNomeAgenciaTituloCadAgencia = document.getElementById("lblNomeAgenciaTituloCadAgencia"); 

        oImgBancoCadAgencia = document.getElementById("imgBancoCadAgencia");

        oLkpBancos = $("#lkp_Bancos").dxLookup({
            dataSource: [],
            searchExpr: ["DS_PESQUISA"],
            displayExpr: "DS_PESQUISA",
            valueExpr: "CD_BANCO",
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: "Bancos",
            },
            labelMode: "floating",
            label: "Banco *",
            placeholder: "Clique para selecionar um banco",
            showClearButton: true,
            itemTemplate(data) {
                return getTemplateFoto(data, "custom-item");

            },
            onSelectionChanged: function (e) {
                if (e.selectedItem == undefined) {
                    oLblNomeBancoTituloCadAgencia.innerText = "";

                    oImgBancoCadAgencia.src = "/img/bancos/banco-sem-foto.png";
                }
                else {
                    oLblNomeBancoTituloCadAgencia.innerText = e.selectedItem.DS_BANCO.toString().toUpperCase();

                    oImgBancoCadAgencia.src = e.selectedItem.DS_BANCO_LOGO.toString();
                }
            },
        }).dxValidator({ validationRules: [{ type: "required", message: "Banco Obrigatório", }], validationGroup: "Agencia" }).dxLookup("instance");

        oTxtCdAgencia = $("#txt_Cd_Agencia").dxTextBox({
            labelMode: "floating",
            label: "Agência *",
            maxLength: 7,
            valueChangeEvent: "keyup",
            onKeyUp: function (e) {
                preencheNomeAgenciaTitulo();
            },
        }).dxValidator({ validationRules: [{ type: "required", message: "Código da Agência Obrigatório", }], validationGroup: "Agencia" }).dxTextBox("instance");

        oTxtCdAgenciaDigito = $("#txt_Cd_Agencia_Digito").dxTextBox({
            labelMode: "floating",
            label: "Dígito *",
            maxLength: 3,
        }).dxValidator({ validationRules: [{ type: "required", message: "Dígito da Agência Obrigatório", }], validationGroup: "Agencia" }).dxTextBox("instance");

        oTxtDsAgencia = $("#txt_Ds_Agencia").dxTextBox({
            labelMode: "floating",
            label: "Nome da Agência *",
            maxLength: 50,
            valueChangeEvent: "keyup",
            onKeyUp: function (e) {
                preencheNomeAgenciaTitulo();
            },
        }).dxValidator({ validationRules: [{ type: "required", message: "Nome da Agência Obrigatório", }], validationGroup: "Agencia" }).dxTextBox("instance");

        oTxtDsContatoAgencia = $("#txt_Ds_Agencia_Contato").dxTextBox({
            labelMode: "floating",
            label: "Contato",
            maxLength: 60,
        }).dxTextBox("instance");

        oNbxCdDDDAgencia = $("#nbx_Cd_DDD_Telefone_Agencia").dxNumberBox({
            value: "",
            format: "000",
            writeStylingMode: "filled",
            min: 0,
            max: 999,
            showClearButton: true,
            showSpinButtons: false,
            step: 0,
            labelMode: "floating",
            label: "DDD",
        }).dxNumberBox("instance");

        oTxtDsTelefoneAgencia = $("#txt_Ds_Telefone_Agencia").dxTextBox({
            labelMode: "floating",
            label: "Telefone Agência",
            maxLength: 30,
            showClearButton: true,
        }).dxTextBox("instance");

        oLkpStatusAgencia = $("#lkp_Status_Agencia").dxLookup({
            dataSource: dsStatus,
            elementAttr: {
                class: "status_ativo",
            },
            searchExpr: ["DS_STATUS"],
            displayExpr: "DS_STATUS",
            valueExpr: "CD_STATUS",
            value: "A",
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: "Status",
            },
            labelMode: "floating",
            label: "Status",
            placeholder: "",
            showClearButton: false,
            onValueChanged(e) {
                if (e.value == "I") {
                    e.component.option("elementAttr", { class: "status_inativo" });
                } else {
                    e.component.option("elementAttr", { class: "status_ativo" });
                };
            },
        }).dxLookup("instance");

        //***********************************
        //* CADASTRO DE AGENCIAS - FIM
        //***********************************

        //***********************************
        //* CADASTRO DE CONTAS - INICIO
        //***********************************

        oGridContasCorrentes = $("#gridContasCorrentes").dxDataGrid({
            dataSource: [],
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            showColumnLines: false,
            rowAlternationEnabled: false,
            wordWrapEnabled: true,
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            sorting: {
                mode: "multiple",
            },
            allowColumnResizing: true,
            columnsAutoWidth: true,
            cellHintEnabled: true,
            allowColumnReordering: true,
            groupPanel: {
                visible: true,
                emptyPanelText: "Agrupar",
            },
            paging: {
                pageSize: 50,
            },
            pager: {
                visible: true,
                allowedPageSizes: [10, 20, 50],
                showPageSizeSelector: false,
                showNavigationButtons: true
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet("Contas");

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ContasBancárias.xlsx");
                    });
                });
                e.cancel = true;
            },
            filterRow: {
                visible: true,
                applyFilter: "auto",
            },
            headerFilter: {
                visible: true,
                allowSearch: true
            },
            filterPanel: {
                visible: true,
            },
            columnChooser: {
                enabled: true,
                allowSearch: true,
                width: 300,
                height: 500,
            },
            keyExpr: "CD_CHAVE",
            columns: [
                {
                    dataField: "DS_BANCO_LOGO",
                    caption: null,
                    width: 60,
                    allowFiltering: false,
                    allowSorting: false,
                    alignment: "center",
                    cssClass: "column-data-grid",
                    cellTemplate: function (e, x) {

                        e.append(`<figure class="mb-0">
                                      <img src="${x.data.DS_BANCO_LOGO}?${new Date()}" style="width: 40px; height: 40px;" class="rounded-circle">
                                  </figure>`);

                    },
                },
                {
                    dataField: "DS_BANCO_CODIGO_NOME",
                    caption: "Banco",
                    width: 200,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    allowFiltering: true,
                    alignment: "left",
                    cssClass: "column-data-grid",
                    visible: true,
                },
                {
                    dataField: "CD_BANCO",
                    caption: "Código Banco",
                    width: 80,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    allowFiltering: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                    visible: false,
                },
                {
                    dataField: "CD_AGENCIA",
                    caption: "Agência",
                    width: 90,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    allowHeaderFiltering: true,
                    allowHiding: false,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "CD_CONTA_COM_DIGITO",
                    caption: "Conta",
                    width: 90,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "CD_CONTA_CORRENTE",
                    caption: "Conta",
                    width: 80,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: false,
                    alignment: "center",
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "DS_CONTA_CORRENTE",
                    caption: "Nome da Conta",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    alignment: "left",
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "DS_STATUS",
                    caption: "Status",
                    width: 75,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                    visible: true,
                },
                {
                    dataField: "NR_CARTEIRA",
                    caption: "Carteira",
                    width: 90,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                    visible: false,
                },
                {
                    dataField: "DS_IMAGEM_EDITAR_CONTA",
                    caption: "Editar",
                    width: 60,
                    allowEditing: false,
                    allowSorting: false,
                    allowHeaderFiltering: false,
                    allowFiltering: false,
                    alignment: "center",
                    cssClass: "column-data-grid",
                    cellTemplate: $("#imgGridEditarConta"),
                },
            ],
            onCellClick: function (e) {
                if (e.rowType === "data") {
                    if (e.column.caption == "Editar") {
                        editarContaCorrente(e.data.CD_BANCO, e.data.CD_AGENCIA, e.data.CD_CONTA_CORRENTE);
                    }
                }
            },
            onCellPrepared: function (e) {
                if (e.rowType === "data") {
                    if (e.column.dataField === "DS_STATUS") {
                        if (e.value === "Inativo") {
                            e.cellElement.css("color", "#d00000");
                            e.cellElement.css("font-weight", "bold");
                        };
                    }
                };
                if (e.rowType === "group") {
                    e.cellElement.css("color", "#f05b41");
                    e.cellElement.css("background-color", "white");
                };
            },
            toolbar: {
                items: [
                    {
                        location: "after",
                        widget: "dxButton",
                        locateInMenu: "auto",
                        options: {
                            icon: "plus",
                            text: "Nova Conta",
                            hint: "Cadastrar uma nova conta bancária",
                            type: "success",
                            onClick() {
                                novaContaCorrente();
                            },
                        },
                    },
                    {
                        name: "groupPanel",
                        locateInMenu: "auto",
                    },
                    "exportButton",
                    "columnChooserButton",
                    "searchPanel",
                ],
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

        oLblNomeBancoTituloCadConta = document.getElementById("lblNomeBancoTituloCadConta");

        oLblNomeContaTituloCadConta = document.getElementById("lblNomeContaTituloCadConta");

        oImgBancoCadConta = document.getElementById("imgBancoCadConta");

        oLkpAgenciasBancarias = $("#lkp_Agencias_Bancarias").dxLookup({
            dataSource: [],
            searchExpr: ["DS_PESQUISA"],
            displayExpr: "DS_PESQUISA",
            valueExpr: "CD_CHAVE",
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: "Agências",
            },
            labelMode: "floating",
            label: "Banco/Agência *",
            placeholder: "Clique para selecionar uma agência",
            showClearButton: true,
            itemTemplate(data) {
                return getTemplateFoto(data, "custom-item");

            },
            onSelectionChanged: function (e) {
                if (e.selectedItem == undefined) {
                    oLblNomeBancoTituloCadConta.innerText = "";

                    oImgBancoCadConta.src = "/img/bancos/banco-sem-foto.png";
                }
                else {
                    oLblNomeBancoTituloCadConta.innerText = e.selectedItem.DS_BANCO.toString().toUpperCase();

                    oImgBancoCadConta.src = e.selectedItem.DS_BANCO_LOGO.toString();
                }

                preencheNomeContaCorrenteTitulo();
            },
        }).dxValidator({ validationRules: [{ type: "required", message: "Banco/Agência Obrigatórios", }], validationGroup: "Conta" }).dxLookup("instance");

        oTxtCdContaCorrente = $("#txt_Conta_Corrente").dxTextBox({
            labelMode: "floating",
            label: "Número da Conta Corrente *",
            maxLength: 15,
            valueChangeEvent: "keyup",
            onKeyUp: function (e) {
                preencheNomeContaCorrenteTitulo();
            },
        }).dxValidator({ validationRules: [{ type: "required", message: "Número da Conta Obrigatório", }], validationGroup: "Conta" }).dxTextBox("instance");

        oTxtCdContaCorrenteDigito = $("#txt_Conta_Corrente_Digito").dxTextBox({
            labelMode: "floating",
            label: "Digito *",
            maxLength: 3,
            valueChangeEvent: "keyup",
            onKeyUp: function (e) {
                preencheNomeContaCorrenteTitulo();
            },
        }).dxValidator({ validationRules: [{ type: "required", message: "Dígito da Conta Obrigatório", }], validationGroup: "Conta" }).dxTextBox("instance");

        oTxtDsContaCorrente = $("#txt_Conta_Descricao").dxTextBox({
            labelMode: "floating",
            label: "Descrição da Conta Corrente *",
            maxLength: 40,
            valueChangeEvent: "keyup",
            onKeyUp: function (e) {
                preencheNomeContaCorrenteTitulo();
            },
        }).dxValidator({ validationRules: [{ type: "required", message: "Descrição da Conta Obrigatório", }], validationGroup: "Conta" }).dxTextBox("instance");

        oLkpStatusContaCorrente = $("#lkp_Status_Conta").dxLookup({
            dataSource: dsStatus,
            elementAttr: {
                class: "status_ativo",
            },
            searchExpr: ["DS_STATUS"],
            displayExpr: "DS_STATUS",
            valueExpr: "CD_STATUS",
            value: "A",
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: "Status",
            },
            labelMode: "floating",
            label: "Status",
            placeholder: "",
            showClearButton: false,
            onValueChanged(e) {
                if (e.value == "I") {
                    e.component.option("elementAttr", { class: "status_inativo" });
                } else {
                    e.component.option("elementAttr", { class: "status_ativo" });
                };
            },
        }).dxLookup("instance");

        oTagFiliaisConta = $("#tag_Filiais_Conta").dxTagBox({
            dataSource: [],
            searchEnabled: true,
            searchExpr: ["DS_PESQUISA"],
            cleanSearchOnOpening: true,
            displayExpr: "DS_PESQUISA",
            valueExpr: "CD_FILIAL",
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: "Filiais que vão utilizar esta conta",
            },
            labelMode: "floating",
            label: "Filiais que vão utilizar esta conta",
            placeholder: "",
            showClearButton: false,
            applyValueMode: "instantly",
            showSelectionControls: true,
            tagTemplate(data) {
                const isDisabled = data.disabled;

                const tag = $('<div>')
                    .attr('aria-disabled', isDisabled)
                    .addClass(`dx-tag-content ${isDisabled && 'disabled-tag'}`)
                    .append($('<span>').text(data.DS_PESQUISA), !isDisabled && $('<div>').addClass('dx-tag-remove-button'),
                    );
                return tag;
            },
        }).dxTagBox("instance");

        //DADOS CNAB COBRANÇA
        oChkInformadoNumeroInicialArquivoRemessa = $("#chk_Informado_Numero_Inicial_Arquivo_Remessa").dxCheckBox({
            text: "Ative este parâmetro se você já gerou boletos para esta conta em outro sistema e informe abaixo o número do último arquivo remessa gerado",
            value: false,
            onValueChanged: function (e) {
                if ((e.value != undefined) && (e.value != null)) {
                    oNbxNrUltimoArquivoRemessaOutroSistema.option("disabled", !e.value)
                }
            },
        }).dxCheckBox("instance");

        oNbxNrUltimoArquivoRemessaOutroSistema = $("#nbx_Nr_Ultimo_Arquivo_Remessa_Outro_Sistema").dxNumberBox({
            value: "",
            //format: "00000000",
            min: 0,
            max: 9999999999,
            showClearButton: true,
            showSpinButtons: false,
            step: 0,
            labelMode: "floating",
            label: "Último arquivo remessa",
        }).dxNumberBox("instance");

        oTxtNrConvenioCobranca = $("#txt_Nr_Convenio_Cobranca").dxTextBox({
            labelMode: "floating",
            label: "Convênio",
            maxLength: 20,
        }).dxTextBox("instance");

        oTxtNrCendente = $("#txt_Nr_Cendente").dxTextBox({
            labelMode: "floating",
            label: "Cedente/Remessa",
            maxLength: 15,
        }).dxTextBox("instance");

        oTxtNrCendenteDigito = $("#txt_Nr_Cendente_Digito").dxTextBox({
            labelMode: "floating",
            label: "Dig",
            maxLength: 3,
        }).dxTextBox("instance");

        oNbxNrCarteira = $("#nbx_Nr_Carteira").dxNumberBox({
            value: "",
            //format: "00000000",
            min: 0,
            max: 999,
            showClearButton: true,
            showSpinButtons: false,
            step: 0,
            labelMode: "floating",
            label: "Carteira",
        }).dxNumberBox("instance");

        oTxtNrCarteiraVariacao = $("#txt_Nr_Carteira_Variacao").dxTextBox({
            labelMode: "floating",
            label: "Variação Carteira",
            maxLength: 20,
        }).dxTextBox("instance");

        oTxtNrModalidae = $("#txt_Nr_Modalidae").dxTextBox({
            labelMode: "floating",
            label: "Modalidade",
            maxLength: 10,
        }).dxTextBox("instance");

        oTxtEspecieBoleto = $("#txt_Especie_Boleto").dxTextBox({
            labelMode: "floating",
            label: "Espécie Documento - Boleto",
            maxLength: 10,
        }).dxTextBox("instance");

        oTxtEspecieCNAB = $("#txt_Especie_CNAB").dxTextBox({
            labelMode: "floating",
            label: "Espécie Documento - CNAB",
            maxLength: 20,
        }).dxTextBox("instance");

        oTxtCdComposicaoNossoNumero = $("#txt_Cd_Composicao_Nosso_Numero").dxTextBox({
            labelMode: "floating",
            label: "Código Composição Nosso Número",
            maxLength: 10,
        }).dxTextBox("instance");

        oTxtCdPostoCooperativaCredito = $("#txt_Cd_Posto_Cooperativa_Credito").dxTextBox({
            labelMode: "floating",
            label: "Posto Cooperativa de Crédito",
            maxLength: 2,
        }).dxTextBox("instance");

        oChkPermiteAlterarDadosReimpressaoBoleto = $("#chk_Permite_Alterar_Dados_Reimpressao_Boleto").dxCheckBox({
            text: "Permite alterar valor e vencimento na reimpressão do boleto",
            value: false,
        }).dxCheckBox("instance");

        //DADOS CNAB PAGAMENTO
        oTxtNrConvenioPagamento = $("#txt_Nr_Convenio_Pagamento").dxTextBox({
            labelMode: "floating",
            label: "Número do Convênio",
            maxLength: 20,
        }).dxTextBox("instance");

        //DADOS INTEGRAÇÃO API PIX
        oLkpFormaPagamentoPix = $("#lkp_Forma_Pagamento_Pix").dxLookup({
            dataSource: [],
            searchExpr: ["DS_FORMA_PAGAMENTO"],
            displayExpr: "DS_FORMA_PAGAMENTO",
            valueExpr: "CD_FORMA_PAGAMENTO",
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: "Formas de Pagamento",
            },
            placeholder: "Forma de Pagamento PIX para esta conta",
            showClearButton: true,
            onSelectionChanged: function (e) {
                if (e.selectedItem == undefined) {
                    //DESABILITA OS CAMPOS DE DADOS INTEGRAÇÃO API PIX
                    oTxtDsBeneficiarioPix.option("disabled", true);
                    oTxtDsEmailBeneficiarioPix.option("disabled", true);
                    oTxtCdCPFCNPJBeneficiarioPix.option("disabled", true);
                    oTxtCdCEPBeneficiarioPix.option("disabled", true);
                    oLkpMunicipioBeneficiarioPix.option("disabled", true);
                    oTxtCdChavePIX.option("disabled", true);
                    oTxtCdChaveAcessoPix.option("disabled", true);
                    oTxtCdSenhaPix.option("disabled", true);
                    oTxtCdIdentificadorAcessoAPIPix.option("disabled", true);
                    oTxtCdVersaoWebServicePix.option("disabled", true);
                    oTxtCdLoginIntegracaoPix.option("disabled", true);
                    oTxtCdSenhaIntegracaoPix.option("disabled", true);
                }
                else {
                    //HABILITA OS CAMPOS DE DADOS INTEGRAÇÃO API PIX
                    oTxtDsBeneficiarioPix.option("disabled", false);
                    oTxtDsEmailBeneficiarioPix.option("disabled", false);
                    oTxtCdCPFCNPJBeneficiarioPix.option("disabled", false);
                    oTxtCdCEPBeneficiarioPix.option("disabled", false);
                    oLkpMunicipioBeneficiarioPix.option("disabled", false);
                    oTxtCdChavePIX.option("disabled", false);
                    oTxtCdChaveAcessoPix.option("disabled", false);
                    oTxtCdSenhaPix.option("disabled", false);
                    oTxtCdIdentificadorAcessoAPIPix.option("disabled", false);
                    oTxtCdVersaoWebServicePix.option("disabled", false);

                    //MARCA CAMPOS DE DADOS INTEGRAÇÃO API PIX COMO VÁLIDOS
                    oTxtDsBeneficiarioPix.option("isValid", true);
                    oTxtDsEmailBeneficiarioPix.option("isValid", true);
                    oTxtCdCPFCNPJBeneficiarioPix.option("isValid", true);
                    oTxtCdCEPBeneficiarioPix.option("isValid", true);
                    oLkpMunicipioBeneficiarioPix.option("isValid", true);
                    oTxtCdChavePIX.option("isValid", true);
                    oTxtCdChaveAcessoPix.option("isValid", true);
                    oTxtCdSenhaPix.option("isValid", true);
                    oTxtCdIdentificadorAcessoAPIPix.option("isValid", true);
                    oTxtCdVersaoWebServicePix.option("isValid", true);

                    if (vProcedimento == "A") {
                        if (vContaEdicao.CD_EMPRESA_INTEGRACAO_PIX != null) {
                            oTxtCdLoginIntegracaoPix.option("disabled", false);
                            oTxtCdSenhaIntegracaoPix.option("disabled", false);

                            oTxtCdLoginIntegracaoPix.option("isValid", true);
                            oTxtCdSenhaIntegracaoPix.option("isValid", true);
                        }
                        else {
                            oTxtCdLoginIntegracaoPix.option("disabled", true);
                            oTxtCdSenhaIntegracaoPix.option("disabled", true);
                        }
                    }
                    else {
                        oTxtCdLoginIntegracaoPix.option("disabled", true);
                        oTxtCdSenhaIntegracaoPix.option("disabled", true);
                    }
                }
            },
        }).dxLookup("instance");

        oTxtDsBeneficiarioPix = $("#txt_Ds_Beneficiario_Pix").dxTextBox({
            labelMode: "floating",
            label: "Nome ou Razão Social do Beneficiário *",
            maxLength: 500,
        }).dxValidator({ validationRules: [{ type: "required", message: "Nome do Beneficiário Obrigatório", }], validationGroup: "Pix" }).dxTextBox("instance");

        oTxtDsEmailBeneficiarioPix = $("#txt_Ds_Email_Beneficiario_Pix").dxTextBox({
            labelMode: "floating",
            label: "E-mail do Beneficiário *",
            maxLength: 200,
        }).dxValidator({ validationRules: [{ type: "required", message: "E-mail do Beneficiário Obrigatório", }], validationGroup: "Pix" }).dxTextBox("instance");

        oTxtCdCPFCNPJBeneficiarioPix = $("#txt_Cd_CPF_CNPJ_Beneficiario_Pix").dxTextBox({
            labelMode: "floating",
            label: "CPF/CNPJ do Beneficiário *",
            mask: "",
            maxLength: 14,
            showClearButton: true,
            onFocusIn(e) {
                if ((e.value != undefined) && e.value != null) {
                    if (e.value.length == 11) {
                        e.component.option("mask", "000.000.000-00");
                        e.component.option("label", "CPF do Beneficiário");
                    } else if (e.value.length == 14) {
                        e.component.option("mask", "00.000.000/0000-00");
                        e.component.option("label", "CNPJ do Beneficiário");
                    } else {
                        e.component.option("mask", "00000000000000");
                        e.component.option("label", "CPF/CNPJ do Beneficiário");
                    };
                }
            },
            onValueChanged(e) {
                if ((e.value != undefined) && e.value != null) {
                    if (e.value.length == 11) {
                        e.component.option("mask", "000.000.000-00");
                        e.component.option("label", "CPF do Beneficiário");
                    } else if (e.value.length == 14) {
                        e.component.option("mask", "00.000.000/0000-00");
                        e.component.option("label", "CNPJ do Beneficiário");
                    } else {
                        e.component.option("mask", "00000000000000");
                        e.component.option("label", "CPF/CNPJ do Beneficiário");
                    };
                }
            },
        }).dxValidator({ validationRules: [{ type: "required", message: "CPF/CNPJ do Beneficiário Obrigatório", }], validationGroup: "Pix" }).dxTextBox("instance");

        oTxtCdCEPBeneficiarioPix = $("#txt_Cd_CEP_Beneficiario_Pix").dxTextBox({
            labelMode: "floating",
            label: "CEP do Beneficiário *",
            maxLength: 8,
        }).dxValidator({ validationRules: [{ type: "required", message: "CEP do Beneficiário Obrigatório", }], validationGroup: "Pix" }).dxTextBox("instance");

        oLkpMunicipioBeneficiarioPix = $("#lkp_Ds_Municipio_Beneficiario_Pix").dxLookup({
            dataSource: [],
            searchExpr: ["DS_MUNICIPIO_UF"],
            displayExpr: "DS_MUNICIPIO_UF",
            valueExpr: "CD_MUNICIPIO",
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: "Município",
            },
            labelMode: "floating",
            label: "Município do Beneficiário *",
            placeholder: "",
            showClearButton: true,
        }).dxValidator({ validationRules: [{ type: "required", message: "Município do Beneficiário Obrigatório", }], validationGroup: "Pix" }).dxLookup("instance");

        oTxtCdChavePIX = $("#txt_Cd_Chave_PIX").dxTextBox({
            labelMode: "floating",
            label: "Chave PIX *",
            maxLength: 100,
        }).dxValidator({ validationRules: [{ type: "required", message: "Chave PIX Obrigatório", }], validationGroup: "Pix" }).dxTextBox("instance");

        oTxtCdChaveAcessoPix = $("#txt_Cd_Chave_Acesso_Pix").dxTextBox({
            labelMode: "floating",
            label: "Chave de Acesso",
            maxLength: 1000,
        }).dxTextBox("instance");

        oTxtCdSenhaPix = $("#txt_Cd_Senha_Pix").dxTextBox({
            labelMode: "floating",
            label: "Senha",
            maxLength: 1000,
            mode: "password",
            buttons: [{
                name: "password",
                location: "after",
                options: {
                    icon: "/img/visualizar-senha.png",
                    type: "default",
                    onClick() {
                        oTxtCdSenhaPix.option("mode", oTxtCdSenhaPix.option("mode") === "text" ? "password" : "text");
                    },
                },
            }],
        }).dxTextBox("instance");

        oTxtCdIdentificadorAcessoAPIPix = $("#txt_Cd_Identificador_Acesso_API_Pix").dxTextBox({
            labelMode: "floating",
            label: "Identificador de Acesso da API",
            maxLength: 1000,
        }).dxTextBox("instance");

        oTxtCdVersaoWebServicePix = $("#txt_Cd_Versao_Web_Service_Pix").dxTextBox({
            labelMode: "floating",
            label: "Versão Web Service",
            maxLength: 20,
        }).dxTextBox("instance");

        oTxtCdLoginIntegracaoPix = $("#txt_Cd_Login_Integracao_Pix").dxTextBox({
            labelMode: "floating",
            label: "Login de Integração PIX",
            maxLength: 1000,
        }).dxTextBox("instance");

        oTxtCdSenhaIntegracaoPix = $("#txt_Cd_Senha_Integracao_Pix").dxTextBox({
            labelMode: "floating",
            label: "Senha de Integração PIX",
            maxLength: 1000,
            mode: "password",
            buttons: [{
                name: "password",
                location: "after",
                options: {
                    icon: "/img/visualizar-senha.png",
                    type: "default",
                    onClick() {
                        oTxtCdSenhaIntegracaoPix.option("mode", oTxtCdSenhaIntegracaoPix.option("mode") === "text" ? "password" : "text");
                    },
                },
            }],
        }).dxTextBox("instance");

        //DADOS INSTRUÇÃO PROTESTO
        oGridInstrucoesBoleto = $("#grid_Instrucoes_Boleto").dxDataGrid({
            dataSource: [],
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            columnHidingEnabled: true,
            columnsAutoWidth: true,
            allowColumnResizing: true,
            allowColumnReordering: true,
            editing: {
                mode: "popup",
                allowUpdating: true,
                startEditAction: "dblClick",
                allowAdding: true,
                allowDeleting: true,
                useIcons: true,
                popup: {
                    //title: "Cadastro de Instruções para Boleto",
                    showTitle: true,
                    titleTemplate: function (element) {
                        const $title = $("<div class='mb-3 mt-3 ml-2' style='font-size: 18px'>").text("Cadastro de Instruções para Boleto");
                        element.append($title);
                    },
                    maxWidth: 900,
                    maxHeight: 650,
                    onShown: obj => {
                        //dá o foco na instância da coluna marcada nos itens
                        widgetInstancet.focus();
                    },
                },
                form: {
                    labelMode: "floating",
                    items: [
                        {
                            itemType: "group",
                            colCount: 8,
                            colSpan: 2,
                            items: [
                                {
                                    dataField: "NR_SEQUENCIA",
                                    editorOptions: {
                                        label: "Sequência",
                                    },
                                },
                            ],
                        },
                        {
                            itemType: "group",
                            colCount: 6,
                            colSpan: 2,
                            items: [
                                {
                                    dataField: "CD_INSTRUCAO_BANCO",
                                    colSpan: 1,
                                    editorOptions: {
                                        maxLength: 5,
                                    },
                                    validationRules: [
                                        {
                                            type: "required",
                                            message: "Campo obrigatório",
                                        },
                                    ],
                                },
                                {
                                    dataField: "DS_INSTRUCAO",
                                    colSpan: 5,
                                    editorOptions: {
                                        maxLength: 60,
                                    },
                                    validationRules: [
                                        {
                                            type: "required",
                                            message: "Campo obrigatório",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            itemType: "group",
                            colCount: 3,
                            colSpan: 2,
                            caption: "Juros e multa imediatas após o vencimento",
                            items: [
                                {
                                    dataField: "PC_JUROS_DIA",
                                    editorType: "dxNumberBox",
                                    //validationRules: [
                                    //    {
                                    //        type: "numeric",
                                    //        message: "Este campo aceita apenas números",
                                    //    },
                                    //],
                                    editorOptions: {
                                        label: "% Juros Diário após vencimento",
                                        maxLength: 7,
                                        format: "###,###,###,###,##0.00",
                                        min: 0,
                                    },
                                },
                                {
                                    dataField: "PC_JUROS_MES",
                                    editorType: "dxNumberBox",
                                    //validationRules: [
                                    //    {
                                    //        type: "numeric",
                                    //        message: "Este campo aceita apenas números",
                                    //    },
                                    //],
                                    editorOptions: {
                                        label: "% Juros Mensal após vencimento",
                                        maxLength: 7,
                                        format: "###,###,###,###,##0.00",
                                        min: 0,
                                    },
                                },
                                {
                                    dataField: "PC_MULTA_FIXA",
                                    editorType: "dxNumberBox",
                                    //validationRules: [
                                    //    {
                                    //        type: "numeric",
                                    //        message: "Este campo aceita apenas números",
                                    //    },
                                    //],
                                    editorOptions: {
                                        label: "% Multa Fixa após vencimento",
                                        maxLength: 7,
                                        format: "###,###,###,###,##0.00",
                                        min: 0,
                                    },
                                },
                            ],
                        },

                        {
                            itemType: "group",
                            colCount: 3,
                            colSpan: 2,
                            caption: "Multa condicionada a dias de vencimento",
                            items: [
                                {
                                    dataField: "QT_DIAS_APOS_VENCIMENTO",
                                    editorType: "dxNumberBox",
                                    //validationRules: [
                                    //    {
                                    //        type: "numeric",
                                    //        message: "Este campo aceita apenas números",
                                    //    },
                                    //],
                                    editorOptions: {
                                        label: "Dias de vencto. para aplicação da multa",
                                        maxLength: 7,
                                        format: "###,###,###,###,###",
                                        min: 0,
                                    },
                                },
                                {
                                    dataField: "PC_MULTA_APOS_VENCIMENTO",
                                    editorType: "dxNumberBox",
                                    //validationRules: [
                                    //    {
                                    //        type: "numeric",
                                    //        message: "Este campo aceita apenas números",
                                    //    },
                                    //],
                                    editorOptions: {
                                        label: "% Multa após quantidade de dias vencido",
                                        maxLength: 7,
                                        format: "###,###,###,###,##0.00",
                                        min: 0,
                                    },
                                },
                            ],
                        },

                        {
                            itemType: "group",
                            colCount: 3,
                            colSpan: 2,
                            caption: "Aplicação de Descontos",
                            items: [
                                {
                                    dataField: "QT_DIAS_DESCONTO_ANTECIPADO",
                                    editorType: "dxNumberBox",
                                    //validationRules: [
                                    //    {
                                    //        type: "numeric",
                                    //        message: "Este campo aceita apenas números",
                                    //    },
                                    //],
                                    editorOptions: {
                                        label: "Dias de pagto. antecipado para Desconto",
                                        maxLength: 7,
                                        format: "###,###,###,###,###",
                                        min: 0,
                                    },
                                },
                                {
                                    dataField: "PC_DESCONTO_DIA",
                                    editorType: "dxNumberBox",
                                    //validationRules: [
                                    //    {
                                    //        type: "numeric",
                                    //        message: "Este campo aceita apenas números",
                                    //    },
                                    //],
                                    editorOptions: {
                                        label: "% Desconto ao Dia",
                                        maxLength: 7,
                                        format: "###,###,###,###,##0.00",
                                        min: 0,
                                    },
                                },
                                {
                                    dataField: "PC_DESCONTO_FIXO",
                                    editorType: "dxNumberBox",
                                    //validationRules: [
                                    //    {
                                    //        type: "numeric",
                                    //        message: "Este campo aceita apenas números",
                                    //    },
                                    //],
                                    editorOptions: {
                                        label: "% Desconto Fixo",
                                        maxLength: 7,
                                        format: "###,###,###,###,##0.00",
                                        min: 0,
                                    },
                                },
                            ],
                        },

                        {
                            itemType: "group",
                            colCount: 3,
                            colSpan: 2,
                            caption: "Datas Limites após Vencimento e Mensagem Padrão",
                            items: [
                                {
                                    dataField: "QT_DIAS_PROTESTO",
                                    editorType: "dxNumberBox",
                                    //validationRules: [
                                    //    {
                                    //        type: "numeric",
                                    //        message: "Este campo aceita apenas números",
                                    //    },
                                    //],
                                    editorOptions: {
                                        label: "Limite de dias de atraso para Protestar",
                                        maxLength: 7,
                                        format: "###,###,###,###,###",
                                        min: 0,
                                    },
                                },
                                {
                                    dataField: "QT_DIAS_LIMITE_PAGAMENTO",
                                    editorType: "dxNumberBox",
                                    //validationRules: [
                                    //    {
                                    //        type: "numeric",
                                    //        message: "Este campo aceita apenas números",
                                    //    },
                                    //],
                                    editorOptions: {
                                        label: "Limite de dias em atraso para Pagamento",
                                        maxLength: 7,
                                        format: "###,###,###,###,###",
                                        min: 0,
                                    },
                                },
                            ],
                        },

                        {
                            itemType: "group",
                            colCount: 1,
                            colSpan: 2,
                            items: [
                                {
                                    dataField: "CD_MENSAGEM",
                                    editorOptions: {
                                        label: "Mensagem Padrão Opcional",
                                    },
                                },
                            ],
                        },

                    ],

                },
            },
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            sorting: { mode: "multiple" },
            groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
            paging: { pageSize: 20 },
            pager: {
                visible: true,
                allowedPageSizes: [10, 15, 20],
                showPageSizeSelector: false,
                showNavigationButtons: true
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet("Instruções");

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Instruções_Boleto_Cobrança.xlsx");
                    });
                });
                e.cancel = true;
            },
            filterRow: { visible: true, applyFilter: "auto" },
            headerFilter: {
                visible: true,
                allowSearch: true
            },
            filterPanel: { visible: true },
            columnChooser: { enabled: true, allowSearch: true, height: 350 },
            keyExpr: ["NR_SEQUENCIA"],
            columns: [
                {
                    dataField: "NR_SEQUENCIA",
                    caption: "Seq.",
                    dataType: "number",
                    format: "##########",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    cssClass: "column-data-grid",
                    alignment: "center",
                    width: 40,
                },
                {
                    dataField: "CD_INSTRUCAO_BANCO",
                    caption: "Código da Instrução",
                    allowEditing: true,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    cssClass: "column-data-grid",
                    visible: true,
                    allowHiding: false,
                    editorOptions: {
                        onContentReady: obj => {
                            widgetInstancet = obj.component; //salva a instância para dar foco na edição
                        },
                    },
                },
                {
                    dataField: "DS_INSTRUCAO",
                    caption: "Descrição da Instrução",
                    allowEditing: true,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    cssClass: "column-data-grid",
                    visible: true,
                    allowHiding: false,
                },
                {
                    dataField: "PC_JUROS_DIA",
                    caption: "% Juros Diário",
                    width: 60,
                    dataType: "number",
                    format: "###,###,###,###,##0.00",
                    allowEditing: true,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: "right",
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "PC_JUROS_MES",
                    caption: "% Juros Mensal",
                    width: 60,
                    dataType: "number",
                    format: "###,###,###,###,##0.00",
                    allowEditing: true,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: "right",
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "PC_MULTA_FIXA",
                    caption: "% Multa Fixa",
                    width: 60,
                    dataType: "number",
                    format: "###,###,###,###,##0.00",
                    allowEditing: true,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: "right",
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "PC_DESCONTO_DIA",
                    caption: "% Desc. ao Dia",
                    width: 60,
                    dataType: "number",
                    format: "###,###,###,###,##0.00",
                    allowEditing: true,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: "right",
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "PC_DESCONTO_FIXO",
                    caption: "% Desc. Fixo",
                    width: 60,
                    dataType: "number",
                    format: "###,###,###,###,##0.00",
                    allowEditing: true,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: "right",
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "QT_DIAS_DESCONTO_ANTECIPADO",
                    caption: "Dias Desc. Antec.",
                    width: 60,
                    dataType: "number",
                    format: "###,###,###,###,###",
                    allowEditing: true,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: "center",
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "PC_MULTA_APOS_VENCIMENTO",
                    caption: "% Multa após Vencto.",
                    width: 60,
                    dataType: "number",
                    format: "###,###,###,###,##0.00",
                    allowEditing: true,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: "right",
                    visible: false,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "QT_DIAS_APOS_VENCIMENTO",
                    caption: "Dias Vencto. para Multa",
                    width: 60,
                    dataType: "number",
                    format: "###,###,###,###,###",
                    allowEditing: true,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: "center",
                    visible: false,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "DS_MULTA_APOS_VENCIMENTO",
                    caption: "Multa após Vencto.",
                    width: 85,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: "center",
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "QT_DIAS_LIMITE_PAGAMENTO",
                    caption: "Dias Limite Pagto.",
                    width: 60,
                    dataType: "number",
                    format: "###,###,###,###,###",
                    allowEditing: true,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: "center",
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "QT_DIAS_PROTESTO",
                    caption: "Dias para Protesto",
                    width: 60,
                    dataType: "number",
                    format: "###,###,###,###,###",
                    allowEditing: true,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: "center",
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "CD_MENSAGEM",
                    caption: "Cód. Mensagem Padrão",
                    allowEditing: true,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    cssClass: "column-data-grid",
                    alignment: "center",
                    visible: false,
                    width: 40,
                    lookup: {
                        dataSource: dsMensagemPadrao,
                        valueExpr: "CD_MENSAGEM",
                        displayExpr: "DS_MENSAGEM",
                        searchExpr: ["DS_MENSAGEM"]
                    },
                },
                {
                    dataField: "DS_MENSAGEM",
                    caption: "Mensagem Padrão",
                    allowEditing: true,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    cssClass: "column-data-grid",
                    alignment: "left",
                    visible: false,
                    //width: 40,
                },
                {
                    type: "buttons",
                    width: 50,
                    //cssClass: "column-data-grid",
                },

            ],
            onCellPrepared: function (e) {
                if (e.rowType === "data") {
                    if (e.column.dataField === "CD_STATUS" &&
                        e.data.CD_STATUS === "I") {
                        //e.cellElement.css("background-color", "#f26419");
                        e.cellElement.css("color", "#d00000");
                        e.cellElement.css("font-weight", "bold");
                    }
                }
            },
            onInitNewRow: function (e) {
                vNrSequenciaInstrucao = 1;
                dsInstrucoesBoleto = oGridInstrucoesBoleto.getDataSource().items();
                dsInstrucoesBoleto.forEach(x => { x.NR_SEQUENCIA = vNrSequenciaInstrucao; vNrSequenciaInstrucao++; });
                e.data.NR_SEQUENCIA = vNrSequenciaInstrucao;
            },
            onRowRemoved: function (e) {
                vNrSequenciaInstrucao = 1;
                dsInstrucoesBoleto = oGridInstrucoesBoleto.getDataSource().items();
                dsInstrucoesBoleto.forEach(x => { x.NR_SEQUENCIA = vNrSequenciaInstrucao; vNrSequenciaInstrucao++; });
                oGridInstrucoesBoleto.option("dataSource", dsInstrucoesBoleto);
            },
            onSaved: function (e) {
                if (e.changes != undefined && e.changes.length > 0) {
                    if (e.changes[0].type != undefined && e.changes[0].type.toString().toLowerCase() != "remove") {
                        dsInstrucoesBoleto = oGridInstrucoesBoleto.getDataSource().items();
                        dsInstrucoesBoleto.forEach(x => { if (x.PC_MULTA_APOS_VENCIMENTO != undefined && x.QT_DIAS_APOS_VENCIMENTO != undefined) { x.DS_MULTA_APOS_VENCIMENTO = "Multa de " + x.PC_MULTA_APOS_VENCIMENTO + "% após " + x.QT_DIAS_APOS_VENCIMENTO + " dias vencido"; } });
                        oGridInstrucoesBoleto.option("dataSource", dsInstrucoesBoleto);
                    }
                }
            },
            toolbar: {
                items: [
                    {
                        name: "groupPanel",
                        locateInMenu: "auto",
                    },
                    {
                        name: "addRowButton",
                        showText: "always",
                        options: {
                            type: "success",
                            text: "Nova Instrução",
                            hint: "Cadastra uma nova instrução",
                        },
                    },
                    "exportButton",
                    "columnChooserButton",
                    "searchPanel",
                ],
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

        //***********************************
        //* CADASTRO DE CONTAS - FIM
        //***********************************

        oLoadPanel.hide();
    })();
});

function exibeMensagem(pTipo, pTitulo, pTexto) {
    var configuration = { title: pTitulo, text: pTexto, type: pTipo }

    if (pTipo == "error") {
        configuration.addclass = "stack-bar-top";
        configuration.stack = { "dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0 };
        configuration.width = "100%";
    }
    else if (pTipo == "info") {
        configuration.addclass = "notification-warning stack-bar-top";
        configuration.stack = { "dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0 };
        configuration.width = "100%";
    }

    new PNotify(configuration);
};

function desabilitaTodosPanels() {
    exibirEsconderPaineis('cardCabecalho', 'none');
    exibirEsconderPaineis('cardMenu', 'none');
    exibirEsconderPaineis('cardPropagandaPIXMenu', 'none');
    exibirEsconderPaineis('cardPropagandaPIX', 'none');
    exibirEsconderPaineis('cardListaContasCorrentes', 'none');
    exibirEsconderPaineis('cardCadastroContaCorrente', 'none');
    exibirEsconderPaineis('cardListaAgencias', 'none');
    exibirEsconderPaineis('cardCadastroAgencia', 'none');
    exibirEsconderPaineis('cardListaBancos', 'none');
    exibirEsconderPaineis('cardCadastroBanco', 'none');
}

function exibirEsconderPaineis(el, paramDisplay) {

    var display;


    if (paramDisplay === 'block' || paramDisplay === 'none') {
        display = paramDisplay;
    } else {
        if (document.getElementById(el).style.display === "none") {
            display = 'block';
        } else {
            display = 'none';
        };
    };

    document.getElementById(el).style.display = display;
}

function rolarPara(elemento) {
    $('html, body').animate({ scrollTop: $(elemento).offset().top }, 600);
}

function abrirModal(e) {
    $(e).modal('toggle');
}

function retornaMenuPrincipal() {
    desabilitaTodosPanels();

    exibirEsconderPaineis('cardCabecalho', 'block');
    exibirEsconderPaineis('cardMenu', 'block');

    desmarcaBotoesMenu();
}

function formatButtons() {
    let buttonsPrincipal = $("#panelBotoesMenu button");
    buttonsPrincipal.removeClass('btn-dark').addClass('btn-gray');
    buttonsPrincipal.on("click", a => {
        buttonsPrincipal.removeClass('btn-dark').addClass('btn-gray');
        $(a.currentTarget).removeClass('btn-gray').addClass('btn-dark');
    })
}

function desmarcaBotoesMenu() {

    let buttonsPrincipal = $("#panelBotoesMenu button");
    buttonsPrincipal.removeClass('btn-dark').addClass('btn-gray');
}

function getTemplateFoto(data, containerClass) {

    let logoAtual = data.DS_BANCO_LOGO + '?' + new Date().getTime();

    return `<div class='${containerClass}'><img style="width: 35px; height: 35px" src='${logoAtual}' /><div> ${data.DS_PESQUISA}</div></div>`;
}

function iniciaConsultaBanco() {
    desabilitaTodosPanels();

    exibirEsconderPaineis('cardCabecalho', 'block');
    exibirEsconderPaineis('cardMenu', 'block');
    exibirEsconderPaineis('cardListaBancos', 'block');

    carregaBancos();
}

function carregaBancos() {
    oLoadPanel.show();

    //PROCEDIMENTO PARA BUSCAR OS BANCOS CADASTRADOS
    GetAzureDataSource(61).then((result) => {
        if (result.success) {
            oLoadPanel.hide();

            oGridBancos.option("dataSource", result.data);
        }
        else {
            oLoadPanel.hide();

            exibeMensagem("error", "Erro ao carregar os bancos cadastrados", `${result.name}: ${result.error}`);
        }
    });
}

function novoBanco() {
    limpaCamposBanco();

    vProcedimento = "I"

    desabilitaTodosPanels();

    exibirEsconderPaineis('cardCabecalho', 'block');
    exibirEsconderPaineis('cardMenu', 'block');
    exibirEsconderPaineis('cardCadastroBanco', 'block');
}

function editarBanco(pCodBanco, pLogoBanco) {
    limpaCamposBanco();

    var vParametrosBancoConsulta = JSON.stringify({
        CD_BANCO: pCodBanco
    });

    //PROCEDIMENTO BUSCAR OS DADOS DO BANCO SELECIONADO
    $.ajax({
        type: "POST",
        url: "/Financeiro/ConsultarBanco",
        data: { pBanco: vParametrosBancoConsulta },
        success: function (responseData) {
            oLoadPanel.hide();

            if (responseData.result == "error") {
                exibeMensagem("error", "Erro ao buscar dados do banco", responseData.msg);
            } else {
                oTxtCdBanco.option("disabled", true);
                oTxtCdBanco.option("value", responseData.CD_BANCO);
                oTxtCdBancoDigito.option("value", responseData.CD_BANCO_DIGITO);
                oTxtDsBanco.option("value", responseData.DS_BANCO);
                oLkpStatusBanco.option("value", responseData.CD_STATUS);
                oLblNomeBancoTituloCadBanco.innerText = responseData.DS_BANCO.toString().toUpperCase();
                oImgBancoCadBanco.src = pLogoBanco;

                vProcedimento = "A"

                desabilitaTodosPanels();

                exibirEsconderPaineis('cardCabecalho', 'block');
                exibirEsconderPaineis('cardMenu', 'block');
                exibirEsconderPaineis('cardCadastroBanco', 'block');
            }
        },
        fail: function (responseData) {
            oLoadPanel.hide();

            exibeMensagem("error", "Erro ao buscar dados do banco", responseData);
        }
    });
}

function salvarBanco() {
    const resultBanco = DevExpress.validationEngine.validateGroup("Banco");

    if (resultBanco.isValid) {
        oLoadPanel.show();

        var vParametrosBancoGravacao = JSON.stringify({
            CD_BANCO: oTxtCdBanco.option("value"),
            CD_BANCO_DIGITO: oTxtCdBancoDigito.option("value"),
            DS_BANCO: oTxtDsBanco.option("value"),
            CD_STATUS: oLkpStatusBanco.option("value")
        });

        //PROCEDIMENTO PARA GRAVAR OS DADOS DO BANCO
        $.ajax({
            type: "POST",
            url: "/Financeiro/SalvarBanco",
            data: { pBanco: vParametrosBancoGravacao, pProcedimento: vProcedimento },
            success: function (responseData) {
                oLoadPanel.hide();

                if (responseData.result == "error") {
                    exibeMensagem("error", "Erro ao gravar dados do banco", responseData.msg);
                } else {
                    exibeMensagem("success", "Banco", "Dados gravados com sucesso!");

                    limpaCamposBanco();

                    if (vProcedimento == "I") {
                        iniciaConsultaAgencia();
                    }
                    else {
                        iniciaConsultaBanco();
                    }
                }
            },
            fail: function (responseData) {
                oLoadPanel.hide();

                exibeMensagem("error", "Erro ao gravar dados do banco", responseData);
            }
        });
    } else {
        DevExpress.ui.notify({
            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
            type: 'error',
            displayTime: 5000,
        });
    }
}

function limpaCamposBanco() {
    //HABILITA OS CAMPOS DO CADASTRO DE BANCO
    oTxtCdBanco.option("disabled", false);

    //LIMPA OS CAMPOS DO CADASTRO DE BANCO
    oTxtCdBanco.option("value", "");
    oTxtCdBancoDigito.option("value", "");
    oTxtDsBanco.option("value", "");
    oLkpStatusBanco.option("value", "A");

    //MARCA CAMPOS DO CADASTRO DE BANCO COMO VÁLIDOS
    oTxtCdBanco.option("isValid", true);
    oTxtCdBancoDigito.option("isValid", true);
    oTxtDsBanco.option("isValid", true);
    oLkpStatusBanco.option("isValid", true);

    //LIMPA OS DEMAIS COMPONENTES DO CADASTRO DE BANCO
    oLblNomeBancoTituloCadBanco.innerText = "";
    oImgBancoCadBanco.src = "/img/bancos/banco-sem-foto.png";
}

function iniciaConsultaAgencia() {
    desabilitaTodosPanels();

    exibirEsconderPaineis('cardCabecalho', 'block');
    exibirEsconderPaineis('cardMenu', 'block');
    exibirEsconderPaineis('cardListaAgencias', 'block');

    oLoadPanel.show();

    //PROCEDIMENTO PARA BUSCAR OS BANCOS CADASTRADOS
    GetAzureDataSource(61).then((result) => {
        if (result.success) {
            oLoadPanel.hide();

            oLkpBancos.option("dataSource", result.data);

            carregaAgencias();
        }
        else {
            oLoadPanel.hide();

            exibeMensagem("error", "Erro ao carregar os bancos cadastrados", `${result.name}: ${result.error}`);
        }
    });
}

function carregaAgencias() {
    oLoadPanel.show();

    //PROCEDIMENTO PARA BUSCAR AS AGENCIAS CADASTRADAS
    GetAzureDataSource(57).then((result) => {
        if (result.success) {
            oLoadPanel.hide();

            oGridAgencias.option("dataSource", result.data);
        }
        else {
            oLoadPanel.hide();

            exibeMensagem("error", "Erro ao carregar as agências cadastradas", `${result.name}: ${result.error}`);
        }
    });
}

function novaAgencia() {
    limpaCamposAgencia();

    vProcedimento = "I"

    desabilitaTodosPanels();

    exibirEsconderPaineis('cardCabecalho', 'block');
    exibirEsconderPaineis('cardMenu', 'block');
    exibirEsconderPaineis('cardCadastroAgencia', 'block');
}

function editarAgencia(pCodBanco, pCodAgencia) {
    limpaCamposAgencia();

    var vParametrosAgenciaConsulta = JSON.stringify({
        CD_BANCO: pCodBanco,
        CD_AGENCIA: pCodAgencia
    });

    //PROCEDIMENTO BUSCAR OS DADOS DA AGENCIA SELECIONADA
    $.ajax({
        type: "POST",
        url: "/Financeiro/ConsultarAgencia",
        data: { pAgencia: vParametrosAgenciaConsulta },
        success: function (responseData) {
            oLoadPanel.hide();

            if (responseData.result == "error") {
                exibeMensagem("error", "Erro ao buscar dados da agência", responseData.msg);
            } else {
                oLkpBancos.option("disabled", true);
                oTxtCdAgencia.option("disabled", true);
                oLkpBancos.option("value", responseData.CD_BANCO);
                oTxtCdAgencia.option("value", responseData.CD_AGENCIA);
                oTxtCdAgenciaDigito.option("value", responseData.CD_AGENCIA_DIGITO);
                oTxtDsAgencia.option("value", responseData.DS_AGENCIA);
                oTxtDsContatoAgencia.option("value", responseData.DS_CONTATO);
                oNbxCdDDDAgencia.option("value", responseData.CD_DDD_TELEFONE);
                oTxtDsTelefoneAgencia.option("value", responseData.DS_TELEFONE);
                oLkpStatusAgencia.option("value", responseData.CD_STATUS);
                oLblNomeBancoTituloCadAgencia.innerText = responseData.BANCO.DS_BANCO.toString().toUpperCase();
                //oLblNomeAgenciaTituloCadAgencia.innerText = "Agência: " + responseData.CD_AGENCIA.toString().toUpperCase() + " / " + responseData.DS_AGENCIA.toString().toUpperCase();

                preencheNomeAgenciaTitulo();

                vProcedimento = "A"

                desabilitaTodosPanels();

                exibirEsconderPaineis('cardCabecalho', 'block');
                exibirEsconderPaineis('cardMenu', 'block');
                exibirEsconderPaineis('cardCadastroAgencia', 'block');
            }
        },
        fail: function (responseData) {
            oLoadPanel.hide();

            exibeMensagem("error", "Erro ao buscar dados da agência", responseData);
        }
    });
}

function salvarAgencia() {
    const resultAgencia = DevExpress.validationEngine.validateGroup("Agencia");

    if (resultAgencia.isValid) {
        oLoadPanel.show();

        var vParametrosAgenciaGravacao = JSON.stringify({
            CD_BANCO: oLkpBancos.option("value"),
            CD_AGENCIA: oTxtCdAgencia.option("value"),
            CD_AGENCIA_DIGITO: oTxtCdAgenciaDigito.option("value"),
            DS_AGENCIA: oTxtDsAgencia.option("value"),
            DS_CONTATO: oTxtDsContatoAgencia.option("value"),
            CD_STATUS: oLkpStatusAgencia.option("value"),
            CD_DDD_TELEFONE: oNbxCdDDDAgencia.option("value"),
            DS_TELEFONE: oTxtDsTelefoneAgencia.option("value")
        });

        //PROCEDIMENTO PARA GRAVAR OS DADOS DA AGÊNCIA
        $.ajax({
            type: "POST",
            url: "/Financeiro/SalvarAgencia",
            data: { pAgencia: vParametrosAgenciaGravacao, pProcedimento: vProcedimento },
            success: function (responseData) {
                oLoadPanel.hide();

                if (responseData.result == "error") {
                    exibeMensagem("error", "Erro ao gravar dados da agência", responseData.msg);
                } else {
                    exibeMensagem("success", "Agência", "Dados gravados com sucesso!");

                    limpaCamposAgencia();

                    if (vProcedimento == "I") {
                        iniciaConsultaContaCorrente();
                    }
                    else {
                        iniciaConsultaAgencia();
                    }
                }
            },
            fail: function (responseData) {
                oLoadPanel.hide();

                exibeMensagem("error", "Erro ao gravar dados da agência", responseData);
            }
        });
    } else {
        DevExpress.ui.notify({
            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
            type: 'error',
            displayTime: 5000,
        });
    }
}

function limpaCamposAgencia() {
    //HABILITA OS CAMPOS DO CADASTRO DE AGÊNCIA
    oLkpBancos.option("disabled", false);
    oTxtCdAgencia.option("disabled", false);

    //LIMPA OS CAMPOS DO CADASTRO DE AGÊNCIA
    oLkpBancos.option("value", null);
    oTxtCdAgencia.option("value", "");
    oTxtCdAgenciaDigito.option("value", "");
    oTxtDsAgencia.option("value", "");
    oTxtDsContatoAgencia.option("value", "");
    oNbxCdDDDAgencia.option("value", "");
    oTxtDsTelefoneAgencia.option("value", "");
    oLkpStatusAgencia.option("value", "A");

    //MARCA CAMPOS DO CADASTRO DE AGÊNCIA COMO VÁLIDOS
    oLkpBancos.option("isValid", true);
    oTxtCdAgencia.option("isValid", true);
    oTxtCdAgenciaDigito.option("isValid", true);
    oTxtDsAgencia.option("isValid", true);
    oTxtDsContatoAgencia.option("isValid", true);
    oNbxCdDDDAgencia.option("isValid", true);
    oTxtDsTelefoneAgencia.option("isValid", true);
    oLkpStatusAgencia.option("isValid", true);

    //LIMPA OS DEMAIS COMPONENTES DO CADASTRO DE AGÊNCIA
    oLblNomeBancoTituloCadAgencia.innerText = "";
    oLblNomeAgenciaTituloCadAgencia.innerText = "";
    oImgBancoCadAgencia.src = "/img/bancos/banco-sem-foto.png";
}

function preencheNomeAgenciaTitulo() {
    if ((oTxtCdAgencia.option("value").toString().length == 0) && (oTxtDsAgencia.option("value").toString().length == 0)) {
        vNomeAgenciaTitulo = "";
    }
    else {
        vNomeAgenciaTitulo = "Agência: ";
        vNomeAgenciaTitulo += oTxtCdAgencia.option("value").toString().toUpperCase();

        if ((oTxtCdAgencia.option("value").toString().length > 0) && (oTxtDsAgencia.option("value").toString().length > 0)) {
            vNomeAgenciaTitulo += " / ";
        }

        vNomeAgenciaTitulo += oTxtDsAgencia.option("value").toString().toUpperCase();
    }

    oLblNomeAgenciaTituloCadAgencia.innerText = vNomeAgenciaTitulo.toString();
}

function iniciaConsultaContaCorrente() {
    desabilitaTodosPanels();

    exibirEsconderPaineis('cardCabecalho', 'block');
    exibirEsconderPaineis('cardMenu', 'block');
    exibirEsconderPaineis('cardListaContasCorrentes', 'block');

    carregaContasCorrentes();
}

function carregaContasCorrentes() {
    oLoadPanel.show();

    //PROCEDIMENTO PARA BUSCAR AS CONTAS CORRENTES CADASTRADAS
    GetAzureDataSource(43, "{ TIPO_ACESSO: '1' }").then((result) => {
        if (result.success) {
            oGridContasCorrentes.option("dataSource", result.data);

            //PROCEDIMENTO PARA BUSCAR AS AGÊNCIAS CADASTRADAS
            GetAzureDataSource(57, "{ CD_STATUS_BANCO: 'A', CD_STATUS_AGENCIA: 'A' }").then((result) => {
                if (result.success) {
                    oLkpAgenciasBancarias.option("dataSource", result.data);

                    //PROCEDIMENTO PARA BUSCAR AS FILIAIS CADASTRADAS
                    GetAzureDataSource(33, "{ CD_STATUS: 'A', TIPO_ACESSO: '4' }").then((result) => {
                        if (result.success) {
                            oTagFiliaisConta.option("dataSource", result.data);

                            //PROCEDIMENTO PARA BUSCAR AS FORMAS DE PAGAMENTO CADASTRADAS
                            GetAzureDataSource(58, "{CD_STATUS: 'A'}").then((result) => {
                                if (result.success) {
                                    oLkpFormaPagamentoPix.option("dataSource", result.data);

                                    //PROCEDIMENTO PARA BUSCAR OS MUNICÍPIOS CADASTRADOS
                                    GetAzureDataSource(14).then((result) => {
                                        if (result.success) {
                                            oLkpMunicipioBeneficiarioPix.option("dataSource", result.data);

                                            //PROCEDIMENTO PARA BUSCAR AS MENSAGENS PADRÕES CADASTRADAS
                                            GetAzureDataSource(60, "{CD_STATUS: 'A', CD_IDENTIFICACAO: 2}").then((result) => {
                                                if (result.success) {
                                                    oLoadPanel.hide();

                                                    dsMensagemPadrao = result.data;
                                                }
                                                else {
                                                    oLoadPanel.hide();

                                                    exibeMensagem("error", "Erro ao carregar as mensagens padrões cadastradas", `${result.name}: ${result.error}`);
                                                }
                                            });
                                        }
                                        else {
                                            oLoadPanel.hide();

                                            exibeMensagem("error", "Erro ao carregar os municípios cadastrados", `${result.name}: ${result.error}`);
                                        }
                                    });
                                }
                                else {
                                    oLoadPanel.hide();

                                    exibeMensagem("error", "Erro ao carregar as formas de pagamentos cadastradas", `${result.name}: ${result.error}`);
                                }
                            });
                        }
                        else {
                            oLoadPanel.hide();

                            exibeMensagem("error", "Erro ao carregar as filiais cadastradas", `${result.name}: ${result.error}`);
                        }
                    });
                }
                else {
                    oLoadPanel.hide();

                    exibeMensagem("error", "Erro ao carregar as agências cadastradas", `${result.name}: ${result.error}`);
                }
            });
        }
        else {
            oLoadPanel.hide();

            exibeMensagem("error", "Erro ao carregar as contas correntes cadastradas", `${result.name}: ${result.error}`);
        }
    });
}

function novaContaCorrente() {
    limpaCamposContaCorrente();

    vProcedimento = "I"

    desabilitaTodosPanels();

    exibirEsconderPaineis('cardCabecalho', 'block');
    exibirEsconderPaineis('cardMenu', 'block');
    exibirEsconderPaineis('cardCadastroContaCorrente', 'block');
    exibirEsconderPaineis('cardPropagandaPIX', 'block');
}

function editarContaCorrente(pCodBanco, pCodAgencia, pCodContaCorrente) {
    limpaCamposContaCorrente();

    var vParametrosContaCorrenteConsulta = JSON.stringify({
        CD_BANCO: pCodBanco,
        CD_AGENCIA: pCodAgencia,
        CD_CONTA_CORRENTE: pCodContaCorrente
    });

    //PROCEDIMENTO BUSCAR OS DADOS DA CONTA CORRENTE SELECIONADA
    $.ajax({
        type: "POST",
        url: "/Financeiro/ConsultarContaCorrente",
        data: { pContaCorrente: vParametrosContaCorrenteConsulta },
        success: function (responseData) {
            if (responseData.result == "error") {
                oLoadPanel.hide();

                exibeMensagem("error", "Erro ao buscar dados da conta corrente", responseData.msg);
            } else {
                vContaEdicao = responseData;

                oLkpAgenciasBancarias.option("disabled", true);
                oTxtCdContaCorrente.option("disabled", true);
                oLkpAgenciasBancarias.option("value", responseData.CD_BANCO + "|" + responseData.CD_AGENCIA);
                oTxtCdContaCorrente.option("value", responseData.CD_CONTA_CORRENTE);
                oTxtCdContaCorrenteDigito.option("value", responseData.CD_CONTA_CORRENTE_DIG);
                oTxtDsContaCorrente.option("value", responseData.DS_CONTA_CORRENTE);
                oLkpStatusContaCorrente.option("value", responseData.CD_STATUS);
                oLblNomeBancoTituloCadConta.innerText = responseData.AGENCIA.BANCO.DS_BANCO.toString().toUpperCase();

                //DADOS CNAB COBRANÇA
                oNbxNrUltimoArquivoRemessaOutroSistema.option("value", responseData.NR_ULTIMO_ARQUIVO_REMESSA_COBRANCA);
                oTxtNrConvenioCobranca.option("value", responseData.NR_CONVENIO);
                oTxtNrCendente.option("value", responseData.CD_CEDENTE);
                oTxtNrCendenteDigito.option("value", responseData.CD_CEDENTE_DIGITO);
                oNbxNrCarteira.option("value", responseData.NR_CARTEIRA);
                oTxtNrCarteiraVariacao.option("value", responseData.CD_VARIACAO_CARTEIRA);
                oTxtNrModalidae.option("value", responseData.CD_MODALIDADE);
                oTxtEspecieBoleto.option("value", responseData.CD_ESPECIE_BOLETO);
                oTxtEspecieCNAB.option("value", responseData.CD_ESPECIE_COBRANCA);
                oTxtCdComposicaoNossoNumero.option("value", responseData.CD_COMPOSICAO_NOSSO_NUMERO);
                oTxtCdPostoCooperativaCredito.option("value", responseData.CD_POSTO_COOPERATIVA_CREDITO);
                oChkPermiteAlterarDadosReimpressaoBoleto.option("value", responseData.LG_PERMITE_ALTERAR_DADOS_REIMPRESSAO_BOLETO);

                //DADOS CNAB PAGAMENTO
                oTxtNrConvenioPagamento.option("value", responseData.NR_CONVENIO_PAGAMENTO);

                //DADOS INTEGRAÇÃO API PIX
                oTxtDsBeneficiarioPix.option("value", responseData.DS_BENEFICIARIO_PIX);
                oTxtDsEmailBeneficiarioPix.option("value", responseData.DS_EMAIL_BENEFICIARIO_PIX);
                oTxtCdCPFCNPJBeneficiarioPix.option("value", responseData.CD_CPF_CNPJ_BENEFICIARIO_PIX);
                oTxtCdCEPBeneficiarioPix.option("value", responseData.CD_CEP_BENEFICIARIO_PIX);
                oLkpMunicipioBeneficiarioPix.option("value", responseData.CD_MUNICIPIO_BENEFICIARIO_PIX);
                oTxtCdChavePIX.option("value", responseData.CD_CHAVE_PIX);
                oTxtCdChaveAcessoPix.option("value", responseData.CD_CHAVE_ACESSO_PIX);
                oTxtCdSenhaPix.option("value", responseData.CD_SENHA_PIX);
                oTxtCdIdentificadorAcessoAPIPix.option("value", responseData.CD_IDENTIFICADOR_ACESSO_API_PIX);
                oTxtCdVersaoWebServicePix.option("value", responseData.CD_VERSAO_WEB_SERVICE_PIX);
                oTxtCdLoginIntegracaoPix.option("value", responseData.CD_LOGIN_INTEGRACAO_PIX);
                oTxtCdSenhaIntegracaoPix.option("value", responseData.CD_SENHA_INTEGRACAO_PIX);

                oLkpFormaPagamentoPix.option("value", responseData.CD_FORMA_PAGAMENTO_PIX);

                if (responseData.CD_EMPRESA_INTEGRACAO_PIX != null) {
                    oTxtCdLoginIntegracaoPix.option("disabled", false);
                    oTxtCdSenhaIntegracaoPix.option("disabled", false);
                }
                else {
                    oTxtCdLoginIntegracaoPix.option("disabled", true);
                    oTxtCdSenhaIntegracaoPix.option("disabled", true);
                }

                vFiliaisSelecionadas = null;

                //SELECIONA AS FILIAIS QUE UTILIZAM A CONTA CORRENTE
                if (responseData.FILIAIS != undefined && responseData.FILIAIS != null) {
                    vFiliaisSelecionadas = [];

                    responseData.FILIAIS.forEach(x => { vFiliaisSelecionadas.push(x.CD_FILIAL); });
                }

                oTagFiliaisConta.option("value", vFiliaisSelecionadas);

                preencheNomeContaCorrenteTitulo();

                var vParametrosInstrucoesConsulta = JSON.stringify({
                    CD_BANCO: pCodBanco,
                    CD_AGENCIA: pCodAgencia,
                    CD_CONTA: pCodContaCorrente
                });

                //PROCEDIMENTO PARA BUSCAR AS INSTRUÇÕES DE BOLETOS DE COBRANÇA
                GetAzureDataSource(59, vParametrosInstrucoesConsulta).then((result) => {
                    if (result.success) {
                        oLoadPanel.hide();

                        dsInstrucoesBoleto = result.data;

                        oGridInstrucoesBoleto.option("dataSource", dsInstrucoesBoleto);
                    }
                    else {
                        oLoadPanel.hide();

                        exibeMensagem("error", "Erro ao carregar as mensagens padrões cadastradas", `${result.name}: ${result.error}`);
                    }
                });

                vProcedimento = "A"

                desabilitaTodosPanels();

                exibirEsconderPaineis('cardCabecalho', 'block');
                exibirEsconderPaineis('cardMenu', 'block');
                exibirEsconderPaineis('cardCadastroContaCorrente', 'block');

                if (responseData.CD_FORMA_PAGAMENTO_PIX == null || responseData.CD_EMPRESA_INTEGRACAO_PIX == null || responseData.CD_CONTA_INTEGRACAO_PIX == null) {
                    exibirEsconderPaineis('cardPropagandaPIX', 'block');
                }
            }
        },
        fail: function (responseData) {
            oLoadPanel.hide();

            exibeMensagem("error", "Erro ao buscar dados da conta corrente", responseData);
        }
    });
}

function salvarContaCorrente() {
    const resultConta = DevExpress.validationEngine.validateGroup("Conta");
    const resultPix = DevExpress.validationEngine.validateGroup("Pix");

    if (resultConta.isValid && resultPix.isValid) {
        oLoadPanel.show();

        vFiliaisSelecionadas = null;

        //PEGA AS FILIAIS QUE UTILIZAM A CONTA CORRENTE
        if (oTagFiliaisConta.option("selectedItems") != null) {
            vFiliaisSelecionadas = [];

            oTagFiliaisConta.option("selectedItems").forEach(x => { vFiliaisSelecionadas.push({ CD_FILIAL: x.CD_FILIAL }); });
        }

        var vParametrosContaCorrenteGravacao = JSON.stringify({
            CD_BANCO: oLkpAgenciasBancarias.option("selectedItem").CD_BANCO,
            CD_AGENCIA: oLkpAgenciasBancarias.option("selectedItem").CD_AGENCIA,
            CD_CONTA_CORRENTE: oTxtCdContaCorrente.option("value"),
            CD_CONTA_CORRENTE_DIG: oTxtCdContaCorrenteDigito.option("value"),
            DS_CONTA_CORRENTE: oTxtDsContaCorrente.option("value"),
            CD_STATUS: oLkpStatusContaCorrente.option("value"),

            //DADOS CNAB COBRANÇA
            NR_ULTIMO_ARQUIVO_REMESSA_COBRANCA: oNbxNrUltimoArquivoRemessaOutroSistema.option("value"),
            NR_CONVENIO: oTxtNrConvenioCobranca.option("value"),
            CD_CEDENTE: oTxtNrCendente.option("value"),
            CD_CEDENTE_DIGITO: oTxtNrCendenteDigito.option("value"),
            NR_CARTEIRA: oNbxNrCarteira.option("value"),
            CD_VARIACAO_CARTEIRA: oTxtNrCarteiraVariacao.option("value"),
            CD_MODALIDADE: oTxtNrModalidae.option("value"),
            CD_ESPECIE_BOLETO: oTxtEspecieBoleto.option("value"),
            CD_ESPECIE_COBRANCA: oTxtEspecieCNAB.option("value"),
            CD_COMPOSICAO_NOSSO_NUMERO: oTxtCdComposicaoNossoNumero.option("value"),
            CD_POSTO_COOPERATIVA_CREDITO: oTxtCdPostoCooperativaCredito.option("value"),
            LG_PERMITE_ALTERAR_DADOS_REIMPRESSAO_BOLETO: oChkPermiteAlterarDadosReimpressaoBoleto.option("value"),

            //DADOS CNAB PAGAMENTO
            NR_CONVENIO_PAGAMENTO: oTxtNrConvenioPagamento.option("value"),

            //DADOS INTEGRAÇÃO API PIX
            CD_FORMA_PAGAMENTO_PIX: oLkpFormaPagamentoPix.option("value"),
            DS_BENEFICIARIO_PIX: oTxtDsBeneficiarioPix.option("value"),
            DS_EMAIL_BENEFICIARIO_PIX: oTxtDsEmailBeneficiarioPix.option("value"),
            CD_CPF_CNPJ_BENEFICIARIO_PIX: oTxtCdCPFCNPJBeneficiarioPix.option("value"),
            CD_CEP_BENEFICIARIO_PIX: oTxtCdCEPBeneficiarioPix.option("value"),
            CD_MUNICIPIO_BENEFICIARIO_PIX: oLkpMunicipioBeneficiarioPix.option("value"),
            DS_MUNICIPIO_BENEFICIARIO_PIX: oLkpMunicipioBeneficiarioPix.option("selectedItem") == null ? null : oLkpMunicipioBeneficiarioPix.option("selectedItem").DS_MUNICIPIO,
            CD_UF_BENEFICIARIO_PIX: oLkpMunicipioBeneficiarioPix.option("selectedItem") == null ? null : oLkpMunicipioBeneficiarioPix.option("selectedItem").CD_UF,
            CD_CHAVE_PIX: oTxtCdChavePIX.option("value"),
            CD_CHAVE_ACESSO_PIX: oTxtCdChaveAcessoPix.option("value"),
            CD_SENHA_PIX: oTxtCdSenhaPix.option("value"),
            CD_IDENTIFICADOR_ACESSO_API_PIX: oTxtCdIdentificadorAcessoAPIPix.option("value"),
            CD_VERSAO_WEB_SERVICE_PIX: oTxtCdVersaoWebServicePix.option("value"),
            CD_LOGIN_INTEGRACAO_PIX: oTxtCdLoginIntegracaoPix.option("value"),
            CD_SENHA_INTEGRACAO_PIX: oTxtCdSenhaIntegracaoPix.option("value"),

            FILIAIS: vFiliaisSelecionadas,

            BOLETO_INSTRUCOES: dsInstrucoesBoleto
        });

        //PROCEDIMENTO PARA GRAVAR OS DADOS DA CONTA CORRENTE
        $.ajax({
            type: "POST",
            url: "/Financeiro/SalvarContaCorrente",
            data: { pContaCorrente: vParametrosContaCorrenteGravacao, pProcedimento: vProcedimento },
            success: function (responseData) {
                oLoadPanel.hide();

                if (responseData.result == "error") {
                    exibeMensagem("error", "Erro ao gravar dados da conta corrente", responseData.msg);
                } else {
                    exibeMensagem("success", "Conta Corrente", "Dados gravados com sucesso!");

                    limpaCamposContaCorrente();

                    iniciaConsultaContaCorrente();
                }
            },
            fail: function (responseData) {
                oLoadPanel.hide();

                exibeMensagem("error", "Erro ao gravar dados da conta corrente", responseData);
            }
        });
    } else {
        DevExpress.ui.notify({
            message: "Por favor, verifique o preenchimento dos campos obrigatórios.",
            type: "error",
            displayTime: 5000,
        });

        if ((resultConta.isValid == true) && (resultPix.isValid == false)) {
            $("#togPix").removeClass("active");
            $("#togPix").addClass("active");
            document.getElementById("togPixContent").style.display = "block";
            rolarPara("#togPix");
        }
    }
}

function limpaCamposContaCorrente() {
    vContaEdicao = null;

    //HABILITA OS CAMPOS DO CADASTRO DE CONTA CORRENTE
    oLkpAgenciasBancarias.option("disabled", false);
    oTxtCdContaCorrente.option("disabled", false);

    //LIMPA OS CAMPOS DO CADASTRO DE CONTA CORRENTE
    oLkpAgenciasBancarias.option("value", null);
    oTxtCdContaCorrente.option("value", "");
    oTxtCdContaCorrenteDigito.option("value", "");
    oTxtDsContaCorrente.option("value", "");
    oLkpStatusContaCorrente.option("value", "A");
    oTagFiliaisConta.option("value", null);

    //MARCA CAMPOS DO CADASTRO DE CONTA CORRENTE COMO VÁLIDOS
    oLkpAgenciasBancarias.option("isValid", true);
    oTxtCdContaCorrente.option("isValid", true);
    oTxtCdContaCorrenteDigito.option("isValid", true);
    oTxtDsContaCorrente.option("isValid", true);
    oLkpStatusContaCorrente.option("isValid", true);
    oTagFiliaisConta.option("isValid", true);

    //LIMPA OS DEMAIS COMPONENTES DO CADASTRO DE CONTA CORRENTE
    oLblNomeBancoTituloCadConta.innerText = "";
    oLblNomeContaTituloCadConta.innerText = "";
    oImgBancoCadConta.src = "/img/bancos/banco-sem-foto.png";

    //LIMPA OS CAMPOS DE DADOS CNAB COBRANÇA
    oChkInformadoNumeroInicialArquivoRemessa.option("value", false);
    oNbxNrUltimoArquivoRemessaOutroSistema.option("value", "");
    oTxtNrConvenioCobranca.option("value", "");
    oTxtNrCendente.option("value", "");
    oTxtNrCendenteDigito.option("value", "");
    oNbxNrCarteira.option("value", "");
    oTxtNrCarteiraVariacao.option("value", "");
    oTxtNrModalidae.option("value", "");
    oTxtEspecieBoleto.option("value", "");
    oTxtEspecieCNAB.option("value", "");
    oTxtCdComposicaoNossoNumero.option("value", "");
    oTxtCdPostoCooperativaCredito.option("value", "");
    oChkPermiteAlterarDadosReimpressaoBoleto.option("value", false);

    //DESABILITA OS CAMPOS DE DADOS CNAB COBRANÇA
    oNbxNrUltimoArquivoRemessaOutroSistema.option("disabled", true);

    //LIMPA OS CAMPOS DE DADOS DE INSTRUÇÃO BOLETO
    dsInstrucoesBoleto = [];
    oGridInstrucoesBoleto.option("dataSource", []);

    //LIMPA OS CAMPOS DE DADOS CNAB PAGAMENTO
    oTxtNrConvenioPagamento.option("value", "");

    //LIMPA OS CAMPOS DE DADOS INTEGRAÇÃO API PIX
    oLkpFormaPagamentoPix.option("value", null);
    oTxtDsBeneficiarioPix.option("value", "");
    oTxtDsEmailBeneficiarioPix.option("value", "");
    oTxtCdCPFCNPJBeneficiarioPix.option("value", "");
    oTxtCdCEPBeneficiarioPix.option("value", "");
    oLkpMunicipioBeneficiarioPix.option("value", null);
    oTxtCdChavePIX.option("value", "");
    oTxtCdChaveAcessoPix.option("value", "");
    oTxtCdSenhaPix.option("value", "");
    oTxtCdIdentificadorAcessoAPIPix.option("value", "");
    oTxtCdVersaoWebServicePix.option("value", "");
    oTxtCdLoginIntegracaoPix.option("value", "");
    oTxtCdSenhaIntegracaoPix.option("value", "");

    //DESABILITA OS CAMPOS DE DADOS INTEGRAÇÃO API PIX
    oTxtDsBeneficiarioPix.option("disabled", true);
    oTxtDsEmailBeneficiarioPix.option("disabled", true);
    oTxtCdCPFCNPJBeneficiarioPix.option("disabled", true);
    oTxtCdCEPBeneficiarioPix.option("disabled", true);
    oLkpMunicipioBeneficiarioPix.option("disabled", true);
    oTxtCdChavePIX.option("disabled", true);
    oTxtCdChaveAcessoPix.option("disabled", true);
    oTxtCdSenhaPix.option("disabled", true);
    oTxtCdIdentificadorAcessoAPIPix.option("disabled", true);
    oTxtCdVersaoWebServicePix.option("disabled", true);
    oTxtCdLoginIntegracaoPix.option("disabled", true);
    oTxtCdSenhaIntegracaoPix.option("disabled", true);
}

function preencheNomeContaCorrenteTitulo() {
    if ((oLkpAgenciasBancarias.option("selectedItem") == null) && (oTxtCdContaCorrente.option("value").toString().length == 0) && (oTxtCdContaCorrenteDigito.option("value").toString().length == 0) && (oTxtDsContaCorrente.option("value").toString().length == 0)) {
        vNomeContaTitulo = "";
    }
    else {
        vNomeContaTitulo = "";

        if (oLkpAgenciasBancarias.option("selectedItem") != null) {
            vNomeContaTitulo += "Agência: ";
            vNomeContaTitulo += oLkpAgenciasBancarias.option("selectedItem").CD_AGENCIA.toUpperCase();

            if ((oTxtCdContaCorrente.option("value").toString().length > 0) || (oTxtCdContaCorrenteDigito.option("value").toString().length > 0) || (oTxtDsContaCorrente.option("value").toString().length > 0)) {
                vNomeContaTitulo += " / ";
            }
        }

        if ((oTxtCdContaCorrente.option("value").toString().length > 0) || (oTxtCdContaCorrenteDigito.option("value").toString().length > 0)) {
            vNomeContaTitulo += "Conta: ";

            if ((oTxtCdContaCorrente.option("value").toString().length > 0)) {
                vNomeContaTitulo += oTxtCdContaCorrente.option("value").toString().toUpperCase();
            }

            if ((oTxtCdContaCorrente.option("value").toString().length > 0) && (oTxtCdContaCorrenteDigito.option("value").toString().length > 0)) {
                vNomeContaTitulo += "-";
            }

            if ((oTxtCdContaCorrenteDigito.option("value").toString().length > 0)) {
                vNomeContaTitulo += oTxtCdContaCorrenteDigito.option("value").toString().toUpperCase();
            }

            if ((oTxtDsContaCorrente.option("value").toString().length > 0)) {
                vNomeContaTitulo += " / ";
            }
        }

        vNomeContaTitulo += oTxtDsContaCorrente.option("value").toString().toUpperCase();
    }

    oLblNomeContaTituloCadConta.innerText = vNomeContaTitulo.toString();
    //Agência: 1768 / Conta: 125655-6 / Conta PJ Loja 1
}

async function inicializaModulo() {
    //PROCEDIMENTO BUSCAR OS PARÂMETROS E CONFIGURAÇÕES INICIAIS
    await $.ajax({
        type: "POST",
        url: "/Financeiro/CarregaParametrosContaCorrente",
        success: function (responseData) {
            if (responseData.result == "error") {
                oLoadPanel.hide();

                exibeMensagem("error", "Erro ao buscar os parâmetros iniciais", responseData.msg);
            } else {
                if (responseData[0].LG_POSSUI_CONTA_CONFIGURADA == false) {
                    exibirEsconderPaineis('cardPropagandaPIXMenu', 'block');
                }
            }
        },
        fail: function (responseData) {
            oLoadPanel.hide();

            exibeMensagem("error", "Erro ao buscar os parâmetros iniciais", responseData);
        }
    });
}

function clickBannerPix() {
    oLoadPanel.show();

    //PROCEDIMENTO PARA REGISTRAR LOG DE ACESSO AO BANNER
    $.ajax({
        type: "POST",
        url: "/BancoPonte/RegistraVideoLogAcesso",
        data: { pOrigem: "BANNER", pDescOrigem: "Integração Pix (Cadastro Conta Corrente)", pLinkVideo: "/Financeiro/ContaCorrente" },
        success: function (responseData) {
            oLoadPanel.hide();

            window.open('/Financeiro/PixMaisInformacoes', '_blank').focus();
        },
        fail: function (responseData) {
            oLoadPanel.hide();

            window.open('/Financeiro/PixMaisInformacoes', '_blank').focus();
        }
    });
}