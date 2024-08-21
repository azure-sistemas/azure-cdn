var oLoadPanelCalculando = null;
var oLoadPanelCarregando = null;
var oChkAceiteTermoAdesao = null;
var oTxtEmailTermoUso = null;
var oTextoResponsabilidade = null;
var oTextoAdesao = null;
var oScrollTextoAdesao = null;
var oScrollContentTextoAdesao = null;
var oScrollBarTextoAdesao = null;
var oScrollSliderTextoAdesao = null;
var vNomeUsuario = null;
var vNrNivelAcesso = null;
var vVersaoTermo = null;
var vAdesaoRealizada = null;
var vNomeUsuarioAdesao = null;
var vValorPorTransacaoPIX = null;
var vValorTotalPIX = null;
var vQtdeTotalPIX = null;
var vValorTaxaPIX = null;
var vPcTaxaPIX = null;
var vPossuiTextoResponsabilidade = false;

$(document).ready(function () {
    oLoadPanelCalculando = $("#loadPanelCalculando").dxLoadPanel({
        shadingColor: "rgba(0,0,0,0.4)",
        message: "Calculando Simulação...",
        visible: false,
        showIndicator: true,
        showPane: true,
        shading: true,
        hideOnOutsideClick: false,
    }).dxLoadPanel("instance");

    oLoadPanelCarregando = $("#loadPanelCarregando").dxLoadPanel({
        shadingColor: "rgba(0,0,0,0.4)",
        message: "Carregando...",
        visible: false,
        showIndicator: true,
        showPane: true,
        shading: true,
        hideOnOutsideClick: false,
    }).dxLoadPanel("instance");

    oChkAceiteTermoAdesao = $('#chkAceiteTermoAdesao').dxCheckBox({
        text: 'Li e concordo com os termos de uso e política de privacidade',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-aceite-adesao',
        },
    }).dxCheckBox('instance');

    oTxtEmailTermoUso = $("#txtEmailTermoUso").dxTextBox({
        placeholder: "Informe seu E-mail",
        showClearButton: true,
        buttons: [{
            name: 'currency',
            location: 'after',
            options: {
                icon: 'fa fa-send',
                text: 'Enviar',
                stylingMode: 'text',
                width: 80,
                elementAttr: {
                    class: 'botao-enviar-email',
                },
                onClick(e) {
                    oLoadPanelCarregando.show();

                    $.ajax({
                        type: "POST",
                        url: "/Financeiro/EnviaEmailTermoAdesaoIntegracaoPix",
                        data: { pEmailUsuario: oTxtEmailTermoUso.option("value") },
                        success: function (responseData) {
                            oLoadPanelCarregando.hide();

                            if (responseData.result == "error") {
                                exibeMensagem("error", "Ocorreu um erro ao enviar o termo para o e-mail informado", "Por favor, tente novamente mais tarde");
                            } else {
                                inibeEmail();

                                exibeMensagem("success", "Termo de Uso", "E-mail enviado com sucesso");
                            }
                        },
                        fail: function (responseData) {
                            oLoadPanelCarregando.hide();

                            exibeMensagem("error", "Ocorreu um erro ao enviar o termo para o e-mail informado", "Por favor, tente novamente mais tarde");
                        }
                    });
                },
            },
        }],
    }).dxTextBox("instance");

    oTextoAdesao = document.getElementById("textoAdesao");

    oScrollTextoAdesao = document.getElementById("scrollTextoAdesao");

    oScrollContentTextoAdesao = document.getElementById("scrollContentTextoAdesao");

    oScrollBarTextoAdesao = document.getElementById("scrollBarTextoAdesao");

    oScrollSliderTextoAdesao = document.getElementById("scrollSliderTextoAdesao");

    oTextoResponsabilidade = document.getElementById("textoResponsabilidade");

    oLoadPanelCalculando.show();

    //Retorna as informações da simulação da taxa de integração PIX
    GetAzureDataSource(64, '{}', 180).then((result) => {
        oLoadPanelCalculando.hide();

        if (result.success) {
            vNomeUsuario = result.data[0].DS_NOME_USUARIO;
            vNrNivelAcesso = result.data[0].LG_ADMINISTRADOR;
            oTextoAdesao.innerHTML = result.data[0].DS_TERMO_ADESAO;
            vVersaoTermo = result.data[0].CD_VERSAO_TERMO;
            vAdesaoRealizada = result.data[0].LG_ADESAO_REALIZADA;
            vNomeUsuarioAdesao = result.data[0].DS_NOME_USUARIO_ADESAO;

            if (result.data[0].DS_TERMO_RESPONSABILIDADE) {
                vPossuiTextoResponsabilidade = true;
                oTextoResponsabilidade.innerHTML = result.data[0].DS_TERMO_RESPONSABILIDADE;
            }

            vValorPorTransacaoPIX = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(result.data[0].VL_POR_TRANSACAO);  
            vValorTotalPIX = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(result.data[0].VL_TRANSACOES);
            vQtdeTotalPIX = (result.data[0].QT_TRANSACOES).toLocaleString( 'pt-BR', { minimumFractionDigits: 0 } );
            vValorTaxaPIX = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(result.data[0].VL_TAXA);
            vPcTaxaPIX = (result.data[0].PC_TAXA_MEDIA).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

            configuraModalTermoAdesao();

            $('#nomeUsuario').hide().text(vNomeUsuario).fadeIn(500);
            $('#nomeResponsavel').hide().text(vNomeUsuario).fadeIn(500);

            if (vAdesaoRealizada == true) {
                $('#panelAdesaoJaRealizada').slideDown();
            }
            else {
                exibirEsconderPaineis('panelContratacaoPix', 'block');

                if (vNrNivelAcesso == 0) {
                    $('#panelUsuarioComum').slideDown();
                } else if (result.data[0].QT_TRANSACOES == 0) {
                    $('#panelSemTransacoesPIX').slideDown();
                } else {
                    $('#valorTotalPIX').hide().text(vValorTotalPIX).fadeIn(500);
                    $('#qtdeTotalPIX').hide().text(vQtdeTotalPIX).fadeIn(500);
                    $('#valorTaxaPIX').hide().text(vValorTaxaPIX).fadeIn(500);
                    $('#pcTaxaPIX').hide().text(vPcTaxaPIX + '%').fadeIn(500);

                    $('#labelValorTaxaPIX').hide().text('(' + vQtdeTotalPIX + ' transações x ' + vValorPorTransacaoPIX + ')').fadeIn(500);
                    $('#labelPcTaxaPIX').hide().text('(' + vValorTaxaPIX + ' / ' + vValorTotalPIX + ')').fadeIn(500);

                    $('#panelValoresSimulacaoTitulo').slideDown();
                    $('#panelValoresSimulacao').slideDown();
                };
            }
        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
        }
    });
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

function rolarPara(elemento) {
    $('html, body').animate({ scrollTop: $(elemento).offset().top }, 600);
}

function rolarTopo() {
    window.scrollTo(0, 0);
};

function abrirFecharModal(e) {
    $(e).modal('toggle');
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

function enviaEmailInteressePix() {
    oLoadPanelCarregando.show();

    $.ajax({
        type: "POST",
        url: "/Financeiro/EnviarEmailInteressePix",
        data: { pNomeUsuario: vNomeUsuario },
        success: function (responseData) {
            oLoadPanelCarregando.hide();

            if (responseData.result == "error") {
                exibeMensagem("error", "Ocorreu um erro ao informar nossa equipe sobre seu interesse em nossa solução PIX", "Por favor, tente novamente mais tarde");
            } else {
                if (vNrNivelAcesso == 0) {
                    abrirFecharModal('#ModalContato');
                }
                else {
                    if (vPossuiTextoResponsabilidade == true) {
                        abrirFecharModal('#ModalResponsavel');
                    }
                    else {
                        abrirFecharModal('#ModalTermoAdesao');
                    }
                }
            }
        },
        fail: function (responseData) {
            oLoadPanelCarregando.hide();

            exibeMensagem("error", "Ocorreu um erro ao informar nossa equipe sobre seu interesse em nossa solução PIX", "Por favor, tente novamente mais tarde");
        }
    });
}

function exibirTermoUso() {
    abrirFecharModal('#ModalTermoAdesao');
}

function exibeEmail() {
    $('#emailTermoUso').slideDown();
    $('#linkEmail').slideUp();
}

function inibeEmail() {
    $('#linkEmail').slideDown();
    $('#emailTermoUso').slideUp();
}

function adesaoConcluida() {
    if (oChkAceiteTermoAdesao.option("value") == true) {
        abrirFecharModal('#ModalTermoAdesao');

        oLoadPanelCarregando.show();

        $.ajax({
            type: "POST",
            url: "/Financeiro/AdesaoIntegracaoPix",
            data: { pNomeUsuario: vNomeUsuario, pVersaoTermo: vVersaoTermo },
            success: function (responseData) {
                oLoadPanelCarregando.hide();

                if (responseData.result == "error") {
                    exibeMensagem("error", "Ocorreu um erro ao gravar informações sobre sua adesão à nossa solução PIX", "Por favor, tente novamente mais tarde");
                } else {
                    exibirEsconderPaineis('panelContratacaoPix', 'none');
                    exibirEsconderPaineis('panelBoasVindas', 'block');

                    rolarTopo();
                }
            },
            fail: function (responseData) {
                oLoadPanelCarregando.hide();

                exibeMensagem("error", "Ocorreu um erro ao gravar informações sobre sua adesão à nossa solução PIX", "Por favor, tente novamente mais tarde");
            }
        });
    }
    else {
        DevExpress.ui.notify({
            message: 'Você precisa assinalar ter lido e concordado com o termo.',
            type: 'error',
            displayTime: 5000,
        });
    }
}

window.onresize = function () {
    configuraModalTermoAdesao();
};

function configuraModalTermoAdesao() {
    const pageHeight = window.innerHeight;

    const heightScrollReajusteAbortado = pageHeight - 240;

    oScrollTextoAdesao.style.height = heightScrollReajusteAbortado + "px";

    var sliderHeight = Math.trunc(oScrollContentTextoAdesao.clientHeight / (oScrollContentTextoAdesao.scrollHeight / oScrollContentTextoAdesao.clientHeight));

    oScrollTextoAdesao.nanoscroller.contentHeight = oScrollContentTextoAdesao.scrollHeight;
    oScrollTextoAdesao.nanoscroller.isActive = true;
    oScrollTextoAdesao.nanoscroller.maxScrollTop = (oScrollContentTextoAdesao.scrollHeight - oScrollContentTextoAdesao.clientHeight);
    oScrollTextoAdesao.nanoscroller.paneHeight = oScrollContentTextoAdesao.clientHeight;
    oScrollTextoAdesao.nanoscroller.paneOuterHeight = oScrollContentTextoAdesao.clientHeight;
    oScrollTextoAdesao.nanoscroller.sliderHeight = sliderHeight;
    oScrollTextoAdesao.nanoscroller.maxSliderTop = oScrollContentTextoAdesao.clientHeight - sliderHeight;
    oScrollBarTextoAdesao.style.display = "block";
    oScrollSliderTextoAdesao.style.height = sliderHeight + "px";
};
