//#region [ VARIÁVEIS ]

class classParametroProgramaFidelidade {
    CD_EMPRESA;
    DS_NOME_EMPRESA;
    CD_SEGMENTO;
    LG_RESUMO;
    LG_PROGRAMA_FIDELIDADE_CONFIGURACAO_INICIADA;
    LG_PROGRAMA_FIDELIDADE_ATIVO;
    DT_PROGRAMA_FIDELIDADE_LANCAMENTO;
    DT_PROGRAMA_FIDELIDADE_TERMINO;
    PC_PROGRAMA_FIDELIDADE;
    PC_PROGRAMA_FIDELIDADE_INDICADOR;
    CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_CLIENTES;
    CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_INDICADORES;
    LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_CLIENTE;
    LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_INDICADOR;
    LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_CLIENTE;
    LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_INDICADOR;
}

let objParametroProgramaFidelidade = new classParametroProgramaFidelidade();
objParametroProgramaFidelidade.LG_RESUMO = false;
let processPanel;
let callerShowProcessPanel = '';
let vLoading = false;
let chkParticipantesClientesTodos;
let chkParticipantesClientesPF;
let chkParticipantesClientesPJ;
let chkParticipantesClientesNenhum;
let chkParticipantesClientesSelecionar;
let chkParticipantesClientesTodosParam;
let chkParticipantesClientesPFParam;
let chkParticipantesClientesPJParam;
let chkParticipantesClientesNenhumParam;
let chkParticipantesClientesSelecionarParam;
let chkParticipantesIndicadoresTodos;
let chkParticipantesIndicadoresPF;
let chkParticipantesIndicadoresPJ;
let chkParticipantesIndicadoresNenhum;
let chkParticipantesIndicadoresSelecionar;
let chkParticipantesIndicadoresTodosParam;
let chkParticipantesIndicadoresPFParam;
let chkParticipantesIndicadoresPJParam;
let chkParticipantesIndicadoresNenhumParam;
let chkParticipantesIndicadoresSelecionarParam;
let nbx_Pc_CashBack_Clientes;
let nbx_Pc_CashBack_Indicadores;
let nbx_Pc_CashBack_ClientesParam;
let nbx_Pc_CashBack_IndicadoresParam;
let nbxPercentualGeral;
let chkNaoPermiteRestituicaoCreditoCliente;
let chkPermiteRestituicaoCreditoCliente;
let chkNaoPermiteRestituicaoCreditoIndicadores;
let chkPermiteRestituicaoCreditoIndicadores;
let chkNaoPermiteRestituicaoCreditoClienteParam;
let chkPermiteRestituicaoCreditoClienteParam;
let chkNaoPermiteRestituicaoCreditoIndicadoresParam;
let chkPermiteRestituicaoCreditoIndicadoresParam;
let chkNaoGerarCashBackCreditosUtilizadosCliente;
let chkGerarCashBackCreditosUtilizadosCliente;
let chkNaoGerarCashBackCreditosUtilizadosIndicadores;
let chkGerarCashBackCreditosUtilizadosIndicadores;
let chkNaoGerarCashBackCreditosUtilizadosClienteParam;
let chkGerarCashBackCreditosUtilizadosClienteParam;
let chkNaoGerarCashBackCreditosUtilizadosIndicadoresParam;
let chkGerarCashBackCreditosUtilizadosIndicadoresParam;
let vChk_Ativar_Programa;
let vChk_Ativar_Programa_Param;
let vDt_Inicio_Programa;
let vDt_Inicio_Programa_Param;
let vDt_Termino_Programa;
let vDt_Termino_Programa_Param;
let vSuprimeEventoOnChange = false;

let gridBoxClientesNaoHabilitados;
let gridClientesNaoHabilitados;
let gridBoxClientesNaoHabilitadosParam;
let gridClientesNaoHabilitadosParam;
let gridClientesHabilitados;
let gridClientesHabilitadosParam;
let gridBoxClientesNaoBloqueados;
let gridClientesNaoBloqueados;
let gridBoxClientesNaoBloqueadosParam;
let gridClientesNaoBloqueadosParam;
let gridClientesBloqueados;
let gridClientesBloqueadosParam;

let gridBoxIndicadoresNaoHabilitados;
let gridIndicadoresNaoHabilitados;
let gridBoxIndicadoresNaoHabilitadosParam;
let gridIndicadoresNaoHabilitadosParam;
let gridIndicadoresHabilitados;
let gridIndicadoresHabilitadosParam;
let gridBoxIndicadoresNaoBloqueados;
let gridIndicadoresNaoBloqueados;
let gridBoxIndicadoresNaoBloqueadosParam;
let gridIndicadoresNaoBloqueadosParam;
let gridIndicadoresBloqueados;
let gridIndicadoresBloqueadosParam;

let gridFiliais;
let gridFiliaisParam;
let gridFiliaisPercentuaisDiferenciados;
let gridFiliaisPercentuaisDiferenciadosParam;
let treeFamiliasPercentuaisDiferenciados;
let treeFamiliasPercentuaisDiferenciadosParam;
let gridProdutosDiferenciados;
let gridProdutosDiferenciadosParam;

let dataSourceFiliais;
var dataSourceFiltroConsultaDetalhada = [
    { CD_STATUS: 'A', DS_STATUS: "Ativos" },
    { CD_STATUS: 'I', DS_STATUS: "Inativos" },
    { CD_STATUS: null, DS_STATUS: "Todos" },
];

const animateCSS = (elements, animation, operacao = 'in', duration = 400, prefix = 'animate__') =>
    new Promise((resolve, reject) => {
        elements = !Array.isArray(elements) ? [elements] : elements;
        const animationName = `${prefix}${animation}`;

        elements.forEach((element, index) => {
            const node = document.querySelector(element);
            node.style.animationDuration = duration + 'ms';
            node.classList.add(`${prefix}animated`, animationName);
            node.addEventListener('animationend', handleAnimationEnd, { once: true });
            if (operacao == 'in')
                $(element).show();
            function handleAnimationEnd(event) {
                event.stopPropagation();
                node.classList.remove(`${prefix}animated`, animationName);
                if (operacao == 'out') $(element).hide();
                if (index == elements.length - 1) resolve('Animation ended');
            }
        });
    });

//#endregion [ VARIÁVEIS ]

$(document).ready(async function inicio() {
    showProcessPanel("Carregando...", arguments.callee.name);

    vLoading = true;

    FormatButtons();

    await Promise.all([
        //Clientes não habilitados no programa de fidelidade
        gridBoxClientesNaoHabilitados = $('#gridBoxClientesNaoHabilitados').dxDropDownBox({
            valueExpr: 'CD_CPF_CNPJ',
            displayExpr: 'CD_CPF_CNPJ',
            labelMode: 'floating',
            label: '',
            placeholder: '+ Clique para selecionar os clientes',
            elementAttr: {
                class: 'gridbox-font',
            },
            showClearButton: true,
            dataSource: [],
            deferRendering: false,
            dropDownOptions: {
                animation: {
                    show: {
                        type: "slide",
                        from: { opacity: 0, top: 100 },
                        to: {
                            opacity: 1,
                        }
                    },
                    hide: {
                        type: "slide",
                        from: { opacity: 1, top: 100 },
                        to: {
                            opacity: 0,
                        }
                    }
                },
                onShowing: async function (e) {
                    await this.fnPromise;
                    e.component.repaint();
                },
                onOptionChanged: function (e) {
                    if (e.name != "visible") return;
                    if (!e.value) return;
                    $("#cardClientesParticipantesHeader").hide();
                    $("#cardClientesParticipantesCampos").hide();
                    this.fnPromise = $('#cardSelecaoHabilitarClientes').animate({ top: 0 }, {
                        complete: () => {
                            e.component.refreshPosition();
                        },
                    }).promise();
                },
                onHiding: function (e) {
                    $("#cardClientesParticipantesHeader").show();
                    $("#cardClientesParticipantesCampos").show();
                },
            //    onShowing: async (e) => {
            //        e.component._$wrapper.css('z-index', 998);
            //        await this.fnPromise;
            //    },
            //    onOptionChanged: (e) => {
            //        if (e.name != 'visible') return;
            //        if (!e.value) return;
            //        const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardClientesParticipantes')[0].getBoundingClientRect().top;
            //        this.fnPromise = $('#cardClientesParticipantes').animate({ top: diffTop }, {
            //            complete: () => e.component.refreshPosition(),
            //        }).promise();
            //    },
            //    onHiding: (e) => $('#cardClientesParticipantes').animate({ top: 0 }),
            },
            contentTemplate(e) {
                const value = e.component.option('value');
                const $dataGrid = $('<div>').dxDataGrid({
                    dataSource: e.component.getDataSource(),
                    searchExpr: ['CD_CPF_CNPJ'],
                    displayExpr: 'CD_CPF_CNPJ',
                    valueExpr: 'CD_CPF_CNPJ',
                    wordWrapEnabled: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    searchPanel: {
                        visible: true,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    editing: {
                        mode: 'batch',
                        allowUpdating: true,
                        startEditAction: 'click',
                        allowAdding: false,
                        allowDeleting: false,
                        useIcons: false,
                    },
                    loadPanel: { enabled: true, },
                    sorting: { mode: "multiple" },
                    allowColumnResizing: true,
                    columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                    selection: {
                        mode: 'multiple',
                        showCheckBoxesMode: 'always',
                    },
                    keyboardNavigation: {
                        enterKeyAction: 'moveFocus',
                        enterKeyDirection: 'column',
                        editOnKeyPress: true,
                    },
                    focusedRowEnabled: false,
                    hoverStateEnabled: true,
                    paging: { pageSize: 25 },
                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: true },
                    columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
                    columnsAutoWidth: true,
                    cellHintEnabled: true,
                    keyExpr: ['CD_CPF_CNPJ'],
                    columns: [
                        {
                            type: "selection",
                            width: 30,
                        },
                        { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                        { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                        { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                        { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                        { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                        { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                        { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                        { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                        { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                        { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "PC_PROGRAMA_FILIDADE", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    ],
                    toolbar: {
                        items: [
                            {
                                location: 'after',
                                widget: 'dxButton',
                                options: {
                                    type: 'success',
                                    text: 'Adicionar Clientes',
                                    hint: "Adicionar clientes selecionados",
                                    width: 150,
                                    icon: 'save',
                                    onClick: async (e) => {
                                        showProcessPanel("Salvando...", "gridBoxClientesNaoHabilitados");
                                        if (await saveClientesIndicadores("CLIENTE", "HABILITAR", false) == true) {
                                            //REMOVE AS LINHAS SELECIONADAS
                                            gridClientesNaoHabilitados.getSelectedRowKeys().forEach((key) => {
                                                gridClientesNaoHabilitados.getDataSource().store().remove(key);
                                            });
                                            gridClientesNaoHabilitados.refresh();

                                            //FECHA O GRIDBOX
                                            gridBoxClientesNaoHabilitados.close();
                                            gridBoxClientesNaoHabilitados.option("value", null);

                                            await Promise.all([
                                                carregaGridClientesHabilitados(),
                                                carregaGridClientesIndicadoresPercentuaisDiferenciados()
                                            ]);
                                        }
                                        hideProcessPanel("gridBoxClientesNaoHabilitados");
                                    },

                                },
                            },
                            'groupPanel',
                            'columnChooserButton',
                            'searchPanel',
                        ],
                    },
                    showBorders: true,
                    onCellPrepared: function (e) {
                        if (e.rowType === "data") {

                            if (e.column.dataField === "DS_STATUS") {
                                if (e.value === "Inativo") {
                                    e.cellElement.css("color", "#d00000");
                                    e.cellElement.css("font-weight", "bold");
                                };
                            }

                            if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE") {
                                if (e.value === "Sim") {
                                    e.cellElement.css("color", "#b23a48");
                                    e.cellElement.css("background-color", "#fae0e4");
                                };
                            }

                        }
                    },
                    paging: { enabled: true, pageSize: 10 },
                    scrolling: { mode: 'virtual' },
                    height: '100%',
                    //onSelectionChanged(selectedItems) {
                    //    listClientesSelecionadosHabilitar = selectedItems.selectedRowKeys;
                    //    gridBoxClientesNaoHabilitados.option("value", listClientesSelecionadosHabilitar.map((obj) => obj.CD_CPF_CNPJ));
                    //},
                    stateStoring: AutoLoad("gridBoxClientesNaoHabilitados", false),
                    onToolbarPreparing: AutoResetState([]),
                });
                gridClientesNaoHabilitados = $dataGrid.dxDataGrid('instance');
                return $dataGrid;
            },
        }).dxDropDownBox('instance'),

        gridBoxClientesNaoHabilitadosParam = $('#gridBoxClientesNaoHabilitadosParam').dxDropDownBox({
            valueExpr: 'CD_CPF_CNPJ',
            displayExpr: 'CD_CPF_CNPJ',
            labelMode: 'floating',
            label: '',
            placeholder: '+ Clique para selecionar os clientes',
            elementAttr: {
                class: 'gridbox-font-md',
            },
            showClearButton: true,
            dataSource: [],
            deferRendering: false,
            dropDownOptions: {
                animation: {
                    show: {
                        type: "slide",
                        from: { opacity: 0, top: 100 },
                        to: {
                            opacity: 1,
                        }
                    },
                    hide: {
                        type: "slide",
                        from: { opacity: 1, top: 100 },
                        to: {
                            opacity: 0,
                        }
                    }
                },
                onShowing: async function (e) {
                    await this.fnPromise;
                    e.component.repaint();
                },
                onOptionChanged: function (e) {
                    if (e.name != "visible") return;
                    if (!e.value) return;
                    $("#abaClientesParticipantesCampos").hide();
                    this.fnPromise = $('#cardSelecaoHabilitarClientesParam').animate({ top: 0 }, {
                        complete: () => {
                            e.component.refreshPosition();
                        },
                    }).promise();
                },
                onHiding: function (e) {
                    $("#abaClientesParticipantesCampos").show();
                },
            },
            contentTemplate(e) {
                const value = e.component.option('value');
                const dataGrid = $('<div>').dxDataGrid({
                    dataSource: e.component.getDataSource(),
                    searchExpr: ['CD_CPF_CNPJ'],
                    displayExpr: 'CD_CPF_CNPJ',
                    valueExpr: 'CD_CPF_CNPJ',
                    wordWrapEnabled: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    searchPanel: {
                        visible: true,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    editing: {
                        mode: 'batch',
                        allowUpdating: true,
                        startEditAction: 'click',
                        allowAdding: false,
                        allowDeleting: false,
                        useIcons: false,
                    },
                    loadPanel: { enabled: true, },
                    sorting: { mode: "multiple" },
                    allowColumnResizing: true,
                    columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                    selection: {
                        mode: 'multiple',
                        showCheckBoxesMode: 'always',
                    },
                    keyboardNavigation: {
                        enterKeyAction: 'moveFocus',
                        enterKeyDirection: 'column',
                        editOnKeyPress: true,
                    },
                    focusedRowEnabled: false,
                    hoverStateEnabled: true,
                    paging: { pageSize: 25 },
                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: true },
                    columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
                    columnsAutoWidth: true,
                    cellHintEnabled: true,
                    keyExpr: ['CD_CPF_CNPJ'],
                    columns: [
                        {
                            type: "selection",
                            width: 30,
                        },
                        { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                        { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                        { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                        { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                        { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                        { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                        { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "PC_PROGRAMA_FILIDADE", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    ],
                    toolbar: {
                        items: [
                            {
                                location: 'after',
                                widget: 'dxButton',
                                options: {
                                    type: 'success',
                                    text: 'Adicionar Clientes',
                                    hint: "Adicionar clientes selecionados",
                                    width: 150,
                                    icon: 'save',
                                    onClick: async (e) => {
                                        showProcessPanel("Salvando...", "gridBoxClientesNaoHabilitadosParam");
                                        if (await saveClientesIndicadores("CLIENTE", "HABILITAR", true) == true) {
                                            //REMOVE AS LINHAS SELECIONADAS
                                            gridClientesNaoHabilitadosParam.getSelectedRowKeys().forEach((key) => {
                                                gridClientesNaoHabilitadosParam.getDataSource().store().remove(key);
                                            });
                                            gridClientesNaoHabilitadosParam.refresh();

                                            //FECHA O GRIDBOX
                                            gridBoxClientesNaoHabilitadosParam.close();
                                            gridBoxClientesNaoHabilitadosParam.option("value", null);

                                            await Promise.all([
                                                carregaGridClientesHabilitados(),
                                                carregaGridClientesIndicadoresPercentuaisDiferenciados()
                                            ]);
                                        }
                                        hideProcessPanel("gridBoxClientesNaoHabilitadosParam");
                                    },
                                },
                            },
                            'groupPanel',
                            'columnChooserButton',
                            'searchPanel',
                        ],
                    },
                    showBorders: true,
                    onCellPrepared: function (e) {
                        if (e.rowType === "data") {

                            if (e.column.dataField === "DS_STATUS") {
                                if (e.value === "Inativo") {
                                    e.cellElement.css("color", "#d00000");
                                    e.cellElement.css("font-weight", "bold");
                                };
                            }

                            if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE") {
                                if (e.value === "Sim") {
                                    e.cellElement.css("color", "#b23a48");
                                    e.cellElement.css("background-color", "#fae0e4");
                                };
                            }

                        }
                    },
                    paging: { enabled: true, pageSize: 10 },
                    scrolling: { mode: 'virtual' },
                    height: '100%',
                    //onSelectionChanged(selectedItems) {
                    //    listClientesSelecionadosHabilitar = selectedItems.selectedRowKeys;
                    //    gridBoxClientesNaoHabilitadosParam.option("value", listClientesSelecionadosHabilitar.map((obj) => obj.Cd_Produto))
                    //},
                    stateStoring: AutoLoad("gridBoxClientesNaoHabilitadosParam", false),
                    onToolbarPreparing: AutoResetState([]),
                });
                gridClientesNaoHabilitadosParam = dataGrid.dxDataGrid('instance');

                return dataGrid;
            },
        }).dxDropDownBox('instance'),

        //Clientes habilitados no programa de fidelidade
        gridClientesHabilitados = $("#gridClientesHabilitados").dxDataGrid({
            dataSource: [],
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            columnHidingEnabled: true,
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            sorting: { mode: "multiple" },
            selection: {
                mode: 'multiple',
                allowSelectAll: true,
                showCheckBoxesMode: 'always',
                deferred: false,
            },
            focusedRowEnabled: true,
            allowColumnResizing: true,
            allowColumnReordering: true,
            groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
            paging: { pageSize: 10 },
            pager: {
                visible: true,
                allowedPageSizes: [10, 15, 20, 50, 100],
                showPageSizeSelector: true,
                showNavigationButtons: true
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('ClientesHabilitados');

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadeClientesHabilitados.xlsx');
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
            columnChooser: {
                enabled: true,
                allowSearch: true,
                height: 500,
                position: {
                    my: 'right top',
                    at: 'right bottom',
                    of: '.dx-datagrid-column-chooser-button',
                },

            },
            columnsAutoWidth: true,
            stateStoring: AutoLoad("gridClientesHabilitados", false),
            keyExpr: 'CD_CPF_CNPJ',
            columns: [
                {
                    type: "selection",
                    dataField: "CD_SELECAO",
                    width: 30,
                    value: false,
                    allowHiding: false,
                },
                { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "PC_PROGRAMA_FILIDADE", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
            ],

            showBorders: true,

            onCellPrepared: function (e) {

                if (e.rowType === "data") {
                    if (e.column.dataField === "DS_STATUS") {
                        if (e.value === "Inativo") {
                            e.cellElement.css("color", "#d00000");
                            e.cellElement.css("font-weight", "bold");
                        };
                    }

                    if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE") {
                        if (e.value === "Sim") {
                            e.cellElement.css("color", "#b23a48");
                            e.cellElement.css("background-color", "#fae0e4");
                        };
                    }
                }
            },

            toolbar: {
                items: [
                    {
                        location: 'after',
                        widget: 'dxLookup',
                        options: {
                            dataSource: dataSourceFiltroConsultaDetalhada,
                            searchExpr: ['DS_STATUS'],
                            displayExpr: 'DS_STATUS',
                            valueExpr: 'CD_STATUS',
                            value: null,
                            hint: 'Filtro de Clientes por Status',
                            width: 80,
                            elementAttr: {
                                class: 'filtro-consultal-detalhada',
                                id: 'lkpStatusClientesHabilitados',
                            },

                            dropDownOptions: {
                                closeOnOutsideClick: true,
                                showTitle: false,
                                title: 'Filtro por Status',
                            },
                            placeholder: 'Filtro',
                            showClearButton: false,
                            onValueChanged: async function (e) {

                                if (e.value == 'I') {
                                    e.component.option('elementAttr', { class: 'filtro-consultal-detalhada-inativos' });
                                } else {
                                    //e.component.option('elementAttr', {class: 'filtro_titulos_parcial'});
                                    e.component.option('elementAttr', { class: 'filtro-consultal-detalhada' });
                                };

                                showProcessPanel("Carregando...", "gridClientesHabilitados");
                                await carregaGridClientesHabilitados()
                                hideProcessPanel("gridClientesHabilitados");
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'auto',
                        options: {
                            icon: 'hierarchy',
                            text: 'Fechar Agrupamento',
                            hint: 'Fechar ou expandir os agrupamentos',
                            onClick(e) {
                                const expanding = e.component.option('text') === 'Expandir Agrupamento';
                                gridClientesHabilitados.option('grouping.autoExpandAll', expanding);
                                e.component.option('text', expanding ? 'Fechar Agrupamento' : 'Expandir Agrupamento');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'auto',
                        options: {
                            type: 'danger',
                            icon: 'trash',
                            text: 'Excluir Clientes',
                            hint: 'Excluir registros selecionados',
                            onClick: async (e) => {
                                var result = DevExpress.ui.dialog.confirm("Deseja realmente excluir os registros selecionados?", "Confirmação");
                                result.done(async function (dialogResult) {
                                    showProcessPanel("Salvando...", "gridClientesHabilitados");
                                    if (await saveClientesIndicadores("CLIENTE", "DESABILITAR", false) == true) {
                                        //REMOVE AS LINHAS SELECIONADAS
                                        gridClientesHabilitados.getSelectedRowKeys().forEach((key) => {
                                            gridClientesHabilitados.getDataSource().store().remove(key);
                                        });
                                        gridClientesHabilitados.refresh();

                                        await Promise.all([
                                            carregaGridBoxClientesNaoHabilitados(),
                                            carregaGridClientesIndicadoresPercentuaisDiferenciados()
                                        ]);
                                    }
                                    hideProcessPanel("gridClientesHabilitados");
                                });
                            },
                        },
                    },
                    {
                        name: "groupPanel",
                        locateInMenu: "auto",
                    },
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
                                        gridClientesHabilitados.state({});
                                        gridClientesHabilitados.refresh();

                                        gridClientesHabilitados.updateDimensions();
                                    }
                                });
                            }
                        }
                    },
                    'exportButton',
                    'columnChooserButton',
                    'searchPanel',
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

        }).dxDataGrid('instance'),

        gridClientesHabilitadosParam = $("#gridClientesHabilitadosParam").dxDataGrid({
            dataSource: [],
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            columnHidingEnabled: true,
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            sorting: { mode: "multiple" },
            selection: {
                mode: 'multiple',
                allowSelectAll: true,
                showCheckBoxesMode: 'always',
                deferred: false,
            },
            focusedRowEnabled: true,
            allowColumnResizing: true,
            allowColumnReordering: true,
            groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
            paging: { pageSize: 10 },
            pager: {
                visible: true,
                allowedPageSizes: [10, 15, 20, 50, 100],
                showPageSizeSelector: true,
                showNavigationButtons: true
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('ClientesHabilitados');

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadeClientesHabilitados.xlsx');
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
            columnChooser: {
                enabled: true,
                allowSearch: true,
                height: 500,
                position: {
                    my: 'right top',
                    at: 'right bottom',
                    of: '.dx-datagrid-column-chooser-button',
                },

            },
            columnsAutoWidth: true,
            stateStoring: AutoLoad("gridClientesHabilitados", false),
            keyExpr: 'CD_CPF_CNPJ',
            columns: [
                {
                    type: "selection",
                    dataField: "CD_SELECAO",
                    width: 30,
                    value: false,
                    allowHiding: false,
                },
                { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "PC_PROGRAMA_FILIDADE", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
            ],

            showBorders: true,

            onCellPrepared: function (e) {

                if (e.rowType === "data") {
                    if (e.column.dataField === "DS_STATUS") {
                        if (e.value === "Inativo") {
                            e.cellElement.css("color", "#d00000");
                            e.cellElement.css("font-weight", "bold");
                        };
                    }

                    if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE") {
                        if (e.value === "Sim") {
                            e.cellElement.css("color", "#b23a48");
                            e.cellElement.css("background-color", "#fae0e4");
                        };
                    }
                }
            },

            toolbar: {
                items: [
                    {
                        location: 'after',
                        widget: 'dxLookup',
                        options: {
                            dataSource: dataSourceFiltroConsultaDetalhada,
                            searchExpr: ['DS_STATUS'],
                            displayExpr: 'DS_STATUS',
                            valueExpr: 'CD_STATUS',
                            value: null,
                            hint: 'Filtro de Clientes por Status',
                            width: 80,
                            elementAttr: {
                                class: 'filtro-consultal-detalhada',
                                id: 'lkpStatusClientesHabilitadosParam',
                            },

                            dropDownOptions: {
                                closeOnOutsideClick: true,
                                showTitle: false,
                                title: 'Filtro por Status',
                            },
                            placeholder: 'Filtro',
                            showClearButton: false,
                            onValueChanged: async function (e) {

                                if (e.value == 'I') {
                                    e.component.option('elementAttr', { class: 'filtro-consultal-detalhada-inativos' });
                                } else {
                                    //e.component.option('elementAttr', {class: 'filtro_titulos_parcial'});
                                    e.component.option('elementAttr', { class: 'filtro-consultal-detalhada' });
                                };

                                showProcessPanel("Carregando...", "gridClientesHabilitadosParam");
                                await carregaGridClientesHabilitados()
                                hideProcessPanel("gridClientesHabilitadosParam");
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'auto',
                        options: {
                            type: 'danger',
                            icon: 'trash',
                            text: 'Excluir Clientes',
                            hint: 'Excluir registros selecionados',
                            onClick: async (e) => {
                                var result = DevExpress.ui.dialog.confirm("Deseja realmente excluir os registros selecionados?", "Confirmação");
                                result.done(async function (dialogResult) {
                                    showProcessPanel("Salvando...", "gridClientesHabilitadosParam");
                                    if (await saveClientesIndicadores("CLIENTE", "DESABILITAR", true) == true) {
                                        //REMOVE AS LINHAS SELECIONADAS
                                        gridClientesHabilitadosParam.getSelectedRowKeys().forEach((key) => {
                                            gridClientesHabilitadosParam.getDataSource().store().remove(key);
                                        });
                                        gridClientesHabilitadosParam.refresh();

                                        await Promise.all([
                                            carregaGridBoxClientesNaoHabilitados(),
                                            carregaGridClientesIndicadoresPercentuaisDiferenciados()
                                        ]);
                                    }
                                    hideProcessPanel("gridClientesHabilitadosParam");
                                });
                            },
                        },
                    },
                    {
                        name: "groupPanel",
                        locateInMenu: "auto",
                    },
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
                                        gridClientesHabilitadosParam.state({});
                                        gridClientesHabilitadosParam.refresh();

                                        gridClientesHabilitadosParam.updateDimensions();
                                    }
                                });
                            }
                        }
                    },
                    'exportButton',
                    'columnChooserButton',
                    'searchPanel',
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

        }).dxDataGrid('instance'),

        //Clientes não bloqueados no programa de fidelidade
        gridBoxClientesNaoBloqueados = $('#gridBoxClientesNaoBloqueados').dxDropDownBox({
            valueExpr: 'CD_CPF_CNPJ',
            displayExpr: 'CD_CPF_CNPJ',
            labelMode: 'floating',
            label: '',
            placeholder: '+ Clique para selecionar os clientes a serem bloqueados no programa de fidelidade',
            elementAttr: {
                class: 'gridbox-font',
            },
            showClearButton: true,
            dataSource: [],
            deferRendering: false,
            dropDownOptions: {
                animation: {
                    show: {
                        type: "slide",
                        from: { opacity: 0, top: 100 },
                        to: {
                            opacity: 1,
                        }
                    },
                    hide: {
                        type: "slide",
                        from: { opacity: 1, top: 100 },
                        to: {
                            opacity: 0,
                        }
                    }
                },
                onShowing: async function (e) {
                    await this.fnPromise;
                    e.component.repaint();
                },
                onOptionChanged: function (e) {
                    if (e.name != "visible") return;
                    if (!e.value) return;
                    $("#cardClientesBloqueadosHeader").hide();
                    this.fnPromise = $('#cardSelecaoBloquearClientes').animate({ top: 0 }, {
                        complete: () => {
                            e.component.refreshPosition();
                        },
                    }).promise();
                },
                onHiding: function (e) {
                    $("#cardClientesBloqueadosHeader").show();
                },
            },
            contentTemplate(e) {
                const value = e.component.option('value');
                const dataGrid = $('<div>').dxDataGrid({
                    dataSource: e.component.getDataSource(),
                    searchExpr: ['CD_CPF_CNPJ'],
                    displayExpr: 'CD_CPF_CNPJ',
                    valueExpr: 'CD_CPF_CNPJ',
                    wordWrapEnabled: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    searchPanel: {
                        visible: true,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    editing: {
                        mode: 'batch',
                        allowUpdating: true,
                        startEditAction: 'click',
                        allowAdding: false,
                        allowDeleting: false,
                        useIcons: false,
                    },
                    loadPanel: { enabled: true, },
                    sorting: { mode: "multiple" },
                    allowColumnResizing: true,
                    columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                    selection: {
                        mode: 'multiple',
                        showCheckBoxesMode: 'always',
                    },
                    keyboardNavigation: {
                        enterKeyAction: 'moveFocus',
                        enterKeyDirection: 'column',
                        editOnKeyPress: true,
                    },
                    focusedRowEnabled: false,
                    hoverStateEnabled: true,
                    paging: { pageSize: 25 },
                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: true },
                    columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
                    columnsAutoWidth: true,
                    cellHintEnabled: true,
                    keyExpr: ['CD_CPF_CNPJ'],
                    columns: [
                        {
                            type: "selection",
                            width: 30,
                        },
                        { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                        { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                        { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                        { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                        { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                        { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                        { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                        { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                        { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                        { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "PC_PROGRAMA_FILIDADE", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    ],
                    toolbar: {
                        items: [
                            {
                                location: 'after',
                                widget: 'dxButton',
                                options: {
                                    type: 'danger',
                                    text: 'Bloquear Clientes',
                                    hint: "Bloquear clientes selecionados",
                                    width: 150,
                                    icon: 'save',
                                    onClick: async (e) => {
                                        showProcessPanel("Salvando...", "gridBoxClientesNaoBloqueados");
                                        if (await saveClientesIndicadores("CLIENTE", "BLOQUEAR", false) == true) {
                                            //REMOVE AS LINHAS SELECIONADAS
                                            gridClientesNaoBloqueados.getSelectedRowKeys().forEach((key) => {
                                                gridClientesNaoBloqueados.getDataSource().store().remove(key);
                                            });
                                            gridClientesNaoBloqueados.refresh();

                                            //FECHA O GRIDBOX
                                            gridBoxClientesNaoBloqueados.close();
                                            gridBoxClientesNaoBloqueados.option("value", null);

                                            await Promise.all([
                                                carregaGridClientesBloqueados(),
                                                carregaGridClientesIndicadoresPercentuaisDiferenciados()
                                            ]);
                                        }
                                        hideProcessPanel("gridBoxClientesNaoBloqueados");
                                    },

                                },
                            },
                            'groupPanel',
                            'revertButton',
                            'columnChooserButton',
                            'searchPanel',
                        ],
                    },
                    showBorders: true,
                    onCellPrepared: function (e) {
                        if (e.rowType === "data") {

                            if (e.column.dataField === "DS_STATUS") {
                                if (e.value === "Inativo") {
                                    e.cellElement.css("color", "#d00000");
                                    e.cellElement.css("font-weight", "bold");
                                };
                            }

                            if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE") {
                                if (e.value === "Sim") {
                                    e.cellElement.css("color", "#b23a48");
                                    e.cellElement.css("background-color", "#fae0e4");
                                };
                            }

                        }
                    },
                    paging: { enabled: true, pageSize: 10 },
                    scrolling: { mode: 'virtual' },
                    height: '100%',
                    //onSelectionChanged(selectedItems) {
                    //    listClientesSelecionadosHabilitar = selectedItems.selectedRowKeys;
                    //    gridBoxClientesNaoHabilitados.option("value", listClientesSelecionadosHabilitar.map((obj) => obj.CD_CPF_CNPJ));
                    //},
                    stateStoring: AutoLoad("gridBoxClientesNaoHabilitados", false),

                    onToolbarPreparing: AutoResetState([]),
                });
                gridClientesNaoBloqueados = dataGrid.dxDataGrid('instance');

                return dataGrid;
            },
        }).dxDropDownBox('instance'),

        gridBoxClientesNaoBloqueadosParam = $('#gridBoxClientesNaoBloqueadosParam').dxDropDownBox({
            valueExpr: 'CD_CPF_CNPJ',
            displayExpr: 'CD_CPF_CNPJ',
            labelMode: 'floating',
            label: '',
            placeholder: '+ Clique para selecionar os clientes a serem bloqueados no programa de fidelidade',
            elementAttr: {
                class: 'gridbox-font-md',
            },
            showClearButton: true,
            dataSource: [],
            deferRendering: false,
            dropDownOptions: {
                animation: {
                    show: {
                        type: "slide",
                        from: { opacity: 0, top: 100 },
                        to: {
                            opacity: 1,
                        }
                    },
                    hide: {
                        type: "slide",
                        from: { opacity: 1, top: 100 },
                        to: {
                            opacity: 0,
                        }
                    }
                },
            },
            contentTemplate(e) {
                const value = e.component.option('value');
                const dataGrid = $('<div>').dxDataGrid({
                    dataSource: e.component.getDataSource(),
                    searchExpr: ['CD_CPF_CNPJ'],
                    displayExpr: 'CD_CPF_CNPJ',
                    valueExpr: 'CD_CPF_CNPJ',
                    wordWrapEnabled: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    searchPanel: {
                        visible: true,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    editing: {
                        mode: 'batch',
                        allowUpdating: true,
                        startEditAction: 'click',
                        allowAdding: false,
                        allowDeleting: false,
                        useIcons: false,
                    },
                    loadPanel: { enabled: true, },
                    sorting: { mode: "multiple" },
                    allowColumnResizing: true,
                    columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                    selection: {
                        mode: 'multiple',
                        showCheckBoxesMode: 'always',
                    },
                    keyboardNavigation: {
                        enterKeyAction: 'moveFocus',
                        enterKeyDirection: 'column',
                        editOnKeyPress: true,
                    },
                    focusedRowEnabled: false,
                    hoverStateEnabled: true,
                    paging: { pageSize: 25 },
                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: true },
                    columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
                    columnsAutoWidth: true,
                    cellHintEnabled: true,
                    keyExpr: ['CD_CPF_CNPJ'],
                    columns: [
                        {
                            type: "selection",
                            width: 30,
                        },
                        { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                        { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                        { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                        { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                        { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                        { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                        { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "PC_PROGRAMA_FILIDADE", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    ],
                    toolbar: {
                        items: [
                            {
                                location: 'after',
                                widget: 'dxButton',
                                options: {
                                    type: 'danger',
                                    text: 'Bloquear Clientes',
                                    hint: "Bloquear clientes selecionados",
                                    width: 150,
                                    icon: 'save',
                                    onClick: async (e) => {
                                        showProcessPanel("Salvando...", "gridBoxClientesNaoBloqueadosParam");
                                        if (await saveClientesIndicadores("CLIENTE", "BLOQUEAR", true) == true) {
                                            //REMOVE AS LINHAS SELECIONADAS
                                            gridClientesNaoBloqueadosParam.getSelectedRowKeys().forEach((key) => {
                                                gridClientesNaoBloqueadosParam.getDataSource().store().remove(key);
                                            });
                                            gridClientesNaoBloqueadosParam.refresh();

                                            //FECHA O GRIDBOX
                                            gridBoxClientesNaoBloqueadosParam.close();
                                            gridBoxClientesNaoBloqueadosParam.option("value", null);

                                            await Promise.all([
                                                carregaGridClientesBloqueados(),
                                                carregaGridClientesIndicadoresPercentuaisDiferenciados()
                                            ]);
                                        }
                                        hideProcessPanel("gridBoxClientesNaoBloqueadosParam");
                                    },

                                },
                            },
                            'groupPanel',
                            'revertButton',
                            'columnChooserButton',
                            'searchPanel',
                        ],
                    },
                    showBorders: true,
                    onCellPrepared: function (e) {
                        if (e.rowType === "data") {

                            if (e.column.dataField === "DS_STATUS") {
                                if (e.value === "Inativo") {
                                    e.cellElement.css("color", "#d00000");
                                    e.cellElement.css("font-weight", "bold");
                                };
                            }

                            if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE") {
                                if (e.value === "Sim") {
                                    e.cellElement.css("color", "#b23a48");
                                    e.cellElement.css("background-color", "#fae0e4");
                                };
                            }

                        }
                    },
                    paging: { enabled: true, pageSize: 10 },
                    scrolling: { mode: 'virtual' },
                    height: '100%',
                    //onSelectionChanged(selectedItems) {
                    //    gridBoxClientesNaoBloqueadosParam = selectedItems.selectedRowKeys;
                    //    gridBoxClientesNaoBloqueadosParam.option("value", listClientesSelecionadosHabilitar.map((obj) => obj.CD_CPF_CNPJ));
                    //},
                    stateStoring: AutoLoad("gridBoxClientesNaoBloqueadosParam", false),

                    onToolbarPreparing: AutoResetState([]),
                });
                gridClientesNaoBloqueadosParam = dataGrid.dxDataGrid('instance');

                return dataGrid;
            },
        }).dxDropDownBox('instance'),

        //Clientes bloqueados no programa de fidelidade
        gridClientesBloqueados = $("#gridClientesBloqueados").dxDataGrid({
            dataSource: [],
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            columnHidingEnabled: true,
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            sorting: { mode: "multiple" },
            selection: {
                mode: 'multiple',
                allowSelectAll: true,
                showCheckBoxesMode: 'always',
                deferred: false,
            },
            focusedRowEnabled: true,
            allowColumnResizing: true,
            allowColumnReordering: true,
            groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
            paging: { pageSize: 10 },
            pager: {
                visible: true,
                allowedPageSizes: [10, 15, 20, 50, 100],
                showPageSizeSelector: true,
                showNavigationButtons: true
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('ClientesBloqueados');

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadeClientesBloqueados.xlsx');
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
            columnChooser: {
                enabled: true,
                allowSearch: true,
                height: 500,
                position: {
                    my: 'right top',
                    at: 'right bottom',
                    of: '.dx-datagrid-column-chooser-button',
                },

            },
            columnsAutoWidth: true,
            stateStoring: AutoLoad("gridClientesBloqueados", false),
            keyExpr: 'CD_CPF_CNPJ',
            columns: [
                {
                    type: "selection",
                    dataField: "CD_SELECAO",
                    width: 30,
                    value: false,
                    allowHiding: false,
                },
                { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "PC_PROGRAMA_FILIDADE", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
            ],

            showBorders: true,

            onCellPrepared: function (e) {

                if (e.rowType === "data") {
                    if (e.column.dataField === "DS_STATUS") {
                        if (e.value === "Inativo") {
                            e.cellElement.css("color", "#d00000");
                            e.cellElement.css("font-weight", "bold");
                        };
                    }

                    if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE") {
                        if (e.value === "Sim") {
                            e.cellElement.css("color", "#b23a48");
                            e.cellElement.css("background-color", "#fae0e4");
                        };
                    }
                }
            },

            toolbar: {
                items: [
                    {
                        location: 'after',
                        widget: 'dxLookup',
                        options: {
                            dataSource: dataSourceFiltroConsultaDetalhada,
                            searchExpr: ['DS_STATUS'],
                            displayExpr: 'DS_STATUS',
                            valueExpr: 'CD_STATUS',
                            value: null,
                            hint: 'Filtro de Clientes por Status',
                            width: 80,
                            elementAttr: {
                                class: 'filtro-consultal-detalhada',
                                id: 'lkpStatusClientesBloqueados',
                            },

                            dropDownOptions: {
                                closeOnOutsideClick: true,
                                showTitle: false,
                                title: 'Filtro por Status',
                            },
                            placeholder: 'Filtro',
                            showClearButton: false,
                            onValueChanged: async function (e) {

                                if (e.value == 'I') {
                                    e.component.option('elementAttr', { class: 'filtro-consultal-detalhada-inativos' });
                                } else {
                                    e.component.option('elementAttr', { class: 'filtro-consultal-detalhada' });
                                };

                                showProcessPanel("Carregando...", "gridClientesBloqueados");
                                await carregaGridClientesBloqueados()
                                hideProcessPanel("gridClientesBloqueados");
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'auto',
                        options: {
                            icon: 'hierarchy',
                            text: 'Fechar Agrupamento',
                            hint: 'Fechar ou expandir os agrupamentos',
                            onClick(e) {
                                const expanding = e.component.option('text') === 'Expandir Agrupamento';
                                gridClientesHabilitados.option('grouping.autoExpandAll', expanding);
                                e.component.option('text', expanding ? 'Fechar Agrupamento' : 'Expandir Agrupamento');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'auto',
                        options: {
                            icon: 'unlock',
                            text: 'Desbloquear Clientes',
                            hint: 'Desbloquear clientes selecionados',
                            onClick: async (e) => {
                                var result = DevExpress.ui.dialog.confirm("Deseja realmente desbloquear os clientes selecionados?", "Confirmação");
                                result.done(async function (dialogResult) {
                                    showProcessPanel("Salvando...", "gridClientesBloqueados");
                                    if (await saveClientesIndicadores("CLIENTE", "DESBLOQUEAR", false) == true) {
                                        //REMOVE AS LINHAS SELECIONADAS
                                        gridClientesBloqueados.getSelectedRowKeys().forEach((key) => {
                                            gridClientesBloqueados.getDataSource().store().remove(key);
                                        });
                                        gridClientesBloqueados.refresh();

                                        await Promise.all([
                                            carregaGridBoxClientesNaoBloqueados(),
                                            carregaGridClientesIndicadoresPercentuaisDiferenciados()
                                        ]);
                                    }
                                    hideProcessPanel("gridClientesBloqueados");
                                });
                            },
                        },
                    },
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
                                        gridClientesBloqueados.state({});
                                        gridClientesBloqueados.refresh();

                                        gridClientesBloqueados.updateDimensions();
                                    }
                                });
                            }
                        }
                    },
                    {
                        name: "groupPanel",
                        locateInMenu: "auto",
                    },
                    'exportButton',
                    'columnChooserButton',
                    'searchPanel',
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

        }).dxDataGrid('instance'),

        gridClientesBloqueadosParam = $("#gridClientesBloqueadosParam").dxDataGrid({
            dataSource: [],
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            columnHidingEnabled: true,
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            sorting: { mode: "multiple" },
            selection: {
                mode: 'multiple',
                allowSelectAll: true,
                showCheckBoxesMode: 'always',
                deferred: false,
            },
            focusedRowEnabled: true,
            allowColumnResizing: true,
            allowColumnReordering: true,
            groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
            paging: { pageSize: 10 },
            pager: {
                visible: true,
                allowedPageSizes: [10, 15, 20, 50, 100],
                showPageSizeSelector: true,
                showNavigationButtons: true
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('ClientesBloqueados');

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadeClientesBloqueados.xlsx');
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
            columnChooser: {
                enabled: true,
                allowSearch: true,
                height: 500,
                position: {
                    my: 'right top',
                    at: 'right bottom',
                    of: '.dx-datagrid-column-chooser-button',
                },

            },
            columnsAutoWidth: true,
            stateStoring: AutoLoad("gridClientesBloqueadosParam", false),
            keyExpr: 'CD_CPF_CNPJ',
            columns: [
                {
                    type: "selection",
                    dataField: "CD_SELECAO",
                    width: 30,
                    value: false,
                    allowHiding: false,
                },
                { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "PC_PROGRAMA_FILIDADE", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
            ],

            showBorders: true,

            onCellPrepared: function (e) {

                if (e.rowType === "data") {
                    if (e.column.dataField === "DS_STATUS") {
                        if (e.value === "Inativo") {
                            e.cellElement.css("color", "#d00000");
                            e.cellElement.css("font-weight", "bold");
                        };
                    }

                    if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE") {
                        if (e.value === "Sim") {
                            e.cellElement.css("color", "#b23a48");
                            e.cellElement.css("background-color", "#fae0e4");
                        };
                    }
                }
            },

            toolbar: {
                items: [
                    {
                        location: 'after',
                        widget: 'dxLookup',
                        options: {
                            dataSource: dataSourceFiltroConsultaDetalhada,
                            searchExpr: ['DS_STATUS'],
                            displayExpr: 'DS_STATUS',
                            valueExpr: 'CD_STATUS',
                            value: null,
                            hint: 'Filtro de Clientes por Status',
                            width: 80,
                            elementAttr: {
                                class: 'filtro-consultal-detalhada',
                                id: 'lkpStatusClientesBloqueadosParam',
                            },

                            dropDownOptions: {
                                closeOnOutsideClick: true,
                                showTitle: false,
                                title: 'Filtro por Status',
                            },
                            placeholder: 'Filtro',
                            showClearButton: false,
                            onValueChanged: async function (e) {

                                if (e.value == 'I') {
                                    e.component.option('elementAttr', { class: 'filtro-consultal-detalhada-inativos' });
                                } else {
                                    e.component.option('elementAttr', { class: 'filtro-consultal-detalhada' });
                                };

                                showProcessPanel("Carregando...", "gridClientesBloqueadosParam");
                                await carregaGridClientesBloqueados()
                                hideProcessPanel("gridClientesBloqueadosParam");
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'auto',
                        options: {
                            icon: 'unlock',
                            text: 'Desbloquear Clientes',
                            hint: 'Desbloquear clientes selecionados',
                            onClick: async (e) => {
                                var result = DevExpress.ui.dialog.confirm("Deseja realmente desbloquear os clientes selecionados?", "Confirmação");
                                result.done(async function (dialogResult) {
                                    showProcessPanel("Salvando...", "gridClientesBloqueadosParam");
                                    if (await saveClientesIndicadores("CLIENTE", "DESBLOQUEAR", true) == true) {
                                        //REMOVE AS LINHAS SELECIONADAS
                                        gridClientesBloqueadosParam.getSelectedRowKeys().forEach((key) => {
                                            gridClientesBloqueadosParam.getDataSource().store().remove(key);
                                        });
                                        gridClientesBloqueadosParam.refresh();

                                        await Promise.all([
                                            carregaGridBoxClientesNaoBloqueados(),
                                            carregaGridClientesIndicadoresPercentuaisDiferenciados()
                                        ]);
                                    }
                                    hideProcessPanel("gridClientesBloqueadosParam");
                                });
                            },
                        },
                    },
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
                                        gridClientesBloqueadosParam.state({});
                                        gridClientesBloqueadosParam.refresh();

                                        gridClientesBloqueadosParam.updateDimensions();
                                    }
                                });
                            }
                        }
                    },
                    {
                        name: "groupPanel",
                        locateInMenu: "auto",
                    },
                    'exportButton',
                    'columnChooserButton',
                    'searchPanel',
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

        }).dxDataGrid('instance'),

        //Indicadores não habilitados no programa de fidelidade
        gridBoxIndicadoresNaoHabilitados = $('#gridBoxIndicadoresNaoHabilitados').dxDropDownBox({
            valueExpr: 'CD_CPF_CNPJ',
            displayExpr: 'CD_CPF_CNPJ',
            labelMode: 'floating',
            label: '',
            placeholder: '+ Clique para selecionar os indicadores',
            elementAttr: {
                class: 'gridbox-font',
            },
            showClearButton: true,
            dataSource: [],
            deferRendering: false,
            dropDownOptions: {
                animation: {
                    show: {
                        type: "slide",
                        from: { opacity: 0, top: 100 },
                        to: {
                            opacity: 1,
                        }
                    },
                    hide: {
                        type: "slide",
                        from: { opacity: 1, top: 100 },
                        to: {
                            opacity: 0,
                        }
                    }
                },
                onShowing: async function (e) {
                    await this.fnPromise;
                    e.component.repaint();
                },
                onOptionChanged: function (e) {
                    if (e.name != "visible") return;
                    if (!e.value) return;
                    $("#cardIndicadoresParticipantesHeader").hide();
                    $("#cardIndicadoresParticipantesCampos").hide();
                    this.fnPromise = $('#cardSelecaoHabilitarIndicadores').animate({ top: 0 }, {
                        complete: () => {
                            e.component.refreshPosition();
                        },
                    }).promise();
                },
                onHiding: function (e) {
                    $("#cardIndicadoresParticipantesHeader").show();
                    $("#cardIndicadoresParticipantesCampos").show();
                },
            },
            contentTemplate(e) {
                const value = e.component.option('value');
                const dataGrid = $('<div>').dxDataGrid({
                    dataSource: e.component.getDataSource(),
                    searchExpr: ['CD_CPF_CNPJ'],
                    displayExpr: 'CD_CPF_CNPJ',
                    valueExpr: 'CD_CPF_CNPJ',
                    wordWrapEnabled: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    searchPanel: {
                        visible: true,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    editing: {
                        mode: 'batch',
                        allowUpdating: true,
                        startEditAction: 'click',
                        allowAdding: false,
                        allowDeleting: false,
                        useIcons: false,
                    },
                    loadPanel: { enabled: true, },
                    sorting: { mode: "multiple" },
                    allowColumnResizing: true,
                    columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                    selection: {
                        mode: 'multiple',
                        showCheckBoxesMode: 'always',
                    },
                    keyboardNavigation: {
                        enterKeyAction: 'moveFocus',
                        enterKeyDirection: 'column',
                        editOnKeyPress: true,
                    },
                    focusedRowEnabled: false,
                    hoverStateEnabled: true,
                    paging: { pageSize: 25 },
                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: true },
                    columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
                    columnsAutoWidth: true,
                    cellHintEnabled: true,
                    keyExpr: ['CD_CPF_CNPJ'],
                    columns: [
                        {
                            type: "selection",
                            width: 30,
                        },
                        { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                        { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                        { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                        { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                        { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                        { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                        { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                        { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                        { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                        { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "PC_PROGRAMA_FILIDADE_INDICADOR", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    ],
                    toolbar: {
                        items: [
                            {
                                location: 'after',
                                widget: 'dxButton',
                                options: {
                                    type: 'success',
                                    text: 'Adicionar Indicadores',
                                    hint: "Adicionar indicadores selecionados",
                                    width: 165,
                                    icon: 'save',
                                    onClick: async (e) => {
                                        showProcessPanel("Salvando...", "gridBoxIndicadoresNaoHabilitados");
                                        if (await saveClientesIndicadores("INDICADOR", "HABILITAR", false) == true) {
                                            //REMOVE AS LINHAS SELECIONADAS
                                            gridIndicadoresNaoHabilitados.getSelectedRowKeys().forEach((key) => {
                                                gridIndicadoresNaoHabilitados.getDataSource().store().remove(key);
                                            });
                                            gridIndicadoresNaoHabilitados.refresh();

                                            //FECHA O GRIDBOX
                                            gridBoxIndicadoresNaoHabilitados.close();
                                            gridBoxIndicadoresNaoHabilitados.option("value", null);

                                            await Promise.all([
                                                carregaGridIndicadoresHabilitados(),
                                                carregaGridClientesIndicadoresPercentuaisDiferenciados()
                                            ]);
                                        }
                                        hideProcessPanel("gridBoxIndicadoresNaoHabilitados");
                                    },

                                },
                            },
                            'groupPanel',
                            'revertButton',
                            'columnChooserButton',
                            'searchPanel',
                        ],
                    },
                    showBorders: true,
                    onCellPrepared: function (e) {
                        if (e.rowType === "data") {

                            if (e.column.dataField === "DS_STATUS") {
                                if (e.value === "Inativo") {
                                    e.cellElement.css("color", "#d00000");
                                    e.cellElement.css("font-weight", "bold");
                                };
                            }

                            if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR") {
                                if (e.value === "Sim") {
                                    e.cellElement.css("color", "#b23a48");
                                    e.cellElement.css("background-color", "#fae0e4");
                                };
                            }

                        }
                    },
                    paging: { enabled: true, pageSize: 10 },
                    scrolling: { mode: 'virtual' },
                    height: '100%',
                    //onSelectionChanged(selectedItems) {
                    //    listIndicadoresSelecionadosHabilitar = selectedItems.selectedRowKeys;
                    //    gridBoxIndicadoresNaoHabilitados.option("value", listIndicadoresSelecionadosHabilitar.map((obj) => obj.CD_CPF_CNPJ));
                    //},
                    stateStoring: AutoLoad("gridBoxIndicadoresNaoHabilitados", false),

                    onToolbarPreparing: AutoResetState([]),
                });
                gridIndicadoresNaoHabilitados = dataGrid.dxDataGrid('instance');

                return dataGrid;
            },
        }).dxDropDownBox('instance'),

        gridBoxIndicadoresNaoHabilitadosParam = $('#gridBoxIndicadoresNaoHabilitadosParam').dxDropDownBox({
            valueExpr: 'CD_CPF_CNPJ',
            displayExpr: 'CD_CPF_CNPJ',
            labelMode: 'floating',
            label: '',
            placeholder: '+ Clique para selecionar os indicadores',
            elementAttr: {
                class: 'gridbox-font-md',
            },
            showClearButton: true,
            dataSource: [],
            deferRendering: false,
            dropDownOptions: {
                animation: {
                    show: {
                        type: "slide",
                        from: { opacity: 0, top: 100 },
                        to: {
                            opacity: 1,
                        }
                    },
                    hide: {
                        type: "slide",
                        from: { opacity: 1, top: 100 },
                        to: {
                            opacity: 0,
                        }
                    }
                },
                onShowing: async function (e) {
                    await this.fnPromise;
                    e.component.repaint();
                },
                onOptionChanged: function (e) {
                    if (e.name != "visible") return;
                    if (!e.value) return;
                    $("#abaIndicadoresParticipantesCampos").hide();
                    this.fnPromise = $('#cardSelecaoHabilitarIndicadoresParam').animate({ top: 0 }, {
                        complete: () => {
                            e.component.refreshPosition();
                        },
                    }).promise();
                },
                onHiding: function (e) {
                    $("#abaIndicadoresParticipantesCampos").show();
                },
            },
            contentTemplate(e) {
                const value = e.component.option('value');
                const dataGrid = $('<div>').dxDataGrid({
                    dataSource: e.component.getDataSource(),
                    searchExpr: ['CD_CPF_CNPJ'],
                    displayExpr: 'CD_CPF_CNPJ',
                    valueExpr: 'CD_CPF_CNPJ',
                    wordWrapEnabled: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    searchPanel: {
                        visible: true,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    editing: {
                        mode: 'batch',
                        allowUpdating: true,
                        startEditAction: 'click',
                        allowAdding: false,
                        allowDeleting: false,
                        useIcons: false,
                    },
                    loadPanel: { enabled: true, },
                    sorting: { mode: "multiple" },
                    allowColumnResizing: true,
                    columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                    selection: {
                        mode: 'multiple',
                        showCheckBoxesMode: 'always',
                    },
                    keyboardNavigation: {
                        enterKeyAction: 'moveFocus',
                        enterKeyDirection: 'column',
                        editOnKeyPress: true,
                    },
                    focusedRowEnabled: false,
                    hoverStateEnabled: true,
                    paging: { pageSize: 25 },
                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: true },
                    columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
                    columnsAutoWidth: true,
                    cellHintEnabled: true,
                    keyExpr: ['CD_CPF_CNPJ'],
                    columns: [
                        {
                            type: "selection",
                            width: 30,
                        },
                        { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                        { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                        { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                        { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                        { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                        { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                        { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "PC_PROGRAMA_FILIDADE_INDICADOR", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    ],
                    toolbar: {
                        items: [
                            {
                                location: 'after',
                                widget: 'dxButton',
                                options: {
                                    type: 'success',
                                    text: 'Adicionar Indicadores',
                                    hint: "Adicionar indicadores selecionados",
                                    width: 165,
                                    icon: 'save',
                                    onClick: async (e) => {
                                        showProcessPanel("Salvando...", "gridBoxIndicadoresNaoHabilitadosParam");
                                        if (await saveClientesIndicadores("INDICADOR", "HABILITAR", true) == true) {
                                            //REMOVE AS LINHAS SELECIONADAS
                                            gridIndicadoresNaoHabilitadosParam.getSelectedRowKeys().forEach((key) => {
                                                gridIndicadoresNaoHabilitadosParam.getDataSource().store().remove(key);
                                            });
                                            gridIndicadoresNaoHabilitadosParam.refresh();

                                            //FECHA O GRIDBOX
                                            gridBoxIndicadoresNaoHabilitadosParam.close();
                                            gridBoxIndicadoresNaoHabilitadosParam.option("value", null);

                                            await Promise.all([
                                                carregaGridIndicadoresHabilitados(),
                                                carregaGridClientesIndicadoresPercentuaisDiferenciados()
                                            ]);
                                        }
                                        hideProcessPanel("gridBoxIndicadoresNaoHabilitadosParam");
                                    },

                                },
                            },
                            'groupPanel',
                            'revertButton',
                            'columnChooserButton',
                            'searchPanel',
                        ],
                    },
                    showBorders: true,
                    onCellPrepared: function (e) {
                        if (e.rowType === "data") {

                            if (e.column.dataField === "DS_STATUS") {
                                if (e.value === "Inativo") {
                                    e.cellElement.css("color", "#d00000");
                                    e.cellElement.css("font-weight", "bold");
                                };
                            }

                            if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR") {
                                if (e.value === "Sim") {
                                    e.cellElement.css("color", "#b23a48");
                                    e.cellElement.css("background-color", "#fae0e4");
                                };
                            }

                        }
                    },
                    paging: { enabled: true, pageSize: 10 },
                    scrolling: { mode: 'virtual' },
                    height: '100%',
                    //onSelectionChanged(selectedItems) {
                    //    listIndicadoresSelecionadosHabilitarParam = selectedItems.selectedRowKeys;
                    //    gridBoxIndicadoresNaoHabilitadosParam.option("value", listIndicadoresSelecionadosHabilitarParam.map((obj) => obj.CD_CPF_CNPJ));
                    //},
                    stateStoring: AutoLoad("gridBoxIndicadoresNaoHabilitadosParam", false),

                    onToolbarPreparing: AutoResetState([]),
                });
                gridIndicadoresNaoHabilitadosParam = dataGrid.dxDataGrid('instance');

                return dataGrid;
            },
        }).dxDropDownBox('instance'),


        //Indicadores habilitados no programa de fidelidade
        gridIndicadoresHabilitados = $("#gridIndicadoresHabilitados").dxDataGrid({
            dataSource: [],
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            columnHidingEnabled: true,
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            sorting: { mode: "multiple" },
            selection: {
                mode: 'multiple',
                allowSelectAll: true,
                showCheckBoxesMode: 'always',
                deferred: false,
            },
            focusedRowEnabled: true,
            allowColumnResizing: true,
            allowColumnReordering: true,
            groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
            paging: { pageSize: 10 },
            pager: {
                visible: true,
                allowedPageSizes: [10, 15, 20, 50, 100],
                showPageSizeSelector: true,
                showNavigationButtons: true
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('IndicadoresHabilitados');

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadeIndicadoresHabilitados.xlsx');
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
            columnChooser: {
                enabled: true,
                allowSearch: true,
                height: 500,
                position: {
                    my: 'right top',
                    at: 'right bottom',
                    of: '.dx-datagrid-column-chooser-button',
                },

            },
            columnsAutoWidth: true,
            stateStoring: AutoLoad("gridIndicadoresHabilitados", false),
            keyExpr: 'CD_CPF_CNPJ',
            columns: [
                {
                    type: "selection",
                    dataField: "CD_SELECAO",
                    width: 30,
                    value: false,
                    allowHiding: false,
                },
                { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "PC_PROGRAMA_FILIDADE_INDICADOR", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
            ],

            showBorders: true,

            onCellPrepared: function (e) {

                if (e.rowType === "data") {
                    if (e.column.dataField === "DS_STATUS") {
                        if (e.value === "Inativo") {
                            e.cellElement.css("color", "#d00000");
                            e.cellElement.css("font-weight", "bold");
                        };
                    }

                    if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR") {
                        if (e.value === "Sim") {
                            e.cellElement.css("color", "#b23a48");
                            e.cellElement.css("background-color", "#fae0e4");
                        };
                    }
                }
            },

            toolbar: {
                items: [
                    {
                        location: 'after',
                        widget: 'dxLookup',
                        options: {
                            dataSource: dataSourceFiltroConsultaDetalhada,
                            searchExpr: ['DS_STATUS'],
                            displayExpr: 'DS_STATUS',
                            valueExpr: 'CD_STATUS',
                            value: null,
                            hint: 'Filtro de Indicadores por Status',
                            width: 80,
                            elementAttr: {
                                class: 'filtro-consultal-detalhada',
                                id: 'lkpStatusIndicadoresHabilitados',
                            },

                            dropDownOptions: {
                                closeOnOutsideClick: true,
                                showTitle: false,
                                title: 'Filtro por Status',
                            },
                            placeholder: 'Filtro',
                            showClearButton: false,
                            onValueChanged: async function (e) {

                                if (e.value == 'I') {
                                    e.component.option('elementAttr', { class: 'filtro-consultal-detalhada-inativos' });
                                } else {
                                    e.component.option('elementAttr', { class: 'filtro-consultal-detalhada' });
                                };

                                showProcessPanel("Carregando...", "gridIndicadoresHabilitados");
                                await carregaGridIndicadoresHabilitados()
                                hideProcessPanel("gridIndicadoresHabilitados");
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'auto',
                        options: {
                            icon: 'hierarchy',
                            text: 'Fechar Agrupamento',
                            hint: 'Fechar ou expandir os agrupamentos',
                            onClick(e) {
                                const expanding = e.component.option('text') === 'Expandir Agrupamento';
                                gridIndicadoresHabilitados.option('grouping.autoExpandAll', expanding);
                                e.component.option('text', expanding ? 'Fechar Agrupamento' : 'Expandir Agrupamento');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'auto',
                        options: {
                            type: 'danger',
                            icon: 'trash',
                            text: 'Excluir Indicadores',
                            hint: 'Excluir registros selecionados',
                            onClick: async (e) => {
                                var result = DevExpress.ui.dialog.confirm("Deseja realmente excluir os registros selecionados?", "Confirmação");
                                result.done(async function (dialogResult) {
                                    showProcessPanel("Salvando...", "gridIndicadoresHabilitados");
                                    if (await saveClientesIndicadores("INDICADOR", "DESABILITAR", false) == true) {
                                        //REMOVE AS LINHAS SELECIONADAS
                                        gridIndicadoresHabilitados.getSelectedRowKeys().forEach((key) => {
                                            gridIndicadoresHabilitados.getDataSource().store().remove(key);
                                        });
                                        gridIndicadoresHabilitados.refresh();

                                        await Promise.all([
                                            carregaGridBoxIndicadoresNaoHabilitados(),
                                            carregaGridClientesIndicadoresPercentuaisDiferenciados()
                                        ]);
                                    }
                                    hideProcessPanel("gridIndicadoresHabilitados");
                                });
                            },
                        },
                    },

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
                                        gridIndicadoresHabilitados.state({});
                                        gridIndicadoresHabilitados.refresh();

                                        gridIndicadoresHabilitados.updateDimensions();
                                    }
                                });
                            }
                        }
                    },
                    {
                        name: "groupPanel",
                        locateInMenu: "auto",
                    },
                    'exportButton',
                    'columnChooserButton',
                    'searchPanel',
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

        }).dxDataGrid('instance'),

        gridIndicadoresHabilitadosParam = $("#gridIndicadoresHabilitadosParam").dxDataGrid({
            dataSource: [],
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            columnHidingEnabled: true,
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            sorting: { mode: "multiple" },
            selection: {
                mode: 'multiple',
                allowSelectAll: true,
                showCheckBoxesMode: 'always',
                deferred: false,
            },
            focusedRowEnabled: true,
            allowColumnResizing: true,
            allowColumnReordering: true,
            groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
            paging: { pageSize: 10 },
            pager: {
                visible: true,
                allowedPageSizes: [10, 15, 20, 50, 100],
                showPageSizeSelector: true,
                showNavigationButtons: true
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('IndicadoresHabilitados');

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadeIndicadoresHabilitados.xlsx');
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
            columnChooser: {
                enabled: true,
                allowSearch: true,
                height: 500,
                position: {
                    my: 'right top',
                    at: 'right bottom',
                    of: '.dx-datagrid-column-chooser-button',
                },

            },
            columnsAutoWidth: true,
            stateStoring: AutoLoad("gridIndicadoresHabilitadosParam", false),
            keyExpr: 'CD_CPF_CNPJ',
            columns: [
                {
                    type: "selection",
                    dataField: "CD_SELECAO",
                    width: 30,
                    value: false,
                    allowHiding: false,
                },
                { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "PC_PROGRAMA_FILIDADE_INDICADOR", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
            ],

            showBorders: true,

            onCellPrepared: function (e) {

                if (e.rowType === "data") {
                    if (e.column.dataField === "DS_STATUS") {
                        if (e.value === "Inativo") {
                            e.cellElement.css("color", "#d00000");
                            e.cellElement.css("font-weight", "bold");
                        };
                    }

                    if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR") {
                        if (e.value === "Sim") {
                            e.cellElement.css("color", "#b23a48");
                            e.cellElement.css("background-color", "#fae0e4");
                        };
                    }
                }
            },

            toolbar: {
                items: [
                    {
                        location: 'after',
                        widget: 'dxLookup',
                        options: {
                            dataSource: dataSourceFiltroConsultaDetalhada,
                            searchExpr: ['DS_STATUS'],
                            displayExpr: 'DS_STATUS',
                            valueExpr: 'CD_STATUS',
                            value: null,
                            hint: 'Filtro de Indicadores por Status',
                            width: 80,
                            elementAttr: {
                                class: 'filtro-consultal-detalhada',
                                id: 'lkpStatusIndicadoresHabilitadosParam',
                            },

                            dropDownOptions: {
                                closeOnOutsideClick: true,
                                showTitle: false,
                                title: 'Filtro por Status',
                            },
                            placeholder: 'Filtro',
                            showClearButton: false,
                            onValueChanged: async function (e) {

                                if (e.value == 'I') {
                                    e.component.option('elementAttr', { class: 'filtro-consultal-detalhada-inativos' });
                                } else {
                                    e.component.option('elementAttr', { class: 'filtro-consultal-detalhada' });
                                };

                                showProcessPanel("Carregando...", "gridIndicadoresHabilitadosParam");
                                await carregaGridIndicadoresHabilitados()
                                hideProcessPanel("gridIndicadoresHabilitadosParam");
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'auto',
                        options: {
                            type: 'danger',
                            icon: 'trash',
                            text: 'Excluir Indicadores',
                            hint: 'Excluir registros selecionados',
                            onClick: async (e) => {
                                var result = DevExpress.ui.dialog.confirm("Deseja realmente excluir os registros selecionados?", "Confirmação");
                                result.done(async function (dialogResult) {
                                    showProcessPanel("Salvando...", "gridIndicadoresHabilitadosParam");
                                    if (await saveClientesIndicadores("INDICADOR", "DESABILITAR", true) == true) {
                                        //REMOVE AS LINHAS SELECIONADAS
                                        gridIndicadoresHabilitadosParam.getSelectedRowKeys().forEach((key) => {
                                            gridIndicadoresHabilitadosParam.getDataSource().store().remove(key);
                                        });
                                        gridIndicadoresHabilitadosParam.refresh();

                                        await Promise.all([
                                            carregaGridBoxIndicadoresNaoHabilitados(),
                                            carregaGridClientesIndicadoresPercentuaisDiferenciados()
                                        ]);
                                    }
                                    hideProcessPanel("gridIndicadoresHabilitadosParam");
                                });
                            },
                        },
                    },

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
                                        gridIndicadoresHabilitadosParam.state({});
                                        gridIndicadoresHabilitadosParam.refresh();

                                        gridIndicadoresHabilitadosParam.updateDimensions();
                                    }
                                });
                            }
                        }
                    },
                    {
                        name: "groupPanel",
                        locateInMenu: "auto",
                    },
                    'exportButton',
                    'columnChooserButton',
                    'searchPanel',
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

        }).dxDataGrid('instance'),

        //Indicadores não bloqueados no programa de fidelidade
        gridBoxIndicadoresNaoBloqueados = $('#gridBoxIndicadoresNaoBloqueados').dxDropDownBox({
            valueExpr: 'CD_CPF_CNPJ',
            displayExpr: 'CD_CPF_CNPJ',
            labelMode: 'floating',
            label: '',
            placeholder: '+ Clique para selecionar os indicadores a serem bloqueados no programa de fidelidade',
            elementAttr: {
                class: 'gridbox-font',
            },
            showClearButton: true,
            dataSource: [],
            deferRendering: false,
            dropDownOptions: {
                animation: {
                    show: {
                        type: "slide",
                        from: { opacity: 0, top: 100 },
                        to: {
                            opacity: 1,
                        }
                    },
                    hide: {
                        type: "slide",
                        from: { opacity: 1, top: 100 },
                        to: {
                            opacity: 0,
                        }
                    }
                },
                onShowing: async function (e) {
                    await this.fnPromise;
                    e.component.repaint();
                },
                onOptionChanged: function (e) {
                    if (e.name != "visible") return;
                    if (!e.value) return;
                    $("#cardIndicadoresBloqueadosHeader").hide();
                    this.fnPromise = $('#cardSelecaoBloquearIndicadores').animate({ top: 0 }, {
                        complete: () => {
                            e.component.refreshPosition();
                        },
                    }).promise();
                },
                onHiding: function (e) {
                    $("#cardIndicadoresBloqueadosHeader").show();
                },
            },
            contentTemplate(e) {
                const value = e.component.option('value');
                const dataGrid = $('<div>').dxDataGrid({
                    dataSource: e.component.getDataSource(),
                    searchExpr: ['CD_CPF_CNPJ'],
                    displayExpr: 'CD_CPF_CNPJ',
                    valueExpr: 'CD_CPF_CNPJ',
                    wordWrapEnabled: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    searchPanel: {
                        visible: true,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    editing: {
                        mode: 'batch',
                        allowUpdating: true,
                        startEditAction: 'click',
                        allowAdding: false,
                        allowDeleting: false,
                        useIcons: false,
                    },
                    loadPanel: { enabled: true, },
                    sorting: { mode: "multiple" },
                    allowColumnResizing: true,
                    columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                    selection: {
                        mode: 'multiple',
                        showCheckBoxesMode: 'always',
                    },
                    keyboardNavigation: {
                        enterKeyAction: 'moveFocus',
                        enterKeyDirection: 'column',
                        editOnKeyPress: true,
                    },
                    focusedRowEnabled: false,
                    hoverStateEnabled: true,
                    paging: { pageSize: 25 },
                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: true },
                    columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
                    columnsAutoWidth: true,
                    cellHintEnabled: true,
                    keyExpr: ['CD_CPF_CNPJ'],
                    columns: [
                        {
                            type: "selection",
                            width: 30,
                        },
                        { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                        { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                        { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                        { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                        { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                        { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                        { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                        { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                        { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                        { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "PC_PROGRAMA_FILIDADE_INDICADOR", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    ],
                    toolbar: {
                        items: [
                            {
                                location: 'after',
                                widget: 'dxButton',
                                options: {
                                    type: 'danger',
                                    text: 'Bloquear Indicadores',
                                    hint: "Bloquear indicadores selecionados",
                                    width: 160,
                                    icon: 'save',
                                    onClick: async (e) => {
                                        showProcessPanel("Salvando...", "gridBoxIndicadoresNaoBloqueados");
                                        if (await saveClientesIndicadores("INDICADOR", "BLOQUEAR", false) == true) {
                                            //REMOVE AS LINHAS SELECIONADAS
                                            gridIndicadoresNaoBloqueados.getSelectedRowKeys().forEach((key) => {
                                                gridIndicadoresNaoBloqueados.getDataSource().store().remove(key);
                                            });
                                            gridIndicadoresNaoBloqueados.refresh();

                                            //FECHA O GRIDBOX
                                            gridBoxIndicadoresNaoBloqueados.close();
                                            gridBoxIndicadoresNaoBloqueados.option("value", null);

                                            await Promise.all([
                                                carregaGridIndicadoresBloqueados(),
                                                carregaGridClientesIndicadoresPercentuaisDiferenciados()
                                            ]);
                                        }
                                        hideProcessPanel("gridBoxIndicadoresNaoBloqueados");
                                    },

                                },
                            },
                            'groupPanel',
                            'revertButton',
                            'columnChooserButton',
                            'searchPanel',
                        ],
                    },
                    showBorders: true,
                    onCellPrepared: function (e) {
                        if (e.rowType === "data") {

                            if (e.column.dataField === "DS_STATUS") {
                                if (e.value === "Inativo") {
                                    e.cellElement.css("color", "#d00000");
                                    e.cellElement.css("font-weight", "bold");
                                };
                            }

                            if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR") {
                                if (e.value === "Sim") {
                                    e.cellElement.css("color", "#b23a48");
                                    e.cellElement.css("background-color", "#fae0e4");
                                };
                            }

                        }
                    },
                    paging: { enabled: true, pageSize: 10 },
                    scrolling: { mode: 'virtual' },
                    height: '100%',
                    //onSelectionChanged(selectedItems) {
                    //    listIndicadoresSelecionadosHabilitar = selectedItems.selectedRowKeys;
                    //    gridBoxIndicadoresNaoBloqueados.option("value", listIndicadoresSelecionadosHabilitar.map((obj) => obj.CD_CPF_CNPJ));
                    //},
                    stateStoring: AutoLoad("gridBoxIndicadoresNaoBloqueados", false),

                    onToolbarPreparing: AutoResetState([]),
                });
                gridIndicadoresNaoBloqueados = dataGrid.dxDataGrid('instance');

                return dataGrid;
            },
        }).dxDropDownBox('instance'),

        gridBoxIndicadoresNaoBloqueadosParam = $('#gridBoxIndicadoresNaoBloqueadosParam').dxDropDownBox({
            valueExpr: 'CD_CPF_CNPJ',
            displayExpr: 'CD_CPF_CNPJ',
            labelMode: 'floating',
            label: '',
            placeholder: '+ Clique para selecionar os indicadores a serem bloqueados no programa de fidelidade',
            elementAttr: {
                class: 'gridbox-font-md',
            },
            showClearButton: true,
            dataSource: [],
            deferRendering: false,
            dropDownOptions: {
                animation: {
                    show: {
                        type: "slide",
                        from: { opacity: 0, top: 100 },
                        to: {
                            opacity: 1,
                        }
                    },
                    hide: {
                        type: "slide",
                        from: { opacity: 1, top: 100 },
                        to: {
                            opacity: 0,
                        }
                    }
                },
                onShowing: async (e) => {
                    e.component._$wrapper.css('z-index', 998);
                    await this.fnPromise;
                },
            },
            contentTemplate(e) {
                const value = e.component.option('value');
                const dataGrid = $('<div>').dxDataGrid({
                    dataSource: e.component.getDataSource(),
                    searchExpr: ['CD_CPF_CNPJ'],
                    displayExpr: 'CD_CPF_CNPJ',
                    valueExpr: 'CD_CPF_CNPJ',
                    wordWrapEnabled: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    searchPanel: {
                        visible: true,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    editing: {
                        mode: 'batch',
                        allowUpdating: true,
                        startEditAction: 'click',
                        allowAdding: false,
                        allowDeleting: false,
                        useIcons: false,
                    },
                    loadPanel: { enabled: true, },
                    sorting: { mode: "multiple" },
                    allowColumnResizing: true,
                    columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                    selection: {
                        mode: 'multiple',
                        showCheckBoxesMode: 'always',
                    },
                    keyboardNavigation: {
                        enterKeyAction: 'moveFocus',
                        enterKeyDirection: 'column',
                        editOnKeyPress: true,
                    },
                    focusedRowEnabled: false,
                    hoverStateEnabled: true,
                    paging: { pageSize: 25 },
                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: true },
                    columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
                    columnsAutoWidth: true,
                    cellHintEnabled: true,
                    keyExpr: ['CD_CPF_CNPJ'],
                    columns: [
                        {
                            type: "selection",
                            width: 30,
                        },
                        { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                        { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                        { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                        { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                        { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                        { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                        { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                        { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                        { dataField: "PC_PROGRAMA_FILIDADE_INDICADOR", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    ],
                    toolbar: {
                        items: [
                            {
                                location: 'after',
                                widget: 'dxButton',
                                options: {
                                    type: 'danger',
                                    text: 'Bloquear Indicadores',
                                    hint: "Bloquear indicadores selecionados",
                                    width: 160,
                                    icon: 'save',
                                    onClick: async (e) => {
                                        showProcessPanel("Salvando...", "gridBoxIndicadoresNaoBloqueadosParam");
                                        if (await saveClientesIndicadores("INDICADOR", "BLOQUEAR", true) == true) {
                                            //REMOVE AS LINHAS SELECIONADAS
                                            gridIndicadoresNaoBloqueadosParam.getSelectedRowKeys().forEach((key) => {
                                                gridIndicadoresNaoBloqueadosParam.getDataSource().store().remove(key);
                                            });
                                            gridIndicadoresNaoBloqueadosParam.refresh();

                                            //FECHA O GRIDBOX
                                            gridBoxIndicadoresNaoBloqueadosParam.close();
                                            gridBoxIndicadoresNaoBloqueadosParam.option("value", null);

                                            await Promise.all([
                                                carregaGridIndicadoresBloqueados(),
                                                carregaGridClientesIndicadoresPercentuaisDiferenciados()
                                            ]);
                                        }
                                        hideProcessPanel("gridBoxIndicadoresNaoBloqueadosParam");
                                    },

                                },
                            },
                            'groupPanel',
                            'revertButton',
                            'columnChooserButton',
                            'searchPanel',
                        ],
                    },
                    showBorders: true,
                    onCellPrepared: function (e) {
                        if (e.rowType === "data") {

                            if (e.column.dataField === "DS_STATUS") {
                                if (e.value === "Inativo") {
                                    e.cellElement.css("color", "#d00000");
                                    e.cellElement.css("font-weight", "bold");
                                };
                            }

                            if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR") {
                                if (e.value === "Sim") {
                                    e.cellElement.css("color", "#b23a48");
                                    e.cellElement.css("background-color", "#fae0e4");
                                };
                            }

                        }
                    },
                    paging: { enabled: true, pageSize: 10 },
                    scrolling: { mode: 'virtual' },
                    height: '100%',
                    //onSelectionChanged(selectedItems) {
                    //    listIndicadoresSelecionadosHabilitarParam = selectedItems.selectedRowKeys;
                    //    gridBoxIndicadoresNaoBloqueadosParam.option("value", listIndicadoresSelecionadosHabilitarParam.map((obj) => obj.CD_CPF_CNPJ));
                    //},
                    stateStoring: AutoLoad("gridBoxIndicadoresNaoBloqueadosParam", false),

                    onToolbarPreparing: AutoResetState([]),
                });
                gridIndicadoresNaoBloqueadosParam = dataGrid.dxDataGrid('instance');

                return dataGrid;
            },
        }).dxDropDownBox('instance'),

        //Indicadores bloqueados no programa de fidelidade
        gridIndicadoresBloqueados = $("#gridIndicadoresBloqueados").dxDataGrid({
            dataSource: [],
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            columnHidingEnabled: true,
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            sorting: { mode: "multiple" },
            selection: {
                mode: 'multiple',
                allowSelectAll: true,
                showCheckBoxesMode: 'always',
                deferred: false,
            },
            focusedRowEnabled: true,
            allowColumnResizing: true,
            allowColumnReordering: true,
            groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
            paging: { pageSize: 10 },
            pager: {
                visible: true,
                allowedPageSizes: [10, 15, 20, 50, 100],
                showPageSizeSelector: true,
                showNavigationButtons: true
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('IndicadoresBloqueados');

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadeIndicadoresBloqueados.xlsx');
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
            columnChooser: {
                enabled: true,
                allowSearch: true,
                height: 500,
                position: {
                    my: 'right top',
                    at: 'right bottom',
                    of: '.dx-datagrid-column-chooser-button',
                },

            },
            columnsAutoWidth: true,
            stateStoring: AutoLoad("gridIndicadoresBloqueados", false),
            keyExpr: 'CD_CPF_CNPJ',
            columns: [
                {
                    type: "selection",
                    dataField: "CD_SELECAO",
                    width: 30,
                    value: false,
                    allowHiding: false,
                },
                { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "PC_PROGRAMA_FILIDADE_INDICADOR", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
            ],

            showBorders: true,

            onCellPrepared: function (e) {

                if (e.rowType === "data") {
                    if (e.column.dataField === "DS_STATUS") {
                        if (e.value === "Inativo") {
                            e.cellElement.css("color", "#d00000");
                            e.cellElement.css("font-weight", "bold");
                        };
                    }

                    if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR") {
                        if (e.value === "Sim") {
                            e.cellElement.css("color", "#b23a48");
                            e.cellElement.css("background-color", "#fae0e4");
                        };
                    }
                }
            },

            toolbar: {
                items: [
                    {
                        location: 'after',
                        widget: 'dxLookup',
                        options: {
                            dataSource: dataSourceFiltroConsultaDetalhada,
                            searchExpr: ['DS_STATUS'],
                            displayExpr: 'DS_STATUS',
                            valueExpr: 'CD_STATUS',
                            value: null,
                            hint: 'Filtro de Indicadores por Status',
                            width: 80,
                            elementAttr: {
                                class: 'filtro-consultal-detalhada',
                                id: 'lkpStatusIndicadoresBloqueados',
                            },

                            dropDownOptions: {
                                closeOnOutsideClick: true,
                                showTitle: false,
                                title: 'Filtro por Status',
                            },
                            placeholder: 'Filtro',
                            showClearButton: false,
                            onValueChanged: async function (e) {

                                if (e.value == 'I') {
                                    e.component.option('elementAttr', { class: 'filtro-consultal-detalhada-inativos' });
                                } else {
                                    e.component.option('elementAttr', { class: 'filtro-consultal-detalhada' });
                                };

                                showProcessPanel("Carregando...", "gridIndicadoresBloqueados");
                                await carregaGridIndicadoresBloqueados()
                                hideProcessPanel("gridIndicadoresBloqueados");
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'auto',
                        options: {
                            icon: 'hierarchy',
                            text: 'Fechar Agrupamento',
                            hint: 'Fechar ou expandir os agrupamentos',
                            onClick(e) {
                                const expanding = e.component.option('text') === 'Expandir Agrupamento';
                                gridClientesHabilitados.option('grouping.autoExpandAll', expanding);
                                e.component.option('text', expanding ? 'Fechar Agrupamento' : 'Expandir Agrupamento');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'auto',
                        options: {
                            icon: 'trash',
                            text: 'Desbloquear Indicadores',
                            hint: 'Desbloquear registros selecionados',
                            onClick: async (e) => {
                                var result = DevExpress.ui.dialog.confirm("Deseja realmente desbloquear os indicadores selecionados?", "Confirmação");
                                result.done(async function (dialogResult) {
                                    showProcessPanel("Salvando...", "gridIndicadoresBloqueados");
                                    if (await saveClientesIndicadores("INDICADOR", "DESBLOQUEAR", false) == true) {
                                        //REMOVE AS LINHAS SELECIONADAS
                                        gridIndicadoresBloqueados.getSelectedRowKeys().forEach((key) => {
                                            gridIndicadoresBloqueados.getDataSource().store().remove(key);
                                        });
                                        gridIndicadoresBloqueados.refresh();

                                        await Promise.all([
                                            carregaGridBoxIndicadoresNaoBloqueados(),
                                            carregaGridClientesIndicadoresPercentuaisDiferenciados()
                                        ]);
                                    }
                                    hideProcessPanel("gridIndicadoresBloqueados");
                                });
                            },
                        },
                    },

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
                                        gridIndicadoresBloqueados.state({});
                                        gridIndicadoresBloqueados.refresh();

                                        gridIndicadoresBloqueados.updateDimensions();
                                    }
                                });
                            }
                        }
                    },
                    {
                        name: "groupPanel",
                        locateInMenu: "auto",
                    },
                    'exportButton',
                    'columnChooserButton',
                    'searchPanel',
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

        }).dxDataGrid('instance'),

        gridIndicadoresBloqueadosParam = $("#gridIndicadoresBloqueadosParam").dxDataGrid({
            dataSource: [],
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            columnHidingEnabled: true,
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            sorting: { mode: "multiple" },
            selection: {
                mode: 'multiple',
                allowSelectAll: true,
                showCheckBoxesMode: 'always',
                deferred: false,
            },
            focusedRowEnabled: true,
            allowColumnResizing: true,
            allowColumnReordering: true,
            groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
            paging: { pageSize: 10 },
            pager: {
                visible: true,
                allowedPageSizes: [10, 15, 20, 50, 100],
                showPageSizeSelector: true,
                showNavigationButtons: true
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('IndicadoresBloqueados');

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadeIndicadoresBloqueados.xlsx');
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
            columnChooser: {
                enabled: true,
                allowSearch: true,
                height: 500,
                position: {
                    my: 'right top',
                    at: 'right bottom',
                    of: '.dx-datagrid-column-chooser-button',
                },

            },
            columnsAutoWidth: true,
            stateStoring: AutoLoad("gridIndicadoresBloqueadosParam", false),
            keyExpr: 'CD_CPF_CNPJ',
            columns: [
                {
                    type: "selection",
                    dataField: "CD_SELECAO",
                    width: 30,
                    value: false,
                    allowHiding: false,
                },
                { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "PC_PROGRAMA_FILIDADE_INDICADOR", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
            ],

            showBorders: true,

            onCellPrepared: function (e) {

                if (e.rowType === "data") {
                    if (e.column.dataField === "DS_STATUS") {
                        if (e.value === "Inativo") {
                            e.cellElement.css("color", "#d00000");
                            e.cellElement.css("font-weight", "bold");
                        };
                    }

                    if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR") {
                        if (e.value === "Sim") {
                            e.cellElement.css("color", "#b23a48");
                            e.cellElement.css("background-color", "#fae0e4");
                        };
                    }
                }
            },

            toolbar: {
                items: [
                    {
                        location: 'after',
                        widget: 'dxLookup',
                        options: {
                            dataSource: dataSourceFiltroConsultaDetalhada,
                            searchExpr: ['DS_STATUS'],
                            displayExpr: 'DS_STATUS',
                            valueExpr: 'CD_STATUS',
                            value: null,
                            hint: 'Filtro de Indicadores por Status',
                            width: 80,
                            elementAttr: {
                                class: 'filtro-consultal-detalhada',
                                id: 'lkpStatusIndicadoresBloqueadosParam',
                            },

                            dropDownOptions: {
                                closeOnOutsideClick: true,
                                showTitle: false,
                                title: 'Filtro por Status',
                            },
                            placeholder: 'Filtro',
                            showClearButton: false,
                            onValueChanged: async function (e) {

                                if (e.value == 'I') {
                                    e.component.option('elementAttr', { class: 'filtro-consultal-detalhada-inativos' });
                                } else {
                                    e.component.option('elementAttr', { class: 'filtro-consultal-detalhada' });
                                };

                                showProcessPanel("Carregando...", "gridIndicadoresBloqueadosParam");
                                await carregaGridIndicadoresBloqueados()
                                hideProcessPanel("gridIndicadoresBloqueadosParam");
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'auto',
                        options: {
                            icon: 'trash',
                            text: 'Desbloquear Indicadores',
                            hint: 'Desbloquear registros selecionados',
                            onClick: async (e) => {
                                var result = DevExpress.ui.dialog.confirm("Deseja realmente desbloquear os indicadores selecionados?", "Confirmação");
                                result.done(async function (dialogResult) {
                                    showProcessPanel("Salvando...", "gridIndicadoresBloqueadosParam");
                                    if (await saveClientesIndicadores("INDICADOR", "DESBLOQUEAR", true) == true) {
                                        //REMOVE AS LINHAS SELECIONADAS
                                        gridIndicadoresBloqueadosParam.getSelectedRowKeys().forEach((key) => {
                                            gridIndicadoresBloqueadosParam.getDataSource().store().remove(key);
                                        });
                                        gridIndicadoresBloqueadosParam.refresh();

                                        await Promise.all([
                                            carregaGridBoxIndicadoresNaoBloqueados(),
                                            carregaGridClientesIndicadoresPercentuaisDiferenciados()
                                        ]);
                                    }
                                    hideProcessPanel("gridIndicadoresBloqueadosParam");
                                });
                            },
                        },
                    },

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
                                        gridIndicadoresBloqueadosParam.state({});
                                        gridIndicadoresBloqueadosParam.refresh();

                                        gridIndicadoresBloqueadosParam.updateDimensions();
                                    }
                                });
                            }
                        }
                    },
                    {
                        name: "groupPanel",
                        locateInMenu: "auto",
                    },
                    'exportButton',
                    'columnChooserButton',
                    'searchPanel',
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

        }).dxDataGrid('instance'),


        //CLIENTES PARTICIPANTES DO PROGRAMA
        chkParticipantesClientesTodos = $('#chk_Parcipantes_Clientes_Todos').dxCheckBox({
            text: 'Todos os clientes podem participar do programa',
            value: true,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkParticipantesClientesNenhum.option('value', false);
                    chkParticipantesClientesSelecionar.option('value', false);
                    chkParticipantesClientesPF.option('value', false);
                    chkParticipantesClientesPJ.option('value', false);
                } else if (chkParticipantesClientesNenhum.option('value') == false && chkParticipantesClientesSelecionar.option('value') == false && chkParticipantesClientesPF.option('value') == false && chkParticipantesClientesPJ.option('value') == false) {
                    chkParticipantesClientesTodos.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_CLIENTES = retornaCodigoParticipante("C", false);
                saveParametros();
                $('#cardSelecaoHabilitarClientes').slideUp();
            },
        }).dxCheckBox('instance'),

        chkParticipantesClientesPF = $('#chk_Parcipantes_Clientes_PF').dxCheckBox({
            text: 'Apenas clientes Pessoas Físicas podem participar do programa',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkParticipantesClientesNenhum.option('value', false);
                    chkParticipantesClientesSelecionar.option('value', false);
                    chkParticipantesClientesTodos.option('value', false);
                    chkParticipantesClientesPJ.option('value', false);
                } else if (chkParticipantesClientesNenhum.option('value') == false && chkParticipantesClientesSelecionar.option('value') == false && chkParticipantesClientesTodos.option('value') == false && chkParticipantesClientesPJ.option('value') == false) {
                    chkParticipantesClientesPF.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_CLIENTES = retornaCodigoParticipante("C", false);
                saveParametros();
                $('#cardSelecaoHabilitarClientes').slideUp();
            },
        }).dxCheckBox('instance'),

        chkParticipantesClientesPJ = $('#chk_Parcipantes_Clientes_PJ').dxCheckBox({
            text: 'Apenas clientes Pessoas Jurídicas podem participar do programa',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkParticipantesClientesNenhum.option('value', false);
                    chkParticipantesClientesSelecionar.option('value', false);
                    chkParticipantesClientesTodos.option('value', false);
                    chkParticipantesClientesPF.option('value', false);
                } else if (chkParticipantesClientesNenhum.option('value') == false && chkParticipantesClientesSelecionar.option('value') == false && chkParticipantesClientesPF.option('value') == false && chkParticipantesClientesTodos.option('value') == false) {
                    chkParticipantesClientesPJ.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_CLIENTES = retornaCodigoParticipante("C", false);
                saveParametros();
                $('#cardSelecaoHabilitarClientes').slideUp();
            },
        }).dxCheckBox('instance'),

        chkParticipantesClientesNenhum = $('#chk_Parcipantes_Clientes_Nenhum').dxCheckBox({
            text: 'Nenhum cliente pode participar do programa',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkParticipantesClientesTodos.option('value', false);
                    chkParticipantesClientesSelecionar.option('value', false);
                    chkParticipantesClientesPF.option('value', false);
                    chkParticipantesClientesPJ.option('value', false);
                } else if (chkParticipantesClientesTodos.option('value') == false && chkParticipantesClientesSelecionar.option('value') == false && chkParticipantesClientesPF.option('value') == false && chkParticipantesClientesPJ.option('value') == false) {
                    chkParticipantesClientesNenhum.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_CLIENTES = retornaCodigoParticipante("C", false);
                saveParametros();
                $('#cardSelecaoHabilitarClientes').slideUp();
            },
        }).dxCheckBox('instance'),

        chkParticipantesClientesSelecionar = $('#chk_Parcipantes_Clientes_Selecionar').dxCheckBox({
            text: 'Escolher os clientes que podem participar',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkParticipantesClientesTodos.option('value', false);
                    chkParticipantesClientesNenhum.option('value', false);
                    chkParticipantesClientesPF.option('value', false);
                    chkParticipantesClientesPJ.option('value', false);
                } else if (chkParticipantesClientesTodos.option('value') == false && chkParticipantesClientesNenhum.option('value') == false && chkParticipantesClientesPF.option('value') == false && chkParticipantesClientesPJ.option('value') == false) {
                    chkParticipantesClientesSelecionar.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_CLIENTES = retornaCodigoParticipante("C", false);
                saveParametros();
                $('#cardSelecaoHabilitarClientes').slideDown();
            },
        }).dxCheckBox('instance'),


        //CLIENTES PARTICIPANTES DO PROGRAMA PARAM
        chkParticipantesClientesTodosParam = $('#chk_Parcipantes_Clientes_Todos_Param').dxCheckBox({
            text: 'Todos os clientes podem participar do programa',
            value: true,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font-md',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkParticipantesClientesNenhumParam.option('value', false);
                    chkParticipantesClientesSelecionarParam.option('value', false);
                    chkParticipantesClientesPFParam.option('value', false);
                    chkParticipantesClientesPJParam.option('value', false);
                } else if (chkParticipantesClientesNenhumParam.option('value') == false && chkParticipantesClientesSelecionarParam.option('value') == false && chkParticipantesClientesPFParam.option('value') == false && chkParticipantesClientesPJParam.option('value') == false) {
                    chkParticipantesClientesTodosParam.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_CLIENTES = retornaCodigoParticipante("C", true);
                saveParametros();
                $('#cardSelecaoHabilitarClientesParam').slideUp();
            },
        }).dxCheckBox('instance'),

        chkParticipantesClientesPFParam = $('#chk_Parcipantes_Clientes_PF_Param').dxCheckBox({
            text: 'Apenas clientes Pessoas Físicas podem participar do programa',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font-md',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkParticipantesClientesNenhumParam.option('value', false);
                    chkParticipantesClientesSelecionarParam.option('value', false);
                    chkParticipantesClientesTodosParam.option('value', false);
                    chkParticipantesClientesPJParam.option('value', false);
                } else if (chkParticipantesClientesNenhumParam.option('value') == false && chkParticipantesClientesSelecionarParam.option('value') == false && chkParticipantesClientesTodosParam.option('value') == false && chkParticipantesClientesPJParam.option('value') == false) {
                    chkParticipantesClientesPFParam.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_CLIENTES = retornaCodigoParticipante("C", true);
                saveParametros();
                $('#cardSelecaoHabilitarClientesParam').slideUp();
            },
        }).dxCheckBox('instance'),

        chkParticipantesClientesPJParam = $('#chk_Parcipantes_Clientes_PJ_Param').dxCheckBox({
            text: 'Apenas clientes Pessoas Jurídicas podem participar do programa',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font-md',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkParticipantesClientesNenhumParam.option('value', false);
                    chkParticipantesClientesSelecionarParam.option('value', false);
                    chkParticipantesClientesTodosParam.option('value', false);
                    chkParticipantesClientesPFParam.option('value', false);
                } else if (chkParticipantesClientesNenhumParam.option('value') == false && chkParticipantesClientesSelecionarParam.option('value') == false && chkParticipantesClientesPFParam.option('value') == false && chkParticipantesClientesTodosParam.option('value') == false) {
                    chkParticipantesClientesPJParam.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_CLIENTES = retornaCodigoParticipante("C", true);
                saveParametros();
                $('#cardSelecaoHabilitarClientesParam').slideUp();
            },
        }).dxCheckBox('instance'),

        chkParticipantesClientesNenhumParam = $('#chk_Parcipantes_Clientes_Nenhum_Param').dxCheckBox({
            text: 'Nenhum cliente pode participar do programa',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font-md',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkParticipantesClientesTodosParam.option('value', false);
                    chkParticipantesClientesSelecionarParam.option('value', false);
                    chkParticipantesClientesPFParam.option('value', false);
                    chkParticipantesClientesPJParam.option('value', false);
                } else if (chkParticipantesClientesTodosParam.option('value') == false && chkParticipantesClientesSelecionarParam.option('value') == false && chkParticipantesClientesPFParam.option('value') == false && chkParticipantesClientesPJParam.option('value') == false) {
                    chkParticipantesClientesNenhumParam.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_CLIENTES = retornaCodigoParticipante("C", true);
                saveParametros();
                $('#cardSelecaoHabilitarClientesParam').slideUp();
            },
        }).dxCheckBox('instance'),

        chkParticipantesClientesSelecionarParam = $('#chk_Parcipantes_Clientes_Selecionar_Param').dxCheckBox({
            text: 'Escolher os clientes que podem participar',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font-md',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkParticipantesClientesTodosParam.option('value', false);
                    chkParticipantesClientesNenhumParam.option('value', false);
                    chkParticipantesClientesPFParam.option('value', false);
                    chkParticipantesClientesPJParam.option('value', false);
                } else if (chkParticipantesClientesTodosParam.option('value') == false && chkParticipantesClientesNenhumParam.option('value') == false && chkParticipantesClientesPFParam.option('value') == false && chkParticipantesClientesPJParam.option('value') == false) {
                    chkParticipantesClientesSelecionarParam.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_CLIENTES = retornaCodigoParticipante("C", true);
                saveParametros();
                $('#cardSelecaoHabilitarClientesParam').slideDown();
            },
        }).dxCheckBox('instance'),


        //INDICADORES PARTICIPANTES DO PROGRAMA
        chkParticipantesIndicadoresTodos = $('#chk_Parcipantes_Indicadores_Todos').dxCheckBox({
            text: 'Todos os indicadores podem participar do programa',
            value: true,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkParticipantesIndicadoresNenhum.option('value', false);
                    chkParticipantesIndicadoresSelecionar.option('value', false);
                    chkParticipantesIndicadoresPF.option('value', false);
                    chkParticipantesIndicadoresPJ.option('value', false);
                } else if (chkParticipantesIndicadoresNenhum.option('value') == false && chkParticipantesIndicadoresSelecionar.option('value') == false && chkParticipantesIndicadoresPF.option('value') == false && chkParticipantesIndicadoresPJ.option('value') == false) {
                    chkParticipantesIndicadoresTodos.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_INDICADORES = retornaCodigoParticipante("I", false);
                saveParametros();
                $('#cardSelecaoHabilitarIndicadores').slideUp();
            },
        }).dxCheckBox('instance'),

        chkParticipantesIndicadoresPF = $('#chk_Parcipantes_Indicadores_PF').dxCheckBox({
            text: 'Apenas indicadores Pessoas Físicas podem participar do programa',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkParticipantesIndicadoresNenhum.option('value', false);
                    chkParticipantesIndicadoresSelecionar.option('value', false);
                    chkParticipantesIndicadoresTodos.option('value', false);
                    chkParticipantesIndicadoresPJ.option('value', false);
                } else if (chkParticipantesIndicadoresNenhum.option('value') == false && chkParticipantesIndicadoresSelecionar.option('value') == false && chkParticipantesIndicadoresTodos.option('value') == false && chkParticipantesIndicadoresPJ.option('value') == false) {
                    chkParticipantesIndicadoresPF.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_INDICADORES = retornaCodigoParticipante("I", false);
                saveParametros();
                $('#cardSelecaoHabilitarIndicadores').slideUp();
            },
        }).dxCheckBox('instance'),

        chkParticipantesIndicadoresPJ = $('#chk_Parcipantes_Indicadores_PJ').dxCheckBox({
            text: 'Apenas indicadores Pessoas Jurídicas podem participar do programa',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkParticipantesIndicadoresNenhum.option('value', false);
                    chkParticipantesIndicadoresSelecionar.option('value', false);
                    chkParticipantesIndicadoresTodos.option('value', false);
                    chkParticipantesIndicadoresPF.option('value', false);
                } else if (chkParticipantesIndicadoresNenhum.option('value') == false && chkParticipantesIndicadoresSelecionar.option('value') == false && chkParticipantesIndicadoresPF.option('value') == false && chkParticipantesIndicadoresTodos.option('value') == false) {
                    chkParticipantesIndicadoresPJ.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_INDICADORES = retornaCodigoParticipante("I", false);
                saveParametros();
                $('#cardSelecaoHabilitarIndicadores').slideUp();
            },
        }).dxCheckBox('instance'),

        chkParticipantesIndicadoresNenhum = $('#chk_Parcipantes_Indicadores_Nenhum').dxCheckBox({
            text: 'Nenhum indicador pode participar do programa',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkParticipantesIndicadoresTodos.option('value', false);
                    chkParticipantesIndicadoresSelecionar.option('value', false);
                    chkParticipantesIndicadoresPF.option('value', false);
                    chkParticipantesIndicadoresPJ.option('value', false);
                } else if (chkParticipantesIndicadoresTodos.option('value') == false && chkParticipantesIndicadoresSelecionar.option('value') == false && chkParticipantesIndicadoresPF.option('value') == false && chkParticipantesIndicadoresPJ.option('value') == false) {
                    chkParticipantesIndicadoresNenhum.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_INDICADORES = retornaCodigoParticipante("I", false);
                saveParametros();
                $('#cardSelecaoHabilitarIndicadores').slideUp();
            },
        }).dxCheckBox('instance'),

        chkParticipantesIndicadoresSelecionar = $('#chk_Parcipantes_Indicadores_Selecionar').dxCheckBox({
            text: 'Escolher os indicadores que podem participar',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkParticipantesIndicadoresTodos.option('value', false);
                    chkParticipantesIndicadoresNenhum.option('value', false);
                    chkParticipantesIndicadoresPF.option('value', false);
                    chkParticipantesIndicadoresPJ.option('value', false);
                } else if (chkParticipantesIndicadoresTodos.option('value') == false && chkParticipantesIndicadoresNenhum.option('value') == false && chkParticipantesIndicadoresPF.option('value') == false && chkParticipantesIndicadoresPJ.option('value') == false) {
                    chkParticipantesIndicadoresSelecionar.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_INDICADORES = retornaCodigoParticipante("I", false);
                saveParametros();
                $('#cardSelecaoHabilitarIndicadores').slideDown();
            },
        }).dxCheckBox('instance'),

        //INDICADORES PARTICIPANTES DO PROGRAMA PARAM
        chkParticipantesIndicadoresTodosParam = $('#chk_Parcipantes_Indicadores_Todos_Param').dxCheckBox({
            text: 'Todos os indicadores podem participar do programa',
            value: true,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font-md',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkParticipantesIndicadoresNenhumParam.option('value', false);
                    chkParticipantesIndicadoresSelecionarParam.option('value', false);
                    chkParticipantesIndicadoresPFParam.option('value', false);
                    chkParticipantesIndicadoresPJParam.option('value', false);
                } else if (chkParticipantesIndicadoresNenhumParam.option('value') == false && chkParticipantesIndicadoresSelecionarParam.option('value') == false && chkParticipantesIndicadoresPFParam.option('value') == false && chkParticipantesIndicadoresPJParam.option('value') == false) {
                    chkParticipantesIndicadoresTodosParam.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_INDICADORES = retornaCodigoParticipante("I", true);
                saveParametros();
                $('#cardSelecaoHabilitarIndicadoresParam').slideUp();
            },
        }).dxCheckBox('instance'),

        chkParticipantesIndicadoresPFParam = $('#chk_Parcipantes_Indicadores_PF_Param').dxCheckBox({
            text: 'Apenas indicadores Pessoas Físicas podem participar do programa',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font-md',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkParticipantesIndicadoresNenhumParam.option('value', false);
                    chkParticipantesIndicadoresSelecionarParam.option('value', false);
                    chkParticipantesIndicadoresTodosParam.option('value', false);
                    chkParticipantesIndicadoresPJParam.option('value', false);
                } else if (chkParticipantesIndicadoresNenhumParam.option('value') == false && chkParticipantesIndicadoresSelecionarParam.option('value') == false && chkParticipantesIndicadoresTodosParam.option('value') == false && chkParticipantesIndicadoresPJParam.option('value') == false) {
                    chkParticipantesIndicadoresPFParam.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_INDICADORES = retornaCodigoParticipante("I", true);
                saveParametros();
                $('#cardSelecaoHabilitarIndicadoresParam').slideUp();
            },
        }).dxCheckBox('instance'),

        chkParticipantesIndicadoresPJParam = $('#chk_Parcipantes_Indicadores_PJ_Param').dxCheckBox({
            text: 'Apenas indicadores Pessoas Jurídicas podem participar do programa',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font-md',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkParticipantesIndicadoresNenhumParam.option('value', false);
                    chkParticipantesIndicadoresSelecionarParam.option('value', false);
                    chkParticipantesIndicadoresTodosParam.option('value', false);
                    chkParticipantesIndicadoresPFParam.option('value', false);
                } else if (chkParticipantesIndicadoresNenhumParam.option('value') == false && chkParticipantesIndicadoresSelecionarParam.option('value') == false && chkParticipantesIndicadoresPFParam.option('value') == false && chkParticipantesIndicadoresTodosParam.option('value') == false) {
                    chkParticipantesIndicadoresPJParam.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_INDICADORES = retornaCodigoParticipante("I", true);
                saveParametros();
                $('#cardSelecaoHabilitarIndicadoresParam').slideUp();
            },
        }).dxCheckBox('instance'),

        chkParticipantesIndicadoresNenhumParam = $('#chk_Parcipantes_Indicadores_Nenhum_Param').dxCheckBox({
            text: 'Nenhum indicador pode participar do programa',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font-md',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkParticipantesIndicadoresTodosParam.option('value', false);
                    chkParticipantesIndicadoresSelecionarParam.option('value', false);
                    chkParticipantesIndicadoresPFParam.option('value', false);
                    chkParticipantesIndicadoresPJParam.option('value', false);
                } else if (chkParticipantesIndicadoresTodosParam.option('value') == false && chkParticipantesIndicadoresSelecionarParam.option('value') == false && chkParticipantesIndicadoresPFParam.option('value') == false && chkParticipantesIndicadoresPJParam.option('value') == false) {
                    chkParticipantesIndicadoresNenhumParam.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_INDICADORES = retornaCodigoParticipante("I", true);
                saveParametros();
                $('#cardSelecaoHabilitarIndicadoresParam').slideUp();
            },
        }).dxCheckBox('instance'),

        chkParticipantesIndicadoresSelecionarParam = $('#chk_Parcipantes_Indicadores_Selecionar_Param').dxCheckBox({
            text: 'Escolher os indicadores que podem participar',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font-md',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkParticipantesIndicadoresTodosParam.option('value', false);
                    chkParticipantesIndicadoresNenhumParam.option('value', false);
                    chkParticipantesIndicadoresPFParam.option('value', false);
                    chkParticipantesIndicadoresPJParam.option('value', false);
                } else if (chkParticipantesIndicadoresTodosParam.option('value') == false && chkParticipantesIndicadoresNenhumParam.option('value') == false && chkParticipantesIndicadoresPFParam.option('value') == false && chkParticipantesIndicadoresPJParam.option('value') == false) {
                    chkParticipantesIndicadoresSelecionarParam.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_INDICADORES = retornaCodigoParticipante("I", true);
                saveParametros();
                $('#cardSelecaoHabilitarIndicadoresParam').slideDown();
            },
        }).dxCheckBox('instance'),

        //PERCENTUAIS PADRÃO DE CASHBACK PARA CLIENTES E INDICADORES
        nbx_Pc_CashBack_Clientes = $('#nbx_Pc_CashBack_Clientes').dxNumberBox({
            value: 0,
            format: "###,###0.##'%'",
            min: 0,
            max: 100,
            showClearButton: false,
            showSpinButtons: false,
            step: 0.01,
            placeholder: '% CashBack',
            elementAttr: {
                class: 'numberBox-format',
            },
            onValueChanged: function (e) {
                if (vSuprimeEventoOnChange) return;

                var pcCashBack = e.value.toLocaleString('pt-BR', { minimumFractionDigits: 0 });
                $('#labelPcCashBackPadraoClientes').text(pcCashBack + '%');
                objParametroProgramaFidelidade.PC_PROGRAMA_FIDELIDADE = e.value;
                saveParametros();
            },
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "darkred",
                });

                var placeholderElement = e.component._$element.find('.dx-placeholder');
                placeholderElement.addClass('numberBox-format');
            },
        }).dxNumberBox('instance'),

        nbx_Pc_CashBack_Indicadores = $('#nbx_Pc_CashBack_Indicadores').dxNumberBox({
            value: 0,
            format: "###,###0.##'%'",
            min: 0,
            max: 100,
            showClearButton: false,
            showSpinButtons: false,
            step: 0.01,
            placeholder: '% CashBack',
            elementAttr: {
                class: 'numberBox-format',
            },
            onValueChanged: function (e) {
                if (vSuprimeEventoOnChange) return;

                var pcCashBack = e.value.toLocaleString('pt-BR', { minimumFractionDigits: 0 });
                $('#labelPcCashBackPadraoIndicadores').text(pcCashBack + '%');
                objParametroProgramaFidelidade.PC_PROGRAMA_FIDELIDADE_INDICADOR = e.value;
                saveParametros();
            },
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "darkred",
                });

                var placeholderElement = e.component._$element.find('.dx-placeholder');
                placeholderElement.addClass('numberBox-format');
            },
        }).dxNumberBox('instance'),


        //PERCENTUAIS PADRÃO PARA EDIÇÃO DE CASHBACK PARA CLIENTES E INDICADORES
        nbx_Pc_CashBack_Clientes_Param = $('#nbx_Pc_CashBack_Clientes_Param').dxNumberBox({
            value: 0,
            format: "###,###0.##'%'",
            min: 0,
            max: 100,
            showClearButton: false,
            showSpinButtons: false,
            step: 0.01,
            placeholder: '% CashBack',
            elementAttr: {
                class: 'numberBox-format',
            },
            onValueChanged: function (e) {
                if (vSuprimeEventoOnChange) return;
                objParametroProgramaFidelidade.PC_PROGRAMA_FIDELIDADE = e.value;
                saveParametros();
            },
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "darkred",
                });

                var placeholderElement = e.component._$element.find('.dx-placeholder');
                placeholderElement.addClass('numberBox-format');
            },
        }).dxNumberBox('instance'),

        nbx_Pc_CashBack_Indicadores_Param = $('#nbx_Pc_CashBack_Indicadores_Param').dxNumberBox({
            value: 0,
            format: "###,###0.##'%'",
            min: 0,
            max: 100,
            showClearButton: false,
            showSpinButtons: false,
            step: 0.01,
            placeholder: '% CashBack',
            elementAttr: {
                class: 'numberBox-format',
            },
            onValueChanged: function (e) {
                if (vSuprimeEventoOnChange) return;
                objParametroProgramaFidelidade.PC_PROGRAMA_FIDELIDADE_INDICADOR = e.value;
                saveParametros();
            },
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "darkred",
                });

                var placeholderElement = e.component._$element.find('.dx-placeholder');
                placeholderElement.addClass('numberBox-format');
            },
        }).dxNumberBox('instance'),


        //RESTITUIÇÃO DE CRÉDITO 
        chkNaoPermiteRestituicaoCreditoCliente = $('#chkNaoPermiteRestituicaoCreditoCliente').dxCheckBox({
            text: 'Os Clientes não podem realizar saques, apenas podem utilizar os créditos para novas compras',
            value: true,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkPermiteRestituicaoCreditoCliente.option('value', false);
                } else if (chkPermiteRestituicaoCreditoCliente.option('value') == false) {
                    chkNaoPermiteRestituicaoCreditoCliente.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_CLIENTE = chkPermiteRestituicaoCreditoCliente.option('value');
                saveParametros();
            },
        }).dxCheckBox('instance'),

        chkPermiteRestituicaoCreditoCliente = $('#chkPermiteRestituicaoCreditoCliente').dxCheckBox({
            text: 'Os Clientes podem realizar saques em dinheiro de seus créditos diretamente no caixa',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkNaoPermiteRestituicaoCreditoCliente.option('value', false);
                } else if (chkNaoPermiteRestituicaoCreditoCliente.option('value') == false) {
                    chkPermiteRestituicaoCreditoCliente.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_CLIENTE = chkPermiteRestituicaoCreditoCliente.option('value');
                saveParametros();
            },
        }).dxCheckBox('instance'),

        chkNaoPermiteRestituicaoCreditoIndicadores = $('#chkNaoPermiteRestituicaoCreditoIndicadores').dxCheckBox({
            text: 'Os Indicadores não podem realizar saques, apenas podem utilizar os créditos para novas compras',
            value: true,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkPermiteRestituicaoCreditoIndicadores.option('value', false);
                } else if (chkPermiteRestituicaoCreditoIndicadores.option('value') == false) {
                    chkNaoPermiteRestituicaoCreditoIndicadores.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_INDICADOR = chkPermiteRestituicaoCreditoIndicadores.option('value');
                saveParametros();
            },
        }).dxCheckBox('instance'),

        chkPermiteRestituicaoCreditoIndicadores = $('#chkPermiteRestituicaoCreditoIndicadores').dxCheckBox({
            text: 'Os Indicadores podem realizar saques em dinheiro de seus créditos diretamente no caixa',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkNaoPermiteRestituicaoCreditoIndicadores.option('value', false);
                } else if (chkNaoPermiteRestituicaoCreditoIndicadores.option('value') == false) {
                    chkPermiteRestituicaoCreditoIndicadores.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_INDICADOR = chkPermiteRestituicaoCreditoIndicadores.option('value');
                saveParametros();
            },
        }).dxCheckBox('instance'),

        //RESTITUIÇÃO DE CRÉDITO EDIÇÃO
        chkNaoPermiteRestituicaoCreditoClienteParam = $('#chkNaoPermiteRestituicaoCreditoClienteParam').dxCheckBox({
            text: 'Os Clientes não podem realizar saques, apenas podem utilizar os créditos para novas compras',
            value: true,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkPermiteRestituicaoCreditoClienteParam.option('value', false);
                } else if (chkPermiteRestituicaoCreditoClienteParam.option('value') == false) {
                    chkNaoPermiteRestituicaoCreditoClienteParam.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_CLIENTE = chkPermiteRestituicaoCreditoClienteParam.option('value');
                saveParametros();
            },
        }).dxCheckBox('instance'),

        chkPermiteRestituicaoCreditoClienteParam = $('#chkPermiteRestituicaoCreditoClienteParam').dxCheckBox({
            text: 'Os Clientes podem realizar saques em dinheiro de seus créditos diretamente no caixa',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkNaoPermiteRestituicaoCreditoClienteParam.option('value', false);
                } else if (chkNaoPermiteRestituicaoCreditoClienteParam.option('value') == false) {
                    chkPermiteRestituicaoCreditoClienteParam.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_CLIENTE = chkPermiteRestituicaoCreditoClienteParam.option('value');
                saveParametros();
            },
        }).dxCheckBox('instance'),

        chkNaoPermiteRestituicaoCreditoIndicadoresParam = $('#chkNaoPermiteRestituicaoCreditoIndicadoresParam').dxCheckBox({
            text: 'Os Indicadores não podem realizar saques, apenas podem utilizar os créditos para novas compras',
            value: true,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkPermiteRestituicaoCreditoIndicadoresParam.option('value', false);
                } else if (chkPermiteRestituicaoCreditoIndicadoresParam.option('value') == false) {
                    chkNaoPermiteRestituicaoCreditoIndicadoresParam.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_INDICADOR = chkPermiteRestituicaoCreditoIndicadoresParam.option('value');
                saveParametros();
            },
        }).dxCheckBox('instance'),

        chkPermiteRestituicaoCreditoIndicadoresParam = $('#chkPermiteRestituicaoCreditoIndicadoresParam').dxCheckBox({
            text: 'Os Indicadores podem realizar saques em dinheiro de seus créditos diretamente no caixa',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkNaoPermiteRestituicaoCreditoIndicadoresParam.option('value', false);
                } else if (chkNaoPermiteRestituicaoCreditoIndicadoresParam.option('value') == false) {
                    chkPermiteRestituicaoCreditoIndicadoresParam.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_INDICADOR = chkPermiteRestituicaoCreditoIndicadoresParam.option('value');
                saveParametros();
            },
        }).dxCheckBox('instance'),

        //GERAÇÃO DE NOVO CASHBACK PARA CRÉDITOS UTILIZADOS EM NOVAS COMPRAS
        chkNaoGerarCashBackCreditosUtilizadosCliente = $('#chkNaoGerarCashBackCreditosUtilizadosCliente').dxCheckBox({
            text: 'Não gerar CashBack quando o Cliente utilizar seus créditos em novas compras',
            value: true,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkGerarCashBackCreditosUtilizadosCliente.option('value', false);
                } else if (chkGerarCashBackCreditosUtilizadosCliente.option('value') == false) {
                    chkNaoGerarCashBackCreditosUtilizadosCliente.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_CLIENTE = chkNaoGerarCashBackCreditosUtilizadosCliente.option('value');
                saveParametros();
            },
        }).dxCheckBox('instance'),

        chkGerarCashBackCreditosUtilizadosCliente = $('#chkGerarCashBackCreditosUtilizadosCliente').dxCheckBox({
            text: 'Gerar novo CashBack quando o Cliente utilizar seus créditos em novas compras',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkNaoGerarCashBackCreditosUtilizadosCliente.option('value', false);
                } else if (chkNaoGerarCashBackCreditosUtilizadosCliente.option('value') == false) {
                    chkGerarCashBackCreditosUtilizadosCliente.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_CLIENTE = chkNaoGerarCashBackCreditosUtilizadosCliente.option('value');
                saveParametros();
            },
        }).dxCheckBox('instance'),

        chkNaoGerarCashBackCreditosUtilizadosIndicadores = $('#chkNaoGerarCashBackCreditosUtilizadosIndicadores').dxCheckBox({
            text: 'Não gerar CashBack quando o Indicador utilizar seus créditos em novas compras',
            value: true,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkGerarCashBackCreditosUtilizadosIndicadores.option('value', false);
                } else if (chkGerarCashBackCreditosUtilizadosIndicadores.option('value') == false) {
                    chkNaoGerarCashBackCreditosUtilizadosIndicadores.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_INDICADOR = chkNaoGerarCashBackCreditosUtilizadosIndicadores.option('value');
                saveParametros();
            },
        }).dxCheckBox('instance'),

        chkGerarCashBackCreditosUtilizadosIndicadores = $('#chkGerarCashBackCreditosUtilizadosIndicadores').dxCheckBox({
            text: 'Gerar novo CashBack quando o Indicador utilizar seus créditos em novas compras',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkNaoGerarCashBackCreditosUtilizadosIndicadores.option('value', false);
                } else if (chkNaoGerarCashBackCreditosUtilizadosIndicadores.option('value') == false) {
                    chkGerarCashBackCreditosUtilizadosIndicadores.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_INDICADOR = chkNaoGerarCashBackCreditosUtilizadosIndicadores.option('value');
                saveParametros();
            },
        }).dxCheckBox('instance'),


        //GERAÇÃO DE NOVO CASHBACK PARA CRÉDITOS UTILIZADOS EM NOVAS COMPRAS (EDIÇÃO)
        chkNaoGerarCashBackCreditosUtilizadosClienteParam = $('#chkNaoGerarCashBackCreditosUtilizadosClienteParam').dxCheckBox({
            text: 'Não gerar CashBack quando o Cliente utilizar seus créditos em novas compras',
            value: true,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkGerarCashBackCreditosUtilizadosClienteParam.option('value', false);
                } else if (chkGerarCashBackCreditosUtilizadosClienteParam.option('value') == false) {
                    chkNaoGerarCashBackCreditosUtilizadosClienteParam.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_CLIENTE = chkNaoGerarCashBackCreditosUtilizadosClienteParam.option('value');
                saveParametros();
            },
        }).dxCheckBox('instance'),

        chkGerarCashBackCreditosUtilizadosClienteParam = $('#chkGerarCashBackCreditosUtilizadosClienteParam').dxCheckBox({
            text: 'Gerar novo CashBack quando o Cliente utilizar seus créditos em novas compras',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkNaoGerarCashBackCreditosUtilizadosClienteParam.option('value', false);
                } else if (chkNaoGerarCashBackCreditosUtilizadosClienteParam.option('value') == false) {
                    chkGerarCashBackCreditosUtilizadosClienteParam.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_CLIENTE = chkNaoGerarCashBackCreditosUtilizadosClienteParam.option('value');
                saveParametros();
            },
        }).dxCheckBox('instance'),

        chkNaoGerarCashBackCreditosUtilizadosIndicadoresParam = $('#chkNaoGerarCashBackCreditosUtilizadosIndicadoresParam').dxCheckBox({
            text: 'Não gerar CashBack quando o Indicador utilizar seus créditos em novas compras',
            value: true,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkGerarCashBackCreditosUtilizadosIndicadoresParam.option('value', false);
                } else if (chkGerarCashBackCreditosUtilizadosIndicadoresParam.option('value') == false) {
                    chkNaoGerarCashBackCreditosUtilizadosIndicadoresParam.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_INDICADOR = chkNaoGerarCashBackCreditosUtilizadosIndicadoresParam.option('value');
                saveParametros();
            },
        }).dxCheckBox('instance'),

        chkGerarCashBackCreditosUtilizadosIndicadoresParam = $('#chkGerarCashBackCreditosUtilizadosIndicadoresParam').dxCheckBox({
            text: 'Gerar novo CashBack quando o Indicador utilizar seus créditos em novas compras',
            value: false,
            iconSize: 20,
            elementAttr: {
                class: 'checkbox-font',
            },
            onValueChanged(e) {
                if (vSuprimeEventoOnChange == true) return;

                vSuprimeEventoOnChange = true; //SUPRIME O EVENTO PARA ALTERAR OS CAMPOS
                if (e.value == true) {
                    chkNaoGerarCashBackCreditosUtilizadosIndicadoresParam.option('value', false);
                } else if (chkNaoGerarCashBackCreditosUtilizadosIndicadoresParam.option('value') == false) {
                    chkGerarCashBackCreditosUtilizadosIndicadoresParam.option('value', true);
                }
                vSuprimeEventoOnChange = false;

                objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_INDICADOR = chkNaoGerarCashBackCreditosUtilizadosIndicadoresParam.option('value');
                saveParametros();
            },
        }).dxCheckBox('instance'),

        vChk_Ativar_Programa = $('#chk_Ativar_Programa').dxSwitch({
            value: true,
            switchedOffText: 'DESATIVADO',
            switchedOnText: 'ATIVADO',
            width: '120',
            onOptionChanged: function (e) {
                $('.dx-switch .dx-switch-off').css({
                    'color': 'darkred',
                });
                $('.dx-switch .dx-switch-on').css({
                    'color': 'rgb(51,122,183)',
                });
            },
            onValueChanged: function (e) {
                if (vSuprimeEventoOnChange) return;
                if (e.value) {
                    $('#cardDataInicioTermino').slideDown();
                } else {
                    $('#cardDataInicioTermino').slideUp();
                }
                objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_ATIVO = e.value;
                saveParametros();
            },
            elementAttr: {
                id: "elementId",
                class: "switch-font"
            },
        }).dxSwitch("instance"),

        vChk_Ativar_Programa_Param = $('#chk_Ativar_Programa_Param').dxSwitch({
            value: true,
            switchedOffText: 'DESATIVADO',
            switchedOnText: 'ATIVADO',
            width: '120',
            onOptionChanged: function (e) {
                $('.dx-switch .dx-switch-off').css({
                    'color': 'darkred',
                });
                $('.dx-switch .dx-switch-on').css({
                    'color': 'rgb(51,122,183)',
                });
            },
            onValueChanged: function (e) {
                if (vSuprimeEventoOnChange) return;

                if (e.value) {
                    $('#cardDataInicioTerminoParam').slideDown();
                } else {
                    $('#cardDataInicioTerminoParam').slideUp();
                }
                objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_ATIVO = e.value;
                saveParametros();
            },
            elementAttr: {
                id: "elementId",
                class: "switch-font"
            },
        }).dxSwitch("instance"),

        vDt_Inicio_Programa = $('#dt_Inicio_Programa').dxDateBox({
            readOnly: false,
            showClearButton: false,
            useMaskBehavior: true,
            displayFormat: 'dd/MM/yyyy',
            type: 'date',
            value: Date(),
            onValueChanged: function (e) {
                if (vSuprimeEventoOnChange) return;

                objParametroProgramaFidelidade.DT_PROGRAMA_FIDELIDADE_LANCAMENTO = e.value;
                saveParametros();
            },
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "darkred",
                });
            },
        }).dxDateBox("instance"),

        vDt_Inicio_Programa_Param = $('#dt_Inicio_Programa_Param').dxDateBox({
            readOnly: false,
            showClearButton: false,
            useMaskBehavior: true,
            displayFormat: 'dd/MM/yyyy',
            type: 'date',
            value: Date(),
            onValueChanged: function (e) {
                if (vSuprimeEventoOnChange) return;

                objParametroProgramaFidelidade.DT_PROGRAMA_FIDELIDADE_LANCAMENTO = e.value;
                saveParametros();
            },
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "darkred",
                });
            },
        }).dxDateBox("instance"),

        vDt_Termino_Programa = $('#dt_Termino_Programa').dxDateBox({
            placeholder: 'Sem data de término',
            readOnly: false,
            showClearButton: false,
            useMaskBehavior: true,
            displayFormat: 'dd/MM/yyyy',
            type: 'date',
            onValueChanged: function (e) {
                if (vSuprimeEventoOnChange) return;

                objParametroProgramaFidelidade.DT_PROGRAMA_FIDELIDADE_TERMINO = e.value;
                saveParametros();
            },
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "darkred",
                });
            },
        }).dxDateBox("instance"),

        vDt_Termino_Programa_Param = $('#dt_Termino_Programa_Param').dxDateBox({
            placeholder: 'Sem data de término',
            readOnly: false,
            showClearButton: false,
            useMaskBehavior: true,
            displayFormat: 'dd/MM/yyyy',
            type: 'date',
            onValueChanged: function (e) {
                if (vSuprimeEventoOnChange) return;

                objParametroProgramaFidelidade.DT_PROGRAMA_FIDELIDADE_TERMINO = e.value;
                saveParametros();
            },
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "darkred",
                });
            },
        }).dxDateBox("instance"),

        gridFiliaisPercentuaisDiferenciados = $("#gridFiliaisPercentuaisDiferenciados").dxDataGrid({
            dataSource: [],
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            showColumnLines: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            editing: {
                mode: 'cell',
                allowUpdating: true,
                startEditAction: 'click',
                allowAdding: false,
                allowDeleting: false,
                useIcons: false,
            },
            keyboardNavigation: {
                enterKeyAction: 'moveFocus',
                enterKeyDirection: 'column',
                editOnKeyPress: true,
            },
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            sorting: {
                mode: "multiple",
            },
            selection: {
                mode: 'multiple',
                allowSelectAll: true,
                showCheckBoxesMode: 'always',
                deferred: false,
            },
            allowColumnResizing: true,
            columnsAutoWidth: true,
            cellHintEnabled: true,
            allowColumnReordering: true,
            groupPanel: {
                visible: false,
                emptyPanelText: "Agrupar",
            },
            paging: {
                pageSize: 99999,
            },
            pager: {
                visible: false,
                allowedPageSizes: [10, 20, 50],
                showPageSizeSelector: false,
                showNavigationButtons: false
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('Filiais');

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'FiliaisPercentuaisCashBack.xlsx');
                    });
                });
                e.cancel = true;
            },
            filterRow: {
                visible: false,
                applyFilter: "auto",
            },
            headerFilter: {
                visible: false,
                allowSearch: false,
            },
            filterPanel: {
                visible: false,
            },
            columnChooser: {
                enabled: true,
                allowSearch: true,
                width: 300,
                height: 500,
            },
            keyExpr: 'CD_FILIAL',
            columns: [
                {
                    type: "selection",
                    dataField: "CD_SELECAO",
                    width: 30,
                    value: false,
                    allowHiding: false,
                },
                {
                    dataField: "CD_FILIAL",
                    caption: "Filial",
                    width: 60,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    allowFiltering: true,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                    visible: true,
                },
                {
                    dataField: "DS_NOME_FANTASIA",
                    caption: "Nome",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    allowFiltering: true,
                    alignment: 'left',
                    cssClass: "column-data-grid",
                    visible: false,
                },
                {
                    dataField: "DS_RAZAO_SOCIAL",
                    caption: "Razão Social",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    allowFiltering: true,
                    alignment: 'left',
                    cssClass: "column-data-grid",
                    visible: true,
                },
                {
                    dataField: "PC_PROGRAMA_FIDELIDADE",
                    caption: '% CashBack Clientes',
                    dataType: 'number',
                    format: "###,###,###,###,##0.##'%'",
                    width: 85,
                    allowEditing: true,
                    allowFiltering: false,
                    allowSorting: false,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "PC_PROGRAMA_FIDELIDADE_INDICADOR",
                    caption: '% CashBack Indicadores',
                    dataType: 'number',
                    format: "###,###,###,###,##0.##'%'",
                    width: 85,
                    allowEditing: true,
                    allowFiltering: false,
                    allowSorting: false,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },

            ],

            toolbar: {
                items: [
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-street-view',
                            text: ' Definir % Clientes',
                            hint: 'Define um percentual de Cashback de Clientes para todas as filiais selecionadas',
                            onClick() {
                                definePercentualDiferenciado(gridFiliaisPercentuaisDiferenciados, 'FILIAL', 'CLIENTE', 'VALORIZAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-handshake',
                            text: ' Definir % Indicadores',
                            hint: 'Define um percentual de Cashback de Indicadores para todas as filiais selecionadas',
                            onClick() {
                                definePercentualDiferenciado(gridFiliaisPercentuaisDiferenciados, 'FILIAL', 'INDICADOR', 'VALORIZAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-trash',
                            text: ' Limpar % Clientes',
                            hint: 'Limpa percentual de Cashback de Clientes de todas as filiais selecionadas',
                            onClick() {
                                definePercentualDiferenciado(gridFiliaisPercentuaisDiferenciados, 'FILIAL', 'CLIENTE', 'LIMPAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-trash',
                            text: ' Limpar % Indicadores',
                            hint: 'Limpa percentual de Cashback de Indicadores de todas as filiais selecionadas',
                            onClick() {
                                definePercentualDiferenciado(gridFiliaisPercentuaisDiferenciados, 'FILIAL', 'INDICADOR', 'LIMPAR');
                            },
                        },
                    },
                    {
                        name: "groupPanel",
                        locateInMenu: "auto",
                    },
                    'exportButton',
                    'columnChooserButton',
                    'searchPanel',
                ],
            },

            onEditorPreparing: function (e) {
                if (e.parentType == "dataRow" && typeof (e.dataField) != "undefined") {
                    if (e.dataField == "PC_PROGRAMA_FIDELIDADE" || e.dataField == "PC_PROGRAMA_FIDELIDADE_INDICADOR") {
                        var onValueChanged = e.editorOptions.onValueChanged;
                        e.editorOptions.onValueChanged = function (args) {
                            //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                            onValueChanged.apply(this, arguments);

                            //TRATAMENTO VALOR MENOR QUE ZERO
                            args.value = args.value < 0 ? args.previousValue : args.value;

                            //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                            onValueChanged.apply(this, arguments);
                        }
                    }
                }
            },

            onRowUpdating: (e) => {
                //CRIA UM OBJETO COM OS DADOS ANTIGOS
                var dadosAtualizados = JSON.parse(JSON.stringify(e.oldData));
                //ATUALIZA O OBJETO COM OS DADOS ATUAIS
                Object.keys(e.newData).forEach(key => {
                    dadosAtualizados[key] = e.newData[key];
                });

                e.cancel = saveFilialPercentualDiferenciado(e.key, dadosAtualizados.PC_PROGRAMA_FIDELIDADE, dadosAtualizados.PC_PROGRAMA_FIDELIDADE_INDICADOR)
            },

            onRowUpdated(e) {
                e.component.saveEditData();
            },

            onCellPrepared: function (e) {
                if (e.rowType === "data") {

                    if (e.column.dataField === "DS_STATUS") {
                        if (e.value === "Inativo") {
                            e.cellElement.css("color", "#d00000");
                            e.cellElement.css("font-weight", "bold");
                        };
                    }

                    if (e.column.dataField === "PC_PROGRAMA_FIDELIDADE" || e.column.dataField === "PC_PROGRAMA_FIDELIDADE_INDICADOR") {
                        e.cellElement.css("background-color", "#EDF3F8");
                        e.cellElement.css("color", "darkred");
                    }
                };
                if (e.rowType === "group") {
                    e.cellElement.css("color", "#f05b41");
                    e.cellElement.css("background-color", "white");
                };
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

        }).dxDataGrid('instance'),

        gridFiliaisPercentuaisDiferenciadosParam = $("#gridFiliaisPercentuaisDiferenciadosParam").dxDataGrid({
            dataSource: [],
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            showColumnLines: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            editing: {
                mode: 'cell',
                allowUpdating: true,
                startEditAction: 'click',
                allowAdding: false,
                allowDeleting: false,
                useIcons: false,
            },
            keyboardNavigation: {
                enterKeyAction: 'moveFocus',
                enterKeyDirection: 'column',
                editOnKeyPress: true,
            },
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            sorting: {
                mode: "multiple",
            },
            selection: {
                mode: 'multiple',
                allowSelectAll: true,
                showCheckBoxesMode: 'always',
                deferred: false,
            },
            allowColumnResizing: true,
            columnsAutoWidth: true,
            cellHintEnabled: true,
            allowColumnReordering: true,
            groupPanel: {
                visible: false,
                emptyPanelText: "Agrupar",
            },
            paging: {
                pageSize: 99999,
            },
            pager: {
                visible: false,
                allowedPageSizes: [10, 20, 50],
                showPageSizeSelector: false,
                showNavigationButtons: false
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('Filiais');

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'FiliaisPercentuaisCashBack.xlsx');
                    });
                });
                e.cancel = true;
            },
            filterRow: {
                visible: false,
                applyFilter: "auto",
            },
            headerFilter: {
                visible: false,
                allowSearch: false,
            },
            filterPanel: {
                visible: false,
            },
            columnChooser: {
                enabled: true,
                allowSearch: true,
                width: 300,
                height: 500,
            },
            keyExpr: 'CD_FILIAL',
            columns: [
                {
                    type: "selection",
                    dataField: "CD_SELECAO",
                    width: 30,
                    value: false,
                    allowHiding: false,
                },
                {
                    dataField: "CD_FILIAL",
                    caption: "Filial",
                    width: 60,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    allowFiltering: true,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                    visible: true,
                },
                {
                    dataField: "DS_NOME_FANTASIA",
                    caption: "Nome",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    allowFiltering: true,
                    alignment: 'left',
                    cssClass: "column-data-grid",
                    visible: false,
                },
                {
                    dataField: "DS_RAZAO_SOCIAL",
                    caption: "Razão Social",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    allowFiltering: true,
                    alignment: 'left',
                    cssClass: "column-data-grid",
                    visible: true,
                },
                {
                    dataField: "PC_PROGRAMA_FIDELIDADE",
                    caption: '% CashBack Clientes',
                    dataType: 'number',
                    format: "###,###,###,###,##0.##'%'",
                    width: 85,
                    allowEditing: true,
                    allowFiltering: false,
                    allowSorting: false,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "PC_PROGRAMA_FIDELIDADE_INDICADOR",
                    caption: '% CashBack Indicadores',
                    dataType: 'number',
                    format: "###,###,###,###,##0.##'%'",
                    width: 85,
                    allowEditing: true,
                    allowFiltering: false,
                    allowSorting: false,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },

            ],

            toolbar: {
                items: [
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-street-view',
                            text: ' Definir % Clientes',
                            hint: 'Define um percentual de Cashback de Clientes para todos as filiais selecionadas',
                            onClick() {
                                definePercentualDiferenciado(gridFiliaisPercentuaisDiferenciadosParam, 'FILIAL', 'CLIENTE', 'VALORIZAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-handshake',
                            text: ' Definir % Indicadores',
                            hint: 'Define um percentual de Cashback de Indicadores para todas as filiais selecionadas',
                            onClick() {
                                definePercentualDiferenciado(gridFiliaisPercentuaisDiferenciadosParam, 'FILIAL', 'INDICADOR', 'VALORIZAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-trash',
                            text: ' Limpar % Clientes',
                            hint: 'Limpa percentual de Cashback de Clientes de todas as filiais selecionadas',
                            onClick() {
                                definePercentualDiferenciado(gridFiliaisPercentuaisDiferenciadosParam, 'FILIAL', 'CLIENTE', 'LIMPAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-trash',
                            text: ' Limpar % Indicadores',
                            hint: 'Limpa percentual de Cashback de Indicadores de todas as filiais selecionadas',
                            onClick() {
                                definePercentualDiferenciado(gridFiliaisPercentuaisDiferenciadosParam, 'FILIAL', 'INDICADOR', 'LIMPAR');
                            },
                        },
                    },
                    {
                        name: "groupPanel",
                        locateInMenu: "auto",
                    },
                    'exportButton',
                    'columnChooserButton',
                    'searchPanel',
                ],
            },

            onCellPrepared: function (e) {
                if (e.rowType === "data") {

                    if (e.column.dataField === "DS_STATUS") {
                        if (e.value === "Inativo") {
                            e.cellElement.css("color", "#d00000");
                            e.cellElement.css("font-weight", "bold");
                        };
                    }

                    if (e.column.dataField === "PC_PROGRAMA_FIDELIDADE" || e.column.dataField === "PC_PROGRAMA_FIDELIDADE_INDICADOR") {
                        e.cellElement.css("background-color", "#EDF3F8");
                        e.cellElement.css("color", "darkred");
                    }
                };
                if (e.rowType === "group") {
                    e.cellElement.css("color", "#f05b41");
                    e.cellElement.css("background-color", "white");
                };
            },

            onRowUpdating: (e) => {
                //CRIA UM OBJETO COM OS DADOS ANTIGOS
                var dadosAtualizados = JSON.parse(JSON.stringify(e.oldData));
                //ATUALIZA O OBJETO COM OS DADOS ATUAIS
                Object.keys(e.newData).forEach(key => {
                    dadosAtualizados[key] = e.newData[key];
                });

                e.cancel = saveFilialPercentualDiferenciado(e.key, dadosAtualizados.PC_PROGRAMA_FIDELIDADE, dadosAtualizados.PC_PROGRAMA_FIDELIDADE_INDICADOR)
            },

            onRowUpdated(e) {
                e.component.saveEditData();
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
        }).dxDataGrid('instance'),

        gridClientesIndicadoresPercentuaisDiferenciados = $("#gridClientesIndicadoresPercentuaisDiferenciados").dxDataGrid({
            dataSource: [],
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            columnHidingEnabled: true,
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            editing: {
                mode: 'cell',
                allowUpdating: true,
                startEditAction: 'click',
                allowAdding: false,
                allowDeleting: false,
                useIcons: false,
            },
            keyboardNavigation: {
                enterKeyAction: 'moveFocus',
                enterKeyDirection: 'column',
                editOnKeyPress: true,
            },
            sorting: { mode: "multiple" },
            selection: {
                mode: 'multiple',
                allowSelectAll: true,
                showCheckBoxesMode: 'always',
                deferred: false,
            },
            focusedRowEnabled: false,
            allowColumnResizing: true,
            allowColumnReordering: true,
            groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
            paging: { pageSize: 10 },
            pager: {
                visible: true,
                allowedPageSizes: [10, 15, 20, 50, 100],
                showPageSizeSelector: true,
                showNavigationButtons: true
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('Percentuais');

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadePercentuaisDiferenciadosClientes.xlsx');
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
            columnChooser: {
                enabled: true,
                allowSearch: true,
                height: 500,
                position: {
                    my: 'right top',
                    at: 'right bottom',
                    of: '.dx-datagrid-column-chooser-button',
                },

            },
            columnsAutoWidth: true,
            stateStoring: AutoLoad("gridClientesIndicadoresPercentuaisDiferenciados", false),
            keyExpr: 'CD_CPF_CNPJ',
            columns: [
                {
                    type: "selection",
                    dataField: "CD_SELECAO",
                    width: 30,
                    value: false,
                    allowHiding: false,
                },
                { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                { dataField: "LG_INDICADOR", width: 90, caption: "Indicador", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", allowHiding: true, },
                { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "PC_PROGRAMA_FIDELIDADE", caption: "% CashBack Cliente", width: 80, dataType: 'number', format: "###,###,###,###,##0.##'%'", allowEditing: true, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", allowHiding: false, },
                { dataField: "PC_PROGRAMA_FIDELIDADE_INDICADOR", caption: "% CashBack Indicador", width: 80, dataType: 'number', format: "###,###,###,###,##0.##'%'", allowEditing: true, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", allowHiding: false, },

                { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE", width: 100, caption: "Cliente Habilitado Programa", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR", width: 100, caption: "Indicador Habilitado Programa", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE", width: 100, caption: "Cliente Bloqueado Programa", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR", width: 100, caption: "Indicador Bloqueado Programa", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
            ],

            showBorders: true,

            onCellPrepared: function (e) {

                if (e.rowType === "data") {
                    if (e.column.dataField === "DS_STATUS") {
                        if (e.value === "Inativo") {
                            e.cellElement.css("color", "#d00000");
                            e.cellElement.css("font-weight", "bold");
                        };
                    }

                    if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE") {
                        if (e.value === "Sim") {
                            e.cellElement.css("color", "#b23a48");
                            e.cellElement.css("background-color", "#fae0e4");
                        };
                    }

                    if (e.column.dataField === "LG_INDICADOR") {
                        if (e.value === "Sim") {
                            e.cellElement.css("background-color", "#33658a");
                            e.cellElement.css("color", "white");
                        };
                    }

                    if (e.column.dataField === "PC_PROGRAMA_FIDELIDADE" || e.column.dataField === "PC_PROGRAMA_FIDELIDADE_INDICADOR") {
                        e.cellElement.css("background-color", "#EDF3F8");
                        e.cellElement.css("color", "darkred");
                    }
                }
            },

            onRowUpdating: (e) => {
                //CRIA UM OBJETO COM OS DADOS ANTIGOS
                var dadosAtualizados = JSON.parse(JSON.stringify(e.oldData));
                //ATUALIZA O OBJETO COM OS DADOS ATUAIS
                Object.keys(e.newData).forEach(key => {
                    dadosAtualizados[key] = e.newData[key];
                });

                e.cancel = saveClienteIndicadorPercentualDiferenciado(e.key, dadosAtualizados.PC_PROGRAMA_FIDELIDADE, dadosAtualizados.PC_PROGRAMA_FIDELIDADE_INDICADOR)
            },

            onRowUpdated(e) {
                e.component.saveEditData();
            },

            toolbar: {
                items: [
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-street-view',
                            text: ' Definir % Clientes',
                            hint: 'Define um percentual de Cashback de Clientes para todos os registros selecionados',
                            onClick() {
                                definePercentualDiferenciado(gridClientesIndicadoresPercentuaisDiferenciados, 'CLIENTE', 'CLIENTE', 'VALORIZAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-handshake',
                            text: ' Definir % Indicadores',
                            hint: 'Define um percentual de Cashback de Indicadores para todos os registros selecionados',
                            onClick() {
                                definePercentualDiferenciado(gridClientesIndicadoresPercentuaisDiferenciados, 'CLIENTE', 'INDICADOR', 'VALORIZAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-trash',
                            text: ' Limpar % Clientes',
                            hint: 'Limpa percentual de Cashback de Clientes de todos os registros selecionados',
                            onClick() {
                                definePercentualDiferenciado(gridClientesIndicadoresPercentuaisDiferenciados, 'CLIENTE', 'CLIENTE', 'LIMPAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-trash',
                            text: ' Limpar % Indicadores',
                            hint: 'Limpa percentual de Cashback de Indicadores de todos os registros selecionados',
                            onClick() {
                                definePercentualDiferenciado(gridClientesIndicadoresPercentuaisDiferenciados, 'CLIENTE', 'INDICADOR', 'LIMPAR');
                            },
                        },
                    },
                    {
                        name: "groupPanel",
                        locateInMenu: "auto",
                    },
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
                                        gridClientesIndicadoresPercentuaisDiferenciados.state({});
                                        gridClientesIndicadoresPercentuaisDiferenciados.refresh();

                                        gridClientesIndicadoresPercentuaisDiferenciados.updateDimensions();
                                    }
                                });
                            }
                        }
                    },
                    'exportButton',
                    'columnChooserButton',
                    'searchPanel',
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

        }).dxDataGrid('instance'),

        gridClientesIndicadoresPercentuaisDiferenciadosParam = $("#gridClientesIndicadoresPercentuaisDiferenciadosParam").dxDataGrid({
            dataSource: [],
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            columnHidingEnabled: true,
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            editing: {
                mode: 'cell',
                allowUpdating: true,
                startEditAction: 'click',
                allowAdding: false,
                allowDeleting: false,
                useIcons: false,
            },
            keyboardNavigation: {
                enterKeyAction: 'moveFocus',
                enterKeyDirection: 'column',
                editOnKeyPress: true,
            },
            sorting: { mode: "multiple" },
            selection: {
                mode: 'multiple',
                allowSelectAll: true,
                showCheckBoxesMode: 'always',
                deferred: false,
            },
            focusedRowEnabled: false,
            allowColumnResizing: true,
            allowColumnReordering: true,
            groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
            paging: { pageSize: 10 },
            pager: {
                visible: true,
                allowedPageSizes: [10, 15, 20, 50, 100],
                showPageSizeSelector: true,
                showNavigationButtons: true
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('Percentuais');

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadePercentuaisDiferenciadosClientes.xlsx');
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
            columnChooser: {
                enabled: true,
                allowSearch: true,
                height: 500,
                position: {
                    my: 'right top',
                    at: 'right bottom',
                    of: '.dx-datagrid-column-chooser-button',
                },

            },
            columnsAutoWidth: true,
            stateStoring: AutoLoad("gridClientesIndicadoresPercentuaisDiferenciadosParam", false),
            keyExpr: 'CD_CPF_CNPJ',
            columns: [
                {
                    type: "selection",
                    dataField: "CD_SELECAO",
                    width: 30,
                    value: false,
                    allowHiding: false,
                },
                { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                { dataField: "LG_INDICADOR", width: 90, caption: "Indicador", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", allowHiding: true, },
                { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "PC_PROGRAMA_FIDELIDADE", caption: "% CashBack Cliente", width: 80, dataType: 'number', format: "###,###,###,###,##0.##'%'", allowEditing: true, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", allowHiding: false, },
                { dataField: "PC_PROGRAMA_FIDELIDADE_INDICADOR", caption: "% CashBack Indicador", width: 80, dataType: 'number', format: "###,###,###,###,##0.##'%'", allowEditing: true, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", allowHiding: false, },

                { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE", width: 100, caption: "Cliente Habilitado Programa", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR", width: 100, caption: "Indicador Habilitado Programa", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE", width: 100, caption: "Cliente Bloqueado Programa", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR", width: 100, caption: "Indicador Bloqueado Programa", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
            ],

            showBorders: true,

            onCellPrepared: function (e) {

                if (e.rowType === "data") {
                    if (e.column.dataField === "DS_STATUS") {
                        if (e.value === "Inativo") {
                            e.cellElement.css("color", "#d00000");
                            e.cellElement.css("font-weight", "bold");
                        };
                    }

                    if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE") {
                        if (e.value === "Sim") {
                            e.cellElement.css("color", "#b23a48");
                            e.cellElement.css("background-color", "#fae0e4");
                        };
                    }

                    if (e.column.dataField === "LG_INDICADOR") {
                        if (e.value === "Sim") {
                            e.cellElement.css("background-color", "#33658a");
                            e.cellElement.css("color", "white");
                        };
                    }

                    if (e.column.dataField === "PC_PROGRAMA_FIDELIDADE" || e.column.dataField === "PC_PROGRAMA_FIDELIDADE_INDICADOR") {
                        e.cellElement.css("background-color", "#EDF3F8");
                        e.cellElement.css("color", "darkred");
                    }
                }
            },

            onRowUpdating: (e) => {
                //CRIA UM OBJETO COM OS DADOS ANTIGOS
                var dadosAtualizados = JSON.parse(JSON.stringify(e.oldData));
                //ATUALIZA O OBJETO COM OS DADOS ATUAIS
                Object.keys(e.newData).forEach(key => {
                    dadosAtualizados[key] = e.newData[key];
                });

                e.cancel = saveClienteIndicadorPercentualDiferenciado(e.key, dadosAtualizados.PC_PROGRAMA_FIDELIDADE, dadosAtualizados.PC_PROGRAMA_FIDELIDADE_INDICADOR)
            },

            onRowUpdated(e) {
                e.component.saveEditData();
            },

            toolbar: {
                items: [
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-street-view',
                            text: ' Definir % Clientes',
                            hint: 'Define um percentual de Cashback de Clientes para todos os registros selecionados',
                            onClick() {
                                definePercentualDiferenciado(gridClientesIndicadoresPercentuaisDiferenciadosParam, 'CLIENTE', 'CLIENTE', 'VALORIZAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-handshake',
                            text: ' Definir % Indicadores',
                            hint: 'Define um percentual de Cashback de Indicadores para todos os registros selecionados',
                            onClick() {
                                definePercentualDiferenciado(gridClientesIndicadoresPercentuaisDiferenciadosParam, 'CLIENTE', 'INDICADOR', 'VALORIZAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-trash',
                            text: ' Limpar % Clientes',
                            hint: 'Limpa percentual de Cashback de Clientes de todos os registros selecionados',
                            onClick() {
                                definePercentualDiferenciado(gridClientesIndicadoresPercentuaisDiferenciadosParam, 'CLIENTE', 'CLIENTE', 'LIMPAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-trash',
                            text: ' Limpar % Indicadores',
                            hint: 'Limpa percentual de Cashback de Indicadores de todos os registros selecionados',
                            onClick() {
                                definePercentualDiferenciado(gridClientesIndicadoresPercentuaisDiferenciadosParam, 'CLIENTE', 'INDICADOR', 'LIMPAR');
                            },
                        },
                    },
                    {
                        name: "groupPanel",
                        locateInMenu: "auto",
                    },
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
                                        gridClientesIndicadoresPercentuaisDiferenciadosParam.state({});
                                        gridClientesIndicadoresPercentuaisDiferenciadosParam.refresh();

                                        gridClientesIndicadoresPercentuaisDiferenciadosParam.updateDimensions();
                                    }
                                });
                            }
                        }
                    },
                    'exportButton',
                    'columnChooserButton',
                    'searchPanel',
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

        }).dxDataGrid('instance'),

        $('#popoverDefinicaoIndicadores').dxPopover({
            target: '#linkDefinicaoIndicadores',
            showEvent: 'mouseenter',
            hideEvent: 'mouseleave',
            position: 'right',
            animation: {
                show: {
                    type: 'pop',
                    from: { scale: 0 },
                    to: { scale: 1 },
                },
                hide: {
                    type: 'fade',
                    from: 1,
                    to: 0,
                },
            },
        }),

        gridFiliais = $("#gridFiliais").dxDataGrid({
            dataSource: [],
            hoverStateEnabled: true,
            showBorders: false,
            showRowLines: false,
            showColumnLines: false,
            rowAlternationEnabled: true,
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
                visible: false,
                emptyPanelText: "Agrupar",
            },
            paging: {
                pageSize: 99999,
            },
            pager: {
                visible: false,
                allowedPageSizes: [10, 20, 50],
                showPageSizeSelector: false,
                showNavigationButtons: false
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('Filiais');

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'FiliaisParicipantesCashBack.xlsx');
                    });
                });
                e.cancel = true;
            },
            filterRow: {
                visible: false,
                applyFilter: "auto",
            },
            headerFilter: {
                visible: false,
                allowSearch: false,
            },
            filterPanel: {
                visible: false,
            },
            columnChooser: {
                enabled: true,
                allowSearch: true,
                width: 300,
                height: 500,
            },
            keyExpr: 'CD_FILIAL',
            columns: [
                {
                    dataField: "CD_FILIAL",
                    caption: "Filial",
                    width: 60,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    allowFiltering: true,
                    alignment: 'center',
                    cssClass: "column-data-grid-lg",
                    visible: true,
                },
                {
                    dataField: "DS_NOME_FANTASIA",
                    caption: "Nome",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    allowFiltering: true,
                    alignment: 'left',
                    cssClass: "column-data-grid-lg",
                    visible: true,
                },
                {
                    caption: 'Habilitada',
                    width: 85,
                    allowFiltering: false,
                    allowSorting: false,
                    alignment: 'center',
                    cssClass: "column-data-grid-lg",
                    cellTemplate: function (e, x) {

                        var imgHabilitada
                        var btnHabilitada

                        if (x.data.LG_PROGRAMA_FIDELIDADE_ATIVO == true) {
                            imgHabilitada = 'block'
                            btnHabilitada = 'none'
                        } else {
                            imgHabilitada = 'none'
                            btnHabilitada = 'block'
                        }

                        e.append(`
                                <div class="row mt-1 mb-0 text-center">
                                    <div class="col-lg-12 mt-0 mb-0 text-center">
                                        <img src="/img/check2.png" id="imgFilial${x.data.CD_FILIAL}" class="ml-4" style="width: 25px; cursor: pointer; display: ${imgHabilitada};" data-toggle="tooltip" data-placement="top" title="Clique para desabilitar a Filial no programa de fidelidade" onclick="configuraFilial(${x.data.CD_FILIAL}, false, false);">
                                        <button type="button" id="btnFilial${x.data.CD_FILIAL}" class="mb-1 mt-0 ml-2 btn btn-xs btn-dark" style="display: ${btnHabilitada};" data-toggle="tooltip" data-placement="right" title="Clique para habilitar a Filial no programa de fidelidade" onclick="configuraFilial(${x.data.CD_FILIAL}, true, false);"><h6 class="mb-0 mt-0 text-center ml-1 mr-1" style="font-size: 12px">ativar</h6></button>
                                    </div>
                                </div>`);

                    },
                },

            ],

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

            onInitialized(e) {
                new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            e.component.updateDimensions();
                        }
                    });
                }).observe(e.element[0]);
            },
        }).dxDataGrid("instance"),

        gridFiliaisParam = $("#gridFiliaisParam").dxDataGrid({
            dataSource: [],
            hoverStateEnabled: true,
            showBorders: false,
            showRowLines: false,
            showColumnLines: false,
            rowAlternationEnabled: true,
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
                visible: false,
                emptyPanelText: "Agrupar",
            },
            paging: {
                pageSize: 99999,
            },
            pager: {
                visible: false,
                allowedPageSizes: [10, 20, 50],
                showPageSizeSelector: false,
                showNavigationButtons: false
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('Filiais');

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'FiliaisParicipantesCashBack.xlsx');
                    });
                });
                e.cancel = true;
            },
            filterRow: {
                visible: false,
                applyFilter: "auto",
            },
            headerFilter: {
                visible: false,
                allowSearch: false,
            },
            filterPanel: {
                visible: false,
            },
            columnChooser: {
                enabled: true,
                allowSearch: true,
                width: 300,
                height: 500,
            },
            keyExpr: 'CD_FILIAL',
            columns: [
                {
                    dataField: "CD_FILIAL",
                    caption: "Filial",
                    width: 60,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    allowFiltering: true,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                    visible: true,
                },
                {
                    dataField: "DS_NOME_FANTASIA",
                    caption: "Nome",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    allowFiltering: true,
                    alignment: 'left',
                    cssClass: "column-data-grid",
                    visible: true,
                },
                {
                    //dataField: "CD_FILIAL",
                    caption: 'Habilitada',
                    width: 85,
                    allowFiltering: false,
                    allowSorting: false,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                    cellTemplate: function (e, x) {

                        var imgHabilitada
                        var btnHabilitada

                        if (x.data.LG_PROGRAMA_FIDELIDADE_ATIVO == true) {
                            imgHabilitada = 'block'
                            btnHabilitada = 'none'
                        } else {
                            imgHabilitada = 'none'
                            btnHabilitada = 'block'
                        }

                        e.append(`
                                <div class="row mt-1 mb-0 text-center">
                                    <div class="col-lg-12 mt-0 mb-0 text-center">
                                        <img src="/img/check2.png" id="imgFilialParam${x.data.CD_FILIAL}" class="ml-4" style="width: 25px; cursor: pointer; display: ${imgHabilitada};" data-toggle="tooltip" data-placement="top" title="Clique para desabilitar a Filial no programa de fidelidade" onclick="configuraFilial(${x.data.CD_FILIAL}, false, true);">
                                        <button type="button" id="btnFilialParam${x.data.CD_FILIAL}" class="mb-1 mt-0 ml-2 btn btn-xs btn-dark" style="display: ${btnHabilitada};" data-toggle="tooltip" data-placement="right" title="Clique para habilitar a Filial no programa de fidelidade" onclick="configuraFilial(${x.data.CD_FILIAL},true, true);"><h6 class="mb-0 mt-0 text-center ml-1 mr-1" style="font-size: 12px">ativar</h6></button>
                                    </div>
                                </div>`);

                    },
                },
            ],

            //summary: {
            //    totalItems: [{
            //        column: 'NR_NOTA_FISCAL',
            //        summaryType: 'count',
            //        displayFormat: "{0} Notas",
            //    },],
            //},

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

            onInitialized(e) {
                new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            e.component.updateDimensions();
                        }
                    });
                }).observe(e.element[0]);
            },
        }).dxDataGrid("instance"),

        treeFamiliasPercentuaisDiferenciados = $("#treeFamiliasPercentuaisDiferenciados").dxTreeList({
            dataSource: [],
            searchExpr: ['DS_FAMILIA'],
            displayExpr: 'DS_FAMILIA',
            valueExpr: 'CD_FAMILIA',

            keyExpr: 'CD_FAMILIA',
            parentIdExpr: 'CD_FAMILIA_PAI',
            autoExpandAll: false,

            wordWrapEnabled: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            editing: {
                mode: 'cell',
                allowUpdating: true,
                startEditAction: 'click',
                allowAdding: false,
                allowDeleting: false,
                useIcons: false,
            },
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            loadPanel: { enabled: true, },
            sorting: { mode: "multiple" },
            allowColumnResizing: true,
            columnResizingMode: "widget",
            allowColumnReordering: true,
            groupPanel: { visible: true },
            selection: {
                mode: 'multiple',
                showCheckBoxesMode: 'always',
            },
            keyboardNavigation: {
                enterKeyAction: 'moveFocus',
                enterKeyDirection: 'column',
                editOnKeyPress: true,
            },
            focusedRowEnabled: false,
            hoverStateEnabled: true,
            paging: { pageSize: 25 },
            filterRow: { visible: true, applyFilter: "auto" },
            headerFilter: {
                visible: true,
                allowSearch: true
            },
            filterPanel: { visible: true },
            columnChooser: { enabled: true, allowSearch: true, },
            columnsAutoWidth: true,
            cellHintEnabled: true,

            columns: [
                {
                    dataField: "DS_FAMILIA",
                    caption: "Famílias",
                    allowEditing: false,
                    allowHeaderFiltering: true,
                    allowSorting: true,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "CD_FAMILIA",
                    caption: "Código Família",
                    width: 100,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    alignment: 'center',
                    visible: false,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "CD_FAMILIA_PAI",
                    caption: "Código Pai",
                    width: 100,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    alignment: 'center',
                    visible: false,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "DS_STATUS",
                    caption: "Status",
                    width: 90,
                    allowEditing: false,
                    allowHeaderFiltering: true,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "PC_PROGRAMA_FIDELIDADE",
                    caption: "% CashBack Cliente",
                    width: 110,
                    dataType: "number",
                    format: "###,###,###,##0.##'%'",
                    allowEditing: true,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                    alignment: 'center',
                },
                {
                    dataField: "PC_PROGRAMA_FIDELIDADE_INDICADOR",
                    caption: "% CashBack Indicador",
                    width: 110,
                    dataType: "number",
                    format: "###,###,###,##0.##'%'",
                    allowEditing: true,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                    alignment: 'center',
                },

            ],

            toolbar: {
                items: [
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'auto',
                        options: {
                            icon: 'hierarchy',
                            text: 'Expandir Famílias',
                            hint: 'Fechar ou expandir as famílias',
                            onClick(e) {
                                if (e.component.option('text') === 'Fechar Famílias') {

                                    collapseAllNodes(treeFamiliasPercentuaisDiferenciados);
                                    e.component.option('text', 'Expandir Famílias');
                                    e.component.option('icon', 'hierarchy');

                                } else {

                                    expandAllNodes(treeFamiliasPercentuaisDiferenciados);
                                    e.component.option('text', 'Fechar Famílias');
                                    e.component.option('icon', 'hidepanel');

                                };
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-street-view',
                            text: ' Definir % Clientes',
                            hint: 'Define um percentual de Cashback de Clientes para todas as famílias selecionadas',
                            onClick() {
                                definePercentualDiferenciado(treeFamiliasPercentuaisDiferenciados, 'FAMILIA', 'CLIENTE', 'VALORIZAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-handshake',
                            text: ' Definir % Indicadores',
                            hint: 'Define um percentual de Cashback de Indicadores para todas as famílias selecionadas',
                            onClick() {
                                definePercentualDiferenciado(treeFamiliasPercentuaisDiferenciados, 'FAMILIA', 'INDICADOR', 'VALORIZAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-trash',
                            text: ' Limpar % Clientes',
                            hint: 'Limpa percentual de Cashback de Clientes de todas as famílias selecionadas',
                            onClick() {
                                definePercentualDiferenciado(treeFamiliasPercentuaisDiferenciados, 'FAMILIA', 'CLIENTE', 'LIMPAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-trash',
                            text: ' Limpar % Indicadores',
                            hint: 'Limpa percentual de Cashback de Indicadores de todas as famílias selecionadas',
                            onClick() {
                                definePercentualDiferenciado(treeFamiliasPercentuaisDiferenciados, 'FAMILIA', 'INDICADOR', 'LIMPAR');
                            },
                        },
                    },
                    'groupPanel',
                    'columnChooserButton',
                    'searchPanel',
                ],
            },

            showBorders: true,

            onCellPrepared: function (e) {
                if (e.rowType === "data") {
                    if (e.column.dataField === "PC_PROGRAMA_FIDELIDADE" || e.column.dataField === "PC_PROGRAMA_FIDELIDADE_INDICADOR") {
                        e.cellElement.css("background-color", "#EDF3F8");
                        e.cellElement.css("color", "darkred");
                    }
                    if (e.column.dataField === "DS_STATUS") {
                        if (e.value == "Inativo") {
                            e.cellElement.css("color", "#d00000");
                            e.cellElement.css("font-weight", "bold");
                        }
                    }
                }
            },

            paging: { enabled: true, pageSize: 10 },
            scrolling: { mode: 'virtual' },
            height: '100%',
            onSelectionChanged(selectedItems) {
                //const keys = selectedItems.selectedRowKeys;
                //e.component.option('value', keys);
            },

            onRowUpdating: (e) => {
                //CRIA UM OBJETO COM OS DADOS ANTIGOS
                var dadosAtualizados = JSON.parse(JSON.stringify(e.oldData));
                //ATUALIZA O OBJETO COM OS DADOS ATUAIS
                Object.keys(e.newData).forEach(key => {
                    dadosAtualizados[key] = e.newData[key];
                });

                e.cancel = saveFamiliaPercentualDiferenciado(e.key, dadosAtualizados.PC_PROGRAMA_FIDELIDADE, dadosAtualizados.PC_PROGRAMA_FIDELIDADE_INDICADOR)
            },

            onRowUpdated(e) {
                e.component.saveEditData();
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
        }).dxTreeList('instance'),

        treeFamiliasPercentuaisDiferenciadosParam = $("#treeFamiliasPercentuaisDiferenciadosParam").dxTreeList({
            dataSource: [],
            searchExpr: ['DS_FAMILIA'],
            displayExpr: 'DS_FAMILIA',
            valueExpr: 'CD_FAMILIA',

            keyExpr: 'CD_FAMILIA',
            parentIdExpr: 'CD_FAMILIA_PAI',
            autoExpandAll: false,

            wordWrapEnabled: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            editing: {
                mode: 'cell',
                allowUpdating: true,
                startEditAction: 'click',
                allowAdding: false,
                allowDeleting: false,
                useIcons: false,
            },
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            loadPanel: { enabled: true, },
            sorting: { mode: "multiple" },
            allowColumnResizing: true,
            columnResizingMode: "widget",
            allowColumnReordering: true,
            groupPanel: { visible: true },
            selection: {
                mode: 'multiple',
                showCheckBoxesMode: 'always',
            },
            keyboardNavigation: {
                enterKeyAction: 'moveFocus',
                enterKeyDirection: 'column',
                editOnKeyPress: true,
            },
            focusedRowEnabled: false,
            hoverStateEnabled: true,
            paging: { pageSize: 25 },
            filterRow: { visible: true, applyFilter: "auto" },
            headerFilter: {
                visible: true,
                allowSearch: true
            },
            filterPanel: { visible: true },
            columnChooser: { enabled: true, allowSearch: true, },
            columnsAutoWidth: true,
            cellHintEnabled: true,

            columns: [
                {
                    dataField: "DS_FAMILIA",
                    caption: "Famílias",
                    allowEditing: false,
                    allowHeaderFiltering: true,
                    allowSorting: true,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "CD_FAMILIA",
                    caption: "Código Família",
                    width: 100,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    alignment: 'center',
                    visible: false,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "CD_FAMILIA_PAI",
                    caption: "Código Pai",
                    width: 100,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    alignment: 'center',
                    visible: false,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "DS_STATUS",
                    caption: "Status",
                    width: 90,
                    allowEditing: false,
                    allowHeaderFiltering: true,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "PC_PROGRAMA_FIDELIDADE",
                    caption: "% CashBack Cliente",
                    width: 110,
                    dataType: "number",
                    format: "###,###,###,##0.##'%'",
                    allowEditing: true,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                    alignment: 'center',
                },
                {
                    dataField: "PC_PROGRAMA_FIDELIDADE_INDICADOR",
                    caption: "% CashBack Indicador",
                    width: 110,
                    dataType: "number",
                    format: "###,###,###,##0.##'%'",
                    allowEditing: true,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                    alignment: 'center',
                },

            ],

            toolbar: {
                items: [
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'auto',
                        options: {
                            icon: 'hierarchy',
                            text: 'Expandir Famílias',
                            hint: 'Fechar ou expandir as famílias',
                            onClick(e) {
                                if (e.component.option('text') === 'Fechar Famílias') {

                                    collapseAllNodes(treeFamiliasPercentuaisDiferenciadosParam);
                                    e.component.option('text', 'Expandir Famílias');
                                    e.component.option('icon', 'hierarchy');

                                } else {

                                    expandAllNodes(treeFamiliasPercentuaisDiferenciadosParam);
                                    e.component.option('text', 'Fechar Famílias');
                                    e.component.option('icon', 'hidepanel');

                                };
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-street-view',
                            text: ' Definir % Clientes',
                            hint: 'Define um percentual de Cashback de Clientes para todas as famílias selecionadas',
                            onClick() {
                                definePercentualDiferenciado(treeFamiliasPercentuaisDiferenciadosParam, 'FAMILIA', 'CLIENTE', 'VALORIZAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-handshake',
                            text: ' Definir % Indicadores',
                            hint: 'Define um percentual de Cashback de Indicadores para todas as famílias selecionadas',
                            onClick() {
                                definePercentualDiferenciado(treeFamiliasPercentuaisDiferenciadosParam, 'FAMILIA', 'INDICADOR', 'VALORIZAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-trash',
                            text: ' Limpar % Clientes',
                            hint: 'Limpa percentual de Cashback de Clientes de todas as famílias selecionadas',
                            onClick() {
                                definePercentualDiferenciado(treeFamiliasPercentuaisDiferenciadosParam, 'FAMILIA', 'CLIENTE', 'LIMPAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-trash',
                            text: ' Limpar % Indicadores',
                            hint: 'Limpa percentual de Cashback de Indicadores de todas as famílias selecionadas',
                            onClick() {
                                definePercentualDiferenciado(treeFamiliasPercentuaisDiferenciadosParam, 'FAMILIA', 'INDICADOR', 'LIMPAR');
                            },
                        },
                    },
                    'groupPanel',
                    'columnChooserButton',
                    'searchPanel',
                ],
            },

            showBorders: true,

            onCellPrepared: function (e) {
                if (e.rowType === "data") {
                    if (e.column.dataField === "PC_PROGRAMA_FIDELIDADE" || e.column.dataField === "PC_PROGRAMA_FIDELIDADE_INDICADOR") {
                        e.cellElement.css("background-color", "#EDF3F8");
                        e.cellElement.css("color", "darkred");
                    }
                    if (e.column.dataField === "DS_STATUS") {
                        if (e.value == "Inativo") {
                            e.cellElement.css("color", "#d00000");
                            e.cellElement.css("font-weight", "bold");
                        }
                    }
                }
            },

            paging: { enabled: true, pageSize: 10 },
            scrolling: { mode: 'virtual' },
            height: '100%',
            onSelectionChanged(selectedItems) {
                //    const keys = selectedItems.selectedRowKeys;
                //    e.component.option('value', keys);
            },

            onRowUpdating: (e) => {
                //CRIA UM OBJETO COM OS DADOS ANTIGOS
                var dadosAtualizados = JSON.parse(JSON.stringify(e.oldData));
                //ATUALIZA O OBJETO COM OS DADOS ATUAIS
                Object.keys(e.newData).forEach(key => {
                    dadosAtualizados[key] = e.newData[key];
                });

                e.cancel = saveFamiliaPercentualDiferenciado(e.key, dadosAtualizados.PC_PROGRAMA_FIDELIDADE, dadosAtualizados.PC_PROGRAMA_FIDELIDADE_INDICADOR)
            },

            onRowUpdated(e) {
                e.component.saveEditData();
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
        }).dxTreeList('instance'),

        gridProdutosDiferenciados = $("#gridProdutosDiferenciados").dxDataGrid({
            dataSource: [],
            repaintChangesOnly: true,
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            columnHidingEnabled: true,
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            editing: {
                mode: 'cell',
                allowUpdating: true,
                startEditAction: 'click',
                allowAdding: false,
                allowDeleting: false,
                useIcons: false,
            },
            keyboardNavigation: {
                enterKeyAction: 'moveFocus',
                enterKeyDirection: 'column',
                editOnKeyPress: true,
            },
            sorting: { mode: "multiple" },
            selection: {
                mode: 'multiple',
                allowSelectAll: true,
                showCheckBoxesMode: 'always',
                deferred: false,
            },
            focusedRowEnabled: false,
            allowColumnResizing: true,
            allowColumnReordering: true,
            groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
            loadPanel: { enabled: false },
            paging: { pageSize: 10 },
            pager: {
                visible: true,
                allowedPageSizes: [10, 15, 20, 50, 100],
                showPageSizeSelector: true,
                showNavigationButtons: true
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('Percentuais');

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadePercentuaisDiferenciadosProdutos.xlsx');
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
            columnChooser: {
                enabled: true,
                allowSearch: true,
                height: 500,
                position: {
                    my: 'right top',
                    at: 'right bottom',
                    of: '.dx-datagrid-column-chooser-button',
                },

            },
            columnsAutoWidth: true,
            stateStoring: AutoLoad("gridProdutosDiferenciados", false),
            keyExpr: 'CD_PRODUTO',
            columns: [
                {
                    type: "selection",
                    dataField: "CD_SELECAO",
                    width: 30,
                    value: false,
                    allowHiding: false,
                },
                { dataField: "CD_PRODUTO", caption: "Código Interno", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                { dataField: "DS_PRODUTO", caption: "Produto", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                { dataField: "CD_EAN_PRODUTO", caption: "Código Barras", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false },
                { dataField: "CD_FABRICANTE", caption: "Código Fabricante", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                { dataField: "CD_CURVA_ABC", caption: "ABC", width: 50, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                { dataField: "PC_PROGRAMA_FIDELIDADE", caption: "% CashBack Cliente", width: 80, dataType: 'number', format: "###,###,###,###,##0.##'%'", allowEditing: true, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", allowHiding: false, },
                { dataField: "PC_PROGRAMA_FIDELIDADE_INDICADOR", caption: "% CashBack Indicador", width: 80, dataType: 'number', format: "###,###,###,###,##0.##'%'", allowEditing: true, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", allowHiding: false, },

                { dataField: "CD_ORIGINAL", caption: "Código Original", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_OPCIONAL", caption: "Código Opcional", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_PRODUTO_ECOMMERCE", caption: "Código e-Commerce", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_NCM", caption: "NCM", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_CST", caption: "CEST", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_FCI", caption: "Nro. FCI", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_MARCA", caption: "Marca", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_TEXTO_EXPLICATIVO", caption: "Aplicação", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: true, visible: false },
                { dataField: "DT_INCLUSAO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_FORA_LINHA", caption: "Fora Linha", width: 70, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "LG_KIT", caption: "Kit", width: 70, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "LG_ENCOMENDA", caption: "Encomenda", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
            ],

            showBorders: true,

            onCellPrepared: function (e) {

                if (e.rowType === "data") {
                    if (e.column.dataField === "DS_STATUS") {
                        if (e.value === "Inativo") {
                            e.cellElement.css("color", "#d00000");
                            e.cellElement.css("font-weight", "bold");
                        };
                    }

                    if (e.column.dataField === "DS_FORA_LINHA") {
                        if (e.value === "Sim") {
                            e.cellElement.css("background-color", "#33658a");
                            e.cellElement.css("color", "white");
                        };
                    }

                    if (e.column.dataField === "PC_PROGRAMA_FIDELIDADE" || e.column.dataField === "PC_PROGRAMA_FIDELIDADE_INDICADOR") {
                        e.cellElement.css("background-color", "#EDF3F8");
                        e.cellElement.css("color", "darkred");
                    }
                }
            },

            onRowUpdating: (e) => {
                //CRIA UM OBJETO COM OS DADOS ANTIGOS
                var dadosAtualizados = JSON.parse(JSON.stringify(e.oldData));
                //ATUALIZA O OBJETO COM OS DADOS ATUAIS
                Object.keys(e.newData).forEach(key => {
                    dadosAtualizados[key] = e.newData[key];
                });

                e.cancel = saveProdutoPercentualDiferenciado(e.key, dadosAtualizados.PC_PROGRAMA_FIDELIDADE, dadosAtualizados.PC_PROGRAMA_FIDELIDADE_INDICADOR)
            },

            onRowUpdated(e) {
                e.component.saveEditData();
            },

            toolbar: {
                items: [
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-street-view',
                            text: ' Definir % Clientes',
                            hint: 'Define um percentual de Cashback de Clientes para todos os produtos selecionados',
                            onClick() {
                                definePercentualDiferenciado(gridProdutosDiferenciados, 'PRODUTO', 'CLIENTE', 'VALORIZAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-handshake',
                            text: ' Definir % Indicadores',
                            hint: 'Define um percentual de Cashback de Indicadores para todos os produtos selecionados',
                            onClick() {
                                definePercentualDiferenciado(gridProdutosDiferenciados, 'PRODUTO', 'INDICADOR', 'VALORIZAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-trash',
                            text: ' Limpar % Clientes',
                            hint: 'Limpa percentual de Cashback de Clientes de todos os produtos selecionados',
                            onClick() {
                                definePercentualDiferenciado(gridProdutosDiferenciados, 'PRODUTO', 'CLIENTE', 'LIMPAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-trash',
                            text: ' Limpar % Indicadores',
                            hint: 'Limpa percentual de Cashback de Indicadores de todos os produtos selecionados',
                            onClick() {
                                definePercentualDiferenciado(gridProdutosDiferenciados, 'PRODUTO', 'INDICADOR', 'LIMPAR');
                            },
                        },
                    },
                    {
                        name: "groupPanel",
                        locateInMenu: "auto",
                    },
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
                                        gridProdutosDiferenciados.state({});
                                        gridProdutosDiferenciados.refresh();

                                        gridProdutosDiferenciados.updateDimensions();
                                    }
                                });
                            }
                        }
                    },
                    'exportButton',
                    'columnChooserButton',
                    'searchPanel',
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

        }).dxDataGrid('instance'),

        gridProdutosDiferenciadosParam = $("#gridProdutosDiferenciadosParam").dxDataGrid({
            dataSource: [],
            repaintChangesOnly: true,
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            columnHidingEnabled: true,
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            editing: {
                mode: 'cell',
                allowUpdating: true,
                startEditAction: 'click',
                allowAdding: false,
                allowDeleting: false,
                useIcons: false,
            },
            keyboardNavigation: {
                enterKeyAction: 'moveFocus',
                enterKeyDirection: 'column',
                editOnKeyPress: true,
            },
            sorting: { mode: "multiple" },
            selection: {
                mode: 'multiple',
                allowSelectAll: true,
                showCheckBoxesMode: 'always',
                deferred: false,
            },
            focusedRowEnabled: false,
            allowColumnResizing: true,
            allowColumnReordering: true,
            groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
            loadPanel: { enabled: false },
            paging: { pageSize: 10 },
            pager: {
                visible: true,
                allowedPageSizes: [10, 15, 20, 50, 100],
                showPageSizeSelector: true,
                showNavigationButtons: true
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('Percentuais');

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadePercentuaisDiferenciadosProdutos.xlsx');
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
            columnChooser: {
                enabled: true,
                allowSearch: true,
                height: 500,
                position: {
                    my: 'right top',
                    at: 'right bottom',
                    of: '.dx-datagrid-column-chooser-button',
                },

            },
            columnsAutoWidth: true,
            stateStoring: AutoLoad("gridProdutosDiferenciadosParam", false),
            keyExpr: 'CD_PRODUTO',
            columns: [
                {
                    type: "selection",
                    dataField: "CD_SELECAO",
                    width: 30,
                    value: false,
                    allowHiding: false,
                },
                { dataField: "CD_PRODUTO", caption: "Código Interno", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                { dataField: "DS_PRODUTO", caption: "Produto", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                { dataField: "CD_EAN_PRODUTO", caption: "Código Barras", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false },
                { dataField: "CD_FABRICANTE", caption: "Código Fabricante", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                { dataField: "CD_CURVA_ABC", caption: "ABC", width: 50, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "PC_PROGRAMA_FIDELIDADE", caption: "% CashBack Cliente", width: 80, dataType: 'number', format: "###,###,###,###,##0.##'%'", allowEditing: true, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", allowHiding: false, },
                { dataField: "PC_PROGRAMA_FIDELIDADE_INDICADOR", caption: "% CashBack Indicador", width: 80, dataType: 'number', format: "###,###,###,###,##0.##'%'", allowEditing: true, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", allowHiding: false, },

                { dataField: "CD_ORIGINAL", caption: "Código Original", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_OPCIONAL", caption: "Código Opcional", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_PRODUTO_ECOMMERCE", caption: "Código e-Commerce", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_NCM", caption: "NCM", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "CD_CST", caption: "CEST", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "NR_FCI", caption: "Nro. FCI", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_MARCA", caption: "Marca", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_TEXTO_EXPLICATIVO", caption: "Aplicação", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: true, visible: false },
                { dataField: "DT_INCLUSAO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "DS_FORA_LINHA", caption: "Fora Linha", width: 70, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "LG_KIT", caption: "Kit", width: 70, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                { dataField: "LG_ENCOMENDA", caption: "Encomenda", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
            ],

            showBorders: true,

            onCellPrepared: function (e) {

                if (e.rowType === "data") {
                    if (e.column.dataField === "DS_STATUS") {
                        if (e.value === "Inativo") {
                            e.cellElement.css("color", "#d00000");
                            e.cellElement.css("font-weight", "bold");
                        };
                    }

                    if (e.column.dataField === "DS_FORA_LINHA") {
                        if (e.value === "Sim") {
                            e.cellElement.css("background-color", "#33658a");
                            e.cellElement.css("color", "white");
                        };
                    }

                    if (e.column.dataField === "PC_PROGRAMA_FIDELIDADE" || e.column.dataField === "PC_PROGRAMA_FIDELIDADE_INDICADOR") {
                        e.cellElement.css("background-color", "#EDF3F8");
                        e.cellElement.css("color", "darkred");
                    }
                }
            },

            onRowUpdating: (e) => {
                var dadosAntigos = { ...e.oldData };
                var dadosAtualizados = { ...dadosAntigos };
                //ATUALIZA O OBJETO COM OS DADOS ATUAIS
                Object.keys(e.newData).forEach(key => {
                    dadosAtualizados[key] = e.newData[key];
                });

                e.cancel = false;

                saveProdutoPercentualDiferenciado(e.key, dadosAtualizados.PC_PROGRAMA_FIDELIDADE, dadosAtualizados.PC_PROGRAMA_FIDELIDADE_INDICADOR).then(function resolve(response) {
                    if (response == false) {
                        var data;
                        e.component.getDataSource().store().load().done((allData) => {
                            data = allData;
                        });

                        const index = data.findIndex(x => x.CD_PRODUTO === e.key);
                        data[index] = dadosAntigos;
                        e.component.option("dataSource", data)
                    }
                })
            },

            toolbar: {
                items: [
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-street-view',
                            text: ' Definir % Clientes',
                            hint: 'Define um percentual de Cashback de Clientes para todos os produtos selecionados',
                            onClick() {
                                definePercentualDiferenciado(gridProdutosDiferenciadosParam, 'PRODUTO', 'CLIENTE', 'VALORIZAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-handshake',
                            text: ' Definir % Indicadores',
                            hint: 'Define um percentual de Cashback de Indicadores para todos os produtos selecionados',
                            onClick() {
                                definePercentualDiferenciado(gridProdutosDiferenciadosParam, 'PRODUTO', 'INDICADOR', 'VALORIZAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-trash',
                            text: ' Limpar % Clientes',
                            hint: 'Limpa percentual de Cashback de Clientes de todos os produtos selecionados',
                            onClick() {
                                definePercentualDiferenciado(gridProdutosDiferenciadosParam, 'PRODUTO', 'CLIENTE', 'LIMPAR');
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'always',
                        options: {
                            icon: 'fa fa-trash',
                            text: ' Limpar % Indicadores',
                            hint: 'Limpa percentual de Cashback de Indicadores de todos os produtos selecionados',
                            onClick() {
                                definePercentualDiferenciado(gridProdutosDiferenciadosParam, 'PRODUTO', 'INDICADOR', 'LIMPAR');
                            },
                        },
                    },
                    {
                        name: "groupPanel",
                        locateInMenu: "auto",
                    },
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
                                        gridProdutosDiferenciadosParam.state({});
                                        gridProdutosDiferenciadosParam.refresh();

                                        gridProdutosDiferenciadosParam.updateDimensions();
                                    }
                                });
                            }
                        }
                    },
                    'exportButton',
                    'columnChooserButton',
                    'searchPanel',
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

        }).dxDataGrid('instance'),

        //PERCENTUAL GERAL MODAL "DEFINIÇÃO DE PERCENTUAL PARA TODOS REGISTROS DO GRID"
        nbxPercentualGeral = $('#nbxPercentualGeral').dxNumberBox({
            value: 0,
            format: "###,###0.##'%'",
            min: 0,
            max: 100,
            showClearButton: false,
            showSpinButtons: false,
            step: 0.01,
            placeholder: '% CashBack',
            elementAttr: {
                class: 'numberBox-format',
            },
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "darkred",
                });

                var placeholderElement = e.component._$element.find('.dx-placeholder');
                placeholderElement.addClass('numberBox-format');
            },
        }).dxNumberBox('instance'),

    ]);

    await Promise.all([
        getParametros(),

        carregaGridFiliais(),
        carregaGridBoxClientesNaoHabilitados(),
        carregaGridClientesHabilitados(),
        carregaGridBoxClientesNaoBloqueados(),
        carregaGridClientesBloqueados(),

        carregaGridBoxIndicadoresNaoHabilitados(),
        carregaGridIndicadoresHabilitados(),
        carregaGridBoxIndicadoresNaoBloqueados(),
        carregaGridIndicadoresBloqueados(),

        carregaGridFiliaisPercentuaisDiferenciados(),
        carregaGridClientesIndicadoresPercentuaisDiferenciados(),
        carregaFamiliasPercentuaisDiferenciados(),
        carregaGridProdutosPercentuaisDiferenciados(),
    ]);

    configuraTela();

    vLoading = false;

    hideProcessPanel(arguments.callee.name);
});

//#region [ FUNÇÕES ]

function getParametros() {
    var deferred = new $.Deferred;

    //BUSCA OS PARAMETROS
    $.ajax({
        type: "POST",
        url: "/ProgramaFidelidade/getParametros",
    }).done(function (response) {
        objParametroProgramaFidelidade.CD_EMPRESA = response[0].CD_EMPRESA;
        objParametroProgramaFidelidade.DS_NOME_EMPRESA = response[0].DS_NOME_EMPRESA;
        objParametroProgramaFidelidade.CD_SEGMENTO = response[0].CD_SEGMENTO;
        objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_CONFIGURACAO_INICIADA = isNull(response[0].LG_PROGRAMA_FIDELIDADE_CONFIGURACAO_INICIADA, false);
        objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_ATIVO = isNull(response[0].LG_PROGRAMA_FIDELIDADE_ATIVO, false);
        objParametroProgramaFidelidade.DT_PROGRAMA_FIDELIDADE_LANCAMENTO = response[0].DT_PROGRAMA_FIDELIDADE_LANCAMENTO;
        objParametroProgramaFidelidade.DT_PROGRAMA_FIDELIDADE_TERMINO = response[0].DT_PROGRAMA_FIDELIDADE_TERMINO;
        objParametroProgramaFidelidade.PC_PROGRAMA_FIDELIDADE = response[0].PC_PROGRAMA_FIDELIDADE;
        objParametroProgramaFidelidade.PC_PROGRAMA_FIDELIDADE_INDICADOR = response[0].PC_PROGRAMA_FIDELIDADE_INDICADOR;
        objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_CLIENTES = response[0].CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_CLIENTES;
        objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_INDICADORES = response[0].CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_INDICADORES;
        objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_CLIENTE = isNull(response[0].LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_CLIENTE, false);
        objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_INDICADOR = isNull(response[0].LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_INDICADOR, false);
        objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_CLIENTE = isNull(response[0].LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_CLIENTE, false);
        objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_INDICADOR = isNull(response[0].LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_INDICADOR, false);

        deferred.resolve();
    }).fail(function (response) {
        trataErroHTTP("Ocorreu um erro ao buscar os parâmetros iniciais", response);
    });

    return deferred.promise();
}

function configuraTela() {
    vSuprimeEventoOnChange = true;

    chkParticipantesClientesTodos.option("value", false);
    chkParticipantesClientesPF.option("value", false);
    chkParticipantesClientesPJ.option("value", false);
    chkParticipantesClientesNenhum.option("value", false);
    chkParticipantesClientesSelecionar.option("value", false);
    chkParticipantesClientesTodosParam.option("value", false);
    chkParticipantesClientesPFParam.option("value", false);
    chkParticipantesClientesPJParam.option("value", false);
    chkParticipantesClientesNenhumParam.option("value", false);
    chkParticipantesClientesSelecionarParam.option("value", false);

    switch (objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_CLIENTES) {
        case "TD":
            chkParticipantesClientesTodos.option("value", true);
            chkParticipantesClientesTodosParam.option("value", true);
            break;
        case "PF":
            chkParticipantesClientesPF.option("value", true);
            chkParticipantesClientesPFParam.option("value", true);
            break;
        case "PJ":
            chkParticipantesClientesPJ.option("value", true);
            chkParticipantesClientesPJParam.option("value", true);
            break;
        case "ES":
            chkParticipantesClientesSelecionar.option("value", true);
            chkParticipantesClientesSelecionarParam.option("value", true);
            $('#cardSelecaoHabilitarClientes').slideDown();
            $('#cardSelecaoHabilitarClientesParam').slideDown();
            break;
        case "NE":
            chkParticipantesClientesNenhum.option("value", true);
            chkParticipantesClientesNenhumParam.option("value", true);
            break;
    }

    chkParticipantesIndicadoresTodos.option("value", false);
    chkParticipantesIndicadoresPF.option("value", false);
    chkParticipantesIndicadoresPJ.option("value", false);
    chkParticipantesIndicadoresNenhum.option("value", false);
    chkParticipantesIndicadoresSelecionar.option("value", false);
    chkParticipantesIndicadoresTodosParam.option("value", false);
    chkParticipantesIndicadoresPFParam.option("value", false);
    chkParticipantesIndicadoresPJParam.option("value", false);
    chkParticipantesIndicadoresNenhumParam.option("value", false);
    chkParticipantesIndicadoresSelecionarParam.option("value", false);

    switch (objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_INDICADORES) {
        case "TD":
            chkParticipantesIndicadoresTodos.option("value", true);
            chkParticipantesIndicadoresTodosParam.option("value", true);
            break;
        case "PF":
            chkParticipantesIndicadoresPF.option("value", true);
            chkParticipantesIndicadoresPFParam.option("value", true);
            break;
        case "PJ":
            chkParticipantesIndicadoresPJ.option("value", true);
            chkParticipantesIndicadoresPJParam.option("value", true);
            break;
        case "ES":
            chkParticipantesIndicadoresSelecionar.option("value", true);
            chkParticipantesIndicadoresSelecionarParam.option("value", true);
            $('#cardSelecaoHabilitarIndicadores').slideDown();
            $('#cardSelecaoHabilitarIndicadoresParam').slideDown();
            break;
        case "NE":
            chkParticipantesIndicadoresNenhum.option("value", true);
            chkParticipantesIndicadoresNenhumParam.option("value", true);
            break;
    }

    nbx_Pc_CashBack_Clientes.option("value", objParametroProgramaFidelidade.PC_PROGRAMA_FIDELIDADE)
    nbx_Pc_CashBack_Indicadores.option("value", objParametroProgramaFidelidade.PC_PROGRAMA_FIDELIDADE_INDICADOR)

    $('#labelPcCashBackPadraoClientes').text(formataNumero(objParametroProgramaFidelidade.PC_PROGRAMA_FIDELIDADE, 0, 0) + '%');
    $('#labelPcCashBackPadraoIndicadores').text(formataNumero(objParametroProgramaFidelidade.PC_PROGRAMA_FIDELIDADE_INDICADOR, 0, 0) + '%');

    nbx_Pc_CashBack_Clientes_Param.option("value", objParametroProgramaFidelidade.PC_PROGRAMA_FIDELIDADE)
    nbx_Pc_CashBack_Indicadores_Param.option("value", objParametroProgramaFidelidade.PC_PROGRAMA_FIDELIDADE_INDICADOR)

    chkNaoPermiteRestituicaoCreditoCliente.option("value", !objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_CLIENTE);
    chkPermiteRestituicaoCreditoCliente.option("value", objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_CLIENTE);
    chkNaoPermiteRestituicaoCreditoIndicadores.option("value", !objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_INDICADOR);
    chkPermiteRestituicaoCreditoIndicadores.option("value", objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_INDICADOR);

    chkNaoPermiteRestituicaoCreditoClienteParam.option("value", !objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_CLIENTE);
    chkPermiteRestituicaoCreditoClienteParam.option("value", objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_CLIENTE);
    chkNaoPermiteRestituicaoCreditoIndicadoresParam.option("value", !objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_INDICADOR);
    chkPermiteRestituicaoCreditoIndicadoresParam.option("value", objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_INDICADOR);

    chkNaoGerarCashBackCreditosUtilizadosCliente.option("value", objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_CLIENTE);
    chkGerarCashBackCreditosUtilizadosCliente.option("value", !objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_CLIENTE);
    chkNaoGerarCashBackCreditosUtilizadosIndicadores.option("value", objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_INDICADOR);
    chkGerarCashBackCreditosUtilizadosIndicadores.option("value", !objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_INDICADOR);

    chkNaoGerarCashBackCreditosUtilizadosClienteParam.option("value", objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_CLIENTE);
    chkGerarCashBackCreditosUtilizadosClienteParam.option("value", !objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_CLIENTE);
    chkNaoGerarCashBackCreditosUtilizadosIndicadoresParam.option("value", objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_INDICADOR);
    chkGerarCashBackCreditosUtilizadosIndicadoresParam.option("value", !objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_INDICADOR);

    vChk_Ativar_Programa.option("value", objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_ATIVO);
    vChk_Ativar_Programa_Param.option("value", objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_ATIVO);
    vDt_Inicio_Programa.option("value", objParametroProgramaFidelidade.DT_PROGRAMA_FIDELIDADE_LANCAMENTO);
    vDt_Inicio_Programa_Param.option("value", objParametroProgramaFidelidade.DT_PROGRAMA_FIDELIDADE_LANCAMENTO);
    vDt_Termino_Programa.option("value", objParametroProgramaFidelidade.DT_PROGRAMA_FIDELIDADE_TERMINO);
    vDt_Termino_Programa_Param.option("value", objParametroProgramaFidelidade.DT_PROGRAMA_FIDELIDADE_TERMINO);

    if (objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_CONFIGURACAO_INICIADA == true) {
        objParametroProgramaFidelidade.LG_RESUMO = true;
        avancaProximaEtapa('#cardInicio', '#cardResumoConfiguracoes');
    }

    $('#divPrincipal').show();

    //APÓS OS TESTES REMOVER ESTE BLOCO
    //avancaProximaEtapa('#cardInicio', '#cardPercentualCashBackClientesExcecoes')

    vSuprimeEventoOnChange = false;
}

function iniciaConfiguracao() {
    if (objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_CONFIGURACAO_INICIADA == false) {
        objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_CONFIGURACAO_INICIADA = true;
        saveParametros()
    }
}

function validaFiliais() {
    const vIndexFilial = dataSourceFiliais.findIndex(a => a.LG_PROGRAMA_FIDELIDADE_ATIVO == true);

    if (vIndexFilial < 0) {
        exibeMensagem("info", "Campos obrigatórios", "Habilite ao menos uma filial para prosseguir")
        return;
    }

    avancaProximaEtapa('#cardFiliaisParticipantes', '#cardClientesParticipantes');
}

function saveParametros() {
    if (vLoading == true) { return };

    showProcessPanel("Salvando...", "saveParametros");

    var deferred = new $.Deferred;

    let parametros = {
        CD_EMPRESA: objParametroProgramaFidelidade.CD_EMPRESA,
        LG_PROGRAMA_FIDELIDADE_CONFIGURACAO_INICIADA: objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_CONFIGURACAO_INICIADA,
        LG_PROGRAMA_FIDELIDADE_ATIVO: objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_ATIVO,
        DT_PROGRAMA_FIDELIDADE_LANCAMENTO: objParametroProgramaFidelidade.DT_PROGRAMA_FIDELIDADE_LANCAMENTO ? new Date(objParametroProgramaFidelidade.DT_PROGRAMA_FIDELIDADE_LANCAMENTO).yyyyMMdd() : null,
        DT_PROGRAMA_FIDELIDADE_TERMINO: objParametroProgramaFidelidade.DT_PROGRAMA_FIDELIDADE_TERMINO ? new Date(objParametroProgramaFidelidade.DT_PROGRAMA_FIDELIDADE_TERMINO).yyyyMMdd() : null,
        PC_PROGRAMA_FIDELIDADE: objParametroProgramaFidelidade.PC_PROGRAMA_FIDELIDADE,
        PC_PROGRAMA_FIDELIDADE_INDICADOR: objParametroProgramaFidelidade.PC_PROGRAMA_FIDELIDADE_INDICADOR,
        CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_CLIENTES: objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_CLIENTES,
        CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_INDICADORES: objParametroProgramaFidelidade.CD_PROGRAMA_FIDELIDADE_PARTICIPANTES_INDICADORES,
        LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_CLIENTE: objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_CLIENTE,
        LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_INDICADOR: objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_BLOQUEIA_GERACAO_CASHBACK_CREDITO_INDICADOR,
        LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_CLIENTE: objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_CLIENTE,
        LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_INDICADOR: objParametroProgramaFidelidade.LG_PROGRAMA_FIDELIDADE_RESTITUI_CREDITO_CAIXA_INDICADOR,
    }

    $.ajax({
        type: "POST",
        url: "/ProgramaFidelidade/saveParametros",
        data: { pParametros: JSON.stringify(parametros) },
    }).done(function (response) {
        exibeMensagem("success", "Operação realizada", "Salvo com sucesso");
        deferred.resolve();
    }).fail(function (response) {
        trataErroHTTP("Ocorreu um erro ao salvar os parâmetros", response);
    }).always(function () {
        hideProcessPanel("saveParametros");
    });

    return deferred.promise();
}

function retornaCodigoParticipante(pTipoParticipante, pParam) {
    if (pTipoParticipante == "C") {
        var vTD = pParam == false ? chkParticipantesClientesTodos.option("value") : chkParticipantesClientesTodosParam.option("value");
        var vPF = pParam == false ? chkParticipantesClientesPF.option("value") : chkParticipantesClientesPFParam.option("value");
        var vPJ = pParam == false ? chkParticipantesClientesPJ.option("value") : chkParticipantesClientesPJParam.option("value");
        var vES = pParam == false ? chkParticipantesClientesSelecionar.option("value") : chkParticipantesClientesSelecionarParam.option("value");
        var vNE = pParam == false ? chkParticipantesClientesNenhum.option("value") : chkParticipantesClientesNenhumParam.option("value");
    } else if (pTipoParticipante == "I") {
        var vTD = pParam == false ? chkParticipantesIndicadoresTodos.option("value") : chkParticipantesIndicadoresTodosParam.option("value");
        var vPF = pParam == false ? chkParticipantesIndicadoresPF.option("value") : chkParticipantesIndicadoresPFParam.option("value");
        var vPJ = pParam == false ? chkParticipantesIndicadoresPJ.option("value") : chkParticipantesIndicadoresPJParam.option("value");
        var vES = pParam == false ? chkParticipantesIndicadoresSelecionar.option("value") : chkParticipantesIndicadoresSelecionarParam.option("value");
        var vNE = pParam == false ? chkParticipantesIndicadoresNenhum.option("value") : chkParticipantesIndicadoresNenhumParam.option("value");
    }

    if (vTD) {
        return "TD";
    } else if (vPF) {
        return "PF";
    } else if (vPJ) {
        return "PJ";
    } else if (vES) {
        return "ES";
    } else if (vNE) {
        return "NE";
    } else {
        return null;
    }
}

function carregaGridFiliais() {
    var deferred = new $.Deferred;

    //Filiais participantes do programa que o usuário possui acesso
    GetAzureDataSource(66, '{CD_STATUS: "A"}', 30 * 6).then((result) => {
        if (result.success) {
            dataSourceFiliais = result.data;

            gridFiliais.option("dataSource", result.data);

            gridFiliaisParam.option("dataSource", result.data);

            deferred.resolve();
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao carregar as filiais", `${result.name}: ${result.error}`);
            deferred.reject()
        }
    });

    return deferred.promise();
}

function carregaGridBoxClientesNaoHabilitados() {
    var deferred = new $.Deferred;

    GetAzureDataSource(67, '{CD_STATUS: "A", LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE: false, LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE: false }', 30 * 6).then((result) => {
        if (result.success) {
            gridBoxClientesNaoHabilitados.option("dataSource", result.data);
            gridClientesNaoHabilitados.option("dataSource", result.data);

            gridBoxClientesNaoHabilitadosParam.option("dataSource", result.data);
            gridClientesNaoHabilitadosParam.option("dataSource", result.data);

            deferred.resolve();
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao carregar os clientes não participantes", `${result.name}: ${result.error}`);
            deferred.reject();
        }
    });

    return deferred.promise();
}

function carregaGridClientesHabilitados() {
    var deferred = new $.Deferred;

    if (objParametroProgramaFidelidade.LG_RESUMO == false) {
        var statusFiltro = $('#lkpStatusClientesHabilitados').dxLookup('instance').option('value');
    } else {
        var statusFiltro = $('#lkpStatusClientesHabilitadosParam').dxLookup('instance').option('value');
    }

    GetAzureDataSource(67, `{CD_STATUS: ${JSON.stringify(statusFiltro)}, LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE: true, LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE: null }`, 30 * 6).then((result) => {
        if (result.success) {
            gridClientesHabilitados.option("dataSource", result.data);

            gridClientesHabilitadosParam.option("dataSource", result.data);

            if (result.data.length > 0 || vLoading == false) {
                $('#cardGridClientesHabilitados').show();
                $('#cardGridClientesHabilitadosParam').show();
            } else {
                $('#cardGridClientesHabilitados').hide();
                $('#cardGridClientesHabilitadosParam').hide();
            }

            deferred.resolve();
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao carregar os clientes participantes", `${result.name}: ${result.error}`);
            deferred.reject()
        }
    });

    return deferred.promise();
}

function carregaGridBoxClientesNaoBloqueados() {
    var deferred = new $.Deferred;

    GetAzureDataSource(67, '{CD_STATUS: "A", LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE: null, LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE: false }', 30 * 6).then((result) => {
        if (result.success) {
            gridBoxClientesNaoBloqueados.option("dataSource", result.data);
            gridClientesNaoBloqueados.option("dataSource", result.data);

            gridBoxClientesNaoBloqueadosParam.option("dataSource", result.data);
            gridClientesNaoBloqueadosParam.option("dataSource", result.data);

            deferred.resolve();
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao carregar os clientes não bloqueados", `${result.name}: ${result.error}`);
            deferred.reject()
        }
    });

    return deferred.promise();
}

function carregaGridClientesBloqueados() {
    var deferred = new $.Deferred;

    if (objParametroProgramaFidelidade.LG_RESUMO == false) {
        var statusFiltro = $('#lkpStatusClientesBloqueados').dxLookup('instance').option('value');
    } else {
        var statusFiltro = $('#lkpStatusClientesBloqueadosParam').dxLookup('instance').option('value');
    }

    GetAzureDataSource(67, `{CD_STATUS: ${JSON.stringify(statusFiltro)}, LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE: null, LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE: true }`, 30 * 6).then((result) => {
        if (result.success) {
            gridClientesBloqueados.option("dataSource", result.data);

            gridClientesBloqueadosParam.option("dataSource", result.data);

            if (result.data.length > 0 || vLoading == false) {
                $('#cardGridClientesBloqueados').show();
                $('#cardGridClientesBloqueadosParam').show();
            } else {
                $('#cardGridClientesBloqueados').hide();
                $('#cardGridClientesBloqueadosParam').hide();
            }

            deferred.resolve();
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao carregar os clientes bloqueados", `${result.name}: ${result.error}`);
            deferred.reject()
        }
    });

    return deferred.promise();
}

function carregaGridBoxIndicadoresNaoHabilitados() {
    var deferred = new $.Deferred;

    GetAzureDataSource(67, '{CD_STATUS: "A", LG_APENAS_INDICADORES: true, LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR: false, LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR: false }', 30 * 6).then((result) => {
        if (result.success) {
            gridBoxIndicadoresNaoHabilitados.option("dataSource", result.data);
            gridIndicadoresNaoHabilitados.option("dataSource", result.data);

            gridBoxIndicadoresNaoHabilitadosParam.option("dataSource", result.data);
            gridIndicadoresNaoHabilitadosParam.option("dataSource", result.data);

            deferred.resolve();
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao carregar os indicadores não participantes", `${result.name}: ${result.error}`);
            deferred.reject()
        }
    });

    return deferred.promise();
}

function carregaGridIndicadoresHabilitados() {
    var deferred = new $.Deferred;

    if (objParametroProgramaFidelidade.LG_RESUMO == false) {
        var statusFiltro = $('#lkpStatusIndicadoresHabilitados').dxLookup('instance').option('value');
    } else {
        var statusFiltro = $('#lkpStatusIndicadoresHabilitadosParam').dxLookup('instance').option('value');
    }

    GetAzureDataSource(67, `{CD_STATUS: ${JSON.stringify(statusFiltro)}, LG_APENAS_INDICADORES: true, LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR: true, LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR: null }`, 30 * 6).then((result) => {
        if (result.success) {
            gridIndicadoresHabilitados.option("dataSource", result.data);

            gridIndicadoresHabilitadosParam.option("dataSource", result.data);

            deferred.resolve();

            if (result.data.length > 0 || vLoading == false) {
                $('#cardGridIndicadoresHabilitados').show();
                $('#cardGridIndicadoresHabilitadosParam').show();
            } else {
                $('#cardGridIndicadoresHabilitados').hide();
                $('#cardGridIndicadoresHabilitadosParam').hide();
            }
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao carregar os indicadores participantes", `${result.name}: ${result.error}`);
            deferred.reject()
        }
    });

    return deferred.promise();
}

function carregaGridBoxIndicadoresNaoBloqueados() {
    var deferred = new $.Deferred;

    GetAzureDataSource(67, '{CD_STATUS: "A", LG_APENAS_INDICADORES: true, LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR: null, LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR: false }', 30 * 6).then((result) => {
        if (result.success) {
            gridBoxIndicadoresNaoBloqueados.option("dataSource", result.data);
            gridIndicadoresNaoBloqueados.option("dataSource", result.data);

            gridBoxIndicadoresNaoBloqueadosParam.option("dataSource", result.data);
            gridIndicadoresNaoBloqueadosParam.option("dataSource", result.data);

            deferred.resolve();
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao carregar os indicadores não bloqueados", `${result.name}: ${result.error}`);
            deferred.reject()
        }
    });

    return deferred.promise();
}

function carregaGridIndicadoresBloqueados() {
    var deferred = new $.Deferred;

    if (objParametroProgramaFidelidade.LG_RESUMO == false) {
        var statusFiltro = $('#lkpStatusIndicadoresBloqueados').dxLookup('instance').option('value');
    } else {
        var statusFiltro = $('#lkpStatusIndicadoresBloqueadosParam').dxLookup('instance').option('value');
    }

    GetAzureDataSource(67, `{CD_STATUS: ${JSON.stringify(statusFiltro)}, LG_APENAS_INDICADORES: true, LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR: null, LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR: true }`, 30 * 6).then((result) => {
        if (result.success) {
            gridIndicadoresBloqueados.option("dataSource", result.data);

            gridIndicadoresBloqueadosParam.option("dataSource", result.data);

            if (result.data.length > 0 || vLoading == false) {
                $('#cardGridIndicadoresBloqueados').show();
                $('#cardGridIndicadoresBloqueadosParam').show();
            } else {
                $('#cardGridIndicadoresBloqueados').hide();
                $('#cardGridIndicadoresBloqueadosParam').hide();
            }

            deferred.resolve();
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao carregar os indicadores bloqueados", `${result.name}: ${result.error}`);
            deferred.reject()
        }
    });

    return deferred.promise();
}

function carregaGridFiliaisPercentuaisDiferenciados() {
    var deferred = new $.Deferred;

    GetAzureDataSource(66, '{CD_STATUS: "A", LG_PROGRAMA_FIDELIDADE_ATIVO: true }', 30 * 6).then((result) => {
        if (result.success) {
            gridFiliaisPercentuaisDiferenciados.option("dataSource", result.data);

            gridFiliaisPercentuaisDiferenciadosParam.option("dataSource", result.data);

            deferred.resolve();
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao carregar as filiais percentuais diferenciados", `${result.name}: ${result.error}`);
            deferred.reject()
        }
    });

    return deferred.promise();
}

function carregaGridClientesIndicadoresPercentuaisDiferenciados() {
    var deferred = new $.Deferred;

    GetAzureDataSource(67, '{CD_STATUS: null, LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE: true, LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE: null, LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR: true, LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR: null  }', 30 * 6).then((result) => {
        if (result.success) {
            gridClientesIndicadoresPercentuaisDiferenciados.option("dataSource", result.data);

            gridClientesIndicadoresPercentuaisDiferenciadosParam.option("dataSource", result.data);

            deferred.resolve();
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao carregar os clientes/indicadores percentuais diferenciados", `${result.name}: ${result.error}`);
            deferred.reject()
        }
    });

    return deferred.promise();
}

function carregaFamiliasPercentuaisDiferenciados() {
    var deferred = new $.Deferred;

    //Famílias para Edição de Percentuais de CashBack Diferenciados
    GetAzureDataSource(68, '{ }', 30 * 6).then((result) => {
        if (result.success) {
            treeFamiliasPercentuaisDiferenciados.option("dataSource", result.data);

            treeFamiliasPercentuaisDiferenciadosParam.option("dataSource", result.data);

            deferred.resolve();
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao carregar as filiais", `${result.name}: ${result.error}`);
            deferred.reject()
        }
    });

    return deferred.promise();
}

function carregaGridProdutosPercentuaisDiferenciados() {
    var deferred = new $.Deferred;

    //Produtos para Edição de Percentuais de CashBack Diferenciados
    GetAzureDataSource(69, '{ CD_STATUS: "A" }', 30 * 6).then((result) => {
        if (result.success) {
            gridProdutosDiferenciados.option("dataSource", result.data);

            gridProdutosDiferenciadosParam.option("dataSource", result.data);

            deferred.resolve();
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao carregar os produtos percentuais diferenciados", `${result.name}: ${result.error}`);
            deferred.reject()
        }
    });

    return deferred.promise();
}

function expandAllNodes(treeList) {
    //Expandir todas as linhas do TreeList
    treeList.beginUpdate();
    try {
        result.data.forEach((object) => {
            if (object.CD_FAMILIA.toString().length > 0) {
                treeList.expandRow(object.CD_FAMILIA);
            }
        });
    } finally {
        treeList.endUpdate();
    }
}

function collapseAllNodes(treeList) {
    //Retrair todas as linhas do TreeList
    treeList.beginUpdate();
    try {
        result.data.forEach((object) => {
            if (object.CD_FAMILIA.toString().length > 0) {
                treeList.collapseRow(object.CD_FAMILIA);
            }
        });
    } finally {
        treeList.endUpdate();
    }
}

async function configuraFilial(pCDFilial, pHabilitar, pParam) {
    const vIndexFilial = dataSourceFiliais.findIndex(a => a.CD_FILIAL == pCDFilial);

    var img = (pParam == false ? "imgFilial" : "imgFilialParam") + pCDFilial;
    var btn = (pParam == false ? "btnFilial" : "btnFilialParam") + pCDFilial;
    var acao = '';

    if (pHabilitar) {
        if (isNull(dataSourceFiliais[vIndexFilial].LG_OBRIGA_NR_PEDIDO_DEVOLUCAO, false) == false) {
            abrirModal("ModalAtivarParametroDevolucao");

            await new Promise(function (resolve, reject) {
                $("#btnOKConfiguraDadosDevolucao").prop("onclick", null).off("click");
                $('#btnOKConfiguraDadosDevolucao').click(function () {
                    resolve("PROSSEGUIR");
                });
                $("#btnAbortarConfiguraDadosDevolucao").prop("onclick", null).off("click");
                $('#btnAbortarConfiguraDadosDevolucao').click(function () {
                    resolve("ABORTAR");
                });
            }).then(function (response) {
                acao = response;
            });

            if (acao == "ABORTAR") return;
        }

        if (saveParametrosFilial(pCDFilial, pHabilitar) == false) return;

        dataSourceFiliais[vIndexFilial].LG_PROGRAMA_FIDELIDADE_ATIVO = true;
        dataSourceFiliais[vIndexFilial].LG_OBRIGA_NR_PEDIDO_DEVOLUCAO = true;

        $("#" + img).css("display", "block");
        $("#" + btn).css("display", "none");
    } else {
        if (saveParametrosFilial(pCDFilial, pHabilitar) == false) return;

        dataSourceFiliais[vIndexFilial].LG_PROGRAMA_FIDELIDADE_ATIVO = false;

        $("#" + img).css("display", "none");
        $("#" + btn).css("display", "block");
    }
}

async function saveParametrosFilial(pCDFilial, pHabilitar) {
    var error = false;
    showProcessPanel("Salvando...", "saveParametrosFilial");

    let dataUpdate = [
        { id: "CD_EMPRESA", value: objParametroProgramaFidelidade.CD_EMPRESA, isKey: true },
        { id: "CD_FILIAL", value: pCDFilial, isKey: true },
        { id: "LG_PROGRAMA_FIDELIDADE_ATIVO", value: pHabilitar, isKey: false },
    ];

    if (pHabilitar) {
        dataUpdate.push({ id: "LG_OBRIGA_NR_PEDIDO_DEVOLUCAO", value: true, isKey: false })
    }

    await $.ajax({
        type: "POST",
        url: "/ProgramaFidelidade/saveParametrosFilial",
        data: { dataUpdate: JSON.stringify(dataUpdate) },
    }).done(function (response) {
        exibeMensagem("success", "Operação realizada", "Parâmetro salvo com sucesso");
        error = false;
    }).fail(function (response) {
        trataErroHTTP("Ocorreu um erro ao salvar os parâmetros da filial", response);
        error = true;
    }).always(function (response) {
        hideProcessPanel("saveParametrosFilial");
    })

    return !error
}

async function saveClientesIndicadores(pTipoParticipante, pTipoOperacao, pParam) {
    var error = false;
    var grid;

    if (pTipoParticipante == "CLIENTE") {
        if (pTipoOperacao == "HABILITAR") {
            grid = (pParam ? gridClientesNaoHabilitadosParam : gridClientesNaoHabilitados);
        } else if (pTipoOperacao == "DESABILITAR") {
            grid = (pParam ? gridClientesHabilitadosParam : gridClientesHabilitados);
        } else if (pTipoOperacao == "BLOQUEAR") {
            grid = (pParam ? gridClientesNaoBloqueadosParam : gridClientesNaoBloqueados);
        } else if (pTipoOperacao == "DESBLOQUEAR") {
            grid = (pParam ? gridClientesBloqueadosParam : gridClientesBloqueados);
        }
    } else { //INDICADOR
        if (pTipoOperacao == "HABILITAR") {
            grid = (pParam ? gridIndicadoresNaoHabilitadosParam : gridIndicadoresNaoHabilitados);
        } else if (pTipoOperacao == "DESABILITAR") {
            grid = (pParam ? gridIndicadoresHabilitadosParam : gridIndicadoresHabilitados);
        } else if (pTipoOperacao == "BLOQUEAR") {
            grid = (pParam ? gridIndicadoresNaoBloqueadosParam : gridIndicadoresNaoBloqueados);
        } else if (pTipoOperacao == "DESBLOQUEAR") {
            grid = (pParam ? gridIndicadoresBloqueadosParam : gridIndicadoresBloqueados);
        }
    }

    let dataUpdate = [];
    grid.getSelectedRowsData().forEach((row) => {
        var participante = [
            { id: "CD_EMPRESA", value: objParametroProgramaFidelidade.CD_EMPRESA, isKey: true },
            { id: "CD_CPF_CNPJ", value: row["CD_CPF_CNPJ"], isKey: true },
        ]
        if (pTipoParticipante == "CLIENTE") {
            if (pTipoOperacao == "HABILITAR") {
                participante.push({ id: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE", value: true, isKey: false });
            } else if (pTipoOperacao == "DESABILITAR") {
                participante.push({ id: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE", value: false, isKey: false });
            } else if (pTipoOperacao == "BLOQUEAR") {
                participante.push({ id: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE", value: true, isKey: false });
            } else if (pTipoOperacao == "DESBLOQUEAR") {
                participante.push({ id: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE", value: false, isKey: false });
            }
        } else {
            if (pTipoOperacao == "HABILITAR") {
                participante.push({ id: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR", value: true, isKey: false });
            } else if (pTipoOperacao == "DESABILITAR") {
                participante.push({ id: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR", value: false, isKey: false });
            } else if (pTipoOperacao == "BLOQUEAR") {
                participante.push({ id: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR", value: true, isKey: false });
            } else if (pTipoOperacao == "DESBLOQUEAR") {
                participante.push({ id: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR", value: false, isKey: false });
            }
        }

        dataUpdate.push(participante);
    });

    if (dataUpdate.length == 0) {
        exibeMensagem("info", `Nenhum registro foi selecionado!`, `É necessário selecionar os ${pTipoParticipante == "CLIENTE" ? "clientes" : "indicadores"}`);
    }
    else {
        await $.ajax({
            type: "POST",
            url: "/ProgramaFidelidade/saveClientesIndicadores",
            data: { dataUpdate: JSON.stringify(dataUpdate) },
        }).done(function (response) {
            exibeMensagem("success", "Operação realizada", "Salvo com sucesso");
        }).fail(function (response) {
            if (pTipoOperacao == "HABILITAR") {
                trataErroHTTP("Ocorreu um erro ao habilitar os participantes", response);
            } else if (pTipoOperacao == "DESABILITAR") {
                trataErroHTTP("Ocorreu um erro ao desabilitar os participantes", response);
            } else if (pTipoOperacao == "BLOQUEAR") {
                trataErroHTTP("Ocorreu um erro ao bloquear os participantes", response);
            } else if (pTipoOperacao == "DESBLOQUEAR") {
                trataErroHTTP("Ocorreu um erro ao desbloquear os participantes", response);
            }
            error = true;
        })
    }

    return !error;
}

function saveFilialPercentualDiferenciado(pFilial, pPcCliente, pPcIndicador) {
    var deferred = new $.Deferred;

    console.log("inicio saveFiliais", new Date().toJSON())

    let dataUpdate = [
        { id: "CD_EMPRESA", value: objParametroProgramaFidelidade.CD_EMPRESA, isKey: true },
        { id: "CD_FILIAL", value: pFilial, isKey: true },
        { id: "PC_PROGRAMA_FIDELIDADE", value: pPcCliente, isKey: false },
        { id: "PC_PROGRAMA_FIDELIDADE_INDICADOR", value: pPcIndicador, isKey: false },
    ]

    $.ajax({
        type: "POST",
        url: "/ProgramaFidelidade/saveParametrosFilial",
        data: { dataUpdate: JSON.stringify(dataUpdate) },
    }).done(function (response) {
        exibeMensagem("success", "Operação realizada", "Salvo com sucesso");
        console.log("fim saveFiliais", new Date().toJSON())
        deferred.resolve(false);
    }).fail(function (response) {
        trataErroHTTP("Ocorreu um erro ao alterar o percentual", response);
        console.log("fim saveFiliais", new Date().toJSON())
        deferred.resolve(true);
    })

    return deferred.promise();
}

function saveClienteIndicadorPercentualDiferenciado(pCPFCNPJ, pPcCliente, pPcIndicador) {
    var deferred = new $.Deferred;

    let dataUpdate = [
        { id: "CD_EMPRESA", value: objParametroProgramaFidelidade.CD_EMPRESA, isKey: true },
        { id: "CD_CPF_CNPJ", value: pCPFCNPJ, isKey: true },
        { id: "PC_PROGRAMA_FIDELIDADE", value: pPcCliente, isKey: false },
        { id: "PC_PROGRAMA_FIDELIDADE_INDICADOR", value: pPcIndicador, isKey: false },
    ]

    $.ajax({
        type: "POST",
        url: "/ProgramaFidelidade/saveClienteIndicadorPercentualDiferenciado",
        data: { dataUpdate: JSON.stringify(dataUpdate) },
    }).done(function (response) {
        exibeMensagem("success", "Operação realizada", "Salvo com sucesso");
        deferred.resolve(false);
    }).fail(function (response) {
        trataErroHTTP("Ocorreu um erro ao alterar o percentual", response);
        deferred.resolve(true);
    })

    return deferred.promise();
}

function saveFamiliaPercentualDiferenciado(pFamilia, pPcCliente, pPcIndicador) {
    var deferred = new $.Deferred;

    let dataUpdate = [
        { id: "CD_EMPRESA", value: objParametroProgramaFidelidade.CD_EMPRESA, isKey: true },
        { id: "CD_FAMILIA", value: pFamilia, isKey: true },
        { id: "PC_PROGRAMA_FIDELIDADE", value: pPcCliente, isKey: false },
        { id: "PC_PROGRAMA_FIDELIDADE_INDICADOR", value: pPcIndicador, isKey: false },
    ]

    $.ajax({
        type: "POST",
        url: "/ProgramaFidelidade/saveFamilia",
        data: { dataUpdate: JSON.stringify(dataUpdate) },
    }).done(function (response) {
        exibeMensagem("success", "Operação realizada", "Salvo com sucesso");
        deferred.resolve(false);
    }).fail(function (response) {
        trataErroHTTP("Ocorreu um erro ao alterar o percentual", response);
        deferred.resolve(true);
    })

    return deferred.promise();
}

function saveProdutoPercentualDiferenciado(pProduto, pPcCliente, pPcIndicador) {
    var deferred = new $.Deferred;

    let dataUpdate = [
        { id: "CD_EMPRESA", value: objParametroProgramaFidelidade.CD_EMPRESA, isKey: true },
        { id: "CD_PRODUTO", value: pProduto, isKey: true },
        { id: "PC_PROGRAMA_FIDELIDADE", value: pPcCliente, isKey: false },
        { id: "PC_PROGRAMA_FIDELIDADE_INDICADOR", value: pPcIndicador, isKey: false },
    ]

    $.ajax({
        type: "POST",
        url: "/ProgramaFidelidade/saveProduto",
        data: { dataUpdate: JSON.stringify(dataUpdate) },
    }).done(function (response) {
        exibeMensagem("success", "Operação realizada", "Salvo com sucesso");
        deferred.resolve(true);
    }).fail(function (response) {
        trataErroHTTP("Ocorreu um erro ao alterar o percentual", response);
        deferred.resolve(false);
    })

    return deferred.promise();
}

function configuraClientes() {
    avancaProximaEtapa('#cardClientesParticipantes', '#cardClientesBloqueados');
}

function configuraEtapaLancamentoPrograma() {
    //SE A DATA DE LANÇAMENTO ESTIVER NULA, DEFINE COMO A DATA DO DIA SEGUINTE
    if (objParametroProgramaFidelidade.DT_PROGRAMA_FIDELIDADE_LANCAMENTO == null) {
        var today = new Date();
        var tomorrow = new Date(today.getTime() + 86400000);

        vDt_Inicio_Programa.option('value', tomorrow);
    }
    avancaProximaEtapa('#cardGeracaoCashBackComCreditoCliente', '#cardLancamentoProgramaFidelidade');
}

async function configuraEtapaResumo() {
    showProcessPanel("Carregando...", arguments.callee.name);

    vLoading = true;

    await Promise.all([
        getParametros(),

        carregaGridFiliais(),
        carregaGridBoxClientesNaoHabilitados(),
        carregaGridClientesHabilitados(),
        carregaGridBoxClientesNaoBloqueados(),
        carregaGridClientesBloqueados(),

        carregaGridBoxIndicadoresNaoHabilitados(),
        carregaGridIndicadoresHabilitados(),
        carregaGridBoxIndicadoresNaoBloqueados(),
        carregaGridIndicadoresBloqueados(),

        carregaGridFiliaisPercentuaisDiferenciados(),
        carregaGridClientesIndicadoresPercentuaisDiferenciados(),
        carregaFamiliasPercentuaisDiferenciados(),
        carregaGridProdutosPercentuaisDiferenciados(),
    ]);

    objParametroProgramaFidelidade.LG_RESUMO = true;

    configuraTela();

    retornaEtapaAnterior('#cardConfiguracaoConcluida', '#cardResumoConfiguracoes');

    vLoading = false;

    hideProcessPanel(arguments.callee.name);
}

async function definePercentualDiferenciado(pComponent, pTabela, pCampo, pOperacao) {
    let campo = "PC_PROGRAMA_FIDELIDADE" + (pCampo == "INDICADOR" ? "_INDICADOR" : "");
    let data = pComponent.getSelectedRowsData();
    let dsCampo = (pCampo == "CLIENTE" ? "clientes" : "indicadores");
    let listUpdate = [];
    let value = null;

    if (data.length == 0) {
        exibeMensagem("info", "Nenhum registro foi selecionado!", "É necessário selecionar os registros para realizar a alteração");
        return;
    }

    if (pOperacao == 'VALORIZAR') {
        if (pTabela == "FILIAL") {
            $('#titleH2DefinicaoPercentualGeral').text('Definir Percentual de Filial');
            $('#titleH5DefinicaoPercentualGeral').text('Define um percentual de cashback de ' + dsCampo + ' para todas as filiais selecionadas');
        } else if (pTabela == "CLIENTE") {
            $('#titleH2DefinicaoPercentualGeral').text('Definir Percentual de Cliente');
            $('#titleH5DefinicaoPercentualGeral').text('Define um percentual de cashback de ' + dsCampo + ' para todas os clientes selecionados');
        } else if (pTabela == "FAMILIA") {
            $('#titleH2DefinicaoPercentualGeral').text('Definir Percentual de Família de Produto');
            $('#titleH5DefinicaoPercentualGeral').text('Define um percentual de cashback de ' + dsCampo + ' para todas as famílias selecionadas');
        } else if (pTabela == "PRODUTO") {
            $('#titleH2DefinicaoPercentualGeral').text('Definir Percentual de Produto');
            $('#titleH5DefinicaoPercentualGeral').text('Define um percentual de cashback de ' + dsCampo + ' para todos os produtos selecionados');
        }

        let exit = false;
        abrirModal('ModalDefinicaoPercentualGeral');
        var acao = null;

        while (exit == false) {
            await new Promise(function (resolve, reject) {
                $("#btnOKDefinicaoPercentualGeral").prop("onclick", null).off("click");
                $('#btnOKDefinicaoPercentualGeral').click(function () {
                    resolve("OK");
                });

                $("#btnAbortarDefinicaoPercentualGeral").prop("onclick", null).off("click");
                $('#btnAbortarDefinicaoPercentualGeral').click(function () {
                    resolve("ABORTAR");
                });
            }).then(function (response) {
                acao = response;
            });

            if (acao == "ABORTAR") {
                return;
            } else { //CLICADO EM OK
                if (!nbxPercentualGeral.option("value")) {
                    exibeMensagem("info", "Campo obrigatório", "É necessário informar o percentual");
                } else { //PERCENTUAL PREENCHIDO

                    exit = true;
                    fecharModal("ModalDefinicaoPercentualGeral");
                }
            }

            value = nbxPercentualGeral.option("value");
        }
    } else { //LIMPAR
        var acao = null;
        var title = "";
        var msg = "";
        if (pTabela == "FILIAL") {
            title = 'Limpar Percentual de Filial';
            msg = '<h4>Deseja realmente limpar os percentuais de cashback de ' + dsCampo + ' para todas as filiais selecionadas?</h4>';
        } else if (pTabela == "CLIENTE") {
            title = 'Limpar Percentual de Cliente';
            msg = '<h4>Deseja realmente limpar os percentuais de cashback de ' + dsCampo + ' para todas os clientes selecionados?</h4>';
        } else if (pTabela == "FAMILIA") {
            title = 'Limpar Percentual de Família de Produto';
            msg = '<h4>Deseja realmente limpar os percentuais de cashback de ' + dsCampo + ' para todas as famílias selecionadas?</h4>';
        } else if (pTabela == "PRODUTO") {
            title = 'Limpar Percentual de Produto';
            msg = '<h4>Deseja realmente limpar os percentuais de cashback de ' + dsCampo + ' para todos os produtos selecionados?</h4>';
        }

        await new Promise(function (resolve, reject) {
            new modalMessage('ModalMensagem').showQuestionModal(
                msg,
                title,
                () => { resolve("OK"); },
                () => { resolve("ABORTAR"); });
        }).then(function (response) {
            acao = response;
        });

        if (acao == "ABORTAR") return;
    }

    if (pTabela == "FILIAL") {
        data.forEach((item) => {
            let dataUpdate = [
                { id: "CD_EMPRESA", value: objParametroProgramaFidelidade.CD_EMPRESA, isKey: true },
                { id: "CD_FILIAL", value: item.CD_FILIAL, isKey: true },
                { id: campo, value: value, isKey: false }
            ]

            listUpdate.push(dataUpdate);
        })
    }
    else if (pTabela == "CLIENTE") {
        data.forEach((item) => {
            let dataUpdate = [
                { id: "CD_EMPRESA", value: objParametroProgramaFidelidade.CD_EMPRESA, isKey: true },
                { id: "CD_CPF_CNPJ", value: item.CD_CPF_CNPJ, isKey: true },
                { id: campo, value: value, isKey: false }
            ]

            listUpdate.push(dataUpdate);
        })
    }
    else if (pTabela == "FAMILIA") {
        data.forEach((item) => {
            let dataUpdate = [
                { id: "CD_EMPRESA", value: objParametroProgramaFidelidade.CD_EMPRESA, isKey: true },
                { id: "CD_FAMILIA", value: item.CD_FAMILIA, isKey: true },
                { id: campo, value: value, isKey: false }
            ]

            listUpdate.push(dataUpdate);
        })
    }
    else if (pTabela == "PRODUTO") {
        data.forEach((item) => {
            let dataUpdate = [
                { id: "CD_EMPRESA", value: objParametroProgramaFidelidade.CD_EMPRESA, isKey: true },
                { id: "CD_PRODUTO", value: item.CD_PRODUTO, isKey: true },
                { id: campo, value: value, isKey: false }
            ]

            listUpdate.push(dataUpdate);
        })
    }

    showProcessPanel("Salvando...", arguments.callee.name);

    await $.ajax({
        type: "POST",
        url: "/ProgramaFidelidade/definePercentualDiferenciado",
        data: { dataUpdate: JSON.stringify(listUpdate), pTabela: pTabela },
    }).done(function (response) {
        exibeMensagem("success", "Operação realizada", "Salvo com sucesso");
    }).fail(function (response) {
        trataErroHTTP("Ocorreu um erro ao alterar os registros", response);
    });

    if (pTabela == "FILIAL") {
        carregaGridFiliaisPercentuaisDiferenciados();
    } else if (pTabela == "CLIENTE") {
        carregaGridClientesIndicadoresPercentuaisDiferenciados();
    } else if (pTabela == "FAMILIA") {
        carregaFamiliasPercentuaisDiferenciados();
    } else if (pTabela == "PRODUTO") {
        carregaGridProdutosPercentuaisDiferenciados();
    }

    hideProcessPanel(arguments.callee.name);
}

function desabilitaTodosPanels() {
    ExibirEsconderPaineis('cardInicio', 'none');
    ExibirEsconderPaineis('cardFiliais', 'none');
}

function ExibirEsconderPaineis(el, paramDisplay) {

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

function alteraClasseLabelExcecaoPercentual(el) {
    if ($(el).hasClass("text-primary") == true) {
        $(el).removeClass("text-primary");
    } else {
        $(el).addClass("text-primary");
    }
}

function avancaProximaEtapa(cardInibir, cardExibir) {
    animateCSS(cardInibir, 'fadeOutLeft', 'out').then(() => {
        animateCSS(cardExibir, 'fadeInRight');
    });
    rolarTopo();
}

function retornaEtapaAnterior(cardInibir, cardExibir) {
    animateCSS(cardInibir, 'fadeOutRight', 'out').then(() => {
        animateCSS(cardExibir, 'fadeInLeft');
    });

    rolarTopo();
}

function FormatButtons() {

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

function rolar_para(elemento) {
    $('html, body').animate({ scrollTop: $(elemento).offset().top }, 600);
}

function rolarTopo() {
    window.scrollTo(0, 0);
};

function abrirModal(idModal) {
    $("#" + idModal).modal("toggle");
}

function fecharModal(idModal) {
    $("#" + idModal).modal("toggle");
}

/////////////////////////////////////////////////////////////////////////////////

function showProcessPanel(pMessage, pCaller) {
    if (!callerShowProcessPanel) {
        processPanel = $("#processPanel").dxLoadPanel({
            shadingColor: "rgba(0,0,0,0.4)",
            message: pMessage,
            visible: false,
            showIndicator: true,
            showPane: true,
            shading: true,
            hideOnOutsideClick: false,
        }).dxLoadPanel("instance");

        processPanel.show();

        callerShowProcessPanel = pCaller;
    }
}

function hideProcessPanel(pCaller) {
    if (callerShowProcessPanel == pCaller) {
        processPanel.hide();
        callerShowProcessPanel = null;
    }
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

    new PNotify(configuration)
}

function trataErroHTTP(pMensagemOperacao, pResponse) {
    var vMsgErroHTTP = "Erro desconhecido";

    if (pResponse) {
        if (pResponse.responseJSON) {
            vMsgErroHTTP = pResponse.status + ": " + pResponse.responseJSON.detail;
        } else if (pResponse.responseText) {
            vMsgErroHTTP = pResponse.status + ": " + pResponse.responseText;
        } else {
            vMsgErroHTTP = pResponse.status + ": " + pResponse.statusText;
        }
    }

    exibeMensagem("error", pMensagemOperacao, vMsgErroHTTP);
}

function round(pNumber, pDecimals) {
    return parseFloat(Math.round(pNumber * Math.pow(10, pDecimals)) / Math.pow(10, pDecimals).toFixed(pDecimals));
}

function formataNumero(pValor, pMinCasasDecimais, pMaxCasasDecimais) {
    const options = { style: "decimal", minimumFractionDigits: pMinCasasDecimais, maximumFractionDigits: pMaxCasasDecimais }
    return new Intl.NumberFormat("pt-BR", options).format(pValor);
}

Date.prototype.yyyyMMdd = function () {
    var m = this.getMonth() + 1; // getMonth() is zero-based
    var d = this.getDate();

    return [this.getFullYear(), "-" + (m > 9 ? "" : "0") + m, "-" + (d > 9 ? "" : "0") + d].join("");
};

Date.prototype.ddMMyyyy = function () {
    return new Intl.DateTimeFormat("pt-BR");
};

Date.prototype.ddMMyyyyHHmm = function () {
    const options = { hour: "numeric", minute: "numeric", hour12: false, timeZone: 'America/Sao_Paulo', day: "2-digit", month: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("pt-BR", options).format(this).replace(",", "");
};

function isNull(pObj, pObjRetorno) {
    return pObj == null ? pObjRetorno : pObj;
}

//#endregion [ FUNÇÕES ]


/*
 * criar
 * Criar modal para informar os percentuais (filiais, clientes, famílias e produtos)
 *
 * Alterar onRowUpdating dos grids de percentual diferenciado
 * */