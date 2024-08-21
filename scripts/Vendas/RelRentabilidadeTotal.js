var loadPanel;

var tipoAgrupamento = '';
var exibirCodigoFabricante = false;

var dataAtual = new Date();
var primeiroDiaMes = '';
var labelColunaDescricao = '';

const ano = dataAtual.getFullYear();
const mes = dataAtual.getMonth(); // 0 para janeiro, 1 para fevereiro, e assim por diante

const mesAtual = mes + 1;
primeiroDiaMes = ano + '/' + mesAtual + '/01 00:00:00 AM';


//if (mes == 0) {
//    primeiroDiaMes = ano + '/01/01 00:00:00 AM'
//} else {
//    const mesAtual = mes + 1;
//    primeiroDiaMes = ano + '/' + mesAtual + '/01 00:00:00 AM';
//}

const dataInicial = new Date(primeiroDiaMes);
const dataUltimoDiaMes = ultimoDiaDoMes(ano, mes);

FormatButtons();

loadPanel = $('#load_Panel').dxLoadPanel({
    shadingColor: 'rgba(0,0,0,0.4)',
    message: 'Carregando...',
    visible: false,
    showIndicator: true,
    showPane: true,
    shading: true,
    hideOnOutsideClick: false,
}).dxLoadPanel('instance');

loadPanel.show();

var COMPONENTES = [];
var dxComp = Object();

let load_lkp_Fornecedores = Load_Azr_Lookup_FornecedorV2('lkp_Fornecedores', COMPONENTES, 0, 'Fornecedor', 'Fornecedor').then(() => {
    dxComp.lkp_Fornecedores = DevExpress.ui.dxLookup.getInstance('#lkp_Fornecedores');
});

let load_lkp_Familias = Load_Azr_DropDownBox_FamiliaProduto(COMPONENTES, 'lkp_Familias', 'Árvore de Família', 0).then(() => {
    dxComp.lkp_Familias = DevExpress.ui.dxDropDownBox.getInstance('#lkp_Familias');
});

let load_lkp_Produtos = Load_Azr_Lookup_Produto('lkp_Produtos', COMPONENTES).then(() => {
    dxComp.lkp_Produtos = DevExpress.ui.dxLookup.getInstance('#lkp_Produtos');
});

Promise.all([load_lkp_Produtos, load_lkp_Familias, load_lkp_Fornecedores]);

//Load_Azr_Lookup_FornecedorV2('lkp_Fornecedores', COMPONENTES, 0, 'Fornecedor', 'Fornecedor');
//Load_Azr_DropDownBox_FamiliaProduto(COMPONENTES, 'lkp_Familias', 'Família de Produtos', 0);
//Load_Azr_Lookup_Produto('lkp_Produtos', COMPONENTES);

$('#dt_Inicial_Faturamento').dxDateBox({
    labelMode: 'floating',
    label: 'Data Inicial',
    placeholder: 'Data Inicial',
    readOnly: false,
    showClearButton: false,
    useMaskBehavior: true,
    height: 27,
    displayFormat: 'dd/MM/yyyy HH:mm',
    type: 'datetime',
    value: dataInicial,
}).dxValidator({
    validationRules: [{ type: 'required', message: 'Período obrigatório', }],
    validationGroup: 'Periodo'
});

$('#dt_Final_Faturamento').dxDateBox({
    labelMode: 'floating',
    label: 'Data Final',
    placeholder: 'Data Final',
    readOnly: false,
    showClearButton: false,
    useMaskBehavior: true,
    displayFormat: 'dd/MM/yyyy HH:mm',
    height: 27,
    type: 'datetime',
    value: dataUltimoDiaMes,
}).dxValidator({
    validationRules: [{ type: 'required', message: 'Período obrigatório', }],
    validationGroup: 'Periodo'
});


//Filiais que o usuário possui acesso
GetAzureDataSource(33).then((result) => {

    loadPanel.show();

    if (result.success) {

        $('#lkp_Filiais').dxLookup({
            dataSource: result.data,

            searchExpr: ['DS_PESQUISA'],
            displayExpr: 'DS_PESQUISA',
            valueExpr: 'CD_FILIAL',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Filiais',
            },
            labelMode: 'floating',
            label: 'Filial',
            placeholder: 'Filial',
            showClearButton: true,
        });

        loadPanel.hide();
    }
    else {
        DevExpress.ui.notify({
            message: `${result.name}: ${result.error}`,
            type: 'error',
            displayTime: 5000,
        });
        console.error(`${result.name}: ${result.error}`);

        loadPanel.hide();
    }
});

//Almoxarifados que o usuário possui acesso
GetAzureDataSource(28).then((result) => {

    loadPanel.show();

    if (result.success) {

        $('#lkp_Almoxarifados').dxLookup({
            dataSource: result.data,

            searchExpr: ['DS_ALMOXARIFADO_PESQUISA'],
            displayExpr: 'DS_ALMOXARIFADO_PESQUISA',
            valueExpr: 'CD_ALMOXARIFADO',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Almoxarifados',
            },
            labelMode: 'floating',
            label: 'Almoxarifado',
            placeholder: 'Almoxarifado',
            showClearButton: true,
        });

        loadPanel.hide();
    }
    else {
        DevExpress.ui.notify({
            message: `${result.name}: ${result.error}`,
            type: 'error',
            displayTime: 5000,
        });
        console.error(`${result.name}: ${result.error}`);

        loadPanel.hide();
    }
});

//Vendedores (Usuários)
GetAzureDataSource(34).then((result) => {

    loadPanel.show();

    if (result.success) {

        function getTemplateFoto(data, containerClass) {
            return `<div class='${containerClass}'><img src='${data.DS_URL_FOTO}'?'${new Date()}' /><div> ${data.DS_PESQUISA}</div></div>`;
        }

        $('#lkp_Vendedores').dxLookup({
            dataSource: result.data,

            searchExpr: ['DS_PESQUISA'],
            displayExpr: 'DS_PESQUISA',
            valueExpr: 'CD_LOGIN',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Vendedores',
            },
            labelMode: 'floating',
            label: 'Vendedor',
            placeholder: 'Vendedor',
            showClearButton: true,
            itemTemplate(data) {
                return getTemplateFoto(data, 'custom-item');
            },
        });

        loadPanel.hide();
    }
    else {
        DevExpress.ui.notify({
            message: `${result.name}: ${result.error}`,
            type: 'error',
            displayTime: 5000,
        });
        console.error(`${result.name}: ${result.error}`);

        loadPanel.hide();
    }
});


$('#chk_Agrupar_Familia_Pai').dxCheckBox({
    value: false,
    text: "Agrupar por família pai",
});

$('#chk_Fornecedor_Padrao').dxCheckBox({
    value: false,
    text: "Somente fornecedor padrão",
});

$('#chk_Incluir_Conta_Corrente').dxCheckBox({
    value: false,
    text: "Incluir conta corrente",
});

$('#chk_Compras_Estoque').dxCheckBox({
    value: false,
    text: "Exibir compras e estoque",
});

$('#chk_Devolucoes').dxCheckBox({
    value: false,
    text: "Exibir devoluções",
});

$('#chk_Somente_Registros_Vendas').dxCheckBox({
    value: false,
    text: "Exibir somente registros com vendas",
});

var dataSourcePeriodo = [
    { CD_TIPO_PERIODO: 'F', DS_TIPO_PERIODO: 'Faturamento' },
    { CD_TIPO_PERIODO: 'E', DS_TIPO_PERIODO: 'Emissão' },
];

$('#lkp_Periodo').dxLookup({
    dataSource: dataSourcePeriodo,
    value: 'F',
    searchExpr: ['DS_TIPO_PERIODO'],
    displayExpr: 'DS_TIPO_PERIODO',
    valueExpr: 'CD_TIPO_PERIODO',
    dropDownOptions: {
        closeOnOutsideClick: true,
        showTitle: false,
        title: 'Período',
    },
    labelMode: 'floating',
    label: 'Período',
    placeholder: 'Período',
    showClearButton: false,
});

var dataSourceCustos = [
    { CD_TIPO_CUSTO: 'CM', DS_TIPO_CUSTO: 'Custo Médio' },
    { CD_TIPO_CUSTO: 'CB', DS_TIPO_CUSTO: 'Custo Bruto' },
];

$('#lkp_Custo').dxLookup({
    dataSource: dataSourceCustos,
    value: 'CM',
    searchExpr: ['DS_TIPO_CUSTO'],
    displayExpr: 'DS_TIPO_CUSTO',
    valueExpr: 'CD_TIPO_CUSTO',
    dropDownOptions: {
        closeOnOutsideClick: true,
        showTitle: false,
        title: 'Tipo de Custo',
    },
    labelMode: 'floating',
    label: 'Tipo de Custo',
    placeholder: 'Tipo de Custo',
    showClearButton: false,
});

var dataSourceOrdenacao = [
    { CD_ORDENACAO: 'FT', DS_ORDENACAO: 'Valor Faturamento' },
    { CD_ORDENACAO: 'QT', DS_ORDENACAO: 'Quantidade' },
    { CD_ORDENACAO: 'CT', DS_ORDENACAO: 'Custo' },
    { CD_ORDENACAO: 'RT', DS_ORDENACAO: 'Valor Rentabilidade' },
    { CD_ORDENACAO: 'LC', DS_ORDENACAO: '% de Lucro' },
    { CD_ORDENACAO: 'DS', DS_ORDENACAO: 'Descrição' },
];

$('#lkp_Ordenacao').dxLookup({
    dataSource: dataSourceOrdenacao,
    value: 'FT',
    searchExpr: ['DS_ORDENACAO'],
    displayExpr: 'DS_ORDENACAO',
    valueExpr: 'CD_ORDENACAO',
    dropDownOptions: {
        closeOnOutsideClick: true,
        showTitle: false,
        title: 'Ordenação',
    },
    labelMode: 'floating',
    label: 'Ordenação',
    placeholder: 'Ordenação',
    showClearButton: false,
});


$(() => {

});

function validaCampos() {

    loadPanel.show();

    const result = validarCamposPeriodo();

    if (result) {

        gerarRelatorio();

    } else {

        loadPanel.hide();
    };
}

function validarCamposPeriodo() {

    var dataInicialFaturamento = $('#dt_Inicial_Faturamento').dxDateBox('instance').option('value');
    var dataFinalFaturamento = $('#dt_Final_Faturamento').dxDateBox('instance').option('value');

    const resultadoValidacaoPeriodo = DevExpress.validationEngine.validateGroup("Periodo");

    if (resultadoValidacaoPeriodo.isValid == false) {
        DevExpress.ui.notify({
            message: 'É necessário informar tanto a data inicial quanto a final de faturamento.',
            type: 'error',
            displayTime: 5000,
        });
        return false;
    } else {
        return true;
    };

}

async function gerarRelatorio() {

    await load_lkp_Produtos;
    await load_lkp_Fornecedores;
    await load_lkp_Familias;

    ExibirEsconderPaineis('cardFiltros', 'none');
    ExibirEsconderPaineis('cardResultadoFiltros', 'none');
    ExibirEsconderPaineis('divBotoesFiltro', 'none');
    ExibirEsconderPaineis('divBotoesFiltroRecolher', 'block');
    ExibirEsconderPaineis('cardResultado', 'none');

    var data = new Date();

    data = new Date($('#dt_Inicial_Faturamento').dxDateBox("instance").option('value'));
    var dataInicialFaturamento = '"' + moment(data).format('YYYY/MM/DD HH:mm') + '"'
    var labelDataInicialFaturamento = moment(data).format('DD/MM/YYYY HH:mm')

    data = new Date($('#dt_Final_Faturamento').dxDateBox("instance").option('value'));
    var dataFinalFaturamento = '"' + moment(data).format('YYYY/MM/DD HH:mm') + '"'
    var labelDataFinalFaturamento = moment(data).format('DD/MM/YYYY HH:mm')

    var periodo = '"' + $('#lkp_Periodo').dxLookup("instance").option('value') + '"';
    var paramPeriodo = $('#lkp_Periodo').dxLookup("instance").option('value');

    if (paramPeriodo == "F") {
        var labelPeriodo = "Faturamento"
    } else {
        var labelPeriodo = "Emissão"
    }

    var tipoCusto = '"' + $('#lkp_Custo').dxLookup("instance").option('value') + '"';
    var paramTipoCusto = $('#lkp_Custo').dxLookup("instance").option('value');

    if (paramTipoCusto == "CM") {
        var labelTipoCusto = "Custo Médio"
    } else {
        var labelTipoCusto = "Custo Bruto"
    }

    var ordenacao = '"' + $('#lkp_Ordenacao').dxLookup("instance").option('value') + '"';
    var paramOrdenacao = $('#lkp_Ordenacao').dxLookup("instance").option('value');

    if (paramOrdenacao == "QT") {
        var labelOrdenacao = "Quantidade"
    } if (paramOrdenacao == "FT") {
        var labelOrdenacao = "Faturamento"
    } if (paramOrdenacao == "CT") {
        var labelOrdenacao = "Custo"
    } if (paramOrdenacao == "RT") {
        var labelOrdenacao = "Rentabilidade"
    } if (paramOrdenacao == "LC") {
        var labelOrdenacao = "% Lucro"
    } if (paramOrdenacao == "DS") {
        var labelOrdenacao = "Descrição"
    }

    var labelFilial = $('#lkp_Filiais').dxLookup('instance').option('value');
    var filial = labelFilial ? '"' + labelFilial + '"' : null;

    var labelAlmoxarifado = $('#lkp_Almoxarifados').dxLookup('instance').option('value');
    var almoxarifado = labelAlmoxarifado ? '"' + labelAlmoxarifado + '"' : null;

    //var labelProduto = $('#lkp_Produtos').dxLookup('instance').option('value');
    var labelProduto = dxComp.lkp_Produtos.option('value');
    var produto = labelProduto ? '"' + labelProduto + '"' : null;

    var labelFornecedor = dxComp.lkp_Fornecedores.option('value');
    var fornecedor = labelFornecedor ? '"' + labelFornecedor + '"' : null;

    var labelFamilia = dxComp.lkp_Familias.option('value');
    var familia = labelFamilia ? '"' + labelFamilia + '"' : null;

    var labelVendedor = $('#lkp_Vendedores').dxLookup('instance').option('value');
    var vendedor = labelVendedor ? '"' + labelVendedor + '"' : null;

    var incluirContaCorrente = $('#chk_Incluir_Conta_Corrente').dxCheckBox("instance").option('value');
    var fornecedorPadrao = $('#chk_Fornecedor_Padrao').dxCheckBox('instance').option('value');
    var incluirDevolucoes = $('#chk_Devolucoes').dxCheckBox('instance').option('value');
    var somenteRegistrosComVendas = $('#chk_Somente_Registros_Vendas').dxCheckBox('instance').option('value');
    var incluirComprasEstoque = $('#chk_Compras_Estoque').dxCheckBox('instance').option('value');

    var exibirCompraEstoque = false;

    if ((tipoAgrupamento == "P" || tipoAgrupamento == "R" || tipoAgrupamento == "F") && incluirComprasEstoque) {
        exibirCompraEstoque = true;
    }

    var agruparFamiliaPai = $('#chk_Agrupar_Familia_Pai').dxCheckBox('instance').option('value');
    var resultadoAgrupamento = '"' + tipoAgrupamento + '"';


    if (agruparFamiliaPai == true && tipoAgrupamento == 'F') {
        var codigoQuery = 48
    } else {
        var codigoQuery = 47
    }

    var parametros = '{ CD_FILIAL: ' + filial +
        ', CD_ALMOXARIFADO: ' + almoxarifado +
        ', DT_INICIO_PERIODO: ' + dataInicialFaturamento +
        ', DT_TERMINO_PERIODO: ' + dataFinalFaturamento +
        ', CD_TIPO_PERIODO: ' + periodo +
        ', CD_PRODUTO: ' + produto +
        ', CD_FAMILIA: ' + familia +
        ', CD_FORNECEDOR: ' + fornecedor +
        ', CD_LOGIN_VENDEDOR: ' + vendedor +
        ', CD_RESULTADO: ' + resultadoAgrupamento +
        ', CD_ORDEM: ' + ordenacao +
        ', CD_TIPO_CUSTO: ' + tipoCusto +
        ', LG_INCLUIR_CONTA_CORRENTE: ' + incluirContaCorrente +
        ', LG_SOMENTE_FORNECEDOR_PADRAO: ' + fornecedorPadrao +
        ', LG_SOMENTE_REGISTROS_COM_VENDA: ' + somenteRegistrosComVendas +
        ', LG_EXIBIR_COMPRAS_ESTOQUE: ' + incluirComprasEstoque +
        ', LG_ABATER_DEVOLUCOES: ' + incluirDevolucoes +
        ', LG_OBRIGA_AUTENTICACAO: false ' +
        ', CD_ABATER_NCM_ISENTO: 0 ' +
        ' }';

    //console.log("QUERY:", codigoQuery)
    //console.log("PARÂMETROS:", parametros)

    //processa resultado do relatório
    GetAzureDataSource(codigoQuery, parametros, timeOut = 180).then((result) => {

        if (result.success) {

            ExibirEsconderPaineis('cardResultado', 'block');
            loadPanel.hide();

            //console.log("RESUTLADO: ", result);

            var labelTitulo = "Relatório de Rentabilidade por " + labelColunaDescricao;

            //var moduloMaxWidht = '1300px';
            //document.getElementById('Modulos').style.maxWidth = moduloMaxWidht;

            var labelFiltros = "";

            if (result.data.length > 0) {

                if (dataInicialFaturamento !== null) {
                    labelFiltros = labelFiltros + 'Faturamento: ' + labelDataInicialFaturamento + ' a ' + labelDataFinalFaturamento
                }

                labelFiltros = labelFiltros + ' / Período: ' + labelPeriodo

                if (incluirContaCorrente == true) {
                    labelFiltros = labelFiltros + ' / Conta Corrente: Sim'
                }

                if (labelFilial == true) {
                    labelFiltros = labelFiltros + ' / Filial: ' + labelFilial
                }

                if (labelAlmoxarifado == true) {
                    labelFiltros = labelFiltros + ' / Almoxarifado: ' + labelAlmoxarifado
                }

                if (labelProduto == true) {
                    labelFiltros = labelFiltros + ' / Produto: ' + labelProduto
                }

                if (labelFornecedor == true) {
                    labelFiltros = labelFiltros + ' / Fornecedor: ' + labelFornecedor

                    if (fornecedorPadrao == true) {
                        labelFiltros = labelFiltros + ' / Padrão: Sim'
                    }
                }

                if (labelVendedor == true) {
                    labelFiltros = labelFiltros + ' / Vendedor: ' + labelVendedor
                }

                if (labelFamilia == true) {
                    labelFiltros = labelFiltros + ' / Família: ' + labelFamilia
                }

                
                if (incluirComprasEstoque == true) {
                    labelFiltros = labelFiltros + ' / Compras e Estoque: Sim'
                }

                if (incluirDevolucoes == true) {
                    labelFiltros = labelFiltros + ' / Abater Devoluções: Sim'
                }
                
                if (somenteRegistrosComVendas == true) {
                    labelFiltros = labelFiltros + ' / Registros com Venda: Sim'
                }

                labelFiltros = labelFiltros + ' / Tipo Custo: ' + labelTipoCusto
                labelFiltros = labelFiltros + ' / Ordenação: ' + labelOrdenacao
            }
            else {
                labelFiltros = "NÃO FORAM ENCONTRADOS REGISTROS COM O FILTRO INFORMADO";
            }

            $('#labelTitulo').hide().text(labelTitulo).fadeIn(500);
            $('#labelFiltros').hide().text(labelFiltros).fadeIn(500);

            var nameGrid = "gridResultado";
            var nameGridFamilia = "gridResultadoFamilia";

            //var nameGridPersistence = "";

            //if (tipoAgrupamento == 'P') {
            //    nameGridPersistence = "gridResultadoProduto";
            //    if (incluirComprasEstoque) {
            //        nameGridPersistence = "gridResultadoProdutoCompra";

            //        if (incluirDevolucoes) {
            //            nameGridPersistence = "gridResultadoProdutoCompraDevolucoes";
            //        }
            //    }
            //    if (incluirDevolucoes) {
            //        nameGridPersistence = "gridResultadoProdutoDevolucoes";

            //        if (incluirComprasEstoque) {
            //            nameGridPersistence = "gridResultadoProdutoCompraDevolucoes";
            //        }
            //    }
            //} else if (tipoAgrupamento == 'F') {
            //    nameGridPersistence = "gridResultadoFamilia";
            //    if (incluirComprasEstoque) {
            //        nameGridPersistence = "gridResultadoFamiliaCompra";

            //        if (incluirDevolucoes) {
            //            nameGridPersistence = "gridResultadoFamiliaCompraDevolucoes";
            //        }
            //    }
            //    if (incluirDevolucoes) {
            //        nameGridPersistence = "gridResultadoFamiliaDevolucoes";

            //        if (incluirComprasEstoque) {
            //            nameGridPersistence = "gridResultadoFamiliaCompraDevolucoes";
            //        }
            //    }
            //} else if (tipoAgrupamento == 'R') {
            //    nameGridPersistence = "gridResultadoFornecedor";
            //    if (incluirComprasEstoque) {
            //        nameGridPersistence = "gridResultadoFornecedorCompra";

            //        if (incluirDevolucoes) {
            //            nameGridPersistence = "gridResultadoFornecedorCompraDevolucoes";
            //        }
            //    }
            //    if (incluirDevolucoes) {
            //        nameGridPersistence = "gridResultadoFornecedorDevolucoes";

            //        if (incluirComprasEstoque) {
            //            nameGridPersistence = "gridResultadoFornecedorCompraDevolucoes";
            //        }
            //    }
            //} else if (tipoAgrupamento == 'C') {
            //    nameGridPersistence = "gridResultadoCliente";
            //    if (incluirDevolucoes) {
            //        nameGridPersistence = "gridResultadoClienteDevolucoes";
            //    }
            //} else if (tipoAgrupamento == 'V') {
            //    nameGridPersistence = "gridResultadoVendedor";
            //    if (incluirDevolucoes) {
            //        nameGridPersistence = "gridResultadoVendedorDevolucoes";
            //    }
            //}

            var vlFaturamentoSomatoriaReposicaoLucro = 0;
            var vlCustoReposicaoSomatoriaLucro = 0;

            var vlFaturamentoSomatoriaReposicaoRentabilidade = 0;
            var vlCustoReposicaoSomatoriaRentabilidade = 0;

            var vlFaturamentoSomatoriaCustoMedioLucro = 0;
            var vlCustoMedioSomatoriaLucro = 0;

            var vlFaturamentoSomatoriaCustoMedioRentabilidade = 0;
            var vlCustoMedioSomatoriaRentabilidade = 0;

            var vlFaturamentoSomatoria = 0;
            var vlCustoReposicaoSomatoria = 0;
            var vlCustoMedioSomatoria = 0;

            var contadorColunas = 0;
            var qtdeColunasGrafico = 5;
            var labelUltimaColunaPlotada;

            const dataSourceGrafico = result.data.slice(0, 12);

            $('#chart').dxChart({
                dataSource: dataSourceGrafico,
                palette: 'Soft Blue',
                commonSeriesSettings: {
                    type: 'bar',
                    //color: '#ffaa66',
                    argumentField: 'DESCRICAO',
                    valueField: 'VL_TOTAL_VENDA',
                    ignoreEmptyPoints: true,
                },
                seriesTemplate: {
                    nameField: 'DESCRICAO',
                },
                legend: {
                    font: {
                        size: 10,
                    },
                },
                commonAxisSettings: {
                    label: {
                        font: {
                            size: 9,
                        },
                    },
                },
                tooltip: {
                    enabled: true,
                    location: 'edge',
                    customizeTooltip(arg) {
                        const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(arg.originalValue);
                        return {
                            html: `${arg.seriesName}<div class='currency'>Faturamento: ${valorFormatado}`,
                        };
                    },
                },
                size: {
                    height: 180,
                },
                adaptiveLayout: {
                    width: 450,
                },
                onInitialized: (e) => {
                    new IntersectionObserver(entries => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) e.component.refresh();
                        });
                    }).observe(e.element[0]);
                }
            });

            if (agruparFamiliaPai == true && tipoAgrupamento == 'F') {
                ExibirEsconderPaineis('divGridResultadoFamilia', 'block');
                ExibirEsconderPaineis('divPivotGridGrafico', 'block');

                ExibirEsconderPaineis('divGridResultado', 'none');
                ExibirEsconderPaineis('divGridGrafico', 'none');

                var qtdeColunasExtras = 0;
                qtdeColunasExtras = incluirComprasEstoque ? qtdeColunasExtras + 2 : qtdeColunasExtras;
                qtdeColunasExtras = incluirDevolucoes ? qtdeColunasExtras + 3 : qtdeColunasExtras;

                console.log('COLUNAS EXTRAS:', qtdeColunasExtras);

                var nivelMaximoFamilia = result.data[0].NR_MAXIMO_NIVEIS;

                var exibirFamiliaNivel0 = nivelMaximoFamilia >= 0 ? true : false;
                var exibirFamiliaNivel1 = nivelMaximoFamilia >= 1 ? true : false;
                var exibirFamiliaNivel2 = nivelMaximoFamilia >= 2 ? true : false;
                var exibirFamiliaNivel3 = nivelMaximoFamilia >= 3 ? true : false;
                var exibirFamiliaNivel4 = nivelMaximoFamilia >= 4 ? true : false;
                var exibirFamiliaNivel5 = nivelMaximoFamilia >= 5 ? true : false;
                var exibirFamiliaNivel6 = nivelMaximoFamilia >= 6 ? true : false;


                const pivotGridChart = $('#pivotgrid-chart').dxChart({
                    palette: 'Soft Blue',
                    legend: {
                        font: {
                            size: 10,
                        },
                    },
                    commonSeriesSettings: {
                        type: 'bar',
                    },
                    commonAxisSettings: {
                        label: {
                            font: {
                                size: 11,
                            },
                        },
                    },
                    tooltip: {
                        enabled: true,
                        customizeTooltip(arg) {
                            const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(arg.originalValue);
                            return {
                                html: `${arg.seriesName}<div class='currency'>Faturamento: ${valorFormatado}`,
                            };
                        },
                    },
                    size: {
                        height: 160,
                    },
                    adaptiveLayout: {
                        width: 450,
                    },
                    onDrawn(e) {
                        contadorColunas = 0;
                    },
                    onInitialized: (e) => {
                        //pivotGridChart = e.component;
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) e.component.refresh();
                            });
                        }).observe(e.element[0]);
                    }
                }).dxChart('instance');

                const pivotGrid = $(`#${nameGridFamilia}`).dxPivotGrid({
                    //rowHeaderLayout: 'tree',
                    allowSortingBySummary: true,
                    allowSorting: true,
                    allowExpandAll: true,
                    allowFiltering: true,
                    showBorders: true,
                    showColumnGrandTotals: false,
                    //showRowGrandTotals: true,
                    showRowTotals: true,
                    showColumnTotals: false,
                    //showTotalsPrior: 'row',
                    fieldChooser: {
                        enabled: true,
                        height: 400,
                    },
                    fieldPanel: {
                        visible: false,
                        allowSearch: true
                    },
                    export: {
                        enabled: true
                    },
                    dataSource: {
                        store: result.data,
                        retrieveFields: false,
                        fields: [
                            {
                                dataField: "CABECALHO",
                                caption: "Cabecalho",
                                visible: true,
                                cssClass: "column-data-grid",
                                area: 'column',
                            },
                            {
                                dataField: "DS_FAMILIA_NIVEL_0",
                                caption: "Família Nível 0",
                                width: 200,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: exibirFamiliaNivel0,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                area: 'row',
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                            },
                            {
                                dataField: "DS_FAMILIA_NIVEL_1",
                                caption: "Família Nível 1",
                                width: 200,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: exibirFamiliaNivel1,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                area: 'row',
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                            },
                            {
                                dataField: "DS_FAMILIA_NIVEL_2",
                                caption: "Família Nível 2",
                                //width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: exibirFamiliaNivel2,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                area: 'row',
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                            },
                            {
                                dataField: "DS_FAMILIA_NIVEL_3",
                                caption: "Família Nível 3",
                                //width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: exibirFamiliaNivel3,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                area: 'row',
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                            },
                            {
                                dataField: "DS_FAMILIA_NIVEL_4",
                                caption: "Família Nível 4",
                                //width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: exibirFamiliaNivel4,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                area: 'row',
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                            },
                            {
                                dataField: "DS_FAMILIA_NIVEL_5",
                                caption: "Família Nível 5",
                                //width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: exibirFamiliaNivel5,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                area: 'row',
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                            },
                            {
                                dataField: "DS_FAMILIA_NIVEL_6",
                                caption: "Família Nível 6",
                                //width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: exibirFamiliaNivel6,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                area: 'row',
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                            },
                            {
                                dataField: "DESCRICAO",
                                caption: "Descrição",
                                //width: 110,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: true,
                                alignment: 'left',
                                cssClass: "column-data-grid",
                            },
                            {
                                dataField: "QT_PEDIDA",
                                name: "QT_PEDIDA",
                                caption: "Quantidade",
                                dataType: 'number',
                                summaryType: 'sum',
                                format: "###,###,###,##0.###",
                                width: 70,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                area: 'data'
                            },
                            {
                                dataField: "VL_TOTAL_VENDA",
                                name: "VL_TOTAL_VENDA",
                                caption: "Faturamento",
                                dataType: 'number',
                                summaryType: 'sum',
                                format: "###,###,###,##0.00",
                                width: 80,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                alignment: 'right',
                                cssClass: "column-data-grid",
                                area: 'data'
                                //hidingPriority: 194,
                            },
                            {
                                dataField: "VL_TOTAL_CUSTO",
                                name: "VL_TOTAL_CUSTO",
                                caption: "Custo Total",
                                dataType: 'number',
                                summaryType: 'sum',
                                area: 'data',
                                format: "###,###,###,##0.00",
                                width: 80,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                alignment: 'right',
                                cssClass: "column-data-grid",
                                //hidingPriority: 194,
                            },
                            {
                                dataField: "VL_TOTAL_CUSTO_MEDIO",
                                name: "VL_TOTAL_CUSTO_MEDIO",
                                caption: labelTipoCusto,
                                dataType: 'number',
                                summaryType: 'sum',
                                area: 'data',
                                format: "###,###,###,##0.00",
                                width: 80,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                alignment: 'right',
                                cssClass: "column-data-grid",
                                //hidingPriority: 194,
                            },
                            {
                                dataField: "VL_TOTAL_COMPRAS",
                                name: "VL_TOTAL_COMPRAS",
                                caption: "Vl. Compras",
                                dataType: 'number',
                                summaryType: 'sum',
                                area: 'data',
                                format: "###,###,###,##0.00",
                                width: 80,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: exibirCompraEstoque,
                                alignment: 'right',
                                cssClass: "column-data-grid",
                                //hidingPriority: 194,
                            },
                            {
                                dataField: "VL_TOTAL_ESTOQUE",
                                name: "VL_TOTAL_ESTOQUE",
                                caption: "Vl. Estoque",
                                dataType: 'number',
                                summaryType: 'sum',
                                area: 'data',
                                format: "###,###,###,##0.00",
                                width: 80,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: exibirCompraEstoque,
                                alignment: 'right',
                                cssClass: "column-data-grid",
                                //hidingPriority: 194,
                            },
                            {
                                dataField: "PC_MARKUP",
                                name: "PC_MARKUP",
                                caption: "% Rentab.",
                                dataType: 'number',
                                summaryType: "avg",
                                area: 'data',
                                format: "###,###,###,##0.00%",
                                width: 70,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                calculateSummaryValue: function (e) {

                                    let result = "";
                                    let groupRowTotal = e.parent("row");

                                    //if (groupRowTotal) {
                                    let divident = e.value('VL_TOTAL_VENDA') - e.value('VL_TOTAL_CUSTO');
                                    let divisor = e.value('VL_TOTAL_VENDA');
                                    //let divisor = groupRowTotal.value('VL_TOTAL_VENDA');

                                    result = divident / divisor;
                                    //};

                                    return result;
                                },
                            },
                            {
                                dataField: "PC_LUCRO",
                                name: "PC_LUCRO",
                                caption: "% Lucro",
                                dataType: 'number',
                                summaryType: 'avg',
                                area: 'data',
                                format: "###,###,###,##0.00%",
                                width: 70,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                calculateSummaryValue: function (e) {

                                    let result = "";
                                    let groupRowTotal = e.parent("row");

                                    //if (groupRowTotal) {
                                    let divident = e.value('VL_TOTAL_VENDA') - e.value('VL_TOTAL_CUSTO');
                                    let divisor = e.value('VL_TOTAL_CUSTO');
                                    //let divisor = groupRowTotal.value('VL_TOTAL_VENDA');
                                    result = divident / divisor;
                                    //};

                                    return result;
                                },
                                allowCrossGroupCalculation: true,
                            },
                            {
                                dataField: "PC_MARKUP_CUSTO_MEDIO",
                                name: "PC_MARKUP_CUSTO_MEDIO",
                                caption: "% Rentab. " + labelTipoCusto,
                                dataType: 'number',
                                summaryType: 'avg',
                                //area: 'data',
                                format: "###,###,###,##0.00%",
                                width: 80,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                calculateSummaryValue: function (e) {

                                    let result = "";
                                    let groupRowTotal = e.parent("row");

                                    //if (groupRowTotal) {
                                    let divident = e.value('VL_TOTAL_VENDA') - e.value('VL_TOTAL_CUSTO_MEDIO');
                                    let divisor = e.value('VL_TOTAL_VENDA');
                                    //let divisor = groupRowTotal.value('VL_TOTAL_VENDA');
                                    result = divident / divisor;
                                    //};

                                    return result;
                                },
                                allowCrossGroupCalculation: true,
                            },
                            {
                                dataField: "PC_LUCRO_CUSTO_MEDIO",
                                name: "PC_LUCRO_CUSTO_MEDIO",
                                caption: "% Lucro " + labelTipoCusto,
                                dataType: 'number',
                                summaryType: 'avg',
                                //area: 'data',
                                format: "###,###,###,##0.00%",
                                width: 80,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                calculateSummaryValue: function (e) {

                                    let result = "";
                                    let groupRowTotal = e.parent("row");

                                    //if (groupRowTotal) {
                                    let divident = e.value('VL_TOTAL_VENDA') - e.value('VL_TOTAL_CUSTO_MEDIO');
                                    let divisor = e.value('VL_TOTAL_CUSTO_MEDIO');
                                    //let divisor = groupRowTotal.value('VL_TOTAL_VENDA');
                                    result = divident / divisor;
                                    //};

                                    return result;
                                },
                                allowCrossGroupCalculation: true,
                            },
                            {
                                dataField: "QT_DEVOLUCOES",
                                name: "QT_DEVOLUCOES",
                                caption: "Qt. Devoluções",
                                dataType: 'number',
                                summaryType: 'sum',
                                area: 'data',
                                format: "###,###,###,##0.####",
                                width: 80,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: incluirDevolucoes,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                //hidingPriority: 194,
                            },
                            {
                                dataField: "VL_DEVOLUCOES",
                                name: "VL_DEVOLUCOES",
                                caption: "Vl. Devoluções",
                                dataType: 'number',
                                summaryType: 'sum',
                                area: 'data',
                                format: "###,###,###,##0.00",
                                width: 80,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: incluirDevolucoes,
                                alignment: 'right',
                                cssClass: "column-data-grid",
                                //hidingPriority: 194,
                            },
                            {
                                dataField: "VL_FATURAMENTO_LIQUIDO",
                                name: "VL_FATURAMENTO_LIQUIDO",
                                caption: "Faturamento Líquido",
                                dataType: 'number',
                                summaryType: 'sum',
                                area: 'data',
                                format: "###,###,###,##0.00",
                                width: 80,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: incluirDevolucoes,
                                alignment: 'right',
                                cssClass: "column-data-grid",
                                //hidingPriority: 194,
                                calculateCellValue: function (rowData) {
                                    var resultado = rowData.VL_TOTAL_VENDA - rowData.VL_DEVOLUCOES;
                                    return resultado;
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
                    onExporting(e) {
                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Vendas');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';
                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 70;

                        worksheet.columns = [
                            { width: 30 }, { width: 50 }
                        ];

                        DevExpress.excelExporter.exportPivotGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: { row: 4, column: 1 },
                            keepColumnWidths: false,
                            exportRowFieldHeaders: false,
                            exportColumnFieldHeaders: false,
                            exportDataFieldHeaders: false,
                            exportFilterFieldHeaders: false,
                            customizeCell(options) {
                                const { excelCell } = options;
                                const { pivotCell } = options;

                                if (isDataCell(pivotCell) || isTotalCell(pivotCell)) {
                                    const appearance = getConditionalAppearance(pivotCell);
                                    Object.assign(excelCell, getExcelCellFormat(appearance));
                                }

                                const borderStyle = { style: 'thin', color: { argb: 'FF7E7E7E' } };
                                excelCell.border = {
                                    bottom: borderStyle,
                                    left: borderStyle,
                                    right: borderStyle,
                                    top: borderStyle,
                                };
                            },
                        }).then(async (cellRange) => {

                            //Logotipo
                            const headerRowLogo = worksheet.getRow(1);
                            const imagePath = result.data[0].DS_CAMINHO_LOGO;
                            const base64Image = await convertImageToBase64(imagePath + '?' + new Date());

                            //VERIFICA SE A IMAGEM FOI ENCONTRADA
                            if (base64Image.length > 25) {
                                const image = workbook.addImage({
                                    base64: base64Image,
                                    extension: 'gif',
                                });

                                // Get image dimensions
                                const img = new Image();
                                img.src = base64Image;
                                await img.decode();
                                const imgWidth = img.width;
                                const imgHeight = img.height;

                                // Calculate dimensions to fit the image within a specific cell range
                                const maxWidth = 200; // maximum width in pixels
                                const maxHeight = 60; // maximum height in pixels
                                const scaleFactor = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
                                const width = imgWidth * scaleFactor;
                                const height = imgHeight * scaleFactor;

                                headerRowLogo.height = 50;
                                worksheet.mergeCells(1, 1, 2, 1);

                                worksheet.addImage(image, {
                                    //tl: { col: 0, row: 0 },
                                    //br: { col: 2, row: 1 },

                                    tl: { col: 0, row: 0 },
                                    ext: { width: width, height: height }
                                });
                            }

                            // Header
                            const headerRow = worksheet.getRow(1);
                            headerRow.height = 30;

                            const columnFromIndex = worksheet.views[0].xSplit + 1;
                            const columnToIndex = columnFromIndex + 5 + qtdeColunasExtras;
                            worksheet.mergeCells(1, columnFromIndex, 1, columnToIndex);

                            const headerCell = headerRow.getCell(columnFromIndex);
                            headerCell.value = $('#labelTitulo').text();
                            headerCell.font = { name: 'Segoe UI Light', size: 22, bold: true };
                            headerCell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, columnFromIndex, 2, columnToIndex);

                            const headerSubTituloCell = headerRowSubTitulo.getCell(columnFromIndex);
                            headerSubTituloCell.value = labelFiltros;
                            headerSubTituloCell.font = { name: 'Segoe UI Light', size: 12, bold: false };
                            headerSubTituloCell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };

                            // Footer
                            const footerRowIndex = cellRange.to.row + 2;
                            const footerCell = worksheet.getRow(footerRowIndex).getCell(cellRange.to.column);
                            footerCell.value = new Date();
                            footerCell.font = { color: { argb: 'BFBFBF' }, italic: true };
                            footerCell.alignment = { horizontal: 'right' };
                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Rel_Rentabilidade_Total.xlsx');
                            });
                        });
                        e.cancel = true;
                    },

                }).dxPivotGrid('instance');;

                pivotGrid.bindChart(pivotGridChart, {
                    dataFieldsDisplayMode: 'splitPanes',
                    alternateDataFields: false,
                    customizeChart: function (chartOptions) {
                        //Configura apenas o gráfico do primeiro valor para ser visualizado.
                        chartOptions.panes = chartOptions.panes[1];
                    },

                });

                function isDataCell(cell) {
                    return (cell.area === 'data' && cell.rowType === 'D' && cell.columnType === 'D');
                }
                function isTotalCell(cell) {
                    return (cell.type === 'T' || cell.type === 'GT' || cell.rowType === 'T' || cell.rowType === 'GT' || cell.columnType === 'T' || cell.columnType === 'GT');
                }
                function getConditionalAppearance(cell) {
                    if (isTotalCell(cell)) {
                        return { fill: 'F2F2F2', font: '3F3F3F', bold: true };
                    }
                    //if (cell.value < 20000) {
                    //    return { font: '9C0006', fill: 'FFC7CE' };
                    //}
                    //if (cell.value > 50000) {
                    //    return { font: '006100', fill: 'C6EFCE' };
                    //}
                    return { font: '3F3F3F', fill: 'FFFFFF' };
                }
                function getExcelCellFormat(appearance) {
                    return {
                        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: appearance.fill } },
                        font: { color: { argb: appearance.font }, bold: appearance.bold },
                    };
                }

            } else {
                ExibirEsconderPaineis('divGridResultado', 'block');
                ExibirEsconderPaineis('divGridGrafico', 'block');

                ExibirEsconderPaineis('divGridResultadoFamilia', 'none');
                ExibirEsconderPaineis('divPivotGridGrafico', 'none');

                $(`#${nameGrid}`).dxDataGrid({
                    dataSource: result.data,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    stateStoring: AutoLoad(nameGrid),
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
                    groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                    paging: { pageSize: 15 },
                    pager: {
                        visible: true,
                        allowedPageSizes: [10, 15, 20, 50],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },

                    export: {
                        enabled: true,
                        allowExportSelectedData: false,
                    },

                    onExporting(e) {

                        var dataGrid = $(`#${nameGrid}`).dxDataGrid("instance");

                        //var colunasVisiveis = $(`#${nameGrid}`).dxDataGrid("instance").getVisibleColumns();
                        var colunasVisiveis = dataGrid.getVisibleColumns();
                        var groupedColumns = [];

                        //IDENTIFICA A QUANTIDADE DE COLUNAS AGRUPADAS DO GRID PARA UTILIZAR NO MERGE DOS TÍTULOS
                        var colCount = 0, colNames = [];
                        for (i = 0; i < dataGrid.columnCount(); i++) {
                            if (dataGrid.columnOption(i, "groupIndex") >= 0) {
                                colCount++;
                                colNames.push(dataGrid.columnOption(i, "dataField"));
                            }
                        }
                        var quantidadeColunasAgrupadas = colCount;

                        console.log('grouped columns count: ' + colCount);
                        console.log(colNames);

                        var quantidadeColunasVisiveis = colunasVisiveis.length - quantidadeColunasAgrupadas - 1;
                        var tituloAgrupamento = null;

                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Rentabilidade');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';

                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 59;

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: { row: 4, column: 1 },
                            autoFilterEnabled: true,
                            customizeCell: async (options) => {
                                const { gridCell } = options;
                                const { excelCell } = options;

                                //VERIFICA SE EXISTE AGRUPAMENTO NO GRID PARA DAR UM MERGE NAS COLUNAS
                                if (gridCell.rowType === 'group') {

                                    try {
                                        worksheet.mergeCells(excelCell.row, 1, excelCell.row, quantidadeColunasVisiveis);
                                    } catch {
                                        console.log("MERGE DE COLUNAS: Este erro é esperado");
                                    }

                                    if (gridCell.value !== undefined && gridCell.value !== null) {
                                        tituloAgrupamento = gridCell.value;
                                    }
                                }

                                //SET OS VALORES DOS TÍTULOS DOS AGRUPAMENTOS APÓS O MERGE DAS COLUNAS
                                if (gridCell.rowType === 'group') {
                                    const groupRowTitulo = worksheet.getRow(excelCell.row);

                                    groupRowTitulo.getCell(1).value = tituloAgrupamento;
                                }

                                if (gridCell.rowType === 'data') {
                                    if (gridCell.column.dataField === 'DS_URL_FOTO') {
                                        excelCell.value = undefined;

                                        const base64Image = await convertImageToBase64(gridCell.value + '?' + new Date());

                                        //VERIFICA SE A IMAGEM FOI ENCONTRADA
                                        if (base64Image.length > 25) {
                                            const image = workbook.addImage({
                                                base64: base64Image,
                                                extension: 'jpg',
                                            });

                                            worksheet.getRow(excelCell.row).height = 60;
                                            worksheet.addImage(image, {
                                                tl: { col: excelCell.col - 1, row: excelCell.row - 1 },
                                                br: { col: excelCell.col, row: excelCell.row },
                                            });
                                        }

                                    }
                                }

                            },
                        }).then(async (cellRange) => {

                            //Logotipo
                            const headerRowLogo = worksheet.getRow(1);

                            const imagePath = result.data[0].DS_CAMINHO_LOGO;
                            //const imagePath = '/img/logos/RSlogo_180.gif';

                            const base64Image = await convertImageToBase64(imagePath + '?' + new Date());

                            console.log('ARQUIVO EM BASE 64: ', base64Image);

                            //VERIFICA SE A IMAGEM FOI ENCONTRADA
                            if (base64Image.length > 25) {
                                const image = workbook.addImage({
                                    base64: base64Image,
                                    extension: 'gif',
                                });

                                // Get image dimensions
                                const img = new Image();
                                img.src = base64Image;
                                await img.decode();
                                const imgWidth = img.width;
                                const imgHeight = img.height;

                                // Calculate dimensions to fit the image within a specific cell range
                                const maxWidth = 200; // maximum width in pixels
                                const maxHeight = 60; // maximum height in pixels
                                const scaleFactor = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
                                const width = imgWidth * scaleFactor;
                                const height = imgHeight * scaleFactor;

                                headerRowLogo.height = 50;
                                worksheet.mergeCells(1, 1, 2, 2);

                                worksheet.addImage(image, {
                                    //tl: { col: 0, row: 0 },
                                    //br: { col: 2, row: 1 },

                                    tl: { col: 0, row: 0 },
                                    ext: { width: width, height: height }
                                });
                            }

                            //Título
                            const headerRowTitulo = worksheet.getRow(1);
                            headerRowTitulo.height = 30;
                            worksheet.mergeCells(1, 3, 1, quantidadeColunasVisiveis);

                            headerRowTitulo.getCell(3).value = labelTitulo;
                            headerRowTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 22 };
                            headerRowTitulo.getCell(3).alignment = { horizontal: 'center' };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, 3, 2, quantidadeColunasVisiveis);

                            headerRowSubTitulo.getCell(3).value = labelFiltros;
                            headerRowSubTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 12 };
                            headerRowSubTitulo.getCell(3).alignment = { horizontal: 'center' };

                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'RelRentabilidade.xlsx');
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
                    keyExpr: ['CODIGO'],
                    columns: [
                        {
                            dataField: "CODIGO",
                            caption: "Código",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 194,
                        },
                        {
                            dataField: "CD_FABRICANTE",
                            name: "CD_FABRICANTE",
                            caption: "Fabric.",
                            width: 80,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            //visible: exibirCodigoFabricante,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 194,
                        },
                        {
                            dataField: "DESCRICAO",
                            caption: "Descrição",
                            //width: 110,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            visible: true,
                            alignment: 'left',
                            cssClass: "column-data-grid",
                            //hidingPriority: 194,
                        },
                        {
                            dataField: "QT_PEDIDA",
                            name: "QT_PEDIDA",
                            caption: "Quantidade Vendida",
                            format: "###,###,###,##0.###",
                            width: 70,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 194,
                        },
                        {
                            dataField: "VL_TOTAL_VENDA",
                            name: "VL_TOTAL_VENDA",
                            caption: "Faturamento",
                            format: "###,###,###,##0.00",
                            width: 80,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            //hidingPriority: 194,
                        },
                        {
                            dataField: "VL_TOTAL_CUSTO",
                            name: "VL_TOTAL_CUSTO",
                            caption: "Custo Total",
                            format: "###,###,###,##0.00",
                            width: 80,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            //hidingPriority: 194,
                        },
                        {
                            dataField: "VL_TOTAL_CUSTO_MEDIO",
                            name: "VL_TOTAL_CUSTO_MEDIO",
                            caption: 'Vl. Custo Médio',
                            format: "###,###,###,##0.00",
                            width: 80,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            //hidingPriority: 194,
                        },
                        {
                            dataField: "VL_TOTAL_CUSTO_BRUTO",
                            name: "VL_TOTAL_CUSTO_BRUTO",
                            caption: 'Vl. Custo Bruto',
                            format: "###,###,###,##0.00",
                            width: 80,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            //hidingPriority: 194,
                        },
                        {
                            dataField: "QT_COMPRADA",
                            name: "QT_COMPRADA",
                            caption: "Quantidade Comprada",
                            format: "###,###,###,##0.###",
                            width: 70,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 194,
                        },
                        {
                            dataField: "VL_TOTAL_COMPRAS",
                            name: "VL_TOTAL_COMPRAS",
                            caption: "Vl. Compras",
                            format: "###,###,###,##0.00",
                            width: 80,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            //visible: exibirCompraEstoque,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            //hidingPriority: 194,
                        },
                        {
                            dataField: "QT_ESTOQUE",
                            name: "QT_ESTOQUE",
                            caption: "Quantidade Estoque",
                            format: "###,###,###,##0.###",
                            width: 70,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 194,
                        },
                        {
                            dataField: "VL_TOTAL_ESTOQUE",
                            name: "VL_TOTAL_ESTOQUE",
                            caption: "Vl. Estoque",
                            format: "###,###,###,##0.00",
                            width: 80,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            //hidingPriority: 194,
                        },
                        {
                            dataField: "VL_RENTABILIDADE",
                            caption: "Vl. Rentab.",
                            format: "###,###,###,##0.00",
                            width: 80,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            //hidingPriority: 194,
                        },
                        {
                            dataField: "VL_RENTABILIDADE_CUSTO_MEDIO",
                            caption: "Vl. Rentab. Custo Médio",
                            format: "###,###,###,##0.00",
                            width: 80,
                            allowEditing: false,
                            allowSorting: true,
                            visible: false,
                            allowHeaderFiltering: false,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            //hidingPriority: 194,
                        },
                        {
                            dataField: "VL_RENTABILIDADE_CUSTO_BRUTO",
                            caption: "Vl. Rentab. Custo Bruto",
                            format: "###,###,###,##0.00",
                            width: 80,
                            allowEditing: false,
                            allowSorting: true,
                            visible: false,
                            allowHeaderFiltering: false,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            //hidingPriority: 194,
                        },
                        {
                            dataField: "PC_MARKUP",
                            name: "PC_MARKUP",
                            caption: "% Rentab.",
                            format: "###,###,###,##0.00%",
                            width: 70,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            calculateCellValue: function (rowData) {
                                if (rowData.VL_TOTAL_VENDA > 0) {
                                    var resultado = rowData.VL_TOTAL_VENDA - rowData.VL_TOTAL_CUSTO;
                                    var rentabilidade = resultado / rowData.VL_TOTAL_VENDA;
                                } else {
                                    var rentabilidade = 0;
                                }
                                return rentabilidade;
                            },
                        },
                        {
                            dataField: "PC_LUCRO",
                            name: "PC_LUCRO",
                            caption: "% Lucro",
                            format: "###,###,###,##0.00%",
                            width: 70,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            calculateCellValue: function (rowData) {
                                if (rowData.VL_TOTAL_VENDA > 0) {
                                    var resultado = rowData.VL_TOTAL_VENDA - rowData.VL_TOTAL_CUSTO;
                                    var lucro = resultado / rowData.VL_TOTAL_CUSTO;
                                } else {
                                    var lucro = 0;
                                }
                                return lucro;
                            },
                        },
                        {
                            dataField: "PC_MARKUP_CUSTO_MEDIO",
                            name: "PC_MARKUP_CUSTO_MEDIO",
                            caption: "% Rentab. Custo Médio",
                            format: "###,###,###,##0.00%",
                            width: 80,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: false,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            calculateCellValue: function (rowData) {
                                if (rowData.VL_TOTAL_VENDA > 0) {
                                    var resultado = rowData.VL_TOTAL_VENDA - rowData.VL_TOTAL_CUSTO_MEDIO;
                                    var rentabilidade = resultado / rowData.VL_TOTAL_VENDA;
                                } else {
                                    var rentabilidade = 0;
                                }
                                return rentabilidade;
                            },
                        },
                        {
                            dataField: "PC_LUCRO_CUSTO_MEDIO",
                            name: "PC_LUCRO_CUSTO_MEDIO",
                            caption: "% Lucro Custo Médio",
                            format: "###,###,###,##0.00%",
                            width: 80,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: false,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            calculateCellValue: function (rowData) {
                                if (rowData.VL_TOTAL_VENDA > 0) {
                                    var resultado = rowData.VL_TOTAL_VENDA - rowData.VL_TOTAL_CUSTO_MEDIO;
                                    var lucro = resultado / rowData.VL_TOTAL_CUSTO_MEDIO;
                                } else {
                                    var lucro = 0;
                                }
                                return lucro;
                            },
                        },
                        {
                            dataField: "PC_MARKUP_CUSTO_BRUTO",
                            name: "PC_MARKUP_CUSTO_BRUTO",
                            caption: "% Rentab. Custo Bruto",
                            format: "###,###,###,##0.00%",
                            width: 80,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: false,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            calculateCellValue: function (rowData) {
                                if (rowData.VL_TOTAL_VENDA > 0) {
                                    var resultado = rowData.VL_TOTAL_VENDA - rowData.VL_TOTAL_CUSTO_BRUTO;
                                    var rentabilidade = resultado / rowData.VL_TOTAL_VENDA;
                                } else {
                                    var rentabilidade = 0;
                                }
                                return rentabilidade;
                            },
                        },
                        {
                            dataField: "PC_LUCRO_CUSTO_BRUTO",
                            name: "PC_LUCRO_CUSTO_BRUTO",
                            caption: "% Lucro Custo Bruto",
                            format: "###,###,###,##0.00%",
                            width: 80,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: false,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            calculateCellValue: function (rowData) {
                                if (rowData.VL_TOTAL_VENDA > 0) {
                                    var resultado = rowData.VL_TOTAL_VENDA - rowData.VL_TOTAL_CUSTO_BRUTO;
                                    var lucro = resultado / rowData.VL_TOTAL_CUSTO_BRUTO;
                                } else {
                                    var lucro = 0;
                                }
                                return lucro;
                            },
                        },
                        {
                            dataField: "QT_DEVOLUCOES",
                            name: "QT_DEVOLUCOES",
                            caption: "Qt. Devoluções",
                            format: "###,###,###,##0.####",
                            width: 80,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            //visible: incluirDevolucoes,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 194,
                        },
                        {
                            dataField: "VL_DEVOLUCOES",
                            name: "VL_DEVOLUCOES",
                            caption: "Vl. Devoluções",
                            format: "###,###,###,##0.00",
                            width: 80,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            //visible: incluirDevolucoes,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            //hidingPriority: 194,
                        },
                        {
                            dataField: "VL_FATURAMENTO_LIQUIDO",
                            name: "VL_FATURAMENTO_LIQUIDO",
                            caption: "Faturamento Líquido",
                            format: "###,###,###,##0.00",
                            width: 80,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            //visible: incluirDevolucoes,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            //hidingPriority: 194,
                            calculateCellValue: function (rowData) {
                                var resultado = rowData.VL_TOTAL_VENDA - rowData.VL_DEVOLUCOES;
                                return resultado;
                            },

                        },
                    ],

                    summary: {
                        groupItems: [
                            {
                                column: "QT_PEDIDA",
                                name: 'FATURAMENTO',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.#",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "VL_TOTAL_VENDA",
                                name: 'CUSTO_REPOSICAO',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "VL_TOTAL_CUSTO",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "VL_TOTAL_CUSTO_MEDIO",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "VL_TOTAL_CUSTO_BRUTO",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "QT_COMPRADA",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "VL_TOTAL_COMPRAS",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "VL_RENTABILIDADE",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "VL_RENTABILIDADE_CUSTO_MEDIO",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "VL_RENTABILIDADE_CUSTO_BRUTO",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                showInColumn: 'PC_MARKUP',
                                name: 'PC_MARKUP_AGRUPADO',
                                summaryType: 'custom',
                                valueFormat: "###,###,###,##0.00%",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                showInColumn: 'PC_LUCRO',
                                name: 'PC_LUCRO_AGRUPADO',
                                summaryType: 'custom',
                                valueFormat: "###,###,###,##0.00%",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                showInColumn: 'PC_MARKUP_CUSTO_MEDIO',
                                name: 'PC_MARKUP_CUSTO_MEDIO_AGRUPADO',
                                summaryType: 'custom',
                                valueFormat: "###,###,###,##0.00%",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                showInColumn: 'PC_LUCRO_CUSTO_MEDIO',
                                name: 'PC_LUCRO_CUSTO_MEDIO_AGRUPADO',
                                summaryType: 'custom',
                                valueFormat: "###,###,###,##0.00%",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                showInColumn: 'PC_MARKUP_CUSTO_BRUTO',
                                name: 'PC_MARKUP_CUSTO_BRUTO_AGRUPADO',
                                summaryType: 'custom',
                                valueFormat: "###,###,###,##0.00%",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                showInColumn: 'PC_LUCRO_CUSTO_BRUTO',
                                name: 'PC_LUCRO_CUSTO_BRUTO_AGRUPADO',
                                summaryType: 'custom',
                                valueFormat: "###,###,###,##0.00%",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "QT_ESTOQUE",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "VL_TOTAL_ESTOQUE",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "QT_DEVOLUCOES",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "VL_DEVOLUCOES",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "VL_FATURAMENTO_LIQUIDO",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                        ],
                        totalItems: [
                            {
                                column: "QT_PEDIDA",
                                name: 'FATURAMENTO',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.#",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "VL_TOTAL_VENDA",
                                name: 'CUSTO_REPOSICAO',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "VL_TOTAL_CUSTO",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "VL_TOTAL_CUSTO_MEDIO",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "VL_TOTAL_CUSTO_BRUTO",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "QT_COMPRADA",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.##",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "VL_TOTAL_COMPRAS",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "VL_RENTABILIDADE",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "VL_RENTABILIDADE_CUSTO_MEDIO",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "VL_RENTABILIDADE_CUSTO_BRUTO",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                showInColumn: 'PC_MARKUP',
                                name: 'PC_MARKUP_AGRUPADO',
                                summaryType: 'custom',
                                valueFormat: "###,###,###,##0.00%",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                showInColumn: 'PC_LUCRO',
                                name: 'PC_LUCRO_AGRUPADO',
                                summaryType: 'custom',
                                valueFormat: "###,###,###,##0.00%",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                showInColumn: 'PC_MARKUP_CUSTO_MEDIO',
                                name: 'PC_MARKUP_CUSTO_MEDIO_AGRUPADO',
                                summaryType: 'custom',
                                valueFormat: "###,###,###,##0.00%",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                showInColumn: 'PC_LUCRO_CUSTO_MEDIO',
                                name: 'PC_LUCRO_CUSTO_MEDIO_AGRUPADO',
                                summaryType: 'custom',
                                valueFormat: "###,###,###,##0.00%",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                showInColumn: 'PC_MARKUP_CUSTO_BRUTO',
                                name: 'PC_MARKUP_CUSTO_BRUTO_AGRUPADO',
                                summaryType: 'custom',
                                valueFormat: "###,###,###,##0.00%",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                showInColumn: 'PC_LUCRO_CUSTO_BRUTO',
                                name: 'PC_LUCRO_CUSTO_BRUTO_AGRUPADO',
                                summaryType: 'custom',
                                valueFormat: "###,###,###,##0.00%",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "QT_ESTOQUE",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.##",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "VL_TOTAL_ESTOQUE",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "QT_DEVOLUCOES",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "VL_DEVOLUCOES",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: "VL_FATURAMENTO_LIQUIDO",
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                        ],

                        calculateCustomSummary: function (options) {

                            if (options.name == 'PC_LUCRO_AGRUPADO') {

                                if (options.summaryProcess === 'start') {

                                    vlFaturamentoSomatoriaLucro = 0;
                                    vlCustoReposicaoSomatoriaLucro = 0;
                                }
                                if (options.summaryProcess === 'calculate') {

                                    vlFaturamentoSomatoriaLucro += options.value.VL_TOTAL_VENDA;
                                    vlCustoReposicaoSomatoriaLucro += options.value.VL_TOTAL_CUSTO;
                                }
                                if (options.summaryProcess === 'finalize') {
                                    if (vlFaturamentoSomatoriaLucro > 0) {
                                        var result = (vlFaturamentoSomatoriaLucro - vlCustoReposicaoSomatoriaLucro) / vlCustoReposicaoSomatoriaLucro
                                    } else {
                                        var result = 0
                                    }
                                    options.totalValue = result;

                                }
                            } else if (options.name == 'PC_MARKUP_AGRUPADO') {

                                if (options.summaryProcess === 'start') {

                                    vlFaturamentoSomatoriaRentabilidade = 0;
                                    vlCustoReposicaoSomatoriaRentabilidade = 0;
                                }
                                if (options.summaryProcess === 'calculate') {

                                    vlFaturamentoSomatoriaRentabilidade += options.value.VL_TOTAL_VENDA;
                                    vlCustoReposicaoSomatoriaRentabilidade += options.value.VL_TOTAL_CUSTO;
                                }
                                if (options.summaryProcess === 'finalize') {
                                    if (vlFaturamentoSomatoriaRentabilidade > 0) {
                                        var result = (vlFaturamentoSomatoriaRentabilidade - vlCustoReposicaoSomatoriaRentabilidade) / vlFaturamentoSomatoriaRentabilidade
                                    } else {
                                        var result = 0
                                    }
                                    options.totalValue = result;

                                }
                            } else if (options.name == 'PC_LUCRO_CUSTO_MEDIO_AGRUPADO') {

                                if (options.summaryProcess === 'start') {

                                    vlFaturamentoSomatoriaLucroCustoMedio = 0;
                                    vlCustoMedioSomatoriaLucro = 0;
                                }
                                if (options.summaryProcess === 'calculate') {

                                    vlFaturamentoSomatoriaLucroCustoMedio += options.value.VL_TOTAL_VENDA;
                                    vlCustoMedioSomatoriaLucro += options.value.VL_TOTAL_CUSTO_MEDIO;
                                }
                                if (options.summaryProcess === 'finalize') {
                                    if (vlFaturamentoSomatoriaLucroCustoMedio > 0) {
                                        var result = (vlFaturamentoSomatoriaLucroCustoMedio - vlCustoMedioSomatoriaLucro) / vlCustoMedioSomatoriaLucro
                                    } else {
                                        var result = 0
                                    }
                                    options.totalValue = result;

                                }
                            } else if (options.name == 'PC_MARKUP_CUSTO_MEDIO_AGRUPADO') {

                                if (options.summaryProcess === 'start') {

                                    vlFaturamentoSomatoriaRentabilidadeCustoMedio = 0;
                                    vlCustoMedioSomatoriaRentabilidade = 0;
                                }
                                if (options.summaryProcess === 'calculate') {

                                    vlFaturamentoSomatoriaRentabilidadeCustoMedio += options.value.VL_TOTAL_VENDA;
                                    vlCustoMedioSomatoriaRentabilidade += options.value.VL_TOTAL_CUSTO_MEDIO;
                                }
                                if (options.summaryProcess === 'finalize') {
                                    if (vlFaturamentoSomatoriaRentabilidadeCustoMedio > 0) {
                                        var result = (vlFaturamentoSomatoriaRentabilidadeCustoMedio - vlCustoMedioSomatoriaRentabilidade) / vlFaturamentoSomatoriaRentabilidadeCustoMedio
                                    } else {
                                        var result = 0
                                    }
                                    options.totalValue = result;

                                }
                            } else if (options.name == 'PC_LUCRO_CUSTO_BRUTO_AGRUPADO') {

                                if (options.summaryProcess === 'start') {

                                    vlFaturamentoSomatoriaLucroCustoBruto = 0;
                                    vlCustoBrutoSomatoriaLucro = 0;
                                }
                                if (options.summaryProcess === 'calculate') {

                                    vlFaturamentoSomatoriaLucroCustoBruto += options.value.VL_TOTAL_VENDA;
                                    vlCustoBrutoSomatoriaLucro += options.value.VL_TOTAL_CUSTO_BRUTO;
                                }
                                if (options.summaryProcess === 'finalize') {
                                    if (vlFaturamentoSomatoriaLucroCustoBruto > 0) {
                                        var result = (vlFaturamentoSomatoriaLucroCustoBruto - vlCustoBrutoSomatoriaLucro) / vlCustoBrutoSomatoriaLucro
                                    } else {
                                        var result = 0
                                    }
                                    options.totalValue = result;

                                }
                            } else if (options.name == 'PC_MARKUP_CUSTO_BRUTO_AGRUPADO') {

                                if (options.summaryProcess === 'start') {

                                    vlFaturamentoSomatoriaRentabilidadeCustoBruto = 0;
                                    vlCustoBrutoSomatoriaRentabilidade = 0;
                                }
                                if (options.summaryProcess === 'calculate') {

                                    vlFaturamentoSomatoriaRentabilidadeCustoBruto += options.value.VL_TOTAL_VENDA;
                                    vlCustoBrutoSomatoriaRentabilidade += options.value.VL_TOTAL_CUSTO_BRUTO;
                                }
                                if (options.summaryProcess === 'finalize') {
                                    if (vlFaturamentoSomatoriaRentabilidadeCustoBruto > 0) {
                                        var result = (vlFaturamentoSomatoriaRentabilidadeCustoBruto - vlCustoBrutoSomatoriaRentabilidade) / vlFaturamentoSomatoriaRentabilidadeCustoBruto
                                    } else {
                                        var result = 0
                                    }
                                    options.totalValue = result;

                                }
                            }
                        },
                    },

                    toolbar: {
                        items: [
                            {
                                location: 'after',
                                widget: 'dxButton',
                                locateInMenu: 'auto',
                                options: {
                                    icon: 'fa fa-filter',
                                    text: 'Filtros',
                                    hint: 'Exibir o painel de filtros',
                                    type: 'default',
                                    onClick() {
                                        exibirFiltros();
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
                                        const dataGrid = $("#gridResultado").dxDataGrid('instance');

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

                    onToolbarPreparing: AutoResetState([{
                        location: "after",
                        widget: "dxButton",
                        locateInMenu: "auto",
                        showText: 'inMenu',
                        options: {
                            hint: "Diminuir tamanho da fonte",
                            icon: "/img/FontSizeDiminuir.svg",
                            text: "Diminuir Fonte",
                            onClick: function () {
                                var size = $(`#${nameGrid}`).css('font-size').split('px')[0];
                                $(`#${nameGrid}`).css('font-size', --size + 'px')
                            }
                        }
                    },
                    {
                        location: "after",
                        widget: "dxButton",
                        locateInMenu: "auto",
                        showText: 'inMenu',
                        options: {
                            hint: "Aumentar tamanho da fonte",
                            icon: "/img/FontSizeAumentar.svg",
                            text: "Aumentar Fonte",
                            onClick: function () {
                                var size = $(`#${nameGrid}`).css('font-size').split('px')[0];
                                $(`#${nameGrid}`).css('font-size', ++size + 'px')
                            }
                        }
                    }

                    ]),

                    onCellPrepared: function (e) {

                        //if (e.rowType === "header") {
                        //    if (e.column.dataField === "GRP_CUSTO_REPOSICAO" || e.column.dataField === "GRP_CUSTO_MEDIO"
                        //        || e.column.dataField === "GRP_DEVOLUCOES" || e.column.dataField === "GRP_MEDIAS" ||
                        //        e.column.dataField === "GRP_PROJECOES") {
                        //        e.cellElement.css("color", "#f05b41");
                        //        e.cellElement.css("font-weight", "bold");
                        //        e.cellElement.css("background-color", "#f8f9fa");

                        //    }
                        //}

                        if (e.rowType === "group") {
                            //e.cellElement.css("color", "#f05b41");
                            //e.cellElement.css("color", "#f4a261");
                            e.cellElement.css("color", "#e76f51");
                            e.cellElement.css("background-color", "white");
                        }

                        if (e.rowType === "data") {
                            if (e.value < 0) {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
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

                });
            }

            //Verica se é necessário excluir alguma coluna do relatório
            var dataGridRemoveColumn = $(`#${nameGrid}`).dxDataGrid('instance');

            var columns = dataGridRemoveColumn.option("columns");

            var nomeDaColuna = '';
            var indiceDaColuna = -1;

            console.log("TIPO CUSTO", paramTipoCusto);

            if (paramTipoCusto == 'CM') {
                nomeDaColuna = 'VL_TOTAL_CUSTO_BRUTO';
                indiceDaColuna = -1;

                for (var i = 0; i < columns.length; i++) {
                    if (columns[i].dataField === nomeDaColuna) {
                        indiceDaColuna = i;
                        break; // Parando o loop assim que encontrar a coluna
                    }
                }

                if (indiceDaColuna !== -1) {
                    columns.splice(indiceDaColuna, 1);
                    dataGridRemoveColumn.option("columns", columns);
                    dataGridRemoveColumn.refresh();
                }

                nomeDaColuna = 'VL_RENTABILIDADE_CUSTO_BRUTO';
                indiceDaColuna = -1;

                for (var i = 0; i < columns.length; i++) {
                    if (columns[i].dataField === nomeDaColuna) {
                        indiceDaColuna = i;
                        break; // Parando o loop assim que encontrar a coluna
                    }
                }

                if (indiceDaColuna !== -1) {
                    columns.splice(indiceDaColuna, 1);
                    dataGridRemoveColumn.option("columns", columns);
                    dataGridRemoveColumn.refresh();
                }

                nomeDaColuna = 'PC_MARKUP_CUSTO_BRUTO';
                indiceDaColuna = -1;

                for (var i = 0; i < columns.length; i++) {
                    if (columns[i].dataField === nomeDaColuna) {
                        indiceDaColuna = i;
                        break; // Parando o loop assim que encontrar a coluna
                    }
                }

                if (indiceDaColuna !== -1) {
                    columns.splice(indiceDaColuna, 1);
                    dataGridRemoveColumn.option("columns", columns);
                    dataGridRemoveColumn.refresh();
                }

                nomeDaColuna = 'PC_LUCRO_CUSTO_BRUTO';
                indiceDaColuna = -1;

                for (var i = 0; i < columns.length; i++) {
                    if (columns[i].dataField === nomeDaColuna) {
                        indiceDaColuna = i;
                        break; // Parando o loop assim que encontrar a coluna
                    }
                }

                if (indiceDaColuna !== -1) {
                    columns.splice(indiceDaColuna, 1);
                    dataGridRemoveColumn.option("columns", columns);
                    dataGridRemoveColumn.refresh();
                }
            } else {
                nomeDaColuna = 'VL_TOTAL_CUSTO_MEDIO';
                indiceDaColuna = -1;

                for (var i = 0; i < columns.length; i++) {
                    if (columns[i].dataField === nomeDaColuna) {
                        indiceDaColuna = i;
                        break; // Parando o loop assim que encontrar a coluna
                    }
                }

                if (indiceDaColuna !== -1) {
                    columns.splice(indiceDaColuna, 1);
                    dataGridRemoveColumn.option("columns", columns);
                    dataGridRemoveColumn.refresh();
                }

                nomeDaColuna = 'VL_RENTABILIDADE_CUSTO_MEDIO';
                indiceDaColuna = -1;

                for (var i = 0; i < columns.length; i++) {
                    if (columns[i].dataField === nomeDaColuna) {
                        indiceDaColuna = i;
                        break; // Parando o loop assim que encontrar a coluna
                    }
                }

                if (indiceDaColuna !== -1) {
                    columns.splice(indiceDaColuna, 1);
                    dataGridRemoveColumn.option("columns", columns);
                    dataGridRemoveColumn.refresh();
                }

                nomeDaColuna = 'PC_MARKUP_CUSTO_MEDIO';
                indiceDaColuna = -1;

                for (var i = 0; i < columns.length; i++) {
                    if (columns[i].dataField === nomeDaColuna) {
                        indiceDaColuna = i;
                        break; // Parando o loop assim que encontrar a coluna
                    }
                }

                if (indiceDaColuna !== -1) {
                    columns.splice(indiceDaColuna, 1);
                    dataGridRemoveColumn.option("columns", columns);
                    dataGridRemoveColumn.refresh();
                }

                nomeDaColuna = 'PC_LUCRO_CUSTO_MEDIO';
                indiceDaColuna = -1;

                for (var i = 0; i < columns.length; i++) {
                    if (columns[i].dataField === nomeDaColuna) {
                        indiceDaColuna = i;
                        break; // Parando o loop assim que encontrar a coluna
                    }
                }

                if (indiceDaColuna !== -1) {
                    columns.splice(indiceDaColuna, 1);
                    dataGridRemoveColumn.option("columns", columns);
                    dataGridRemoveColumn.refresh();
                }
            }


            if (exibirCodigoFabricante == false) {
                nomeDaColuna = 'CD_FABRICANTE';
                indiceDaColuna = -1;

                for (var i = 0; i < columns.length; i++) {
                    if (columns[i].dataField === nomeDaColuna) {
                        indiceDaColuna = i;
                        break; // Parando o loop assim que encontrar a coluna
                    }
                }

                if (indiceDaColuna !== -1) {
                    columns.splice(indiceDaColuna, 1);
                    dataGridRemoveColumn.option("columns", columns);
                    dataGridRemoveColumn.refresh();
                }
            }

            if (exibirCompraEstoque == false) {
                nomeDaColuna = 'VL_TOTAL_COMPRAS';
                indiceDaColuna = -1;

                for (var i = 0; i < columns.length; i++) {
                    if (columns[i].dataField === nomeDaColuna) {
                        indiceDaColuna = i;
                        break; // Parando o loop assim que encontrar a coluna
                    }
                }

                if (indiceDaColuna !== -1) {
                    columns.splice(indiceDaColuna, 1);
                    dataGridRemoveColumn.option("columns", columns);
                    dataGridRemoveColumn.refresh();
                }

                nomeDaColuna = 'VL_TOTAL_ESTOQUE';
                indiceDaColuna = -1;

                for (var i = 0; i < columns.length; i++) {
                    if (columns[i].dataField === nomeDaColuna) {
                        indiceDaColuna = i;
                        break; // Parando o loop assim que encontrar a coluna
                    }
                }

                if (indiceDaColuna !== -1) {
                    columns.splice(indiceDaColuna, 1);
                    dataGridRemoveColumn.option("columns", columns);
                    dataGridRemoveColumn.refresh();
                }

                nomeDaColuna = 'QT_ESTOQUE';
                indiceDaColuna = -1;

                for (var i = 0; i < columns.length; i++) {
                    if (columns[i].dataField === nomeDaColuna) {
                        indiceDaColuna = i;
                        break; // Parando o loop assim que encontrar a coluna
                    }
                }

                if (indiceDaColuna !== -1) {
                    columns.splice(indiceDaColuna, 1);
                    dataGridRemoveColumn.option("columns", columns);
                    dataGridRemoveColumn.refresh();
                }

                nomeDaColuna = 'QT_COMPRADA';
                indiceDaColuna = -1;

                for (var i = 0; i < columns.length; i++) {
                    if (columns[i].dataField === nomeDaColuna) {
                        indiceDaColuna = i;
                        break; // Parando o loop assim que encontrar a coluna
                    }
                }

                if (indiceDaColuna !== -1) {
                    columns.splice(indiceDaColuna, 1);
                    dataGridRemoveColumn.option("columns", columns);
                    dataGridRemoveColumn.refresh();
                }
            }

            if (incluirDevolucoes == false) {
                nomeDaColuna = 'VL_DEVOLUCOES';
                indiceDaColuna = -1;

                for (var i = 0; i < columns.length; i++) {
                    if (columns[i].dataField === nomeDaColuna) {
                        indiceDaColuna = i;
                        break; // Parando o loop assim que encontrar a coluna
                    }
                }

                if (indiceDaColuna !== -1) {
                    columns.splice(indiceDaColuna, 1);
                    dataGridRemoveColumn.option("columns", columns);
                    dataGridRemoveColumn.refresh();
                }

                nomeDaColuna = 'QT_DEVOLUCOES';
                indiceDaColuna = -1;

                for (var i = 0; i < columns.length; i++) {
                    if (columns[i].dataField === nomeDaColuna) {
                        indiceDaColuna = i;
                        break; // Parando o loop assim que encontrar a coluna
                    }
                }

                if (indiceDaColuna !== -1) {
                    columns.splice(indiceDaColuna, 1);
                    dataGridRemoveColumn.option("columns", columns);
                    dataGridRemoveColumn.refresh();
                }

                nomeDaColuna = 'VL_FATURAMENTO_LIQUIDO';
                indiceDaColuna = -1;

                for (var i = 0; i < columns.length; i++) {
                    if (columns[i].dataField === nomeDaColuna) {
                        indiceDaColuna = i;
                        break; // Parando o loop assim que encontrar a coluna
                    }
                }

                if (indiceDaColuna !== -1) {
                    columns.splice(indiceDaColuna, 1);
                    dataGridRemoveColumn.option("columns", columns);
                    dataGridRemoveColumn.refresh();
                }
            }
        }
        else {
            loadPanel.hide();

            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    rolar_topo();
}

function ultimoDiaDoMes(ano, mes) {
    return new Date(ano, mes + 1, 0, 23, 59);
}

function limparFiltros() {
    $('#dt_Inicial_Faturamento').dxDateBox('instance').option('value', new Date(dataInicial));
    $('#dt_Final_Faturamento').dxDateBox('instance').option('value', new Date(dataUltimoDiaMes));
    $('#lkp_Periodo').dxLookup('instance').option('value', 'F');
    $('#lkp_Ordenacao').dxLookup('instance').option('value', 'FT');
    $('#lkp_Custo').dxLookup('instance').option('value', 'CM');
    $('#lkp_Filiais').dxLookup('instance').option('value', null);
    $('#lkp_Almoxarifados').dxLookup('instance').option('value', null);
    $('#lkp_Produtos').dxLookup('instance').option('value', null);
    $('#lkp_Fornecedores').dxLookup('instance').option('value', null);
    $('#lkp_Vendedores').dxLookup('instance').option('value', null);
    $('#lkp_Familias').dxDropDownBox('instance').option('value', null);

    $('#chk_Incluir_Conta_Corrente').dxCheckBox('instance').option('value', false);
    $('#chk_Agrupar_Familia_Pai').dxCheckBox('instance').option('value', false);
    $('#chk_Fornecedor_Padrao').dxCheckBox('instance').option('value', false);
    $('#chk_Compras_Estoque').dxCheckBox('instance').option('value', false);
    $('#chk_Devolucoes').dxCheckBox('instance').option('value', false);
    $('#chk_Somente_Registros_Vendas').dxCheckBox('instance').option('value', false);
}

function exibirFiltrosResultado(resultado) {

    var labelResultado;
    tipoAgrupamento = resultado; //parâmetro geral para informar ao relatório o tipo de resultado agrupado
    exibirCodigoFabricante = false;

    ExibirEsconderPaineis('cardInstrucoes', 'none');
    $('#cardAgruparFamiliaPai').slideUp();

    if (resultado == "F") {
        labelResultado = "FAMÍLIA";
        labelColunaDescricao = 'Família';
        $('#cardAgruparFamiliaPai').slideDown();
    } else if (resultado == "P") {
        labelResultado = "PRODUTO";
        labelColunaDescricao = 'Produto';
        exibirCodigoFabricante = true;
    } else if (resultado == "C") {
        labelResultado = "CLIENTE";
        labelColunaDescricao = 'Cliente';
    } else if (resultado == "R") {
        labelResultado = "FORNECEDOR";
        labelColunaDescricao = 'Fornecedor';
    } else if (resultado == "V") {
        labelResultado = "VENDEDOR";
        labelColunaDescricao = 'Vendedor';
    } 

    $('#cardFiltros').slideDown();
    $('#labelAgrupamento').hide().fadeIn(500);
    $('#labelResultadoPor').hide().text(labelResultado).fadeIn(500);
}

function exibirFiltros() {
    $('#cardCabecalho, #cardFiltros, #cardResultadoFiltros').slideDown();
}

function fecharFiltros() {
    $('#cardFiltros, #cardResultadoFiltros').slideUp();
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

function rolar_para(elemento) {
    //setTimeout(() => {  $('html, body').animate({ scrollTop: $(elemento).offset().top}, 1300); }, 5000);
    $('html, body').animate({ scrollTop: $(elemento).offset().top }, 600);
}

function rolar_topo() {
    window.scrollTo(0, 0);
}

function AbrirModal(e) {
    $(e).modal('toggle');
}

function removerComAnimacao(objRemover) {
    const elemento = document.getElementById(objRemover);

    // Define a animação usando CSS transitions
    elemento.style.transition = 'opacity 1s ease-in-out';
    elemento.style.opacity = '0';

    // Define um atraso para aguardar a animação completar
    setTimeout(() => {
        elemento.remove();
    }, 750); // Tempo da animação em milissegundos (1 segundo no exemplo)
}

function convertImageToBase64(imageUrl) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", imageUrl, true);
        xhr.responseType = "blob";

        xhr.onload = () => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(xhr.response);
        };

        xhr.onerror = () => {
            reject(new Error("Failed to fetch image."));
        };

        try {
            xhr.send();
        } catch {
            console.log("LOGOTIPO NÃO ENCONTRADO: ", imageUrl);
        }
    });
}

function FormatButtons() {
    let buttonsPrincipal = $("#panelMenu > button");
    buttonsPrincipal.removeClass('btn-primary').addClass('btn-default');
    buttonsPrincipal.on("click", a => {
        buttonsPrincipal.removeClass('btn-primary').addClass('btn-default');
        $(a.currentTarget).removeClass('btn-default').addClass('btn-primary');
    })
}

