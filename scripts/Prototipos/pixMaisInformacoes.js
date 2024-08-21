var oLoadPanel = null;

$(document).ready(function () {
    oLoadPanel = $("#loadPanel").dxLoadPanel({
        shadingColor: "rgba(0,0,0,0.4)",
        message: "Calculando Simulação...",
        visible: false,
        showIndicator: true,
        showPane: true,
        shading: true,
        hideOnOutsideClick: false,
    }).dxLoadPanel("instance");

    oLoadPanel.show();

    chkAceiteTermoAdesao = $('#chkAceiteTermoAdesao').dxCheckBox({
        text: 'Li e concordo com os termos de uso e política de privacidade',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-aceite-adesao',
        },
    }).dxCheckBox('instance');

    txtEmailTermoUso = $("#txtEmailTermoUso").dxTextBox({
        //labelMode: "floating",
        //label: "Informe seu E-mail",
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
                    inibeEmail();
                    exibeMensagem("success", "Termo de Uso", "E-mail enviado com sucesso");
                },
            },
        }],
    }).dxTextBox("instance");

    //Retorna as informações da simulação da taxa de integração PIX
    GetAzureDataSource(64, '{}', 180).then((result) => {

        oLoadPanel.hide();

        if (result.success) {
            ExibirEsconderPaineis('panelContratacaoPix', 'block');

            var nomeUsuario = result.data[0].DS_NOME_USUARIO;
            var nomeResponsavel = result.data[0].DS_NOME_USUARIO;
            var valorPorTransacaoPIX = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(result.data[0].VL_POR_TRANSACAO);
            var valorTotalPIX = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(result.data[0].VL_TRANSACOES);
            var qtdeTotalPIX = (result.data[0].QT_TRANSACOES).toLocaleString('pt-BR', { minimumFractionDigits: 0 });
            var valorTaxaPIX = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(result.data[0].VL_TAXA);
            var pcTaxaPIX = (result.data[0].PC_TAXA_MEDIA).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

            $('#nomeUsuario').hide().text(nomeUsuario).fadeIn(500);
            $('#nomeResponsavel').hide().text(nomeResponsavel).fadeIn(500);

            if (result.data[0].LG_ADMINISTRADOR == 0) {
                $('#panelUsuarioComum').slideDown();
            } else if (result.data[0].QT_TRANSACOES == 0) {
                $('#panelSemTransacoesPIX').slideDown();
            } else {
                $('#valorTotalPIX').hide().text(valorTotalPIX).fadeIn(500);
                $('#qtdeTotalPIX').hide().text(qtdeTotalPIX).fadeIn(500);
                $('#valorTaxaPIX').hide().text(valorTaxaPIX).fadeIn(500);
                $('#pcTaxaPIX').hide().text(pcTaxaPIX + '%').fadeIn(500);

                $('#labelValorTaxaPIX').hide().text('(' + qtdeTotalPIX + ' transações x ' + valorPorTransacaoPIX + ')').fadeIn(500);
                $('#labelPcTaxaPIX').hide().text('(' + valorTaxaPIX + ' / ' + valorTotalPIX + ')').fadeIn(500);

                $('#panelValoresSimulacaoTitulo').slideDown();
                $('#panelValoresSimulacao').slideDown();
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

});

function rolarPara(elemento) {
    $('html, body').animate({ scrollTop: $(elemento).offset().top }, 600);
}

function abrirModal(e) {
    $(e).modal('toggle');
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

function exibirTermoUso() {
    abrirModal('#ModalTermoAdesao');
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
    ExibirEsconderPaineis('panelContratacaoPix', 'none');
    ExibirEsconderPaineis('panelBoasVindas', 'block');
    rolarTopo();
}

function adesaoJaRealizada() {
    ExibirEsconderPaineis('panelContratacaoPix', 'none');
    ExibirEsconderPaineis('panelAdesaoJaRealizada', 'block');
    rolarTopo();
}
function exibeMensagem(pTipo, pTitulo, pTexto) {
    var configuration = { title: pTitulo, text: pTexto, type: pTipo }

    if (pTipo == "error") {
        configuration.addclass = "stack-bar-top";
        configuration.stack = { "dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0 };
        configuration.width = "100%";
        //configuration.hide = false;
    }
    else if (pTipo == "info") {
        configuration.addclass = "notification-warning stack-bar-top";
        configuration.stack = { "dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0 };
        configuration.width = "100%";
    }

    new PNotify(configuration);
};

function rolarTopo() {
    window.scrollTo(0, 0);
};


