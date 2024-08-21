var COMPONENTES = [];
var dxComp = Object();

let load_lkp_Fornecedores = Load_Azr_Lookup_FornecedorV2('lkp_Fornecedores', COMPONENTES, 1, 'Fornecedor Padrão *', 'Fornecedor Padrão *').then(() => {
    dxComp.lkp_Fornecedores = DevExpress.ui.dxLookup.getInstance('#lkp_Fornecedores');
});

let load_lkp_Familias = Load_Azr_DropDownBox_FamiliaProduto(COMPONENTES, 'lkp_Familias', 'Família do Produto *', 1).then(() => {
    dxComp.lkp_Familias = DevExpress.ui.dxDropDownBox.getInstance('#lkp_Familias');
});

let vTag_Almoxarifados_Individual = Load_Azr_TagBox_Almoxarifado(COMPONENTES, "tag_Almoxarifados_Individual", 'A', "Almoxarifado não identificado", "Almoxarifados em que o Produto está disponível *").then(function (e) {
    vTag_Almoxarifados_Individual = $("#tag_Almoxarifados_Individual").dxTagBox("instance");
});

Promise.all([load_lkp_Familias, load_lkp_Fornecedores]);

//#region [ Variaveis ]

var componenteBotaoNumberBox;
var valorOperadorReajuste;
var valorNumberBoxCustoFretePrecoFixo;
var valorNumberBoxCustoFrete;
var componenteValorReajuste;
var tipoValorReajuste = '%';
var componenteBotaoNumberBox;
var listHistoricoSerasa;

var dataSourceStatus = [
    { CD_STATUS: 'A', DS_STATUS: "Ativo" },
    { CD_STATUS: 'I', DS_STATUS: "Inativo" },
];

var dataSourceCamposInclusaoProdutosTabelaPreco = [
    { CD_CAMPO: 'VL_PRECO_TABELA', DS_CAMPO: "Preço da Tabela" },
    { CD_CAMPO: 'PC_DIFERENCA_PRECO_PADRAO', DS_CAMPO: "% Desc(-) Acrésc(+)" },
    { CD_CAMPO: 'PC_RENTABILIDADE_TABELA', DS_CAMPO: "% Rentabilidade" },
];

var tabelaPreco;
var tabelaPrecoAplicacao;
var btnHabilitarExclusaoProdutoTabelaAplicacao = true;
var btnHabilitarAlteracaoProdutoTabelaAplicacao = true;
var tabelaPrecoTipo;
var tabelaPrecoClientesCarregados = false;
var tabelaPrecoProdutosECommerceCarregados = false;

function ativarTabela(codigoTabela) {
    var idHtmlCampos = "#cardCamposTabela_" + codigoTabela;
    var idHtmlBtnAtivarTabela = "panelBtnAtivarTabela_" + codigoTabela;
    var idHtmlBtnTabelaAtivada = "panelBtnTabelaAtivada_" + codigoTabela;
    var idHtmlBtnEditar = "panelBtnEditarTabela_" + codigoTabela;
    var idHtmlBtnEditarExcluir = "panelBtnEditarExcluirTabela_" + codigoTabela;
    var campoLucroFoco = '#nbx_Pc_Lucro_Tabela_Preco_Aba_Preco_' + codigoTabela;

    $(idHtmlCampos).slideDown();

    ExibirEsconderPaineis(idHtmlBtnAtivarTabela, 'none');
    ExibirEsconderPaineis(idHtmlBtnTabelaAtivada, 'block');
    
    ExibirEsconderPaineis(idHtmlBtnEditar, 'none');
    ExibirEsconderPaineis(idHtmlBtnEditarExcluir, 'block');

    $(campoLucroFoco).dxNumberBox('instance').focus();
}

function excluirProdutoTabela(codigoTabela) {
    var idHtmlCampos = "#cardCamposTabela_" + codigoTabela;
    var idHtmlBtnAtivarTabela = "panelBtnAtivarTabela_" + codigoTabela;
    var idHtmlBtnTabelaAtivada = "panelBtnTabelaAtivada_" + codigoTabela;
    var idHtmlBtnEditar = "panelBtnEditarTabela_" + codigoTabela;
    var idHtmlBtnEditarExcluir = "panelBtnEditarExcluirTabela_" + codigoTabela;

    $(idHtmlCampos).slideUp();

    ExibirEsconderPaineis(idHtmlBtnAtivarTabela, 'block');
    ExibirEsconderPaineis(idHtmlBtnTabelaAtivada, 'none');

    ExibirEsconderPaineis(idHtmlBtnEditar, 'block');
    ExibirEsconderPaineis(idHtmlBtnEditarExcluir, 'none');
}

function criarTabelaPreco() {
    tabelaPrecoClientesCarregados = false;
    tabelaPrecoProdutosECommerceCarregados = false;

    $("#txt_Ds_Tabela_Preco_Aba_Preco").dxTextBox("instance").option("value", "");
    $("#lkp_Tipos_Tabelas_Aba_Preco").dxLookup("instance").option("value", null);
    $("#nbx_Pc_Padrao").dxNumberBox("instance").option("value", "");
    $("#lkp_Aplicacao_Produtos_Tabelas_Aba_Preco").dxLookup("instance").option("value", null);
    $("#lkp_Status_Tabela_Aba_Preco").dxLookup("instance").option("value", 'A');

    ExibirEsconderPaineis('panelPercentualPadraoTabelaPreco', 'none');
    ExibirEsconderPaineis('panelAplicacaoProdutosTabelaPreco', 'none');
    ExibirEsconderPaineis('cardTabelaPrecosTabsProdutoCliente', 'none');
    avancaProximaEtapa('#panelTabelaPrecosManutencaoInicio', '#panelTabelaPrecosDadosAbaPreco') 
}

function editarTabelaPreco(codigo, nome, tipo, percentual, aplicacao, status) {

    tabelaPrecoClientesCarregados = false;
    tabelaPrecoProdutosECommerceCarregados = false;
    tabelaPreco = codigo;
    tabelaPrecoTipo = tipo;
    tabelaPrecoAplicacao = aplicacao;

    $("#txt_Ds_Tabela_Preco_Aba_Preco").dxTextBox("instance").option("value", nome);
    $("#lkp_Tipos_Tabelas_Aba_Preco").dxLookup("instance").option("value", tipo);
    $("#nbx_Pc_Padrao").dxNumberBox("instance").option("value", percentual);
    $("#lkp_Aplicacao_Produtos_Tabelas_Aba_Preco").dxLookup("instance").option("value", aplicacao);
    $("#lkp_Status_Tabela_Aba_Preco").dxLookup("instance").option("value", status);

    avancaProximaEtapa('#panelTabelaPrecosManutencaoInicio', '#panelTabelaPrecosDadosAbaPreco')

    if (aplicacao == 'T') {
        ExibirEsconderPaineis('cardGridBoxTabelaProdutosInclusao', 'none');
        ExibirEsconderPaineis('labelTabelaAplicadaTodosProdutos', 'block');
        btnHabilitarExclusaoProdutoTabelaAplicacao = false;
    } else {
        ExibirEsconderPaineis('cardGridBoxTabelaProdutosInclusao', 'block');
        ExibirEsconderPaineis('labelTabelaAplicadaTodosProdutos', 'none');
        btnHabilitarExclusaoProdutoTabelaAplicacao = true;
    }

    if (tabelaPrecoTipo !== 'P') {
        btnHabilitarAlteracaoProdutoTabelaAplicacao = false;
    } else {
        btnHabilitarAlteracaoProdutoTabelaAplicacao = true;
    }

    ExibirEsconderPaineis('cardTabelaPrecosTabsProdutoCliente', 'block');
    carregarProdutosManutencaoTabelaPreco(codigo);
}

function gravarTabelaPreco() {
    codigo = 6; //código gerado no banco de dados para a nova tabela
    tabelaPreco = codigo; //variável geral para navegação entre as abas
    tabelaPrecoAplicacao = $("#lkp_Aplicacao_Produtos_Tabelas_Aba_Preco").dxLookup("instance").option("value");
    tabelaPrecoTipo = $("#lkp_Tipos_Tabelas_Aba_Preco").dxLookup("instance").option("value");

    if (tabelaPrecoAplicacao == 'T') {
        ExibirEsconderPaineis('cardGridBoxTabelaProdutosInclusao', 'none');
        ExibirEsconderPaineis('labelTabelaAplicadaTodosProdutos', 'block');
        btnHabilitarExclusaoProdutoTabelaAplicacao = false;
    } else {
        ExibirEsconderPaineis('cardGridBoxTabelaProdutosInclusao', 'block');
        ExibirEsconderPaineis('labelTabelaAplicadaTodosProdutos', 'none');
        btnHabilitarExclusaoProdutoTabelaAplicacao = true;
    }

    if (tabelaPrecoTipo !== 'P') {
        btnHabilitarAlteracaoProdutoTabelaAplicacao = false;
    } else {
        btnHabilitarAlteracaoProdutoTabelaAplicacao = true;
    }

    document.getElementById('abaAcessoTabelaPrecosProdutos').click();

    $('#cardTabelaPrecosTabsProdutoCliente').slideDown();
    carregarProdutosManutencaoTabelaPreco(codigo);
}
function retornaTabelaPrecoInicial() {
    retornaEtapaAnterior('#panelTabelaPrecosDadosAbaPreco', '#panelTabelaPrecosManutencaoInicio');
    $('#panelTabelaPrecosProdutosAbaPreco').slideUp();
    $('#panelTabelaPrecosClientesAbaPreco').slideUp();
    document.getElementById('abaAcessoTabelaPrecosProdutos').click();

}


function carregarProdutosManutencaoTabelaPreco(tabela) {

    $('#gridTabelasProdutosAbaPrecos').slideUp();

    loadPanelTabelaPrecosProdutos = $('#loadPanelTabelaPrecosProdutos').dxLoadPanel({
        shadingColor: 'rgba(0,0,0,0.4)',
        message: 'Carregando Produtos',
        //position: { of: '#ModalIncluirEditarTabelaPrecos' },
        visible: false,
        showIndicator: true,
        showPane: true,
        shading: true,
        hideOnOutsideClick: false,
    }).dxLoadPanel('instance');

    loadPanelTabelaPrecosProdutos2 = $('#loadPanelTabelaPrecosProdutos2').dxLoadPanel({
        shadingColor: 'rgba(0,0,0,0.4)',
        message: 'Carregando Produtos',
        //position: { of: '#ModalIncluirEditarTabelaPrecos' },
        visible: false,
        showIndicator: true,
        showPane: true,
        shading: true,
        hideOnOutsideClick: false,
    }).dxLoadPanel('instance');

    loadPanelTabelaPrecosProdutos.show();
    loadPanelTabelaPrecosProdutos2.show();

    //Produtos de uma Determinada Tabelas de Preços
    GetAzureDataSource(82, '{ CD_TABELA_PRECO: ' + tabela + ', CD_STATUS_PRODUTO: "A" }', 180).then((result) => {

        if (result.success) {

            console.log('CARGA PRIMEIRO DATASOURCE PRODUTOS');

            gridTabelasProdutosAbaPrecos = $("#gridTabelasProdutosAbaPrecos").dxDataGrid({
                dataSource: result.data,
                hoverStateEnabled: true,
                showBorders: true,
                showRowLines: true,
                showColumnLines: true,
                rowAlternationEnabled: true,
                wordWrapEnabled: true,
                columnHidingEnabled: true,
                editing: {
                    mode: 'batch',
                    allowUpdating: btnHabilitarAlteracaoProdutoTabelaAplicacao,
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
                    visible: true,
                    emptyPanelText: "Agrupar",
                },
                paging: { pageSize: 10 },
                pager: {
                    visible: true,
                    allowedPageSizes: [10, 20, 50],
                    showPageSizeSelector: true,
                    showNavigationButtons: true
                },
                export: {
                    enabled: true,
                    allowExportSelectedData: false
                },
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('Produtos');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProdutosTabelaPreço_' + tabela + '.xlsx');
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
                keyExpr: 'CD_PRODUTO',
                columns: [
                    {
                        type: "selection",
                        dataField: "CD_SELECAO",
                        width: 30,
                        value: false,
                        allowHiding: false,
                    },
                    {
                        dataField: "CD_PRODUTO",
                        caption: "Código",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: true,
                        allowHiding: false,
                    },
                    {
                        dataField: "DS_PRODUTO",
                        caption: "Produto",
                        //width: 200,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        allowHiding: false,
                        visible: true,
                        //groupIndex: 0,
                    },
                    {
                        dataField: "CD_PRODUTO_ECOMMERCE",
                        caption: "Código e-Commerce",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: true,
                    },
                    {
                        dataField: "DS_STATUS",
                        caption: "Status",
                        width: 75,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "LG_FORA_LINHA",
                        caption: "Fora Linha",
                        width: 70,
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: true,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "VL_PRECO_MINIMO_VENDA",
                        caption: "Preço Padrão",
                        width: 80,
                        dataType: 'number',
                        format: "###,###,###,##0.00",
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'right',
                        allowHeaderFiltering: false,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: true,
                    },
                    {
                        dataField: "PC_DIFERENCA_PRECO_PADRAO",
                        caption: "Desc(-) Acresc(+)",
                        width: 120,
                        dataType: 'number',
                        format: "###,###,###,##0.###############'%'",
                        allowEditing: true,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: true,
                    },
                    {
                        dataField: "PC_LUCRO_TABELA",
                        caption: "% Lucro Tabela",
                        width: 120,
                        dataType: 'number',
                        format: "###,###,###,##0.###############'%'",
                        allowEditing: true,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "PC_RENTABILIDADE_TABELA",
                        caption: "% Rentabilidade da Tabela",
                        width: 130,
                        dataType: 'number',
                        format: "###,###,###,##0.###############'%'",
                        allowEditing: true,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: true,
                    },
                    {
                        dataField: "VL_PRECO_TABELA",
                        caption: "Preço desta Tabela",
                        width: 80,
                        dataType: 'number',
                        format: "###,###,###,##0.00",
                        allowEditing: true,
                        allowSorting: true,
                        alignment: 'right',
                        allowHeaderFiltering: false,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: true,
                        allowHiding: false,
                    },
                    {
                        dataField: "DS_MARCA",
                        caption: "Marca",
                        //width: 200,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "DS_FAMILIA",
                        caption: "Família",
                        //width: 200,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "CD_CURVA_ABC",
                        caption: "Curva",
                        width: 60,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "CD_FABRICANTE",
                        caption: "Cód. Fabricante",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "CD_ORIGINAL",
                        caption: "Cód. Original",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "CD_OPCIONAL",
                        caption: "Cód. Opcional",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "CD_EAN_PRODUTO",
                        caption: "Código Barras",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "CD_NCM",
                        caption: "NCM",
                        width: 80,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "CD_INTERNO_PRODUTO_FORNECEDOR",
                        caption: "Cód. Interno Fornec",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "CD_FORNECEDOR",
                        caption: "Fornecedor",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "DS_RAZAO_SOCIAL_FORNECEDOR",
                        caption: "Razão Social Fornecedor",
                        //width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "DS_FANTASIA_FORNECEDOR",
                        caption: "Fantasia Fornecedor",
                        //width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "VL_CUSTO_SEM_IMPOSTOS",
                        caption: "Custo Sem Impostos",
                        width: 90,
                        dataType: 'number',
                        format: "###,###,###,##0.00###",
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'right',
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "VL_CUSTO_TOTAL",
                        caption: "Custo Com Impostos",
                        width: 90,
                        dataType: 'number',
                        format: "###,###,###,##0.00###",
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'right',
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "PC_IPI",
                        caption: "% IPI Custo",
                        width: 90,
                        dataType: 'number',
                        format: "###,###,###,##0.#####'%'",
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "PC_SUBSTITUICAO",
                        caption: "% ST Custo",
                        width: 90,
                        dataType: 'number',
                        format: "###,###,###,##0.#####'%'",
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "PC_FRETE_COMPRA",
                        caption: "% Frete Compra",
                        width: 90,
                        dataType: 'number',
                        format: "###,###,###,##0.#####'%'",
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "VL_FRETE_COMPRA",
                        caption: "Frete Compra",
                        width: 90,
                        dataType: 'number',
                        format: "###,###,###,##0.00###",
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'right',
                        allowHeaderFiltering: false,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "PC_LUCRO",
                        caption: "% Lucro Produto",
                        width: 90,
                        dataType: 'number',
                        format: "###,###,###,##0.#####'%'",
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "PC_RENTABILIDADE",
                        caption: "% Rentab. Produto",
                        width: 90,
                        dataType: 'number',
                        format: "###,###,###,##0.#####'%'",
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                ],

                onCellPrepared: function (e) {
                    if (e.rowType === "data") {

                        if (e.column.allowEditing && btnHabilitarAlteracaoProdutoTabelaAplicacao == true) {
                            e.cellElement.css("background-color", "#EDF3F8");
                        }

                        if (e.column.dataField === "DS_STATUS") {
                            if (e.value === "Inativo") {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
                        }
                        if (e.column.dataField === "PC_RENTABILIDADE_TABELA") {
                            if (e.value < 0) {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
                        }
                        if (e.column.dataField === "VL_PRECO_TABELA") {
                            e.cellElement.css("font-weight", "bold");
                        }
                        if (e.column.dataField === "LG_FORA_LINHA") {
                            e.cellElement.css("background-color", e.data.DS_COLOR_FORA_LINHA);
                            e.cellElement.css("color", "white");
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
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'auto',
                            options: {
                                icon: 'trash',
                                text: 'Excluir Produtos',
                                hint: 'Excluir produtos selecionados da tabela de preços',
                                type: 'danger',
                                visible: btnHabilitarExclusaoProdutoTabelaAplicacao,
                                onClick() {
                                },
                            },
                        },
                        {
                            name: "groupPanel",
                            locateInMenu: "auto",
                        },
                        'saveButton',
                        'revertButton',
                        'exportButton',
                        'columnChooserButton',
                        'searchPanel',
                    ],
                },

                stateStoring: AutoLoad("gridTabelasProdutosAbaPrecos", false),
                onToolbarPreparing: AutoResetState([]),

                onInitialized(e) {
                    new IntersectionObserver(entries => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                e.component.updateDimensions();
                            }
                        });
                    }).observe(e.element[0]);
                },
            });

            $('#gridTabelasProdutosAbaPrecos').slideDown();
            loadPanelTabelaPrecosProdutos2.hide();
        }
        else {
            loadPanelTabelaPrecosProdutos2.hide();

            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    GetAzureDataSource(83, '{ CD_TABELA_PRECO: ' + tabela + ', CD_STATUS_PRODUTO: "A" }', 180).then((result) => {

        if (result.success) {

            $('#panelTabelaPrecosProdutosAbaPreco').slideDown();
            console.log('CARGA SEGUNDO DATASOURCE PRODUTOS');

            gridBoxProdutosNaoHabilitadosTabelaPreco = $('#gridBoxProdutosNaoHabilitadosTabelaPreco').dxDropDownBox({
                valueExpr: 'CD_PRODUTO',
                displayExpr: 'CD_PRODUTO',
                labelMode: 'floating',
                label: '',
                placeholder: '+ Clique para adicionar produtos',
                elementAttr: {
                    class: 'gridbox-font',
                },
                showClearButton: true,
                dataSource: new DevExpress.data.CustomStore({
                    loadMode: "raw",
                    key: ['CD_PRODUTO'],
                    load: function () {
                        return result.data;
                    }
                }),
                dropDownOptions: {
                    //closeOnOutsideClick: true,
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
                    //onShowing: async function (e) {
                    //    e.component._$wrapper.css('z-index', 998);
                    //    await this.fnPromise;
                    //    e.component.repaint();
                    //},
                    onShowing: async (e) => {
                        e.component._$wrapper.css('z-index', 1102);
                        await this.fnPromise;
                        /*e.component.repaint();*/
                    },
                    //onOptionChanged: function (e) {
                    //    if (e.name != 'visible') return;
                    //    if (!e.value) return;
                    //    const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardMovimentacao')[0].getBoundingClientRect().top;
                    //    this.fnPromise = $('#cardMovimentacao').animate({ top: diffTop }, {
                    //        complete: () => e.component.refreshPosition(),
                    //    }).promise();
                    //},
                    onOptionChanged: function (e) {
                        if (e.name != "visible") return;
                        if (!e.value) return;
                        $("#formCadastroTabelaPreco").hide();
                        this.fnPromise = $('#panelTabelaPrecosDadosAbaPreco').animate({ top: 0 }, {
                            complete: () => {
                                e.component.refreshPosition();
                                //gridBoxProdutosNaoHabilitadosTabelaPreco.refresh();
                            },
                        }).promise();
                    },
                    onHiding: function (e) {
                        $("#formCadastroTabelaPreco").show();
                    },

                },
                contentTemplate(e) {
                    const value = e.component.option('value');
                    const $dataGrid = $('<div>').dxDataGrid({
                        dataSource: e.component.getDataSource(),
                        searchExpr: ['CD_PRODUTO'],
                        displayExpr: 'CD_PRODUTO',
                        valueExpr: 'CD_PRODUTO',
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
                            allowUpdating: btnHabilitarAlteracaoProdutoTabelaAplicacao,
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
                        keyExpr: ['CD_PRODUTO'],
                        columns: [
                            {
                                type: "selection",
                                dataField: "CD_SELECAO",
                                width: 30,
                                value: false,
                                allowHiding: false,
                            },
                            {
                                dataField: "CD_PRODUTO",
                                caption: "Código",
                                width: 90,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: true,
                                allowHiding: false,
                            },
                            {
                                dataField: "DS_PRODUTO",
                                caption: "Produto",
                                //width: 200,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'left',
                                cssClass: "column-data-grid",
                                allowHiding: false,
                                visible: true,
                                //groupIndex: 0,
                            },
                            {
                                dataField: "CD_PRODUTO_ECOMMERCE",
                                caption: "Código e-Commerce",
                                width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: true,
                            },
                            {
                                dataField: "DS_STATUS",
                                caption: "Status",
                                width: 75,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "LG_FORA_LINHA",
                                caption: "Fora Linha",
                                width: 70,
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'center',
                                allowHeaderFiltering: true,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: true,
                            },
                            {
                                dataField: "VL_PRECO_MINIMO_VENDA",
                                caption: "Preço Padrão",
                                width: 80,
                                dataType: 'number',
                                format: "###,###,###,##0.00",
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'right',
                                allowHeaderFiltering: false,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: true,
                            },
                            {
                                dataField: "PC_DIFERENCA_PRECO_PADRAO",
                                caption: "Desc(-) Acresc(+)",
                                width: 120,
                                dataType: 'number',
                                format: "###,###,###,##0.###############'%'",
                                allowEditing: true,
                                allowSorting: true,
                                alignment: 'center',
                                allowHeaderFiltering: false,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: true,
                            },
                            {
                                dataField: "PC_LUCRO_TABELA",
                                caption: "% Lucro Tabela",
                                width: 120,
                                dataType: 'number',
                                format: "###,###,###,##0.###############'%'",
                                allowEditing: true,
                                allowSorting: true,
                                alignment: 'center',
                                allowHeaderFiltering: false,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "PC_RENTABILIDADE_TABELA",
                                caption: "% Rentabilidade da Tabela",
                                width: 120,
                                dataType: 'number',
                                format: "###,###,###,##0.###############'%'",
                                allowEditing: true,
                                allowSorting: true,
                                alignment: 'center',
                                allowHeaderFiltering: false,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: true,
                            },
                            {
                                dataField: "VL_PRECO_TABELA",
                                caption: "Preço desta Tabela",
                                width: 80,
                                dataType: 'number',
                                format: "###,###,###,##0.00",
                                allowEditing: true,
                                allowSorting: true,
                                alignment: 'right',
                                allowHeaderFiltering: false,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: true,
                                allowHiding: false,
                            },
                            {
                                dataField: "DS_MARCA",
                                caption: "Marca",
                                //width: 200,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "DS_FAMILIA",
                                caption: "Família",
                                //width: 200,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "CD_CURVA_ABC",
                                caption: "Curva",
                                width: 60,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "CD_FABRICANTE",
                                caption: "Cód. Fabricante",
                                width: 90,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "CD_ORIGINAL",
                                caption: "Cód. Original",
                                width: 90,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "CD_OPCIONAL",
                                caption: "Cód. Opcional",
                                width: 90,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "CD_EAN_PRODUTO",
                                caption: "Código Barras",
                                width: 90,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "CD_NCM",
                                caption: "NCM",
                                width: 80,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "CD_INTERNO_PRODUTO_FORNECEDOR",
                                caption: "Cód. Interno Fornec",
                                width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "CD_FORNECEDOR",
                                caption: "Fornecedor",
                                width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "DS_RAZAO_SOCIAL_FORNECEDOR",
                                caption: "Razão Social Fornecedor",
                                //width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'left',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "DS_FANTASIA_FORNECEDOR",
                                caption: "Fantasia Fornecedor",
                                //width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'left',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "VL_CUSTO_SEM_IMPOSTOS",
                                caption: "Custo Sem Impostos",
                                width: 90,
                                dataType: 'number',
                                format: "###,###,###,##0.00###",
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'right',
                                allowHeaderFiltering: false,
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "VL_CUSTO_TOTAL",
                                caption: "Custo Com Impostos",
                                width: 90,
                                dataType: 'number',
                                format: "###,###,###,##0.00###",
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'right',
                                allowHeaderFiltering: false,
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "PC_IPI",
                                caption: "% IPI Custo",
                                width: 90,
                                dataType: 'number',
                                format: "###,###,###,##0.#####'%'",
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'center',
                                allowHeaderFiltering: false,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "PC_SUBSTITUICAO",
                                caption: "% ST Custo",
                                width: 90,
                                dataType: 'number',
                                format: "###,###,###,##0.#####'%'",
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'center',
                                allowHeaderFiltering: false,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "PC_FRETE_COMPRA",
                                caption: "% Frete Compra",
                                width: 90,
                                dataType: 'number',
                                format: "###,###,###,##0.#####'%'",
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'center',
                                allowHeaderFiltering: false,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "VL_FRETE_COMPRA",
                                caption: "Frete Compra",
                                width: 90,
                                dataType: 'number',
                                format: "###,###,###,##0.00###",
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'right',
                                allowHeaderFiltering: false,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "PC_LUCRO",
                                caption: "% Lucro Produto",
                                width: 90,
                                dataType: 'number',
                                format: "###,###,###,##0.#####'%'",
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'center',
                                allowHeaderFiltering: false,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "PC_RENTABILIDADE",
                                caption: "% Rentab. Produto",
                                width: 90,
                                dataType: 'number',
                                format: "###,###,###,##0.#####'%'",
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'center',
                                allowHeaderFiltering: false,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                        ],
                        toolbar: {
                            items: [
                                {
                                    location: 'after',
                                    widget: 'dxLookup',
                                    options: {
                                        dataSource: dataSourceCamposInclusaoProdutosTabelaPreco,
                                        searchExpr: ['DS_CAMPO'],
                                        displayExpr: 'DS_CAMPO',
                                        valueExpr: 'CD_CAMPO',
                                        //value: 'A',
                                        dropDownOptions: {
                                            closeOnOutsideClick: true,
                                            showTitle: false,
                                            title: 'Campo',
                                        },
                                        placeholder: 'Preenchimento Linear',
                                        showClearButton: true,
                                        onValueChanged(e) {
                                            
                                        },
                                    },
                                },
                                {
                                    location: 'after',
                                    widget: 'dxNumberBox',
                                    options: {
                                        name: 'nbxValorPreenchimentoLinear',
                                        value: '',
                                        format: "###,##0.###############",
                                        min: 0,
                                        max: 999999,
                                        showClearButton: true,
                                        showSpinButtons: false,
                                        step: 1,
                                        placeholder: 'Valor Linear',
                                        visible: true,
                                    },
                                },
                                {
                                    location: 'after',
                                    widget: 'dxButton',
                                    options: {
                                        type: 'success',
                                        text: 'Adicionar Produtos',
                                        hint: "Adicionar produtos selecionados",
                                        width: 150,
                                        icon: 'plus',
                                        onClick(e) {
                                            
                                        },

                                    },
                                },
                                'groupPanel',
                                'columnChooserButton',
                                'searchPanel',
                            ],
                        },
                        showBorders: true,
                        onShowing: async (e) => {
                            e.component._$wrapper.css('z-index', 1101);
                            await this.fnPromise;
                            /*e.component.repaint();*/
                        },
                        onCellPrepared: function (e) {
                            if (e.rowType === "data") {
                                if (e.column.allowEditing && btnHabilitarAlteracaoProdutoTabelaAplicacao == true) {
                                    e.cellElement.css("background-color", "#EDF3F8");
                                }

                                if (e.column.dataField === "DS_STATUS") {
                                    if (e.value === "Inativo") {
                                        e.cellElement.css("color", "#d00000");
                                        e.cellElement.css("font-weight", "bold");
                                    };
                                }
                                if (e.column.dataField === "PC_RENTABILIDADE_TABELA") {
                                    if (e.value < 0) {
                                        e.cellElement.css("color", "#d00000");
                                        e.cellElement.css("font-weight", "bold");
                                    };
                                }
                                if (e.column.dataField === "VL_PRECO_TABELA") {
                                    e.cellElement.css("font-weight", "bold");
                                }
                                if (e.column.dataField === "LG_FORA_LINHA") {
                                    e.cellElement.css("background-color", e.data.DS_COLOR_FORA_LINHA);
                                    e.cellElement.css("color", "white");
                                }
                            };
                            if (e.rowType === "group") {
                                e.cellElement.css("color", "#f05b41");
                                e.cellElement.css("background-color", "white");
                            };
                        },
                        paging: { enabled: true, pageSize: 10 },
                        scrolling: { mode: 'virtual' },
                        height: '100%',
                        onSelectionChanged(selectedItems) {
                            listProdutosSelecionadosHabilitar = selectedItems.selectedRowKeys;
                            gridBoxProdutosNaoHabilitadosTabelaPreco.option("value", listProdutosSelecionadosHabilitar.map((obj) => obj.Cd_Produto))

                        },
                        stateStoring: AutoLoad("gridBoxProdutosNaoHabilitadosTabelaPreco", false),
                        onToolbarPreparing: AutoResetState([]),
                    });
                    dataGrid = $dataGrid.dxDataGrid('instance');

                    return $dataGrid;
                },
            }).dxDropDownBox('instance');

            loadPanelTabelaPrecosProdutos.hide();

        }
        else {
            loadPanelTabelaPrecosProdutos.hide();

            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });


}

function carregarProdutosECommerceManutencaoTabelaPreco() {

    if (tabelaPrecoProdutosECommerceCarregados == false) {

        $('#gridTabelasProdutosECommerceAbaPrecos').slideUp();

        loadPanelTabelaPrecosProdutos = $('#loadPanelTabelaPrecosProdutos').dxLoadPanel({
            shadingColor: 'rgba(0,0,0,0.4)',
            message: 'Carregando Produtos e-Commerce',
            //position: { of: '#ModalIncluirEditarTabelaPrecos' },
            visible: false,
            showIndicator: true,
            showPane: true,
            shading: true,
            hideOnOutsideClick: false,
        }).dxLoadPanel('instance');

        loadPanelTabelaPrecosProdutos2 = $('#loadPanelTabelaPrecosProdutos2').dxLoadPanel({
            shadingColor: 'rgba(0,0,0,0.4)',
            message: 'Carregando Produtos e-Commerce',
            //position: { of: '#ModalIncluirEditarTabelaPrecos' },
            visible: false,
            showIndicator: true,
            showPane: true,
            shading: true,
            hideOnOutsideClick: false,
        }).dxLoadPanel('instance');

        loadPanelTabelaPrecosProdutos.show();
        loadPanelTabelaPrecosProdutos2.show();

        //Produtos de uma Determinada Tabelas de Preços
        GetAzureDataSource(82, '{ CD_TABELA_PRECO: ' + tabelaPreco + ', CD_STATUS_PRODUTO: "A", LG_ECOMMERCE: true }', 180).then((result) => {

            if (result.success) {

                console.log('CARREGADO O PRIMEIRO DATASOURCE');

                gridTabelasProdutosECommerceAbaPrecos = $("#gridTabelasProdutosECommerceAbaPrecos").dxDataGrid({
                    dataSource: result.data,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    showColumnLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    editing: {
                        mode: 'batch',
                        allowUpdating: false,
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
                        visible: true,
                        emptyPanelText: "Agrupar",
                    },
                    paging: { pageSize: 10 },
                    pager: {
                        visible: true,
                        allowedPageSizes: [10, 20, 50],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: true,
                        allowExportSelectedData: false
                    },
                    onExporting: function (e) {
                        var workbook = new ExcelJS.Workbook();
                        var worksheet = workbook.addWorksheet('Produtos');

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet: worksheet,
                            autoFilterEnabled: true
                        }).then(function () {
                            workbook.xlsx.writeBuffer().then(function (buffer) {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProdutosECommerceTabelaPreço_' + tabela + '.xlsx');
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
                    keyExpr: 'CD_PRODUTO',
                    columns: [
                        {
                            type: "selection",
                            dataField: "CD_SELECAO",
                            width: 30,
                            value: false,
                            allowHiding: false,
                        },
                        {
                            dataField: "CD_PRODUTO",
                            caption: "Código",
                            width: 90,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: true,
                            allowHiding: false,
                        },
                        {
                            dataField: "DS_PRODUTO",
                            caption: "Produto",
                            //width: 200,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'left',
                            cssClass: "column-data-grid",
                            allowHiding: false,
                            visible: true,
                            //groupIndex: 0,
                        },
                        {
                            dataField: "CD_PRODUTO_ECOMMERCE",
                            caption: "Código e-Commerce",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: true,
                        },
                        {
                            dataField: "DS_STATUS",
                            caption: "Status",
                            width: 75,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "LG_FORA_LINHA",
                            caption: "Fora Linha",
                            width: 70,
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: true,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "VL_PRECO_MINIMO_VENDA",
                            caption: "Preço Padrão",
                            width: 80,
                            dataType: 'number',
                            format: "###,###,###,##0.00",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'right',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: true,
                        },
                        {
                            dataField: "PC_DIFERENCA_PRECO_PADRAO",
                            caption: "Desc(-) Acresc(+)",
                            width: 120,
                            dataType: 'number',
                            format: "###,###,###,##0.###############'%'",
                            allowEditing: true,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: true,
                        },
                        {
                            dataField: "PC_LUCRO_TABELA",
                            caption: "% Lucro Tabela",
                            width: 120,
                            dataType: 'number',
                            format: "###,###,###,##0.###############'%'",
                            allowEditing: true,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "PC_RENTABILIDADE_TABELA",
                            caption: "% Rentabilidade da Tabela",
                            width: 130,
                            dataType: 'number',
                            format: "###,###,###,##0.###############'%'",
                            allowEditing: true,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: true,
                        },
                        {
                            dataField: "VL_PRECO_TABELA",
                            caption: "Preço desta Tabela",
                            width: 80,
                            dataType: 'number',
                            format: "###,###,###,##0.00",
                            allowEditing: true,
                            allowSorting: true,
                            alignment: 'right',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: true,
                            allowHiding: false,
                        },
                        {
                            dataField: "DS_MARCA",
                            caption: "Marca",
                            //width: 200,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "DS_FAMILIA",
                            caption: "Família",
                            //width: 200,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "CD_CURVA_ABC",
                            caption: "Curva",
                            width: 60,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "CD_FABRICANTE",
                            caption: "Cód. Fabricante",
                            width: 90,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "CD_ORIGINAL",
                            caption: "Cód. Original",
                            width: 90,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "CD_OPCIONAL",
                            caption: "Cód. Opcional",
                            width: 90,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "CD_EAN_PRODUTO",
                            caption: "Código Barras",
                            width: 90,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "CD_NCM",
                            caption: "NCM",
                            width: 80,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "CD_INTERNO_PRODUTO_FORNECEDOR",
                            caption: "Cód. Interno Fornec",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "CD_FORNECEDOR",
                            caption: "Fornecedor",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "DS_RAZAO_SOCIAL_FORNECEDOR",
                            caption: "Razão Social Fornecedor",
                            //width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'left',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "DS_FANTASIA_FORNECEDOR",
                            caption: "Fantasia Fornecedor",
                            //width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'left',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "VL_CUSTO_SEM_IMPOSTOS",
                            caption: "Custo Sem Impostos",
                            width: 90,
                            dataType: 'number',
                            format: "###,###,###,##0.00###",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'right',
                            allowHeaderFiltering: false,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "VL_CUSTO_TOTAL",
                            caption: "Custo Com Impostos",
                            width: 90,
                            dataType: 'number',
                            format: "###,###,###,##0.00###",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'right',
                            allowHeaderFiltering: false,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "PC_IPI",
                            caption: "% IPI Custo",
                            width: 90,
                            dataType: 'number',
                            format: "###,###,###,##0.#####'%'",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "PC_SUBSTITUICAO",
                            caption: "% ST Custo",
                            width: 90,
                            dataType: 'number',
                            format: "###,###,###,##0.#####'%'",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "PC_FRETE_COMPRA",
                            caption: "% Frete Compra",
                            width: 90,
                            dataType: 'number',
                            format: "###,###,###,##0.#####'%'",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "VL_FRETE_COMPRA",
                            caption: "Frete Compra",
                            width: 90,
                            dataType: 'number',
                            format: "###,###,###,##0.00###",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'right',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "PC_LUCRO",
                            caption: "% Lucro Produto",
                            width: 90,
                            dataType: 'number',
                            format: "###,###,###,##0.#####'%'",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "PC_RENTABILIDADE",
                            caption: "% Rentab. Produto",
                            width: 90,
                            dataType: 'number',
                            format: "###,###,###,##0.#####'%'",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
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
                            if (e.column.dataField === "PC_RENTABILIDADE_TABELA") {
                                if (e.value < 0) {
                                    e.cellElement.css("color", "#d00000");
                                    e.cellElement.css("font-weight", "bold");
                                };
                            }
                            if (e.column.dataField === "VL_PRECO_TABELA") {
                                e.cellElement.css("font-weight", "bold");
                            }
                            if (e.column.dataField === "LG_FORA_LINHA") {
                                e.cellElement.css("background-color", e.data.DS_COLOR_FORA_LINHA);
                                e.cellElement.css("color", "white");
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
                                location: 'after',
                                widget: 'dxButton',
                                locateInMenu: 'auto',
                                options: {
                                    icon: 'trash',
                                    text: 'Excluir Produtos',
                                    hint: 'Excluir produtos e-commerce selecionados da tabela de preços',
                                    type: 'danger',
                                    visible: btnHabilitarExclusaoProdutoTabelaAplicacao,
                                    onClick() {
                                    },
                                },
                            },
                            {
                                name: "groupPanel",
                                locateInMenu: "auto",
                            },
                            'saveButton',
                            'revertButton',
                            'exportButton',
                            'columnChooserButton',
                            'searchPanel',
                        ],
                    },

                    stateStoring: AutoLoad("gridTabelasProdutosECommerceAbaPrecos", false),
                    onToolbarPreparing: AutoResetState([]),

                    onInitialized(e) {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    e.component.updateDimensions();
                                }
                            });
                        }).observe(e.element[0]);
                    },
                });

                $('#gridTabelasProdutosECommerceAbaPrecos').slideDown();
                loadPanelTabelaPrecosProdutos2.hide();
            }
            else {
                loadPanelTabelaPrecosProdutos2.hide();

                DevExpress.ui.notify({
                    message: `${result.name}: ${result.error}`,
                    type: 'error',
                    displayTime: 5000,
                });
                console.error(`${result.name}: ${result.error}`);
            }
        });

        GetAzureDataSource(83, '{ CD_TABELA_PRECO: ' + tabelaPreco + ', CD_STATUS_PRODUTO: "A", LG_ECOMMERCE: true }', 180).then((result) => {

            if (result.success) {
                console.log('CARREGADO O SEGUNDO DATASOURCE');

                $('#panelTabelaPrecosProdutosECommerceAbaPreco').slideDown();

                gridBoxProdutosECommerceNaoHabilitadosTabelaPreco = $('#gridBoxProdutosECommerceNaoHabilitadosTabelaPreco').dxDropDownBox({
                    valueExpr: 'CD_PRODUTO',
                    displayExpr: 'CD_PRODUTO',
                    labelMode: 'floating',
                    label: '',
                    placeholder: '+ Clique para adicionar produtos',
                    elementAttr: {
                        class: 'gridbox-font',
                    },
                    showClearButton: true,
                    dataSource: new DevExpress.data.CustomStore({
                        loadMode: "raw",
                        key: ['CD_PRODUTO'],
                        load: function () {
                            return result.data;
                        }
                    }),
                    dropDownOptions: {
                        //closeOnOutsideClick: true,
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
                        //onShowing: async function (e) {
                        //    e.component._$wrapper.css('z-index', 998);
                        //    await this.fnPromise;
                        //    e.component.repaint();
                        //},
                        onShowing: async (e) => {
                            e.component._$wrapper.css('z-index', 1102);
                            await this.fnPromise;
                            /*e.component.repaint();*/
                        },
                        //onOptionChanged: function (e) {
                        //    if (e.name != 'visible') return;
                        //    if (!e.value) return;
                        //    const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardMovimentacao')[0].getBoundingClientRect().top;
                        //    this.fnPromise = $('#cardMovimentacao').animate({ top: diffTop }, {
                        //        complete: () => e.component.refreshPosition(),
                        //    }).promise();
                        //},
                        onOptionChanged: function (e) {
                            if (e.name != "visible") return;
                            if (!e.value) return;
                            $("#formCadastroTabelaPreco").hide();
                            this.fnPromise = $('#panelTabelaPrecosDadosAbaPreco').animate({ top: 0 }, {
                                complete: () => {
                                    e.component.refreshPosition();
                                    //gridBoxProdutosNaoHabilitadosTabelaPreco.refresh();
                                },
                            }).promise();
                        },
                        onHiding: function (e) {
                            $("#formCadastroTabelaPreco").show();
                        },

                    },
                    contentTemplate(e) {
                        const value = e.component.option('value');
                        const $dataGrid = $('<div>').dxDataGrid({
                            dataSource: e.component.getDataSource(),
                            searchExpr: ['CD_PRODUTO'],
                            displayExpr: 'CD_PRODUTO',
                            valueExpr: 'CD_PRODUTO',
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
                                allowUpdating: false,
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
                            keyExpr: ['CD_PRODUTO'],
                            columns: [
                                {
                                    type: "selection",
                                    dataField: "CD_SELECAO",
                                    width: 30,
                                    value: false,
                                    allowHiding: false,
                                },
                                {
                                    dataField: "CD_PRODUTO",
                                    caption: "Código",
                                    width: 90,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: true,
                                    allowHiding: false,
                                },
                                {
                                    dataField: "DS_PRODUTO",
                                    caption: "Produto",
                                    //width: 200,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'left',
                                    cssClass: "column-data-grid",
                                    allowHiding: false,
                                    visible: true,
                                    //groupIndex: 0,
                                },
                                {
                                    dataField: "CD_PRODUTO_ECOMMERCE",
                                    caption: "Código e-Commerce",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: true,
                                },
                                {
                                    dataField: "DS_STATUS",
                                    caption: "Status",
                                    width: 75,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "LG_FORA_LINHA",
                                    caption: "Fora Linha",
                                    width: 70,
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: true,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: true,
                                },
                                {
                                    dataField: "VL_PRECO_MINIMO_VENDA",
                                    caption: "Preço Padrão",
                                    width: 80,
                                    dataType: 'number',
                                    format: "###,###,###,##0.00",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: true,
                                },
                                {
                                    dataField: "PC_DIFERENCA_PRECO_PADRAO",
                                    caption: "Desc(-) Acresc(+)",
                                    width: 120,
                                    dataType: 'number',
                                    format: "###,###,###,##0.###############'%'",
                                    allowEditing: true,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: true,
                                },
                                {
                                    dataField: "PC_LUCRO_TABELA",
                                    caption: "% Lucro Tabela",
                                    width: 120,
                                    dataType: 'number',
                                    format: "###,###,###,##0.###############'%'",
                                    allowEditing: true,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "PC_RENTABILIDADE_TABELA",
                                    caption: "% Rentabilidade da Tabela",
                                    width: 120,
                                    dataType: 'number',
                                    format: "###,###,###,##0.###############'%'",
                                    allowEditing: true,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: true,
                                },
                                {
                                    dataField: "VL_PRECO_TABELA",
                                    caption: "Preço desta Tabela",
                                    width: 80,
                                    dataType: 'number',
                                    format: "###,###,###,##0.00",
                                    allowEditing: true,
                                    allowSorting: true,
                                    alignment: 'right',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: true,
                                    allowHiding: false,
                                },
                                {
                                    dataField: "DS_MARCA",
                                    caption: "Marca",
                                    //width: 200,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "DS_FAMILIA",
                                    caption: "Família",
                                    //width: 200,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "CD_CURVA_ABC",
                                    caption: "Curva",
                                    width: 60,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "CD_FABRICANTE",
                                    caption: "Cód. Fabricante",
                                    width: 90,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "CD_ORIGINAL",
                                    caption: "Cód. Original",
                                    width: 90,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "CD_OPCIONAL",
                                    caption: "Cód. Opcional",
                                    width: 90,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "CD_EAN_PRODUTO",
                                    caption: "Código Barras",
                                    width: 90,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "CD_NCM",
                                    caption: "NCM",
                                    width: 80,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "CD_INTERNO_PRODUTO_FORNECEDOR",
                                    caption: "Cód. Interno Fornec",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "CD_FORNECEDOR",
                                    caption: "Fornecedor",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "DS_RAZAO_SOCIAL_FORNECEDOR",
                                    caption: "Razão Social Fornecedor",
                                    //width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'left',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "DS_FANTASIA_FORNECEDOR",
                                    caption: "Fantasia Fornecedor",
                                    //width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'left',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "VL_CUSTO_SEM_IMPOSTOS",
                                    caption: "Custo Sem Impostos",
                                    width: 90,
                                    dataType: 'number',
                                    format: "###,###,###,##0.00###",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "VL_CUSTO_TOTAL",
                                    caption: "Custo Com Impostos",
                                    width: 90,
                                    dataType: 'number',
                                    format: "###,###,###,##0.00###",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "PC_IPI",
                                    caption: "% IPI Custo",
                                    width: 90,
                                    dataType: 'number',
                                    format: "###,###,###,##0.#####'%'",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "PC_SUBSTITUICAO",
                                    caption: "% ST Custo",
                                    width: 90,
                                    dataType: 'number',
                                    format: "###,###,###,##0.#####'%'",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "PC_FRETE_COMPRA",
                                    caption: "% Frete Compra",
                                    width: 90,
                                    dataType: 'number',
                                    format: "###,###,###,##0.#####'%'",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "VL_FRETE_COMPRA",
                                    caption: "Frete Compra",
                                    width: 90,
                                    dataType: 'number',
                                    format: "###,###,###,##0.00###",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "PC_LUCRO",
                                    caption: "% Lucro Produto",
                                    width: 90,
                                    dataType: 'number',
                                    format: "###,###,###,##0.#####'%'",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "PC_RENTABILIDADE",
                                    caption: "% Rentab. Produto",
                                    width: 90,
                                    dataType: 'number',
                                    format: "###,###,###,##0.#####'%'",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                            ],
                            toolbar: {
                                items: [
                                    {
                                        location: 'after',
                                        widget: 'dxButton',
                                        options: {
                                            type: 'success',
                                            text: 'Adicionar Produtos',
                                            hint: "Adicionar produtos selecionados",
                                            width: 150,
                                            icon: 'plus',
                                            onClick(e) {

                                            },

                                        },
                                    },
                                    'groupPanel',
                                    'columnChooserButton',
                                    'searchPanel',
                                ],
                            },
                            showBorders: true,
                            onShowing: async (e) => {
                                e.component._$wrapper.css('z-index', 1101);
                                await this.fnPromise;
                                /*e.component.repaint();*/
                            },
                            onCellPrepared: function (e) {
                                if (e.rowType === "data") {
                                    if (e.column.dataField === "DS_STATUS") {
                                        if (e.value === "Inativo") {
                                            e.cellElement.css("color", "#d00000");
                                            e.cellElement.css("font-weight", "bold");
                                        };
                                    }
                                    if (e.column.dataField === "PC_RENTABILIDADE_TABELA") {
                                        if (e.value < 0) {
                                            e.cellElement.css("color", "#d00000");
                                            e.cellElement.css("font-weight", "bold");
                                        };
                                    }
                                    if (e.column.dataField === "VL_PRECO_TABELA") {
                                        e.cellElement.css("font-weight", "bold");
                                    }
                                    if (e.column.dataField === "LG_FORA_LINHA") {
                                        e.cellElement.css("background-color", e.data.DS_COLOR_FORA_LINHA);
                                        e.cellElement.css("color", "white");
                                    }
                                };
                                if (e.rowType === "group") {
                                    e.cellElement.css("color", "#f05b41");
                                    e.cellElement.css("background-color", "white");
                                };
                            },
                            paging: { enabled: true, pageSize: 10 },
                            scrolling: { mode: 'virtual' },
                            height: '100%',
                            onSelectionChanged(selectedItems) {
                                listProdutosECommerceSelecionadosHabilitar = selectedItems.selectedRowKeys;
                                gridBoxProdutosECommerceNaoHabilitadosTabelaPreco.option("value", listProdutosECommerceSelecionadosHabilitar.map((obj) => obj.Cd_Produto))

                            },
                            stateStoring: AutoLoad("gridBoxProdutosECommerceNaoHabilitadosTabelaPreco", false),
                            onToolbarPreparing: AutoResetState([]),
                        });
                        dataGrid = $dataGrid.dxDataGrid('instance');

                        return $dataGrid;
                    },
                }).dxDropDownBox('instance');

                loadPanelTabelaPrecosProdutos.hide();
                tabelaPrecoProdutosECommerceCarregados = true;

            }
            else {
                loadPanelTabelaPrecosProdutos.hide();

                DevExpress.ui.notify({
                    message: `${result.name}: ${result.error}`,
                    type: 'error',
                    displayTime: 5000,
                });
                console.error(`${result.name}: ${result.error}`);
            }
        });

    }

}

function carregarClientesManutencaoTabelaPreco() {

    if (tabelaPrecoClientesCarregados == false) {

        $('#gridTabelasClientesAbaPrecos').slideUp();

        loadPanelTabelaPrecosClientes = $('#loadPanelTabelaPrecosClientes').dxLoadPanel({
            shadingColor: 'rgba(0,0,0,0.4)',
            message: 'Carregando Clientes',
            //position: { of: '#ModalIncluirEditarTabelaPrecos' },
            visible: false,
            showIndicator: true,
            showPane: true,
            shading: true,
            hideOnOutsideClick: false,
        }).dxLoadPanel('instance');

        loadPanelTabelaPrecosClientes2 = $('#loadPanelTabelaPrecosClientes2').dxLoadPanel({
            shadingColor: 'rgba(0,0,0,0.4)',
            message: 'Carregando Clientes',
            //position: { of: '#ModalIncluirEditarTabelaPrecos' },
            visible: false,
            showIndicator: true,
            showPane: true,
            shading: true,
            hideOnOutsideClick: false,
        }).dxLoadPanel('instance');

        loadPanelTabelaPrecosClientes.show();
        loadPanelTabelaPrecosClientes2.show();

        //Produtos de uma Determinada Tabelas de Preços
        GetAzureDataSource(84, '{ CD_TABELA_PRECO: ' + tabelaPreco + ', CD_STATUS_CLIENTE: "A" }', 180).then((result) => {

            if (result.success) {

                gridTabelasClientesAbaPrecos = $("#gridTabelasClientesAbaPrecos").dxDataGrid({
                    dataSource: result.data,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    showColumnLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    editing: {
                        mode: 'batch',
                        allowUpdating: false,
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
                        visible: true,
                        emptyPanelText: "Agrupar",
                    },
                    paging: { pageSize: 10 },
                    pager: {
                        visible: true,
                        allowedPageSizes: [10, 20, 50],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: true,
                        allowExportSelectedData: false
                    },
                    onExporting: function (e) {
                        var workbook = new ExcelJS.Workbook();
                        var worksheet = workbook.addWorksheet('Clientes');

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet: worksheet,
                            autoFilterEnabled: true
                        }).then(function () {
                            workbook.xlsx.writeBuffer().then(function (buffer) {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ClientesTabelaPreço_' + tabela + '.xlsx');
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
                    keyExpr: 'CD_CPF_CNPJ',
                    columns: [
                        {
                            type: "selection",
                            dataField: "CD_SELECAO",
                            width: 30,
                            value: false,
                            allowHiding: false,
                        },
                        {
                            dataField: "CD_CPF_CNPJ",
                            caption: "CPF/CNPJ",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: true,
                            allowHiding: false,
                        },
                        {
                            dataField: "DS_FANTASIA",
                            caption: "Cliente - Nome Fantasia",
                            //width: 200,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'left',
                            cssClass: "column-data-grid",
                            visible: true,
                            //groupIndex: 0,
                        },
                        {
                            dataField: "DS_CATEGORIA_CLIENTE",
                            caption: "Categoria",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: true,
                        },
                        {
                            dataField: "DS_CLIENTE_ATUACAO",
                            caption: "Atuação",
                            width: 110,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: true,
                        },
                        {
                            dataField: "DS_FORMA_PAGAMENTO",
                            caption: "Forma Pagamento",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: true,
                        },
                        {
                            dataField: "DT_VENCTO_TITULO_ABERTO",
                            caption: "Vencto. Título Aberto",
                            width: 90,
                            dataType: "date",
                            format: "dd/MM/yyyy",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: true,
                        },
                        {
                            dataField: "VL_TITULO_ABERTO",
                            caption: "Valor Título Aberto",
                            width: 80,
                            dataType: 'number',
                            format: "###,###,###,##0.00",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'right',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: true,
                        },
                        {
                            dataField: "DS_RAZAO_SOCIAL",
                            caption: "Cliente - Razão Social",
                            //width: 200,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'left',
                            cssClass: "column-data-grid",
                            visible: false,
                            //groupIndex: 0,
                        },
                        {
                            dataField: "CD_FILIAL_CADASTRO",
                            caption: "Filial Cadastro",
                            width: 90,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "DS_STATUS",
                            caption: "Status",
                            width: 75,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "DS_TIPO_CPF_CNPJ",
                            caption: "Tipo Pessoa",
                            width: 90,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "DT_CADASTRO",
                            caption: "Dt. Cadastro",
                            width: 90,
                            dataType: "date",
                            format: "dd/MM/yyyy",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "DT_ATUALIZACAO",
                            caption: "Dt. Atualização",
                            width: 90,
                            dataType: "date",
                            format: "dd/MM/yyyy",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "LG_POSSUI_TITULO_ABERTO",
                            caption: "Título Aberto",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: true,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "NR_LANCAMENTO_TITULO_ABERTO",
                            caption: "Número Título Aberto",
                            width: 80,
                            dataType: 'number',
                            format: "###########",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "NR_PARCELA_TITULO_ABERTO",
                            caption: "Parcela Título Aberto",
                            width: 80,
                            dataType: 'number',
                            format: "###########",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "LG_CONTROLA_LIMITE_CREDITO",
                            caption: "Controla Limite",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: true,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "VL_LIMITE_CREDITO",
                            caption: "Limite Crédito",
                            width: 80,
                            dataType: 'number',
                            format: "###,###,###,##0.00",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'right',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "VL_LIMITE_DISPONIVEL",
                            caption: "Saldo Limite",
                            width: 80,
                            dataType: 'number',
                            format: "###,###,###,##0.00",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'right',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE",
                            caption: "Saldo Conta Corrente",
                            width: 80,
                            dataType: 'number',
                            format: "###,###,###,##0.00",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'right',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "LG_CAPTACAO_ECOMMERCE",
                            caption: "Captado e-Commerce",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: true,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "LG_ORGAO_PUBLICO",
                            caption: "Orgão Público",
                            width: 90,
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: true,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE",
                            caption: "Fidelidade Cliente",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: true,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR",
                            caption: "Fidelidade Indicador",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: true,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE",
                            caption: "Fidelidade Bloqueado Cliente",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: true,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR",
                            caption: "Fidelidade Bloqueado Indicador",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: true,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                    ],

                    onCellPrepared: function (e) {
                        if (e.rowType === "data") {

                            if (e.column.allowEditing) {
                                e.cellElement.css("background-color", "#EDF3F8");
                            }

                            if (e.column.dataField === "DS_STATUS") {
                                if (e.value === "Inativo") {
                                    e.cellElement.css("color", "#d00000");
                                    e.cellElement.css("font-weight", "bold");
                                };
                            }

                            if (e.column.dataField === "VL_TITULO_ABERTO") {
                                if (e.value > 0) {
                                    e.cellElement.css("color", "#b23a48");
                                    e.cellElement.css("background-color", "#fae0e4");
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
                                location: 'after',
                                widget: 'dxButton',
                                locateInMenu: 'auto',
                                options: {
                                    icon: 'trash',
                                    text: 'Excluir Clientes',
                                    hint: 'Excluir clientes selecionados da tabela de preços',
                                    type: 'danger',
                                    visible: true,
                                    onClick() {
                                        
                                    },
                                },
                            },
                            {
                                name: "groupPanel",
                                locateInMenu: "auto",
                            },
                            'saveButton',
                            'revertButton',
                            'exportButton',
                            'columnChooserButton',
                            'searchPanel',
                        ],
                    },

                    stateStoring: AutoLoad("gridTabelasClientesAbaPrecos", false),
                    onToolbarPreparing: AutoResetState([]),

                    onInitialized(e) {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    e.component.updateDimensions();
                                }
                            });
                        }).observe(e.element[0]);
                    },
                });

                $('#gridTabelasClientesAbaPrecos').slideDown();
                loadPanelTabelaPrecosClientes2.hide();
            }
            else {
                loadPanelTabelaPrecosClientes2.hide();

                DevExpress.ui.notify({
                    message: `${result.name}: ${result.error}`,
                    type: 'error',
                    displayTime: 5000,
                });
                console.error(`${result.name}: ${result.error}`);
            }
        });

        GetAzureDataSource(85, '{ CD_TABELA_PRECO: ' + tabelaPreco + ', CD_STATUS_CLIENTE: "A" }', 180).then((result) => {

            if (result.success) {

                $('#panelTabelaPrecosClientesAbaPreco').slideDown();

                gridBoxClientesNaoHabilitadosTabelaPreco = $('#gridBoxClientesNaoHabilitadosTabelaPreco').dxDropDownBox({
                    valueExpr: 'CD_CPF_CNPJ',
                    displayExpr: 'CD_CPF_CNPJ',
                    labelMode: 'floating',
                    label: '',
                    placeholder: '+ Clique para adicionar clientes na tabela',
                    elementAttr: {
                        class: 'gridbox-font',
                    },
                    showClearButton: true,
                    dataSource: new DevExpress.data.CustomStore({
                        loadMode: "raw",
                        key: ['CD_CPF_CNPJ'],
                        load: function () {
                            return result.data;
                        }
                    }),
                    dropDownOptions: {
                        //closeOnOutsideClick: true,
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
                        //onShowing: async function (e) {
                        //    e.component._$wrapper.css('z-index', 998);
                        //    await this.fnPromise;
                        //    e.component.repaint();
                        //},
                        onShowing: async (e) => {
                            e.component._$wrapper.css('z-index', 1102);
                            await this.fnPromise;
                            /*e.component.repaint();*/
                        },
                        //onOptionChanged: function (e) {
                        //    if (e.name != 'visible') return;
                        //    if (!e.value) return;
                        //    const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardMovimentacao')[0].getBoundingClientRect().top;
                        //    this.fnPromise = $('#cardMovimentacao').animate({ top: diffTop }, {
                        //        complete: () => e.component.refreshPosition(),
                        //    }).promise();
                        //},
                        onOptionChanged: function (e) {
                            if (e.name != "visible") return;
                            if (!e.value) return;
                            $("#formCadastroTabelaPreco").hide();
                            this.fnPromise = $('#panelTabelaPrecosDadosAbaPreco').animate({ top: 0 }, {
                                complete: () => {
                                    e.component.refreshPosition();
                                    //gridBoxClientesNaoHabilitadosTabelaPreco.refresh();
                                },
                            }).promise();
                        },
                        onHiding: function (e) {
                            $("#formCadastroTabelaPreco").show();
                        },

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
                                allowUpdating: false,
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
                                    dataField: "CD_SELECAO",
                                    width: 30,
                                    value: false,
                                    allowHiding: false,
                                },
                                {
                                    dataField: "CD_CPF_CNPJ",
                                    caption: "CPF/CNPJ",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: true,
                                    allowHiding: false,
                                },
                                {
                                    dataField: "DS_FANTASIA",
                                    caption: "Cliente - Nome Fantasia",
                                    //width: 200,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'left',
                                    cssClass: "column-data-grid",
                                    visible: true,
                                    //groupIndex: 0,
                                },
                                {
                                    dataField: "DS_CATEGORIA_CLIENTE",
                                    caption: "Categoria",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: true,
                                },
                                {
                                    dataField: "DS_CLIENTE_ATUACAO",
                                    caption: "Atuação",
                                    width: 110,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: true,
                                },
                                {
                                    dataField: "DS_FORMA_PAGAMENTO",
                                    caption: "Forma Pagamento",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: true,
                                },
                                {
                                    dataField: "DT_VENCTO_TITULO_ABERTO",
                                    caption: "Vencto. Título Aberto",
                                    width: 90,
                                    dataType: "date",
                                    format: "dd/MM/yyyy",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: true,
                                },
                                {
                                    dataField: "VL_TITULO_ABERTO",
                                    caption: "Valor Título Aberto",
                                    width: 80,
                                    dataType: 'number',
                                    format: "###,###,###,##0.00",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: true,
                                },
                                {
                                    dataField: "DS_RAZAO_SOCIAL",
                                    caption: "Cliente - Razão Social",
                                    //width: 200,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'left',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                    //groupIndex: 0,
                                },
                                {
                                    dataField: "CD_FILIAL_CADASTRO",
                                    caption: "Filial Cadastro",
                                    width: 90,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "DS_STATUS",
                                    caption: "Status",
                                    width: 75,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "DS_TIPO_CPF_CNPJ",
                                    caption: "Tipo Pessoa",
                                    width: 90,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "DT_CADASTRO",
                                    caption: "Dt. Cadastro",
                                    width: 90,
                                    dataType: "date",
                                    format: "dd/MM/yyyy",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "DT_ATUALIZACAO",
                                    caption: "Dt. Atualização",
                                    width: 90,
                                    dataType: "date",
                                    format: "dd/MM/yyyy",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "LG_POSSUI_TITULO_ABERTO",
                                    caption: "Título Aberto",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: true,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "NR_LANCAMENTO_TITULO_ABERTO",
                                    caption: "Número Título Aberto",
                                    width: 80,
                                    dataType: 'number',
                                    format: "###########",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "NR_PARCELA_TITULO_ABERTO",
                                    caption: "Parcela Título Aberto",
                                    width: 80,
                                    dataType: 'number',
                                    format: "###########",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "LG_CONTROLA_LIMITE_CREDITO",
                                    caption: "Controla Limite",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: true,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "VL_LIMITE_CREDITO",
                                    caption: "Limite Crédito",
                                    width: 80,
                                    dataType: 'number',
                                    format: "###,###,###,##0.00",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "VL_LIMITE_DISPONIVEL",
                                    caption: "Saldo Limite",
                                    width: 80,
                                    dataType: 'number',
                                    format: "###,###,###,##0.00",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE",
                                    caption: "Saldo Conta Corrente",
                                    width: 80,
                                    dataType: 'number',
                                    format: "###,###,###,##0.00",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "LG_CAPTACAO_ECOMMERCE",
                                    caption: "Captado e-Commerce",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: true,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "LG_ORGAO_PUBLICO",
                                    caption: "Orgão Público",
                                    width: 90,
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: true,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE",
                                    caption: "Fidelidade Cliente",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: true,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR",
                                    caption: "Fidelidade Indicador",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: true,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE",
                                    caption: "Fidelidade Bloqueado Cliente",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: true,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR",
                                    caption: "Fidelidade Bloqueado Indicador",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: true,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
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
                                            icon: 'plus',
                                            onClick(e) {

                                            },

                                        },
                                    },
                                    'groupPanel',
                                    'columnChooserButton',
                                    'searchPanel',
                                ],
                            },
                            showBorders: true,
                            onShowing: async (e) => {
                                e.component._$wrapper.css('z-index', 1101);
                                await this.fnPromise;
                                /*e.component.repaint();*/
                            },
                            onCellPrepared: function (e) {
                                if (e.rowType === "data") {

                                    if (e.column.allowEditing) {
                                        e.cellElement.css("background-color", "#EDF3F8");
                                    }

                                    if (e.column.dataField === "DS_STATUS") {
                                        if (e.value === "Inativo") {
                                            e.cellElement.css("color", "#d00000");
                                            e.cellElement.css("font-weight", "bold");
                                        };
                                    }

                                    if (e.column.dataField === "VL_TITULO_ABERTO") {
                                        if (e.value > 0) {
                                            e.cellElement.css("color", "#b23a48");
                                            e.cellElement.css("background-color", "#fae0e4");
                                        };
                                    }
                                };

                                if (e.rowType === "group") {
                                    e.cellElement.css("color", "#f05b41");
                                    e.cellElement.css("background-color", "white");
                                };
                            },
                            paging: { enabled: true, pageSize: 10 },
                            scrolling: { mode: 'virtual' },
                            height: '100%',
                            onSelectionChanged(selectedItems) {
                                listClientesSelecionadosHabilitar = selectedItems.selectedRowKeys;
                                gridBoxClientesNaoHabilitadosTabelaPreco.option("value", listClientesSelecionadosHabilitar.map((obj) => obj.Cd_Produto))

                            },
                            stateStoring: AutoLoad("gridBoxClientesNaoHabilitadosTabelaPreco", false),
                            onToolbarPreparing: AutoResetState([]),
                        });
                        dataGrid = $dataGrid.dxDataGrid('instance');

                        return $dataGrid;
                    },
                }).dxDropDownBox('instance');

                loadPanelTabelaPrecosClientes.hide();
                tabelaPrecoClientesCarregados = true;

            }
            else {
                loadPanelTabelaPrecosClientes.hide();

                DevExpress.ui.notify({
                    message: `${result.name}: ${result.error}`,
                    type: 'error',
                    displayTime: 5000,
                });
                console.error(`${result.name}: ${result.error}`);
            }
        });


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

function rolarTopo() {
    window.scrollTo(0, 0);
};

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


//#endregion

$(() => {

    FormatButtons();

    //Consulta de Produtos Simplificada
    GetAzureDataSource(29).then((result) => {

        if (result.success) {

            $('#lkp_Filtro_Pesquisa_Produtos').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_PRODUTO_PESQUISA'],
                displayExpr: 'DS_PRODUTO_PESQUISA',
                valueExpr: 'CD_PRODUTO',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Filtro de Produtos',
                },
                //labelMode: 'floating',
                //label: 'Selecione um Produto para edição',
                placeholder: 'Selecione um Produto para edição',
                showClearButton: true,
            });
        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Consulta de Produtos Detalhada (Grid de Consulta Geral Detalhada)
    //SÓ CARREGAR SE O USUÁRIO CLICAR EM "CONSULTA DETALHADA" PARA ABRIR O GRID GERAL DE CONSULTA DE PRODUTOS
    //*** NO PRIMEIRO CARREGAMENTO DO GRID O STATUS É SEMPRE ATIVO. DEPOIS O USUÁRIO PODE MUDAR O STATUS NO COMBO DO TOOLBAR E RECARREGAR A TELA ***
    GetAzureDataSource(16, '{CD_STATUS: "A"}').then((result) => {

        if (result.success) {

            $("#gridConsultaProdutos").dxDataGrid({
                dataSource: result.data,
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
                    mode: 'single',
                },
                focusedRowEnabled: true,
                allowColumnResizing: true,
                //columnResizingMode: "widget",
                allowColumnReordering: true,
                groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
                paging: { pageSize: 15 },
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
                    var worksheet = workbook.addWorksheet('Produtos');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ConsultaGeralProdutos.xlsx');
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
                //cellHintEnabled: true,
                keyExpr: 'CD_PRODUTO',
                columns: [
                    {
                        dataField: "LG_FORA_LINHA",
                        caption: "Fora Linha",
                        width: 40,
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                    }, {
                        dataField: "CD_PRODUTO",
                        caption: "Código Interno",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    }, {
                        dataField: "DS_PRODUTO",
                        caption: "Descrição Produto",
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        cssClass: "column-data-grid",
                    }, {
                        dataField: "DS_STATUS",
                        caption: "Status",
                        width: 75,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "VL_PRECO_MINIMO_VENDA",
                        caption: "Vl. Preço Venda",
                        width: 75,
                        dataType: "number",
                        format: "###,###,###,##0.00",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_FABRICANTE",
                        caption: "Código do Fabricante",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "DS_MARCA",
                        caption: "Marca",
                        width: 100,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    }, {
                        dataField: "CD_FORNECEDOR",
                        caption: "Código Fornecedor",
                        //width: 100,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        alignment: 'center',
                        visible: false,
                        cssClass: "column-data-grid",
                    }, {
                        dataField: "DS_RAZAO_SOCIAL",
                        caption: "Fornecedor Padrão (Razão Social)",
                        width: 220,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: true,
                        cssClass: "column-data-grid",
                    }, {
                        dataField: "DS_FANTASIA_FORNECEDOR",
                        caption: "Fornecedor Padrão (Fantasia)",
                        width: 220,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_CURVA_ABC",
                        caption: "A B C",
                        width: 55,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    }, {
                        dataField: "DS_FAMILIA",
                        caption: "Família",
                        width: 150,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: true,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_ORIGINAL",
                        caption: "Código Original",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    }, {
                        dataField: "CD_OPCIONAL",
                        caption: "Código Opcional",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    }, {
                        dataField: "CD_EAN_PRODUTO",
                        caption: "Código Barras",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_INTERNO_PRODUTO_FORNECEDOR",
                        caption: "Código Interno Fornecedor",
                        width: 100,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_NCM",
                        caption: "NCM",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    }, {
                        dataField: "CD_CEST",
                        caption: "CEST",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "DT_ULTIMA_COMPRA",
                        caption: "Dt. Última Compra",
                        width: 90,
                        dataType: "date",
                        format: "dd/MM/yyyy",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "VL_ULTIMA_COMPRA",
                        caption: "Vl. Última Compra",
                        width: 75,
                        dataType: "number",
                        format: "###,###,###,##0.00",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        cssClass: "column-data-grid",
                    },

                    {
                        dataField: "VL_CUSTO_BRUTO",
                        caption: "Vl. Custo Bruto",
                        width: 75,
                        dataType: "number",
                        format: "###,###,###,##0.00",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "PC_DESCONTO_FORNECEDOR_TOTAL",
                        caption: "% Desc. Fornecedor",
                        width: 75,
                        dataType: "number",
                        format: "###,###,###,##0.00",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "VL_CUSTO_LIQUIDO",
                        caption: "Vl. Custo Líquido",
                        width: 75,
                        dataType: "number",
                        format: "###,###,###,##0.00",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "PC_IPI_CUSTO",
                        caption: "% Custo IPI",
                        width: 75,
                        dataType: "number",
                        format: "###,###,###,##0.00",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "PC_IVA",
                        caption: "% Custo ST",
                        width: 75,
                        dataType: "number",
                        format: "###,###,###,##0.00",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "PC_FRETE_COMPRA",
                        caption: "% Custo Frete",
                        width: 75,
                        dataType: "number",
                        format: "###,###,###,##0.00",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "VL_FRETE_COMPRA",
                        caption: "Vl. Custo Frete",
                        width: 75,
                        dataType: "number",
                        format: "###,###,###,##0.00",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "PC_DESPESAS_DIVERSAS",
                        caption: "% Despesas Gerais",
                        width: 75,
                        dataType: "number",
                        format: "###,###,###,##0.00",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "VL_CUSTO_TOTAL",
                        caption: "Vl. Custo Total",
                        width: 75,
                        dataType: "number",
                        format: "###,###,###,##0.00",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "PC_LUCRO",
                        caption: "% Lucro",
                        width: 75,
                        dataType: "number",
                        format: "###,###,###,##0.00",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "PC_LUCRO_REFERENCIA",
                        caption: "% Lucro Referência",
                        width: 75,
                        dataType: "number",
                        format: "###,###,###,##0.00",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "PC_MARKUP",
                        caption: "% Rentab.",
                        width: 75,
                        dataType: "number",
                        format: "###,###,###,##0.00",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "PC_DESCONTO_MAXIMO",
                        caption: "% Desc. Máximo",
                        width: 75,
                        dataType: "number",
                        format: "###,###,###,##0.00",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "DT_VIGENCIA",
                        caption: "Vigência Preço",
                        width: 90,
                        dataType: "date",
                        format: "dd/MM/yyyy",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "QT_EMBALAGEM_VENDA",
                        caption: "Qt. Embalagem",
                        width: 75,
                        dataType: "number",
                        format: "###,###,###,##0.###",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "QT_MULTIPLO_VENDA",
                        caption: "Qt. Múltiplo Venda",
                        width: 75,
                        dataType: "number",
                        format: "###,###,###,##0.###",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "LG_SOMENTE_MULTIPLO",
                        caption: "Venda Somente em Múltiplo",
                        width: 95,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_SITUACAO_TRIBUTARIA",
                        caption: "CST Código Interno",
                        width: 95,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_SITUACAO_TRIBUTARIA_NFE",
                        caption: "CST",
                        width: 75,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_SITUACAO_TRIBUTARIA_NFE_SIMPLES",
                        caption: "CST Simples",
                        width: 95,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
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
                        if (e.column.dataField === "LG_FORA_LINHA") {
                            e.cellElement.css("background-color", e.data.DS_COLOR_FORA_LINHA);
                            e.cellElement.css("color", "white");
                        }
                    }
                },

                onCellClick: function (e) {
                    if (e.rowType === "data") {
                        //Verifica se a consulta está expandida eu se está reduzida na lateral.
                        //Caso esteja na lateral, os dados serão carregados sem fechar a tela de consulta
                        if (document.getElementById("principalClientes").style.display === 'none') {
                            closeConsultaClientesPanel();
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
                                value: 'A',
                                hint: 'Filtro de Produtos por Status',
                                width: 80,
                                elementAttr: {
                                    //class: 'filtro_titulos_parcial',
                                    class: 'filtro-consultal-detalhada',
                                },

                                dropDownOptions: {
                                    closeOnOutsideClick: true,
                                    showTitle: false,
                                    title: 'Filtro por Status',
                                },
                                //labelMode: 'floating',
                                //label: 'Filtro por Situação',
                                placeholder: 'Filtro',
                                showClearButton: false,
                                onValueChanged(e) {
                                    if (e.value == 'I') {
                                        e.component.option('elementAttr', { class: 'filtro-consultal-detalhada-inativos' });
                                    } else {
                                        //e.component.option('elementAttr', {class: 'filtro_titulos_parcial'});
                                        e.component.option('elementAttr', { class: 'filtro-consultal-detalhada' });
                                    };
                                },
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            options: {
                                icon: 'refresh',
                                hint: 'Atualiza lista de Produtos',
                                onClick() {
                                    const dataGrid = $("#gridConsultaProdutos").dxDataGrid('instance');
                                    dataGrid.refresh();
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
                                    const dataGrid = $("#gridConsultaProdutos").dxDataGrid('instance');

                                    const expanding = e.component.option('text') === 'Expandir Agrupamento';
                                    dataGrid.option('grouping.autoExpandAll', expanding);
                                    e.component.option('text', expanding ? 'Fechar Agrupamento' : 'Expandir Agrupamento');
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

                onInitialized(e) {
                    new IntersectionObserver(entries => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                e.component.updateDimensions();
                            }
                        });
                    }).observe(e.element[0]);
                },

            });

        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });


    //DADOS FISCAIS, REGRAS COMERCIAIS, HISTÓRICO E TABELA DE PREÇOS - ABA PREÇO - NOVO PROTÓTIPO
    $('#nbx_Cd_NCM_Aba_Preco').dxNumberBox({
        value: '',
        format: '00000000',
        min: 0,
        max: 99999999,
        showClearButton: true,
        showSpinButtons: false,
        step: 1,
        placeholder: 'Código NCM',
        labelMode: 'floating',
        label: 'Código NCM',
    });

    $('#nbx_Cd_CEST_Aba_Preco').dxNumberBox({
        value: '',
        format: '0000000',
        min: 0,
        max: 9999999,
        showClearButton: true,
        showSpinButtons: false,
        step: 1,
        placeholder: 'CEST',
        labelMode: 'floating',
        label: 'Código CEST',
    });

    $('#txt_Nr_FCI_Aba_Preco').dxTextBox({
        labelMode: 'floating',
        label: 'Código FCI - Ficha de Conteúdo de Importação',
        maxLength: 40,
    });

    $('#nbx_Pc_PIS').dxNumberBox({
        value: '',
        format: "###,##0.## '%'",
        min: 0,
        max: 999999,
        showClearButton: true,
        showSpinButtons: false,
        step: 10,
        placeholder: '% PIS',
        labelMode: 'floating',
        label: 'PIS',
    });

    $('#nbx_Pc_COFINS').dxNumberBox({
        value: '',
        format: "###,##0.## '%'",
        min: 0,
        max: 999999,
        showClearButton: true,
        showSpinButtons: false,
        step: 10,
        placeholder: '% COFINS',
        labelMode: 'floating',
        label: 'COFINS',
    });

    $('#nbx_Pc_PIS_Aba_Preco').dxNumberBox({
        value: '',
        format: "###,##0.## '%'",
        min: 0,
        max: 999999,
        showClearButton: true,
        showSpinButtons: false,
        step: 10,
        placeholder: '% PIS',
        labelMode: 'floating',
        label: 'PIS',
    });

    $('#nbx_Pc_COFINS_Aba_Preco').dxNumberBox({
        value: '',
        format: "###,##0.## '%'",
        min: 0,
        max: 999999,
        showClearButton: true,
        showSpinButtons: false,
        step: 10,
        placeholder: '% COFINS',
        labelMode: 'floating',
        label: 'COFINS',
    });

    $('#txt_Cd_Beneficio_Fiscal_Aba_Preco').dxTextBox({
        labelMode: 'floating',
        label: 'Código Benefício Fiscal',
        maxLength: 20,
    });

    $('#nbx_Pc_Carga_Tributaria_Aba_Preco').dxNumberBox({
        value: '',
        format: "###,##0.## '%'",
        min: 0,
        max: 999999,
        showClearButton: true,
        showSpinButtons: false,
        step: 10,
        placeholder: '% Carga Tributária',
        labelMode: 'floating',
        label: 'Carga Tributária',
    });

    $('#txt_Fonte_Carga_Tributaria_Aba_Preco').dxTextBox({
        labelMode: 'floating',
        label: 'Fonte Carga Tributaria',
        maxLength: 20,
    });

    $('#nbx_Pc_Desconto_Maximo_Aba_Preco').dxNumberBox({
        value: '',
        format: "###,##0.## '%'",
        min: 0,
        max: 999999,
        showClearButton: true,
        showSpinButtons: false,
        step: 10,
        placeholder: '% Desconto Máximo',
        labelMode: 'floating',
        label: 'Desconto Máximo',
    });

    $('#nbx_Pc_Comissao_Venda_Aba_Preco').dxNumberBox({
        value: '',
        format: "###,##0.## '%'",
        min: 0,
        max: 999999,
        showClearButton: true,
        showSpinButtons: false,
        step: 10,
        placeholder: '% Comissão Venda',
        labelMode: 'floating',
        label: 'Comissão Venda',
    });

    $('#nbx_Pc_Comissao_Fretista_Aba_Preco').dxNumberBox({
        value: '',
        format: "###,##0.## '%'",
        min: 0,
        max: 999999,
        showClearButton: true,
        showSpinButtons: false,
        step: 10,
        placeholder: '% Comissão Fretista',
        labelMode: 'floating',
        label: 'Comissão Fretista',
    });

    $('#nbx_Qt_Multiplo_Venda_Aba_Preco').dxNumberBox({
        value: '',
        format: "###,##0.#####",
        min: 0,
        max: 999999,
        showClearButton: true,
        showSpinButtons: false,
        step: 1,
        placeholder: 'Múltiplo de Venda',
        labelMode: 'floating',
        label: 'Múltiplo de Venda',
    });

    $('#nbx_Qt_Embalagem_Aba_Preco').dxNumberBox({
        value: '',
        format: "###,##0.####",
        min: 0,
        max: 999999,
        showClearButton: true,
        showSpinButtons: false,
        step: 1,
        placeholder: 'Qtde. Embalagem',
        labelMode: 'floating',
        label: 'Qtde. Embalagem',
    });

    $('#chk_Lg_Somente_Vendido_Multiplos_Aba_Preco').dxCheckBox({
        value: false,
        text: "Este produto deve ser vendido somente em múltiplos",

        onValueChanged: function (e) {

            if (e.value == true) {
                $('#panelCalcularVolumes').slideDown();
            } else {
                $('#panelCalcularVolumes').slideUp();
                $('#chk_Lg_Calcular_Volumes_Venda_Expedicao_Aba_Preco').dxCheckBox('instance').option('value', false);
            };
        },
    });

    $('#chk_Lg_Calcular_Volumes_Venda_Expedicao_Aba_Preco').dxCheckBox({
        value: false,
        text: "Calcular quantidade de volumes baseado no múltiplo para exibir no pedido e romaneio",
    });

    $('#chk_Lg_Aceita_Vendas_Estoque_Negativo_Aba_Preco').dxCheckBox({
        value: false,
        text: "Este produto pode ser vendido com estoque negativo",
    });

    $('#nbx_Pc_Diferenca_Tabela_Preco_Aba_Preco').dxNumberBox({
        value: '',
        format: "###,###,##0.######################'%'",
        min: -999999,
        max: 999999,
        showClearButton: false,
        showSpinButtons: false,
        step: 10,
        placeholder: '% Desc(-) ou Acrésc(+)',
        labelMode: 'floating',
        label: '% Desc(-) ou Acrésc(+)',
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-weight": "bold",
            });
        },
    });

    $('#nbx_Pc_Lucro_Tabela_Preco_Aba_Preco').dxNumberBox({
        value: '',
        format: "###,###,##0.######################'%'",
        min: -999999,
        max: 999999,
        showClearButton: false,
        showSpinButtons: false,
        step: 10,
        placeholder: '% Lucro',
        labelMode: 'floating',
        label: '% Lucro',
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-weight": "bold",
            });
        },
    });

    $('#nbx_Pc_Rentabilidade_Tabela_Preco_Aba_Preco').dxNumberBox({
        value: '',
        format: "###,###,##0.######################'%'",
        min: -999999,
        max: 999999,
        showClearButton: false,
        showSpinButtons: false,
        step: 10,
        placeholder: '% Rentabilidade',
        labelMode: 'floating',
        label: '% Rentabilidae',
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-weight": "bold",
            });
        },
    });

    $('#nbx_Vl_Preco_Venda_Tabela_Preco_Aba_Preco').dxNumberBox({
        value: '',
        format: "R$ ###,###,##0.00###",
        min: 0,
        max: 999999,
        showClearButton: false,
        showSpinButtons: false,
        step: 10,
        placeholder: 'Preço de Venda',
        labelMode: 'floating',
        label: 'Preço de Venda',
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                "color": "#0077b6",
            });
        },

    });


    $('#nbx_Pc_Diferenca_Tabela_Preco_2_Aba_Preco').dxNumberBox({
        value: '',
        format: "###,###,##0.######################'%'",
        min: -999999,
        max: 999999,
        showClearButton: false,
        showSpinButtons: false,
        step: 10,
        placeholder: '% Desc(-) ou Acrésc(+)',
        labelMode: 'floating',
        label: '% Desc(-) ou Acrésc(+)',
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-weight": "bold",
            });
        },
    });

    $('#nbx_Pc_Lucro_Tabela_Preco_2_Aba_Preco').dxNumberBox({
        value: '',
        format: "###,###,##0.######################'%'",
        min: -999999,
        max: 999999,
        showClearButton: false,
        showSpinButtons: false,
        step: 10,
        placeholder: '% Lucro',
        labelMode: 'floating',
        label: '% Lucro',
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-weight": "bold",
            });
        },
    });

    $('#nbx_Pc_Rentabilidade_Tabela_Preco_2_Aba_Preco').dxNumberBox({
        value: '',
        format: "###,###,##0.######################'%'",
        min: -999999,
        max: 999999,
        showClearButton: false,
        showSpinButtons: false,
        step: 10,
        placeholder: '% Rentabilidade',
        labelMode: 'floating',
        label: '% Rentabilidae',
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-weight": "bold",
            });
        },
    });

    $('#nbx_Vl_Preco_Venda_Tabela_Preco_2_Aba_Preco').dxNumberBox({
        value: '',
        format: "R$ ###,###,##0.00###",
        min: 0,
        max: 999999,
        showClearButton: false,
        showSpinButtons: false,
        step: 10,
        placeholder: 'Preço de Venda',
        labelMode: 'floating',
        label: 'Preço de Venda',
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                "color": "#0077b6",
            });
        },

    });


    $('#nbx_Pc_Diferenca_Tabela_Preco_3_Aba_Preco').dxNumberBox({
        value: '',
        format: "###,###,##0.######################'%'",
        min: -999999,
        max: 999999,
        showClearButton: false,
        showSpinButtons: false,
        step: 10,
        placeholder: '% Desc(-) ou Acrésc(+)',
        labelMode: 'floating',
        label: '% Desc(-) ou Acrésc(+)',
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-weight": "bold",
            });
        },
    });

    $('#nbx_Pc_Lucro_Tabela_Preco_3_Aba_Preco').dxNumberBox({
        value: '',
        format: "###,###,##0.######################'%'",
        min: -999999,
        max: 999999,
        showClearButton: false,
        showSpinButtons: false,
        step: 10,
        placeholder: '% Lucro',
        labelMode: 'floating',
        label: '% Lucro',
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-weight": "bold",
            });
        },
    });

    $('#nbx_Pc_Rentabilidade_Tabela_Preco_3_Aba_Preco').dxNumberBox({
        value: '',
        format: "###,###,##0.######################'%'",
        min: -999999,
        max: 999999,
        showClearButton: false,
        showSpinButtons: false,
        step: 10,
        placeholder: '% Rentabilidade',
        labelMode: 'floating',
        label: '% Rentabilidae',
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-weight": "bold",
            });
        },
    });

    $('#nbx_Vl_Preco_Venda_Tabela_Preco_3_Aba_Preco').dxNumberBox({
        value: '',
        format: "R$ ###,###,##0.00###",
        min: 0,
        max: 999999,
        showClearButton: false,
        showSpinButtons: false,
        step: 10,
        placeholder: 'Preço de Venda',
        labelMode: 'floating',
        label: 'Preço de Venda',
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                "color": "#0077b6",
            });
        },

    });

    //Consulta de Histórico de Preços
    //*** CARREGAMENTO DEVE SER FEITO APENAS SE O USUÁRIO CLICAR NO BOTÃO "HISTÓRICO DE PREÇOS" DA ABA "PRECIFICAÇÃO E DADOS FISCAIS" E O PRODUTO CONSULTADO DEVE SER INFORMADO COMO PARÂMETRO. ***
    //*** A FILIAL É OPCIONAL, SE NÃO INFORMADA É UTILIZADA A MATRIZ ***
    GetAzureDataSource(79, '{ CD_PRODUTO: "1495550" }').then((result) => {

        if (result.success) {
            const gridHistoricoPrecos = $("#gridHistoricoPrecos").dxDataGrid({
                dataSource: result.data,
                hoverStateEnabled: true,
                showBorders: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                wordWrapEnabled: true,
                columnHidingEnabled: true,
                columnsAutoWidth: true,
                allowColumnResizing: true,
                allowColumnReordering: true,
                focusedRowEnabled: true,

                selection: {
                    mode: 'single',
                },

                editing: {
                    //mode: 'normal',
                    allowUpdating: false,
                    //startEditAction: 'dblClick',
                    allowAdding: false,
                    allowDeleting: true,
                    useIcons: true,
                },

                searchPanel: {
                    visible: true,
                    highlightCaseSensitive: false,
                    highlightSearchText: true,
                    placeholder: "Procurar...",
                },
                sorting: { mode: "multiple" },
                groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
                paging: { pageSize: 15 },
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
                    var worksheet = workbook.addWorksheet('Preços');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'HistoricoPreços.xlsx');
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
                keyExpr: 'DT_VIGENCIA',
                columns: [
                    {
                        dataField: "DT_VIGENCIA",
                        caption: "Vigência",
                        width: 82,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                        visible: true,
                        alignment: "center",
                        dataType: "date",
                        format: "dd/MM/yyyy",
                        allowHiding: false,
                    },
                    {
                        dataField: "VL_PRECO_COMPRA",
                        caption: "Preço de Compra",
                        width: 60,
                        dataType: "number",
                        format: "###,###,###,###,##0.00",
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "VL_CUSTO_TOTAL",
                        caption: "Custo Total",
                        width: 60,
                        dataType: "number",
                        format: "###,###,###,###,##0.00###",
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "VL_PRECO_MINIMO_VENDA",
                        caption: "Preço Venda",
                        width: 60,
                        dataType: "number",
                        format: "###,###,###,###,##0.00###",
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "PC_MARKUP",
                        caption: "% Rentab.",
                        width: 60,
                        dataType: "number",
                        format: "###,###,###,###,##0.00'%'",
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: true,
                    },
                    {
                        dataField: "PC_LUCRO",
                        caption: "% Lucro",
                        width: 60,
                        dataType: "number",
                        format: "###,###,###,###,##0.00'%'",
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: true,
                    },
                    {
                        dataField: "VL_CUSTO_BRUTO",
                        caption: "Custo Bruto",
                        width: 60,
                        dataType: "number",
                        format: "###,###,###,###,##0.00###",
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                        visible: true,
                    },
                    {
                        dataField: "DT_ATUALIZACAO",
                        caption: "Atualização",
                        //width: 100,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                        visible: true,
                        alignment: "center",
                        dataType: "date",
                        format: "dd/MM/yyyy HH:mm",
                        visible: true,
                    },
                    {
                        dataField: "CD_LOGIN",
                        caption: "Login",
                        //width: 70,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                        alignment: "center",
                        visible: true,
                    },
                    {
                        type: "buttons",
                        width: 30,
                        //cssClass: "column-data-grid",
                    },

                ],

                onCellPrepared: function (e) {
                    if (e.rowType === "data") {
                        if ((e.column.dataField === "PC_MARKUP" && e.data.PC_MARKUP < 0) || (e.column.dataField === "PC_LUCRO" && e.data.PC_LUCRO < 0)) {
                            //e.cellElement.css("background-color", '#f26419');
                            e.cellElement.css("color", '#d00000');
                            e.cellElement.css("font-weight", 'bold');
                        }
                    }

                    if (e.column.dataField) {
                        e.cellElement.css({ "cursor": "pointer" });
                    }

                },

                stateStoring: AutoLoad("gridHistoricoPrecos", false),

                onToolbarPreparing: AutoResetState([]),

                onInitialized(e) {
                    new IntersectionObserver(entries => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                e.component.updateDimensions();
                            }
                        });
                    }).observe(e.element[0]);
                },

            }).dxDataGrid('instance');

        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });
    //FIM DADOS FISCAIS E REGRAS COMERCIAIS - ABA PREÇO

    //Consulta de Tabelas de Preços
    //*** CARREGAMENTO DEVE SER FEITO APENAS SE O USUÁRIO CLICAR NO BOTÃO "TABELAS DE PREÇOS" DA ABA "PRECIFICAÇÃO E DADOS FISCAIS" E O PRODUTO CONSULTADO DEVE SER INFORMADO COMO PARÂMETRO. ***
    //*** A FILIAL É OPCIONAL, SE NÃO INFORMADA É UTILIZADA A MATRIZ ***
    GetAzureDataSource(80, '{ CD_PRODUTO: "1495550" }').then((result) => {

        if (result.success) {
            const gridTabelasPrecos = $("#gridTabelasPrecos").dxDataGrid({
                dataSource: result.data,
                hoverStateEnabled: false,
                showBorders: false,
                showRowLines: false,
                showColumnHeaders: false,
                rowAlternationEnabled: false,
                wordWrapEnabled: true,
                columnHidingEnabled: false,
                columnsAutoWidth: true,
                allowColumnResizing: false,
                allowColumnReordering: false,
                focusedRowEnabled: false,

                selection: {
                    mode: 'single',
                },

                editing: {
                    //mode: 'normal',
                    allowUpdating: false,
                    //startEditAction: 'dblClick',
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
                sorting: { mode: "multiple" },
                groupPanel: { visible: false, emptyPanelText: "Agrupamento" },
                paging: { pageSize: 1000 },
                pager: {
                    visible: false,
                    allowedPageSizes: [10, 15, 20, 50, 100],
                    showPageSizeSelector: false,
                    showNavigationButtons: true
                },
                export: {
                    enabled: false,
                    allowExportSelectedData: false
                },
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('Tabelas');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'TabelasPreços.xlsx');
                        });
                    });
                    e.cancel = true;
                },
                filterRow: { visible: false, applyFilter: "auto" },
                headerFilter: {
                    visible: true,
                    allowSearch: true
                },
                filterPanel: { visible: false},
                columnChooser: { enabled: false, allowSearch: true, height: 350 },
                keyExpr: ['CD_TABELA_PRECO'],
                columns: [
                    {
                        dataField: "DS_TABELA_PRECO",
                        caption: "TABELAS",
                        //width: 70,
                        allowSorting: false,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                        alignment: "center",
                        visible: true,
                        cellTemplate: function (e, x) {

                            var codigoTabela = x.data.CD_TABELA_PRECO;
                            var nomeTabela = x.data.DS_TABELA_PRECO;
                            var pcPadraoTabela = x.data.PC_PADRAO;
                            var btnAtivarTabela;
                            var btnEditarExcluir;
                            var pcPadraoTabelaFormatado;
                            var tipoTabela;
                            var tabelaAtivada;
                            var orientacaoDescontosAcrescimos = '';
                            var camposReadOnly = false;
                            var fundoCamposReadOnly = '';
                            var iconeTabela = '';

                            var campoLucro = 'nbx_Pc_Lucro_Tabela_Preco_Aba_Preco_' + x.data.CD_TABELA_PRECO;
                            var campoRentabilidade = 'nbx_Pc_Rentabilidade_Tabela_Preco_Aba_Preco_' + x.data.CD_TABELA_PRECO;
                            var campoDiferenca = 'nbx_Pc_Diferenca_Tabela_Preco_Aba_Preco_' + x.data.CD_TABELA_PRECO;
                            var campoPreco = 'nbx_Vl_Preco_Venda_Tabela_Preco_Aba_Preco_' + x.data.CD_TABELA_PRECO;
                            var idHtmlCampos = 'cardCamposTabela_' + x.data.CD_TABELA_PRECO;
                            var idHtmlCamposFuncao = "'#cardCamposTabela_" + x.data.CD_TABELA_PRECO + "'";

                            var campoLucroConteudo = x.data.PC_LUCRO_TABELA;
                            var campoRentabilidadeConteudo = x.data.PC_RENTABILIDADE_TABELA;
                            var campoDiferencaConteudo = x.data.PC_DIFERENCA_PRECO_PADRAO;
                            var campoPrecoConteudo = x.data.VL_PRECO_TABELA;

                            if (pcPadraoTabela !== null && pcPadraoTabela !== undefined) {
                                pcPadraoTabelaFormatado = (pcPadraoTabela).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) + '%';
                            }

                            if (x.data.CD_TIPO_TABELA == 'P') {
                                tipoTabela = 'personalizado por Produto';
                                orientacaoDescontosAcrescimos = '* utilize percentuais negativos para desconto e positivos para acréscimo';
                                iconeTabela = 'fa-gears';
                            } else if (x.data.CD_TIPO_TABELA == 'R') {
                                tipoTabela = 'rentabilidade fixa de ' + pcPadraoTabelaFormatado;
                                camposReadOnly = true;
                                fundoCamposReadOnly = '"background": "#f8f9fa",';
                                iconeTabela = 'fa-lock';
                            } else if (x.data.CD_TIPO_TABELA == 'D') {
                                if (pcPadraoTabela <= 0) {
                                    tipoTabela = 'desconto fixo de ' + pcPadraoTabelaFormatado;
                                } else {
                                    tipoTabela = 'acréscimo fixo de ' + pcPadraoTabelaFormatado;
                                }
                                camposReadOnly = true;
                                fundoCamposReadOnly = '"background": "#f8f9fa",';
                                iconeTabela = 'fa-lock';
                            } 

                            if (x.data.CD_PRODUTO == null || x.data.CD_PRODUTO == undefined) {
                                tabelaAtivada = 'none';
                                btnAtivarTabela = '<div id="panelBtnAtivarTabela_' + codigoTabela + '" style="display: block;" class="col-lg-3 mb-0 text-left"><btn id="btnAtivarTabela_' + codigoTabela + '" class="btn btn-default btn-xs mb-0 mt-1" data-toggle="tooltip" data-placement="top" title="Ativar o produto para esta tabela" onclick="ativarTabela(' + codigoTabela + ')"><i class="fa fa-plus mr-2"></i>Ativar</btn></div><div id="panelBtnTabelaAtivada_' + codigoTabela + '" style="display: none;" class="col-lg-3 mb-0 text-left"><h3 class="card-subtitle mt-0 mb-0" style="font-size: 18px;"><i class="fa ' + iconeTabela + ' mt-1 mb-0 ml-2"></i></h3></div>';
                                btnEditarExcluir = '<div id="panelBtnEditarTabela_' + codigoTabela + '" style="display: block;" class="col-lg-3 mt-0 mb-0 text-right"><btn id="btnEditarTabela_' + codigoTabela + '" class="btn btn-default btn-xs mb-0 mt-0" data-toggle="tooltip" data-placement="top" title="Editar configurações da tabela"><i class="fa fa-pencil"></i></btn></div><div id="panelBtnEditarExcluirTabela_' + codigoTabela + '" style="display: none;" class="col-lg-3 mt-0 mb-0 text-right"><btn id="btnEditarTabela_' + codigoTabela + '" class="btn btn-default btn-xs mb-0 mt-0" data-toggle="tooltip" data-placement="top" title="Editar configurações da tabela"><i class="fa fa-pencil"></i></btn><btn id="btnExcluirProdutoTabela_' + codigoTabela + '" class="btn btn-default btn-xs mb-0 mt-0 ml-1" data-toggle="tooltip" data-placement="top" title="Excluir o produto desta tabela"><i class="fa fa-trash" onclick="excluirProdutoTabela(' + codigoTabela + ')"></i></btn></div>';
                            } else {
                                tabelaAtivada = 'block';
                                btnAtivarTabela = '<div id="panelBtnAtivarTabela_' + codigoTabela + '" style="display: none;" class="col-lg-3 mb-0 text-left"><btn id="btnAtivarTabela_' + codigoTabela + '" class="btn btn-default btn-xs mb-0 mt-1" data-toggle="tooltip" data-placement="top" title="Ativar o produto para esta tabela" onclick="ativarTabela(' + codigoTabela + ')"><i class="fa fa-plus mr-2"></i>Ativar</btn></div><div id="panelBtnTabelaAtivada_' + codigoTabela + '" style="display: block;" class="col-lg-3 mb-0 text-left"><h3 class="card-subtitle mt-0 mb-0" style="font-size: 18px;"><i class="fa ' + iconeTabela + ' mt-1 mb-0 ml-2"></i></h3></div>';
                                btnEditarExcluir = '<div id="panelBtnEditarTabela_' + codigoTabela + '" style="display: none;" class="col-lg-3 mt-0 mb-0 text-right"><btn id="btnEditarTabela_' + codigoTabela + '" class="btn btn-default btn-xs mb-0 mt-0" data-toggle="tooltip" data-placement="top" title="Editar configurações da tabela"><i class="fa fa-pencil"></i></btn></div><div id="panelBtnEditarExcluirTabela_' + codigoTabela + '" style="display: block;" class="col-lg-3 mt-0 mb-0 text-right"><btn id="btnEditarTabela_' + codigoTabela + '" class="btn btn-default btn-xs mb-0 mt-0" data-toggle="tooltip" data-placement="top" title="Editar configurações da tabela"><i class="fa fa-pencil"></i></btn><btn id="btnExcluirProdutoTabela_' + codigoTabela + '" class="btn btn-default btn-xs mb-0 mt-0 ml-1" data-toggle="tooltip" data-placement="top" title="Excluir o produto desta tabela"><i class="fa fa-trash" onclick="excluirProdutoTabela(' + codigoTabela + ')"></i></btn></div>';
                            }
                            

                            e.append(`
                                <script>
                                    $('#${campoDiferenca}').dxNumberBox({
                                        value: ${campoDiferencaConteudo},
                                        readOnly: ${camposReadOnly},
                                        format: "###,###,##0.######################'%'",
                                        min: -999999,
                                        max: 999999,
                                        showClearButton: false,
                                        showSpinButtons: false,
                                        step: 10,
                                        placeholder: '% Desc(-) ou Acrésc(+)',
                                        labelMode: 'floating',
                                        label: '% Desc(-) ou Acrésc(+)',
                                        onContentReady: function (e) {
                                            e.component.element().find("input").eq(1).css({
                                                "text-align": "center",
                                                "font-weight": "bold",
                                                "color": "#6c757d",
                                                ${fundoCamposReadOnly}
                                            });
                                        },
                                    });

                                    $('#${campoLucro}').dxNumberBox({
                                        value: ${campoLucroConteudo},
                                        readOnly: ${camposReadOnly},
                                        format: "###,###,##0.######################'%'",
                                        min: -999999,
                                        max: 999999,
                                        showClearButton: false,
                                        showSpinButtons: false,
                                        step: 10,
                                        placeholder: '% Lucro',
                                        labelMode: 'floating',
                                        label: '% Lucro',
                                        onContentReady: function (e) {
                                            e.component.element().find("input").eq(1).css({
                                                "text-align": "center",
                                                "font-weight": "bold",
                                                "color": "#6c757d",
                                                ${fundoCamposReadOnly}
                                            });
                                        },
                                    });

                                    $('#${campoRentabilidade}').dxNumberBox({
                                        value: ${campoRentabilidadeConteudo},
                                        readOnly: ${camposReadOnly},
                                        format: "###,###,##0.######################'%'",
                                        min: -999999,
                                        max: 999999,
                                        showClearButton: false,
                                        showSpinButtons: false,
                                        step: 10,
                                        placeholder: '% Rentabilidade',
                                        labelMode: 'floating',
                                        label: '% Rentabilidae',
                                        onContentReady: function (e) {
                                            e.component.element().find("input").eq(1).css({
                                                "text-align": "center",
                                                "font-weight": "bold",
                                                "color": "#6c757d",
                                                ${fundoCamposReadOnly}
                                            });
                                        },
                                    });

                                    $('#${campoPreco}').dxNumberBox({
                                        value: ${campoPrecoConteudo},
                                        readOnly: ${camposReadOnly},
                                        format: "R$ ###,###,##0.00###",
                                        min: 0,
                                        max: 999999,
                                        showClearButton: false,
                                        showSpinButtons: false,
                                        step: 10,
                                        placeholder: 'Preço de Venda',
                                        labelMode: 'floating',
                                        label: 'Preço de Venda',
                                        onContentReady: function (e) {
                                            e.component.element().find("input").eq(1).css({
                                                "text-align": "center",
                                                "font-size": "14px",
                                                "font-weight": "bold",
                                                "color": "#0077b6",
                                                ${fundoCamposReadOnly}
                                            });
                                        },

                                    });

                                </script>

                                <div class="row mb-0 mt-0">
                                    <div class="col-lg-12 mt-0 mb-0">

                                        <section class="card card-default mt-0 mb-0">
                                            <header class="card-header mt-0 mb-0">
                                                
                                                <div class="row mt-0 mb-0">
                                                    ${btnAtivarTabela}
                                                    <div class="col-lg-6 mt-0 mb-0">
                                                        <h6 class="card-subtitle mb-0 mt-0 mb-0 pb-0 text-center"><b>${nomeTabela}</b></h6>
                                                        <h6 class="card-subtitle mb-0 mt-0 mb-0 pt-0 text-center">${tipoTabela}</h6>
                                                    </div>
                                                    ${btnEditarExcluir}
                                                </div>

                                            </header>
                                        </section>
                                        <div id="${idHtmlCampos}" class="card-body card-featured-bottom bg-white mt-0 pb-0" style="display: ${tabelaAtivada}">
                                            <div class="widget-summary mt-0">
                                                <div class="widget-summary-col mt-0">
                                                    <div class="summary mt-0">


                                                        <div class="info mt-1">

                                                            <div class="row mb-2 mt-0">
                                                                <div class="col-lg-6 mb-2">
                                                                    <div id="${campoLucro}" class="mt-0 mb-0"></div>
                                                                </div>
                                                                <div class="col-lg-6 mb-2">
                                                                    <div id="${campoRentabilidade}" class="mt-0 mb-0"></div>
                                                                </div>
                                                                <div class="col-lg-6 mb-2">
                                                                    <div id="${campoDiferenca}" class="mt-0 mb-0"></div>
                                                                </div>
                                                                <div class="col-lg-6 mb-2">
                                                                    <div id="${campoPreco}" class="mt-0 mb-0"></div>
                                                                </div>
                                                                <div class="col-lg-12 mb-2">
                                                                    <h6 class="mb-0 mt-0 text-left" style="font-size: 12px; font-family: Calibri;">${orientacaoDescontosAcrescimos}</h6>
                                                                </div>
                                                            </div>

                                                        </div>

                                                                                       
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>

                            `);

                        },

                    },
                ],

                onContentReady: function (e) {
                    e.component.element().addClass("custom-focus-style");
                },

                toolbar: {
                    items: [
                        'searchPanel',
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'auto',
                            options: {
                                icon: 'plus',
                                text: 'Criar ou editar tabelas',
                                //hint: 'Criar ou editar tabelas de preços',
                                type: 'success',
                                onClick(e) {
                                    AbrirModal('#ModalIncluirEditarTabelaPrecos');
                                },
                            },
                        },
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

            }).dxDataGrid('instance');

        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Consulta de Tabelas de Preços
    //*** CARREGAMENTO DEVE SER FEITO APENAS SE O USUÁRIO CLICAR NO BOTÃO "TABELAS DE PREÇOS" DA ABA "PRECIFICAÇÃO E DADOS FISCAIS" E O PRODUTO CONSULTADO DEVE SER INFORMADO COMO PARÂMETRO. ***
    //*** A FILIAL É OPCIONAL, SE NÃO INFORMADA É UTILIZADA A MATRIZ ***
    GetAzureDataSource(81, '{}').then((result) => {

        if (result.success) {

            gridTabelasConsultaAbaPrecos = $("#gridTabelasConsultaAbaPrecos").dxDataGrid({
                dataSource: result.data,
                hoverStateEnabled: true,
                showBorders: true,
                showRowLines: true,
                showColumnLines: true,
                rowAlternationEnabled: true,
                wordWrapEnabled: true,
                columnHidingEnabled: true,
                searchPanel: {
                    visible: true,
                    highlightCaseSensitive: false,
                    highlightSearchText: true,
                    placeholder: "Procurar...",
                },
                sorting: {
                    mode: "multiple",
                },
                //selection: {
                //    mode: 'multiple',
                //    allowSelectAll: false,
                //    showCheckBoxesMode: 'always',
                //    deferred: false,
                //},
                allowColumnResizing: true,
                columnsAutoWidth: true,
                cellHintEnabled: true,
                allowColumnReordering: true,
                groupPanel: {
                    visible: true,
                    emptyPanelText: "Agrupar",
                },
                paging: {
                    pageSize: 10,
                },
                pager: {
                    visible: true,
                    allowedPageSizes: [10, 20, 50],
                    showPageSizeSelector: true,
                    showNavigationButtons: true
                },
                export: {
                    enabled: true,
                    allowExportSelectedData: false
                },
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('Tabelas');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'TabelasPreços.xlsx');
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
                keyExpr: 'CD_TABELA_PRECO',
                columns: [
                    //{
                    //    type: "selection",
                    //    dataField: "CD_SELECAO",
                    //    width: 30,
                    //    value: false,
                    //    allowHiding: false,
                    //},

                    //{
                    //    dataField: 'DS_BANCO_LOGO',
                    //    caption: null,
                    //    width: 60,
                    //    allowFiltering: false,
                    //    allowSorting: false,
                    //    alignment: 'center',
                    //    cssClass: "column-data-grid",
                    //    cellTemplate: function (e, x) {

                    //        e.append(`<figure class="mb-0">
                    //                      <img src="${x.data.DS_BANCO_LOGO}?${new Date()}" style="width: 40px; height: 40px;" class="rounded-circle">
                    //                  </figure>`);

                    //    },
                    //},
                    {
                        dataField: "CD_TABELA_PRECO",
                        caption: "Código",
                        width: 65,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: true,
                        allowHiding: false,
                    },
                    {
                        dataField: "DS_TABELA_PRECO",
                        caption: "Nome da Tabela",
                        //width: 200,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        allowHiding: false,
                        visible: true,
                        //groupIndex: 0,
                    },
                    {
                        dataField: "DS_TIPO_TABELA",
                        caption: "Tipo de Tabela",
                        width: 165,
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: true,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        hidingPriority: 4,
                    },
                    {
                        dataField: "PC_PADRAO",
                        caption: "Percentual",
                        width: 100,
                        dataType: 'number',
                        format: "###,###,###,##0.###############'%'",
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: true,
                        hidingPriority: 3,
                    },
                    {
                        dataField: "DS_APLICACAO_PRODUTOS",
                        caption: "Aplicação",
                        width: 140,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 2,
                    },
                    {
                        dataField: "CD_STATUS",
                        caption: "Status",
                        width: 75,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                        hidingPriority: 1,
                    },
                    {
                        dataField: "DS_STATUS",
                        caption: "Status",
                        width: 75,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: true,
                        hidingPriority: 100,
                    },
                    {
                        dataField: "DS_IMAGEM_EDITAR_CONTA",
                        caption: "Editar",
                        width: 60,
                        allowEditing: false,
                        allowSorting: false,
                        allowHeaderFiltering: false,
                        allowFiltering: false,
                        allowHiding: false,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        cellTemplate: $('#imgGridTabelaConsulta'),
                    },
                ],

                onCellClick: function (e) {
                    if (e.rowType === "data") {
                        if (e.column.caption == "Editar") {

                            if (e.data.CD_TABELA_PRECO !== null && e.data.CD_TABELA_PRECO !== undefined) {
                                var percentual = e.data.PC_PADRAO;
                                var tipo = e.data.CD_TIPO_TABELA;

                                if (e.data.CD_TIPO_TABELA == 'D') {
                                    if (e.data.PC_PADRAO < 0) {
                                        percentual = e.data.PC_PADRAO * -1
                                    } else {
                                        tipo = 'A'
                                    }
                                }

                                editarTabelaPreco(e.data.CD_TABELA_PRECO, e.data.DS_TABELA_PRECO, tipo, percentual, e.data.CD_APLICACAO_PRODUTOS, e.data.CD_STATUS);
                            }

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
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'auto',
                            options: {
                                icon: 'plus',
                                text: 'Nova Tabela',
                                hint: 'Cadastrar nova tabela de preços',
                                type: 'success',
                                onClick() {
                                    criarTabelaPreco();
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

                stateStoring: AutoLoad("gridTabelasConsultaAbaPrecos", false),
                onToolbarPreparing: AutoResetState([]),

                onInitialized(e) {
                    new IntersectionObserver(entries => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                e.component.updateDimensions();
                            }
                        });
                    }).observe(e.element[0]);
                },
            });

            //ESTE LOOKUP NÃO ESTÁ SENDO UTILIZADO, POR ENQUANTO
            lkpTabelasPrecosConsultaGeral = $('#lkp_Tabelas_Precos_Consulta_Geral').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_TABELA_PRECO','DS_TIPO_TABELA','DS_APLICACAO_PRODUTOS','DS_STATUS'],
                displayExpr: 'DS_TABELA_PRECO',
                valueExpr: 'CD_TABELA_PRECO',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Tabelas de Preços',
                },
                //labelMode: 'floating',
                //label: 'Origem do Produto *',
                placeholder: 'Selecione uma tabela para editar',
                showClearButton: true,
                itemTemplate(data) {
                    return getTemplateTabela(data);

                    lkpTabelasPrecosConsultaGeral.option('value', null);
                },
                onValueChanged: function (e) {
                    var tabela = e.component.option('selectedItem');

                    console.log('TABELA ', tabela);

                    if (tabela !== null && tabela !== undefined) {
                        if (tabela.CD_TABELA_PRECO !== null && tabela.CD_TABELA_PRECO !== undefined) {
                            var percentual = tabela.PC_PADRAO;
                            var tipo = tabela.CD_TIPO_TABELA;

                            if (tabela.CD_TIPO_TABELA == 'D') {
                                if (tabela.PC_PADRAO < 0) {
                                    percentual = tabela.PC_PADRAO * -1
                                } else {
                                    tipo = 'A'
                                }
                            }

                            editarTabelaPreco(tabela.CD_TABELA_PRECO, tabela.DS_TABELA_PRECO, tipo, percentual, tabela.CD_APLICACAO_PRODUTOS);
                        }
                    }
                },
            });

            function getTemplateTabela(data) {
                let tabelaNome = data.DS_TABELA_PRECO;
                let tabelaTipo = data.DS_TIPO_TABELA;
                let tabelaAplicacao = data.DS_APLICACAO_PRODUTOS;
                let tabelaStatus = data.DS_STATUS;

                if (data.CD_STATUS == 'A') {
                    tabelaStatus = '';
                } else {
                    tabelaStatus = '<h5 class="mt-0 mb-0"><b style="color: darkred">' + data.DS_STATUS + '</b></h5>';
                }

                if (data.DS_TIPO_TABELA == 'P') {
                    return `<div class="row mt-0 mb-0" style="color: #6c757d; border-bottom: 1px dotted lightGray;"><div class="col-lg-12 mt-0 mb-2"><h5 class="mt-0 mb-0"><b>${tabelaNome}</b></h4><h5 class="mt-0 mb-0">${tabelaTipo}</h5>${tabelaStatus}</div></div>`;
                } else {
                    return `<div class="row mt-0 mb-0" style="color: #6c757d; border-bottom: 1px dotted lightGray;"><div class="col-lg-12 mt-0 mb-2"><h5 class="mt-0 mb-0"><b>${tabelaNome}</b></h4><h5 class="mt-0 mb-0">${tabelaTipo}</h5><h5 class="mt-0 mb-0">${tabelaAplicacao}</h5>${tabelaStatus}</div></div>`;
                }
            };

        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });


    $('#txt_Ds_Tabela_Preco_Aba_Preco').dxTextBox({
        labelMode: 'floating',
        label: 'Nome da Tabela',
        maxLength: 60,
    });

    var dataSourceTiposTabelas = [
        { CD_TIPO_TABELA: 'P', DS_TIPO_TABELA: "Percentuais de desconto ou acréscimos diferentes para cada produto" },
        { CD_TIPO_TABELA: 'R', DS_TIPO_TABELA: "Rentabilidade fixa para todos os produtos da tabela" },
        { CD_TIPO_TABELA: 'D', DS_TIPO_TABELA: "Desconto fixo para todos os produtos da tabela" },
        { CD_TIPO_TABELA: 'A', DS_TIPO_TABELA: "Acréscimo fixo para todos os produtos da tabela" },
    ];

    $('#lkp_Tipos_Tabelas_Aba_Preco').dxLookup({
        dataSource: dataSourceTiposTabelas,
        searchExpr: ['DS_TIPO_TABELA'],
        displayExpr: 'DS_TIPO_TABELA',
        valueExpr: 'CD_TIPO_TABELA',
        value: null,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Tipos de Tabelas',
        },
        labelMode: 'floating',
        label: 'Tipo de Tabela',
        placeholder: '',
        showClearButton: false,

        onValueChanged(e) {
            if (e.value == 'P') {
                $('#panelPercentualPadraoTabelaPreco').slideUp();
                $('#panelAplicacaoProdutosTabelaPreco').slideUp();
            } else {
                $('#panelPercentualPadraoTabelaPreco').slideDown();
                $('#panelAplicacaoProdutosTabelaPreco').slideDown();
            };
        },
    });

    $('#nbx_Pc_Padrao').dxNumberBox({
        value: '',
        format: "###,##0.###############'%'",
        min: 0,
        max: 999999,
        showClearButton: true,
        showSpinButtons: false,
        step: 1,
        placeholder: 'Percentual',
        labelMode: 'floating',
        label: 'Percentual',
    });

    var dataSourceAplicacaoProdutosTabelas = [
        { CD_APLICACAO_PRODUTOS: 'S', DS_APLICACAO_PRODUTOS: "Vou escolher quais produtos serão incluídos nesta tabela" },
        { CD_APLICACAO_PRODUTOS: 'T', DS_APLICACAO_PRODUTOS: "Incluir todos os produtos nesta tabela" },
    ];

    $('#lkp_Aplicacao_Produtos_Tabelas_Aba_Preco').dxLookup({
        dataSource: dataSourceAplicacaoProdutosTabelas,
        searchExpr: ['DS_APLICACAO_PRODUTOS'],
        displayExpr: 'DS_APLICACAO_PRODUTOS',
        valueExpr: 'CD_APLICACAO_PRODUTOS',
        value: null,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Aplicação para Produtos',
        },
        labelMode: 'floating',
        label: 'Aplicação para Produtos',
        placeholder: '',
        showClearButton: false,

        //    onValueChanged(e) {
        //        if (e.value == 'I') {
        //            e.component.option('elementAttr', { class: 'status_inativo' });
        //            $('#indicadorInativo').slideDown();
        //            $('#indicadorNovoProduto').slideUp();
        //            $('#indicadorProntoComercializar').slideUp();
        //            $('#indicadorCadastroIncompleto').slideUp();
        //            $('#indicadorFaturamentoBloqueado').slideUp();
        //            $('#indicadorEncomenda').slideUp();
        //        } else {
        //            e.component.option('elementAttr', { class: 'status_ativo' });
        //            $('#indicadorInativo').slideUp();
        //            $('#indicadorNovoProduto').slideUp();
        //            //Antes de liberar o produto para venda, fazer as verificações necessárias
        //            $('#indicadorCadastroIncompleto').slideUp();
        //            $('#indicadorProntoComercializar').slideDown();
        //        };
        //    },
    });

    $('#lkp_Status_Tabela_Aba_Preco').dxLookup({
        dataSource: dataSourceStatus,
        elementAttr: {
            class: 'status_ativo',
        },
        searchExpr: ['DS_STATUS'],
        displayExpr: 'DS_STATUS',
        valueExpr: 'CD_STATUS',
        value: 'A',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Status',
        },
        labelMode: 'floating',
        label: 'Status',
        placeholder: '',
        showClearButton: false,
        onValueChanged(e) {
            if (e.value == 'I') {
                e.component.option('elementAttr', { class: 'status_inativo' });
            } else {
                e.component.option('elementAttr', { class: 'status_ativo' });
            };
        },
    });




    //FIM DADOS FISCAIS, REGRAS COMERCIAIS, HISTÓRICO E TABELA DE PREÇOS - ABA PREÇO - NOVO PROTÓTIPO







    //Origem de Produtos
    GetAzureDataSource(51, '{CD_STATUS: "A"}').then((result) => {

        if (result.success) {

            $('#lkp_Origem_Produto').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_PESQUISA'],
                displayExpr: 'DS_PESQUISA',
                valueExpr: 'CD_ORIGEM',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Origem do Produto',
                },
                labelMode: 'floating',
                label: 'Origem do Produto *',
                placeholder: 'Origem do Produto',
                showClearButton: true,
            });
        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Unidades de Medidas (Compra e Venda)
    GetAzureDataSource(52, '{CD_STATUS: "A"}').then((result) => {

        if (result.success) {

            $('#lkp_Unidade_Medida_Compra').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_PESQUISA'],
                displayExpr: 'DS_PESQUISA',
                valueExpr: 'CD_UNIDADE_MEDIDA',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Unidade de Compra',
                },
                labelMode: 'floating',
                label: 'Unidade de Compra *',
                placeholder: 'Unidade de Compra *',
                showClearButton: true,
                onValueChanged(e) {
                    valorUnidadeVenda = $('#lkp_Unidade_Medida_Venda').dxLookup('instance').option('value');

                    if (e.value !== null && e.value !== undefined && valorUnidadeVenda !== null && valorUnidadeVenda !== undefined && e.value !== valorUnidadeVenda) {
                        $('#panelFatorConversao').slideDown();
                    } else {
                        $('#panelFatorConversao').slideUp();
                    };
                },
            });

            $('#lkp_Unidade_Medida_Venda').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_PESQUISA'],
                displayExpr: 'DS_PESQUISA',
                valueExpr: 'CD_UNIDADE_MEDIDA',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Unidade de Venda',
                },
                labelMode: 'floating',
                label: 'Unidade de Venda *',
                placeholder: 'Unidade de Venda *',
                showClearButton: true,
                onValueChanged(e) {
                    valorUnidadeCompra = $('#lkp_Unidade_Medida_Compra').dxLookup('instance').option('value');

                    if (e.value !== null && e.value !== undefined && valorUnidadeCompra !== null && valorUnidadeCompra !== undefined && e.value !== valorUnidadeCompra) {
                        $('#panelFatorConversao').slideDown();
                    } else {
                        $('#panelFatorConversao').slideUp();
                    };
                },
            });
        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Tipos de Produtos SPED
    GetAzureDataSource(53).then((result) => {

        if (result.success) {

            $('#lkp_Tipo_Produto_SPED').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_TIPO_PRODUTO_SPED'],
                displayExpr: 'DS_TIPO_PRODUTO_SPED',
                valueExpr: 'CD_TIPO_PRODUTO_SPED',
                value: '',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Tipo de Produto',
                },
                labelMode: 'floating',
                label: 'Tipo de Produto',
                placeholder: 'Tipo de Produto',
                showClearButton: true,
            });
        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Situações Tributárias de ICMS
    GetAzureDataSource(54, '{CD_STATUS: "A"}').then((result) => {

        if (result.success) {

            $('#lkp_Situacao_Tributaria').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_PESQUISA'],
                displayExpr: 'DS_PESQUISA',
                valueExpr: 'CD_SITUACAO_TRIBUTARIA',
                value: '',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Situação Tributária de ICMS',
                },
                labelMode: 'floating',
                label: 'Situação Tributária de ICMS',
                placeholder: 'Situação Tributária de ICMS',
                showClearButton: true,
            });

            $('#lkp_Situacao_Tributaria_Aba_Preco').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_PESQUISA'],
                displayExpr: 'DS_PESQUISA',
                valueExpr: 'CD_SITUACAO_TRIBUTARIA',
                value: '',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Situação Tributária de ICMS',
                },
                labelMode: 'floating',
                label: 'Situação Tributária de ICMS',
                placeholder: 'Situação Tributária de ICMS',
                showClearButton: true,
            });
        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Situação Tributária de PIS
    GetAzureDataSource(55).then((result) => {

        if (result.success) {

            $('#lkp_Situacao_Tributaria_PIS').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_PESQUISA'],
                displayExpr: 'DS_PESQUISA',
                valueExpr: 'CD_SITUACAO_TRIBUTARIA_PIS',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'CST PIS',
                },
                labelMode: 'floating',
                label: 'Situação Tributária de PIS',
                placeholder: 'Situação Tributária de PIS',
                showClearButton: true,
            });

            $('#lkp_Situacao_Tributaria_PIS_Aba_Preco').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_PESQUISA'],
                displayExpr: 'DS_PESQUISA',
                valueExpr: 'CD_SITUACAO_TRIBUTARIA_PIS',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'CST PIS',
                },
                labelMode: 'floating',
                label: 'Situação Tributária de PIS',
                placeholder: 'Situação Tributária de PIS',
                showClearButton: true,
            });
        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Situação Tributária de COFINS
    GetAzureDataSource(56).then((result) => {

        if (result.success) {

            $('#lkp_Situacao_Tributaria_COFINS').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_PESQUISA'],
                displayExpr: 'DS_PESQUISA',
                valueExpr: 'CD_SITUACAO_TRIBUTARIA_COFINS',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'CST COFINS',
                },
                labelMode: 'floating',
                label: 'Situação Tributária de COFINS',
                placeholder: 'Situação Tributária de COFINS',
                showClearButton: true,
            });

            $('#lkp_Situacao_Tributaria_COFINS_Aba_Preco').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_PESQUISA'],
                displayExpr: 'DS_PESQUISA',
                valueExpr: 'CD_SITUACAO_TRIBUTARIA_COFINS',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'CST COFINS',
                },
                labelMode: 'floating',
                label: 'Situação Tributária de COFINS',
                placeholder: 'Situação Tributária de COFINS',
                showClearButton: true,
            });
        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    $('#dt_Cadastro').dxDateBox({
        labelMode: 'floating',
        label: 'Data de Cadastro',
        placeholder: '',
        readOnly: true,
        showClearButton: false,
        useMaskBehavior: true,
        displayFormat: 'dd/MM/yyyy HH:mm',
        type: 'date',
        value: Date(),
    });

    $('#dt_Atualizacao').dxDateBox({
        labelMode: 'floating',
        label: 'Última Alteração',
        placeholder: '',
        readOnly: true,
        showClearButton: false,
        useMaskBehavior: true,
        displayFormat: 'dd/MM/yyyy HH:mm',
        type: 'date',
        value: Date(),
    });

    $('#txt_Cd_Login_Inclusao').dxTextBox({
        labelMode: 'floating',
        label: 'Login Cadastro',
        maxLength: 10,
        readOnly: true,
        value: 'AZURE',
    });


    $('#chk_Lg_Encomenda').dxCheckBox({
        value: false,
        text: "Venda sob encomenda",

        onValueChanged: function (e) {

            if (e.value == true) {
                $('#indicadorEncomenda').slideDown();
            } else {
                $('#indicadorEncomenda').slideUp();
            };
        },
    });

    $('#chk_Faturamento_Bloqueado').dxCheckBox({
        value: false,
        text: "Bloquear faturamento para revisão cadastro",

        onValueChanged: function (e) {

            if (e.value == true) {
                $('#indicadorFaturamentoBloqueado').slideDown();
            } else {
                $('#indicadorFaturamentoBloqueado').slideUp();
            };
        },

    });

    $('#lkp_Status_Produto').dxLookup({
        dataSource: dataSourceStatus,
        elementAttr: {
            class: 'status_ativo',
        },
        searchExpr: ['DS_STATUS'],
        displayExpr: 'DS_STATUS',
        valueExpr: 'CD_STATUS',
        value: 'A',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Status',
        },
        labelMode: 'floating',
        label: 'Status',
        placeholder: '',
        showClearButton: false,
        onValueChanged(e) {
            if (e.value == 'I') {
                e.component.option('elementAttr', { class: 'status_inativo' });
                $('#indicadorInativo').slideDown();
                $('#indicadorNovoProduto').slideUp();
                $('#indicadorProntoComercializar').slideUp();
                $('#indicadorCadastroIncompleto').slideUp();
                $('#indicadorFaturamentoBloqueado').slideUp();
                $('#indicadorEncomenda').slideUp();
            } else {
                e.component.option('elementAttr', { class: 'status_ativo' });
                $('#indicadorInativo').slideUp();
                $('#indicadorNovoProduto').slideUp();
                //Antes de liberar o produto para venda, fazer as verificações necessárias
                $('#indicadorCadastroIncompleto').slideUp();
                $('#indicadorProntoComercializar').slideDown();
            };
        },
    });

    var dataSourceForaLinha = [
        { LG_FORA_LINHA: 0, DS_FORA_LINHA: "Em linha" },
        { LG_FORA_LINHA: 1, DS_FORA_LINHA: "Fora de Linha" },
    ];

    $('#lkp_Fora_Linha').dxLookup({
        dataSource: dataSourceForaLinha,
        elementAttr: {
            class: 'status_ativo',
        },
        searchExpr: ['DS_FORA_LINHA'],
        displayExpr: 'DS_FORA_LINHA',
        valueExpr: 'LG_FORA_LINHA',
        value: 0,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Situação para Compra',
        },
        labelMode: 'floating',
        label: 'Situação para Compra',
        placeholder: '',
        showClearButton: false,
        onValueChanged(e) {
            if (e.value == 1) {
                e.component.option('elementAttr', { class: 'status_inativo' });
                $('#indicadorForaLinha').slideDown();
            } else {
                e.component.option('elementAttr', { class: 'status_ativo' });
                $('#indicadorForaLinha').slideUp();
            };
        },
    });

    var dataSourceOperadorConversao = [
        { CD_OPERADOR: '*', DS_OPERADOR: "Multiplicar" },
        { CD_OPERADOR: '/', DS_OPERADOR: "Dividir" },
        { CD_OPERADOR: '-', DS_OPERADOR: "Subtrair" },
        { CD_OPERADOR: '+', DS_OPERADOR: "Somar" },
    ];

    $('#lkp_Operador_Conversao').dxLookup({
        dataSource: dataSourceOperadorConversao,
        searchExpr: ['DS_OPERADOR'],
        displayExpr: 'DS_OPERADOR',
        valueExpr: 'CD_OPERADOR',
        value: '*',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Operador',
        },
        //labelMode: 'floating',
        //label: 'Operador',
        placeholder: 'Operador',
        showClearButton: false,
    });

    $('#lkp_Operador_Conversao_Exportacao').dxLookup({
        dataSource: dataSourceOperadorConversao,
        searchExpr: ['DS_OPERADOR'],
        displayExpr: 'DS_OPERADOR',
        valueExpr: 'CD_OPERADOR',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Operador para Conversão',
        },
        labelMode: 'floating',
        label: 'Operador para Conversão',
        placeholder: 'Operador para Conversão',
        showClearButton: true,
    });

    $('#nbx_Fator_Conversao').dxNumberBox({
        value: '',
        format: 'por ###,###,###,##0.#####',
        min: 0,
        max: 99999999999999,
        showClearButton: true,
        showSpinButtons: false,
        step: 1,
        placeholder: 'Fator Conversão *',
        //labelMode: 'floating',
        //label: 'Fator Conversão *',
    });

    $('#txt_Cd_Unidade_Tributacao_Exportacao').dxTextBox({
        labelMode: 'floating',
        label: 'Unidade de Tributação',
        maxLength: 15,
    });

    $('#txt_Cd_EAN_Tributacao_Exportacao').dxTextBox({
        labelMode: 'floating',
        label: 'Codigo de Barras Tributação',
        maxLength: 15,
    });

    $('#nbx_Fator_Conversao_Exportacao').dxNumberBox({
        value: '',
        format: 'por ###,###,###,##0.#####',
        min: 0,
        max: 99999999999999,
        showClearButton: true,
        showSpinButtons: false,
        step: 1,
        placeholder: 'Fator Conversão *',
        labelMode: 'floating',
        label: 'Fator Conversão *',
    });

    $('#txt_Cd_Produto').dxTextBox({
        labelMode: 'floating',
        label: 'Código Interno',
        maxLength: 15,
    });

    $('#txt_Cd_EAN_Produto').dxTextBox({
        labelMode: 'floating',
        label: 'Código de Barras',
        maxLength: 15,
    });

    $('#txt_Ds_Produto').dxTextBox({
        labelMode: 'floating',
        label: 'Descrição Completa *',
        maxLength: 60,
    });

    $('#txt_Ds_Produto_Reduzida').dxTextBox({
        labelMode: 'floating',
        label: 'Descrição Reduzida para Cupom Fiscal *',
        maxLength: 20,
    });

    $('#txt_Ds_Marca').dxTextBox({
        labelMode: 'floating',
        label: 'Marca',
        maxLength: 15,
    });

    $('#nbx_Qt_Multiplo_Compra').dxNumberBox({
        value: '',
        format: '###,###,###,##0.####',
        min: 0,
        max: 99999999999999,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        placeholder: 'Múltiplo de Compra *',
        labelMode: 'floating',
        label: 'Múltiplo de Compra *',
    });

    $('#nbx_Ps_Produto_Compra').dxNumberBox({
        value: '',
        format: '###,###,###,##0.#### Kg',
        min: 0,
        max: 99999999999999,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        placeholder: 'Peso de Compra *',
        labelMode: 'floating',
        label: 'Peso de Compra *',
    });

    $('#nbx_Ps_Produto_Venda').dxNumberBox({
        value: '',
        format: '###,###,###,##0.#### Kg',
        min: 0,
        max: 99999999999999,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        placeholder: 'Peso de Venda *',
        labelMode: 'floating',
        label: 'Peso de Venda *',
    });

    $('#txt_Cd_Fabricante').dxTextBox({
        labelMode: 'floating',
        label: 'Código Fabricante',
        maxLength: 20,
    });

    $('#txt_Cd_Original').dxTextBox({
        labelMode: 'floating',
        label: 'Código Original',
        maxLength: 25,
    });

    $('#txt_Cd_Opcional').dxTextBox({
        labelMode: 'floating',
        label: 'Código Opcional',
        maxLength: 25,
    });

    $('#nbx_Cd_NCM').dxNumberBox({
        value: '',
        format: '00000000',
        min: 0,
        max: 99999999,
        showClearButton: true,
        showSpinButtons: false,
        step: 1,
        placeholder: 'Código NCM',
        labelMode: 'floating',
        label: 'Código NCM',
    });

    $('#nbx_Cd_CEST').dxNumberBox({
        value: '',
        format: '0000000',
        min: 0,
        max: 9999999,
        showClearButton: true,
        showSpinButtons: false,
        step: 1,
        placeholder: 'CEST',
        labelMode: 'floating',
        label: 'Código CEST',
    });

    $('#txt_Nr_FCI').dxTextBox({
        labelMode: 'floating',
        label: 'Código FCI - Ficha de Conteúdo de Importação',
        maxLength: 40,
    });

    $('#txt_Cd_Produto_Ecommerce').dxTextBox({
        labelMode: 'floating',
        label: 'Cód. Integração e-Commerce',
        maxLength: 25,
    });

    $('#txt_Ds_Aplicacao').dxTextArea({
        labelMode: 'floating',
        label: 'Aplicação',
        autoResizeEnabled: true,
        maxLength: 4000,
    }).dxTextArea('instance');

    $('#txt_Ds_Marca_Aplicacao').dxTextBox({
        labelMode: 'floating',
        label: 'Marca',
        maxLength: 200,
    });

    $('#txt_Ds_Modelo_Aplicacao').dxTextBox({
        labelMode: 'floating',
        label: 'Modelo',
        maxLength: 200,
    });

    $('#nbx_Nr_Ano_Inicial_Aplicacao').dxNumberBox({
        value: '',
        format: '00',
        min: 0,
        max: 99,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        placeholder: 'Ano Inicial',
        labelMode: 'floating',
        label: 'Ano Inicial',
    });

    $('#nbx_Nr_Ano_Final_Aplicacao').dxNumberBox({
        value: '',
        format: '00',
        min: 0,
        max: 99,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        placeholder: 'Ano Final',
        labelMode: 'floating',
        label: 'Ano Final',
    });

    var dataSourceSeparadorAplicacao = [
        { CD_SEPARADOR: " ", DS_SEPARADOR: "espaço" },
        { CD_SEPARADOR: "/", DS_SEPARADOR: "/" },
        { CD_SEPARADOR: "|", DS_SEPARADOR: "|" },
        { CD_SEPARADOR: "-", DS_SEPARADOR: "-" },
        { CD_SEPARADOR: ":", DS_SEPARADOR: ":" },
        { CD_SEPARADOR: ";", DS_SEPARADOR: ";" },
        { CD_SEPARADOR: "#", DS_SEPARADOR: "#" },
        { CD_SEPARADOR: "*", DS_SEPARADOR: "*" },
    ];

    $('#lkp_Separador_Aplicacao').dxLookup({
        dataSource: dataSourceSeparadorAplicacao,
        searchExpr: ['DS_SEPARADOR'],
        displayExpr: 'DS_SEPARADOR',
        valueExpr: 'CD_SEPARADOR',
        value: ' ',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Separador',
        },
        labelMode: 'floating',
        label: 'Separador',
        placeholder: 'Separador',
        showClearButton: false,
    });


    $('#chk_Lg_Kit').dxCheckBox({
        value: false,
        text: "Kit - Este item é composto por mais de um produto ou é vendido em mais de uma unidade de medida",

        onValueChanged: function (e) {

            if (e.value == true) {
                $('#panelDependenciasKit').slideDown();

                $('#chk_Lg_Kit_Movimento_Estoque_Producao').dxCheckBox("instance").option('readOnly', false);
                $('#chk_Lg_Kit_Venda_Diversas_Unidades_Medida').dxCheckBox("instance").option('readOnly', false);
            } else {
                $('#panelDependenciasKit').slideUp();

                $('#chk_Lg_Kit_Movimento_Estoque_Producao').dxCheckBox("instance").option('readOnly', true);
                $('#chk_Lg_Kit_Movimento_Estoque_Producao').dxCheckBox("instance").option('value', false);

                $('#chk_Lg_Kit_Venda_Diversas_Unidades_Medida').dxCheckBox("instance").option('readOnly', true);
                $('#chk_Lg_Kit_Venda_Diversas_Unidades_Medida').dxCheckBox("instance").option('value', false);
            };
        },
    });

    $('#chk_Lg_Kit_Movimento_Estoque_Producao').dxCheckBox({
        value: false,
        readOnly: true,
        text: "Movimenta estoque dos componentes no apontamento de produção do Kit",
    });

    $('#chk_Lg_Kit_Venda_Diversas_Unidades_Medida').dxCheckBox({
        value: false,
        readOnly: true,
        text: "Vendido em mais de uma unidade de medida",
    });

    $('#chk_Lg_Controla_Lote').dxCheckBox({
        value: false,
        text: "Lote - Controla estoque por lote do produto",

        onValueChanged: function (e) {

            if (e.value == true) {
                $('#panelDependenciasLote').slideDown();

                $('#chk_Lg_Controla_Validade_Lote').dxCheckBox("instance").option('readOnly', false);
                $('#chk_Lg_Reaproveita_Lote').dxCheckBox("instance").option('readOnly', false);
                $('#chk_Lg_Informa_Lote_Fabricante').dxCheckBox("instance").option('readOnly', false);
                $('#chk_Lg_Imprime_Lote_Etiqueta').dxCheckBox("instance").option('readOnly', false);
                $('#chk_Lg_Pneu').dxCheckBox("instance").option('readOnly', false);
            } else {
                $('#panelDependenciasLote').slideUp();

                $('#chk_Lg_Controla_Validade_Lote').dxCheckBox("instance").option('readOnly', true);
                $('#chk_Lg_Reaproveita_Lote').dxCheckBox("instance").option('readOnly', true);
                $('#chk_Lg_Informa_Lote_Fabricante').dxCheckBox("instance").option('readOnly', true);
                $('#chk_Lg_Imprime_Lote_Etiqueta').dxCheckBox("instance").option('readOnly', true);
                $('#chk_Lg_Pneu').dxCheckBox("instance").option('readOnly', true);

                $('#chk_Lg_Controla_Validade_Lote').dxCheckBox("instance").option('value', false);
                $('#chk_Lg_Reaproveita_Lote').dxCheckBox("instance").option('value', false);
                $('#chk_Lg_Informa_Lote_Fabricante').dxCheckBox("instance").option('value', false);
                $('#chk_Lg_Imprime_Lote_Etiqueta').dxCheckBox("instance").option('value', false);
                $('#chk_Lg_Pneu').dxCheckBox("instance").option('value', false);
            };
        },
    });

    $('#chk_Lg_Controla_Validade_Lote').dxCheckBox({
        value: false,
        readOnly: true,
        text: "Controla a validade do lote",
    });

    $('#chk_Lg_Reaproveita_Lote').dxCheckBox({
        value: false,
        readOnly: true,
        text: "Reaproveita lotes existentes no Recebimento da Mercadoria",
    });

    $('#chk_Lg_Informa_Lote_Fabricante').dxCheckBox({
        value: false,
        readOnly: true,
        text: "Permite registrar o lote do fabricante no Recebimento da Mercadoria",
    });

    $('#chk_Lg_Imprime_Lote_Etiqueta').dxCheckBox({
        value: false,
        readOnly: true,
        text: "Imprime o número do lote na etiqueta do produto",
    });

    $('#chk_Lg_Pneu').dxCheckBox({
        value: false,
        readOnly: true,
        text: "Pneu - Identifica este produto como pneu gerando um número de lote para cada unidade comprada",
    });


    $('#chk_Lg_Utiliza_Ordem_Servico_Produto').dxCheckBox({
        value: false,
        text: "Ordem de Produção - Cria uma ordem de serviço de produção após a venda deste produto",

        onValueChanged: function (e) {

            if (e.value == true) {
                $('#panelDependenciasOrdemProducao').slideDown();

                $('#chk_Lg_Obrigatorio_Detalhes_Producao_Pedido').dxCheckBox("instance").option('readOnly', false);
            } else {
                $('#panelDependenciasOrdemProducao').slideUp();

                $('#chk_Lg_Obrigatorio_Detalhes_Producao_Pedido').dxCheckBox("instance").option('readOnly', true);
                $('#chk_Lg_Obrigatorio_Detalhes_Producao_Pedido').dxCheckBox("instance").option('value', false);
            };
        },
    });

    $('#chk_Lg_Obrigatorio_Detalhes_Producao_Pedido').dxCheckBox({
        value: false,
        readOnly: true,
        text: "Obrigatório preencher campos de detalhes para produção no pedido de venda deste produto",
    });

    $('#chk_Lg_Permite_Informar_Quantidade_Conferencia').dxCheckBox({
        value: false,
        text: "Permite informar a quantidade para este produto no processo de conferência de seperação de mercadorias vendidas",
    });

    $('#chk_Lg_Preco_Definido_Na_Venda').dxCheckBox({
        value: false,
        text: "O preço deste produto será definido pelo vendedor na emissão do pedido de venda",
    });

    $('#chk_Lg_Exibir_Cod_Fabricante_Obs_NF').dxCheckBox({
        value: false,
        text: "Exibir o código do fabricante na observação do item na emissão da Nota Fiscal",
    });

    $('#chk_Lg_Venda_Somente_PF').dxCheckBox({
        value: false,
        text: "Aplicar controle sobre Pessoas Físicas",
    });

    $('#chk_Lg_Venda_Somente_PJ').dxCheckBox({
        value: false,
        text: "Aplicar controle sobre Pessoas Jurídicas",
    });

    $('#nbx_Qt_Maxima_Pedido_Venda_Mes').dxNumberBox({
        value: '',
        format: 'Máximo de ###,###,###,##0 pedidos por mês deste produto para cada cliente',
        min: 0,
        max: 9999999999,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        placeholder: 'Quantidade máximo de pedidos por mês deste produto para cada cliente',
        //labelMode: 'floating',
        //label: 'Quantidade máximo de pedidos por mês deste produto para cada cliente',
    });


    $('#chk_Lg_Bloquear_Impressao_Etiqueta_Recebimento').dxCheckBox({
        value: false,
        text: "Bloquear impressão automática de etiquetas de preço no Recebimento da Mercadoria",
    });

    $('#chk_Lg_Bloquear_Escrituracao_SPED').dxCheckBox({
        value: false,
        text: "Bloquear scrituração deste produto no arquivo SPED",
    });

    $('#nbx_IPI_Venda').dxNumberBox({
        value: '',
        format: '###,##0.## %',
        min: 0,
        max: 999999,
        showClearButton: true,
        showSpinButtons: false,
        step: 10,
        placeholder: 'IPI para Venda',
        labelMode: 'floating',
        label: 'IPI para Venda',
    });

    $('#nbx_Nr_Dias_Garantia').dxNumberBox({
        value: '',
        format: '###,### dias',
        min: 0,
        max: 999999,
        showClearButton: true,
        showSpinButtons: true,
        step: 10,
        placeholder: 'Tempo de Garantia',
        labelMode: 'floating',
        label: 'Tempo de Garantia',
    });

    $('#chk_Lg_Exibir_Pedido_Venda_Devolucao').dxCheckBox({
        value: false,
        text: "Obrigatório informar o número de pedido de origem na devolução deste produto",
    });


    $('#txt_Cd_Ativo').dxTextBox({
        labelMode: 'floating',
        label: 'Ativo',
        maxLength: 25,
    });

    $('#txt_Cd_Modelo').dxTextBox({
        labelMode: 'floating',
        label: 'Modelo',
        maxLength: 25,
    });

    $('#txt_Cd_Serie').dxTextBox({
        labelMode: 'floating',
        label: 'Modelo',
        maxLength: 25,
    });

    $('#txt_Ds_Pressao_Potencia').dxTextBox({
        labelMode: 'floating',
        label: 'Pressão/Portência',
        maxLength: 30,
    });

    $('#txt_Ds_Vazao').dxTextBox({
        labelMode: 'floating',
        label: 'Vazão',
        maxLength: 30,
    });

    $('#txt_Ds_Consumo').dxTextBox({
        labelMode: 'floating',
        label: 'Consumo',
        maxLength: 30,
    });

    $('#txt_Ds_Capacidade').dxTextBox({
        labelMode: 'floating',
        label: 'Capacidade',
        maxLength: 30,
    });

    $('#chk_Lg_Combustivel_Solvente').dxCheckBox({
        value: false,
        text: "Produto classificado como Combustível/Solvente",
    });

    var dataSourceGrandeza = [
        { CD_GRANDEZA: "1", DS_GRANDEZA: "Massa (KG)" },
        { CD_GRANDEZA: "2", DS_GRANDEZA: "Volume (LT)" },
    ];

    $('#lkp_Grandeza').dxLookup({
        dataSource: dataSourceGrandeza,
        searchExpr: ['DS_GRANDEZA'],
        displayExpr: 'DS_GRANDEZA',
        valueExpr: 'CD_GRANDEZA',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Grandeza',
        },
        labelMode: 'floating',
        label: 'Grandeza',
        placeholder: 'Grandeza',
        showClearButton: false,
    });

    $('#nbx_Qt_Medida_Grandeza').dxNumberBox({
        value: '',
        format: '###,###,###,###,##0.#####',
        min: 0,
        max: 999999999999.99999,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        placeholder: 'Medida da Grandeza',
        labelMode: 'floating',
        label: 'Medida da Grandeza',
    });

    $('#nbx_Cd_Caracteristica_Fisico_Quimica_ANP').dxNumberBox({
        value: '',
        format: '##,###',
        min: 0,
        max: 99999,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        placeholder: 'Característica',
        labelMode: 'floating',
        label: 'Característica',
    });

    $('#nbx_Cd_Metodo_Afericao_Caracteristica').dxNumberBox({
        value: '',
        format: '##,###',
        min: 0,
        max: 99999,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        placeholder: 'Método de Aferição',
        labelMode: 'floating',
        label: 'Método de Aferição',
    });

    $('#nbx_Vl_Caracteristica').dxNumberBox({
        value: '',
        format: '###,###,###,###,##0.#####',
        min: 0,
        max: 999999999999.99999,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        placeholder: 'Valor',
        labelMode: 'floating',
        label: 'Valor',
    });

    $('#nbx_Qt_Massa_Especifica').dxNumberBox({
        value: '',
        format: '###,###,###,###,##0.#####',
        min: 0,
        max: 999999999999.99999,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        placeholder: 'Massa Específica',
        labelMode: 'floating',
        label: 'Massa Específica',
    });


    //Filiais que o usuário possui acesso
    GetAzureDataSource(33, '{CD_STATUS: "A"}').then((result) => {

        if (result.success) {

            $('#tag_Filiais_Precificacao').dxTagBox({
                dataSource: result.data,
                searchEnabled: true,
                searchExpr: ['DS_PESQUISA'],
                cleanSearchOnOpening: true,
                displayExpr: 'DS_PESQUISA',
                valueExpr: 'CD_FILIAL',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'A precificação será aplicada nas Filiais',
                },
                labelMode: 'floating',
                label: 'A precificação será aplicada nas Filiais',
                placeholder: '',
                showClearButton: true,
                //applyValueMode: 'useButtons',
                applyValueMode: 'instantly',
                showSelectionControls: true,
                //value: [1,2,3]
            });
        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });


    $('#nbx_Pc_Desconto_Total').dxNumberBox({
        value: '',
        format: '###,###,###,##0.#####%',
        showClearButton: false,
        showSpinButtons: false,
        readOnly: true,
        //step: 1000,
        labelMode: 'floating',
        label: 'Desconto Total',
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                "color": "#415a77",
            });
        },
    });

    $('#nbx_Vl_Custo_Bruto').dxNumberBox({
        value: '',
        format: 'R$ ###,###,###,###,##0.00###',
        min: 0,
        max: 999999999999.99999,
        showClearButton: true,
        showSpinButtons: false,
        step: 1,
        placeholder: 'Custo Bruto sem Impostos e sem Desconto',
        labelMode: 'floating',
        label: 'Custo Bruto sem Impostos e sem Desconto',

        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                "color": "#415a77",
            });
        },
        onValueChanged: function (e) {
            var custoBruto = e.value;
            var pcDescontoTotal = $('#nbx_Pc_Desconto_Total').dxNumberBox('instance').option('value');
            var pcIPI = $('#nbx_Pc_Custo_IPI').dxNumberBox('instance').option('value');
            var pcCustoFrete = $('#nbx_Pc_Custo_Frete').dxNumberBox('instance').option('value');
            var pcCustoST = $('#nbx_Pc_Custo_ST').dxNumberBox('instance').option('value');
            var pcCustoOutros = $('#nbx_Pc_Custo_Outras_Custos').dxNumberBox('instance').option('value');

            if (pcDescontoTotal == null || pcDescontoTotal == undefined || pcDescontoTotal == '') {
                pcDescontoTotal = 0;
            }

            if (pcIPI == null || pcIPI == undefined || pcIPI == '') {
                $('#nbx_Pc_Custo_IPI').dxNumberBox('instance').option('value', 0);
            }

            if (pcCustoFrete == null || pcCustoFrete == undefined || pcCustoFrete == '') {
                $('#nbx_Pc_Custo_Frete').dxNumberBox('instance').option('value', 0);
            }

            if (pcCustoST == null || pcCustoST == undefined || pcCustoST == '') {
                $('#nbx_Pc_Custo_ST').dxNumberBox('instance').option('value', 0);
            }

            if (pcCustoOutros == null || pcCustoOutros == undefined || pcCustoOutros == '') {
                $('#nbx_Pc_Custo_Outras_Custos').dxNumberBox('instance').option('value', 0);
            }

            var descontoTotal = custoBruto * (pcDescontoTotal);
            var custoLiquido = custoBruto - descontoTotal;

            $('#nbx_Vl_Custo_Liquido').dxNumberBox('instance').option('value', custoLiquido);

            $('#labelCustoBruto').hide().text('R$ ' + e.value).fadeIn(500);
            $('#labelCustoLiquido').hide().text('R$ ' + custoLiquido).fadeIn(500);
        },
    });

    const dataSourceProdutoDescontosFornecedor = [
        { Id: 1, Valor: 10 },
        { Id: 2, Valor: 20 }
    ];

    $("#tgxDescontos").dxTagBox({
        items: dataSourceProdutoDescontosFornecedor,
        acceptCustomValue: true,
        displayExpr: "Valor",
        valueExpr: "Id",
        labelMode: 'floating',
        label: 'Digite % de desconto e tecle <Enter>',
        showClearButton: true,
        openOnFieldClick: false,
        onFocusOut: function (e) {
            let descontos = e.component.option("selectedItems").map((x) => x.Valor);
            let desconto = 0;

            if (descontos.length > 0) {
                desconto = 100;
                for (let x of descontos) {
                    desconto = desconto * (1 - x / 100);
                }
                //desconto = 100 - desconto;
                desconto = Number(parseFloat(100 - desconto).toFixed(2));
            }

            $("#nbx_Pc_Desconto_Total").dxNumberBox("instance").option("value", desconto / 100);

            console.log(desconto);
        },

        onCustomItemCreating(args) {

            if (!args.text) {
                args.customItem = null;
                return;
            }

            args.text = args.text.replace(",", ".");

            if (isNaN(parseFloat(args.text))) {
                args.customItem = null;
                return;
            }

            let valor = parseFloat(args.text);

            if (valor > 100 || valor < 0) {
                args.customItem = null;
                return;
            }

            const { component } = args;

            const currentItems = component.option("items");

            let nextId = currentItems.length == 0 ? 1
                : Math.max.apply(null, currentItems.map((x) => x.Id)) + 1;

            const newValue = { Id: nextId, Valor: valor };
            currentItems.unshift(newValue);

            component.option("items", currentItems);
            args.customItem = newValue;
        }
    });

    $('#nbx_Pc_Desconto_Total').dxNumberBox({
        value: '',
        format: '###,###,###,##0.#####%     ',
        showClearButton: false,
        showSpinButtons: false,
        readOnly: true,
        //step: 1000,
        labelMode: 'floating',
        label: 'Desconto Total do Fornecedor',
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                "color": "#415a77",
            });
        },
        onValueChanged: function (e) {
            var pcDescontoTotal = e.value;
            var custoBruto = $('#nbx_Vl_Custo_Bruto').dxNumberBox('instance').option('value');

            if (pcDescontoTotal == null || pcDescontoTotal == undefined || pcDescontoTotal == '') {
                pcDescontoTotal = 0;
            }

            var descontoTotal = custoBruto * (pcDescontoTotal);
            var custoLiquido = custoBruto - descontoTotal;

            $('#nbx_Vl_Custo_Liquido').dxNumberBox('instance').option('value', custoLiquido);
        },
    });

    $('#nbx_Vl_Custo_Liquido').dxNumberBox({
        value: '',
        format: 'R$ ###,###,###,###,##0.00###     ',
        min: 0,
        max: 999999999999.99999,
        showClearButton: true,
        showSpinButtons: false,
        step: 1,
        readOnly: true,
        placeholder: 'Custo Líquido sem Impostos',
        labelMode: 'floating',
        label: 'Custo Líquido sem Impostos',

        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                "color": "#415a77",
            });
        },
        onValueChanged: function (e) {
            var custoLiquido = e.value;
            var custoBruto = custoLiquido;
            var despesas = 0
            var pcCustoIPI = $('#nbx_Pc_Custo_IPI').dxNumberBox('instance').option('value');
            var pcCustoST = $('#nbx_Pc_Custo_ST').dxNumberBox('instance').option('value');
            var pcCustoFrete = $('#nbx_Pc_Custo_Frete').dxNumberBox('instance').option('value');
            var pcOutrosCustos = $('#nbx_Pc_Custo_Outras_Custos').dxNumberBox('instance').option('value');
            var pcLucro = $('#nbx_Pc_Lucro').dxNumberBox('instance').option('value');

            if (pcCustoIPI == null || pcCustoIPI == undefined || pcCustoIPI == '') {
                pcCustoIPI = 0;
            }

            if (pcCustoST == null || pcCustoST == undefined || pcCustoST == '') {
                pcCustoST = 0;
            }

            if (pcCustoFrete == null || pcCustoFrete == undefined || pcCustoFrete == '') {
                pcCustoFrete = 0;
            }

            if (pcOutrosCustos == null || pcOutrosCustos == undefined || pcOutrosCustos == '') {
                pcOutrosCustos = 0;
            }

            if (pcLucro == null || pcLucro == undefined || pcLucro == '') {
                pcLucro = 0;
            }

            var custoIPI = custoBruto * (pcCustoIPI);
            var custoST = custoBruto * (pcCustoST);
            var custoOutros = custoBruto * (pcOutrosCustos);

            //Verifica se o frete é calculo por percentual do custo bruto ou se é um valor fixo
            if (componenteBotaoNumberBox.component.option('text') == '%') {
                var custoFrete = custoBruto * (pcCustoFrete);
            } else {
                var custoFrete = pcCustoFrete
            }

            var custoTotal = custoBruto + custoIPI + custoST + despesas + custoFrete + custoOutros
            var precoMinimo = custoTotal * (1 + (pcLucro));

            $('#nbx_Vl_Custo_Total').dxNumberBox('instance').option('value', custoTotal);
            $('#nbx_Vl_Preco_Minimo_Venda').dxNumberBox('instance').option('value', precoMinimo);
        },
    });

    $('#nbx_Pc_Custo_IPI').dxNumberBox({
        value: '',
        format: '###,###,##0.#####%',
        min: 0,
        max: 999999999999.99999,
        showClearButton: true,
        showSpinButtons: false,
        step: 1,
        placeholder: '% IPI de Compra',
        labelMode: 'floating',
        label: '% IPI de Compra',
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                "color": "#415a77",
            });
        },
        onValueChanged: function (e) {
            var pcCustoIPI = e.value;
            var custoLiquido = $('#nbx_Vl_Custo_Liquido').dxNumberBox('instance').option('value');;
            var custoBruto = custoLiquido;
            var despesas = 0
            var pcCustoST = $('#nbx_Pc_Custo_ST').dxNumberBox('instance').option('value');
            var pcCustoFrete = $('#nbx_Pc_Custo_Frete').dxNumberBox('instance').option('value');
            var pcOutrosCustos = $('#nbx_Pc_Custo_Outras_Custos').dxNumberBox('instance').option('value');
            var pcLucro = $('#nbx_Pc_Lucro').dxNumberBox('instance').option('value');

            if (custoLiquido == null || custoLiquido == undefined || custoLiquido == '') {
                custoLiquido = 0;
                custoBruto = 0;
            }

            if (pcCustoIPI == null || pcCustoIPI == undefined || pcCustoIPI == '') {
                pcCustoIPI = 0;
            }

            if (pcCustoST == null || pcCustoST == undefined || pcCustoST == '') {
                pcCustoST = 0;
            }

            if (pcCustoFrete == null || pcCustoFrete == undefined || pcCustoFrete == '') {
                pcCustoFrete = 0;
            }

            if (pcOutrosCustos == null || pcOutrosCustos == undefined || pcOutrosCustos == '') {
                pcOutrosCustos = 0;
            }

            if (pcLucro == null || pcLucro == undefined || pcLucro == '') {
                pcLucro = 0;
            }

            var custoIPI = custoBruto * (pcCustoIPI);
            var custoST = custoBruto * (pcCustoST);
            var custoOutros = custoBruto * (pcOutrosCustos);

            //Verifica se o frete é calculo por percentual do custo bruto ou se é um valor fixo
            if (componenteBotaoNumberBox.component.option('text') == '%') {
                var custoFrete = custoBruto * (pcCustoFrete);
            } else {
                var custoFrete = pcCustoFrete
            }

            var custoTotal = custoBruto + custoIPI + custoST + despesas + custoFrete + custoOutros
            var precoMinimo = custoTotal * (1 + (pcLucro));

            $('#nbx_Vl_Custo_Total').dxNumberBox('instance').option('value', custoTotal);
            $('#nbx_Vl_Preco_Minimo_Venda').dxNumberBox('instance').option('value', precoMinimo);
        },
    });

    var valorReajuste = $('#nbx_Pc_Custo_Frete').dxNumberBox({
        value: '',
        format: '     ###,###,##0.#####%',
        min: 0,
        max: 999999999999.99999,
        showClearButton: false,
        showSpinButtons: false,
        step: 1,
        placeholder: '% Frete de Compra',
        labelMode: 'floating',
        label: '% Frete de Compra',
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                "color": "#415a77",
            });
        },

        buttons: [{
            name: 'currency',
            location: 'after',
            options: {
                text: '%',
                stylingMode: 'text',
                width: 40,
                elementAttr: {
                    class: 'currency',
                    class: 'botao-number-box',
                },
                onInitialized(e) {
                    //Seta a variável que representa o botão deste Number Box para que seja possível parametrizá-lo em outras funções fora do componente
                    componenteBotaoNumberBox = e;
                },
                onClick(e) {

                    //Seta a variável que representa o botão deste Number Box para que seja possível parametrizá-lo em outras funções fora do componente
                    componenteBotaoNumberBox = e;

                    //Chama função para reconfigurar o NumberBox
                    configuraNumberBoxCustoFrete(componenteBotaoNumberBox);
                },
            },
        }, 'clear', 'spins'],
        onChange(e) {
            //Valoriza variável com o conteúdo selecionado para utilizar fora da função do componente
            valorNumberBoxCustoFrete = e.component._changedValue;
            componenteValorReajuste = e;
        },
        onValueChanged: function (e) {
            var pcCustoFrete = e.value;
            var custoLiquido = $('#nbx_Vl_Custo_Liquido').dxNumberBox('instance').option('value');;
            var custoBruto = custoLiquido;
            var despesas = 0
            var pcCustoIPI = $('#nbx_Pc_Custo_IPI').dxNumberBox('instance').option('value');
            var pcCustoST = $('#nbx_Pc_Custo_ST').dxNumberBox('instance').option('value');
            var pcOutrosCustos = $('#nbx_Pc_Custo_Outras_Custos').dxNumberBox('instance').option('value');
            var pcLucro = $('#nbx_Pc_Lucro').dxNumberBox('instance').option('value');

            if (custoLiquido == null || custoLiquido == undefined || custoLiquido == '') {
                custoLiquido = 0;
                custoBruto = 0;
            }

            if (pcCustoIPI == null || pcCustoIPI == undefined || pcCustoIPI == '') {
                pcCustoIPI = 0;
            }

            if (pcCustoST == null || pcCustoST == undefined || pcCustoST == '') {
                pcCustoST = 0;
            }

            if (pcCustoFrete == null || pcCustoFrete == undefined || pcCustoFrete == '') {
                pcCustoFrete = 0;
            }

            if (pcOutrosCustos == null || pcOutrosCustos == undefined || pcOutrosCustos == '') {
                pcOutrosCustos = 0;
            }

            if (pcLucro == null || pcLucro == undefined || pcLucro == '') {
                pcLucro = 0;
            }

            var custoIPI = custoBruto * (pcCustoIPI);
            var custoST = custoBruto * (pcCustoST);
            var custoOutros = custoBruto * (pcOutrosCustos);

            //Verifica se o frete é calculo por percentual do custo bruto ou se é um valor fixo
            if (componenteBotaoNumberBox.component.option('text') == '%') {
                var custoFrete = custoBruto * (pcCustoFrete);
            } else {
                var custoFrete = pcCustoFrete
            }

            var custoTotal = custoBruto + custoIPI + custoST + despesas + custoFrete + custoOutros
            var precoMinimo = custoTotal * (1 + (pcLucro));

            $('#nbx_Vl_Custo_Total').dxNumberBox('instance').option('value', custoTotal);
            $('#nbx_Vl_Preco_Minimo_Venda').dxNumberBox('instance').option('value', precoMinimo);
        },
    }).dxNumberBox('instance');

    function configuraNumberBoxCustoFrete(e) {
        if (e.component.option('text') == '%') {
            e.component.option('text', 'R$');
            tipoValorReajuste = 'R$';
            valorReajuste.option('format', '     R$ ###,###,###,##0.00###');
            valorReajuste.option('label', 'Frete de Compra');
        } else {
            e.component.option('text', '%');
            tipoValorReajuste = '%';
            valorReajuste.option('format', '     ###,###,###,##0.#####%');
            valorReajuste.option('label', '% Frete de Compra');
        }

        valorNumberBoxCustoFrete = valorReajuste.option("text");
    };

    $('#nbx_Pc_Custo_ST').dxNumberBox({
        value: '',
        format: '###,###,##0.#####%',
        min: 0,
        max: 999999999999.99999,
        showClearButton: true,
        showSpinButtons: false,
        step: 1,
        placeholder: '% ST de Compra',
        labelMode: 'floating',
        label: '% ST de Compra',
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                "color": "#415a77",
            });
        },
        onValueChanged: function (e) {
            var pcCustoST = e.value;
            var custoLiquido = $('#nbx_Vl_Custo_Liquido').dxNumberBox('instance').option('value');;
            var custoBruto = custoLiquido;
            var despesas = 0
            var pcCustoIPI = $('#nbx_Pc_Custo_IPI').dxNumberBox('instance').option('value');
            var pcCustoFrete = $('#nbx_Pc_Custo_Frete').dxNumberBox('instance').option('value');
            var pcOutrosCustos = $('#nbx_Pc_Custo_Outras_Custos').dxNumberBox('instance').option('value');
            var pcLucro = $('#nbx_Pc_Lucro').dxNumberBox('instance').option('value');

            if (custoLiquido == null || custoLiquido == undefined || custoLiquido == '') {
                custoLiquido = 0;
                custoBruto = 0;
            }

            if (pcCustoIPI == null || pcCustoIPI == undefined || pcCustoIPI == '') {
                pcCustoIPI = 0;
            }

            if (pcCustoST == null || pcCustoST == undefined || pcCustoST == '') {
                pcCustoST = 0;
            }

            if (pcCustoFrete == null || pcCustoFrete == undefined || pcCustoFrete == '') {
                pcCustoFrete = 0;
            }

            if (pcOutrosCustos == null || pcOutrosCustos == undefined || pcOutrosCustos == '') {
                pcOutrosCustos = 0;
            }

            if (pcLucro == null || pcLucro == undefined || pcLucro == '') {
                pcLucro = 0;
            }

            var custoIPI = custoBruto * (pcCustoIPI);
            var custoST = custoBruto * (pcCustoST);
            var custoOutros = custoBruto * (pcOutrosCustos);

            //Verifica se o frete é calculo por percentual do custo bruto ou se é um valor fixo
            if (componenteBotaoNumberBox.component.option('text') == '%') {
                var custoFrete = custoBruto * (pcCustoFrete);
            } else {
                var custoFrete = pcCustoFrete
            }

            var custoTotal = custoBruto + custoIPI + custoST + despesas + custoFrete + custoOutros
            var precoMinimo = custoTotal * (1 + (pcLucro));

            $('#nbx_Vl_Custo_Total').dxNumberBox('instance').option('value', custoTotal);
            $('#nbx_Vl_Preco_Minimo_Venda').dxNumberBox('instance').option('value', precoMinimo);
        },
    });

    $('#nbx_Pc_Custo_Outras_Custos').dxNumberBox({
        value: '',
        format: '###,###,##0.#####%',
        min: 0,
        max: 999999999999.99999,
        showClearButton: true,
        showSpinButtons: false,
        step: 1,
        placeholder: '% Outros Custos',
        labelMode: 'floating',
        label: '% Outros Custos',
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                "color": "#415a77",
            });
        },
        onValueChanged: function (e) {
            var pcOutrosCustos = e.value;
            var pcCustoST = $('#nbx_Pc_Custo_ST').dxNumberBox('instance').option('value');
            var custoLiquido = $('#nbx_Vl_Custo_Liquido').dxNumberBox('instance').option('value');;
            var custoBruto = custoLiquido;
            var despesas = 0
            var pcCustoIPI = $('#nbx_Pc_Custo_IPI').dxNumberBox('instance').option('value');
            var pcCustoFrete = $('#nbx_Pc_Custo_Frete').dxNumberBox('instance').option('value');
            var pcLucro = $('#nbx_Pc_Lucro').dxNumberBox('instance').option('value');

            if (custoLiquido == null || custoLiquido == undefined || custoLiquido == '') {
                custoLiquido = 0;
                custoBruto = 0;
            }

            if (pcCustoIPI == null || pcCustoIPI == undefined || pcCustoIPI == '') {
                pcCustoIPI = 0;
            }

            if (pcCustoST == null || pcCustoST == undefined || pcCustoST == '') {
                pcCustoST = 0;
            }

            if (pcCustoFrete == null || pcCustoFrete == undefined || pcCustoFrete == '') {
                pcCustoFrete = 0;
            }

            if (pcOutrosCustos == null || pcOutrosCustos == undefined || pcOutrosCustos == '') {
                pcOutrosCustos = 0;
            }

            if (pcLucro == null || pcLucro == undefined || pcLucro == '') {
                pcLucro = 0;
            }

            var custoIPI = custoBruto * (pcCustoIPI);
            var custoST = custoBruto * (pcCustoST);
            var custoOutros = custoBruto * (pcOutrosCustos);

            //Verifica se o frete é calculo por percentual do custo bruto ou se é um valor fixo
            if (componenteBotaoNumberBox.component.option('text') == '%') {
                var custoFrete = custoBruto * (pcCustoFrete);
            } else {
                var custoFrete = pcCustoFrete
            }

            var custoTotal = custoBruto + custoIPI + custoST + despesas + custoFrete + custoOutros
            var precoMinimo = custoTotal * (1 + (pcLucro));

            $('#nbx_Vl_Custo_Total').dxNumberBox('instance').option('value', custoTotal);
            $('#nbx_Vl_Preco_Minimo_Venda').dxNumberBox('instance').option('value', precoMinimo);
        },
    });

    $('#nbx_Vl_Custo_Total').dxNumberBox({
        value: '',
        format: 'R$ ###,###,###,###,##0.00###      ',
        min: 0,
        max: 999999999999.99999,
        showClearButton: true,
        showSpinButtons: false,
        step: 1,
        placeholder: 'Custo com Impostos',
        labelMode: 'floating',
        label: 'Custo com Impostos',
        readOnly: true,
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                "color": "darkred",
                "back-ground": "darkred",
            });
        },
    });

    $('#nbx_Pc_Lucro').dxNumberBox({
        value: '',
        format: '###,###,##0.#####%',
        min: 0,
        max: 999999999999.99999,
        showClearButton: true,
        showSpinButtons: false,
        step: 1,
        placeholder: '% Lucro',
        labelMode: 'floating',
        label: '% Lucro',
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                "color": "#415a77",
            });
        },
        onValueChanged: function (e) {
            var pcLucro = e.value;
            var custoLiquido = $('#nbx_Vl_Custo_Liquido').dxNumberBox('instance').option('value');;
            var custoBruto = custoLiquido;
            var despesas = 0
            var pcCustoIPI = $('#nbx_Pc_Custo_IPI').dxNumberBox('instance').option('value');
            var pcCustoST = $('#nbx_Pc_Custo_ST').dxNumberBox('instance').option('value');
            var pcCustoFrete = $('#nbx_Pc_Custo_Frete').dxNumberBox('instance').option('value');
            var pcOutrosCustos = $('#nbx_Pc_Custo_Outras_Custos').dxNumberBox('instance').option('value');

            if (custoLiquido == null || custoLiquido == undefined || custoLiquido == '') {
                custoLiquido = 0;
                custoBruto = 0;
            }

            if (pcCustoIPI == null || pcCustoIPI == undefined || pcCustoIPI == '') {
                pcCustoIPI = 0;
            }

            if (pcCustoST == null || pcCustoST == undefined || pcCustoST == '') {
                pcCustoST = 0;
            }

            if (pcCustoFrete == null || pcCustoFrete == undefined || pcCustoFrete == '') {
                pcCustoFrete = 0;
            }

            if (pcOutrosCustos == null || pcOutrosCustos == undefined || pcOutrosCustos == '') {
                pcOutrosCustos = 0;
            }

            if (pcLucro == null || pcLucro == undefined || pcLucro == '') {
                pcLucro = 0;
            }


            var custoIPI = custoBruto * (pcCustoIPI);
            var custoST = custoBruto * (pcCustoST);
            var custoOutros = custoBruto * (pcOutrosCustos);

            //Verifica se o frete é calculo por percentual do custo bruto ou se é um valor fixo
            if (componenteBotaoNumberBox.component.option('text') == '%') {
                var custoFrete = custoBruto * (pcCustoFrete);
            } else {
                var custoFrete = pcCustoFrete
            }

            var custoTotal = custoBruto + custoIPI + custoST + despesas + custoFrete + custoOutros
            var precoMinimo = custoTotal * (1 + (pcLucro));
            var pcRentabilidade = (precoMinimo - custoTotal) / precoMinimo

            $('#nbx_Vl_Custo_Total').dxNumberBox('instance').option('value', custoTotal);
            $('#nbx_Vl_Preco_Minimo_Venda').dxNumberBox('instance').option('value', precoMinimo);
            //$('#nbx_Pc_Rentabilidade').dxNumberBox('instance').option('value', pcRentabilidade);
        },
    });

    $('#nbx_Pc_Rentabilidade').dxNumberBox({
        value: '',
        format: '###,###,##0.#####%',
        min: 0,
        max: 999999999999.99999,
        showClearButton: true,
        showSpinButtons: false,
        step: 1,
        placeholder: '% Rentabilidade',
        labelMode: 'floating',
        label: '% Rentabilidade',
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                "color": "#415a77",
            });
        },
        onValueChanged: function (e) {
            var pcRentabilidade = e.value;
            var custoLiquido = $('#nbx_Vl_Custo_Liquido').dxNumberBox('instance').option('value');;
            var custoBruto = custoLiquido;
            var despesas = 0
            var pcCustoIPI = $('#nbx_Pc_Custo_IPI').dxNumberBox('instance').option('value');
            var pcCustoST = $('#nbx_Pc_Custo_ST').dxNumberBox('instance').option('value');
            var pcCustoFrete = $('#nbx_Pc_Custo_Frete').dxNumberBox('instance').option('value');
            var pcOutrosCustos = $('#nbx_Pc_Custo_Outras_Custos').dxNumberBox('instance').option('value');

            if (custoLiquido == null || custoLiquido == undefined || custoLiquido == '') {
                custoLiquido = 0;
                custoBruto = 0;
            }

            if (pcCustoIPI == null || pcCustoIPI == undefined || pcCustoIPI == '') {
                pcCustoIPI = 0;
            }

            if (pcCustoST == null || pcCustoST == undefined || pcCustoST == '') {
                pcCustoST = 0;
            }

            if (pcCustoFrete == null || pcCustoFrete == undefined || pcCustoFrete == '') {
                pcCustoFrete = 0;
            }

            if (pcOutrosCustos == null || pcOutrosCustos == undefined || pcOutrosCustos == '') {
                pcOutrosCustos = 0;
            }

            if (pcLucro == null || pcLucro == undefined || pcLucro == '') {
                pcLucro = 0;
            }

            var custoIPI = custoBruto * (pcCustoIPI);
            var custoST = custoBruto * (pcCustoST);
            var custoOutros = custoBruto * (pcOutrosCustos);

            //Verifica se o frete é calculo por percentual do custo bruto ou se é um valor fixo
            if (componenteBotaoNumberBox.component.option('text') == '%') {
                var custoFrete = custoBruto * (pcCustoFrete);
            } else {
                var custoFrete = pcCustoFrete
            }

            var custoTotal = custoBruto + custoIPI + custoST + despesas + custoFrete + custoOutros
            var precoMinimo = custoTotal / (1 - (pcRentabilidade));
            var pcLucro = (precoMinimo - custoTotal) / custoTotal

            $('#nbx_Vl_Custo_Total').dxNumberBox('instance').option('value', custoTotal);
            $('#nbx_Vl_Preco_Minimo_Venda').dxNumberBox('instance').option('value', precoMinimo);
            //$('#nbx_Pc_Lucro').dxNumberBox('instance').option('value', pcLucro);
        },
    });

    $('#nbx_Vl_Preco_Minimo_Venda').dxNumberBox({
        value: '',
        format: 'R$ ###,###,###,###,##0.00###',
        min: 0,
        max: 999999999999.99999,
        showClearButton: true,
        showSpinButtons: false,
        step: 1,
        placeholder: 'Preço de Venda',
        //labelMode: 'floating',
        //label: 'Preço de Venda',
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "18px",
                "font-weight": "bold",
                "color": "#0077b6",
            });
        },
        onValueChanged: function (e) {
            var precoMinimo = e.value;
            var custoTotal = $('#nbx_Vl_Custo_Total').dxNumberBox('instance').option('value');;

            if (custoTotal == null || custoTotal == undefined || custoTotal == '') {
                custoTotal = 0;
            }

            if (custoTotal > 0) {
                var pcLucro = (precoMinimo - custoTotal) / custoTotal
            }

            if (precoMinimo > 0) {
                var pcRentabilidade = (precoMinimo - custoTotal) / precoMinimo
            }

            $('#nbx_Pc_Lucro').dxNumberBox('instance').option('value', pcLucro);
            $('#nbx_Pc_Rentabilidade').dxNumberBox('instance').option('value', pcRentabilidade);
        },
    });

    $('#btn_Salvar').dxButton({
        text: 'Salvar Dados Gerais',
        icon: 'save',
        type: 'success',
        onClick(e) {
            var validaNome = $('#txt_Ds_Produto').dxTextBox('instance').option('value');

            console.log('validaNome', validaNome);

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            if (validaNome == '' || validaNome == null) {
                $('#indicadorCadastroIncompleto').slideDown();
                $('#indicadorProntoComercializar').slideUp();
                $('#indicadorNovoProduto').slideUp();
            } else {
                $('#indicadorProntoComercializar').slideDown();
                $('#indicadorCadastroIncompleto').slideUp();
                $('#indicadorNovoProduto').slideUp();
            }

            $("#panelDadosGerais").removeClass("col-lg-12").addClass("col-lg-9");

            $('#panelFotoProduto').slideDown();
            $('#cardRadarPrecos').slideDown();
            ExibirEsconderPaineis('panelPrecificacao', 'none');
            ExibirEsconderPaineis('lkp_Situacao_Tributaria', 'none');
            ExibirEsconderPaineis('panelBotaoClonarProduto', 'block');

            //    const resultGeral = DevExpress.validationEngine.validateGroup("Geral");
            //    const resultEndereco = DevExpress.validationEngine.validateGroup("Endereco");

            //    if (resultGeral.isValid || resultEndereco.isValid) {

            //        new PNotify({
            //            title: 'Dados Gerais',
            //            text: 'Dados gravados com sucesso!',
            //            type: 'default'
            //        });

            //    } else {

            //        DevExpress.ui.notify({
            //            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
            //            type: 'error',
            //            displayTime: 5000,
            //        });
            //    }
        },
    });

    //REPLICAÇÃO DE PREÇOS - INÍCIO

    $('#chk_Lg_Replicar_Precos_Entre_Filiais').dxCheckBox({
        value: true,
        text: "Replicar Precificação",
        onValueChanged: function (e) {
            validaParametrosReplicaoPrecos();
        }
    });

    $('#chk_Lg_Replicar_Dados_Fiscais_Entre_Filiais').dxCheckBox({
        value: true,
        text: "Replicar Dados Fiscais",
        onValueChanged: function (e) {
            validaParametrosReplicaoPrecos();
        }
    });

    $('#chk_Lg_Replicar_Regras_Comerciais_Entre_Filiais').dxCheckBox({
        value: true,
        text: "Replicar Regras Comerciais",
        onValueChanged: function (e) {
            validaParametrosReplicaoPrecos();
        }
    });

    function validaParametrosReplicaoPrecos() {
        var precos = $('#chk_Lg_Replicar_Precos_Entre_Filiais').dxCheckBox('instance').option('value');
        var fiscal = $('#chk_Lg_Replicar_Dados_Fiscais_Entre_Filiais').dxCheckBox('instance').option('value');
        var comercial = $('#chk_Lg_Replicar_Regras_Comerciais_Entre_Filiais').dxCheckBox('instance').option('value');

        if (precos == false && fiscal == false && comercial == false) {
            $('#indicacaoReplicacaoAutomaticaPrecos').slideUp();
            $('#panelParametrosReplicacaoEntreFiliais').slideUp();
            $('#chk_Aplicar_Precos_Todas_Filiais').dxSwitch('instance').option('value', false);
        }
    }

    $('#chk_Aplicar_Precos_Todas_Filiais').dxSwitch({
        value: false,
        switchedOffText: 'NÃO',
        switchedOnText: 'SIM',
        width: '40px',
        onOptionChanged: function (e) {
            //    $('.dx-switch .dx-switch-off').css({
            //        'color': '#d00000',
            //    });
        },
        onValueChanged: function (e) {
            if (e.value) {
                $('#indicacaoReplicacaoAutomaticaPrecos').slideDown();
                $('#panelParametrosReplicacaoEntreFiliais').slideDown();

                $('#chk_Lg_Replicar_Precos_Entre_Filiais').dxCheckBox('instance').option('value', true);
                $('#chk_Lg_Replicar_Dados_Fiscais_Entre_Filiais').dxCheckBox('instance').option('value', true);
                $('#chk_Lg_Replicar_Regras_Comerciais_Entre_Filiais').dxCheckBox('instance').option('value', true);
            } else {
                $('#indicacaoReplicacaoAutomaticaPrecos').slideUp();
                $('#panelParametrosReplicacaoEntreFiliais').slideUp();

                $('#chk_Lg_Replicar_Precos_Entre_Filiais').dxCheckBox('instance').option('value', false);
                $('#chk_Lg_Replicar_Dados_Fiscais_Entre_Filiais').dxCheckBox('instance').option('value', false);
                $('#chk_Lg_Replicar_Regras_Comerciais_Entre_Filiais').dxCheckBox('instance').option('value', false);
            }
        }
    });

    //REPLICAÇÃO DE PREÇOS - TÉRMINO







    //#region [ Data Source ]

    //////////////////////////////////////////////////////
    // DATA SOURCES FIXOS
    //////////////////////////////////////////////////////
    var dataSourceAtuacao = [
        { CD_ATUACAO: 1, DS_ATUACAO: "Consumidor Final" },
        { CD_ATUACAO: 2, DS_ATUACAO: "Revendedor" },
        { CD_ATUACAO: 3, DS_ATUACAO: "Distribuidor" },
    ];

    var dataSourceTiposEnderecos = [
        { CD_TIPO_ENDERECO: 2, DS_TIPO_ENDERECO: "Comercial" },
        { CD_TIPO_ENDERECO: 3, DS_TIPO_ENDERECO: "Cobrança" },
        { CD_TIPO_ENDERECO: 4, DS_TIPO_ENDERECO: "Entrega" },
    ];

    var dataSourceFiltroConsultaDetalhada = [
        { CD_STATUS: 'A', DS_STATUS: "Ativos" },
        { CD_STATUS: 'I', DS_STATUS: "Inativos" },
        { CD_STATUS: null, DS_STATUS: "Todos" },
    ];

    var dataSourceOperacaoReajuste = [
        { CD_OPERACAO: "A", DS_OPERACAO: "Aumentar em", },
        { CD_OPERACAO: "R", DS_OPERACAO: "Reduzir em", },
    ];

    var dataSourceTipoDespacho = [
        { CD_ENTREGA: 1, DS_ENTREGA: "Retira Imediata", },
        { CD_ENTREGA: 2, DS_ENTREGA: "Entrega", },
        { CD_ENTREGA: 3, DS_ENTREGA: "Retira Futura", },
    ];

    var dataSourceTiposMovimentoContaCorrente = [
        { CD_TIPO_MOVIMENTO: 1, DS_TIPO_MOVIMENTO: 'DEVOLUÇÃO DE MERCADORIA', visible: false, },
        { CD_TIPO_MOVIMENTO: 2, DS_TIPO_MOVIMENTO: 'PEDIDO DE VENDA', visible: false, },
        { CD_TIPO_MOVIMENTO: 3, DS_TIPO_MOVIMENTO: 'RESTITUIÇÃO', visible: false, },
        { CD_TIPO_MOVIMENTO: 4, DS_TIPO_MOVIMENTO: 'CANCELAMENTO DE DEVOLUÇÃO', visible: false, },
        { CD_TIPO_MOVIMENTO: 5, DS_TIPO_MOVIMENTO: 'CANCELAMENTO DE PAGAMENTO', visible: false, },
        { CD_TIPO_MOVIMENTO: 6, DS_TIPO_MOVIMENTO: 'LANÇAMENTO AVULSO (CRÉDITO)', visible: true, },
        { CD_TIPO_MOVIMENTO: 7, DS_TIPO_MOVIMENTO: 'LANÇAMENTO AVULSO (DÉBITO)', visible: true, },
        { CD_TIPO_MOVIMENTO: 8, DS_TIPO_MOVIMENTO: 'LANÇAMENTO CRÉDITO CAIXA', visible: false, },
        { CD_TIPO_MOVIMENTO: 9, DS_TIPO_MOVIMENTO: 'CANCELAMENTO CRÉDITO CAIXA', visible: false, },
    ];

    //////////////////////////////////////////////////////
    // DATA SOURCES COM ORIGEM NO BANCO DE DADOS
    //////////////////////////////////////////////////////

    $('#txt_Usuario_Serasa').dxTextBox({
        labelMode: 'floating',
        label: 'Usuário Connect Serasa Experian',
        maxLength: 100,
    });

    const passwordEditor = $('#txt_Senha_Serasa').dxTextBox({
        placeholder: 'Senha Connect Serasa Experian',
        //labelMode: 'floating',
        //label: 'Senha para o serviço Connect Serasa Experian',
        maxLength: 100,
        mode: 'password',
        inputAttr: { 'aria-label': 'Password' },
        stylingMode: 'filled',
        buttons: [{
            name: 'password',
            location: 'after',
            options: {
                icon: '/img/visualizar-senha.png',
                type: 'default',
                onClick() {
                    passwordEditor.option('mode', passwordEditor.option('mode') === 'text' ? 'password' : 'text');
                },
            },
        }],
    }).dxTextBox('instance');

    const donwloadFiles = [
        {
            name: 'Documentos',
            isDirectory: true,
            items: [
                {
                    name: 'Custos.xlsx',
                    isDirectory: false,
                    size: 20480,
                },
                {
                    name: 'Crédito.pdf',
                    isDirectory: false,
                    size: 20480,
                },
                {
                    name: 'Precificação.xlsx',
                    isDirectory: false,
                    size: 20480,
                },
                {
                    name: 'Contrato.pdf',
                    isDirectory: false,
                    size: 437852000,
                },
                {
                    name: 'Pesquisa.docx',
                    isDirectory: false,
                    size: 2048,
                },
                {
                    name: 'Anotações.txt',
                    isDirectory: false,
                    size: 1024,
                },
                {
                    name: 'Promoções.xlsx',
                    isDirectory: false,
                    size: 20480,
                },
                {
                    name: 'Notas.rar',
                    isDirectory: false,
                    size: 1024,
                },
                {
                    name: 'Emails.zip',
                    isDirectory: false,
                    size: 1024,
                },
                {
                    name: 'NF-e.xml',
                    isDirectory: false,
                    size: 1024,
                },
            ],
        },
        {
            name: 'Imagens',
            isDirectory: true,
            items: [
                {
                    name: 'Logo.png',
                    isDirectory: false,
                    size: 20480,
                },
                {
                    name: 'Foto-obra.jpeg',
                    isDirectory: false,
                    size: 10240,
                },
                {
                    name: 'Fachada.bmp',
                    isDirectory: false,
                    size: 10240,
                },
            ],
        },
    ];


    //ESTÁ UTILIZANDO NO GRID DA ABA PRECIFICAÇÃO / PREÇO FIXO
    //GetAzureDataSource(22, '{ CD_FORMA_PAGAMENTO: 5, CD_STATUS: "A" }').then((result) => {
    var dataSourceCondicaoPagamentoPorForma = [

        { CD_FORMA_PAGAMENTO: 3, CD_CONDICAO_PAGAMENTO: 2, DS_FORMA_PAGAMENTO: "CARTÃO DE CRÉDITO", DS_CONDICAO_PAGAMENTO: "0 + 01 (2,19) PS", QT_PARCELAS: 1, CD_PESQUISA: "3|2", DS_PESQUISA: "1 Parcela - 0 + 01 (2,19) PS", },
        { CD_FORMA_PAGAMENTO: 3, CD_CONDICAO_PAGAMENTO: 4, DS_FORMA_PAGAMENTO: "CARTÃO DE CRÉDITO", DS_CONDICAO_PAGAMENTO: "0 + 02 (3,92) PS", QT_PARCELAS: 1, CD_PESQUISA: "3|4", DS_PESQUISA: "1 Parcela - 0 + 02 (3,92) PS", },
        { CD_FORMA_PAGAMENTO: 3, CD_CONDICAO_PAGAMENTO: 5, DS_FORMA_PAGAMENTO: "CARTÃO DE CRÉDITO", DS_CONDICAO_PAGAMENTO: "0 + 03 (4,63) PS", QT_PARCELAS: 1, CD_PESQUISA: "3|5", DS_PESQUISA: "1 Parcela - 0 + 03 (4,63) PS", },
        { CD_FORMA_PAGAMENTO: 3, CD_CONDICAO_PAGAMENTO: 91, DS_FORMA_PAGAMENTO: "CARTÃO DE CRÉDITO", DS_CONDICAO_PAGAMENTO: "0 + 04 (5,33) PS", QT_PARCELAS: 1, CD_PESQUISA: "3|91", DS_PESQUISA: "1 Parcela - 0 + 04 (5,33) PS", },
        { CD_FORMA_PAGAMENTO: 3, CD_CONDICAO_PAGAMENTO: 90, DS_FORMA_PAGAMENTO: "CARTÃO DE CRÉDITO", DS_CONDICAO_PAGAMENTO: "0 + 05 (6,02) PS", QT_PARCELAS: 1, CD_PESQUISA: "3|90", DS_PESQUISA: "1 Parcela - 0 + 05 (6,02) PS", },
        { CD_FORMA_PAGAMENTO: 3, CD_CONDICAO_PAGAMENTO: 89, DS_FORMA_PAGAMENTO: "CARTÃO DE CRÉDITO", DS_CONDICAO_PAGAMENTO: "0 + 06 (6,71) PS", QT_PARCELAS: 1, CD_PESQUISA: "3|89", DS_PESQUISA: "1 Parcela - 0 + 06 (6,71) PS", },
        { CD_FORMA_PAGAMENTO: 3, CD_CONDICAO_PAGAMENTO: 88, DS_FORMA_PAGAMENTO: "CARTÃO DE CRÉDITO", DS_CONDICAO_PAGAMENTO: "0 + 07 (7,45) PS", QT_PARCELAS: 1, CD_PESQUISA: "3|88", DS_PESQUISA: "1 Parcela - 0 + 07 (7,45) PS", },
        { CD_FORMA_PAGAMENTO: 3, CD_CONDICAO_PAGAMENTO: 87, DS_FORMA_PAGAMENTO: "CARTÃO DE CRÉDITO", DS_CONDICAO_PAGAMENTO: "0 + 08 (8,13) PS", QT_PARCELAS: 1, CD_PESQUISA: "3|87", DS_PESQUISA: "1 Parcela - 0 + 08 (8,13) PS", },
        { CD_FORMA_PAGAMENTO: 3, CD_CONDICAO_PAGAMENTO: 86, DS_FORMA_PAGAMENTO: "CARTÃO DE CRÉDITO", DS_CONDICAO_PAGAMENTO: "0 + 09 (8,79) PS", QT_PARCELAS: 1, CD_PESQUISA: "3|86", DS_PESQUISA: "1 Parcela - 0 + 09 (8,79) PS", },
        { CD_FORMA_PAGAMENTO: 3, CD_CONDICAO_PAGAMENTO: 22, DS_FORMA_PAGAMENTO: "CARTÃO DE CRÉDITO", DS_CONDICAO_PAGAMENTO: "0 + 10 (9,45) PS", QT_PARCELAS: 1, CD_PESQUISA: "3|22", DS_PESQUISA: "1 Parcela - 0 + 10 (9,45) PS", },

    ];

    //var dataSourceContaCorrenteCliente = [
    //    { NR_LANCAMENTO: 7, DT_MOVIMENTO: "2023-07-08 09:40:16.420", NR_DOCUMENTO: null, VL_MOVIMENTO: 1300.00, CD_LOGIN: 'ALBERTO', CD_TIPO_MOVIMENTO: 1, CD_FILIAL: 1, CD_CAIXA: null, DS_TIPO_MOVIMENTO: 'DEVOLUÇÃO DE MERCADORIA', DS_OBSERVACAO: 'SOBRA DE MERCADORIAS DA OBRA' },
    //    { NR_LANCAMENTO: 6, DT_MOVIMENTO: "2023-07-05 10:46:16.420", NR_DOCUMENTO: null, VL_MOVIMENTO: -4000.00, CD_LOGIN: 'AZURE', CD_TIPO_MOVIMENTO: 7, CD_FILIAL: null, CD_CAIXA: null, DS_TIPO_MOVIMENTO: 'LANÇAMENTO AVULSO (DÉBITO)', DS_OBSERVACAO: 'VALOR RESTITUÍDO PELO CLIENTE' },
    //    { NR_LANCAMENTO: 5, DT_MOVIMENTO: "2023-07-05 10:44:47.433", NR_DOCUMENTO: null, VL_MOVIMENTO: 5000.00, CD_LOGIN: 'AZURE', CD_TIPO_MOVIMENTO: 6, CD_FILIAL: null, CD_CAIXA: null, DS_TIPO_MOVIMENTO: 'LANÇAMENTO AVULSO (CRÉDITO)', DS_OBSERVACAO: 'CLIENTE INICIOU NOVA OBRA E PASSOU VALOR NO CARTÃO DE CRÉDITO PARA USO DE SEU EMPREITEIRO' },
    //    { NR_LANCAMENTO: 4, DT_MOVIMENTO: "2023-07-09 15:20:16.420", NR_DOCUMENTO: null, VL_MOVIMENTO: -600.37, CD_LOGIN: 'JOÃO', CD_TIPO_MOVIMENTO: 2, CD_FILIAL: 1, CD_CAIXA: 3, DS_TIPO_MOVIMENTO: 'PEDIDO DE VENDA', DS_OBSERVACAO: 'FATURAMENTO NO CAIXA DO PEDIDO DE VENDA NÚMERO 0003150606' },
    //    { NR_LANCAMENTO: 3, DT_MOVIMENTO: "2023-07-08 09:40:16.420", NR_DOCUMENTO: null, VL_MOVIMENTO: 1300.00, CD_LOGIN: 'ALBERTO', CD_TIPO_MOVIMENTO: 1, CD_FILIAL: 1, CD_CAIXA: null, DS_TIPO_MOVIMENTO: 'DEVOLUÇÃO DE MERCADORIA', DS_OBSERVACAO: 'SOBRA DE MERCADORIAS DA OBRA' },
    //    { NR_LANCAMENTO: 2, DT_MOVIMENTO: "2023-07-05 10:46:16.420", NR_DOCUMENTO: null, VL_MOVIMENTO: -4000.00, CD_LOGIN: 'AZURE', CD_TIPO_MOVIMENTO: 7, CD_FILIAL: null, CD_CAIXA: null, DS_TIPO_MOVIMENTO: 'LANÇAMENTO AVULSO (DÉBITO)', DS_OBSERVACAO: 'VALOR RESTITUÍDO PELO CLIENTE' },
    //    { NR_LANCAMENTO: 1, DT_MOVIMENTO: "2023-07-05 10:44:47.433", NR_DOCUMENTO: null, VL_MOVIMENTO: 5000.00, CD_LOGIN: 'AZURE', CD_TIPO_MOVIMENTO: 6, CD_FILIAL: null, CD_CAIXA: null, DS_TIPO_MOVIMENTO: 'LANÇAMENTO AVULSO (CRÉDITO)', DS_OBSERVACAO: 'CLIENTE INICIOU NOVA OBRA E PASSOU VALOR NO CARTÃO DE CRÉDITO PARA USO DE SEU EMPREITEIRO' },
    //];

    //var dataSourceClientes = [
    //    { CD_PESQUISA: "75776294800", DS_PESQUISA: "ADAIR ANTONIO DE PONTES | ADAIR ANTONIO DE PONTES | CNPJ: 75776294800" },
    //    { CD_PESQUISA: "01891374958", DS_PESQUISA: "ADAIR COSTA | ADAIR COSTA | CNPJ: 01891374958" },
    //    { CD_PESQUISA: "22247871895", DS_PESQUISA: "ADAIR COSTA | ADAIR COSTA | CNPJ: 22247871895" },
    //    { CD_PESQUISA: "20598253858", DS_PESQUISA: "ADAIR DA SILVA | ADAIR DA SILVA | CNPJ: 20598253858" },
    //    { CD_PESQUISA: "00039206823", DS_PESQUISA: "ADAIR GRASSOTTI MEDEIROS | ADAIR GRASSOTTI MEDEIROS | CNPJ: 00039206823" },
    //    { CD_PESQUISA: "13647980854", DS_PESQUISA: "ADAIR IGINO DA SOLVA | ADAIR IGINO DA SOLVA | CNPJ: 13647980854" },
    //    { CD_PESQUISA: "17921344879", DS_PESQUISA: "ADAIR JOSE DOS ANJOS | ADAIR JOSE DOS ANJOS | CNPJ: 17921344879" },
    //    { CD_PESQUISA: "05381789815", DS_PESQUISA: "ADAIR LAGO KIRA | ADAIR LAGO KIRA | CNPJ: 05381789815" },
    //    { CD_PESQUISA: "14077013801", DS_PESQUISA: "ADAIR LIBERATO DE OLIVEIRA | ADAIR LIBERATO DE OLIVEIRA | CNPJ: 14077013801" },
    //    { CD_PESQUISA: "28519966810", DS_PESQUISA: "ADAIR MACERDO SOBRINHO | ADAIR MACERDO SOBRINHO | CNPJ: 28519966810" },
    //    { CD_PESQUISA: "02888663805", DS_PESQUISA: "ADAIR NARCISIO GONÇALVES | ADAIR NARCISIO GONÇALVES | CNPJ: 02888663805" },
    //    { CD_PESQUISA: "60656824891", DS_PESQUISA: "ADAIR NASCIMENTO | ADAIR NASCIMENTO | CNPJ: 60656824891" },
    //    { CD_PESQUISA: "89260198887", DS_PESQUISA: "ADAIR RODRIGUES DO NASCIMENTO | ADAIR RODRIGUES DO NASCIMENTO | CNPJ: 89260198887" },
    //    { CD_PESQUISA: "63503778853", DS_PESQUISA: "ADAIR ROZENE SANTANA | ADAIR ROZENE SANTANA | CNPJ: 63503778853" },
    //    { CD_PESQUISA: "31495616800", DS_PESQUISA: "ADAIR SOARES | ADAIR SOARES | CNPJ: 31495616800" },
    //    { CD_PESQUISA: "17843979972", DS_PESQUISA: "ADAIR XAVIER DA SILVA | ADAIR XAVIER DA SILVA | CNPJ: 17843979972" },
    //    { CD_PESQUISA: "17251351838", DS_PESQUISA: "ADAIROP PEREIRA DOS SANTOS | ADAIROP PEREIRA DOS SANTOS | CNPJ: 17251351838" },
    //];

    //var dataSourceRamoAtividade = [
    //    { CD_RAMO_ATIVIDADE: 1, DS_RAMO_ATIVIDADE: "Consumidor", },
    //    { CD_RAMO_ATIVIDADE: 2, DS_RAMO_ATIVIDADE: "Empreiteiro", },
    //    { CD_RAMO_ATIVIDADE: 3, DS_RAMO_ATIVIDADE: "Comércio", },
    //    { CD_RAMO_ATIVIDADE: 4, DS_RAMO_ATIVIDADE: "Industria", },
    //];

    //var dataSourceCategoriaCliente = [
    //    { CD_CATEGORIA_CLIENTE: 1, DS_CATEGORIA_CLIENTE: "A", },
    //    { CD_CATEGORIA_CLIENTE: 2, DS_CATEGORIA_CLIENTE: "B", },
    //    { CD_CATEGORIA_CLIENTE: 3, DS_CATEGORIA_CLIENTE: "C", },
    //];

    //var dataSourceFormaCondicaoPagamento = [

    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 57, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "07 DIAS", QT_PARCELAS: 1, CD_PESQUISA: "6|57", DS_PESQUISA: "BOLETO - 1 Parcela - 07 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 61, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "14 DIAS", QT_PARCELAS: 1, CD_PESQUISA: "6|61", DS_PESQUISA: "BOLETO - 1 Parcela - 14 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 26, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "21 DIAS", QT_PARCELAS: 1, CD_PESQUISA: "6|26", DS_PESQUISA: "BOLETO - 1 Parcela - 21 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 84, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "21 DIAS", QT_PARCELAS: 1, CD_PESQUISA: "6|84", DS_PESQUISA: "BOLETO - 1 Parcela - 21 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 27, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "28 DIAS", QT_PARCELAS: 1, CD_PESQUISA: "6|27", DS_PESQUISA: "BOLETO - 1 Parcela - 28 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 83, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "A VISTA", QT_PARCELAS: 1, CD_PESQUISA: "6|83", DS_PESQUISA: "BOLETO - 1 Parcela - A VISTA", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 58, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "07/14 DIAS", QT_PARCELAS: 2, CD_PESQUISA: "6|58", DS_PESQUISA: "BOLETO - 2 Parcelas - 07/14 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 62, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "14/21 DIAS", QT_PARCELAS: 2, CD_PESQUISA: "6|62", DS_PESQUISA: "BOLETO - 2 Parcelas - 14/21 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 68, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "14/28 DIAS", QT_PARCELAS: 2, CD_PESQUISA: "6|68", DS_PESQUISA: "BOLETO - 2 Parcelas - 14/28 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 120, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "21/42 DD", QT_PARCELAS: 2, CD_PESQUISA: "6|120", DS_PESQUISA: "BOLETO - 2 Parcelas - 21/42 DD", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 72, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "28/35 DIAS", QT_PARCELAS: 2, CD_PESQUISA: "6|72", DS_PESQUISA: "BOLETO - 2 Parcelas - 28/35 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 77, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "28/42 DIAS", QT_PARCELAS: 2, CD_PESQUISA: "6|77", DS_PESQUISA: "BOLETO - 2 Parcelas - 28/42 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 59, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "07/14/21 DIAS", QT_PARCELAS: 3, CD_PESQUISA: "6|59", DS_PESQUISA: "BOLETO - 3 Parcelas - 07/14/21 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 63, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "14/21/28 DIAS", QT_PARCELAS: 3, CD_PESQUISA: "6|63", DS_PESQUISA: "BOLETO - 3 Parcelas - 14/21/28 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 69, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "14/28/42 DIAS", QT_PARCELAS: 3, CD_PESQUISA: "6|69", DS_PESQUISA: "BOLETO - 3 Parcelas - 14/28/42 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 73, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "28/35/42 DIAS", QT_PARCELAS: 3, CD_PESQUISA: "6|73", DS_PESQUISA: "BOLETO - 3 Parcelas - 28/35/42 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 78, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "28/42/56 DIAS", QT_PARCELAS: 3, CD_PESQUISA: "6|78", DS_PESQUISA: "BOLETO - 3 Parcelas - 28/42/56 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 60, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "07/14/21/28 DIAS", QT_PARCELAS: 4, CD_PESQUISA: "6|60", DS_PESQUISA: "BOLETO - 4 Parcelas - 07/14/21/28 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 64, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "14/21/28/35 DIAS", QT_PARCELAS: 4, CD_PESQUISA: "6|64", DS_PESQUISA: "BOLETO - 4 Parcelas - 14/21/28/35 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 70, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "14/28/42/56 DIAS", QT_PARCELAS: 4, CD_PESQUISA: "6|70", DS_PESQUISA: "BOLETO - 4 Parcelas - 14/28/42/56 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 74, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "28/35/42/49 DIAS", QT_PARCELAS: 4, CD_PESQUISA: "6|74", DS_PESQUISA: "BOLETO - 4 Parcelas - 28/35/42/49 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 65, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "14/21/28/35/42 DIAS", QT_PARCELAS: 5, CD_PESQUISA: "6|65", DS_PESQUISA: "BOLETO - 5 Parcelas - 14/21/28/35/42 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 71, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "14/28/42/56/70 DIAS", QT_PARCELAS: 5, CD_PESQUISA: "6|71", DS_PESQUISA: "BOLETO - 5 Parcelas - 14/28/42/56/70 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 75, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "28/35/42/49/56 DIAS", QT_PARCELAS: 5, CD_PESQUISA: "6|75", DS_PESQUISA: "BOLETO - 5 Parcelas - 28/35/42/49/56 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 66, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "14/21/28/35/42/49 DIAS", QT_PARCELAS: 6, CD_PESQUISA: "6|66", DS_PESQUISA: "BOLETO - 6 Parcelas - 14/21/28/35/42/49 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 76, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "28/35/42/49/56/63 DIAS", QT_PARCELAS: 6, CD_PESQUISA: "6|76", DS_PESQUISA: "BOLETO - 6 Parcelas - 28/35/42/49/56/63 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 67, DS_FORMA_PAGAMENTO: "BOLETO", DS_CONDICAO_PAGAMENTO: "14/21/28/35/42/49/56 DIAS", QT_PARCELAS: 7, CD_PESQUISA: "6|67", DS_PESQUISA: "BOLETO - 7 Parcelas - 14/21/28/35/42/49/56 DIAS", },
    //    { CD_FORMA_PAGAMENTO: 107, CD_CONDICAO_PAGAMENTO: 20, DS_FORMA_PAGAMENTO: "CARTÃO AMANCO", DS_CONDICAO_PAGAMENTO: "CARTAO AMANCO PARCELADO COM JUROS = 3,00%", QT_PARCELAS: 1, CD_PESQUISA: "107|20", DS_PESQUISA: "CARTÃO AMANCO - 1 Parcela - CARTAO AMANCO PARCELADO COM JUROS = 3,00%", },
    //    { CD_FORMA_PAGAMENTO: 107, CD_CONDICAO_PAGAMENTO: 79, DS_FORMA_PAGAMENTO: "CARTÃO AMANCO", DS_CONDICAO_PAGAMENTO: "CARTAO AMANCO ROTATIVO (PARCELA UNICA)", QT_PARCELAS: 1, CD_PESQUISA: "107|79", DS_PESQUISA: "CARTÃO AMANCO - 1 Parcela - CARTAO AMANCO ROTATIVO (PARCELA UNICA)", },
    //    { CD_FORMA_PAGAMENTO: 3, CD_CONDICAO_PAGAMENTO: 2, DS_FORMA_PAGAMENTO: "CARTÃO DE CRÉDITO", DS_CONDICAO_PAGAMENTO: "0 + 01 (2,19) PS", QT_PARCELAS: 1, CD_PESQUISA: "3|2", DS_PESQUISA: "CARTÃO DE CRÉDITO - 1 Parcela - 0 + 01 (2,19) PS", },
    //    { CD_FORMA_PAGAMENTO: 3, CD_CONDICAO_PAGAMENTO: 4, DS_FORMA_PAGAMENTO: "CARTÃO DE CRÉDITO", DS_CONDICAO_PAGAMENTO: "0 + 02 (3,92) PS", QT_PARCELAS: 1, CD_PESQUISA: "3|4", DS_PESQUISA: "CARTÃO DE CRÉDITO - 1 Parcela - 0 + 02 (3,92) PS", },
    //    { CD_FORMA_PAGAMENTO: 3, CD_CONDICAO_PAGAMENTO: 5, DS_FORMA_PAGAMENTO: "CARTÃO DE CRÉDITO", DS_CONDICAO_PAGAMENTO: "0 + 03 (4,63) PS", QT_PARCELAS: 1, CD_PESQUISA: "3|5", DS_PESQUISA: "CARTÃO DE CRÉDITO - 1 Parcela - 0 + 03 (4,63) PS", },
    //    { CD_FORMA_PAGAMENTO: 3, CD_CONDICAO_PAGAMENTO: 91, DS_FORMA_PAGAMENTO: "CARTÃO DE CRÉDITO", DS_CONDICAO_PAGAMENTO: "0 + 04 (5,33) PS", QT_PARCELAS: 1, CD_PESQUISA: "3|91", DS_PESQUISA: "CARTÃO DE CRÉDITO - 1 Parcela - 0 + 04 (5,33) PS", },
    //    { CD_FORMA_PAGAMENTO: 3, CD_CONDICAO_PAGAMENTO: 90, DS_FORMA_PAGAMENTO: "CARTÃO DE CRÉDITO", DS_CONDICAO_PAGAMENTO: "0 + 05 (6,02) PS", QT_PARCELAS: 1, CD_PESQUISA: "3|90", DS_PESQUISA: "CARTÃO DE CRÉDITO - 1 Parcela - 0 + 05 (6,02) PS", },
    //    { CD_FORMA_PAGAMENTO: 3, CD_CONDICAO_PAGAMENTO: 89, DS_FORMA_PAGAMENTO: "CARTÃO DE CRÉDITO", DS_CONDICAO_PAGAMENTO: "0 + 06 (6,71) PS", QT_PARCELAS: 1, CD_PESQUISA: "3|89", DS_PESQUISA: "CARTÃO DE CRÉDITO - 1 Parcela - 0 + 06 (6,71) PS", },
    //    { CD_FORMA_PAGAMENTO: 3, CD_CONDICAO_PAGAMENTO: 88, DS_FORMA_PAGAMENTO: "CARTÃO DE CRÉDITO", DS_CONDICAO_PAGAMENTO: "0 + 07 (7,45) PS", QT_PARCELAS: 1, CD_PESQUISA: "3|88", DS_PESQUISA: "CARTÃO DE CRÉDITO - 1 Parcela - 0 + 07 (7,45) PS", },
    //    { CD_FORMA_PAGAMENTO: 3, CD_CONDICAO_PAGAMENTO: 87, DS_FORMA_PAGAMENTO: "CARTÃO DE CRÉDITO", DS_CONDICAO_PAGAMENTO: "0 + 08 (8,13) PS", QT_PARCELAS: 1, CD_PESQUISA: "3|87", DS_PESQUISA: "CARTÃO DE CRÉDITO - 1 Parcela - 0 + 08 (8,13) PS", },
    //    { CD_FORMA_PAGAMENTO: 3, CD_CONDICAO_PAGAMENTO: 86, DS_FORMA_PAGAMENTO: "CARTÃO DE CRÉDITO", DS_CONDICAO_PAGAMENTO: "0 + 09 (8,79) PS", QT_PARCELAS: 1, CD_PESQUISA: "3|86", DS_PESQUISA: "CARTÃO DE CRÉDITO - 1 Parcela - 0 + 09 (8,79) PS", },
    //    { CD_FORMA_PAGAMENTO: 3, CD_CONDICAO_PAGAMENTO: 22, DS_FORMA_PAGAMENTO: "CARTÃO DE CRÉDITO", DS_CONDICAO_PAGAMENTO: "0 + 10 (9,45) PS", QT_PARCELAS: 1, CD_PESQUISA: "3|22", DS_PESQUISA: "CARTÃO DE CRÉDITO - 1 Parcela - 0 + 10 (9,45) PS", },
    //    { CD_FORMA_PAGAMENTO: 4, CD_CONDICAO_PAGAMENTO: 55, DS_FORMA_PAGAMENTO: "CARTÃO DE DÉBITO", DS_CONDICAO_PAGAMENTO: "A DEBITO (0,85)", QT_PARCELAS: 1, CD_PESQUISA: "4|55", DS_PESQUISA: "CARTÃO DE DÉBITO - 1 Parcela - A DEBITO (0,85)", },
    //    { CD_FORMA_PAGAMENTO: 10, CD_CONDICAO_PAGAMENTO: 1, DS_FORMA_PAGAMENTO: "CHEQUE DE TERCEIROS", DS_CONDICAO_PAGAMENTO: "A VISTA = 0%", QT_PARCELAS: 1, CD_PESQUISA: "10|1", DS_PESQUISA: "CHEQUE DE TERCEIROS - 1 Parcela - A VISTA = 0%", },
    //    { CD_FORMA_PAGAMENTO: 5, CD_CONDICAO_PAGAMENTO: 21, DS_FORMA_PAGAMENTO: "CONTA CORRENTE", DS_CONDICAO_PAGAMENTO: "CARTEIRA INTERNA (15)", QT_PARCELAS: 1, CD_PESQUISA: "5|21", DS_PESQUISA: "CONTA CORRENTE - 1 Parcela - CARTEIRA INTERNA (15)", },
    //    { CD_FORMA_PAGAMENTO: 5, CD_CONDICAO_PAGAMENTO: 14, DS_FORMA_PAGAMENTO: "CONTA CORRENTE", DS_CONDICAO_PAGAMENTO: "CTA CORRENTE", QT_PARCELAS: 1, CD_PESQUISA: "5|14", DS_PESQUISA: "CONTA CORRENTE - 1 Parcela - CTA CORRENTE", },
    //    { CD_FORMA_PAGAMENTO: 110, CD_CONDICAO_PAGAMENTO: 119, DS_FORMA_PAGAMENTO: "CRÉDITO DE CLIENTE", DS_CONDICAO_PAGAMENTO: "CREDITO DE CLIENTE", QT_PARCELAS: 1, CD_PESQUISA: "110|119", DS_PESQUISA: "CRÉDITO DE CLIENTE - 1 Parcela - CREDITO DE CLIENTE", },
    //    { CD_FORMA_PAGAMENTO: 109, CD_CONDICAO_PAGAMENTO: 83, DS_FORMA_PAGAMENTO: "DEPOSITO EM CONTA", DS_CONDICAO_PAGAMENTO: "A VISTA", QT_PARCELAS: 1, CD_PESQUISA: "109|83", DS_PESQUISA: "DEPOSITO EM CONTA - 1 Parcela - A VISTA", },
    //    { CD_FORMA_PAGAMENTO: 1, CD_CONDICAO_PAGAMENTO: 1, DS_FORMA_PAGAMENTO: "DINHEIRO", DS_CONDICAO_PAGAMENTO: "A VISTA = 0%", QT_PARCELAS: 1, CD_PESQUISA: "1|1", DS_PESQUISA: "DINHEIRO - 1 Parcela - A VISTA = 0%", },
    //    { CD_FORMA_PAGAMENTO: 7, CD_CONDICAO_PAGAMENTO: 6, DS_FORMA_PAGAMENTO: "FINANCEIRA", DS_CONDICAO_PAGAMENTO: "FINANCEIRA C/JUROS CHEQUE OU CARNE", QT_PARCELAS: 1, CD_PESQUISA: "7|6", DS_PESQUISA: "FINANCEIRA - 1 Parcela - FINANCEIRA C/JUROS CHEQUE OU CARNE", },
    //    { CD_FORMA_PAGAMENTO: 111, CD_CONDICAO_PAGAMENTO: 1, DS_FORMA_PAGAMENTO: "PIX - BRADESCO", DS_CONDICAO_PAGAMENTO: "A VISTA = 0%", QT_PARCELAS: 1, CD_PESQUISA: "111|1", DS_PESQUISA: "PIX - BRADESCO - 1 Parcela - A VISTA = 0%", },


    //];

    //var dataSourceEnderecosCliente = [

    //    { CD_CPF_CNPJ: "00008010000173", NR_SEQUENCIA: 1, CD_TIPO_ENDERECO: 4, DS_ENDERECO: "AL CHIBARAS", NR_ENDERECO: 21, DS_ENDERECO_COMPL: "RES 10", DS_BAIRRO: "ALPAHVILLE", DS_CIDADE: "SANTANA DE PARNAIBA", CD_UF: "SP", CD_CEP: "0", CD_STATUS: "A", CD_DDD_TELEFONE: 11, DS_TELEFONE: "41941772", CD_DDD_FAX: 11, DS_FAX: "41941772", DS_CONTATO: "RENATA", CD_REGIAO: 1, DS_PONTO_REFERENCIA: "EM FRENTE AO SHOPPING", CD_MUNICIPIO: 4496, },
    //    { CD_CPF_CNPJ: "00008010000173", NR_SEQUENCIA: 2, CD_TIPO_ENDERECO: 2, DS_ENDERECO: "AL CHIBARAS", NR_ENDERECO: 21, DS_ENDERECO_COMPL: "RES 10", DS_BAIRRO: "ALPAHVILLE", DS_CIDADE: "SANTANA DO PARNAIBA", CD_UF: "SP", CD_CEP: "0", CD_STATUS: "A", CD_DDD_TELEFONE: 11, DS_TELEFONE: "41941772", CD_DDD_FAX: 11, DS_FAX: "41941772", DS_CONTATO: "RENATA", CD_REGIAO: 2, DS_PONTO_REFERENCIA: "CRUZAMENTO COM SANTO AMARO", CD_MUNICIPIO: 4496, },
    //    { CD_CPF_CNPJ: "00008010000173", NR_SEQUENCIA: 3, CD_TIPO_ENDERECO: 3, DS_ENDERECO: "AV ANA COSTA - CONJ 601", NR_ENDERECO: 482, DS_ENDERECO_COMPL: "", DS_BAIRRO: "GONZAGA", DS_CIDADE: "SAO PAULO", CD_UF: "SP", CD_CEP: "0", CD_STATUS: "A", CD_DDD_TELEFONE: 11, DS_TELEFONE: "41941772", CD_DDD_FAX: 11, DS_FAX: "41941772", DS_CONTATO: "RENATA", CD_REGIAO: 3, DS_PONTO_REFERENCIA: "PERTO COBASE", CD_MUNICIPIO: 4849, },

    //];

    //var dataSourceRegiao = [
    //    { CD_REGIAO: 1, DS_REGIAO: "SP - Centro", },
    //    { CD_REGIAO: 2, DS_REGIAO: "SP - Litoral Norte", },
    //    { CD_REGIAO: 3, DS_REGIAO: "SP - Litoral Norte", },
    //    { CD_REGIAO: 4, DS_REGIAO: "SP - Litoral Sul", },
    //];

    //var dataSourceMunicipios = [
    //    { CD_MUNICIPIO: 16, DS_MUNICIPIO: "CAUCAIA - SP", CD_UF: 'SP' },
    //    { CD_MUNICIPIO: 32, DS_MUNICIPIO: "ADELANDIA - GO", CD_UF: 'GO' },
    //    { CD_MUNICIPIO: 40, DS_MUNICIPIO: "OSASCO - SP", CD_UF: 'SP' },
    //    { CD_MUNICIPIO: 50, DS_MUNICIPIO: "COTIA - SP", CD_UF: 'SP' },
    //    { CD_MUNICIPIO: 60, DS_MUNICIPIO: "ITAPEVI - SP", CD_UF: 'SP' },
    //    { CD_MUNICIPIO: 4496, DS_MUNICIPIO: "SANTANA DE PARNAIBA - SP", CD_UF: 'SP' },
    //    { CD_MUNICIPIO: 4849, DS_MUNICIPIO: "SAO PAULO - SP", CD_UF: 'SP' },
    //    { CD_MUNICIPIO: 80, DS_MUNICIPIO: "BARUERI - SP", CD_UF: 'SP' },
    //];

    //var dataSourceContaCorrenteCobranca = [

    //    { CD_CHAVE: "237|104|281216", DS_PESQUISA: "BRADESCO KPR COTIA - Banco: 237 / Agência: 104 / Conta: 281216-9", },
    //    { CD_CHAVE: "237|104|82980", DS_PESQUISA: "BRADESCO MEF - Banco: 237 / Agência: 104 / Conta: 82980-3", },
    //    { CD_CHAVE: "999|999|999", DS_PESQUISA: "CAIXA - Banco: 999 / Agência: 999 / Conta: 999-9", },
    //    { CD_CHAVE: "0|000|000", DS_PESQUISA: "CHEQUE DE TERCEIROS - Banco: 0 / Agência: 000 / Conta: 000-0", },
    //    { CD_CHAVE: "341|8215|14519", DS_PESQUISA: "ITAU KPR - Banco: 341 / Agência: 8215 / Conta: 14519-7", },
    //    { CD_CHAVE: "341|8215|14525", DS_PESQUISA: "ITAU MEF - Banco: 341 / Agência: 8215 / Conta: 14525-4", },
    //    { CD_CHAVE: "33|0389|013003593", DS_PESQUISA: "SANTANDER KPR - Banco: 33 / Agência: 0389 / Conta: 013003593-6", },
    //    { CD_CHAVE: "33|0389|013003604", DS_PESQUISA: "SANTANDER MEF - Banco: 33 / Agência: 0389 / Conta: 013003604-7", },
    //    { CD_CHAVE: "33|0389|013003594", DS_PESQUISA: "SANTANDER RK8 - Banco: 33 / Agência: 0389 / Conta: 013003594-3", },

    //];

    //var dataSourceTransportadoras = [
    //    { CD_PESQUISA: "3899", DS_PESQUISA: "MODULAR TRANSPORTES LTDA | MODULAR | CÓDIGO: 3899 | CNPJ: 88009030000371", },
    //    { CD_PESQUISA: "3417", DS_PESQUISA: "NENE FRETEIRO | NENE FRETEIRO | CÓDIGO: 3417", },
    //    { CD_PESQUISA: "3339", DS_PESQUISA: "TRANSLITORAL TRANSPORTES LTDA | TRANSLITORAL | CÓDIGO: 3339 | CNPJ: 10686362000131", },
    //    { CD_PESQUISA: "3333", DS_PESQUISA: "TRANSPORTADORA PANEX | PANEX | CÓDIGO: 3333 | CNPJ: 43025774000260", },
    //];

    //var dataSourceTabelaPreco = [
    //    { CD_PESQUISA: "A", NR_ORDEM: 0, DS_PESQUISA: "PREÇO PADRÃO", },
    //    { CD_PESQUISA: "B", NR_ORDEM: 1, DS_PESQUISA: "PREÇO B", },
    //    { CD_PESQUISA: "15", NR_ORDEM: 2, DS_PESQUISA: "TABELA E-COMMERCE", },
    //];


    //var dataSourceClientesConsultaDetalhada = [

    //    { DS_RAZAO_SOCIAL: "008 TRAMONTINA  COMERCIAL", DS_FANTASIA: "008 TRAMONTINA", DS_CONTATO: "11", CD_CPF_CNPJ: "61652608000195", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Comercio", DS_CATEGORIA_CLIENTE: "B", CD_TIPO_CPF_CNPJ: "J", CD_INSCRICAO_ESTADUAL: "141460879259", DS_TELEFONE: "(11) 11111111", DS_FAX: "(0) 00000000", DS_CELULAR_1: null, DS_CELULAR_2: null, DS_WHATSAPP: null, DS_EMAIL: "kel@azure.net.br;suporte@azure.net.br", DT_CADASTRO: "Aug  2 2006  8:18AM", DT_ATUALIZACAO: "Nov 24 2022 11:34AM", DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: "00", DS_OBS: null, DS_OBS_2: "", VL_SALDO_ATUAL_CONTA_CORRENTE: "1000.00", DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Sim", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "3 AMIGOS MAT PARA CONSTRUÇÃO LTDA. - ME", DS_FANTASIA: "3 AMIGOS MAT PARA CONSTRUÇÃO LTDA. - ME", DS_CONTATO: "EMERSON", CD_CPF_CNPJ: "63964894000150", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Comercio", DS_CATEGORIA_CLIENTE: "B", CD_TIPO_CPF_CNPJ: "J", CD_INSCRICAO_ESTADUAL: "278145240114", DS_TELEFONE: "(11) 46160552", DS_FAX: "(11) 46160551", DS_CELULAR_1: "", DS_CELULAR_2: "", DS_WHATSAPP: null, DS_EMAIL: "kel@azure.net.br;suporte@azure.net.br", DT_CADASTRO: "Mar  2 2009  2:06PM", DT_ATUALIZACAO: "Nov  5 2015 11:50AM", DT_NASCIMENTO_ABERTURA: "Jan  1 2000 12:00AM", DS_PROFISSAO: "", DS_OBS: null, DS_OBS_2: null, VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "ABEL VIEIRA DE OLIVEIRA FILHO", DS_FANTASIA: "ABEL VIEIRA DE OLIVEIRA FILHO", DS_CONTATO: "", CD_CPF_CNPJ: "20598225803", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "28051277", DS_TELEFONE: "", DS_FAX: null, DS_CELULAR_1: null, DS_CELULAR_2: null, DS_WHATSAPP: null, DS_EMAIL: "kel@azure.net.br;suporte@azure.net.br", DT_CADASTRO: "Mar 25 2008  1:20PM", DT_ATUALIZACAO: "Feb 20 2018 11:32AM", DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: "", DS_OBS: null, DS_OBS_2: "", VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "ADEMIR COINETE", DS_FANTASIA: "ADEMIR COINETE", DS_CONTATO: "ADEMIR COINET", CD_CPF_CNPJ: "15555543859", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "111111111111111", DS_TELEFONE: "(11) 4773 7334", DS_FAX: " ", DS_CELULAR_1: "", DS_CELULAR_2: "", DS_WHATSAPP: null, DS_EMAIL: "kel@azure.net.br;suporte@azure.net.br", DT_CADASTRO: "May  8 2007  9:36AM", DT_ATUALIZACAO: "Oct  5 2021  9:45AM", DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: null, DS_OBS: null, DS_OBS_2: null, VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "ALEXANDRE SILVA VOZA", DS_FANTASIA: "ALEXANDRE SILVA VOZA", DS_CONTATO: "ALEXANDRE", CD_CPF_CNPJ: "12558085867", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "175058799", DS_TELEFONE: "(11) 50710919", DS_FAX: null, DS_CELULAR_1: null, DS_CELULAR_2: null, DS_WHATSAPP: null, DS_EMAIL: "", DT_CADASTRO: "Oct 16 2019  8:23AM", DT_ATUALIZACAO: "Oct 16 2019  8:23AM", DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: "", DS_OBS: null, DS_OBS_2: "", VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "ANTONIO  ALVES  DA SILVA", DS_FANTASIA: "ANTONIO  ALVES  DA SILVA", DS_CONTATO: "ANTONIO", CD_CPF_CNPJ: "08595897816", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Sim", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "19223074", DS_TELEFONE: "(11) 4702-2708", DS_FAX: " ", DS_CELULAR_1: "", DS_CELULAR_2: "", DS_WHATSAPP: null, DS_EMAIL: "kel@azure.net.br;suporte@azure.net.br", DT_CADASTRO: "Oct 16 2006  5:23PM", DT_ATUALIZACAO: "Jul 26 2016  2:18PM", DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: "AUT", DS_OBS: null, DS_OBS_2: null, VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: "Boleto", DS_CONDICAO_PAGAMENTO: "25dd", CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "ANTONIO ROBERTO", DS_FANTASIA: "ANTONIO ROBERTO", DS_CONTATO: "99139454", CD_CPF_CNPJ: "18432263834", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Sim", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "184326834", DS_TELEFONE: "(11) 47037579", DS_FAX: "(0) ", DS_CELULAR_1: "", DS_CELULAR_2: "", DS_WHATSAPP: null, DS_EMAIL: "kel@azure.net.br;suporte@azure.net.br", DT_CADASTRO: "May 29 2006  4:47PM", DT_ATUALIZACAO: "Apr 22 2016  2:42PM", DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: "", DS_OBS: null, DS_OBS_2: null, VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "APARECIDO SERGIO DAVID", DS_FANTASIA: "APARECIDO SERGIO DAVID", DS_CONTATO: "", CD_CPF_CNPJ: "09451387846", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: null, DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "17241109", DS_TELEFONE: "", DS_FAX: " ", DS_CELULAR_1: null, DS_CELULAR_2: null, DS_WHATSAPP: null, DS_EMAIL: "kel@azure.net.br;suporte@azure.net.br", DT_CADASTRO: "Dec  7 2006  9:48AM", DT_ATUALIZACAO: null, DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: "", DS_OBS: null, DS_OBS_2: null, VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "CARLOS RIBEIRO DOS SANTOS", DS_FANTASIA: "CARLOS RIBEIRO DOS SANTOS", DS_CONTATO: "", CD_CPF_CNPJ: "14512391819", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: null, DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "239786543", DS_TELEFONE: "(11) 47027832  82947317", DS_FAX: " ", DS_CELULAR_1: null, DS_CELULAR_2: null, DS_WHATSAPP: null, DS_EMAIL: "kel@azure.net.br;suporte@azure.net.br", DT_CADASTRO: "Jan 25 2008 11:20AM", DT_ATUALIZACAO: null, DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: "", DS_OBS: null, DS_OBS_2: null, VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "CLAUDICEIA  PEREIRA DE SOUSA", DS_FANTASIA: "CLAUDICEIA  PEREIRA DE SOUSA", DS_CONTATO: "CLAUDICEIA", CD_CPF_CNPJ: "14500365893", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: null, DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "249085872", DS_TELEFONE: "(11) 37817636", DS_FAX: "(11) 37827633", DS_CELULAR_1: null, DS_CELULAR_2: null, DS_WHATSAPP: null, DS_EMAIL: "kel@azure.net.br;suporte@azure.net.br", DT_CADASTRO: "Aug 19 2006  1:58PM", DT_ATUALIZACAO: null, DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: "", DS_OBS: null, DS_OBS_2: null, VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "CLAUDIO RODRIGUES ", DS_FANTASIA: "CLAUDIO RODRIGUES ", DS_CONTATO: "CLAUDIO RODRIGUES ", CD_CPF_CNPJ: "05035937000116", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: null, DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "e-Commerce", CD_TIPO_CPF_CNPJ: "J", CD_INSCRICAO_ESTADUAL: "116362557110", DS_TELEFONE: null, DS_FAX: null, DS_CELULAR_1: null, DS_CELULAR_2: null, DS_WHATSAPP: null, DS_EMAIL: "1117931106@mail.mercadolivre.com", DT_CADASTRO: "May 30 2023  4:52PM", DT_ATUALIZACAO: "May 30 2023  4:52PM", DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: null, DS_OBS: null, DS_OBS_2: null, VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Sim", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "CONSUMIDOR", DS_FANTASIA: "CONSUMIDOR", DS_CONTATO: "ARARA", CD_CPF_CNPJ: "00000000000", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "547.78", VL_LIMITE_DISPONIVEL: "-547.78", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "246610786", DS_TELEFONE: "(11) 46880400", DS_FAX: null, DS_CELULAR_1: null, DS_CELULAR_2: null, DS_WHATSAPP: null, DS_EMAIL: "kel@azure.net.br;suporte@azure.net.br", DT_CADASTRO: "Jul 21 2005  1:42AM", DT_ATUALIZACAO: "Jan 19 2023 12:39PM", DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: "", DS_OBS: null, DS_OBS_2: "", VL_SALDO_ATUAL_CONTA_CORRENTE: "551000.00", DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Sim", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "DONIZETE ALVES DE SOUSA", DS_FANTASIA: "DONIZETE ALVES DE SOUSA", DS_CONTATO: "", CD_CPF_CNPJ: "03241839842", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: null, DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "132028669", DS_TELEFONE: "", DS_FAX: " ", DS_CELULAR_1: null, DS_CELULAR_2: null, DS_WHATSAPP: null, DS_EMAIL: "kel@azure.net.br;suporte@azure.net.br", DT_CADASTRO: "Nov 29 2007  9:04AM", DT_ATUALIZACAO: null, DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: "", DS_OBS: null, DS_OBS_2: null, VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "DONIZETE FERREIRA DE ANDRADE", DS_FANTASIA: "DONIZETE FERREIRA DE ANDRADE", DS_CONTATO: "DONIZETE", CD_CPF_CNPJ: "13442050898", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Sim", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Construtora", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "24816823x", DS_TELEFONE: "(11) 41583991", DS_FAX: "(11) 9773-4955", DS_CELULAR_1: "", DS_CELULAR_2: "", DS_WHATSAPP: null, DS_EMAIL: "kel@azure.net.br;suporte@azure.net.br", DT_CADASTRO: "Nov  3 2005  4:17PM", DT_ATUALIZACAO: "Jun 20 2018  4:07PM", DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: null, DS_OBS: null, DS_OBS_2: null, VL_SALDO_ATUAL_CONTA_CORRENTE: "100.00", DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: "Conta Corrente", DS_CONDICAO_PAGAMENTO: "A PRAZO", CD_TRANSPORTADORA: "055", DS_RAZAO_SOCIAL_TRANSPORTADORA: "DISTRIBUIDORA ZAGO LTDA", LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "JOSE DA SILVA", DS_FANTASIA: "JOSE DA SILVA", DS_CONTATO: "", CD_CPF_CNPJ: "86304410891", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Construtora", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "16545454155", DS_TELEFONE: "(11) 12345678", DS_FAX: null, DS_CELULAR_1: null, DS_CELULAR_2: null, DS_WHATSAPP: null, DS_EMAIL: "", DT_CADASTRO: "Nov 10 2021  3:34PM", DT_ATUALIZACAO: "Nov 10 2021  3:35PM", DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: "CONSTRUTOR", DS_OBS: null, DS_OBS_2: "", VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "JOSÉ FRANCISCO DE PAULA FILHO", DS_FANTASIA: "JOSÉ FRANCISCO DE PAULA FILHO", DS_CONTATO: "FRANCISCO", CD_CPF_CNPJ: "06136358840", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Sim", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Prestador Serviço Individual", DS_CATEGORIA_CLIENTE: "CONSUMIDOR", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "183271804", DS_TELEFONE: "(11) 41419193", DS_FAX: "(11) 44444444", DS_CELULAR_1: "(11) 969078796", DS_CELULAR_2: "", DS_WHATSAPP: null, DS_EMAIL: "jose.francisco@azure.net.br", DT_CADASTRO: "Mar 30 2017 11:15AM", DT_ATUALIZACAO: "Jun 16 2022 12:38PM", DT_NASCIMENTO_ABERTURA: "Jan  1 1900 12:00AM", DS_PROFISSAO: "Prestador", DS_OBS: "Antes de efetuar a entrega ligar para 11 96907-8796  Entregar somente na parte da tarde", DS_OBS_2: null, VL_SALDO_ATUAL_CONTA_CORRENTE: "0.00", DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: "Dinheiro", DS_CONDICAO_PAGAMENTO: "A VISTA", CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Sim", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Sim", LG_OBS_CLIENTE_PEDIDO_VENDA: "Sim", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "JOSE ROBERTO FERNANDES", DS_FANTASIA: "JOSE ROBERTO FERNANDES", DS_CONTATO: "JOSE", CD_CPF_CNPJ: "02868384862", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "2149750", DS_TELEFONE: "(11) 71325492", DS_FAX: "(11) 71325492", DS_CELULAR_1: null, DS_CELULAR_2: null, DS_WHATSAPP: null, DS_EMAIL: "kel@azure.net.br;suporte@azure.net.br", DT_CADASTRO: "Jan  5 2006 12:00PM", DT_ATUALIZACAO: "Jul 14 2014 10:19AM", DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: "", DS_OBS: null, DS_OBS_2: "", VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "JOSE SERGIO", DS_FANTASIA: "JOSE SERGIO", DS_CONTATO: "JOSE", CD_CPF_CNPJ: "01307776841", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: null, DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "139640277", DS_TELEFONE: "(11) 46167508", DS_FAX: null, DS_CELULAR_1: null, DS_CELULAR_2: null, DS_WHATSAPP: null, DS_EMAIL: "kel@azure.net.br;suporte@azure.net.br", DT_CADASTRO: "Jun 10 2006  8:44AM", DT_ATUALIZACAO: "Aug 11 2008 10:55AM", DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: "", DS_OBS: null, DS_OBS_2: null, VL_SALDO_ATUAL_CONTA_CORRENTE: "10.00", DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "JOSELIO DOS SANTOS", DS_FANTASIA: "JOSELIO DOS SANTOS", DS_CONTATO: "JOSELIO", CD_CPF_CNPJ: "15557612831", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Comercio", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "237273196", DS_TELEFONE: "(11) 4158-6876", DS_FAX: "(0) ", DS_CELULAR_1: "", DS_CELULAR_2: "", DS_WHATSAPP: null, DS_EMAIL: "joselio@azure.net.br", DT_CADASTRO: "Nov 18 2005  8:06AM", DT_ATUALIZACAO: "Sep  9 2021 12:11PM", DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: "GERENTE", DS_OBS: null, DS_OBS_2: "1111", VL_SALDO_ATUAL_CONTA_CORRENTE: "0.00", DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "JUNIO SCHMEISK", DS_FANTASIA: "JUNIO SCHMEISK", DS_CONTATO: "JUNIO", CD_CPF_CNPJ: "06826362821", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Prestador Serviço Individual", DS_CATEGORIA_CLIENTE: "CONSUMIDOR", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "176600036", DS_TELEFONE: "(11) 988657432", DS_FAX: null, DS_CELULAR_1: "(11) 992186978", DS_CELULAR_2: null, DS_WHATSAPP: null, DS_EMAIL: "junio@azure.net.br", DT_CADASTRO: "Aug 26 2017  8:15PM", DT_ATUALIZACAO: "Mar  2 2018 10:20AM", DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: "Representante", DS_OBS: null, DS_OBS_2: "Teste no Sistema em 21.02.2018", VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "KENELY CRISTINA DE OLIVEIRA", DS_FANTASIA: "KENELY CRISTINA DE OLIVEIRA", DS_CONTATO: "KENELY", CD_CPF_CNPJ: "36033894847", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Sim", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "CONSUMIDOR", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "278027089114", DS_TELEFONE: "(11) 46184403", DS_FAX: "(11) 46184403", DS_CELULAR_1: "(11) 971498317", DS_CELULAR_2: "(11) 999365621", DS_WHATSAPP: null, DS_EMAIL: "kenely.oliveira@gmail.com", DT_CADASTRO: "Oct  2 2012 10:30AM", DT_ATUALIZACAO: "Nov 29 2017  9:00AM", DT_NASCIMENTO_ABERTURA: "Nov  4 1990 12:00AM", DS_PROFISSAO: "NULL", DS_OBS: "AUTORIZAÇÃO DE LANÇAMENTO    EU,  Roberto Molina                                   Portador do Doc. Nr: 24.611.589/0001-05    Cooperado da: A2 TRANSPORTE LTDA                     Titular do Prefixo: 78955    Atesto para os devidos fins que o fornecimento e/ou serviços foram solicitados por minha pessoa, que estou inteiramente de acordo com os valores e o que foi descrito na OS acima.    Autorizo a WBUS a lançar em meu extrato o Valor citado acima referente ao fornecimento e/ou serviços.                           _______________________________________________________                                                              Assinatura do Cooperado                     Atesto para os devidos fins que as informações contida nesta autorização               São verdadeiras e de total responsabilidade do Fornecedor / Prestador de Serviços.                                  __________________________________  Assinatura do Diretor Responsável pelo Setor / Departamento Origem:                                        Avenida de Pinedo, 768 - Socorro - São Paulo - Sp                                         E-mail : financeiro@wbusautopecas.com.br", DS_OBS_2: "OBSERVAÇÃO NÃO DESTACADA", VL_SALDO_ATUAL_CONTA_CORRENTE: "50.00", DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: "DÉBITO BRADESCO", DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: "055", DS_RAZAO_SOCIAL_TRANSPORTADORA: "DISTRIBUIDORA ZAGO LTDA", LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Sim", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Sim", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Sim", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Sim", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Sim", LG_NAO_CONTRIBUINTE_ICMS: "Sim", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Sim", LG_OBS_CLIENTE_PEDIDO_VENDA: "Sim", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "KONECRANES DEMAG BRASIL LTDA", DS_FANTASIA: "KONECRANES", DS_CONTATO: "KONE", CD_CPF_CNPJ: "10.405.464/000", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "J", CD_INSCRICAO_ESTADUAL: "278.308.361.119", DS_TELEFONE: "(11) 46794564", DS_FAX: " ", DS_CELULAR_1: null, DS_CELULAR_2: null, DS_WHATSAPP: null, DS_EMAIL: "", DT_CADASTRO: "Jun  2 2021  4:58PM", DT_ATUALIZACAO: null, DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: "", DS_OBS: null, DS_OBS_2: "", VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "LAURO SERGIO DA SILVA", DS_FANTASIA: "LAURO SERGIO DA SILVA", DS_CONTATO: "", CD_CPF_CNPJ: "04035060852", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: null, DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "15188911", DS_TELEFONE: "(11) 4612-9418", DS_FAX: "(0) ", DS_CELULAR_1: null, DS_CELULAR_2: null, DS_WHATSAPP: null, DS_EMAIL: "kel@azure.net.br;suporte@azure.net.br", DT_CADASTRO: "Jun 17 2006  9:47AM", DT_ATUALIZACAO: null, DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: "AUT", DS_OBS: null, DS_OBS_2: null, VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "MARA CAMARGO (CARLAO CAMARGO)", DS_FANTASIA: "CARLAO CAMARGO", DS_CONTATO: "NOELY 4148-3479", CD_CPF_CNPJ: "04837727808", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "13898446", DS_TELEFONE: "(11) 47034419", DS_FAX: "(0) NULL", DS_CELULAR_1: "", DS_CELULAR_2: "", DS_WHATSAPP: null, DS_EMAIL: "kel@azure.net.br;suporte@azure.net.br", DT_CADASTRO: "Aug 22 2005  4:34PM", DT_ATUALIZACAO: "Oct  6 2016 11:14AM", DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: null, DS_OBS: null, DS_OBS_2: null, VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "MARIA DE FÁTIMA LIMA DOS SANTOS", DS_FANTASIA: "MARIA DE FÁTIMA LIMA DOS SANTOS", DS_CONTATO: "MESMO", CD_CPF_CNPJ: "26160999850", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: null, DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "25086972", DS_TELEFONE: "(11) 9908-4873", DS_FAX: "(0) NULL", DS_CELULAR_1: null, DS_CELULAR_2: null, DS_WHATSAPP: null, DS_EMAIL: "kel@azure.net.br;suporte@azure.net.br", DT_CADASTRO: "Jun 21 2006  5:13PM", DT_ATUALIZACAO: "Jul 18 2006 10:15AM", DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: "", DS_OBS: null, DS_OBS_2: null, VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "MARIA JOAQUINA DA SILVA XAVIER", DS_FANTASIA: "MARIA JOAQUINA DA SILVA XAVIER", DS_CONTATO: null, CD_CPF_CNPJ: "33322255511", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "1234567890", DS_TELEFONE: "(11) 99090909", DS_FAX: null, DS_CELULAR_1: null, DS_CELULAR_2: null, DS_WHATSAPP: null, DS_EMAIL: "email@email.com", DT_CADASTRO: "May 16 2023  7:10PM", DT_ATUALIZACAO: "May 16 2023  7:10PM", DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: null, DS_OBS: null, DS_OBS_2: null, VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "MARIO SERGIO DOS SANTOS", DS_FANTASIA: "MARIO SERGIO DOS SANTOS", DS_CONTATO: "MARIO", CD_CPF_CNPJ: "04733393822", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: null, DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "1111111111", DS_TELEFONE: "(11) 0000000000000", DS_FAX: "(0) 00000000000", DS_CELULAR_1: null, DS_CELULAR_2: null, DS_WHATSAPP: null, DS_EMAIL: "kel@azure.net.br;suporte@azure.net.br", DT_CADASTRO: "Feb 29 2008  2:50PM", DT_ATUALIZACAO: null, DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: "", DS_OBS: null, DS_OBS_2: null, VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "MAURO SERGIO LOPES DE OLIVEIRA", DS_FANTASIA: "MAURO SERGIO LOPES DE OLIVEIRA", DS_CONTATO: "MAURO", CD_CPF_CNPJ: "17738298820", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: null, DS_RAMO_ATIVIDADE: "Comercio", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "29641970", DS_TELEFONE: "(11) 41428701", DS_FAX: "(0) ", DS_CELULAR_1: null, DS_CELULAR_2: null, DS_WHATSAPP: null, DS_EMAIL: "kel@azure.net.br;suporte@azure.net.br", DT_CADASTRO: "Aug  2 2006  8:44AM", DT_ATUALIZACAO: null, DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: "", DS_OBS: null, DS_OBS_2: null, VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "MOREIRA LIMA", DS_FANTASIA: "MOREIRA LIMA", DS_CONTATO: "MOREIRA", CD_CPF_CNPJ: "34354024071", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "180560268", DS_TELEFONE: "(11) 987654321", DS_FAX: " ", DS_CELULAR_1: "(11) 987654321", DS_CELULAR_2: "(11) 987654321", DS_WHATSAPP: null, DS_EMAIL: "teste@tesc.com.br", DT_CADASTRO: "Jun 25 2021  3:22PM", DT_ATUALIZACAO: null, DT_NASCIMENTO_ABERTURA: "Nov 17 1987 12:00AM", DS_PROFISSAO: "Administrador de Emp", DS_OBS: null, DS_OBS_2: "", VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "NACIONAL GAS BUTANO DISTRIBUIDORA LTDA", DS_FANTASIA: "NACIONAL GAS ARACAJU/SE", DS_CONTATO: "EDIVAN", CD_CPF_CNPJ: "06980064003440", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Revendedor", DS_RAMO_ATIVIDADE: "Comercio", DS_CATEGORIA_CLIENTE: null, CD_TIPO_CPF_CNPJ: "J", CD_INSCRICAO_ESTADUAL: "270582932", DS_TELEFONE: "(85) 34668444", DS_FAX: " ", DS_CELULAR_1: "", DS_CELULAR_2: "", DS_WHATSAPP: null, DS_EMAIL: null, DT_CADASTRO: "Mar 23 2020  9:05AM", DT_ATUALIZACAO: "Mar 23 2020  9:05AM", DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: null, DS_OBS: null, DS_OBS_2: null, VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "PAULO SERGIO BATISTA", DS_FANTASIA: "PAULO SERGIO BATISTA", DS_CONTATO: "SERGIO", CD_CPF_CNPJ: "14509095821", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Sim", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "248169889", DS_TELEFONE: "(11) 41482755", DS_FAX: "(0) ", DS_CELULAR_1: "", DS_CELULAR_2: "", DS_WHATSAPP: null, DS_EMAIL: "kel@azure.net.br;suporte@azure.net.br", DT_CADASTRO: "Mar 14 2006  5:07PM", DT_ATUALIZACAO: "Aug 29 2019  8:34PM", DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: null, DS_OBS: null, DS_OBS_2: null, VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "ROBERTO  MUNIZ  SILVA", DS_FANTASIA: "ROBERTO  MUNIZ  SILVA", DS_CONTATO: "ROBERTO", CD_CPF_CNPJ: "65800036500", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "292778223", DS_TELEFONE: "(11) 95853489", DS_FAX: "(11) 95853489", DS_CELULAR_1: "", DS_CELULAR_2: "", DS_WHATSAPP: null, DS_EMAIL: "kel@azure.net.br;suporte@azure.net.br", DT_CADASTRO: "Jun 23 2007  4:19PM", DT_ATUALIZACAO: "Jun 16 2016 12:54PM", DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: null, DS_OBS: "teste 1", DS_OBS_2: "teste 2", VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "ROBERTO FERNANDES DE OLIVEIRA", DS_FANTASIA: "ROBERTO FERNANDES DE OLIVEIRA", DS_CONTATO: "MIGUEL", CD_CPF_CNPJ: "25776379857", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Sim", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Comercio", DS_CATEGORIA_CLIENTE: "B", CD_TIPO_CPF_CNPJ: "F", CD_INSCRICAO_ESTADUAL: "24611583", DS_TELEFONE: "(11) 36059456", DS_FAX: " ", DS_CELULAR_1: "", DS_CELULAR_2: "", DS_WHATSAPP: null, DS_EMAIL: "kel@azure.net.br;suporte@azure.net.br", DT_CADASTRO: "Jan  5 2010  4:14PM", DT_ATUALIZACAO: "Apr  5 2018  5:46PM", DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: "-", DS_OBS: null, DS_OBS_2: null, VL_SALDO_ATUAL_CONTA_CORRENTE: "0.00", DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Sim", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Sim", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "SOUTHCO BRASIL COMPONENTES INDUSTRIAIS LTDA.", DS_FANTASIA: "SOUTHCO BRASIL COMPONENTES INDUSTRIAIS LTDA.", DS_CONTATO: "BRUNO", CD_CPF_CNPJ: "15.414.616/000", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Consumidor", DS_CATEGORIA_CLIENTE: "A", CD_TIPO_CPF_CNPJ: "J", CD_INSCRICAO_ESTADUAL: "278.202.331.119", DS_TELEFONE: "(11) 47474747", DS_FAX: " ", DS_CELULAR_1: null, DS_CELULAR_2: null, DS_WHATSAPP: null, DS_EMAIL: "", DT_CADASTRO: "Jun  2 2021  5:05PM", DT_ATUALIZACAO: null, DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: "", DS_OBS: null, DS_OBS_2: "", VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "TEAMWORK EXPRESS TRASNPORTES LTDA - EPP", DS_FANTASIA: "TEAMWORK EXPRESS TRASNPORTES LTDA - EPP", DS_CONTATO: "THIAGO / CAROLINA", CD_CPF_CNPJ: "60409075000152", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Comercio", DS_CATEGORIA_CLIENTE: null, CD_TIPO_CPF_CNPJ: "J", CD_INSCRICAO_ESTADUAL: "190123126112", DS_TELEFONE: "(11) 2427-1032", DS_FAX: "(11) 2427-1038", DS_CELULAR_1: "(11) 991941469", DS_CELULAR_2: "(11) 2091-5481", DS_WHATSAPP: null, DS_EMAIL: "kel@azure.net.br;suporte@azure.net.br", DT_CADASTRO: "Oct 27 2016 10:56AM", DT_ATUALIZACAO: "Oct 27 2016 10:56AM", DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: null, DS_OBS: "SEMPRE COM NOTA FISCAL E BOLETO", DS_OBS_2: "CONSULTAS OK  SERASA OK 147854 27/10/2016", VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //    { DS_RAZAO_SOCIAL: "VIQUA INDUSTRIA DE PLASTICOS LTDA", DS_FANTASIA: "VIQUA", DS_CONTATO: "-", CD_CPF_CNPJ: "00477761000139", DS_STATUS: "Ativo", LG_CONTROLA_LIMITE_CREDITO: "Não", VL_LIMITE_CREDITO: "0.00", VL_LIMITE_UTILIZADO: "0.00", VL_LIMITE_DISPONIVEL: "0.00", DS_CLIENTE_ATUACAO: "Consumidor Final", DS_RAMO_ATIVIDADE: "Comercio", DS_CATEGORIA_CLIENTE: null, CD_TIPO_CPF_CNPJ: "J", CD_INSCRICAO_ESTADUAL: "252986466", DS_TELEFONE: "(47) 30259999", DS_FAX: " ", DS_CELULAR_1: "", DS_CELULAR_2: "", DS_WHATSAPP: null, DS_EMAIL: null, DT_CADASTRO: "Mar  3 2022  1:07PM", DT_ATUALIZACAO: "Mar  3 2022  1:07PM", DT_NASCIMENTO_ABERTURA: null, DS_PROFISSAO: null, DS_OBS: null, DS_OBS_2: null, VL_SALDO_ATUAL_CONTA_CORRENTE: null, DS_TABELA_PRECO: null, DS_FORMA_PAGAMENTO: null, DS_CONDICAO_PAGAMENTO: null, CD_TRANSPORTADORA: null, DS_RAZAO_SOCIAL_TRANSPORTADORA: null, LG_CAPTACAO_ECOMMERCE: "Não", LG_CADASTRADO_SUFRAMA: "Não", LG_ENVIAR_CARTORIO: "Não", LG_ENVIO_EMAIL_ORCAMENTO: "Não", LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: "Não", LG_ENVIO_EMAIL_PEDIDO_FATURADO: "Não", LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: "Não", LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: "Não", LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: "Não", LG_NAO_CONTRIBUINTE_ICMS: "Não", LG_NAO_EFETUA_CALCULO_FCP: "Não", LG_OBS_CLIENTE_NF: "Não", LG_OBS_CLIENTE_PEDIDO_VENDA: "Não", LG_OPTANTE_SIMPLES: "Não", LG_ORGAO_PUBLICO: "Não", LG_SUBSTITUICAO_TRIBUTARIA: "Não", },
    //];

    //var dataSourceCompradoresAutorizados = [
    //    { CD_CPF_CNPJ: "8045805", CD_CPF_COMPRADOR: "16560168859", DS_ENDERECO: "ASSIS VALENTE", CD_RG: "366547891", NR_ENDERECO: 123, DS_ENDERECO_COMPL: null, CD_DDD_TEELFONE: 11, DS_TELEFONE: "46162123", DS_BAIRRO: "MIRANTE DA MATA", DS_CIDADE: "COTIA", CD_UF: "SP", CD_CEP: "6720120", DS_EMAIL: null, VL_LIMITE_COMPRA: 600.00, DT_CADASTRO: "2016-03-02 12:42", DS_NOME_COMPRADOR: "ANTONIO CARLOS SILVA", DS_NOME_AUTORIZANTE: "MARIA JOAO	MARIA JOAO", CD_STATUS: "A", DS_OBSERVACAO: null, DT_ATUALIZACAO: "2016-03-02 12: 42", },
    //    { CD_CPF_CNPJ: "39848045805", CD_CPF_COMPRADOR: "32383736848", DS_ENDERECO: "ADIB AUADA", CD_RG: "356096658", NR_ENDERECO: 35, DS_ENDERECO_COMPL: "SALA 309C", CD_DDD_TEELFONE: 11, DS_TELEFONE: "46172727", DS_BAIRRO: "JARDIM LAMBRETA", DS_CIDADE: "COTIA", CD_UF: "SP", CD_CEP: "6710700", DS_EMAIL: "joao@uol.com.br", VL_LIMITE_COMPRA: 500.00, DT_CADASTRO: "2016-03-02 12:26", DS_NOME_COMPRADOR: "JOSÉ CARLOS SOLTO", DS_NOME_AUTORIZANTE: "EMERSON CAMPOS", CD_STATUS: "A", DS_OBSERVACAO: "TESTE.", DT_ATUALIZACAO: "2016-03-02 12: 26", },
    //];


    //var dataSourceProdutos = [

    //    { CD_EMPRESA: 7, CD_PRODUTO: "2102230", DS_PRODUTO: "ABRAC NYLON 100MM 8872", DS_MARCA: null, DS_FAMILIA: "ELETRICO", CD_FORNECEDOR: "001", DS_RAZAO_SOCIAL: "INTERGODO COMERCIAL ELETRÔNICA LTDA", DS_FANTASIA: "INTERGODO", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: "7896565988722", CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "1403.00000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "PP6-0000032", DS_PRODUTO: "ABRAC NYLON 35MM", DS_MARCA: null, DS_FAMILIA: "BASICO", CD_FORNECEDOR: "987890029", DS_RAZAO_SOCIAL: "FEITO EM CASA MATERIAIS DE LIMPEZA LTDA.", DS_FANTASIA: "HANDMADE PRODUTOS DE LIMPEZA", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "38140090", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "0.50000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0199714", DS_PRODUTO: "ABRAC RS FIMD  3/4 A 1      13", DS_MARCA: null, DS_FAMILIA: "FERRAGENS", CD_FORNECEDOR: "142", DS_RAZAO_SOCIAL: "ANCORA CHUMBADORES LTDA", DS_FANTASIA: "ANCORA", CD_CURVA_ABC: "B", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "20.40000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "898971", DS_PRODUTO: "ABRACADEIRA CROMO", DS_MARCA: "BRASILEIRA", DS_FAMILIA: "BASICO", CD_FORNECEDOR: "129", DS_RAZAO_SOCIAL: "3RM INDUSTRIA DE TINTAS E VERNIZES", DS_FANTASIA: "3RM", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: "eeee", CD_EAN_PRODUTO: "7898596511221", CD_NCM: "39269090", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "4.48050", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "01043AB", DS_PRODUTO: "ABRACADEIRA NYLON 2", DS_MARCA: "AZURE", DS_FAMILIA: "BASICO", CD_FORNECEDOR: "129", DS_RAZAO_SOCIAL: "3RM INDUSTRIA DE TINTAS E VERNIZES", DS_FANTASIA: "3RM", CD_CURVA_ABC: "A", CD_FABRICANTE: "FAB123456", CD_ORIGINAL: null, CD_OPCIONAL: "JJJJJ", CD_EAN_PRODUTO: null, CD_NCM: "32091010", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "734.04000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "01043A", DS_PRODUTO: "ABRACADEIRA NYLON 2 - CARGA", DS_MARCA: "QUARTOZULITTTTT", DS_FAMILIA: "BASICO", CD_FORNECEDOR: "129", DS_RAZAO_SOCIAL: "3RM INDUSTRIA DE TINTAS E VERNIZES", DS_FANTASIA: "3RM", CD_CURVA_ABC: "A", CD_FABRICANTE: "FAB123456", CD_ORIGINAL: null, CD_OPCIONAL: "JJJJJ", CD_EAN_PRODUTO: "7891025102113", CD_NCM: "32091010", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "218.73250", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "010308", DS_PRODUTO: "ABRACADEIRA NYLON 2 - CARGA", DS_MARCA: null, DS_FAMILIA: "TINTAS", CD_FORNECEDOR: "011", DS_RAZAO_SOCIAL: "ALBA ADESIVOS INDÚSTRIA E COMÉRCIO LTDA", DS_FANTASIA: "ALBA", CD_CURVA_ABC: "D", CD_FABRICANTE: "02755ABC", CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: "7899640204601", CD_NCM: "72142000", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "110.90000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "PP6-0000041", DS_PRODUTO: "ABRACADEIRA NYLON 22222222222", DS_MARCA: null, DS_FAMILIA: "BASICO", CD_FORNECEDOR: "149", DS_RAZAO_SOCIAL: "CAMARGO CORREA CIMENTOS SA", DS_FANTASIA: "CAUE / MINERCOLA", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "85444900", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "16.05000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "2266197", DS_PRODUTO: "ABRAÇADEIRA NYLON PRETO", DS_MARCA: null, DS_FAMILIA: "FERRAGENS", CD_FORNECEDOR: "987890007", DS_RAZAO_SOCIAL: "AZURE SOLUCOES EM INFORMATICA LTDA", DS_FANTASIA: "AZURE", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "98.00000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "PP6-0000014", DS_PRODUTO: "ABRACADEIRA TESTE", DS_MARCA: null, DS_FAMILIA: "BASICO", CD_FORNECEDOR: "145", DS_RAZAO_SOCIAL: "REPLAST ARTEFATOS PLÁSTICOS LTDA", DS_FANTASIA: "REPLAST", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "38140090", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "8.50000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "01043AA", DS_PRODUTO: "ABRACADEIRA TESTE ABRACADEIRA TESTE ABRACADEIRA TESTE ABRACA", DS_MARCA: null, DS_FAMILIA: "BASICO", CD_FORNECEDOR: "129", DS_RAZAO_SOCIAL: "3RM INDUSTRIA DE TINTAS E VERNIZES", DS_FANTASIA: "3RM", CD_CURVA_ABC: "C", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: "-102030", CD_EAN_PRODUTO: "7896023600081", CD_NCM: "85362000", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "1156.64110", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "1850037", DS_PRODUTO: "AC 50  8.0-5/16  4.7KB B12A15", DS_MARCA: null, DS_FAMILIA: "BASICO", CD_FORNECEDOR: "1231", DS_RAZAO_SOCIAL: "JOÃO DA SILVA", DS_FANTASIA: "JOÃO DA SILVA", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "25.00000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "1952092", DS_PRODUTO: "ACRO 00204 40X40 PRETO P3 2FL", DS_MARCA: null, DS_FAMILIA: "REVESTIMENTO 02", CD_FORNECEDOR: "129", DS_RAZAO_SOCIAL: "3RM INDUSTRIA DE TINTAS E VERNIZES", DS_FANTASIA: "3RM", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: "7891592172212", CD_NCM: "32081020", LG_FORA_LINHA: "FL", DS_COLOR_FORA_LINHA: "#f26419", VL_PRECO_MINIMO_VENDA: "32.78000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "1952085", DS_PRODUTO: "ACRO 00205 40X40 BRANCO P4 2FL", DS_MARCA: null, DS_FAMILIA: "REVESTIMENTO 02", CD_FORNECEDOR: "129", DS_RAZAO_SOCIAL: "3RM INDUSTRIA DE TINTAS E VERNIZES", DS_FANTASIA: "3RM", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: "7891435035469", CD_NCM: "76090000", LG_FORA_LINHA: "FL", DS_COLOR_FORA_LINHA: "#f26419", VL_PRECO_MINIMO_VENDA: "98.32000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "1953097", DS_PRODUTO: "ACRO 00437 45X45 BEGE P4 2FL", DS_MARCA: null, DS_FAMILIA: "REVESTIMENTO 02", CD_FORNECEDOR: "129", DS_RAZAO_SOCIAL: "3RM INDUSTRIA DE TINTAS E VERNIZES", DS_FANTASIA: "3RM", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: "7891435064131", CD_NCM: "85366910", LG_FORA_LINHA: "FL", DS_COLOR_FORA_LINHA: "#f26419", VL_PRECO_MINIMO_VENDA: "157.21000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "1952105", DS_PRODUTO: "ACRO 10070 40X40 CINZA P4 2FL", DS_MARCA: null, DS_FAMILIA: "REVESTIMENTO 02", CD_FORNECEDOR: "195", DS_RAZAO_SOCIAL: "EMBRAMACO EMPRESA BRASILEIRA MATS P/ CONSTRUCAO", DS_FANTASIA: "CEPAR", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: "7899092153656", CD_NCM: "40169300", LG_FORA_LINHA: "FL", DS_COLOR_FORA_LINHA: "#f26419", VL_PRECO_MINIMO_VENDA: "22.20000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "1952136", DS_PRODUTO: "ACRO 10076 40X40 BEGE P4 2", DS_MARCA: null, DS_FAMILIA: "REVESTIMENTO 02", CD_FORNECEDOR: "195", DS_RAZAO_SOCIAL: "EMBRAMACO EMPRESA BRASILEIRA MATS P/ CONSTRUCAO", DS_FANTASIA: "CEPAR", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "FL", DS_COLOR_FORA_LINHA: "#f26419", VL_PRECO_MINIMO_VENDA: "22.20000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "1952112", DS_PRODUTO: "ACRO 13070 30X40 CINZA P3 2FL", DS_MARCA: null, DS_FAMILIA: "REVESTIMENTO 02", CD_FORNECEDOR: "195", DS_RAZAO_SOCIAL: "EMBRAMACO EMPRESA BRASILEIRA MATS P/ CONSTRUCAO", DS_FANTASIA: "CEPAR", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "FL", DS_COLOR_FORA_LINHA: "#f26419", VL_PRECO_MINIMO_VENDA: "21.33320", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "1952143", DS_PRODUTO: "ACRO 13076 30X40 BEGE P3 2", DS_MARCA: null, DS_FAMILIA: "REVESTIMENTO 02", CD_FORNECEDOR: "195", DS_RAZAO_SOCIAL: "EMBRAMACO EMPRESA BRASILEIRA MATS P/ CONSTRUCAO", DS_FANTASIA: "CEPAR", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "11.55000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "1953155", DS_PRODUTO: "ACRO 40023 40X40 RUSTICO BGE P4 2 FL", DS_MARCA: null, DS_FAMILIA: "REVESTIMENTO 02", CD_FORNECEDOR: "195", DS_RAZAO_SOCIAL: "EMBRAMACO EMPRESA BRASILEIRA MATS P/ CONSTRUCAO", DS_FANTASIA: "CEPAR", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "FL", DS_COLOR_FORA_LINHA: "#f26419", VL_PRECO_MINIMO_VENDA: "15.72000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "1959059", DS_PRODUTO: "ACRO 45015 45X45 MADEIRA P3 2 FL", DS_MARCA: null, DS_FAMILIA: "REVESTIMENTO 02", CD_FORNECEDOR: "129", DS_RAZAO_SOCIAL: "3RM INDUSTRIA DE TINTAS E VERNIZES", DS_FANTASIA: "3RM", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: "7891592172250", CD_NCM: "32081020", LG_FORA_LINHA: "FL", DS_COLOR_FORA_LINHA: "#f26419", VL_PRECO_MINIMO_VENDA: "29.84300", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "1950105", DS_PRODUTO: "ACRO 45022 45X45 P4 2 FL", DS_MARCA: null, DS_FAMILIA: "REVESTIMENTO 02", CD_FORNECEDOR: "195", DS_RAZAO_SOCIAL: "EMBRAMACO EMPRESA BRASILEIRA MATS P/ CONSTRUCAO", DS_FANTASIA: "CEPAR", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "FL", DS_COLOR_FORA_LINHA: "#f26419", VL_PRECO_MINIMO_VENDA: "20.18000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "8885381", DS_PRODUTO: "ADAP PVC MARROM 3/4", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "987890114", DS_RAZAO_SOCIAL: "ALEX TESTE", DS_FANTASIA: "ALEX TESTE", CD_CURVA_ABC: "C", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "FL", DS_COLOR_FORA_LINHA: "#f26419", VL_PRECO_MINIMO_VENDA: "9.90000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0708532", DS_PRODUTO: "ADAPT CX DAGUA  C/ REGISTRO 50", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "987890078", DS_RAZAO_SOCIAL: "01AAA", DS_FANTASIA: "01AAAA", CD_CURVA_ABC: "D", CD_FABRICANTE: "10", CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "64.12000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0708525", DS_PRODUTO: "ADAPT CX DAGUA C/ REGISTRO 25", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "987890117", DS_RAZAO_SOCIAL: "FORNECEDOR AJX LTDA", DS_FANTASIA: "FORNECEDOR AJX", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "20.26000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0703215", DS_PRODUTO: "ADAPT MAQUINA LAVAR LOUCA", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "987890078", DS_RAZAO_SOCIAL: "01AAA", DS_FANTASIA: "01AAAA", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: "7899092140984", CD_NCM: "40169300", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "7.92000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0706556", DS_PRODUTO: "ADAPT MAQUINA LAVAR ROUPA", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "011", DS_RAZAO_SOCIAL: "ALBA ADESIVOS INDÚSTRIA E COMÉRCIO LTDA", DS_FANTASIA: "ALBA", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "15.02000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0700025", DS_PRODUTO: "ADESIVO PVC BISNAGA 17 G.", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "037", DS_RAZAO_SOCIAL: "SOLAR COMÉRCIO IMP E EXP DE PRODUTOS P/ REVESTIMENTOS LTDA", DS_FANTASIA: "ALUBAND", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "2.34000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0700032", DS_PRODUTO: "ADESIVO PVC BISNAGA 75 G.", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "987890048", DS_RAZAO_SOCIAL: "ALEX ALEX ", DS_FANTASIA: "ALEX ", CD_CURVA_ABC: "D", CD_FABRICANTE: "2254545", CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "5.07000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0704227", DS_PRODUTO: "ADESIVO PVC POTE 175 G", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "037", DS_RAZAO_SOCIAL: "SOLAR COMÉRCIO IMP E EXP DE PRODUTOS P/ REVESTIMENTOS LTDA", DS_FANTASIA: "ALUBAND", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: "7899452002105", CD_NCM: "35061090", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "39.00000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0705513", DS_PRODUTO: "ADESIVO PVC POTE 850 G.", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "037", DS_RAZAO_SOCIAL: "SOLAR COMÉRCIO IMP E EXP DE PRODUTOS P/ REVESTIMENTOS LTDA", DS_FANTASIA: "ALUBAND", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "36.87000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0100618", DS_PRODUTO: "AJUSTE DE NOTA", DS_MARCA: "REAL", DS_FAMILIA: "FAMILIA COM COMISSÃO", CD_FORNECEDOR: "129", DS_RAZAO_SOCIAL: "3RM INDUSTRIA DE TINTAS E VERNIZES", DS_FANTASIA: "3RM", CD_CURVA_ABC: "D", CD_FABRICANTE: "149", CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "73170090", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "412.27340", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0770011", DS_PRODUTO: "ALICATE CORTADOR FERMAT 202 FL", DS_MARCA: null, DS_FAMILIA: "FERRAGENS", CD_FORNECEDOR: "666F", DS_RAZAO_SOCIAL: "3RM INDUSTRIA DE TINTAS E VERNIZES LTDA", DS_FANTASIA: "TESTE", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: "7896317564006", CD_NCM: "73142000", LG_FORA_LINHA: "FL", DS_COLOR_FORA_LINHA: "#f26419", VL_PRECO_MINIMO_VENDA: "169.70000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "1195537", DS_PRODUTO: "ALICATE DESCARCAR FIO     1507", DS_MARCA: null, DS_FAMILIA: "ELETRICO", CD_FORNECEDOR: "013", DS_RAZAO_SOCIAL: "METALÚRGICA ROCHA LTDA", DS_FANTASIA: "METALÚRGICA ROCHA", CD_CURVA_ABC: "B", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "FL", DS_COLOR_FORA_LINHA: "#f26419", VL_PRECO_MINIMO_VENDA: "72.60000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "39504", DS_PRODUTO: "AMANTEIGADO GARCEA GOIABINHA 150GR", DS_MARCA: null, DS_FAMILIA: "TESTE JAIME", CD_FORNECEDOR: "1260", DS_RAZAO_SOCIAL: "TESTE", DS_FANTASIA: "TESTE", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "19059090", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "1268.45000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "1234548", DS_PRODUTO: "AMORTECEDOR LD CAPTIVA", DS_MARCA: "COFAP", DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "123", DS_RAZAO_SOCIAL: "FORNECEDOR DEMONSTRAÇÃO AUTO PEÇAS", DS_FANTASIA: "DEMONSTRAÇÃO AUTO PEÇAS", CD_CURVA_ABC: "B", CD_FABRICANTE: "36190G", CD_ORIGINAL: "22862538", CD_OPCIONAL: null, CD_EAN_PRODUTO: "78984809088470", CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "301.29000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "1239118", DS_PRODUTO: "AMORTECEDOR LD COBALT  1.4/1.8", DS_MARCA: "GM", DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "123", DS_RAZAO_SOCIAL: "FORNECEDOR DEMONSTRAÇÃO AUTO PEÇAS", DS_FANTASIA: "DEMONSTRAÇÃO AUTO PEÇAS", CD_CURVA_ABC: "C", CD_FABRICANTE: "52058064", CD_ORIGINAL: "52058064", CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "24.89000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "123465655", DS_PRODUTO: "AMORTECEDOR PALIO", DS_MARCA: "COFAP", DS_FAMILIA: "BASICO", CD_FORNECEDOR: "129", DS_RAZAO_SOCIAL: "3RM INDUSTRIA DE TINTAS E VERNIZES", DS_FANTASIA: "3RM", CD_CURVA_ABC: "C", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "9.91000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "1220140", DS_PRODUTO: "ANEL VEDAÇAO EVA VEDACHEIRO", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "123", DS_RAZAO_SOCIAL: "FORNECEDOR DEMONSTRAÇÃO AUTO PEÇAS", DS_FANTASIA: "DEMONSTRAÇÃO AUTO PEÇAS", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "11.00000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0010100", DS_PRODUTO: "ANT INT PIRAMIDE SL VHF/FM/UHF", DS_MARCA: null, DS_FAMILIA: "FERRAGENS", CD_FORNECEDOR: "041", DS_RAZAO_SOCIAL: "GL ELETRO ELETRONICOS LTDA", DS_FANTASIA: "LORENZETTI ELETRICOS", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: "7896675133203", CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "31.00000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0010566", DS_PRODUTO: "ANT VHF PLASMATIC 1-JUNIOR 669", DS_MARCA: "PLASMATIC", DS_FAMILIA: "FERRAGENS", CD_FORNECEDOR: "mover001", DS_RAZAO_SOCIAL: "MOVER WEB001", DS_FANTASIA: "MOVER WEB001", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: "7896675135306", CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "136.42200", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0195662", DS_PRODUTO: "ANTI FERRUGEM ROST OFF 300ML", DS_MARCA: null, DS_FAMILIA: "TINTAS", CD_FORNECEDOR: "008", DS_RAZAO_SOCIAL: "TRAMONTINA SUDESTE S/A", DS_FANTASIA: "TRAMONTINA", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25171000", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "73.36000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0708823", DS_PRODUTO: "ANTIESPUMA TIGRE   150MM", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "128", DS_RAZAO_SOCIAL: "ALIANÇA METALURGICA S.A", DS_FANTASIA: "ALIANÇA METARLUGICA", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "13.69000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0708816", DS_PRODUTO: "ANTIESPUNA TIGRE   100MM", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "027", DS_RAZAO_SOCIAL: "AKZO NOBEL LTDA DIVISÃO DE TINTAS IMOBILIARIAS", DS_FANTASIA: "AKZO NOBEL LTDA DIVISÃO DE TINTAS IMOBILIARIAS", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "9.60000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "1460022", DS_PRODUTO: "APARADOR GRAMA AG 750 220V", DS_MARCA: null, DS_FAMILIA: "FERRAGENS", CD_FORNECEDOR: "104", DS_RAZAO_SOCIAL: "KAREN FONSECA VIEIRA TABUTI ME", DS_FANTASIA: "VASSOURAS E RODOS BELA VISTA", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "FL", DS_COLOR_FORA_LINHA: "#f26419", VL_PRECO_MINIMO_VENDA: "56.70000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0705311", DS_PRODUTO: "AQUAT ADAPTADOR  AQ21    15", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "987890080", DS_RAZAO_SOCIAL: "TESTE", DS_FANTASIA: "ALEX", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "15.99240", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0708549", DS_PRODUTO: "AQUAT ADAPTADOR  AQ21    22", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "129", DS_RAZAO_SOCIAL: "3RM INDUSTRIA DE TINTAS E VERNIZES", DS_FANTASIA: "3RM", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "4.22000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0709993", DS_PRODUTO: "AQUAT ADESIVO    AQ14    65G", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "070", DS_RAZAO_SOCIAL: "TIGRE S/A TUBOS E CONEXÕES", DS_FANTASIA: "TIGRE S/A", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "9.39000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0708450", DS_PRODUTO: "AQUAT BUCHA RED. AQ02  28X22", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "070", DS_RAZAO_SOCIAL: "TIGRE S/A TUBOS E CONEXÕES", DS_FANTASIA: "TIGRE S/A", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "1.51000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0706316", DS_PRODUTO: "AQUAT CAP  AQ03       15", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "070", DS_RAZAO_SOCIAL: "TIGRE S/A TUBOS E CONEXÕES", DS_FANTASIA: "TIGRE S/A", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "1.55000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0704563", DS_PRODUTO: "AQUAT CAP  AQ03       22", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "129", DS_RAZAO_SOCIAL: "3RM INDUSTRIA DE TINTAS E VERNIZES", DS_FANTASIA: "3RM", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "2.25000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0701479", DS_PRODUTO: "AQUAT CAP  AQ03       28", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "070", DS_RAZAO_SOCIAL: "TIGRE S/A TUBOS E CONEXÕES", DS_FANTASIA: "TIGRE S/A", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "11.69330", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0708885", DS_PRODUTO: "AQUAT CONECTOR AQ04 28 X 1", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "129", DS_RAZAO_SOCIAL: "3RM INDUSTRIA DE TINTAS E VERNIZES", DS_FANTASIA: "3RM", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "32.82000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0709126", DS_PRODUTO: "AQUAT CONECTOR MACHO 22X3/4", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "070", DS_RAZAO_SOCIAL: "TIGRE S/A TUBOS E CONEXÕES", DS_FANTASIA: "TIGRE S/A", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "16.62000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0709133", DS_PRODUTO: "AQUAT CONECTOR MACHO 28X1", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "070", DS_RAZAO_SOCIAL: "TIGRE S/A TUBOS E CONEXÕES", DS_FANTASIA: "TIGRE S/A", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "27.12000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0706594", DS_PRODUTO: "AQUAT JOELHO 45 AQ05    15", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "070", DS_RAZAO_SOCIAL: "TIGRE S/A TUBOS E CONEXÕES", DS_FANTASIA: "TIGRE S/A", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "2.96000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0705373", DS_PRODUTO: "AQUAT JOELHO 45 AQ05    22  FL", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "070", DS_RAZAO_SOCIAL: "TIGRE S/A TUBOS E CONEXÕES", DS_FANTASIA: "TIGRE S/A", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "FL", DS_COLOR_FORA_LINHA: "#f26419", VL_PRECO_MINIMO_VENDA: "4.94000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0706347", DS_PRODUTO: "AQUAT JOELHO 45 AQ05    28", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "070", DS_RAZAO_SOCIAL: "TIGRE S/A TUBOS E CONEXÕES", DS_FANTASIA: "TIGRE S/A", CD_CURVA_ABC: "C", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "7.18000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0702227", DS_PRODUTO: "AQUAT JOELHO 90 AQ06    15", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "070", DS_RAZAO_SOCIAL: "TIGRE S/A TUBOS E CONEXÕES", DS_FANTASIA: "TIGRE S/A", CD_CURVA_ABC: "C", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "13.34450", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0705246", DS_PRODUTO: "AQUAT JOELHO 90 AQ06    22", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "070", DS_RAZAO_SOCIAL: "TIGRE S/A TUBOS E CONEXÕES", DS_FANTASIA: "TIGRE S/A", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "3.57000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0705366", DS_PRODUTO: "AQUAT JOELHO 90 AQ06    28", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "070", DS_RAZAO_SOCIAL: "TIGRE S/A TUBOS E CONEXÕES", DS_FANTASIA: "TIGRE S/A", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "7.51000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0705328", DS_PRODUTO: "AQUAT JOELHO TRANS AQ20 22X1/2", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "070", DS_RAZAO_SOCIAL: "TIGRE S/A TUBOS E CONEXÕES", DS_FANTASIA: "TIGRE S/A", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "10.44000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0706354", DS_PRODUTO: "AQUAT JOELHO TRANS AQ20 22X3/4", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "070", DS_RAZAO_SOCIAL: "TIGRE S/A TUBOS E CONEXÕES", DS_FANTASIA: "TIGRE S/A", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "14.66000", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "0705551", DS_PRODUTO: "AQUAT LUVA AQ07         15", DS_MARCA: null, DS_FAMILIA: "HIDRAULICA", CD_FORNECEDOR: "070", DS_RAZAO_SOCIAL: "TIGRE S/A TUBOS E CONEXÕES", DS_FANTASIA: "TIGRE S/A", CD_CURVA_ABC: "D", CD_FABRICANTE: null, CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "1.33000", CD_STATUS: "A", DS_STATUS: "Ativo" },

    //];

    //var dataSourceFormaPagamento = [

    //    { CD_FORMA_PAGAMENTO: 6, DS_FORMA_PAGAMENTO: 'Boleto', },
    //    { CD_FORMA_PAGAMENTO: 107, DS_FORMA_PAGAMENTO: 'Cartão Amanco', },
    //    { CD_FORMA_PAGAMENTO: 3, DS_FORMA_PAGAMENTO: 'Cartão de Crédito', },
    //    { CD_FORMA_PAGAMENTO: 4, DS_FORMA_PAGAMENTO: 'Cartão de Débito', },
    //    { CD_FORMA_PAGAMENTO: 10, DS_FORMA_PAGAMENTO: 'Cheque de Terceiros', },
    //    { CD_FORMA_PAGAMENTO: 5, DS_FORMA_PAGAMENTO: 'Conta Corrente', },
    //    { CD_FORMA_PAGAMENTO: 8, DS_FORMA_PAGAMENTO: 'Crédito C/C', },
    //    { CD_FORMA_PAGAMENTO: 110, DS_FORMA_PAGAMENTO: 'Crédito de cliente', },
    //    { CD_FORMA_PAGAMENTO: 9, DS_FORMA_PAGAMENTO: 'Débito C/C', },
    //    { CD_FORMA_PAGAMENTO: 109, DS_FORMA_PAGAMENTO: 'Deposito em conta', },
    //    { CD_FORMA_PAGAMENTO: 1, DS_FORMA_PAGAMENTO: 'Dinheiro', },
    //    { CD_FORMA_PAGAMENTO: 7, DS_FORMA_PAGAMENTO: 'Financeira', },
    //    { CD_FORMA_PAGAMENTO: 111, DS_FORMA_PAGAMENTO: 'PIX - BRADESCO', },

    //];


    //var dataSourceDescontoFormaPagamentoCliente = [

    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 6, DS_FORMA_PAGAMENTO: "BOLETO", CD_STATUS: "A", PC_DESCONTO: 0.07000000, PC_ACRESCIMO: null, CD_LOGIN: "ROBSON", DT_CADASTRO: "Nov 27 2017 10:11AM", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 107, DS_FORMA_PAGAMENTO: "CARTÃO AMANCO", CD_STATUS: "A", PC_DESCONTO: null, PC_ACRESCIMO: null, CD_LOGIN: null, DT_CADASTRO: null, DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 3, DS_FORMA_PAGAMENTO: "CARTÃO DE CRÉDITO", CD_STATUS: "A", PC_DESCONTO: 0.07000000, PC_ACRESCIMO: null, CD_LOGIN: "ROBSON", DT_CADASTRO: "Nov 27 2017 10:11AM", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 4, DS_FORMA_PAGAMENTO: "CARTÃO DE DÉBITO", CD_STATUS: "A", PC_DESCONTO: 0.07000000, PC_ACRESCIMO: null, CD_LOGIN: "ROBSON", DT_CADASTRO: "Nov 27 2017 10:11AM", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 10, DS_FORMA_PAGAMENTO: "CHEQUE DE TERCEIROS", CD_STATUS: "A", PC_DESCONTO: 0.07000000, PC_ACRESCIMO: null, CD_LOGIN: "ROBSON", DT_CADASTRO: "Nov 27 2017 10:11AM", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 5, DS_FORMA_PAGAMENTO: "CONTA CORRENTE", CD_STATUS: "A", PC_DESCONTO: 0.07000000, PC_ACRESCIMO: null, CD_LOGIN: "ROBSON", DT_CADASTRO: "Nov 27 2017 10:11AM", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 8, DS_FORMA_PAGAMENTO: "CRÉDITO C/C", CD_STATUS: "A", PC_DESCONTO: 0.07000000, PC_ACRESCIMO: null, CD_LOGIN: "ROBSON", DT_CADASTRO: "Nov 27 2017 10:11AM", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 110, DS_FORMA_PAGAMENTO: "CRÉDITO DE CLIENTE", CD_STATUS: "A", PC_DESCONTO: null, PC_ACRESCIMO: null, CD_LOGIN: null, DT_CADASTRO: null, DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 9, DS_FORMA_PAGAMENTO: "DÉBITO C/C", CD_STATUS: "A", PC_DESCONTO: null, PC_ACRESCIMO: null, CD_LOGIN: null, DT_CADASTRO: null, DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 109, DS_FORMA_PAGAMENTO: "DEPOSITO EM CONTA", CD_STATUS: "A", PC_DESCONTO: null, PC_ACRESCIMO: null, CD_LOGIN: null, DT_CADASTRO: null, DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 1, DS_FORMA_PAGAMENTO: "DINHEIRO", CD_STATUS: "A", PC_DESCONTO: 0.07000000, PC_ACRESCIMO: null, CD_LOGIN: "ROBSON", DT_CADASTRO: "Nov 27 2017 10:10AM", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 7, DS_FORMA_PAGAMENTO: "FINANCEIRA", CD_STATUS: "A", PC_DESCONTO: null, PC_ACRESCIMO: null, CD_LOGIN: null, DT_CADASTRO: null, DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 111, DS_FORMA_PAGAMENTO: "PIX - BRADESCO", CD_STATUS: "A", PC_DESCONTO: null, PC_ACRESCIMO: null, CD_LOGIN: null, DT_CADASTRO: null, DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 112, DS_FORMA_PAGAMENTO: "C.CRÉDITO MASTERCARD", CD_STATUS: "I", PC_DESCONTO: null, PC_ACRESCIMO: null, CD_LOGIN: null, DT_CADASTRO: null, DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 2, DS_FORMA_PAGAMENTO: "CHEQUE", CD_STATUS: "I", PC_DESCONTO: 0.07000000, PC_ACRESCIMO: null, CD_LOGIN: "ROBSON", DT_CADASTRO: "Nov 27 2017 10:11AM", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 11, DS_FORMA_PAGAMENTO: "CRÉDITO DE CLIENTE", CD_STATUS: "I", PC_DESCONTO: 0.07000000, PC_ACRESCIMO: null, CD_LOGIN: "ROBSON", DT_CADASTRO: "Nov 27 2017 10:11AM", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 101, DS_FORMA_PAGAMENTO: "INATIVO NOTA FISCAL", CD_STATUS: "I", PC_DESCONTO: null, PC_ACRESCIMO: null, CD_LOGIN: null, DT_CADASTRO: null, DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 106, DS_FORMA_PAGAMENTO: "RECEBER ENTREGA", CD_STATUS: "I", PC_DESCONTO: null, PC_ACRESCIMO: null, CD_LOGIN: null, DT_CADASTRO: null, DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 12, DS_FORMA_PAGAMENTO: "RECEBIMENTO ANTERIOR", CD_STATUS: "I", PC_DESCONTO: null, PC_ACRESCIMO: null, CD_LOGIN: null, DT_CADASTRO: null, DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 13, DS_FORMA_PAGAMENTO: "RECEBIMENTO PARCIAL", CD_STATUS: "I", PC_DESCONTO: null, PC_ACRESCIMO: null, CD_LOGIN: null, DT_CADASTRO: null, DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 108, DS_FORMA_PAGAMENTO: "ZBOLETO 2", CD_STATUS: "I", PC_DESCONTO: null, PC_ACRESCIMO: null, CD_LOGIN: null, DT_CADASTRO: null, DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 105, DS_FORMA_PAGAMENTO: "ZCARTEIRA", CD_STATUS: "I", PC_DESCONTO: null, PC_ACRESCIMO: null, CD_LOGIN: null, DT_CADASTRO: null, DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 102, DS_FORMA_PAGAMENTO: "ZINATIVO", CD_STATUS: "I", PC_DESCONTO: null, PC_ACRESCIMO: null, CD_LOGIN: null, DT_CADASTRO: null, DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 104, DS_FORMA_PAGAMENTO: "ZINATIVO C COR 30DD", CD_STATUS: "I", PC_DESCONTO: null, PC_ACRESCIMO: null, CD_LOGIN: null, DT_CADASTRO: null, DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FORMA_PAGAMENTO: 103, DS_FORMA_PAGAMENTO: "ZINATIVO FAT INTERNO", CD_STATUS: "I", PC_DESCONTO: null, PC_ACRESCIMO: null, CD_LOGIN: null, DT_CADASTRO: null, DS_STATUS: "Inativo" },

    //];

    //var dataSourcePrecoFixoProdutosCliente = [

    //    { CD_EMPRESA: 180, CD_PRODUTO: "1840026", DS_PRODUTO: "AREIA  GROSSA  M3", DS_MARCA: null, DS_FAMILIA: "BASICO - GRANEL", CD_FORNECEDOR: "184", DS_RAZAO_SOCIAL: "AURICCHIO BARROS EXTRAÇÃO DE AREIA E PEDRA LTDA", DS_FANTASIA: "AB AREIAS", CD_CURVA_ABC: "A", CD_FABRICANTE: "510-00021", CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25171000", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "189.90000", CD_STATUS: "A", NR_SEQUENCIA: 1, CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 27, CD_ENTREGA: 2, VL_PRECO_CLIENTE: 100.00000, PC_MAXIMO_DESCONTO: 0.0000, DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_PRODUTO: "1840026", DS_PRODUTO: "AREIA  GROSSA  M3", DS_MARCA: null, DS_FAMILIA: "BASICO - GRANEL", CD_FORNECEDOR: "184", DS_RAZAO_SOCIAL: "AURICCHIO BARROS EXTRAÇÃO DE AREIA E PEDRA LTDA", DS_FANTASIA: "AB AREIAS", CD_CURVA_ABC: "A", CD_FABRICANTE: "510-00021", CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25171000", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "189.90000", CD_STATUS: "A", NR_SEQUENCIA: 2, CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 61, CD_ENTREGA: 2, VL_PRECO_CLIENTE: 100.00000, PC_MAXIMO_DESCONTO: 0.0000, DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_PRODUTO: "1840019", DS_PRODUTO: "AREIA  MEDIA LAVADA (2)", DS_MARCA: null, DS_FAMILIA: "BASICO - GRANEL", CD_FORNECEDOR: "184", DS_RAZAO_SOCIAL: "AURICCHIO BARROS EXTRAÇÃO DE AREIA E PEDRA LTDA", DS_FANTASIA: "AB AREIAS", CD_CURVA_ABC: "A", CD_FABRICANTE: "00001", CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25051000", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "239.90000", CD_STATUS: "A", NR_SEQUENCIA: 1, CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 27, CD_ENTREGA: 2, VL_PRECO_CLIENTE: 108.00000, PC_MAXIMO_DESCONTO: 0.0000, DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_PRODUTO: "1840019", DS_PRODUTO: "AREIA  MEDIA LAVADA (2)", DS_MARCA: null, DS_FAMILIA: "BASICO - GRANEL", CD_FORNECEDOR: "184", DS_RAZAO_SOCIAL: "AURICCHIO BARROS EXTRAÇÃO DE AREIA E PEDRA LTDA", DS_FANTASIA: "AB AREIAS", CD_CURVA_ABC: "A", CD_FABRICANTE: "00001", CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25051000", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "239.90000", CD_STATUS: "A", NR_SEQUENCIA: 2, CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 61, CD_ENTREGA: 2, VL_PRECO_CLIENTE: 108.00000, PC_MAXIMO_DESCONTO: 0.0000, DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_PRODUTO: "1490079", DS_PRODUTO: "CIMENTO CSN CP 3 RS 50KG", DS_MARCA: null, DS_FAMILIA: "BASICO - SACARIA", CD_FORNECEDOR: "3368", DS_RAZAO_SOCIAL: "CSN CIMENTOS SA", DS_FANTASIA: "CSN CIMENTOS SA", CD_CURVA_ABC: "D", CD_FABRICANTE: "csn", CD_ORIGINAL: null, CD_OPCIONAL: "csncp3", CD_EAN_PRODUTO: "742832820240", CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "29.90000", CD_STATUS: "I", NR_SEQUENCIA: 1, CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 27, CD_ENTREGA: 2, VL_PRECO_CLIENTE: 21.00000, PC_MAXIMO_DESCONTO: 0.0000, DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_PRODUTO: "1490079", DS_PRODUTO: "CIMENTO CSN CP 3 RS 50KG", DS_MARCA: null, DS_FAMILIA: "BASICO - SACARIA", CD_FORNECEDOR: "3368", DS_RAZAO_SOCIAL: "CSN CIMENTOS SA", DS_FANTASIA: "CSN CIMENTOS SA", CD_CURVA_ABC: "D", CD_FABRICANTE: "csn", CD_ORIGINAL: null, CD_OPCIONAL: "csncp3", CD_EAN_PRODUTO: "742832820240", CD_NCM: "25232910", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "29.90000", CD_STATUS: "I", NR_SEQUENCIA: 2, CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 61, CD_ENTREGA: 2, VL_PRECO_CLIENTE: 21.00000, PC_MAXIMO_DESCONTO: 0.0000, DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_PRODUTO: "1840033", DS_PRODUTO: "PEDRA BRITA 1  M3", DS_MARCA: null, DS_FAMILIA: "BASICO - GRANEL", CD_FORNECEDOR: "184", DS_RAZAO_SOCIAL: "AURICCHIO BARROS EXTRAÇÃO DE AREIA E PEDRA LTDA", DS_FANTASIA: "AB AREIAS", CD_CURVA_ABC: "A", CD_FABRICANTE: "500-00001", CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25169000", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "189.90000", CD_STATUS: "A", NR_SEQUENCIA: 1, CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 27, CD_ENTREGA: 2, VL_PRECO_CLIENTE: 100.00000, PC_MAXIMO_DESCONTO: 0.0000, DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_PRODUTO: "1840033", DS_PRODUTO: "PEDRA BRITA 1  M3", DS_MARCA: null, DS_FAMILIA: "BASICO - GRANEL", CD_FORNECEDOR: "184", DS_RAZAO_SOCIAL: "AURICCHIO BARROS EXTRAÇÃO DE AREIA E PEDRA LTDA", DS_FANTASIA: "AB AREIAS", CD_CURVA_ABC: "A", CD_FABRICANTE: "500-00001", CD_ORIGINAL: null, CD_OPCIONAL: null, CD_EAN_PRODUTO: null, CD_NCM: "25169000", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "189.90000", CD_STATUS: "A", NR_SEQUENCIA: 2, CD_FORMA_PAGAMENTO: 6, CD_CONDICAO_PAGAMENTO: 61, CD_ENTREGA: 2, VL_PRECO_CLIENTE: 100.00000, PC_MAXIMO_DESCONTO: 0.0000, DS_STATUS: "Ativo" },

    //];

    //var dataSourceDescontosProdutosCliente = [
    //    { CD_EMPRESA: 7, CD_PRODUTO: "1495550", DS_PRODUTO: "CIMENTO CSN 50KG", DS_MARCA: "TESTETESTE", DS_FAMILIA: "ACABAMENTO", CD_FORNECEDOR: "129", DS_RAZAO_SOCIAL: "3RM INDUSTRIA DE TINTAS E VERNIZES", DS_FANTASIA: "3RM", CD_CURVA_ABC: "A", CD_FABRICANTE: "125125125", CD_ORIGINAL: null, CD_OPCIONAL: "6921615470320", CD_EAN_PRODUTO: "7897381600577", CD_NCM: "25232990", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "85.82000", CD_STATUS: "A", CD_FORMA_PAGAMENTO: 1, VL_PRECO_FINAL: 77.2380000000000, PC_DESCONTO: 0.10000000, PC_ACRESCIMO: null, CD_LOGIN: "cmsys", DT_CADASTRO: "Oct 30 2013 12:45PM", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 7, CD_PRODUTO: "1495550", DS_PRODUTO: "CIMENTO CSN 50KG", DS_MARCA: "TESTETESTE", DS_FAMILIA: "ACABAMENTO", CD_FORNECEDOR: "129", DS_RAZAO_SOCIAL: "3RM INDUSTRIA DE TINTAS E VERNIZES", DS_FANTASIA: "3RM", CD_CURVA_ABC: "A", CD_FABRICANTE: "125125125", CD_ORIGINAL: null, CD_OPCIONAL: "6921615470320", CD_EAN_PRODUTO: "7897381600577", CD_NCM: "25232990", LG_FORA_LINHA: "", DS_COLOR_FORA_LINHA: "", VL_PRECO_MINIMO_VENDA: "85.82000", CD_STATUS: "A", CD_FORMA_PAGAMENTO: 2, VL_PRECO_FINAL: 81.5290000000000, PC_DESCONTO: 0.05000000, PC_ACRESCIMO: null, CD_LOGIN: "cmsys", DT_CADASTRO: "Oct 30 2013 12:44PM", DS_STATUS: "Ativo" },
    //];

    //var dataSourceFamilias = [

    //    { CD_EMPRESA: 180, CD_FAMILIA: 1, CD_FAMILIA_PAI: null, DS_FAMILIA: "BASICO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 191, CD_FAMILIA_PAI: 1, DS_FAMILIA: "BASICO - ACO COLUNAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 135, CD_FAMILIA_PAI: 1, DS_FAMILIA: "BASICO - ACO VERGALHAO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 192, CD_FAMILIA_PAI: 1, DS_FAMILIA: "BASICO - ARTEFATOS CERAMICOS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 132, CD_FAMILIA_PAI: 1, DS_FAMILIA: "BASICO - ARTEFATOS CONCRETO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 193, CD_FAMILIA_PAI: 1, DS_FAMILIA: "BASICO - BLOCOS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 133, CD_FAMILIA_PAI: 1, DS_FAMILIA: "BASICO - FORRO PVC", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 194, CD_FAMILIA_PAI: 1, DS_FAMILIA: "BASICO - GRANEL", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 196, CD_FAMILIA_PAI: 1, DS_FAMILIA: "BASICO - LAJE", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 131, CD_FAMILIA_PAI: 1, DS_FAMILIA: "BASICO - MADEIRAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 195, CD_FAMILIA_PAI: 1, DS_FAMILIA: "BASICO - SACARIA", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 134, CD_FAMILIA_PAI: 1, DS_FAMILIA: "BASICO - TELHAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 2, CD_FAMILIA_PAI: null, DS_FAMILIA: "CERAMICO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 208, CD_FAMILIA_PAI: 15, DS_FAMILIA: "DECORACAO - ACESS/CORTINA", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 209, CD_FAMILIA_PAI: 15, DS_FAMILIA: "DECORACAO - DIVERSOS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 210, CD_FAMILIA_PAI: 15, DS_FAMILIA: "DECORACAO - MOLDURAS E RODAPES", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 211, CD_FAMILIA_PAI: 15, DS_FAMILIA: "DECORACAO - ORGANIZACAO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 119, CD_FAMILIA_PAI: null, DS_FAMILIA: "DIVERSOS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 137, CD_FAMILIA_PAI: 13, DS_FAMILIA: "ELETRICA - ACESSORIOS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 138, CD_FAMILIA_PAI: 13, DS_FAMILIA: "ELETRICA - AQUECEDORES GAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 139, CD_FAMILIA_PAI: 13, DS_FAMILIA: "ELETRICA - BASICA", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 207, CD_FAMILIA_PAI: 13, DS_FAMILIA: "ELETRICA - DISTRIBUICAO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 140, CD_FAMILIA_PAI: 13, DS_FAMILIA: "ELETRICA - DUCHAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 206, CD_FAMILIA_PAI: 13, DS_FAMILIA: "ELETRICA - ENTRADA", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 205, CD_FAMILIA_PAI: 13, DS_FAMILIA: "ELETRICA - FIOS E CABOS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 141, CD_FAMILIA_PAI: 13, DS_FAMILIA: "ELETRICA - INFORMATICA AUDIO E VIDEO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 142, CD_FAMILIA_PAI: 13, DS_FAMILIA: "ELETRICA - INTERRUPTORES E TOMADAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 13, CD_FAMILIA_PAI: null, DS_FAMILIA: "ELETRICA E ILUMINACAO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 3, CD_FAMILIA_PAI: null, DS_FAMILIA: "ESQUADRIAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 143, CD_FAMILIA_PAI: 3, DS_FAMILIA: "ESQUADRIAS - ACESSORIOS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 146, CD_FAMILIA_PAI: 3, DS_FAMILIA: "ESQUADRIAS - ACO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 144, CD_FAMILIA_PAI: 3, DS_FAMILIA: "ESQUADRIAS - ALUMINIO BRANCO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 145, CD_FAMILIA_PAI: 3, DS_FAMILIA: "ESQUADRIAS - ALUMINIO BRILHANTE", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 264, CD_FAMILIA_PAI: 3, DS_FAMILIA: "ESQUADRIAS - ALUMINIO LEVE", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 198, CD_FAMILIA_PAI: 3, DS_FAMILIA: "ESQUADRIAS - ALUMINIO ONIX", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 147, CD_FAMILIA_PAI: 3, DS_FAMILIA: "ESQUADRIAS - MADEIRA", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 148, CD_FAMILIA_PAI: 3, DS_FAMILIA: "ESQUADRIAS - PVC", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 212, CD_FAMILIA_PAI: 14, DS_FAMILIA: "FERRAGENS - ALGARISMOS / CX CARTA", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 213, CD_FAMILIA_PAI: 14, DS_FAMILIA: "FERRAGENS - ARAMES/PREGO/TELAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 214, CD_FAMILIA_PAI: 14, DS_FAMILIA: "FERRAGENS - CANT ALUMINIO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 215, CD_FAMILIA_PAI: 14, DS_FAMILIA: "FERRAGENS - CORDAS E CORRENTES", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 216, CD_FAMILIA_PAI: 14, DS_FAMILIA: "FERRAGENS - DIVERSOS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 217, CD_FAMILIA_PAI: 14, DS_FAMILIA: "FERRAGENS - FECH/CADE/ACESSORIOS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 218, CD_FAMILIA_PAI: 14, DS_FAMILIA: "FERRAGENS - FIXACAO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 219, CD_FAMILIA_PAI: 14, DS_FAMILIA: "FERRAGENS - LIXAS E ABRASIVOS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 220, CD_FAMILIA_PAI: 14, DS_FAMILIA: "FERRAGENS - LONAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 14, CD_FAMILIA_PAI: null, DS_FAMILIA: "FERRAGENS E FERRAMENTAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 149, CD_FAMILIA_PAI: 14, DS_FAMILIA: "FERRAMENTAS - ACESSORIOS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 221, CD_FAMILIA_PAI: 14, DS_FAMILIA: "FERRAMENTAS - BROCAS SERRAS E DISCOS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 222, CD_FAMILIA_PAI: 14, DS_FAMILIA: "FERRAMENTAS - CONSTRUCAO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 150, CD_FAMILIA_PAI: 14, DS_FAMILIA: "FERRAMENTAS - ELETRICAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 151, CD_FAMILIA_PAI: 14, DS_FAMILIA: "FERRAMENTAS - EPIS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 223, CD_FAMILIA_PAI: 14, DS_FAMILIA: "FERRAMENTAS - ESCADAS PROFISSIONAIS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 152, CD_FAMILIA_PAI: 14, DS_FAMILIA: "FERRAMENTAS - MANUAIS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 203, CD_FAMILIA_PAI: 14, DS_FAMILIA: "FERRAMENTAS - PISTOLAS DE PINTURA", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 12, CD_FAMILIA_PAI: null, DS_FAMILIA: "HIDRAULICA", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 153, CD_FAMILIA_PAI: 12, DS_FAMILIA: "HIDRAULICA - ACESSORIOS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 154, CD_FAMILIA_PAI: 12, DS_FAMILIA: "HIDRAULICA - ADESIVOS E FITAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 262, CD_FAMILIA_PAI: 12, DS_FAMILIA: "HIDRAULICA - BOMBAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 155, CD_FAMILIA_PAI: 12, DS_FAMILIA: "HIDRAULICA - CALHAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 156, CD_FAMILIA_PAI: 12, DS_FAMILIA: "HIDRAULICA - CONEXOES COBRE-GALV", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 157, CD_FAMILIA_PAI: 12, DS_FAMILIA: "HIDRAULICA - CONEXOES PVC", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 158, CD_FAMILIA_PAI: 12, DS_FAMILIA: "HIDRAULICA - CX DAGUA", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 224, CD_FAMILIA_PAI: 12, DS_FAMILIA: "HIDRAULICA - IRRIGACAO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 204, CD_FAMILIA_PAI: 12, DS_FAMILIA: "HIDRAULICA - SISTEMAS DE GAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 159, CD_FAMILIA_PAI: 12, DS_FAMILIA: "HIDRAULICA - TUBOS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 160, CD_FAMILIA_PAI: 13, DS_FAMILIA: "ILUMINACAO - LAMPADAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 161, CD_FAMILIA_PAI: 13, DS_FAMILIA: "ILUMINACAO - LUMINARIAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 162, CD_FAMILIA_PAI: 13, DS_FAMILIA: "ILUMINACAO - PENDENTES", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 163, CD_FAMILIA_PAI: 13, DS_FAMILIA: "ILUMINACAO - REFLETORES", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 164, CD_FAMILIA_PAI: 13, DS_FAMILIA: "ILUMINACAO - SPOTS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 165, CD_FAMILIA_PAI: 13, DS_FAMILIA: "ILUMINACAO - VENTILADORES", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 11, CD_FAMILIA_PAI: null, DS_FAMILIA: "LAZER E JARDIM", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 225, CD_FAMILIA_PAI: 11, DS_FAMILIA: "LAZER E JD - CHURRASCO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 199, CD_FAMILIA_PAI: 11, DS_FAMILIA: "LAZER E JD - CHURRASQ MOLDADA", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 226, CD_FAMILIA_PAI: 11, DS_FAMILIA: "LAZER E JD - JARDINAGEM", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 227, CD_FAMILIA_PAI: 11, DS_FAMILIA: "LAZER E JD - MOVEIS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 228, CD_FAMILIA_PAI: 11, DS_FAMILIA: "LAZER E JD - PISCINAS/PRAIA/CAMPING", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 229, CD_FAMILIA_PAI: 11, DS_FAMILIA: "LAZER E JD - PRODUTOS PISCINA", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 230, CD_FAMILIA_PAI: 9, DS_FAMILIA: "LOUCAS - ACESS/INF/INSTITUCIONAL", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 231, CD_FAMILIA_PAI: 9, DS_FAMILIA: "LOUCAS - COMBOS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 232, CD_FAMILIA_PAI: 9, DS_FAMILIA: "LOUCAS - CUBAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 167, CD_FAMILIA_PAI: 9, DS_FAMILIA: "LOUCAS - LAVANDERIA", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 233, CD_FAMILIA_PAI: 9, DS_FAMILIA: "LOUCAS - LUXO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 234, CD_FAMILIA_PAI: 9, DS_FAMILIA: "LOUCAS - NICHOS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 235, CD_FAMILIA_PAI: 9, DS_FAMILIA: "LOUCAS - POP", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 9, CD_FAMILIA_PAI: null, DS_FAMILIA: "LOUCAS SANITARIAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 10, CD_FAMILIA_PAI: null, DS_FAMILIA: "METAIS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 168, CD_FAMILIA_PAI: 10, DS_FAMILIA: "METAIS - ACESSIBILIDADE", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 169, CD_FAMILIA_PAI: 10, DS_FAMILIA: "METAIS - ACESSORIOS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 172, CD_FAMILIA_PAI: 10, DS_FAMILIA: "METAIS - AREAS SERVICO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 173, CD_FAMILIA_PAI: 10, DS_FAMILIA: "METAIS - BANHEIROS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 170, CD_FAMILIA_PAI: 10, DS_FAMILIA: "METAIS - COZINHA", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 171, CD_FAMILIA_PAI: 10, DS_FAMILIA: "METAIS - ECONOMIZADORES", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 8, CD_FAMILIA_PAI: null, DS_FAMILIA: "MOVEIS PIAS E GABINETES", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 136, CD_FAMILIA_PAI: 119, DS_FAMILIA: "OUTROS (TX ENTREGA)", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 236, CD_FAMILIA_PAI: 8, DS_FAMILIA: "PIAS G T - GAB COZINHA ACO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 237, CD_FAMILIA_PAI: 8, DS_FAMILIA: "PIAS G T - GAB COZINHA LUXO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 238, CD_FAMILIA_PAI: 8, DS_FAMILIA: "PIAS G T - GAB COZINHA POP", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 175, CD_FAMILIA_PAI: 8, DS_FAMILIA: "PIAS G T - LAVANDERIA", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 239, CD_FAMILIA_PAI: 8, DS_FAMILIA: "PIAS G T - PIA GRANITO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 240, CD_FAMILIA_PAI: 8, DS_FAMILIA: "PIAS G T - PIA INOX", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 241, CD_FAMILIA_PAI: 8, DS_FAMILIA: "PIAS G T - PIA SINTETICA", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 242, CD_FAMILIA_PAI: 8, DS_FAMILIA: "PIAS G T - TANQUES", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 243, CD_FAMILIA_PAI: 8, DS_FAMILIA: "PIAS G T - TOUCADORES LUXO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 244, CD_FAMILIA_PAI: 8, DS_FAMILIA: "PIAS G T - TOUCADORES POP", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 261, CD_FAMILIA_PAI: 8, DS_FAMILIA: "PIAS G T - TOUCADORES VIDRO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 7, CD_FAMILIA_PAI: null, DS_FAMILIA: "PINTURA", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 176, CD_FAMILIA_PAI: 7, DS_FAMILIA: "PINTURA - ACESSORIOS PINTURA", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 177, CD_FAMILIA_PAI: 7, DS_FAMILIA: "PINTURA - ADESIVOS E SILICONES", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 190, CD_FAMILIA_PAI: 7, DS_FAMILIA: "PINTURA - COMPLEMENTOS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 245, CD_FAMILIA_PAI: 7, DS_FAMILIA: "PINTURA - IMPERMEABILIZANTES", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 178, CD_FAMILIA_PAI: 7, DS_FAMILIA: "PINTURA - QUIMICOS E SOLVENTES", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 129, CD_FAMILIA_PAI: 7, DS_FAMILIA: "PINTURA - SISTEMA TINTOMETRICO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 179, CD_FAMILIA_PAI: 7, DS_FAMILIA: "PINTURA - TINTAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 180, CD_FAMILIA_PAI: 7, DS_FAMILIA: "PINTURA - TINTOMETRICO SW", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 181, CD_FAMILIA_PAI: 2, DS_FAMILIA: "PISOS - ACESSORIOS CERAMICOS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 201, CD_FAMILIA_PAI: 2, DS_FAMILIA: "PISOS - ACESSORIOS P/ASSENTAMENTO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 182, CD_FAMILIA_PAI: 2, DS_FAMILIA: "PISOS - ARGAMASSA E REJUNTES", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 184, CD_FAMILIA_PAI: 2, DS_FAMILIA: "PISOS - CERAMICO PISO/REVEST", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 186, CD_FAMILIA_PAI: 2, DS_FAMILIA: "PISOS - CERAMICO PREMIUM", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 6, CD_FAMILIA_PAI: 2, DS_FAMILIA: "PISOS - COMERCIAIS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 183, CD_FAMILIA_PAI: 2, DS_FAMILIA: "PISOS - PASTILHA DE VIDRO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 200, CD_FAMILIA_PAI: 2, DS_FAMILIA: "PISOS - PEDRAS NATURAIS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 185, CD_FAMILIA_PAI: 2, DS_FAMILIA: "PISOS - PORCELANATO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 263, CD_FAMILIA_PAI: 2, DS_FAMILIA: "PISOS - PORCELANATO ENCOMENDA", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 187, CD_FAMILIA_PAI: 2, DS_FAMILIA: "PISOS - SOLEIRAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 188, CD_FAMILIA_PAI: 2, DS_FAMILIA: "PISOS - VINILICO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 197, CD_FAMILIA_PAI: 119, DS_FAMILIA: "PRODUTOS DE SALDO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 260, CD_FAMILIA_PAI: null, DS_FAMILIA: "USO ITEM", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 248, CD_FAMILIA_PAI: 15, DS_FAMILIA: "UTILIDADES - ARMARIOS E ESPELHOS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 249, CD_FAMILIA_PAI: 15, DS_FAMILIA: "UTILIDADES - ASSENTOS WC", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 247, CD_FAMILIA_PAI: 15, DS_FAMILIA: "UTILIDADES - BANHEIRO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 250, CD_FAMILIA_PAI: 15, DS_FAMILIA: "UTILIDADES - COLCHOES", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 251, CD_FAMILIA_PAI: 15, DS_FAMILIA: "UTILIDADES - COZINHA", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 252, CD_FAMILIA_PAI: 15, DS_FAMILIA: "UTILIDADES - DIVERSOS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 253, CD_FAMILIA_PAI: 15, DS_FAMILIA: "UTILIDADES - ELETRO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 254, CD_FAMILIA_PAI: 15, DS_FAMILIA: "UTILIDADES - ESCADAS DOMESTICAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 255, CD_FAMILIA_PAI: 15, DS_FAMILIA: "UTILIDADES - GAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 256, CD_FAMILIA_PAI: 15, DS_FAMILIA: "UTILIDADES - GR SEGURANCA", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 202, CD_FAMILIA_PAI: 15, DS_FAMILIA: "UTILIDADES - HIGIENE PESSOAL", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 257, CD_FAMILIA_PAI: 15, DS_FAMILIA: "UTILIDADES - LAVANDERIA/LIMPEZA", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 258, CD_FAMILIA_PAI: 15, DS_FAMILIA: "UTILIDADES - PILHAS E BATERIAS", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 259, CD_FAMILIA_PAI: 15, DS_FAMILIA: "UTILIDADES - PURIFIC DE AGUA", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 15, CD_FAMILIA_PAI: null, DS_FAMILIA: "UTILIDADES E DECORAÇÃO", CD_STATUS: "A", DS_STATUS: "Ativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 39, CD_FAMILIA_PAI: 18, DS_FAMILIA: "0", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 111, CD_FAMILIA_PAI: null, DS_FAMILIA: "110", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 112, CD_FAMILIA_PAI: 111, DS_FAMILIA: "110", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 80, CD_FAMILIA_PAI: 10, DS_FAMILIA: "ACESSORIOS BANHEIRO", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 115, CD_FAMILIA_PAI: 110, DS_FAMILIA: "ACESSORIOS CERAMICOS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 105, CD_FAMILIA_PAI: 104, DS_FAMILIA: "ACESSORIOS DECORAÇÃO", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 62, CD_FAMILIA_PAI: 2, DS_FAMILIA: "ACESSORIOS ELETRICOS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 35, CD_FAMILIA_PAI: 5, DS_FAMILIA: "ACESSORIOS HIDRAULICA", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 70, CD_FAMILIA_PAI: 7, DS_FAMILIA: "ACESSORIOS PINTURA", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 36, CD_FAMILIA_PAI: 6, DS_FAMILIA: "ACESSORIOS REVEST.", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 21, CD_FAMILIA_PAI: 1, DS_FAMILIA: "AÇO", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 31, CD_FAMILIA_PAI: 5, DS_FAMILIA: "AGUA QUENTE", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 68, CD_FAMILIA_PAI: 5, DS_FAMILIA: "AQUECEDOR GÁS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 40, CD_FAMILIA_PAI: 18, DS_FAMILIA: "ARGAMASSA", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 32, CD_FAMILIA_PAI: 5, DS_FAMILIA: "AZUL", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 100, CD_FAMILIA_PAI: 97, DS_FAMILIA: "BICOMPONENTES", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 20, CD_FAMILIA_PAI: 1, DS_FAMILIA: "BLOCO / LAJE", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 89, CD_FAMILIA_PAI: 45, DS_FAMILIA: "BRUTO", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 30, CD_FAMILIA_PAI: 5, DS_FAMILIA: "CALHA PLUVIAL", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 67, CD_FAMILIA_PAI: 5, DS_FAMILIA: "CAVALETES", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 49, CD_FAMILIA_PAI: 6, DS_FAMILIA: "CERAMICA BASE BRANCA", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 95, CD_FAMILIA_PAI: 6, DS_FAMILIA: "CERAMICA BASE VERMELHA", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 96, CD_FAMILIA_PAI: 6, DS_FAMILIA: "CERAMICA COMERCIAL", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 128, CD_FAMILIA_PAI: 110, DS_FAMILIA: "CERAMICOS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 73, CD_FAMILIA_PAI: 9, DS_FAMILIA: "CESTOS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 72, CD_FAMILIA_PAI: 9, DS_FAMILIA: "CHURRASQUEIRAS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 27, CD_FAMILIA_PAI: 5, DS_FAMILIA: "COLA", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 103, CD_FAMILIA_PAI: 97, DS_FAMILIA: "COLAS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 26, CD_FAMILIA_PAI: 7, DS_FAMILIA: "COMPLEMENTOS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 51, CD_FAMILIA_PAI: 6, DS_FAMILIA: "COMPLEMENTOS DECORATIVOS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 60, CD_FAMILIA_PAI: 2, DS_FAMILIA: "CONDUÍTES", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 66, CD_FAMILIA_PAI: 5, DS_FAMILIA: "CONEXÃO PVC", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 56, CD_FAMILIA_PAI: 2, DS_FAMILIA: "CONJUNTOS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 81, CD_FAMILIA_PAI: 11, DS_FAMILIA: "CUBAS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 106, CD_FAMILIA_PAI: null, DS_FAMILIA: "DECORACAO", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 118, CD_FAMILIA_PAI: null, DS_FAMILIA: "DECORACAO", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 130, CD_FAMILIA_PAI: 118, DS_FAMILIA: "DECORACAO", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 104, CD_FAMILIA_PAI: null, DS_FAMILIA: "DECORAÇÃO", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 88, CD_FAMILIA_PAI: 43, DS_FAMILIA: "DESBASTE / ABRASIVOS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 57, CD_FAMILIA_PAI: 2, DS_FAMILIA: "DISJUNTORES", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 59, CD_FAMILIA_PAI: 2, DS_FAMILIA: "DUCHAS E AQUECEDORES", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 120, CD_FAMILIA_PAI: null, DS_FAMILIA: "ELETRICA", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 28, CD_FAMILIA_PAI: 5, DS_FAMILIA: "ESGOTO", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 22, CD_FAMILIA_PAI: 7, DS_FAMILIA: "ESMALTE", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 41, CD_FAMILIA_PAI: 36, DS_FAMILIA: "ESPASSADOR", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 79, CD_FAMILIA_PAI: 10, DS_FAMILIA: "ESPELHEIRAS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 102, CD_FAMILIA_PAI: 97, DS_FAMILIA: "ESPUMA EXPANSIVA", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 16, CD_FAMILIA_PAI: 3, DS_FAMILIA: "ESQ FERRO", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 63, CD_FAMILIA_PAI: 3, DS_FAMILIA: "ESQ PVC", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 64, CD_FAMILIA_PAI: 4, DS_FAMILIA: "FECHADURAS E AFINS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 4, CD_FAMILIA_PAI: null, DS_FAMILIA: "FERRAGENS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 43, CD_FAMILIA_PAI: null, DS_FAMILIA: "FERRAMENTAS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 121, CD_FAMILIA_PAI: null, DS_FAMILIA: "FERRAMENTAS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 86, CD_FAMILIA_PAI: 43, DS_FAMILIA: "FERRAMENTAS ELETRICAS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 85, CD_FAMILIA_PAI: 43, DS_FAMILIA: "FERRAMENTAS MANUAIS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 87, CD_FAMILIA_PAI: 43, DS_FAMILIA: "FERRAMENTAS PNEUMATICAS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 75, CD_FAMILIA_PAI: 9, DS_FAMILIA: "FILTROS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 55, CD_FAMILIA_PAI: 2, DS_FAMILIA: "FIOS E CABOS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 65, CD_FAMILIA_PAI: 4, DS_FAMILIA: "FIXAÇÃO", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 17, CD_FAMILIA_PAI: 1, DS_FAMILIA: "GRANEL", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 5, CD_FAMILIA_PAI: null, DS_FAMILIA: "HIDRAULICA", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 122, CD_FAMILIA_PAI: null, DS_FAMILIA: "ILUMINACAO", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 58, CD_FAMILIA_PAI: 2, DS_FAMILIA: "ILUMINAÇÃO", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 97, CD_FAMILIA_PAI: null, DS_FAMILIA: "IMPERMEABILIZANTES / ADESIVOS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 108, CD_FAMILIA_PAI: null, DS_FAMILIA: "IMPERMEABILIZANTES E ADESIVOS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 82, CD_FAMILIA_PAI: 11, DS_FAMILIA: "INSTITUCIONAL", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 24, CD_FAMILIA_PAI: 7, DS_FAMILIA: "LATEX", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 123, CD_FAMILIA_PAI: null, DS_FAMILIA: "LAZER E JARDIM", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 38, CD_FAMILIA_PAI: 36, DS_FAMILIA: "LIMPA PEDRA", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 98, CD_FAMILIA_PAI: 97, DS_FAMILIA: "LIQUIDOS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 109, CD_FAMILIA_PAI: null, DS_FAMILIA: "LOUCA SANITARIAS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 124, CD_FAMILIA_PAI: null, DS_FAMILIA: "LOUCAS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 166, CD_FAMILIA_PAI: 124, DS_FAMILIA: "LOUCAS - BANHEIRO", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 83, CD_FAMILIA_PAI: 11, DS_FAMILIA: "LOUÇAS LUXO", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 84, CD_FAMILIA_PAI: 11, DS_FAMILIA: "LOUÇAS STAND", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 19, CD_FAMILIA_PAI: 1, DS_FAMILIA: "MADEIRA", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 34, CD_FAMILIA_PAI: 5, DS_FAMILIA: "MANGUEIRA", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 99, CD_FAMILIA_PAI: 97, DS_FAMILIA: "MANTAS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 92, CD_FAMILIA_PAI: 45, DS_FAMILIA: "MANUTENÇÃO", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 74, CD_FAMILIA_PAI: 9, DS_FAMILIA: "MATERIAIS LIMPEZA", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 125, CD_FAMILIA_PAI: null, DS_FAMILIA: "METAIS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 45, CD_FAMILIA_PAI: null, DS_FAMILIA: "METAIS SANITARIOS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 37, CD_FAMILIA_PAI: 36, DS_FAMILIA: "PAREDE", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 114, CD_FAMILIA_PAI: 110, DS_FAMILIA: "PASTILHA VIDRO", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 93, CD_FAMILIA_PAI: 6, DS_FAMILIA: "PEDRAS NATURAIS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 77, CD_FAMILIA_PAI: 10, DS_FAMILIA: "PIAS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 44, CD_FAMILIA_PAI: null, DS_FAMILIA: "PIAS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 174, CD_FAMILIA_PAI: 126, DS_FAMILIA: "PIAS G T - COZINHA", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 189, CD_FAMILIA_PAI: 126, DS_FAMILIA: "PIAS G T - TOUCADORES", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 126, CD_FAMILIA_PAI: null, DS_FAMILIA: "PIAS GABINETES E TANQUES", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 107, CD_FAMILIA_PAI: null, DS_FAMILIA: "PIAS GABINETES TOUCADORES E TANQUES", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 127, CD_FAMILIA_PAI: null, DS_FAMILIA: "PINTURA", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 110, CD_FAMILIA_PAI: null, DS_FAMILIA: "PISOS E REVESTIMENTOS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 113, CD_FAMILIA_PAI: 110, DS_FAMILIA: "PORCELANATO", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 94, CD_FAMILIA_PAI: 6, DS_FAMILIA: "PORCELANATO ESMALTADO", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 50, CD_FAMILIA_PAI: 6, DS_FAMILIA: "PORCELANATO POLIDO", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 54, CD_FAMILIA_PAI: 2, DS_FAMILIA: "POSTE / CAIXA", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 23, CD_FAMILIA_PAI: 7, DS_FAMILIA: "PVA", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 91, CD_FAMILIA_PAI: 45, DS_FAMILIA: "REGISTROS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 29, CD_FAMILIA_PAI: 5, DS_FAMILIA: "ROSCA", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 18, CD_FAMILIA_PAI: 1, DS_FAMILIA: "SACARIA", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 53, CD_FAMILIA_PAI: 52, DS_FAMILIA: "SERGIO", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 101, CD_FAMILIA_PAI: 97, DS_FAMILIA: "SILICONES", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 69, CD_FAMILIA_PAI: 7, DS_FAMILIA: "SOLVENTES", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 71, CD_FAMILIA_PAI: 9, DS_FAMILIA: "SUPORTES / PRATELEIRAS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 52, CD_FAMILIA_PAI: null, DS_FAMILIA: "TABEIRA", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 78, CD_FAMILIA_PAI: 10, DS_FAMILIA: "TANQUES", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 116, CD_FAMILIA_PAI: 5, DS_FAMILIA: "TANQUES E CAIXAS AMANCO", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 117, CD_FAMILIA_PAI: null, DS_FAMILIA: "TAXA DE ENTREGA", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 61, CD_FAMILIA_PAI: 2, DS_FAMILIA: "TELEFONIA / TV", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 42, CD_FAMILIA_PAI: 1, DS_FAMILIA: "TELHAS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 90, CD_FAMILIA_PAI: 45, DS_FAMILIA: "TORNEIRAS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 47, CD_FAMILIA_PAI: 33, DS_FAMILIA: "TUBO ESGOTO", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 46, CD_FAMILIA_PAI: 33, DS_FAMILIA: "TUBO MARRON", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 48, CD_FAMILIA_PAI: 33, DS_FAMILIA: "TUBO ROSCA", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 33, CD_FAMILIA_PAI: 5, DS_FAMILIA: "TUBOS PVC", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 246, CD_FAMILIA_PAI: null, DS_FAMILIA: "UTILIDADES", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 76, CD_FAMILIA_PAI: 9, DS_FAMILIA: "VARAIS", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 25, CD_FAMILIA_PAI: 7, DS_FAMILIA: "VERNIZ / SELADORA", CD_STATUS: "I", DS_STATUS: "Inativo" },
    //];

    //var datasourceDescontosFamiliasCliente = [
    //    { CD_EMPRESA: 180, CD_FAMILIA: 5, CD_FAMILIA_PAI: null, DS_FAMILIA: "HIDRAULICA", DS_FAMILIA: "HIDRAULICA", CD_STATUS: "I", CD_FORMA_PAGAMENTO: 5, PC_DESCONTO: 0.10000000, PC_ACRESCIMO: null, CD_LOGIN: "ROBSON", DT_CADASTRO: "Dec  5 2012  2:59PM", DS_STATUS: "Inativo" },
    //    { CD_EMPRESA: 180, CD_FAMILIA: 110, CD_FAMILIA_PAI: null, DS_FAMILIA: "PISOS E REVESTIMENTOS", DS_FAMILIA: "PISOS E REVESTIMENTOS", CD_STATUS: "I", CD_FORMA_PAGAMENTO: 5, PC_DESCONTO: 0.10000000, PC_ACRESCIMO: null, CD_LOGIN: "ROBSON", DT_CADASTRO: "Dec  5 2012  3:00PM", DS_STATUS: "Inativo" },
    //];

    //#endregion

    //#region [ Componentes ]    

    $('#file-manager').dxFileManager({
        name: 'fileManager',
        fileSystemProvider: donwloadFiles,
        rootFolderName: "Arquivos do Cliente",
        itemView: {
            mode: 'thumbnails',
            showFolders: false,
            showParentFolder: false,
        },
        height: 400,
        currentPath: "Documents/Images",
        permissions: {
            create: true,
            copy: true,
            move: true,
            delete: true,
            rename: true,
            upload: true,
            download: true,
        },
        customizeThumbnail(fileSystemItem) {
            if (fileSystemItem.isDirectory) { return 'images/thumbnails/folder.svg'; }

            const fileExtension = fileSystemItem.getFileExtension();
            switch (fileExtension) {
                case '.docx':
                    return '/img/icones-extensao-aplicativos/word.png';
                case '.doc':
                    return '/img/icones-extensao-aplicativos/word.png';
                case '.xls':
                    return '/img/icones-extensao-aplicativos/excel.png';
                case '.xlsx':
                    return '/img/icones-extensao-aplicativos/excel.png';
                case '.pdf':
                    return '/img/icones-extensao-aplicativos/pdf.png';
                case '.xml':
                    return '/img/icones-extensao-aplicativos/xml.png';
                case '.jpg':
                    return '/img/icones-extensao-aplicativos/imagens.png';
                case '.jpeg':
                    return '/img/icones-extensao-aplicativos/imagens.png';
                case '.png':
                    return '/img/icones-extensao-aplicativos/imagens.png';
                case '.bmp':
                    return '/img/icones-extensao-aplicativos/imagens.png';
                case '.gif':
                    return '/img/icones-extensao-aplicativos/imagens.png';
                case '.rar':
                    return '/img/icones-extensao-aplicativos/rar.png';
                case '.rft':
                    return '/img/icones-extensao-aplicativos/rft.png';
                case '.zip':
                    return '/img/icones-extensao-aplicativos/zip.png';
                case '.txt':
                    return '/img/icones-extensao-aplicativos/txt.png';
                default:
                    return '/img/icones-extensao-aplicativos/arquivo.png';
            }
        },
        allowedFileExtensions: ['.rar', '.png', '.jpg', '.jpeg', '.bmp', '.gif', '.pdf', '.zip', '.xls', '.xlsx', '.doc', '.docx', '.rtf', '.txt', '.xml'],

        onInitialized(e) {
            new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        e.component.repaint();
                    }
                });
            }).observe(e.element[0]);
        },
    });

    $('#lkp_Filtro_Pesquisa_Detalhada').dxLookup({
        dataSource: dataSourceFiltroConsultaDetalhada,
        searchExpr: ['DS_STATUS'],
        displayExpr: 'DS_STATUS',
        valueExpr: 'CD_STATUS',
        value: 'A',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Filtro',
        },
        labelMode: 'floating',
        label: 'Filtro',
        placeholder: 'Filtro',
        showClearButton: false,
    });


    $('#txt_Ds_Razao_Social').dxTextBox({
        labelMode: 'floating',
        label: 'Razão Social *',
        maxLength: 60,
        showClearButton: true,
        onValueChanged(e) {
            var razao = e.value;
            var fantasia = $('#txt_Ds_Nome_Fantasia').dxTextBox("instance").option('value');

            if (fantasia == null || fantasia == undefined || fantasia == '') {
                $('#txt_Ds_Nome_Fantasia').dxTextBox("instance").option('value', razao);
            }

        }
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Razão Social Obrigatório', }], validationGroup: 'Geral' });

    $('#txt_Ds_Nome_Fantasia').dxTextBox({
        labelMode: 'floating',
        label: 'Nome Fantasia *',
        maxLength: 60,
        showClearButton: true,
        onValueChanged(e) {
            var fantasia = e.value;
            var razao = $('#txt_Ds_Razao_Social').dxTextBox("instance").option('value');

            if (razao == null || razao == undefined || razao == '') {
                $('#txt_Ds_Razao_Social').dxTextBox("instance").option('value', fantasia);
            }

        }
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Nome Fantasia Obrigatório', }], validationGroup: 'Geral' });

    $('#txt_Cd_CPF_CNPJ').dxTextBox({
        labelMode: 'floating',
        label: 'CPF/CNPJ (somente números) *',
        mask: '',
        maxLength: 14,
        showClearButton: true,
        onFocusIn(e) {
            if (e.value.length == 11) {
                e.component.option('mask', '000.000.000-00');
                e.component.option('label', 'CPF');
            } else if (e.value.length == 14) {
                e.component.option('mask', '00.000.000/0000-00');
                e.component.option('label', 'CNPJ');
            } else {
                e.component.option('mask', '00000000000000');
                e.component.option('label', 'CPF/CNPJ');
            };
        },
        onValueChanged(e) {
            if (e.value.length == 11) {
                e.component.option('mask', '000.000.000-00');
                e.component.option('label', 'CPF');
            } else if (e.value.length == 14) {
                e.component.option('mask', '00.000.000/0000-00');
                e.component.option('label', 'CNPJ');
            } else {
                e.component.option('mask', '00000000000000');
                e.component.option('label', 'CPF/CNPJ (somente números)');
            };
        },
    }).dxValidator({ validationRules: [{ type: 'required', message: 'CPF/CNPJ Obrigatório', }], validationGroup: 'Geral' });

    $('#txt_Cd_IE').dxTextBox({
        labelMode: 'floating',
        label: 'Inscrição Estadual ou RG',
        maxLength: 25,
        showClearButton: true,
        buttons: [{
            name: 'btnIsento',
            location: 'after',
            options: {
                text: 'Isento',
                disabled: false,
                type: 'gray',
                onClick(e) {
                    if (e.component.option('text') === 'Isento') {
                        e.component.option('text', '');
                        e.component.option('icon', 'edit');
                        $("#txt_Cd_IE").dxTextBox("instance").option("value", "Isento");
                        $("#txt_Cd_IE").dxTextBox("instance").option("label", "Inscrição Estadual");
                        $("#txt_Cd_IE").dxTextBox("instance").option("readOnly", true);
                    } else {
                        e.component.option('text', 'Isento');
                        e.component.option('icon', '');
                        $("#txt_Cd_IE").dxTextBox("instance").option("value", "");
                        $("#txt_Cd_IE").dxTextBox("instance").option("readOnly", false);
                        $("#txt_Cd_IE").dxTextBox("instance").option("label", "Inscrição Estadual ou RG");
                        $("#txt_Cd_IE").dxTextBox("instance").focus();
                    }
                },
            },
        }],
    });


    $('#lkp_Atuacao').dxLookup({
        dataSource: dataSourceAtuacao,
        searchExpr: ['DS_ATUACAO'],
        displayExpr: 'DS_ATUACAO',
        valueExpr: 'CD_ATUACAO',
        value: 1,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Atuação do Cliente',
        },
        labelMode: 'floating',
        label: 'Atuação',
        placeholder: '',
        showClearButton: false,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Comprador Obrigatório', }], validationGroup: 'Geral' });

    $('#nbx_Cd_DDD_Telefone').dxNumberBox({
        value: '',
        format: '000',
        writeStylingMode: 'filled',
        min: 0,
        max: 999,
        showClearButton: true,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'DDD *',
    }).dxValidator({ validationRules: [{ type: 'required', message: 'DDD do Telefone Obrigatório', }], validationGroup: 'Geral' });

    $('#txt_Ds_Telefone').dxTextBox({
        labelMode: 'floating',
        label: 'Telefone Principal *',
        maxLength: 30,
        showClearButton: true,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Telefone Obrigatório', }], validationGroup: 'Geral' });

    $('#nbx_Cd_DDD_Fax').dxNumberBox({
        value: '',
        format: '000',
        min: 0,
        max: 999,
        showClearButton: true,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'DDD 2',
    });

    $('#txt_Ds_Fax').dxTextBox({
        labelMode: 'floating',
        label: 'Telefone 2',
        maxLength: 30,
        showClearButton: true,
    });

    $('#nbx_Cd_DDD_Celular').dxNumberBox({
        value: '',
        format: '000',
        min: 0,
        max: 999,
        showClearButton: true,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'DDD 3',
    });

    $('#txt_Ds_Celular').dxTextBox({
        labelMode: 'floating',
        label: 'Telefone 3',
        maxLength: 30,
        showClearButton: true,
    });

    $('#nbx_Cd_DDD_Celular_2').dxNumberBox({
        value: '',
        format: '000',
        min: 0,
        max: 999,
        showClearButton: true,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'DDD 4',
    });

    $('#txt_Ds_Celular_2').dxTextBox({
        labelMode: 'floating',
        label: 'Telefone 4',
        maxLength: 30,
        showClearButton: true,
    });

    $('#nbx_Cd_DDI_WhatsApp').dxNumberBox({
        value: '55',
        format: '000',
        min: 0,
        max: 999,
        showClearButton: false,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'DDI',
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Obrigatório para troca de mensagens via WhatsApp' }], validationGroup: 'whatsApp' });

    $('#nbx_Cd_DDD_WhatsApp').dxNumberBox({
        value: '',
        format: '000',
        min: 0,
        max: 999,
        showClearButton: false,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'DDD',
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Obrigatório para troca de mensagens via WhatsApp' }], validationGroup: 'whatsApp' });

    $('#nbx_Nr_WhatsApp').dxNumberBox({
        value: '',
        format: '000000000',
        showClearButton: true,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: ' WhastApp',
        buttons: [{
            name: 'whatsApp',
            location: 'after',
            options: {
                icon: 'fa fa-whatsapp',
                type: 'success',
                hint: 'Inicie uma conversa no WhatsApp com o Cliente',
                onClick(e) {
                    var ddi = $('#nbx_Cd_DDI_WhatsApp').dxNumberBox("instance").option('value');
                    var ddd = $('#nbx_Cd_DDD_WhatsApp').dxNumberBox("instance").option('value')
                    var numero = $('#nbx_Nr_WhatsApp').dxNumberBox("instance").option('value');
                    var celular = $('#nbx_Cd_DDI_WhatsApp').dxNumberBox("instance").option('value') + $('#nbx_Cd_DDD_WhatsApp').dxNumberBox("instance").option('value') + $('#nbx_Nr_WhatsApp').dxNumberBox("instance").option('value');
                    var contato = $('#txt_Ds_Contato').dxTextBox("instance").option('value');

                    const result = DevExpress.validationEngine.validateGroup("whatsApp");

                    if (result.isValid) {
                        iniciarConversaWhatsApp(celular, contato);
                    } else {
                        DevExpress.ui.notify({
                            message: 'Por favor, verifique o preenchimento dos campos obrigatórios para troca de mensagens via WhatsApp.',
                            type: 'error',
                            displayTime: 5000,
                        });
                    }
                },
            },
        }],
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Obrigatório para troca de mensagens via WhatsApp' }], validationGroup: 'whatsApp' });

    $('#txt_Ds_Email').dxTextBox({
        labelMode: 'floating',
        label: 'e-mails para NF-e (utilize ponto e vírgula para separar os e-mails)',
        maxLength: 1000,
        showClearButton: true,
    });

    $('#chk_Email_Envio_Periodicidade_Dias').dxCheckBox({
        value: true,
        text: "INTERVALO EM DIAS",
        elementAttr: {
            class: "class-checkbox-bold"
        },
    });

    $('#chk_Email_Envio_Dia_Especifico').dxCheckBox({
        value: false,
        text: "DIA FIXO DO MÊS",
        elementAttr: {
            class: "class-checkbox-bold"
        },
    });

    $('#txt_Ds_Email_Pedido').dxTextBox({
        labelMode: 'floating',
        label: 'e-mails do cliente (utilize ponto e vírgula para separar os e-mails)',
        maxLength: 1000,
        showClearButton: true,
    });

    $('#txt_Mensagem_Email_Pedido').dxTextArea({
        labelMode: 'floating',
        label: 'Mensagem do corpo do e-mail',
        height: 100,
        autoResizeEnabled: false,
        maxLength: 2000,
    }).dxTextArea('instance');

    $('#chk_Email_Orcamento').dxCheckBox({
        value: false,
        text: "Enviar Orçamentos",

        onValueChanged: function (e) {

            if (e.value == true) {

                $('#chk_Email_Lista_Pedidos_Aguardando_Faturamento').dxCheckBox("instance").option('readOnly', false);
                $('#chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos').dxCheckBox("instance").option('readOnly', false);
                $('#chk_Email_Pedido_Informar_Limite_Credito').dxCheckBox("instance").option('readOnly', false);

            } else if ($('#chk_Email_Pedidos_Faturados').dxCheckBox("instance").option('value') == false && $('#chk_Email_Pedidos_Conta_Corrente').dxCheckBox("instance").option('value') == false) {

                $('#chk_Email_Lista_Pedidos_Aguardando_Faturamento').dxCheckBox("instance").option('value', false);
                $('#chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos').dxCheckBox("instance").option('value', false);
                $('#chk_Email_Pedido_Informar_Limite_Credito').dxCheckBox("instance").option('value', false);

                $('#chk_Email_Lista_Pedidos_Aguardando_Faturamento').dxCheckBox("instance").option('readOnly', true);
                $('#chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos').dxCheckBox("instance").option('readOnly', true);
                $('#chk_Email_Pedido_Informar_Limite_Credito').dxCheckBox("instance").option('readOnly', true);

            };
        },

    });

    $('#chk_Email_Pedidos_Faturados').dxCheckBox({
        value: false,
        text: "Enviar Pedidos Faturados",

        onValueChanged: function (e) {

            if (e.value == true) {

                $('#chk_Email_Lista_Pedidos_Aguardando_Faturamento').dxCheckBox("instance").option('readOnly', false);
                $('#chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos').dxCheckBox("instance").option('readOnly', false);
                $('#chk_Email_Pedido_Informar_Limite_Credito').dxCheckBox("instance").option('readOnly', false);

            } else if ($('#chk_Email_Orcamento').dxCheckBox("instance").option('value') == false && $('#chk_Email_Pedidos_Conta_Corrente').dxCheckBox("instance").option('value') == false) {

                $('#chk_Email_Lista_Pedidos_Aguardando_Faturamento').dxCheckBox("instance").option('value', false);
                $('#chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos').dxCheckBox("instance").option('value', false);
                $('#chk_Email_Pedido_Informar_Limite_Credito').dxCheckBox("instance").option('value', false);

                $('#chk_Email_Lista_Pedidos_Aguardando_Faturamento').dxCheckBox("instance").option('readOnly', true);
                $('#chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos').dxCheckBox("instance").option('readOnly', true);
                $('#chk_Email_Pedido_Informar_Limite_Credito').dxCheckBox("instance").option('readOnly', true);

            };
        },
    });

    $('#chk_Email_Pedidos_Conta_Corrente').dxCheckBox({
        value: false,
        text: "Enviar Pedidos Aguardando Faturamento (Conta Corrente)",

        onValueChanged: function (e) {

            if (e.value == true) {

                $('#chk_Email_Lista_Pedidos_Aguardando_Faturamento').dxCheckBox("instance").option('readOnly', false);
                $('#chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos').dxCheckBox("instance").option('readOnly', false);
                $('#chk_Email_Pedido_Informar_Limite_Credito').dxCheckBox("instance").option('readOnly', false);

            } else if ($('#chk_Email_Orcamento').dxCheckBox("instance").option('value') == false && $('#chk_Email_Pedidos_Faturados').dxCheckBox("instance").option('value') == false) {

                $('#chk_Email_Lista_Pedidos_Aguardando_Faturamento').dxCheckBox("instance").option('value', false);
                $('#chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos').dxCheckBox("instance").option('value', false);
                $('#chk_Email_Pedido_Informar_Limite_Credito').dxCheckBox("instance").option('value', false);

                $('#chk_Email_Lista_Pedidos_Aguardando_Faturamento').dxCheckBox("instance").option('readOnly', true);
                $('#chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos').dxCheckBox("instance").option('readOnly', true);
                $('#chk_Email_Pedido_Informar_Limite_Credito').dxCheckBox("instance").option('readOnly', true);

            };
        },
    });

    $('#chk_Email_Lista_Pedidos_Aguardando_Faturamento').dxCheckBox({
        value: false,
        text: "Somente quando houver novos pedidos ou orçamentos no período, enviar também uma lista de pedidos antigos Aguardando Faturamento (Conta Corrente)",
        readOnly: true,

        onValueChanged: function (e) {

            if (e.value == true) {
                $('#chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos').dxCheckBox("instance").option('value', false);
            };
        },
    });

    $('#chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos').dxCheckBox({
        value: false,
        text: "Sempre enviar uma lista de pedidos antigos Aguardando Faturamento (Conta Corrente), mesmo que não existam novos pedidos ou orçamentos no período",
        readOnly: true,

        onValueChanged: function (e) {

            if (e.value == true) {
                $('#chk_Email_Lista_Pedidos_Aguardando_Faturamento').dxCheckBox("instance").option('value', false);
            };
        },
    });

    $('#chk_Email_Pedido_Informar_Limite_Credito').dxCheckBox({
        value: false,
        text: "Informar saldo do Limite de Crédito nos e-mails",
        readOnly: true,
    });

    $('#nbx_Email_Pedido_Periodicidade').dxNumberBox({
        value: '',
        format: 'a cada ### dias',
        min: 0,
        max: 999,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        placeholder: 'Frequência em dias',
        //labelMode: 'floating',
        //label: 'Periodicidade',
    });

    let dayEnvio = new DevExpress.ui.dxDateBox("#Dt_Dia_Envio_Email_Pedido", {
        //labelMode: 'floating',
        //label: 'Dia do mês',
        placeholder: 'Dia do mês',
        readOnly: false,
        showClearButton: true,
        useMaskBehavior: true,
        displayFormat: "'todo dia' dd",
        onInitialized: e => {
            e.component.option('returnDay', () => {
                const value = e.component.option('value');
                if (value == null) return value;
                return value.getDate();
            });
        },
        onOpened: e => {
            const $content = e.component._popup._$popupContent;
            $content.find('.dx-calendar-navigator').css('display', 'none');
            $content.find('.dx-calendar-body').css('top', '0px');
            $content.find('[aria-label="Calendário"]').find('thead').css('display', 'none');
            $content.find('[aria-label="Calendário"]').find('.dx-calendar-other-month').css('display', 'none');
        },

        onContentReady: function (e) {
            e.component.option('inputAttr', { readonly: true })
        },

        calendarOptions: {
            maxZoomLevel: 'month',
            minZoomLevel: 'month',
            min: new Date(2023, 0, 1),
            max: new Date(2023, 0, 31),
        },
        type: 'date',
        //value: new Date(2023, 0, new Date().getDate()),
    });

    let dayInicial = new DevExpress.ui.dxDateBox("#Dt_Dia_Fechamento_Inicial_Email_Pedido", {
        //labelMode: 'floating',
        //label: 'Entre',
        placeholder: 'Entre',
        readOnly: false,
        showClearButton: true,
        useMaskBehavior: true,
        displayFormat: "'entre o dia' dd",
        onInitialized: e => {
            e.component.option('returnDay', () => {
                const value = e.component.option('value');
                if (value == null) return value;
                return value.getDate();
            });
        },
        onOpened: e => {
            const $content = e.component._popup._$popupContent;
            $content.find('.dx-calendar-navigator').css('display', 'none');
            $content.find('.dx-calendar-body').css('top', '0px');
            $content.find('[aria-label="Calendário"]').find('thead').css('display', 'none');
            $content.find('[aria-label="Calendário"]').find('.dx-calendar-other-month').css('display', 'none');
        },

        onContentReady: function (e) {
            e.component.option('inputAttr', { readonly: true })
        },

        onValueChanged: function (e) {
            var diaInicial = dayInicial.option().returnDay();
            var diaFinal

            if (diaInicial == 1) {
                diaFinal = 31;
            } else {
                diaFinal = diaInicial - 1;
            };

            dayFinal.option('value', new Date(2023, 0, diaFinal));
        },

        calendarOptions: {
            maxZoomLevel: 'month',
            minZoomLevel: 'month',
            min: new Date(2023, 0, 1),
            max: new Date(2023, 0, 31),
        },
        type: 'date',
        //value: new Date(2023, 0, new Date().getDate()),
    });

    let dayFinal = new DevExpress.ui.dxDateBox("#Dt_Dia_Fechamento_Final_Email_Pedido", {
        //labelMode: 'floating',
        //label: 'Até',
        placeholder: 'Até',
        readOnly: true,
        showClearButton: true,
        useMaskBehavior: true,
        displayFormat: "'até o dia' dd",
        onInitialized: e => {
            e.component.option('returnDay', () => {
                const value = e.component.option('value');
                if (value == null) return value;
                return value.getDate();
            });
        },
        onOpened: e => {
            const $content = e.component._popup._$popupContent;
            $content.find('.dx-calendar-navigator').css('display', 'none');
            $content.find('.dx-calendar-body').css('top', '0px');
            $content.find('[aria-label="Calendário"]').find('thead').css('display', 'none');
            $content.find('[aria-label="Calendário"]').find('.dx-calendar-other-month').css('display', 'none');
        },
        onContentReady: function (e) {
            e.component.option('inputAttr', { readonly: true })
        },
        calendarOptions: {
            maxZoomLevel: 'month',
            minZoomLevel: 'month',
            min: new Date(2023, 0, 1),
            max: new Date(2023, 0, 31),
        },
        type: 'date',
        //value: new Date(2023, 0, new Date().getDate()),
    });

    $('#txt_Ds_Contato').dxTextBox({
        labelMode: 'floating',
        label: 'Contato *',
        maxLength: 60,
        showClearButton: true,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Contato Obrigatório', }], validationGroup: 'Geral' });

    $('#txt_Ds_Profissao').dxTextBox({
        labelMode: 'floating',
        label: 'Profissão',
        maxLength: 20,
        showClearButton: true,
    });

    $('#txt_Ds_Web_Site').dxTextBox({
        labelMode: 'floating',
        label: 'Website do Cliente',
        maxLength: 150,
        showClearButton: true,
    });

    $('#txt_Obs_Pedido_Nota').dxTextArea({
        labelMode: 'floating',
        //label: 'Observação',
        autoResizeEnabled: true,
        maxLength: 4000,
    }).dxTextArea('instance');

    $('#chk_Incluir_Obs_Nota_Fiscal').dxCheckBox({
        value: false,
        text: "Incluir a observação acima em Notas Fiscais emitidas para o Cliente",
    });

    $('#chk_Incluir_Obs_Pedido').dxCheckBox({
        value: false,
        text: "Incluir a observação acima em Pedidos emitidos para o Cliente",
    });

    $('#chk_Optante_Simples').dxCheckBox({
        value: false,
        text: "Optante pelo Simples",
    });

    $('#chk_Nao_Contribuinte_ICMS').dxCheckBox({
        value: false,
        text: "Cliente não contribuinte do ICMS",
    });

    $('#chk_Orgao_Publico').dxCheckBox({
        value: false,
        text: "Cliente é Orgão Público",
    });

    $('#chk_Nao_Calcular_FCP').dxCheckBox({
        value: false,
        text: "Não calcular FCP (Fundo de Combate a Pobreza) para este cliente na emissão da NF-e",
    });

    $('#nbx_Pc_Substituicao_Tributaria').dxNumberBox({
        value: '',
        format: '###,###,###,##0.00 %',
        min: 0,
        showClearButton: true,
        showSpinButtons: true,
        step: 0.01,
        labelMode: 'floating',
        label: '% Subst. Tribut. Liminar',
    });

    $('#txt_CNAE').dxTextBox({
        labelMode: 'floating',
        label: 'Código do CNAE',
        maxLength: 20,
        showClearButton: true,
    });

    $('#txt_Codigo_Beneficio_Fiscal').dxTextBox({
        labelMode: 'floating',
        label: 'Código do Benefício Fiscal',
        maxLength: 20,
        showClearButton: true,
    });

    $('#txt_Suframa').dxTextBox({
        labelMode: 'floating',
        label: 'Código do Suframa',
        maxLength: 20,
        showClearButton: true,
    });

    $('#txt_Obs_Nao_Destacada').dxTextArea({
        labelMode: 'floating',
        //label: 'Observação não destacada em Pedidos ou NF-e',
        autoResizeEnabled: true,
        maxLength: 4000,
    }).dxTextArea('instance');

    $('#chk_Controla_Limite_Credito').dxCheckBox({
        value: false,
        text: "Aplicar controle de limite de crédito",
    });

    $('#nbx_Limite_Credito').dxNumberBox({
        value: '',
        format: 'R$ ###,###,###,##0.00', //ATENÇÃO: Este campo de formatação de moeda deverá retornar da tabela de Parâmetros Corporativos (NÃO DEVE SER FIXO)
        min: 0,
        showClearButton: true,
        showSpinButtons: true,
        step: 1000,
        labelMode: 'floating',
        label: 'Limite de Crédito',
    });

    $('#nbx_Limite_Credito_Utilizado').dxNumberBox({
        value: 0,
        format: 'R$ ###,###,###,##0.00', //ATENÇÃO: Este campo de formatação de moeda deverá retornar da tabela de Parâmetros Corporativos (NÃO DEVE SER FIXO)
        min: 0,
        showClearButton: true,
        showSpinButtons: true,
        step: 1000,
        labelMode: 'floating',
        label: 'Limite Utilizado',
        readOnly: true,
    });

    $('#nbx_Limite_Credito_Disponivel').dxNumberBox({
        value: 0,
        format: 'R$ ###,###,###,##0.00', //ATENÇÃO: Este campo de formatação de moeda deverá retornar da tabela de Parâmetros Corporativos (NÃO DEVE SER FIXO)
        min: 0,
        showClearButton: true,
        showSpinButtons: true,
        step: 1000,
        labelMode: 'floating',
        label: 'Limite Disponível',
        readOnly: true,
    });

    $('#chk_Enviar_Cartorio').dxCheckBox({
        value: false,
        text: "Ativar lembrete no Relatório de Contas a Receber para envio de títulos vencidos para cartório, de acordo com a quantidade de dias de atraso prenchido no campo abaixo",
    });

    $('#nbx_Dias_Vencimento_Envio_Cartorio').dxNumberBox({
        value: '',
        format: '###,###,###,##0',
        min: 0,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        labelMode: 'floating',
        label: 'Dias de atraso',
    });

    $('#txt_Ds_Endereco').dxTextBox({
        labelMode: 'floating',
        label: 'Endereço',
        maxLength: 100,
        showClearButton: true,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Obrigatório para troca de mensagens via WhatsApp' }], validationGroup: 'Endereco' });

    $('#nbx_Nr_Endereco').dxNumberBox({
        value: '',
        format: '#####',
        min: 0,
        max: 99999,
        maxLength: 5,
        showClearButton: true,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'Número',
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Obrigatório para troca de mensagens via WhatsApp' }], validationGroup: 'Endereco' });

    $('#txt_Ds_Endereco_Compl').dxTextBox({
        labelMode: 'floating',
        label: 'Complemento',
        maxLength: 40,
        showClearButton: true,
    });

    $('#txt_Ds_Endereco_Referencia').dxTextBox({
        labelMode: 'floating',
        label: 'Ponto de Referência',
        maxLength: 500,
        showClearButton: true,
    });

    $('#txt_Ds_Bairro').dxTextBox({
        labelMode: 'floating',
        label: 'Bairro',
        maxLength: 100,
        showClearButton: true,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Obrigatório para troca de mensagens via WhatsApp' }], validationGroup: 'Endereco' });

    $('#nbx_Cd_CEP').dxNumberBox({
        value: '',
        format: '00000000',
        min: 0,
        max: 99999999,
        showClearButton: true,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'CEP',
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Obrigatório para troca de mensagens via WhatsApp' }], validationGroup: 'Endereco' });

    $("#gaugeLimiteCredito").dxLinearGauge({
        value: 85,
        top: 0,
        scale: {
            startValue: 0,
            endValue: 100,
            tickInterval: 50,
            minorTickInterval: 10,
            minorTick: {
                visible: true,
            },
            label: {
                customizeText(arg) {
                    return `${arg.valueText}%`;
                },
                font: { size: 11 },
            },
        },

        valueIndicator: {
            type: 'rangebar',
            color: '#92000A',
        },
        size: {
            height: 50,
        },

        tooltip: {
            enabled: true,
            customizeTooltip(arg) {
                let result = `<b>${arg.valueText}% utilizado</b> <br/> <br/> Limite: R$ 15.000,00 <br/> Utilizado: R$ 12.750,00 <br/> <br/> <b>Disponível: R$ 2.250,00</b>`;

                return {
                    text: result,
                };
            },
        },

        onInitialized(e) {
            var valor = e.component.option('value');

            if (valor <= 69) {
                e.component.option('valueIndicator', { color: "#28A745" });
            } else if (valor <= 84) {
                e.component.option('valueIndicator', { color: "#ee9b00" });
            } else {
                e.component.option('valueIndicator', { color: "#DC3545" });
            };

            new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        e.component.render();
                    }
                });
            }).observe(e.element[0]);
        },
    });

    $('#dropButtonCadastrosDependentes').dxDropDownButton({
        text: 'Cadastros Dependentes',
        icon: 'hierarchy',
        elementAttr: {
            class: "drop-down-button"
        },
        items: [
            {
                text: 'Atuação de Clientes',
                icon: "spinnext",
                onClick(e) {
                    DevExpress.ui.notify(e.itemData.text, 'success', 3000);
                },
            },
            {
                text: 'Categoria de Clientes',
                icon: "spinnext",
                onClick(e) {
                    DevExpress.ui.notify(e.itemData.text, 'success', 3000);
                },
            },
            {
                text: 'Controle de Acesso',
                icon: "spinnext",
                onClick(e) {
                    DevExpress.ui.notify(e.itemData.text, 'success', 3000);
                },
            },
            {
                text: 'Contas Correntes',
                icon: "spinnext",
                onClick(e) {
                    DevExpress.ui.notify(e.itemData.text, 'success', 3000);
                },
            },
            {
                text: 'Equipes de Venda',
                icon: "spinnext",
                onClick(e) {
                    DevExpress.ui.notify(e.itemData.text, 'success', 3000);
                },
            },
            {
                text: 'Forma de Pagamento',
                icon: "spinnext",
                onClick(e) {
                    DevExpress.ui.notify(e.itemData.text, 'success', 3000);
                },
            },
            {
                text: 'Condição de Pagamento',
                icon: "spinnext",
                onClick(e) {
                    DevExpress.ui.notify(e.itemData.text, 'success', 3000);
                },
            },
            {
                text: 'Ramos de Atividade',
                icon: "spinnext",
                onClick(e) {
                    DevExpress.ui.notify(e.itemData.text, 'success', 3000);
                },
            },
            {
                text: 'Tabelas de Preço',
                icon: "spinnext",
                onClick(e) {
                    DevExpress.ui.notify(e.itemData.text, 'success', 3000);
                },
            },
            {
                text: 'Transportadora',
                icon: "spinnext",
                onClick(e) {
                    DevExpress.ui.notify(e.itemData.text, 'success', 3000);
                },
            },
        ],
    });

    //Campos do formulário de envio do pedido por e-mail
    $('#txt_Remetente_Email').dxTextBox({
        labelMode: 'floating',
        label: 'Máscara do remetente',
        value: 'Loja ABC - Filial 2',
        showClearButton: true,
    });

    $('#txt_Destinatario_Email').dxTextBox({
        labelMode: 'floating',
        label: 'E-mail do destinatário (mais de um e-mail deve ser separado por vírgula)',
        value: 'meu.email@meuemail.com.br',
        showClearButton: true,
    });

    $('#txt_Assunto_Email').dxTextBox({
        labelMode: 'floating',
        label: 'Assunto',
        value: 'Pedido de Compra - #35472',
        showClearButton: true,
    });

    $('#txt_Corpo_Email').dxTextArea({
        labelMode: 'floating',
        label: 'Texto do e-mail',
        value: 'Segue pedido de compra #35472.',
        height: 90,
        maxLength: 4000,
    }).dxTextArea('instance');

    $('#ckb_Anexar_Pedido_Email').dxCheckBox({
        value: true,
        text: "Anexar o pedido de compra no e-mail",
    });

    //Fim dos campos do formulário de envio do pedido por e-mail

    //Campos do formulário de envio do pedido por WhatsApp
    $('#txt_Telefone_WhatsApp').dxTextBox({
        labelMode: 'floating',
        label: 'Número WhatsApp do Cliente',
        mask: '+00 (00) 00000-0000',
        //maskRules: { X: /[02-9]/ },
        value: '55(11)96857-2256',
        showClearButton: true,
    });

    $('#txt_Mensagem_WhatsApp').dxTextArea({
        labelMode: 'floating',
        label: 'Mensagem Inicial',
        value: 'Olá, segue link para o Pedido de Venda #35472 \nLoja ABC Ltda, Filial 2.',
        height: 90,
        maxLength: 4000,
    }).dxTextArea('instance');

    $('#ckb_Enviar_Link_Pedido_WhatsApp').dxCheckBox({
        value: true,
        text: "Enviar link na mensagem para o Forncedor baixar o pedido",
    });

    //Fim dos campos do formulário de envio do pedido por WhatsApp

    $('#gaugeEspacoDisponivel').dxLinearGauge({
        scale: {
            startValue: 0,
            endValue: 100,
            tickInterval: 50,
            minorTickInterval: 10,
            minorTick: {
                visible: true,
            },
            label: {
                customizeText(arg) {
                    return `${arg.valueText}%`;
                },
                font: { size: 10 },
            },
        },
        size: {
            height: 50,
        },
        valueIndicator: {
            type: 'rangebar',
            color: '#92000A',
        },
        tooltip: {
            enabled: true,
            customizeTooltip(arg) {
                let result = `<b>${arg.valueText}Mb utilizado</b> <br/> <br/> Espaço total: 100Mb <br/> Espaço utilizado: 65Mb <br/> <br/> <b> Espaço disponível: 35Mb</b>`;

                return {
                    text: result,
                };
            },
        },
        export: {
            enabled: false,
        },
        value: 65,
        onInitialized(e) {
            var valor = e.component.option('value');

            if (valor <= 69) {
                e.component.option('valueIndicator', { color: "#28A745" });
            } else if (valor <= 84) {
                e.component.option('valueIndicator', { color: "#ee9b00" });
            } else {
                e.component.option('valueIndicator', { color: "#DC3545" });
            };

            new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) e.component.render();
                });
            }).observe(e.element[0]);
        },
    });

    $('#toolbarProdutosPrecoFixo').dxToolbar({
        items: [
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Alterar Forma e Condição dos produtos selecionados',
                    icon: 'fa fa-credit-card',
                    onClick() {
                        AbrirModal('#ModalAlterarFormaCondicaoPrecoFixo');
                    },
                },
            },
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Alterar Tipo de Despacho dos produtos selecionados',
                    icon: 'fa fa-truck',
                    onClick() {
                        AbrirModal('#ModalAlterarDespachoPrecoFixo');
                    },
                },
            },
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Alterar Desconto Máximo dos produtos selecionados',
                    icon: 'fa fa-percent',
                    onClick() {
                        AbrirModal('#ModalAlterarDescontoMaximo');
                    },
                },
            },
            //{
            //    locateInMenu: 'always',
            //    widget: 'dxButton',
            //    options: {
            //        text: 'Limpar Forma de Pagamento dos produtos selecionados',
            //        icon: 'fa fa-eraser',
            //        onClick() {
            //            AbrirModal('#ModalConfirmacaoLimparFormaProdutoPrecoFixo');
            //        },
            //    },
            //},
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Limpar Condição de Pagamento dos produtos selecionados',
                    icon: 'fa fa-eraser',
                    onClick() {
                        AbrirModal('#ModalConfirmacaoLimparCondicaoProdutoPrecoFixo');
                    },
                },
            },
            //    {
            //        locateInMenu: 'always',
            //        widget: 'dxButton',
            //        options: {
            //            text: 'Limpar Tipo de Despacho dos produtos selecionados',
            //            icon: 'fa fa-eraser',
            //            onClick() {
            //                AbrirModal('#ModalConfirmacaoLimparDespachoProdutoPrecoFixo');
            //            },
            //        },
            //    },
            //    {
            //        locateInMenu: 'always',
            //        widget: 'dxButton',
            //        options: {
            //            text: 'Limpar Desconto Máximo dos produtos selecionados',
            //            icon: 'fa fa-eraser',
            //            onClick() {
            //                AbrirModal('#ModalConfirmacaoLimparDescontoMaximoProdutoPrecoFixo');
            //            },
            //        },
            //    },
        ],
    });


    $('#toolbarDescontoProdutos').dxToolbar({
        items: [
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Alterar Forma de Pagamento dos produtos selecionados',
                    icon: 'fa fa-credit-card',
                    onClick() {
                        AbrirModal('#ModalAlterarFormaDescontoProduto');
                    },
                },
            },
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Alterar Desconto dos produtos selecionados',
                    icon: 'fa fa-percent',
                    onClick() {
                        AbrirModal('#ModalAlterarDescontoProduto');
                    },
                },
            },
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Alterar Acréscimo dos produtos selecionados',
                    icon: 'fa fa-percent',
                    onClick() {
                        AbrirModal('#ModalAlterarAcrescimoProduto');
                    },
                },
            },
        ],
    });


    $('#nbx_Pc_Alteracao_Desconto_Produto_Cliente').dxNumberBox({
        value: '',
        format: '###,###,###,##0.#####%',
        showClearButton: false,
        showSpinButtons: true,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: '',
        },
        //labelMode: 'floating',
        //label: 'Novo Desconto',
        placeholder: 'Novo Desconto',
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Desconto é Obrigatório', }], validationGroup: 'AlterarDescontoProduto' }).dxNumberBox('instance');

    $('#nbx_Pc_Alteracao_Acrescimo_Produto_Cliente').dxNumberBox({
        value: '',
        format: '###,###,###,##0.#####%',
        showClearButton: false,
        showSpinButtons: true,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: '',
        },
        //labelMode: 'floating',
        //label: 'Desconto Acréscimo',
        placeholder: 'Novo Acréscimo',
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Acréscimo é Obrigatório', }], validationGroup: 'AlterarAcrescimoProduto' }).dxNumberBox('instance');

    $('#toolbarDescontoFamilias').dxToolbar({
        items: [
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Alterar Forma de Pagamento das Famílias selecionadas',
                    icon: 'fa fa-credit-card',
                    onClick() {
                        AbrirModal('#ModalAlterarFormaDescontoFamilias');
                    },
                },
            },
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Alterar Desconto das Famílias selecionadas',
                    icon: 'fa fa-percent',
                    onClick() {
                        AbrirModal('#ModalAlterarDescontoFamilias');
                    },
                },
            },
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Alterar Acréscimo das Famílias selecionadas',
                    icon: 'fa fa-percent',
                    onClick() {
                        AbrirModal('#ModalAlterarAcrescimoFamilias');
                    },
                },
            },
        ],
    });

    $('#nbx_Pc_Alteracao_Desconto_Familias_Cliente').dxNumberBox({
        value: '',
        format: '###,###,###,##0.#####%',
        showClearButton: false,
        showSpinButtons: true,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: '',
        },
        //labelMode: 'floating',
        //label: 'Novo Desconto',
        placeholder: 'Novo Desconto',
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Desconto é Obrigatório', }], validationGroup: 'AlterarDescontoFamilias' }).dxNumberBox('instance');

    $('#nbx_Pc_Alteracao_Acrescimo_Familias_Cliente').dxNumberBox({
        value: '',
        format: '###,###,###,##0.#####%',
        showClearButton: false,
        showSpinButtons: true,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: '',
        },
        //labelMode: 'floating',
        //label: 'Desconto Acréscimo',
        placeholder: 'Novo Acréscimo',
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Acréscimo é Obrigatório', }], validationGroup: 'AlterarAcrescimoFamilias' }).dxNumberBox('instance');

    var operadorReajuste = $('#lkp_Operador_Reajuste').dxLookup({
        dataSource: dataSourceOperacaoReajuste,
        searchExpr: ['DS_OPERACAO'],
        displayExpr: 'DS_OPERACAO',
        valueExpr: 'CD_OPERACAO',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Operação',
        },
        labelMode: 'floating',
        label: 'Operação',
        placeholder: '',
        showClearButton: false,
        onSelectionChanged: function (e) {

            //Valoriza variável com o conteúdo selecionado para utilizar fora da função do componente
            valorOperadorReajuste = e.selectedItem.CD_OPERACAO;

            //Quando o usuário trocar de Operador de Reajuste será necessário reconfigurar o Number Box duas vezes para que ele vá para a configuração adequada de acordo com o Operador.
            configuraNumberBoxCustoFrete(componenteBotaoNumberBox);
            configuraNumberBoxCustoFrete(componenteBotaoNumberBox);

            document.getElementById("ValidacaoCampos").style.display = 'none';

        },
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Operador Obrigatório', }], validationGroup: 'ReajustaPrecoFixo' }).dxLookup('instance');

    var valorReajuste = $('#nbx_Valor_Reajuste').dxNumberBox({
        value: '',
        format: '###,###,###,##0.#####%',
        showClearButton: false,
        showSpinButtons: true,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: '',
        },
        labelMode: 'floating',
        label: 'Percentual de reajuste',
        placeholder: '',
        buttons: [{
            name: 'currency',
            location: 'after',
            options: {
                text: '%',
                stylingMode: 'text',
                width: 40,
                elementAttr: {
                    class: 'currency',
                    class: 'botao-number-box',
                },
                onInitialized(e) {
                    //Seta a variável que representa o botão deste Number Box para que seja possível parametrizá-lo em outras funções fora do componente
                    componenteBotaoNumberBox = e;
                },
                onClick(e) {

                    //Seta a variável que representa o botão deste Number Box para que seja possível parametrizá-lo em outras funções fora do componente
                    componenteBotaoNumberBox = e;

                    //Chama função para reconfigurar o NumberBox
                    configuraNumberBoxCustoFrete(componenteBotaoNumberBox);
                },
            },
        }, 'clear', 'spins'],
        onKeyPress(e) {
            document.getElementById("ValidacaoCampos").style.display = 'none';
        },
        onChange(e) {
            //Valoriza variável com o conteúdo selecionado para utilizar fora da função do componente
            valorNumberBoxCustoFrete = e.component._changedValue;
            componenteValorReajuste = e;
            document.getElementById("ValidacaoCampos").style.display = 'none';
        }
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Fator do Reajuste Obrigatório', }], validationGroup: 'ReajustaPrecoFixo' }).dxNumberBox('instance');


    $('#lkp_Alterar_Despacho_Preco_Fixo').dxLookup({
        dataSource: dataSourceTipoDespacho,
        searchExpr: ['DS_ENTREGA'],
        displayExpr: 'DS_ENTREGA',
        valueExpr: 'CD_ENTREGA',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Tipo de Despacho',
        },
        //labelMode: 'floating',
        //label: 'Novo Tipo de Despacho',
        placeholder: 'Novo Despacho',
        showClearButton: true,
    });
    //}).dxValidator({ validationRules: [{ type: 'required', message: 'Tipo de Despacho Obrigatório', }], validationGroup: 'AlterarDespachoPrecoFixo' });

    var valorAlteracaoDescontoMaximoGrid = $('#nbx_Pc_Alteracao_Desconto_Maximo_Grid').dxNumberBox({
        value: '',
        format: '###,###,###,##0.#####%',
        showClearButton: false,
        showSpinButtons: true,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: '',
        },
        //labelMode: 'floating',
        //label: 'Desconto Máximo',
        placeholder: 'Desconto Máximo',
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Desconto Máximo Obrigatório', }], validationGroup: 'AlterarDescontoMaximo' }).dxNumberBox('instance');

    //#endregion

    //#region [ EM CONSTRUÇÃO ]

    //****** ESTAUDAR COM FELIPE COMO FAREMOS COM AS QUERYS INTERNAS DO GRID QUE ALIMENTAM LOOKUPS QUE ESTÃO DENTRO DE COLUNAS
    //****** LOOKUP DE CIDADES DENTRO DE GRIDS ESTÁ DEMORANDO MUITO PARA CARREGAR
    var dataSourceMunicipios;
    var dataSourceRegiao;
    var dataSourceFormaPagamento;

    //****************************************************************
    //*** AS QUERYS ABAIXO SÃO EXECUTADAS NO CARREGAMENTO DA TELA  ***
    //****************************************************************

    //GetAzureDataSource(25, '{EXEC_PARAM: "SEL", EXEC_PROCEDIMENTO: 1, CD_CPF_CNPJ_CONSULTA: "16090958808"}').then((result) => {

    //    if (result.success) {

    //        console.log(result);
    //    }
    //    else {
    //        DevExpress.ui.notify({
    //            message: `${result.name}: ${result.error}`,
    //            type: 'error',
    //            displayTime: 5000,
    //        });
    //        console.error(`${result.name}: ${result.error}`);
    //    }
    //});

    //Consulta de Cliente Simplificada
    GetAzureDataSource(42, '{ CD_CPF_CNPJ: "06555218878" }').then((result) => {

        if (result.success) {

            listHistoricoSerasa = $('#lstHistoricoSerasa').dxList({
                dataSource: result.data,
                height: '90%',
                searchEnabled: true,
                searchExpr: ['DT_FORMATADA', 'NR_PONTUACAO', 'PC_CHANCE_PAGAMENTO', 'DS_RESTRICAO', 'CD_LOGIN', 'DS_RETORNO_JSON', 'DS_RETORNO_HTML'],
                selectionMode: 'single',
                itemTemplate(data) {
                    var dataConsultaSerasa = data.DT_CONSULTA;
                    var dataConsultaSerasaFormatada = data.DT_FORMATADA;
                    var pontuacaoConsutlaSerasa = 'Pontuação: ' + data.NR_PONTUACAO;
                    var chancePagtoConsutlaSerasa = 'Chance Pagto: ' + data.PC_CHANCE_PAGAMENTO + '%';
                    var restricaoConsutlaSerasa = data.DS_RESTRICAO;

                    if (data.LG_RESTRICAO == true) {
                        var classeRestricao = 'alert alert-danger'
                    } else {
                        var classeRestricao = ''
                    }

                    return $('<div>')
                        .append($('<div class="titulo-list ' + classeRestricao + ' p-0 mb-1 mt-1 text-center">').text(restricaoConsutlaSerasa))
                        .append($('<div class="titulo-list text-center">').text(dataConsultaSerasaFormatada))
                        .append($('<div class="item-list text-center">').text(pontuacaoConsutlaSerasa))
                        .append($('<div class="item-list text-center">').text(chancePagtoConsutlaSerasa));
                },
                menuItems: [
                    {
                        text: 'Visualizar Consulta',
                        icon: 'unselectall',
                        action: function (e) {
                        },
                    }, {
                        text: 'Imprimir Consulta',
                        icon: 'edit',
                        action: function (e) {

                        },
                    },
                ],
                onItemClick(e) {
                    //document.getElementById("produtosTabelaPreco").style.display = 'block';
                    resultadoConsultaSerasa();
                },
            }).dxList('instance');

        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });


    //Consulta de Cliente Simplificada
    GetAzureDataSource(5).then((result) => {

        if (result.success) {

            $('#lkp_Cliente_Pesquisa').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_PESQUISA'],
                displayExpr: 'DS_PESQUISA',
                valueExpr: 'CD_PESQUISA',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Clientes',
                },
                //labelMode: 'floating',
                //label: 'Clientes',
                placeholder: 'Pesquisar um Cliente para edição',
                showClearButton: true,
            });

            $('#lkp_Cliente_Indicador').dxLookup({
                dataSource: new DevExpress.data.CustomStore({
                    loadMode: 'raw',
                    key: 'CD_PESQUISA',
                    load() {
                        return result.data;
                    },
                }),
                searchExpr: ['DS_PESQUISA'],
                displayExpr: 'DS_PESQUISA',
                valueExpr: 'CD_PESQUISA',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Clientes',
                },
                labelMode: 'floating',
                label: 'Cliente indicado por',
                placeholder: 'Indicado por',
                showClearButton: true,
            });
        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Consulta Tabela de Preços
    GetAzureDataSource(2, '{ CD_STATUS: "A" }').then((result) => {

        if (result.success) {

            $('#lkp_Tabela_Preco').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_PESQUISA'],
                displayExpr: 'DS_PESQUISA',
                valueExpr: 'CD_PESQUISA',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Tabela de Preços',
                },
                labelMode: 'floating',
                label: 'Tabela de Preço do Cliente',
                placeholder: 'Tabela de Preço do Cliente',
                showClearButton: true,
            });
        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Consulta Municípios
    GetAzureDataSource(14, '{ }').then((result) => {

        if (!result.success) {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }

        dataSourceMunicipios = result.data;

        $('#lkp_Ds_Municipio').dxLookup({
            dataSource: result.data,
            searchExpr: ['DS_MUNICIPIO_UF'],
            displayExpr: 'DS_MUNICIPIO_UF',
            valueExpr: 'CD_MUNICIPIO',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Cidade',
            },
            labelMode: 'floating',
            label: 'Cidade',
            placeholder: '',
            showClearButton: true,
        }).dxValidator({ validationRules: [{ type: 'required', message: 'Cidade é Obrigatória' }], validationGroup: 'Endereco' });
    });

    //Consulta Categorias de Clientes
    GetAzureDataSource(6, '{ CD_STATUS: "A" }').then((result) => {

        if (result.success) {

            $('#lkp_Categoria').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_CATEGORIA_CLIENTE'],
                displayExpr: 'DS_CATEGORIA_CLIENTE',
                valueExpr: 'CD_CATEGORIA_CLIENTE',
                //value: 1,
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Categoria do Cliente',
                },
                labelMode: 'floating',
                label: 'Categoria',
                placeholder: '',
                showClearButton: false,
            });

        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Consulta Forma e Condição de Pagamento Combinadas
    GetAzureDataSource(8, '{ CD_STATUS: "A" }').then((result) => {

        if (result.success) {

            $('#lkp_Forma_Condicao_Pagamento').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_PESQUISA'],
                displayExpr: 'DS_PESQUISA',
                valueExpr: 'CD_PESQUISA',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Forma e Condição',
                },
                labelMode: 'floating',
                label: 'Forma de Pagamento para Faturamento',
                placeholder: 'Forma e Condição de Pagamento',
                showClearButton: true,
            });

        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Consulta Ramos de Atividades
    GetAzureDataSource(9, '{ CD_STATUS: "A" }').then((result) => {

        if (result.success) {

            $('#lkp_Ramo_Atividade').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_RAMO_ATIVIDADE'],
                displayExpr: 'DS_RAMO_ATIVIDADE',
                valueExpr: 'CD_RAMO_ATIVIDADE',
                value: 1,
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Ramo de Atividade',
                },
                labelMode: 'floating',
                label: 'Ramo de Atividade',
                placeholder: '',
                showClearButton: false,
            });

        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Consulta Contas Correntes Bancárias comfiguradas para Cobrança via CNAB
    GetAzureDataSource(1, '{ CD_STATUS: "A" }').then((result) => {

        if (result.success) {

            $('#lkp_Conta_Corrente_Boleto').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_PESQUISA'],
                displayExpr: 'DS_PESQUISA',
                valueExpr: 'CD_CHAVE',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Conta Corrente para emissão de Boleto de Cobrança',
                    //width: 400,
                },
                labelMode: 'floating',
                label: 'Conta Corrente para emissão de Boleto de Cobrança',
                placeholder: 'Conta Corrente para emissão de Boleto de Cobrança',
                showClearButton: true,
                readOnly: false,
            });

        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Consulta Transportadoras
    GetAzureDataSource(3, '{ CD_STATUS: "A" }').then((result) => {

        if (result.success) {

            $('#lkp_Transportadoras').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_PESQUISA'],
                displayExpr: 'DS_PESQUISA',
                valueExpr: 'CD_PESQUISA',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Transportadoras',
                },
                labelMode: 'floating',
                label: 'Transportadora padrão do Cliente',
                placeholder: 'Transportadora padrão do Cliente',
                showClearButton: true,
            });

        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Consulta Regiões de Endereços
    GetAzureDataSource(10, '{ CD_STATUS: "A" }').then((result) => {

        if (result.success) {

            dataSourceRegiao = result.data;

            $('#lkp_Regiao').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_REGIAO'],
                displayExpr: 'DS_REGIAO',
                valueExpr: 'CD_REGIAO',
                //value: 1,
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Região',
                },
                labelMode: 'floating',
                label: 'Região',
                placeholder: '',
                showClearButton: true,
            });

        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Consulta detalhada de Produtos (TagBox com DataGrid)
    GetAzureDataSource(16, '{ CD_STATUS: "A" }').then((result) => {

        if (result.success) {

            let dataGrid;

            const makeAsyncDataSourceProdutos = function () {
                return new DevExpress.data.CustomStore({
                    loadMode: 'raw',
                    key: 'CD_PRODUTO',
                    load() {
                        return result.data;
                    },
                });
            };

            $('#gridBoxProdutos').dxDropDownBox({
                valueExpr: 'CD_PRODUTO',
                displayExpr: 'CD_PRODUTO',
                labelMode: 'floating',
                label: '+ Adicionar produtos com preço fixo para o Cliente',
                placeholder: '+ Adicionar produtos com preço fixo para o Cliente',
                showClearButton: true,
                dataSource: makeAsyncDataSourceProdutos(),
                contentTemplate(e) {
                    const value = e.component.option('value');
                    const $dataGrid = $('<div>').dxDataGrid({
                        dataSource: e.component.getDataSource(),

                        searchExpr: ['DS_PRODUTO'],
                        displayExpr: 'DS_PRODUTO',
                        valueExpr: 'CD_PRODUTO',
                        wordWrapEnabled: true,
                        showRowLines: true,
                        rowAlternationEnabled: true,
                        editing: {
                            mode: 'batch',
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
                                type: "selection",
                                width: 30,
                            },
                            {
                                dataField: "LG_FORA_LINHA",
                                caption: "Fora Linha",
                                width: 40,
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'center',
                                visible: false,
                                allowHeaderFiltering: false,
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_PRODUTO",
                                caption: "Código Interno",
                                width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "DS_PRODUTO",
                                caption: "Descrição Produto",
                                width: 250,
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_FABRICANTE",
                                caption: "Código Fabricante",
                                //width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_ORIGINAL",
                                caption: "Código Original",
                                //width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: false,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_OPCIONAL",
                                caption: "Código Opcional",
                                //width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: false,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_EAN_PRODUTO",
                                caption: "Código Barras",
                                //width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: false,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_NCM",
                                caption: "NCM",
                                //width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: false,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "DS_MARCA",
                                caption: "Marca",
                                //width: 100,
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                visible: false,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_FORNECEDOR",
                                caption: "Código Fornecedor",
                                width: 90,
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                alignment: 'center',
                                visible: false,
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "DS_RAZAO_SOCIAL",
                                caption: "Fornecedor Padrão (Razão Social)",
                                //width: 250,
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                visible: false,
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "DS_FANTASIA",
                                caption: "Fornecedor Padrão (Fantasia)",
                                //width: 250,
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: false,
                                visible: false,
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_CURVA_ABC",
                                caption: "A B C",
                                width: 55,
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                visible: false,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "DS_FAMILIA",
                                caption: "Família",
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                visible: false,
                                cssClass: "column-data-grid",
                            },
                            {
                                dataField: "VL_PRECO_MINIMO_VENDA",
                                caption: "Preço Atual",
                                width: 70,
                                dataType: "number",
                                format: "###,###,###,##0.00##",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                cssClass: "column-data-grid",
                            },
                            {
                                dataField: "VL_PRECO_VENDA",
                                caption: "Preço do Cliente",
                                width: 70,
                                dataType: "number",
                                format: "###,###,###,##0.00##",
                                allowEditing: true,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                cssClass: "column-data-grid",
                                //setCellValue: function (newData, value, currentRowData) {

                                //    var tabelaFinal = value - (value * (currentRowData.PC_DESCONTO_TABELA))
                                //    var tabelaFinal = tabelaFinal - (tabelaFinal * (currentRowData.PC_DESCONTO_TOTAL))

                                //    newData.VL_TABELA = value;
                                //    newData.VL_TABELA_FINAL = tabelaFinal;
                                //},

                            },
                            {
                                dataField: "CD_FORMA_PAGAMENTO",
                                caption: "Forma",
                                allowEditing: true,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                cssClass: "column-data-grid",
                                lookup: {
                                    dataSource: dataSourceFormaPagamento,
                                    valueExpr: "CD_FORMA_PAGAMENTO",
                                    displayExpr: "DS_FORMA_PAGAMENTO",
                                    searchExpr: ["CD_FORMA_PAGAMENTO", "DS_FORMA_PAGAMENTO"]
                                },
                                alignment: 'center',
                                visible: true,
                            },
                            {
                                dataField: "CD_CONDICAO_PAGAMENTO",
                                caption: "Condição",
                                allowEditing: true,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                cssClass: "column-data-grid",
                                lookup: {
                                    dataSource: dataSourceCondicaoPagamentoPorForma,
                                    valueExpr: "CD_CONDICAO_PAGAMENTO",
                                    displayExpr: "DS_CONDICAO_PAGAMENTO",
                                    searchExpr: ["DS_CONDICAO_PAGAMENTO"]
                                },
                                alignment: 'center',
                                visible: true,
                            },
                            {
                                dataField: "CD_ENTREGA",
                                caption: "Despacho",
                                width: 90,
                                allowEditing: true,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                alignment: "center",
                                cssClass: "column-data-grid",
                                lookup: {
                                    dataSource: dataSourceTipoDespacho,
                                    valueExpr: "CD_ENTREGA",
                                    displayExpr: "DS_ENTREGA",
                                    searchExpr: ["DS_ENTREGA"],
                                    dropDownOptions: {
                                        closeOnOutsideClick: true,
                                        width: 400,
                                    },
                                },
                                alignment: 'center',
                                visible: true,
                            },
                            {
                                dataField: "PC_MAXIMO_DESCONTO",
                                caption: "% Desc. Máximo",
                                width: 55,
                                dataType: "number",
                                format: "###,###,###,##0.##%",
                                allowEditing: true,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                cssClass: "column-data-grid",
                                setCellValue: function (newData, value, currentRowData) {

                                    var desconto = value / 100
                                    newData.PC_MAXIMO_DESCONTO = desconto;
                                },
                                alignment: 'center',
                            },


                        ],

                        toolbar: {
                            items: [
                                {
                                    location: 'after',
                                    widget: 'dxButton',
                                    options: {
                                        text: 'Adicionar Produtos',
                                        hint: "Adicionar produtos selecionados",
                                        width: 150,
                                        icon: 'save',
                                        onClick(e) {

                                            $("#gridBoxProdutos").dxDropDownBox("instance").close();

                                            new PNotify({
                                                title: 'Concluído',
                                                text: 'Produtos adicionados com sucesso!',
                                                type: 'success'
                                            });

                                            $("#gridBoxProdutos").dxDropDownBox("instance").option("value", null);

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
                                if (e.column.dataField === "LG_FORA_LINHA") {
                                    e.cellElement.css("background-color", e.data.DS_COLOR_FORA_LINHA);
                                    e.cellElement.css("color", "white");
                                }
                                if (e.column.dataField === "PC_MAXIMO_DESCONTO" || e.column.dataField === "VL_PRECO_VENDA" || e.column.dataField === "CD_FORMA_PAGAMENTO" || e.column.dataField === "CD_CONDICAO_PAGAMENTO" || e.column.dataField === "CD_ENTREGA") {
                                    e.cellElement.css("background-color", "#EDF3F8");
                                    //e.cellElement.css("font-weight", "bold");

                                    if (e.value < 0) {
                                        e.cellElement.css("color", "#d00000");
                                    };
                                }
                            }
                        },

                        paging: { enabled: true, pageSize: 10 },
                        scrolling: { mode: 'virtual' },
                        selectedRowKeys: [value],
                        height: '100%',
                        onSelectionChanged(selectedItems) {
                            const keys = selectedItems.selectedRowKeys;
                            e.component.option('value', keys);
                        },
                    });

                    dataGrid = $dataGrid.dxDataGrid('instance');

                    e.component.on('valueChanged', (args) => {
                        const { value } = args;
                        dataGrid.selectRows(value, false);
                    });

                    return $dataGrid;
                },

            });


            let dataGridDescontosProdutos;

            const makeAsyncDataSourceProdutosDescontos = function () {
                return new DevExpress.data.CustomStore({
                    loadMode: 'raw',
                    key: 'CD_PRODUTO',
                    load() {
                        return result.data;
                    },
                });
            };

            $('#gridBoxProdutosDescontos').dxDropDownBox({
                valueExpr: 'CD_PRODUTO',
                displayExpr: 'CD_PRODUTO',
                labelMode: 'floating',
                label: '+ Adicionar produtos com descontos ou acréscimos para o Cliente',
                placeholder: '+ Adicionar produtos com descontos ou acréscimos para o Cliente',
                showClearButton: true,
                dataSource: makeAsyncDataSourceProdutosDescontos(),
                contentTemplate(e) {
                    const value = e.component.option('value');
                    const $dataGridDescontosProdutos = $('<div>').dxDataGrid({
                        dataSource: e.component.getDataSource(),

                        searchExpr: ['DS_PRODUTO'],
                        displayExpr: 'DS_PRODUTO',
                        valueExpr: 'CD_PRODUTO',
                        wordWrapEnabled: true,
                        showRowLines: true,
                        rowAlternationEnabled: true,
                        editing: {
                            mode: 'batch',
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
                                type: "selection",
                                width: 30,
                            },
                            {
                                dataField: "LG_FORA_LINHA",
                                caption: "Fora Linha",
                                width: 40,
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'center',
                                visible: false,
                                allowHeaderFiltering: false,
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_PRODUTO",
                                caption: "Código Interno",
                                width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "DS_PRODUTO",
                                caption: "Descrição Produto",
                                width: 250,
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_FABRICANTE",
                                caption: "Código Fabricante",
                                //width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_ORIGINAL",
                                caption: "Código Original",
                                //width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: false,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_OPCIONAL",
                                caption: "Código Opcional",
                                //width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: false,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_EAN_PRODUTO",
                                caption: "Código Barras",
                                //width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: false,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_NCM",
                                caption: "NCM",
                                //width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: false,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "DS_MARCA",
                                caption: "Marca",
                                //width: 100,
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                visible: false,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_FORNECEDOR",
                                caption: "Código Fornecedor",
                                width: 90,
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                alignment: 'center',
                                visible: false,
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "DS_RAZAO_SOCIAL",
                                caption: "Fornecedor Padrão (Razão Social)",
                                //width: 250,
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                visible: false,
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "DS_FANTASIA",
                                caption: "Fornecedor Padrão (Fantasia)",
                                //width: 250,
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: false,
                                visible: false,
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_CURVA_ABC",
                                caption: "A B C",
                                width: 55,
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                visible: false,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "DS_FAMILIA",
                                caption: "Família",
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                visible: false,
                                cssClass: "column-data-grid",
                            },
                            {
                                dataField: "VL_PRECO_MINIMO_VENDA",
                                caption: "Preço Atual",
                                width: 70,
                                dataType: "number",
                                format: "###,###,###,##0.00##",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                cssClass: "column-data-grid",
                            },
                            {
                                dataField: "CD_FORMA_PAGAMENTO",
                                caption: "Forma",
                                allowEditing: true,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                cssClass: "column-data-grid",
                                lookup: {
                                    dataSource: dataSourceFormaPagamento,
                                    valueExpr: "CD_FORMA_PAGAMENTO",
                                    displayExpr: "DS_FORMA_PAGAMENTO",
                                    searchExpr: ["CD_FORMA_PAGAMENTO", "DS_FORMA_PAGAMENTO"]
                                },
                                alignment: 'center',
                                visible: true,
                            },
                            {
                                dataField: "PC_DESCONTO",
                                caption: "% Desconto",
                                width: 70,
                                dataType: "number",
                                format: "###,###,###,##0.##%",
                                allowEditing: true,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                setCellValue: function (newData, value, currentRowData) {

                                    var desconto = value / 100
                                    newData.PC_DESCONTO = desconto;
                                    newData.PC_ACRESCIMO = 0;
                                    newData.VL_PRECO_FINAL = currentRowData.VL_PRECO_MINIMO_VENDA - (currentRowData.VL_PRECO_MINIMO_VENDA * (value / 100));

                                },
                                alignment: 'center',
                            },
                            {
                                dataField: "PC_ACRESCIMO",
                                caption: "% Acréscimo",
                                width: 70,
                                dataType: "number",
                                format: "###,###,###,##0.##%",
                                allowEditing: true,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                setCellValue: function (newData, value, currentRowData) {

                                    var desconto = value / 100

                                    newData.PC_ACRESCIMO = desconto;
                                    newData.PC_DESCONTO = 0;
                                    newData.VL_PRECO_FINAL = (currentRowData.VL_PRECO_MINIMO_VENDA * (1 + (value / 100)));
                                    console.log("VALOR: ", value);
                                },
                                alignment: 'center',
                            },

                            {
                                dataField: "VL_PRECO_FINAL",
                                caption: "Preço do Cliente",
                                width: 70,
                                dataType: "number",
                                format: "###,###,###,##0.00##",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                cssClass: "column-data-grid",
                            },

                        ],

                        toolbar: {
                            items: [
                                {
                                    location: 'after',
                                    widget: 'dxButton',
                                    options: {
                                        text: 'Adicionar Produtos',
                                        hint: "Adicionar produtos selecionados",
                                        width: 150,
                                        icon: 'save',
                                        onClick(e) {

                                            AbrirModal("#ModalDefinirFormaDescontoProdutos");

                                            $("#gridBoxProdutosDescontos").dxDropDownBox("instance").close();

                                            new PNotify({
                                                title: 'Concluído',
                                                text: 'Produtos adicionados com sucesso!',
                                                type: 'success'
                                            });

                                            $("#gridBoxProdutosDescontos").dxDropDownBox("instance").option("value", null);

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
                                if (e.column.dataField === "LG_FORA_LINHA") {
                                    e.cellElement.css("background-color", e.data.DS_COLOR_FORA_LINHA);
                                    e.cellElement.css("color", "white");
                                }
                                if (e.column.dataField === "PC_DESCONTO" || e.column.dataField === "PC_ACRESCIMO" || e.column.dataField === "CD_FORMA_PAGAMENTO") {
                                    e.cellElement.css("background-color", "#EDF3F8");
                                    //e.cellElement.css("font-weight", "bold");

                                    if (e.value < 0) {
                                        e.cellElement.css("color", "#d00000");
                                    };
                                }
                            }
                        },

                        paging: { enabled: true, pageSize: 10 },
                        scrolling: { mode: 'virtual' },
                        selectedRowKeys: [value],
                        height: '100%',
                        onSelectionChanged(selectedItems) {
                            const keys = selectedItems.selectedRowKeys;
                            e.component.option('value', keys);
                        },
                    });

                    dataGridDescontosProdutos = $dataGridDescontosProdutos.dxDataGrid('instance');

                    e.component.on('valueChanged', (args) => {
                        const { value } = args;
                        dataGridDescontosProdutos.selectRows(value, false);
                    });

                    return $dataGridDescontosProdutos;
                },

            });


        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Consulta detalhada de Famílias (TagBox com DataGrid)
    GetAzureDataSource(20, '{ CD_STATUS: "A" }').then((result) => {

        if (result.success) {

            let dataGridDescontosFamilias;

            // Expandir todas as linhas do TreeList
            function expandAllNodes(treeList) {
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

            // Retrair todas as linhas do TreeList
            function collapseAllNodes(treeList) {
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

            const makeAsyncDataSourceFamiliasDescontos = function () {
                return new DevExpress.data.CustomStore({
                    loadMode: 'raw',
                    key: 'CD_FAMILIA',
                    load() {
                        return result.data;
                    },
                });
            };

            $('#gridBoxFamiliasDescontos').dxDropDownBox({
                valueExpr: 'CD_FAMILIA',
                displayExpr: 'CD_FAMILIA',
                labelMode: 'floating',
                label: '+ Adicionar famílias de produtos com descontos ou acréscimos para o Cliente',
                placeholder: '+ Adicionar famílias de produtos com descontos ou acréscimos para o Cliente',
                showClearButton: true,
                dataSource: makeAsyncDataSourceFamiliasDescontos(),
                contentTemplate(e) {
                    const value = e.component.option('value');
                    const $dataGridDescontosFamilias = $('<div>').dxTreeList({
                        dataSource: e.component.getDataSource(),
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
                            mode: 'batch',
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
                            //{
                            //    type: "selection",
                            //    width: 52,
                            //    cssClass: "column-data-grid",
                            //},
                            {
                                dataField: "DS_FAMILIA",
                                caption: "Famílias",
                                //width: 250,
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
                                dataField: "CD_FORMA_PAGAMENTO",
                                caption: "Forma",
                                width: 250,
                                allowEditing: true,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                cssClass: "column-data-grid",
                                lookup: {
                                    dataSource: dataSourceFormaPagamento,
                                    valueExpr: "CD_FORMA_PAGAMENTO",
                                    displayExpr: "DS_FORMA_PAGAMENTO",
                                    searchExpr: ["CD_FORMA_PAGAMENTO", "DS_FORMA_PAGAMENTO"]
                                },
                                alignment: 'center',
                                visible: true,
                            },
                            {
                                dataField: "PC_DESCONTO",
                                caption: "% Desconto",
                                width: 110,
                                dataType: "number",
                                format: "###,###,###,##0.##%",
                                allowEditing: true,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                setCellValue: function (newData, value, currentRowData) {

                                    var desconto = value / 100
                                    newData.PC_DESCONTO = desconto;
                                    newData.PC_ACRESCIMO = 0;
                                    newData.VL_PRECO_FINAL = currentRowData.VL_PRECO_MINIMO_VENDA - (currentRowData.VL_PRECO_MINIMO_VENDA * (value / 100));

                                },
                                alignment: 'center',
                            },
                            {
                                dataField: "PC_ACRESCIMO",
                                caption: "% Acréscimo",
                                width: 110,
                                dataType: "number",
                                format: "###,###,###,##0.##%",
                                allowEditing: true,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                setCellValue: function (newData, value, currentRowData) {

                                    var desconto = value / 100

                                    newData.PC_ACRESCIMO = desconto;
                                    newData.PC_DESCONTO = 0;
                                    newData.VL_PRECO_FINAL = (currentRowData.VL_PRECO_MINIMO_VENDA * (1 + (value / 100)));
                                    console.log("VALOR: ", value);
                                },
                                alignment: 'center',
                            },

                        ],

                        toolbar: {
                            items: [
                                {
                                    location: 'after',
                                    widget: 'dxButton',
                                    options: {
                                        text: 'Adicionar Famílias',
                                        hint: "Adicionar famílias selecionados",
                                        width: 150,
                                        icon: 'save',
                                        onClick(e) {

                                            AbrirModal("#ModalDefinirFormaDescontoFamilias");

                                            $("#gridBoxFamiliasDescontos").dxDropDownBox("instance").close();

                                            new PNotify({
                                                title: 'Concluído',
                                                text: 'Famílias adicionados com sucesso!',
                                                type: 'success'
                                            });

                                            $("#gridBoxFamiliasDescontos").dxDropDownBox("instance").option("value", null);

                                        },
                                    },
                                },
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

                                                collapseAllNodes(dataGridDescontosFamilias);
                                                e.component.option('text', 'Expandir Famílias');
                                                e.component.option('icon', 'hierarchy');

                                            } else {

                                                expandAllNodes(dataGridDescontosFamilias);
                                                e.component.option('text', 'Fechar Famílias');
                                                e.component.option('icon', 'hidepanel');

                                            };
                                        },
                                    },
                                },

                                'groupPanel',
                                'columnChooserButton',
                                'searchPanel',
                            ],
                        },

                        showBorders: true,

                        //onInitialized: function (e) {
                        //    e.component.option("filterValue", ["DS_STATUS", "=", "Ativo"]);
                        //},

                        onCellPrepared: function (e) {
                            if (e.rowType === "data") {
                                if (e.column.dataField === "PC_DESCONTO" || e.column.dataField === "PC_ACRESCIMO" || e.column.dataField === "CD_FORMA_PAGAMENTO") {
                                    e.cellElement.css("background-color", "#EDF3F8");
                                    //e.cellElement.css("font-weight", "bold");

                                    if (e.value < 0) {
                                        e.cellElement.css("color", "#d00000");
                                    };
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
                        selectedRowKeys: [value],
                        height: '100%',
                        onSelectionChanged(selectedItems) {
                            const keys = selectedItems.selectedRowKeys;
                            e.component.option('value', keys);
                        },
                    });

                    dataGridDescontosFamilias = $dataGridDescontosFamilias.dxTreeList('instance');

                    e.component.on('valueChanged', (args) => {
                        const { value } = args;
                        dataGridDescontosFamilias.selectRows(value, false);
                    });

                    return $dataGridDescontosFamilias;
                },

            });


        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Consulta Formas de Pagamento
    GetAzureDataSource(17, '{ CD_STATUS: "A" }').then((result) => {

        if (result.success) {

            dataSourceFormaPagamento = result.data;

            $('#lkp_Alterar_Forma_Preco_Fixo').dxLookup({
                dataSource: result.data,
                searchExpr: ['CD_FORMA_PAGAMENTO', 'DS_FORMA_PAGAMENTO'],
                displayExpr: 'DS_FORMA_PAGAMENTO',
                valueExpr: 'CD_FORMA_PAGAMENTO',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Forma de Pagamento',
                },
                labelMode: 'floating',
                label: 'Nova Forma de Pagamento',
                placeholder: 'Nova Forma de Pagamento',
                showClearButton: true,
                onValueChanged(e) {
                    exibirCondicaoPorFormaPrecoFixo(e.value);
                },
            });

            $('#tag_Definir_Forma_Desconto_Produtos').dxTagBox({
                dataSource: result.data,
                searchExpr: ['CD_FORMA_PAGAMENTO', 'DS_FORMA_PAGAMENTO'],
                displayExpr: 'DS_FORMA_PAGAMENTO',
                valueExpr: 'CD_FORMA_PAGAMENTO',
                searchEnabled: true,
                showSelectionControls: true,
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Forma de Pagamento',
                },
                //labelMode: 'floating',
                //label: 'Nova Forma de Pagamento',
                placeholder: 'Definir Formas de Pagamento *',
                showClearButton: true,
            }).dxValidator({ validationRules: [{ type: 'required', message: 'Ao menos uma Forma de Pagamento é Obrigatória', }], validationGroup: 'DefinirFormaProdutos' }).dxTagBox('instance');

            $('#lkp_Alterar_Forma_Desconto_Produto').dxLookup({
                dataSource: result.data,
                searchExpr: ['CD_FORMA_PAGAMENTO', 'DS_FORMA_PAGAMENTO'],
                displayExpr: 'DS_FORMA_PAGAMENTO',
                valueExpr: 'CD_FORMA_PAGAMENTO',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Forma de Pagamento',
                },
                labelMode: 'floating',
                label: 'Nova Forma de Pagamento',
                placeholder: 'Nova Forma de Pagamento',
                showClearButton: true,
            }).dxValidator({ validationRules: [{ type: 'required', message: 'Forma de Pagamento é Obrigatória', }], validationGroup: 'AlterarFormaProdutos' }).dxLookup('instance');

            $('#tag_Definir_Forma_Desconto_Familias').dxTagBox({
                dataSource: result.data,
                searchExpr: ['CD_FORMA_PAGAMENTO', 'DS_FORMA_PAGAMENTO'],
                displayExpr: 'DS_FORMA_PAGAMENTO',
                valueExpr: 'CD_FORMA_PAGAMENTO',
                searchEnabled: true,
                showSelectionControls: true,
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Forma de Pagamento',
                },
                //labelMode: 'floating',
                //label: 'Nova Forma de Pagamento',
                placeholder: 'Definir Formas de Pagamento *',
                showClearButton: true,
            }).dxValidator({ validationRules: [{ type: 'required', message: 'Ao menos uma Forma de Pagamento é Obrigatória', }], validationGroup: 'DefinirFormaFamilias' }).dxTagBox('instance');

            $('#lkp_Alterar_Forma_Desconto_Familias').dxLookup({
                dataSource: result.data,
                searchExpr: ['CD_FORMA_PAGAMENTO', 'DS_FORMA_PAGAMENTO'],
                displayExpr: 'DS_FORMA_PAGAMENTO',
                valueExpr: 'CD_FORMA_PAGAMENTO',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Forma de Pagamento',
                },
                //labelMode: 'floating',
                //label: 'Nova Forma de Pagamento',
                placeholder: 'Nova Forma de Pagamento *',
                showClearButton: true,
            }).dxValidator({ validationRules: [{ type: 'required', message: 'Forma de Pagamento Obrigatória', }], validationGroup: 'AlterarFormaFamilias' }).dxLookup('instance');

        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Consulta Endereços do Cliente
    //*** CARREGAMENTO DEVE SER FEITO QUANDO O USUÁRIO SELECIONAR UM CLIENTE PARA ALTERAÇÃO E O CPF/CNPJ DEVE SER INFORMADO COMO PARÂMETRO ***
    GetAzureDataSource(7, '{ CD_CPF_CNPJ: "16090958808" }').then((result) => {

        if (result.success) {

            const gridEnderecos = $("#grid_Enderecos_Cliente").dxDataGrid({
                dataSource: result.data,
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
                    mode: 'popup',
                    allowUpdating: true,
                    startEditAction: 'dblClick',
                    allowAdding: true,
                    allowDeleting: false,
                    useIcons: true,

                    popup: {
                        //title: 'Cadastro de Endereço',
                        showTitle: true,
                        titleTemplate: function (element) {
                            const $title = $("<div class='mb-3 mt-3 ml-2' style='font-size: 18px'>").text("Cadastro de Endereço");
                            element.append($title);
                        },
                        maxWidth: 900,
                        height: 450,
                    },

                    form: {
                        labelMode: 'floating',
                        items: [
                            {
                                itemType: 'group',
                                colCount: 4,
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: 'CD_CEP',
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                            {
                                                type: "numeric",
                                                message: "Este campo aceita apenas números",
                                            },
                                            {
                                                type: "stringLength",
                                                min: 8,
                                                max: 8,
                                                message: "O CEP deve conter 8 dígitos numéricos",
                                            },
                                        ],
                                        editorOptions: {
                                            maxLength: 8,
                                        }
                                    },
                                    {
                                        dataField: 'CD_TIPO_ENDERECO',
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                        ],
                                    },
                                    {
                                        dataField: "CD_STATUS",
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                        ],
                                    },

                                ],

                            },
                            {
                                itemType: 'group',
                                colCount: 4,
                                colSpan: 2,
                                items: [
                                    {
                                        itemType: 'group',
                                        colCount: 1,
                                        colSpan: 3,
                                        items: [
                                            {
                                                dataField: "DS_ENDERECO",
                                                editorOptions: {
                                                    maxLength: 60,
                                                },
                                                validationRules: [
                                                    {
                                                        type: 'required',
                                                        message: "Campo obrigatório",
                                                    },
                                                ],
                                            },
                                        ],

                                    },
                                    {
                                        itemType: 'group',
                                        colCount: 1,
                                        colSpan: 2,
                                        items: [
                                            {
                                                dataField: "NR_ENDERECO",
                                                editorOptions: {
                                                    maxLength: 6,
                                                },
                                                validationRules: [
                                                    {
                                                        type: 'required',
                                                        message: "Campo obrigatório",
                                                    },
                                                ],
                                            },
                                        ],

                                    },
                                ],

                            },
                            {
                                itemType: 'group',
                                colCount: 2,
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: "DS_ENDERECO_COMPL",
                                        editorOptions: {
                                            maxLength: 40,
                                        },
                                    },
                                    {
                                        dataField: "CD_REGIAO",
                                    },
                                ],

                            },
                            {
                                itemType: 'group',
                                colCount: 2,
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: "DS_BAIRRO",
                                        editorOptions: {
                                            maxLength: 40,
                                        },
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                        ],
                                    },
                                    {
                                        dataField: "CD_MUNICIPIO",
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                        ],
                                    },
                                ],

                            },
                            {
                                itemType: 'group',
                                colCount: 1,
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: "DS_PONTO_REFERENCIA",
                                        editorOptions: {
                                            maxLength: 500,
                                        },
                                    },

                                ],

                            },
                            {
                                itemType: 'group',
                                colCount: 2,
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: "DS_CONTATO",
                                        editorOptions: {
                                            maxLength: 60,
                                        },
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                        ],
                                    },

                                ],

                            },
                            {
                                itemType: 'group',
                                colCount: 4,
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: "CD_DDD_TELEFONE",
                                        editorOptions: {
                                            maxLength: 3,
                                        },
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                            {
                                                type: "numeric",
                                                message: "Este campo aceita apenas números",
                                            },
                                            {
                                                type: "stringLength",
                                                min: 2,
                                                max: 3,
                                                message: "O DDD deve conter no mínimo 2 dígitos numéricos",
                                            },
                                        ],
                                    },
                                    {
                                        itemType: 'group',
                                        colCount: 1,
                                        colSpan: 2,
                                        items: [
                                            {
                                                dataField: "DS_TELEFONE",
                                                editorOptions: {
                                                    maxLength: 30,
                                                },
                                                validationRules: [
                                                    {
                                                        type: 'required',
                                                        message: "Campo obrigatório",
                                                    },
                                                ],
                                            },
                                        ],

                                    },
                                ],

                            },
                            {
                                itemType: 'group',
                                colCount: 4,
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: "CD_DDD_FAX",
                                        editorOptions: {
                                            maxLength: 3,
                                        },
                                        validationRules: [
                                            {
                                                type: "numeric",
                                                message: "Este campo aceita apenas números",
                                            },
                                            {
                                                type: "stringLength",
                                                min: 0,
                                                max: 3,
                                                message: "O DDD deve conter no máximo 3 dígitos numéricos",
                                            },
                                        ],
                                    },
                                    {
                                        itemType: 'group',
                                        colCount: 1,
                                        colSpan: 2,
                                        items: [
                                            {
                                                dataField: "DS_FAX",
                                                editorOptions: {
                                                    maxLength: 30,
                                                },
                                            },
                                        ],

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
                    var worksheet = workbook.addWorksheet('Endereços');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ClientesEndereços.xlsx');
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
                keyExpr: 'NR_SEQUENCIA',
                columns: [
                    {
                        dataField: "CD_TIPO_ENDERECO",
                        caption: "Tipo",
                        width: 100,
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                        alignment: 'center',
                        lookup: {
                            dataSource: dataSourceTiposEnderecos,
                            valueExpr: "CD_TIPO_ENDERECO",
                            displayExpr: "DS_TIPO_ENDERECO",
                            searchExpr: ["CD_TIPO_ENDERECO, DS_TIPO_ENDERECO"]
                        }
                    },
                    {
                        dataField: "DS_ENDERECO",
                        caption: "Endereço",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "NR_ENDERECO",
                        caption: "Número",
                        width: 65,
                        dataType: "number",
                        format: "#####",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "DS_ENDERECO_COMPL",
                        caption: "Complemento",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "DS_BAIRRO",
                        caption: "Bairro",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_MUNICIPIO",
                        caption: "Cidade",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                        lookup: {
                            dataSource: dataSourceMunicipios,
                            valueExpr: "CD_MUNICIPIO",
                            displayExpr: "DS_MUNICIPIO_UF",
                            searchExpr: ["DS_MUNICIPIO_UF"]
                        }
                    },
                    {
                        dataField: "CD_CEP",
                        caption: "CEP",
                        width: 70,
                        mask: '00000000',
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_REGIAO",
                        caption: "Região",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                        lookup: {
                            dataSource: dataSourceRegiao,
                            valueExpr: "CD_REGIAO",
                            displayExpr: "DS_REGIAO",
                            searchExpr: ["DS_REGIAO"]
                        }
                    },
                    {
                        dataField: "CD_STATUS",
                        caption: "Status",
                        width: 75,
                        value: 'A',
                        allowEditing: true,
                        allowHeaderFiltering: false,
                        allowSorting: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        lookup: {
                            dataSource: dataSourceStatus,
                            valueExpr: "CD_STATUS",
                            displayExpr: "DS_STATUS"
                        }
                    },
                    {
                        dataField: "CD_DDD_TELEFONE",
                        caption: "DDD Fone 1",
                        width: 90,
                        dataType: "number",
                        format: "000",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "DS_TELEFONE",
                        caption: "Telefone 1",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                        alignment: 'center',
                        visible: false,
                    },

                    {
                        dataField: "CD_DDD_FAX",
                        caption: "DDD Fone 2",
                        width: 90,
                        dataType: "number",
                        format: "000",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "DS_FAX",
                        caption: "Telefone 2",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                        alignment: 'center',
                        visible: false,
                    },
                    {
                        dataField: "DS_CONTATO",
                        caption: "Contato",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "DS_PONTO_REFERENCIA",
                        caption: "Ponto Referência",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        type: "buttons",
                        width: 30,
                        //cssClass: "column-data-grid",
                    },

                ],

                onCellPrepared: function (e) {
                    if (e.rowType === "data") {
                        if (e.column.dataField === "CD_STATUS" &&
                            e.data.CD_STATUS === 'I') {
                            //e.cellElement.css("background-color", '#f26419');
                            e.cellElement.css("color", '#d00000');
                            e.cellElement.css("font-weight", 'bold');
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
                            name: 'addRowButton',
                            showText: 'always',
                            options: {
                                type: 'success',
                                text: 'Novo Endereço',
                                hint: 'Novo Endereço',
                            },
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

            }).dxDataGrid('instance');

        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Consulta Compradores Autorizados do Cliente
    //*** CARREGAMENTO DEVE SER FEITO APENAS SE O USUÁRIO CLICAR NA ABA "COMPRADORES" E O CPF/CNPJ DO CLIENTE SELECIONADO DEVE SER INFORMADO COMO PARÂMETRO ***
    GetAzureDataSource(15, '{ CD_CPF_CNPJ: "16090958808" }').then((result) => {

        if (result.success) {
            const gridCompradoresAutorizados = $("#grid_Compradores_Autorizados").dxDataGrid({
                dataSource: result.data,
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
                    mode: 'popup',
                    allowUpdating: true,
                    startEditAction: 'dblClick',
                    allowAdding: true,
                    allowDeleting: false,
                    useIcons: true,

                    popup: {
                        //title: 'Cadastro de Endereço',
                        showTitle: true,
                        titleTemplate: function (element) {
                            const $title = $("<div class='mb-3 mt-3 ml-2' style='font-size: 18px'>").text("Cadastro de Compradores Autorizados");
                            element.append($title);
                        },
                        maxWidth: 900,
                        height: 520,
                        onShown: obj => {
                            //dá o foco na instância da coluna marcada nos itens
                            widgetInstancet.focus();
                        },
                    },

                    form: {
                        labelMode: 'floating',
                        items: [
                            {
                                itemType: 'group',
                                colCount: 3,
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: "CD_STATUS",
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                itemType: 'group',
                                colCount: 3,
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: "DS_NOME_COMPRADOR",
                                        colSpan: 2,
                                        editorOptions: {
                                            maxLength: 60,
                                        },
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                        ],
                                    },
                                    {
                                        dataField: "DS_NOME_AUTORIZANTE",
                                        editorOptions: {
                                            maxLength: 60,
                                        },
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                itemType: 'group',
                                colCount: 3,
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: "CD_CPF_COMPRADOR",
                                        editorOptions: {
                                            maxLength: 11,
                                        },
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                        ],
                                    },
                                    {
                                        dataField: "CD_RG",
                                        editorOptions: {
                                            maxLength: 15,
                                        },
                                    },
                                    {
                                        dataField: "VL_LIMITE_COMPRA",
                                        editorType: 'dxNumberBox',
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                            {
                                                type: "numeric",
                                                message: "Este campo aceita apenas números",
                                            },
                                        ],
                                        editorOptions: {
                                            maxLength: 19,
                                            format: "###,###,###,###,##0.00",
                                            min: 0.01,
                                        },
                                    },
                                ],
                            },
                            {
                                itemType: 'group',
                                colCount: 3,
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: "CD_DDD_TELEFONE",
                                        editorType: 'dxNumberBox',
                                        editorOptions: {
                                            maxLength: 3,
                                            format: "###",
                                            max: 999,
                                        },
                                    },
                                    {
                                        dataField: "DS_TELEFONE",
                                        editorOptions: {
                                            maxLength: 30,
                                        },
                                    },
                                    {
                                        dataField: "DS_EMAIL",
                                        editorOptions: {
                                            maxLength: 150,
                                        },
                                    },

                                ],
                            },

                            {
                                itemType: 'group',
                                colCount: 4,
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: 'CD_CEP',
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                            {
                                                type: "numeric",
                                                message: "Este campo aceita apenas números",
                                            },
                                            {
                                                type: "stringLength",
                                                min: 8,
                                                max: 8,
                                                message: "O CEP deve conter 8 dígitos numéricos",
                                            },
                                        ],
                                        editorOptions: {
                                            maxLength: 8,
                                        }
                                    },
                                ],

                            },
                            {
                                itemType: 'group',
                                colCount: 3,
                                colSpan: 2,
                                items: [
                                    {
                                        itemType: 'group',
                                        colSpan: 2,
                                        items: [
                                            {
                                                dataField: "DS_ENDERECO",
                                                editorOptions: {
                                                    maxLength: 60,
                                                },
                                                validationRules: [
                                                    {
                                                        type: 'required',
                                                        message: "Campo obrigatório",
                                                    },
                                                ],
                                            },
                                        ],

                                    },
                                    {
                                        itemType: 'group',
                                        items: [
                                            {
                                                dataField: "NR_ENDERECO",
                                                editorOptions: {
                                                    maxLength: 6,
                                                },
                                                validationRules: [
                                                    {
                                                        type: 'required',
                                                        message: "Campo obrigatório",
                                                    },
                                                ],
                                            },
                                        ],

                                    },
                                ],
                            },
                            {
                                itemType: 'group',
                                colCount: 3,
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: "DS_ENDERECO_COMPL",
                                        editorOptions: {
                                            maxLength: 40,
                                        },
                                    },
                                    {
                                        dataField: "DS_BAIRRO",
                                        editorOptions: {
                                            maxLength: 40,
                                        },
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                        ],
                                    },
                                    {
                                        dataField: "DS_CIDADE",
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                        ],
                                    },
                                ],

                            },
                            {
                                itemType: 'group',
                                colCount: 1,
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: "DS_OBSERVACAO",
                                        editorType: 'dxTextArea',
                                        editorOptions: {
                                            maxLength: 3500,
                                            height: 80,
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
                    var worksheet = workbook.addWorksheet('Compradores');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Compradores_Autorizados_Clientes.xlsx');
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
                keyExpr: 'CD_CPF_COMPRADOR',
                columns: [
                    {
                        dataField: "DS_NOME_COMPRADOR",
                        caption: "Nome Comprador",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                        visible: true,
                        allowHiding: false,
                        editorOptions: {
                            onContentReady: obj => {
                                widgetInstancet = obj.component; //sava a instância para dar foco na edição
                            },
                        },
                    },
                    {
                        dataField: "CD_CPF_COMPRADOR",
                        caption: "CPF Comprador",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                        alignment: 'center',
                        width: 97,
                    },
                    {
                        dataField: "CD_RG",
                        caption: "RG Comprador",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                        alignment: 'center',
                        width: 97,
                    },
                    {
                        dataField: "VL_LIMITE_COMPRA",
                        caption: "Limite Compra",
                        width: 85,
                        dataType: "number",
                        format: "###,###,###,###,##0.00",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "DS_NOME_AUTORIZANTE",
                        caption: "Nome Autorizador",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                        visible: true,
                    },
                    {
                        dataField: "DS_ENDERECO",
                        caption: "Endereço",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "NR_ENDERECO",
                        caption: "Número",
                        width: 65,
                        dataType: "number",
                        format: "#####",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "DS_ENDERECO_COMPL",
                        caption: "Complemento",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "DS_BAIRRO",
                        caption: "Bairro",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "DS_CIDADE",
                        caption: "Cidade",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                        lookup: {
                            dataSource: dataSourceMunicipios,
                            valueExpr: "CD_MUNICIPIO",
                            displayExpr: "DS_MUNICIPIO",
                            searchExpr: ["DS_MUNICIPIO"]
                        },
                        visible: false,
                    },
                    {
                        dataField: "CD_CEP",
                        caption: "CEP",
                        width: 70,
                        mask: '00000000',
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "CD_DDD_TELEFONE",
                        caption: "DDD",
                        width: 90,
                        dataType: "number",
                        format: "000",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: true,
                    },
                    {
                        dataField: "DS_TELEFONE",
                        caption: "Telefone",
                        width: 120,
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                        alignment: 'center',
                        visible: true,
                    },
                    {
                        dataField: "DS_EMAIL",
                        caption: "E-mail",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                        alignment: 'center',
                        visible: false,
                    },
                    {
                        dataField: "DS_OBSERVACAO",
                        caption: "Observação",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                        alignment: 'left',
                        visible: false,
                    },
                    {
                        dataField: "DT_CADASTRO",
                        caption: "Cadastro",
                        width: 110,
                        dataType: "date",
                        format: "dd/MM/yyyy HH:mm",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: true,
                    },
                    {
                        dataField: "DT_ATUALIZACAO",
                        caption: "Atualização",
                        width: 110,
                        dataType: "date",
                        format: "dd/MM/yyyy HH:mm",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "CD_STATUS",
                        caption: "Status",
                        width: 75,
                        value: 'A',
                        allowEditing: true,
                        allowHeaderFiltering: false,
                        allowSorting: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        lookup: {
                            dataSource: dataSourceStatus,
                            valueExpr: "CD_STATUS",
                            displayExpr: "DS_STATUS"
                        }
                    },

                    {
                        type: "buttons",
                        width: 30,
                        //cssClass: "column-data-grid",
                    },

                ],

                onCellPrepared: function (e) {
                    if (e.rowType === "data") {
                        if (e.column.dataField === "CD_STATUS" &&
                            e.data.CD_STATUS === 'I') {
                            //e.cellElement.css("background-color", '#f26419');
                            e.cellElement.css("color", '#d00000');
                            e.cellElement.css("font-weight", 'bold');
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
                            name: 'addRowButton',
                            showText: 'always',
                            options: {
                                type: 'success',
                                text: 'Novo Comprador',
                                hint: 'Novo Comprador',
                            },
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

            }).dxDataGrid('instance');

        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Consulta Produtos com Preço Fixo de um Cliente
    //*** CARREGAMENTO DEVE SER FEITO APENAS SE O USUÁRIO CLICAR NA ABA "PRECIFICAÇÃO" E O CPF/CNPJ DO CLIENTE SELECIONADO DEVE SER INFORMADO COMO PARÂMETRO ***
    GetAzureDataSource(18, '{ CD_CPF_CNPJ: "16090958808" }').then((result) => {

        if (result.success) {

            const gridPrecoFixoProdutosCliente = $("#grid_Preco_Fixo_Produtos_Cliente").dxDataGrid({
                dataSource: result.data,
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
                    mode: 'batch',
                    allowUpdating: true,
                    startEditAction: 'click',
                    allowAdding: false,
                    allowDeleting: true,
                    useIcons: true,
                },
                selection: {
                    mode: 'multiple',
                    showCheckBoxesMode: 'always',
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
                    var worksheet = workbook.addWorksheet('Produtos Preço Fixo');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Produtos_Preco_Fixo_Cliente.xlsx');
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
                keyExpr: ['CD_PRODUTO', 'NR_SEQUENCIA'],
                columns: [
                    {
                        type: "selection",
                        width: 30,
                    },
                    {
                        dataField: "CD_PRODUTO",
                        caption: "Código Interno",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        allowHiding: false,
                    },
                    {
                        dataField: "DS_PRODUTO",
                        caption: "Descrição Produto",
                        //width: 250,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        cssClass: "column-data-grid",
                        hidingPriority: 196,
                    }, {
                        dataField: "CD_FABRICANTE",
                        caption: "Código Fabricante",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 186,
                    }, {
                        dataField: "CD_ORIGINAL",
                        caption: "Código Original",
                        //width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 194,
                    }, {
                        dataField: "CD_OPCIONAL",
                        caption: "Código Opcional",
                        //width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 193,
                    }, {
                        dataField: "CD_EAN_PRODUTO",
                        caption: "Código Barras",
                        //width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 192,
                    }, {
                        dataField: "CD_NCM",
                        caption: "NCM",
                        //width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 191,
                    }, {
                        dataField: "DS_MARCA",
                        caption: "Marca",
                        //width: 100,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 190,
                    }, {
                        dataField: "CD_FORNECEDOR",
                        caption: "Código Fornecedor",
                        width: 90,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        alignment: 'center',
                        visible: false,
                        cssClass: "column-data-grid",
                        hidingPriority: 189,
                    }, {
                        dataField: "DS_RAZAO_SOCIAL",
                        caption: "Fornecedor Padrão (Razão Social)",
                        //width: 250,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        cssClass: "column-data-grid",
                        hidingPriority: 188,
                    }, {
                        dataField: "DS_FANTASIA",
                        caption: "Fornecedor Padrão (Fantasia)",
                        //width: 250,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: false,
                        visible: false,
                        cssClass: "column-data-grid",
                        hidingPriority: 187,
                    }, {
                        dataField: "CD_CURVA_ABC",
                        caption: "A B C",
                        width: 55,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 186,
                    }, {
                        dataField: "DS_FAMILIA",
                        caption: "Família",
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        cssClass: "column-data-grid",
                        hidingPriority: 185,
                    },
                    {
                        dataField: "LG_FORA_LINHA",
                        caption: "Fora Linha",
                        width: 40,
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        visible: false,
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                        hidingPriority: 184,
                    },
                    {
                        dataField: "VL_PRECO_MINIMO_VENDA",
                        caption: "Preço Padrão",
                        width: 70,
                        dataType: "number",
                        format: "###,###,###,##0.00##",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        cssClass: "column-data-grid",
                        hidingPriority: 195,
                    },
                    {
                        dataField: "VL_PRECO_CLIENTE",
                        caption: "Preço do Cliente",
                        width: 70,
                        dataType: "number",
                        format: "###,###,###,##0.00##",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        cssClass: "column-data-grid",
                        hidingPriority: 200,
                    },
                    {
                        dataField: "CD_FORMA_PAGAMENTO",
                        caption: "Forma",
                        width: 130,
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        lookup: {
                            dataSource: dataSourceFormaPagamento,
                            valueExpr: "CD_FORMA_PAGAMENTO",
                            displayExpr: "DS_FORMA_PAGAMENTO",
                            searchExpr: ["CD_FORMA_PAGAMENTO", "DS_FORMA_PAGAMENTO"],
                            dropDownOptions: {
                                closeOnOutsideClick: true,
                                width: 400,
                            },
                        },
                        visible: true,
                        hidingPriority: 199,
                    },
                    {
                        dataField: "CD_CONDICAO_PAGAMENTO",
                        caption: "Condição",
                        width: 120,
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        lookup: {
                            dataSource: dataSourceCondicaoPagamentoPorForma,
                            valueExpr: "CD_CONDICAO_PAGAMENTO",
                            displayExpr: "DS_CONDICAO_PAGAMENTO",
                            searchExpr: ["DS_CONDICAO_PAGAMENTO"],
                            dropDownOptions: {
                                closeOnOutsideClick: true,
                                width: 400,
                            },
                        },
                        visible: true,
                        hidingPriority: 198,
                    },
                    {
                        dataField: "CD_ENTREGA",
                        caption: "Despacho",
                        width: 90,
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        lookup: {
                            dataSource: dataSourceTipoDespacho,
                            valueExpr: "CD_ENTREGA",
                            displayExpr: "DS_ENTREGA",
                            searchExpr: ["DS_ENTREGA"],
                            dropDownOptions: {
                                closeOnOutsideClick: true,
                                width: 400,
                            },
                        },
                        visible: true,
                        hidingPriority: 197,
                    },
                    {
                        dataField: "PC_MAXIMO_DESCONTO",
                        caption: "% Desc. Máximo",
                        width: 55,
                        dataType: "number",
                        format: "###,###,###,##0.##%",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        cssClass: "column-data-grid",
                        setCellValue: function (newData, value, currentRowData) {

                            var desconto = value / 100
                            newData.PC_MAXIMO_DESCONTO = desconto;
                        },
                        hidingPriority: 196,

                    },
                    {
                        type: "buttons",
                        width: 30,
                        alignment: 'center',
                        //cssClass: "column-data-grid",
                    },

                ],

                onCellPrepared: function (e) {
                    if (e.rowType === "data") {
                        if (e.column.dataField === "LG_FORA_LINHA") {
                            e.cellElement.css("background-color", e.data.DS_COLOR_FORA_LINHA);
                            e.cellElement.css("color", "white");
                        }
                        if (e.column.dataField === "PC_MAXIMO_DESCONTO" || e.column.dataField === "VL_PRECO_CLIENTE" || e.column.dataField === "CD_FORMA_PAGAMENTO" || e.column.dataField === "CD_CONDICAO_PAGAMENTO" || e.column.dataField === "CD_ENTREGA") {
                            e.cellElement.css("background-color", "#EDF3F8");
                            /*e.cellElement.css("font-weight", "bold");*/

                            if (e.value < 0) {
                                e.cellElement.css("color", "#d00000");
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

            }).dxDataGrid('instance');

        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Consulta Condições de uma Forma de Pagamento
    //SÓ É CARREGADO SE O USUÁRIO SELECIONAR A OPÇÃO DE ALTERAR A FORMA E CONDIÇÃO DE PAGAMENTO DE PREÇO FIXO DE PRODUTO POR CLIENTE NA ABA:
    //  - PRECIFICAÇÃO
    //      - PREÇO FIXO
    //      - MAIS OPÇÕES: ALTERAR FORMA E CONDIÇÃO DOS PRODUTOS SELECIONADOS
    //O USUÁRIO PRIMEIRA SELECIONA O COMBO DE FORMA DE PAGAMENTO E A QUARY ABAIXO É DISPARADA PARA EXIBIR AS CONDIÇÕES DE PAGAMENTO LIGADA AS CONDIÇÃO
    //INFORMAR A FORMA DE PAGAMENTO SELECIONADA NO PRIMEIRO COMBO COMO PARÂMETRO ABAIXO. 
    //O STATUS É FIXO
    GetAzureDataSource(22, '{ CD_FORMA_PAGAMENTO: 5, CD_STATUS: "A" }').then((result) => {

        if (result.success) {

            $('#lkp_Alterar_Condicao_Preco_Fixo').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_CONDICAO_PAGAMENTO'],
                displayExpr: 'DS_CONDICAO_PAGAMENTO',
                valueExpr: 'CD_CONDICAO_PAGAMENTO',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Condição de Pagamento',
                },
                labelMode: 'floating',
                label: 'Nova Condição de Pagamento',
                placeholder: 'Nova Condição de Pagamento',
                showClearButton: true,
            });

        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Consulta Produtos com Desconto para um Cliente
    //*** CARREGAMENTO DEVE SER FEITO APENAS SE O USUÁRIO CLICAR NA ABA "PRECIFICAÇÃO" E O CPF/CNPJ DO CLIENTE SELECIONADO DEVE SER INFORMADO COMO PARÂMETRO ***
    GetAzureDataSource(19, '{ CD_CPF_CNPJ: "16090958808" }').then((result) => {

        if (result.success) {

            const gridDescontoProdutosCliente = $("#grid_Desconto_Produtos_Cliente").dxDataGrid({
                dataSource: result.data,
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
                    mode: 'batch',
                    allowUpdating: true,
                    startEditAction: 'click',
                    allowAdding: false,
                    allowDeleting: true,
                    useIcons: true,
                },
                selection: {
                    mode: 'multiple',
                    showCheckBoxesMode: 'always',
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
                    var worksheet = workbook.addWorksheet('Produtos Preço Fixo');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Produtos_Preco_Fixo_Cliente.xlsx');
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
                keyExpr: ['CD_PRODUTO', 'CD_FORMA_PAGAMENTO'],
                columns: [
                    {
                        type: "selection",
                        width: 30,
                    },
                    {
                        dataField: "CD_PRODUTO",
                        caption: "Código Interno",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        allowHiding: false,
                    },
                    {
                        dataField: "DS_PRODUTO",
                        caption: "Descrição Produto",
                        //width: 250,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        cssClass: "column-data-grid",
                        hidingPriority: 196,
                    }, {
                        dataField: "CD_FABRICANTE",
                        caption: "Código Fabricante",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 186,
                    }, {
                        dataField: "CD_ORIGINAL",
                        caption: "Código Original",
                        //width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 194,
                    }, {
                        dataField: "CD_OPCIONAL",
                        caption: "Código Opcional",
                        //width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 193,
                    }, {
                        dataField: "CD_EAN_PRODUTO",
                        caption: "Código Barras",
                        //width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 192,
                    }, {
                        dataField: "CD_NCM",
                        caption: "NCM",
                        //width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 191,
                    }, {
                        dataField: "DS_MARCA",
                        caption: "Marca",
                        //width: 100,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 190,
                    }, {
                        dataField: "CD_FORNECEDOR",
                        caption: "Código Fornecedor",
                        width: 90,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        alignment: 'center',
                        visible: false,
                        cssClass: "column-data-grid",
                        hidingPriority: 189,
                    }, {
                        dataField: "DS_RAZAO_SOCIAL",
                        caption: "Fornecedor Padrão (Razão Social)",
                        //width: 250,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        cssClass: "column-data-grid",
                        hidingPriority: 188,
                    }, {
                        dataField: "DS_FANTASIA",
                        caption: "Fornecedor Padrão (Fantasia)",
                        //width: 250,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: false,
                        visible: false,
                        cssClass: "column-data-grid",
                        hidingPriority: 187,
                    }, {
                        dataField: "CD_CURVA_ABC",
                        caption: "A B C",
                        width: 55,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 186,
                    }, {
                        dataField: "DS_FAMILIA",
                        caption: "Família",
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        cssClass: "column-data-grid",
                        hidingPriority: 185,
                    },
                    {
                        dataField: "LG_FORA_LINHA",
                        caption: "Fora Linha",
                        width: 40,
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        visible: false,
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                        hidingPriority: 184,
                    },
                    {
                        dataField: "VL_PRECO_MINIMO_VENDA",
                        caption: "Preço Padrão",
                        width: 70,
                        dataType: "number",
                        format: "###,###,###,##0.00##",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        cssClass: "column-data-grid",
                        hidingPriority: 195,
                    },
                    {
                        dataField: "CD_FORMA_PAGAMENTO",
                        caption: "Forma",
                        width: 130,
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        lookup: {
                            dataSource: dataSourceFormaPagamento,
                            valueExpr: "CD_FORMA_PAGAMENTO",
                            displayExpr: "DS_FORMA_PAGAMENTO",
                            searchExpr: ["CD_FORMA_PAGAMENTO", "DS_FORMA_PAGAMENTO"],
                            dropDownOptions: {
                                closeOnOutsideClick: true,
                                width: 400,
                            },
                        },
                        visible: true,
                        hidingPriority: 199,
                    },
                    {
                        dataField: "PC_DESCONTO",
                        caption: "% Desconto",
                        width: 70,
                        dataType: "number",
                        format: "###,###,###,##0.##%",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        setCellValue: function (newData, value, currentRowData) {

                            var desconto = value / 100
                            newData.PC_DESCONTO = desconto;
                            newData.PC_ACRESCIMO = null;
                            newData.VL_PRECO_FINAL = currentRowData.VL_PRECO_MINIMO_VENDA - (currentRowData.VL_PRECO_MINIMO_VENDA * (value / 100));

                        },

                    },
                    {
                        dataField: "PC_ACRESCIMO",
                        caption: "% Acréscimo",
                        width: 70,
                        dataType: "number",
                        format: "###,###,###,##0.##%",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        setCellValue: function (newData, value, currentRowData) {

                            var desconto = value / 100

                            newData.PC_ACRESCIMO = desconto;
                            newData.PC_DESCONTO = null;
                            newData.VL_PRECO_FINAL = (currentRowData.VL_PRECO_MINIMO_VENDA * (1 + (value / 100)));
                            console.log("VALOR: ", value);
                        },

                    },

                    {
                        dataField: "VL_PRECO_FINAL",
                        caption: "Preço do Cliente",
                        width: 70,
                        dataType: "number",
                        format: "###,###,###,##0.00##",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_LOGIN",
                        caption: "Login Configuração",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 180,

                    },
                    {
                        dataField: "DT_CADASTRO",
                        caption: "Data Configuração",
                        width: 110,
                        dataType: "date",
                        format: "dd/MM/yyyy HH:mm",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 179,

                    },
                    {
                        type: "buttons",
                        width: 30,
                        alignment: 'center',
                        //cssClass: "column-data-grid",
                    },

                ],

                onCellPrepared: function (e) {
                    if (e.rowType === "data") {
                        if (e.column.dataField === "LG_FORA_LINHA") {
                            e.cellElement.css("background-color", e.data.DS_COLOR_FORA_LINHA);
                            e.cellElement.css("color", "white");
                        }
                        if (e.column.dataField === "PC_DESCONTO" || e.column.dataField === "PC_ACRESCIMO" || e.column.dataField === "CD_FORMA_PAGAMENTO") {
                            e.cellElement.css("background-color", "#EDF3F8");
                            /*e.cellElement.css("font-weight", "bold");*/

                            if (e.value < 0) {
                                e.cellElement.css("color", "#d00000");
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

            }).dxDataGrid('instance');

        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Consulta Famílias com Desconto para um Cliente
    //*** CARREGAMENTO DEVE SER FEITO APENAS SE O USUÁRIO CLICAR NA ABA "PRECIFICAÇÃO" E O CPF/CNPJ DO CLIENTE SELECIONADO DEVE SER INFORMADO COMO PARÂMETRO ***
    GetAzureDataSource(21, '{ CD_CPF_CNPJ: "16090958808" }').then((result) => {

        if (result.success) {

            const gridDescontoFamiliasCliente = $("#grid_Desconto_Familias_Cliente").dxDataGrid({
                dataSource: result.data,
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
                    mode: 'batch',
                    allowUpdating: true,
                    startEditAction: 'click',
                    allowAdding: false,
                    allowDeleting: true,
                    useIcons: true,
                },
                selection: {
                    mode: 'multiple',
                    showCheckBoxesMode: 'always',
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
                    var worksheet = workbook.addWorksheet('Famílias');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DescontoClientesFamilias.xlsx');
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
                keyExpr: ['CD_FAMILIA', 'CD_FORMA_PAGAMENTO'],
                columns: [
                    {
                        type: "selection",
                        width: 30,
                    },
                    {
                        dataField: "CD_FAMILIA",
                        caption: "Código",
                        width: 80,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        allowHiding: false,
                    },
                    {
                        dataField: "CD_FAMILIA_PAI",
                        caption: "Código Pai",
                        width: 80,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "DS_FAMILIA",
                        caption: "Família",
                        //width: 250,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        cssClass: "column-data-grid",
                        hidingPriority: 196,
                    },
                    {
                        dataField: "CD_FORMA_PAGAMENTO",
                        caption: "Forma",
                        width: 130,
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        lookup: {
                            dataSource: dataSourceFormaPagamento,
                            valueExpr: "CD_FORMA_PAGAMENTO",
                            displayExpr: "DS_FORMA_PAGAMENTO",
                            searchExpr: ["CD_FORMA_PAGAMENTO", "DS_FORMA_PAGAMENTO"],
                            dropDownOptions: {
                                closeOnOutsideClick: true,
                                width: 400,
                            },
                        },
                        visible: true,
                        hidingPriority: 199,
                    },
                    {
                        dataField: "PC_DESCONTO",
                        caption: "% Desconto",
                        width: 70,
                        dataType: "number",
                        format: "###,###,###,##0.##%",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        setCellValue: function (newData, value, currentRowData) {

                            var desconto = value / 100
                            newData.PC_DESCONTO = desconto;
                            newData.PC_ACRESCIMO = null;
                            newData.VL_PRECO_FINAL = currentRowData.VL_PRECO_MINIMO_VENDA - (currentRowData.VL_PRECO_MINIMO_VENDA * (value / 100));

                        },

                    },
                    {
                        dataField: "PC_ACRESCIMO",
                        caption: "% Acréscimo",
                        width: 70,
                        dataType: "number",
                        format: "###,###,###,##0.##%",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        setCellValue: function (newData, value, currentRowData) {

                            var desconto = value / 100

                            newData.PC_ACRESCIMO = desconto;
                            newData.PC_DESCONTO = null;
                            newData.VL_PRECO_FINAL = (currentRowData.VL_PRECO_MINIMO_VENDA * (1 + (value / 100)));
                            console.log("VALOR: ", value);
                        },

                    },
                    {
                        dataField: "CD_LOGIN",
                        caption: "Login Configuração",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 180,

                    },
                    {
                        dataField: "DT_CADASTRO",
                        caption: "Data Configuração",
                        width: 110,
                        dataType: "date",
                        format: "dd/MM/yyyy HH:mm",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 179,

                    },
                    {
                        type: "buttons",
                        width: 30,
                        alignment: 'center',
                        //cssClass: "column-data-grid",
                    },

                ],

                onCellPrepared: function (e) {
                    if (e.rowType === "data") {
                        if (e.column.dataField === "LG_FORA_LINHA") {
                            e.cellElement.css("background-color", e.data.DS_COLOR_FORA_LINHA);
                            e.cellElement.css("color", "white");
                        }
                        if (e.column.dataField === "PC_DESCONTO" || e.column.dataField === "PC_ACRESCIMO" || e.column.dataField === "CD_FORMA_PAGAMENTO") {
                            e.cellElement.css("background-color", "#EDF3F8");
                            /*e.cellElement.css("font-weight", "bold");*/

                            if (e.value < 0) {
                                e.cellElement.css("color", "#d00000");
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

            }).dxDataGrid('instance');

        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Consulta Descontos por Forma de Pagamento para um Cliente
    //*** CARREGAMENTO DEVE SER FEITO APENAS SE O USUÁRIO CLICAR NA ABA "PRECIFICAÇÃO" E O CPF/CNPJ DO CLIENTE SELECIONADO DEVE SER INFORMADO COMO PARÂMETRO ***
    GetAzureDataSource(23, '{ CD_CPF_CNPJ: "16090958808" }').then((result) => {

        if (result.success) {

            const gridDescontoFormaPagamentoCliente = $("#grid_Desconto_Forma_Pagamento_Cliente").dxDataGrid({
                dataSource: result.data,
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
                    mode: 'batch',
                    allowUpdating: true,
                    startEditAction: 'click',
                    allowAdding: false,
                    allowDeleting: false,
                    useIcons: true,
                },
                selection: {
                    mode: 'multiple',
                    showCheckBoxesMode: 'always',
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
                sorting: { mode: "multiple" },
                groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
                paging: { pageSize: 100 },
                pager: {
                    visible: true,
                    allowedPageSizes: [10, 15, 20, 50, 100],
                    showPageSizeSelector: false,
                    showNavigationButtons: true
                },
                export: {
                    enabled: true,
                    allowExportSelectedData: false
                },
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('Forma de Pagamento');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Desconto_Cliente_Forma_Pagamento.xlsx');
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
                keyExpr: ['CD_FORMA_PAGAMENTO'],
                columns: [
                    {
                        type: "selection",
                        width: 30,
                    },
                    {
                        dataField: "CD_FORMA_PAGAMENTO",
                        caption: "Código Forma",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 100,
                    },
                    {
                        dataField: "DS_FORMA_PAGAMENTO",
                        caption: "Forma de Pagamento",
                        //width: 250,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        cssClass: "column-data-grid",
                        allowHiding: false,
                    },
                    {
                        dataField: "PC_DESCONTO",
                        caption: "% Desconto",
                        width: 100,
                        dataType: "number",
                        format: "###,###,###,##0.##%",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        setCellValue: function (newData, value, currentRowData) {

                            var desconto = value / 100
                            newData.PC_DESCONTO = desconto;
                            newData.PC_ACRESCIMO = null;
                        },
                        hidingPriority: 199,

                    },

                    {
                        dataField: "PC_ACRESCIMO",
                        caption: "% Acréscimo",
                        width: 100,
                        dataType: "number",
                        format: "###,###,###,##0.##%",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        setCellValue: function (newData, value, currentRowData) {

                            var desconto = value / 100
                            newData.PC_ACRESCIMO = desconto;
                            newData.PC_DESCONTO = null;
                        },
                        hidingPriority: 200,
                    },
                    {
                        dataField: "DS_STATUS",
                        caption: "Status da Forma",
                        //width: 130,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        hidingPriority: 198,
                    },
                    {
                        dataField: "CD_LOGIN",
                        caption: "Login Configuração",
                        //width: 130,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        hidingPriority: 197,
                    },
                    {
                        dataField: "DT_CADASTRO",
                        caption: "Data Configuração",
                        //width: 130,
                        dataType: "date",
                        format: "dd/MM/yyyy HH:mm",
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        hidingPriority: 196,
                    },


                    //{
                    //    type: "buttons",
                    //    width: 30,
                    //    alignment: 'center',
                    //    //cssClass: "column-data-grid",
                    //},

                ],

                onCellPrepared: function (e) {
                    if (e.rowType === "data") {
                        if (e.column.dataField === "DS_STATUS" && e.value == "Inativo") {
                            e.cellElement.css("color", '#d00000');
                            e.cellElement.css("font-weight", 'bold');
                        }
                        if (e.column.dataField === "PC_DESCONTO" || e.column.dataField === "PC_ACRESCIMO") {
                            e.cellElement.css("background-color", "#EDF3F8");
                            /*e.cellElement.css("font-weight", "bold");*/
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

            }).dxDataGrid('instance');
        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Consulta Histório de Créditos do Clientes
    //*** CARREGAMENTO DEVE SER FEITO APENAS SE O USUÁRIO CLICAR NA ABA "EXTRATO DE CRÉDITOS" E O CPF/CNPJ DO CLIENTE SELECIONADO DEVE SER INFORMADO COMO PARÂMETRO ***
    GetAzureDataSource(24, '{ CD_CPF_CNPJ: "16090958808" }').then((result) => {

        if (result.success) {

            const gridContaCorrente = $("#grid_Conta_Corrente_Cliente").dxDataGrid({
                dataSource: result.data,
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
                    mode: 'popup',
                    allowUpdating: false,
                    startEditAction: 'dblClick',
                    allowAdding: true,
                    allowDeleting: false,
                    useIcons: false,

                    popup: {
                        //title: 'Cadastro de Endereço',
                        showTitle: true,
                        titleTemplate: function (element) {
                            const $title = $("<div class='mb-3 mt-3 ml-2' style='font-size: 18px'>").text("Ajuste de saldo de Crédito do Cliente");
                            element.append($title);
                        },
                        maxWidth: 600,
                        height: 270,
                    },

                    form: {
                        labelMode: 'floating',
                        items: [
                            {
                                itemType: 'group',
                                colCount: 2,
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: 'CD_TIPO_MOVIMENTO',
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                        ],
                                    },

                                    {
                                        itemType: 'group',
                                        colCount: 2,
                                        colSpan: 2,
                                        items: [
                                            {
                                            },
                                            {
                                                dataField: 'VL_MOVIMENTO',
                                                editorType: 'dxNumberBox',
                                                validationRules: [
                                                    {
                                                        type: 'required',
                                                        message: "Campo obrigatório",
                                                    },
                                                    {
                                                        type: "numeric",
                                                        message: "Este campo aceita apenas números",
                                                    },
                                                ],
                                                editorOptions: {
                                                    maxLength: 19,
                                                    format: "###,###,###,###,##0.00",
                                                    min: 0.01,
                                                },
                                            },
                                        ],

                                    },
                                ],

                            },


                            {
                                itemType: 'group',
                                colCount: 1,
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: "DS_OBSERVACAO",
                                        editorType: 'dxTextArea',
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                        ],
                                        editorOptions: {
                                            maxLength: 250,
                                            height: 80,
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
                paging: { pageSize: 15 },
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
                    var worksheet = workbook.addWorksheet('Endereços');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ClientesEndereços.xlsx');
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
                keyExpr: 'NR_LANCAMENTO',
                columns: [
                    {
                        dataField: "DT_MOVIMENTO",
                        caption: "Data",
                        width: 110,
                        dataType: "date",
                        format: "dd/MM/yyyy HH:mm",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: true,
                        allowHiding: false,
                    },
                    {
                        dataField: "DS_TIPO_MOVIMENTO",
                        caption: "Movimento",
                        width: 200,
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                        alignment: 'left',
                        visible: true,
                        hidingPriority: 200,
                    },
                    {
                        dataField: "CD_LOGIN",
                        caption: "Login",
                        width: 75,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                        alignment: 'center',
                        hidingPriority: 198,
                    },
                    {
                        dataField: "DS_OBSERVACAO",
                        caption: "Observação",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                        alignment: 'left',
                        hidingPriority: 197,
                    },
                    {
                        dataField: "CD_FILIAL",
                        caption: "Filial",
                        width: 70,
                        dataType: "number",
                        format: "######",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 196,
                    },
                    {
                        dataField: "CD_CAIXA",
                        caption: "Caixa",
                        width: 70,
                        dataType: "number",
                        format: "######",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 195,
                    },
                    {
                        dataField: "NR_DOCUMENTO",
                        caption: "Documento",
                        width: 75,
                        dataType: "number",
                        format: "############",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                        hidingPriority: 194,
                    },
                    {
                        dataField: "CD_TIPO_MOVIMENTO",
                        caption: "Tipo Movimento",
                        width: 200,
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                        alignment: 'left',
                        lookup: {
                            dataSource: dataSourceTiposMovimentoContaCorrente,
                            valueExpr: "CD_TIPO_MOVIMENTO",
                            displayExpr: "DS_TIPO_MOVIMENTO",
                            searchExpr: ["DS_TIPO_MOVIMENTO"]
                        },
                        visible: false,
                        hidingPriority: 194,
                    },
                    {
                        dataField: "VL_MOVIMENTO",
                        caption: "Valor",
                        width: 85,
                        dataType: "number",
                        format: "###,###,###,###,##0.00",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                        allowHiding: false,
                    },
                ],
                summary: {
                    totalItems: [
                        {
                            column: 'VL_MOVIMENTO',
                            summaryType: 'sum',
                            valueFormat: "###,###,###,##0.00",
                            displayFormat: "{0}",
                        }
                    ],
                },

                onCellPrepared: function (e) {
                    if (e.rowType === "data") {
                        if (e.column.dataField === "VL_MOVIMENTO") {
                            if (e.value < 0) {
                                e.cellElement.css("color", "#d00000");
                                //e.cellElement.css("font-weight", "bold");
                            } else {
                                //e.cellElement.css("font-weight", "bold");
                            };
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
                            name: 'addRowButton',
                            showText: 'always',
                            options: {
                                type: 'success',
                                text: 'Novo Lançamento',
                                hint: 'Novo Lançamento',
                            },
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

            }).dxDataGrid('instance');

        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //#endregion
});

//#region [ EM CONSTRUÇÃO ]



//#endregion

//#region [ Funções ]

function openconsultaClientesPanel() {

    const pageWidth = document.documentElement.scrollWidth;

    if (pageWidth > 1600) {
        $("#principalClientes").removeClass("col-lg-12").addClass("col-lg-9");
        $("#consultaClientes").removeClass("col-lg-12").addClass("col-lg-3");
        $("#consultaClientes").removeClass("panelconsultaClientesLateral").addClass("panelconsultaClientesLateral");

        document.getElementById("divBtnExpandirFecharConsulta").style.display = 'block';
        document.getElementById("divBtnFecharConsulta").style.display = 'none';

        document.getElementById("consultaClientes").style.display = 'block';

        ajustaLayoutGrids();
    }
    else {
        expandirconsultaClientesPanel();
    }

}

function expandirconsultaClientesPanel() {
    $("#consultaClientes").removeClass("col-lg-3").addClass("col-lg-12");
    $("#consultaClientes").removeClass("panelconsultaClientesLateral");

    document.getElementById("cadastroClientes").style.display = 'none';

    document.getElementById("divBtnExpandirFecharConsulta").style.display = 'none';
    document.getElementById("divBtnFecharConsulta").style.display = 'block';

    document.getElementById("consultaClientes").style.display = 'block';

    ajustaLayoutGrids();
}

function closeConsultaClientesPanel() {
    $("#principalClientes").removeClass("col-lg-9").addClass("col-lg-12");

    document.getElementById("consultaClientes").style.display = 'none';
    document.getElementById("cadastroClientes").style.display = 'block';

    ajustaLayoutGrids();
}

function iniciarConversaWhatsApp(celular, contato) {

    if (contato == undefined || contato == null || contato == '') {
        contato = '';
    } else {
        contato = contato + '.';
    }

    var texto = 'Olá, ' + contato + '\n';
    texto = window.encodeURIComponent(texto);

    window.open("https://api.whatsapp.com/send?phone=" + celular + "&text=" + texto, "_blank");
}

function AbrirModal(e) {
    $(e).modal('toggle');
}

function rolar_para(elemento) {
    $('html, body').animate({ scrollTop: $(elemento).offset().top }, 1300);
    //window.scrollTo(0, document.body.scrollHeight);
}

window.onresize = function () {
    configuraModals();
};

function configuraModals() {
    const pageWidth = document.documentElement.scrollWidth;
    const pageHeight = window.innerHeight;

    const heightScrollReajusteAbortado = pageHeight - 200;

    //Modal Manutenção de Grupos de Acesso
    document.getElementById("scrollReajusteAbortado").style.height = heightScrollReajusteAbortado + "px";
};

function ajustaLayoutGrids() {
    $('#grid_Enderecos_Cliente').dxDataGrid("instance").updateDimensions();
    $('#grid_Conta_Corrente_Cliente').dxDataGrid("instance").updateDimensions();
    $('#gridConsultaProdutos').dxDataGrid("instance").updateDimensions();

    //#region [ EM CONSTRUÇÃO ]

    //#endregion
};

function exibirCondicaoPorFormaPrecoFixo(pForma) {
    if (pForma == null) {
        document.getElementById("panelCondicaoPagamentoPorForma").style.display = 'none';
    } else {
        document.getElementById("panelCondicaoPagamentoPorForma").style.display = 'block';
    };
};

function exibirExemploReajuste() {

    var valorNumberBoxCustoFretePrecoFixo = $('#nbx_Valor_Reajuste').dxNumberBox('instance').option('value');
    var valorReajustadoPrecoFixo = 0;
    var valorExemplo = 100;

    const result = DevExpress.validationEngine.validateGroup("ReajustaPrecoFixo");

    if (result.isValid) {
        var linha1 = 'Você escolheu ';

        if (valorOperadorReajuste == 'A') {
            linha1 = linha1 + 'aumentar o preço dos produtos selecionados em ';
        } else {
            linha1 = linha1 + 'reduzir o preço dos produtos selecionados em ';
        };

        var linha2_coluna1 = 'Preço antes do reajuste: ';
        var linha2_coluna2 = 'R$ ' + valorExemplo.toString();

        var linha3_coluna1 = '';
        var linha3_coluna2 = '';

        if (valorOperadorReajuste == 'A') {
            linha3_coluna1 = linha3_coluna1 + 'Aumentando o preço em ' + valorNumberBoxCustoFrete + ': ';
        } else {
            linha3_coluna1 = linha3_coluna1 + 'Reduzindo o preço em ' + valorNumberBoxCustoFrete + ': ';
        };

        if (valorOperadorReajuste == 'A') {
            linha3_coluna2 = linha3_coluna2 + 'R$ ' + valorExemplo.toString() + ' + ' + valorNumberBoxCustoFrete;
        } else {
            linha3_coluna2 = linha3_coluna2 + 'R$ ' + valorExemplo.toString() + ' - ' + valorNumberBoxCustoFrete;
        };

        var linha4_coluna1 = 'Novo preço do Cliente: ';
        var linha4_coluna2 = '';

        if (tipoValorReajuste == '%') {
            if (valorOperadorReajuste == 'A') {
                valorReajustadoPrecoFixo = (valorExemplo * valorNumberBoxCustoFretePrecoFixo) + valorExemplo;
            } else {
                valorReajustadoPrecoFixo = valorExemplo - (valorExemplo * valorNumberBoxCustoFretePrecoFixo);
            };
        } else {
            if (valorOperadorReajuste == 'A') {
                valorReajustadoPrecoFixo = valorExemplo + valorNumberBoxCustoFretePrecoFixo;
            } else {
                valorReajustadoPrecoFixo = valorExemplo - valorNumberBoxCustoFretePrecoFixo;
            };
        };

        valorReajustadoPrecoFixo = valorReajustadoPrecoFixo.toLocaleString('pt-br', { minimumFractionDigits: 2 });

        linha4_coluna2 = linha4_coluna2 + 'R$ ' + valorReajustadoPrecoFixo.toString();

        $('#reajustePrecoFixo_linha1').hide().text(linha1).fadeIn(500);
        $('#fatorReajustePrecoFixo').hide().text(valorNumberBoxCustoFrete).fadeIn(500);

        $('#reajustePrecoFixo_linha2_coluna1').hide().text(linha2_coluna1).fadeIn(500);
        $('#reajustePrecoFixo_linha2_coluna2').hide().text(linha2_coluna2).fadeIn(500);

        $('#reajustePrecoFixo_linha3_coluna1').hide().text(linha3_coluna1).fadeIn(500);
        $('#reajustePrecoFixo_linha3_coluna2').hide().text(linha3_coluna2).fadeIn(500);

        $('#reajustePrecoFixo_linha4_coluna1').hide().text(linha4_coluna1).fadeIn(500);
        $('#reajustePrecoFixo_linha4_coluna2').hide().text(linha4_coluna2).fadeIn(500);

        document.getElementById("FiltrosReajuste").style.display = 'none';
        document.getElementById("ValidacaoCampos").style.display = 'none';
        document.getElementById("ExemploReajuste").style.display = 'block';
        document.getElementById("RodapeReajuste").style.display = 'none';

    } else {

        DevExpress.ui.notify({
            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
            type: 'error',
            displayTime: 5000,
        });
    }

};

function inibirExemploReajuste() {

    document.getElementById("FiltrosReajuste").style.display = 'block';
    document.getElementById("ExemploReajuste").style.display = 'none';
    document.getElementById("ValidacaoCampos").style.display = 'none';
    document.getElementById("RodapeReajuste").style.display = 'block';

};

function aplicarAlteracaoFormaPrecoFixo() {

    $('#ModalAlterarFormaCondicaoPrecoFixo').modal('hide');

    new PNotify({
        title: 'Alteração de Forma de Pagamento',
        text: 'Dados gravados com sucesso!',
        type: 'success'
    });

    //    const result = DevExpress.validationEngine.validateGroup("AlterarFormaPrecoFixo");

    //    if (result.isValid) {

    //        $('#ModalAlterarFormaCondicaoPrecoFixo').modal('hide');

    //        new PNotify({
    //            title: 'Alteração de Forma de Pagamento',
    //            text: 'Dados gravados com sucesso!',
    //            type: 'success'
    //        });
    //    } else {

    //        DevExpress.ui.notify({
    //            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
    //            type: 'error',
    //            displayTime: 5000,
    //        });
    //    };
};

function aplicarAlteracaoDespachoPrecoFixo() {

    $('#ModalAlterarDespachoPrecoFixo').modal('hide');

    new PNotify({
        title: 'Alteração de Tipo de Despacho',
        text: 'Dados gravados com sucesso!',
        type: 'success'
    });

    //    const result = DevExpress.validationEngine.validateGroup("AlterarDespachoPrecoFixo");

    //    if (result.isValid) {

    //        $('#ModalAlterarDespachoPrecoFixo').modal('hide');

    //        new PNotify({
    //            title: 'Alteração de Tipo de Despacho',
    //            text: 'Dados gravados com sucesso!',
    //            type: 'success'
    //        });
    //    } else {

    //        DevExpress.ui.notify({
    //            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
    //            type: 'error',
    //            displayTime: 5000,
    //        });
    //    };
};

function aplicarDefinicaoFormaDescontoProdutos() {

    const result = DevExpress.validationEngine.validateGroup("DefinirFormaProdutos");

    if (result.isValid) {

        $('#ModalDefinirFormaDescontoProdutos').modal('hide');

        new PNotify({
            title: 'Desconto por Produtos',
            text: 'Dados gravados com sucesso!',
            type: 'success'
        });
    } else {

        DevExpress.ui.notify({
            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
            type: 'error',
            displayTime: 5000,
        });
    };

};

function aplicarAlteracaoFormaDescontoProduto() {

    const result = DevExpress.validationEngine.validateGroup("AlterarFormaProdutos");

    if (result.isValid) {

        $('#ModalAlterarFormaDescontoProduto').modal('hide');

        new PNotify({
            title: 'Alteração de Forma de Pagamento',
            text: 'Dados gravados com sucesso!',
            type: 'success'
        });
    } else {

        DevExpress.ui.notify({
            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
            type: 'error',
            displayTime: 5000,
        });
    };

};

function aplicarDefinicaoFormaDescontoFamilias() {

    const result = DevExpress.validationEngine.validateGroup("DefinirFormaFamilias");

    if (result.isValid) {

        $('#ModalDefinirFormaDescontoFamilias').modal('hide');

        new PNotify({
            title: 'Desconto por Família',
            text: 'Dados gravados com sucesso!',
            type: 'success'
        });

    } else {

        DevExpress.ui.notify({
            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
            type: 'error',
            displayTime: 5000,
        });
    };

};

function aplicarAlteracaoFormaDescontoFamilias() {

    const result = DevExpress.validationEngine.validateGroup("AlterarFormaFamilias");

    if (result.isValid) {

        $('#ModalAlterarFormaDescontoFamilias').modal('hide');

        new PNotify({
            title: 'Alteração de Forma de Pagamento',
            text: 'Dados gravados com sucesso!',
            type: 'success'
        });

    } else {

        DevExpress.ui.notify({
            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
            type: 'error',
            displayTime: 5000,
        });
    };

};

function aplicarAlteracaoDescontoFamilias() {

    const result = DevExpress.validationEngine.validateGroup("AlterarDescontoFamilias");

    if (result.isValid) {

        $('#ModalAlterarDescontoFamilias').modal('hide');

        new PNotify({
            title: 'Alteração de Desconto',
            text: 'Dados gravados com sucesso!',
            type: 'success'
        });

    } else {

        DevExpress.ui.notify({
            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
            type: 'error',
            displayTime: 5000,
        });
    };

};

function aplicarAlteracaoAcrescimoFamilias() {

    const result = DevExpress.validationEngine.validateGroup("AlterarAcrescimoFamilias");

    if (result.isValid) {

        $('#ModalAlterarAcrescimoFamilias').modal('hide');

        new PNotify({
            title: 'Alteração de Acréscimo',
            text: 'Dados gravados com sucesso!',
            type: 'success'
        });

    } else {

        DevExpress.ui.notify({
            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
            type: 'error',
            displayTime: 5000,
        });
    };

};

function aplicarAlteracaoDescontoProduto() {

    const result = DevExpress.validationEngine.validateGroup("AlterarDescontoProduto");

    if (result.isValid) {

        $('#ModalAlterarDescontoProduto').modal('hide');

        new PNotify({
            title: 'Alteração de Desconto',
            text: 'Dados gravados com sucesso!',
            type: 'success'
        });

    } else {

        DevExpress.ui.notify({
            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
            type: 'error',
            displayTime: 5000,
        });
    };

};

function aplicarAlteracaoAcrescimoProduto() {

    const result = DevExpress.validationEngine.validateGroup("AlterarAcrescimoProduto");

    if (result.isValid) {

        $('#ModalAlterarAcrescimoProduto').modal('hide');

        new PNotify({
            title: 'Alteração de Acréscimo',
            text: 'Dados gravados com sucesso!',
            type: 'success'
        });

    } else {

        DevExpress.ui.notify({
            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
            type: 'error',
            displayTime: 5000,
        });
    };

};

function aplicarAlteracaoDescontoMaximoPrecoFixo() {

    const result = DevExpress.validationEngine.validateGroup("AlterarDescontoMaximo");

    if (result.isValid) {

        $('#ModalAlterarDescontoMaximo').modal('hide');

        new PNotify({
            title: 'Alteração de Desconto Máximo',
            text: 'Dados gravados com sucesso!',
            type: 'success'
        });
    } else {

        DevExpress.ui.notify({
            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
            type: 'error',
            displayTime: 5000,
        });
    };
};

function fecharConsultaSerasa() {
    ExibirEsconderPaineis('consultaHistoricoSerasa', 'none');
    ExibirEsconderPaineis('cardSaibaMaisSerasa', 'none');
    ExibirEsconderPaineis('panelNovaConsultaSerasa', 'block');
    limparDiv('resultadoConsultaSerasa');
    listHistoricoSerasa.unselectAll()
}

function imprimirConsultaSerasa() {
    const content = document.querySelector('#resultadoConsultaSerasa');

    const options = {
        margin: [10, 10, 10, 10],
        filename: "consultaSerasa.pdf",
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(content).save();
};

function resultadoConsultaSerasa() {
    ExibirEsconderPaineis('panelNovaConsultaSerasa', 'none');
    ExibirEsconderPaineis('consultaHistoricoSerasa', 'block');
    ExibirEsconderPaineis('cardNovoUsuarioSerasa', 'none');

    carregar('/ConsultaCredNetLight.html');
}

function novoUsuarioSerasa() {
    ExibirEsconderPaineis('panelNovaConsultaSerasa', 'none');
    ExibirEsconderPaineis('cardNovoUsuarioSerasa', 'block');
    rolar_para('#btnGravaCredenciaisSerasa');
}

function saibaMaisSerasa() {
    ExibirEsconderPaineis('panelNovaConsultaSerasa', 'none');
    ExibirEsconderPaineis('cardNovoUsuarioSerasa', 'none');
    ExibirEsconderPaineis('cardSaibaMaisSerasa', 'block');
}


function novaConsultaSerasa() {
    ExibirEsconderPaineis('panelNovaConsultaSerasa', 'block');
    ExibirEsconderPaineis('consultaHistoricoSerasa', 'none');
    ExibirEsconderPaineis('cardNovoUsuarioSerasa', 'none');

    limparDiv('resultadoConsultaSerasa');
}

function carregar(pagina) {
    $("#resultadoConsultaSerasa").load(pagina);
}

function limparDiv(div) {
    let alvo = document.getElementById(div);

    // Remove todos os descendentes da <div id="alvo">
    alvo.innerText = '';
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

function recolherRadarPrecos(recolher) {

    if (recolher) {
        ExibirEsconderPaineis('cardRadarPrecosFechado', 'block');
        $('#cardRadarPrecos').slideUp();
    } else {
        $('#cardRadarPrecos').slideDown();
        ExibirEsconderPaineis('cardRadarPrecosFechado', 'none');
    }

}

function pesquisarFotoGoogle() {
    $('#produtoComImagem').slideDown();
    $('#produtoSemImagem').slideUp();

    $('#botoesConfirmacaoGoogle').slideDown();
    $('#linkPesquisarFotoGoogle').slideUp();
}

function descartarFotoGoogle() {
    $('#produtoComImagem').slideUp();
    $('#produtoSemImagem').slideDown();

    $('#botoesConfirmacaoGoogle').slideUp();
    $('#linkPesquisarFotoGoogle').slideDown();
}

function pesquisaAvancadaFotoGoogle() {
    $('#produtoComImagem').slideUp();
    $('#produtoSemImagem').slideDown();

    $('#botoesConfirmacaoGoogle').slideUp();
    $('#linkPesquisarFotoGoogle').slideDown();
}

function confirmaFotoGoogle() {
    $('#botoesConfirmacaoGoogle').slideUp();
    $('#linkPesquisarFotoGoogle').slideDown();
}
function upLoadFoto() {
    $('#produtoComImagem').slideDown();
    $('#produtoSemImagem').slideUp();
}

function apagarFoto() {
    $('#produtoSemImagem').slideDown();
    $('#produtoComImagem').slideUp();
}

function exibirSugestaoCurso() {
    $('#panelSugestaoCursoFechado').slideUp();
    $('#panelSugestaoCurso').slideDown();

    rolar_para('#btnCursoFormacaoPreco');
}

function fecharSugestaoCurso() {
    $('#panelSugestaoCurso').slideUp();
    $('#panelSugestaoCursoFechado').slideDown();
}

function carregaPrecificacao(pFilial) {

    document.getElementById("panelPrecoFilial").style.display = 'block';


    //$('#panelLabelFilial').slideDown(); 

    //$('#labelCodigoFilial').hide().text(pFilial).fadeIn(500);
    //var labelNomeFilial;

    //if (pFilial == 1) {
    //    labelNomeFilial = 'LOJA DA CONSTRUÇÃO BAIRRO';
    //} else if (pFilial == 2) {
    //    labelNomeFilial = 'LOJA DA CONSTRUÇÃO CENTRO';
    //} else if (pFilial == 3) {
    //    labelNomeFilial = 'LOJA DA CONSTRUÇÃO LITORAL';
    //}

    //$('#labelNomeFilial').hide().text(labelNomeFilial).fadeIn(500);

};

function fecharPainelDadosFiscais() {
    $('#panelDadosFiscais').slideUp();
}

function exibirPainelDadosFiscais() {
    $('#panelDadosFiscais').slideDown();
}
function exibirPainelRegrasComerciais() {
    $('#panelRegrasComerciais').slideDown();
}
function fecharPainelRegrasComerciais() {
    $('#panelRegrasComerciais').slideUp();
}
function exibirPainelTabelasPrecos() {
    ExibirEsconderPaineis('panelOfertas', 'none');
    ExibirEsconderPaineis('panelHistoricoPrecos', 'none');
    ExibirEsconderPaineis('panelMenuPrecificacao', 'none');
    ExibirEsconderPaineis('panelOpcoesPrecificacao', 'none');

    $('#panelTabelasPrecos').slideDown();
}
function fecharPainelTabelasPrecos() {
    ExibirEsconderPaineis('panelTabelasPrecos', 'none');
    ExibirEsconderPaineis('panelOfertas', 'none');
    ExibirEsconderPaineis('panelHistoricoPrecos', 'none');
    ExibirEsconderPaineis('panelMenuPrecificacao', 'block');
    ExibirEsconderPaineis('panelOpcoesPrecificacao', 'block');
}
function exibirPainelOfertas() {
    ExibirEsconderPaineis('panelTabelasPrecos', 'none');
    ExibirEsconderPaineis('panelHistoricoPrecos', 'none');
    ExibirEsconderPaineis('panelMenuPrecificacao', 'none');
    ExibirEsconderPaineis('panelOpcoesPrecificacao', 'none');

    $('#panelOfertas').slideDown();
}
function fecharPainelOfertas() {
    ExibirEsconderPaineis('panelHistoricoPrecos', 'none');
    ExibirEsconderPaineis('panelOfertas', 'none');
    ExibirEsconderPaineis('panelTabelasPrecos', 'none');
    ExibirEsconderPaineis('panelMenuPrecificacao', 'block');
    ExibirEsconderPaineis('panelOpcoesPrecificacao', 'block');
}
function exibirPainelHistoricoPrecos() {
    ExibirEsconderPaineis('panelTabelasPrecos', 'none');
    ExibirEsconderPaineis('panelOfertas', 'none');
    ExibirEsconderPaineis('panelMenuPrecificacao', 'none');
    ExibirEsconderPaineis('panelOpcoesPrecificacao', 'none');

    $('#panelHistoricoPrecos').slideDown();
}
function fecharPainelHistoricoPrecos() {
    ExibirEsconderPaineis('panelHistoricoPrecos', 'none');
    ExibirEsconderPaineis('panelOfertas', 'none');
    ExibirEsconderPaineis('panelTabelasPrecos', 'none');
    ExibirEsconderPaineis('panelMenuPrecificacao', 'block');
    ExibirEsconderPaineis('panelOpcoesPrecificacao', 'block');
}
function FormatButtons() {

    let buttonsPrincipal = $("#panelBotoesFiliaisPreco button");
    buttonsPrincipal.removeClass('btn-gray').addClass('btn-default');
    buttonsPrincipal.on("click", a => {
        console.log('FORMATA BOTÕES');
        buttonsPrincipal.removeClass('btn-gray').addClass('btn-default');
        $(a.currentTarget).removeClass('btn-default').addClass('btn-gray');
    })

    //    let buttonsOpcoesPrecificacao = $("#panelBotoesOpcoesPrecificacao button");
    //    buttonsOpcoesPrecificacao.removeClass('btn-dark').addClass('btn-default');
    //    buttonsOpcoesPrecificacao.on("click", a => {
    //        console.log('FORMATA BOTÕES');
    //        buttonsOpcoesPrecificacao.removeClass('btn-dark').addClass('btn-default');
    //        $(a.currentTarget).removeClass('btn-default').addClass('btn-dark');
    //    })
}

//#endregion

$(document).ready(function () {
    var options = {
        series: [{
            name: 'Preço de Venda',
            data: [4.33, 3.35, 3.99, 4.75],
        }],
        chart: {
            height: 140,
            top: 0,
            type: 'bar',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 7,
                opacity: 0.2
            },
            toolbar: {
                show: false,
                tools: {
                    download: false
                },
            },
        },
        //colors: ['#1F4057'], //cor padrão
        colors: ['#143851'], //cor padrão
        plotOptions: {
            bar: {
                //distributed: true,
                colors: {
                    ranges: [{
                        from: 4.33,
                        to: 4.33,
                        color: '#223843'
                    }, {
                        from: 3.35,
                        to: 3.35,
                        color: '#364A54'
                    }, {
                        from: 3.99,
                        to: 3.99,
                        color: '#4A5C65'
                    }, {
                        from: 4.75,
                        to: 4.75,
                        color: '#125842'
                    }]
                },
                horizontal: true,
                barHeight: '80%',
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        //            dataLabels: {
        //                enabled: true,
        //                formatter: function (val) {
        //                    return val + "";
        //                },
        //                offsetY: -10,
        //                style: {
        //                    fontSize: '12px',
        //                    colors: ["#304758"]
        //                }
        //            },

        dataLabels: {
            enabled: true,
            //textAnchor: 'start',
            style: {
                //colors: ['#E6F7FF']
                colors: ['#fff']
            },
            formatter: function (val, opt) {
                //return opt.w.globals.labels[opt.dataPointIndex]
                return '' + val;
            },
            offsetX: -10,
            dropShadow: {
                enabled: true
            }
        },

        xaxis: {
            categories: ["Maior Preço", "Menor Preço", "Preço Médio", "Seu Preço"],
            position: 'bottom',
            offsetY: -6,
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
            }
        },
        yaxis: {
            axisBorder: {
                show: true
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: true,
                formatter: function (val) {
                    return val + "";
                }
            }

        },
        title: {
            text: 'PREÇO DE VENDA',
            floating: true,
            offsetY: 0,
            align: 'center',
            style: {
                //color: '#5F85A1',
                color: '#6c757d',
                fontSize: '11px',
                bold: "true"
            }
        }
    };

    //options.series[0].data = [];
    //options.xaxis.categories = [];
    //$.each(obj[i], function (x, obji) {
    //    options.series[0].data.push(obji.vL_FATURAMENTO.replace(",", "."));
    //    options.xaxis.categories.push(obji.dS_FORMA_PAGAMENTO);
    //});

    var chartPrecoVenda = new ApexCharts(document.querySelector("#chartPrecoVenda"), options);
    chartPrecoVenda.render();
    chartPrecoVenda.update();
});

$(document).ready(function () {
    var options = {
        series: [{
            name: 'Preço de Custo Sem Impostos',
            data: [4.02, 3.19, 3.55, 4.99]
        }],
        chart: {
            height: 140,
            type: 'bar',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 7,
                opacity: 0.2
            },
            toolbar: {
                show: false,
                tools: {
                    download: false
                },
            },
        },
        //colors: ['#1F4057'], //cor padrão
        colors: ['#2C7AB2'], //cor padrão
        plotOptions: {
            bar: {
                //distributed: true,
                colors: {
                    ranges: [{
                        from: 4.02,
                        to: 4.02,
                        color: '#223843'
                    }, {
                        from: 3.19,
                        to: 3.19,
                        color: '#364A54'
                    }, {
                        from: 3.55,
                        to: 3.55,
                        color: '#4A5C65'
                    }, {
                        from: 4.99,
                        to: 4.99,
                        color: '#6A111B'
                    }]
                },
                horizontal: true,
                barHeight: '80%',
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        //            dataLabels: {
        //                enabled: true,
        //                formatter: function (val) {
        //                    return val + "";
        //                },
        //                offsetY: -10,
        //                style: {
        //                    fontSize: '12px',
        //                    colors: ["#304758"]
        //                }
        //            },

        dataLabels: {
            enabled: true,
            //textAnchor: 'start',
            style: {
                //colors: ['#E6F7FF']
                colors: ['#fff']
            },
            formatter: function (val, opt) {
                //return opt.w.globals.labels[opt.dataPointIndex]
                return '' + val;
            },
            offsetX: -10,
            dropShadow: {
                enabled: true
            }
        },

        xaxis: {
            categories: ["Maior Custo", "Menor Custo", "Custo Médio", "Seu Custo"],
            position: 'bottom',
            offsetY: -6,
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        //colorFrom: '#D8E3F0',
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
            }
        },
        yaxis: {
            axisBorder: {
                show: true
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: true,
                formatter: function (val) {
                    return val + "";
                }
            }

        },
        title: {
            text: 'CUSTO SEM IMPOSTOS',
            floating: true,
            offsetY: 0,
            align: 'center',
            style: {
                //color: '#5F85A1',
                color: '#6c757d',
                fontSize: '11px',
                bold: "true"
            }
        }
    };

    //options.series[0].data = [];
    //options.xaxis.categories = [];
    //$.each(obj[i], function (x, obji) {
    //    options.series[0].data.push(obji.vL_FATURAMENTO.replace(",", "."));
    //    options.xaxis.categories.push(obji.dS_FORMA_PAGAMENTO);
    //});

    var chartCustoSemImpostos = new ApexCharts(document.querySelector("#chartCustoSemImpostos"), options);
    chartCustoSemImpostos.render();
    chartCustoSemImpostos.update();
});

$(document).ready(function () {
    var options = {
        series: [{
            name: 'Preço de Custo Com Impostos',
            data: [4.25, 2.75, 3.37, 4.32]
        }],
        chart: {
            height: 140,
            type: 'bar',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 7,
                opacity: 0.2
            },
            toolbar: {
                show: false,
                tools: {
                    download: false
                },
            },
        },
        //colors: ['#1F4057'], //cor padrão
        colors: ['#2C7AB2'], //cor padrão
        plotOptions: {
            bar: {
                //distributed: true,
                colors: {
                    ranges: [{
                        from: 4.25,
                        to: 4.25,
                        color: '#223843'
                    }, {
                        from: 2.75,
                        to: 2.75,
                        color: '#364A54'
                    }, {
                        from: 3.37,
                        to: 3.37,
                        color: '#4A5C65'
                    }, {
                        from: 4.32,
                        to: 4.32,
                        color: '#6A111B'
                    }]
                },
                horizontal: true,
                barHeight: '80%',
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        //            dataLabels: {
        //                enabled: true,
        //                formatter: function (val) {
        //                    return val + "";
        //                },
        //                offsetY: -10,
        //                style: {
        //                    fontSize: '12px',
        //                    colors: ["#304758"]
        //                }
        //            },

        dataLabels: {
            enabled: true,
            //textAnchor: 'start',
            style: {
                //colors: ['#E6F7FF']
                colors: ['#fff']
            },
            formatter: function (val, opt) {
                //return opt.w.globals.labels[opt.dataPointIndex]
                return '' + val;
            },
            offsetX: -10,
            dropShadow: {
                enabled: true
            }
        },

        xaxis: {
            categories: ["Maior Custo", "Menor Custo", "Custo Médio", "Seu Custo"],
            position: 'bottom',
            offsetY: -6,
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        //colorFrom: '#D8E3F0',
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
            }
        },
        yaxis: {
            axisBorder: {
                show: true
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: true,
                formatter: function (val) {
                    return val + "";
                }
            }

        },
        title: {
            text: 'CUSTO COM IMPOSTOS',
            floating: true,
            offsetY: 0,
            align: 'center',
            style: {
                //color: '#5F85A1',
                color: '#6c757d',
                fontSize: '11px',
                bold: "true"
            }
        }
    };

    //options.series[0].data = [];
    //options.xaxis.categories = [];
    //$.each(obj[i], function (x, obji) {
    //    options.series[0].data.push(obji.vL_FATURAMENTO.replace(",", "."));
    //    options.xaxis.categories.push(obji.dS_FORMA_PAGAMENTO);
    //});

    var chartCustoComImpostos = new ApexCharts(document.querySelector("#chartCustoComImpostos"), options);
    chartCustoComImpostos.render();
    chartCustoComImpostos.update();
});

$(document).ready(function () {
    var options = {
        series: [{
            name: 'Margem de Lucro',
            data: [37.65, 33.21, 35.25, 42.37]
        }],
        chart: {
            height: 140,
            type: 'bar',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 7,
                opacity: 0.2
            },
            toolbar: {
                show: false,
                tools: {
                    download: false
                },
            },
        },
        //colors: ['#1F4057'], //cor padrão
        colors: ['#2C7AB2'], //cor padrão
        plotOptions: {
            bar: {
                //distributed: true,
                colors: {
                    ranges: [{
                        from: 37.65,
                        to: 37.65,
                        color: '#223843'
                    }, {
                        from: 33.21,
                        to: 33.21,
                        color: '#364A54'
                    }, {
                        from: 35.25,
                        to: 35.25,
                        color: '#4A5C65'
                    }, {
                        from: 42.37,
                        to: 42.37,
                        color: '#125842'
                    }]
                },
                horizontal: true,
                barHeight: '80%',
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        //            dataLabels: {
        //                enabled: true,
        //                formatter: function (val) {
        //                    return val + "";
        //                },
        //                offsetY: -10,
        //                style: {
        //                    fontSize: '12px',
        //                    colors: ["#304758"]
        //                }
        //            },

        dataLabels: {
            enabled: true,
            //textAnchor: 'start',
            style: {
                //colors: ['#E6F7FF']
                colors: ['#fff']
            },
            formatter: function (val, opt) {
                //return opt.w.globals.labels[opt.dataPointIndex]
                return val + ' %';
            },
            offsetX: -10,
            dropShadow: {
                enabled: true
            }
        },

        xaxis: {
            categories: ["Maior Lucro", "Menor Lucro", "Lucro Médio", "Seu Lucro"],
            position: 'bottom',
            offsetY: -6,
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        //colorFrom: '#D8E3F0',
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
            }
        },
        yaxis: {
            axisBorder: {
                show: true
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: true,
                formatter: function (val) {
                    return val + "";
                }
            }

        },
        title: {
            text: 'MARGEM DE LUCRO',
            floating: true,
            offsetY: 0,
            align: 'center',
            style: {
                //color: '#5F85A1',
                color: '#6c757d',
                fontSize: '11px',
                bold: "true"
            }
        }
    };

    //options.series[0].data = [];
    //options.xaxis.categories = [];
    //$.each(obj[i], function (x, obji) {
    //    options.series[0].data.push(obji.vL_FATURAMENTO.replace(",", "."));
    //    options.xaxis.categories.push(obji.dS_FORMA_PAGAMENTO);
    //});

    var chartMargemLucro = new ApexCharts(document.querySelector("#chartMargemLucro"), options);
    chartMargemLucro.render();
    chartMargemLucro.update();
});

