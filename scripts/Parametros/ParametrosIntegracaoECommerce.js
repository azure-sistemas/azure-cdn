var oLoadPanel = null;

//PARÂMETROS CORPORATIVOS
var oHrInicialDiaUtil = null;
var oHrLimiteDiaUtil = null;
var oHrInicialSabado = null;
var oHrLimiteSabado = null;
var oHrInicialDomingo = null;
var oHrLimiteDomingo = null;

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

    var vHrInicialDiaUtil = null;
    var vHrLimiteDiaUtil = null;
    var vHrInicialSabado = null;
    var vHrLimiteSabado = null;
    var vHrInicialDomingo = null;
    var vHrLimiteDomingo = null;

    (async () => {
        oLoadPanel.show();

        //CARREGA OS PARÂMETROS DE INTEGRAÇÃO COM E-COMMERCE
        await $.ajax({
            type: 'POST',
            url: "/Parametros/CarregaParametrosCorporativos",
            success: function (response) {
                if (response.length > 0) {
                    vHrInicialDiaUtil = decimalToTime(response[0].HR_INICIAL_INTEGRACAO_DIA_UTIL);
                    vHrLimiteDiaUtil = decimalToTime(response[0].HR_LIMITE_INTEGRACAO_DIA_UTIL);
                    vHrInicialSabado = decimalToTime(response[0].HR_INICIAL_INTEGRACAO_SABADO);
                    vHrLimiteSabado = decimalToTime(response[0].HR_LIMITE_INTEGRACAO_SABADO);
                    vHrInicialDomingo = decimalToTime(response[0].HR_INICIAL_INTEGRACAO_DOMINGO);
                    vHrLimiteDomingo = decimalToTime(response[0].HR_LIMITE_INTEGRACAO_DOMINGO);
                }
            },
            failure: function (response) {
                showNotify('error', 'Ocorreu um erro ao carregar os parâmetros', response.responseText);
            }
        });

        //***********************************
        //* PARÂMETROS CORPORATIVOS - INICIO
        //***********************************

        oHrInicialDiaUtil = $('#hr_Inicial_Dia_Util').dxDateBox({
            labelMode: 'floating',
            label: 'Inicio',
            placeholder: '',
            showClearButton: true,
            readOnly: false,
            useMaskBehavior: true,
            type: 'time',
            value: vHrInicialDiaUtil,
            onValueChanged(e) {
                oHrInicialDiaUtil.option('value', e.component._maskValue);
            },
        }).dxDateBox('instance');

        oHrLimiteDiaUtil = $('#hr_Limite_Dia_Util').dxDateBox({
            labelMode: 'floating',
            label: 'Fim',
            placeholder: '',
            readOnly: false,
            showClearButton: true,
            useMaskBehavior: true,
            type: 'time',
            value: vHrLimiteDiaUtil,
            onValueChanged(data) {
                oHrLimiteDiaUtil.option('value', data.component._maskValue);
            },
        }).dxDateBox('instance');

        oHrInicialSabado = $('#hr_Inicial_Sabado').dxDateBox({
            labelMode: 'floating',
            label: 'Inicio',
            placeholder: '',
            readOnly: false,
            showClearButton: true,
            useMaskBehavior: true,
            type: 'time',
            value: vHrInicialSabado,
            onValueChanged(data) {
                oHrInicialSabado.option('value', data.component._maskValue);
            },
        }).dxDateBox('instance');

        oHrLimiteSabado = $('#hr_Limite_Sabado').dxDateBox({
            labelMode: 'floating',
            label: 'Fim',
            placeholder: '',
            readOnly: false,
            showClearButton: true,
            useMaskBehavior: true,
            type: 'time',
            value: vHrLimiteSabado,
            onValueChanged(data) {
                oHrLimiteSabado.option('value', data.component._maskValue);
            },
        }).dxDateBox('instance');

        oHrInicialDomingo = $('#hr_Inicial_Domingo').dxDateBox({
            labelMode: 'floating',
            label: 'Inicio',
            placeholder: '',
            readOnly: false,
            showClearButton: true,
            useMaskBehavior: true,
            type: 'time',
            value: vHrInicialDomingo,
            onValueChanged(data) {
                oHrInicialDomingo.option('value', data.component._maskValue);
            },
        }).dxDateBox('instance');

        oHrLimiteDomingo = $('#hr_Limite_Domingo').dxDateBox({
            labelMode: 'floating',
            label: 'Fim',
            placeholder: '',
            readOnly: false,
            showClearButton: true,
            useMaskBehavior: true,
            type: 'time',
            value: vHrLimiteDomingo,
            onValueChanged(data) {
                oHrLimiteDomingo.option('value', data.component._maskValue);
            },
        }).dxDateBox('instance');

        //***********************************
        //* PARÂMETROS CORPORATIVOS - FIM
        //***********************************

        //BOTAO SALVAR
        $('#btn_Salvar').dxButton({
            text: 'Salvar Dados',
            icon: 'save',
            type: 'default',
            onClick(e) {
                salvarParametros();
            },
        }).dxButton('instance');

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

function rolarPara(elemento) {
    $('html, body').animate({ scrollTop: $(elemento).offset().top }, 600);
}

function abrirModal(e) {
    $(e).modal('toggle');
}

function decimalToTime(pDecimal) {
    var vHour;
    var vMinute;

    if (pDecimal == null) {
        return null;
    }

    if (pDecimal.toString().indexOf('.') >= 0) {
        vHour = '00' + pDecimal.toString().split('.')[0];
        vHour = vHour.substring(vHour.length - 2);

        vMinute = pDecimal.toString().split('.')[1] + '00';
        vMinute = vMinute.substring(0, 2);
    }
    else {
        vHour = '00' + pDecimal.toString();
        vHour = vHour.substring(vHour.length - 2);

        vMinute = '00';
    }

    return vHour + ':' + vMinute;
}

function timeToDecimal(pDateTime) {
    if (pDateTime == undefined || pDateTime == null || pDateTime.length == 0) {
        return null;
    }

    var vDate = new Date(pDateTime);

    if (!isNaN(vDate.valueOf())) {
        return vDate.getHours().toString() + '.' + vDate.getMinutes().toString();
    }
    else if (pDateTime.toString().length == 5) {
        return pDateTime.toString().replace(':', '.');
    }
    else {
        return null;
    }
}

function salvarParametros() {
    verificaHorarios();

    const result = DevExpress.validationEngine.validateGroup("Corporativos");

    if (result.isValid) {
        var parametros = {
            CD_FILIAL: null,
            HR_INICIAL_INTEGRACAO_DIA_UTIL: timeToDecimal(oHrInicialDiaUtil.option('value')),
            HR_LIMITE_INTEGRACAO_DIA_UTIL: timeToDecimal(oHrLimiteDiaUtil.option('value')),
            HR_INICIAL_INTEGRACAO_SABADO: timeToDecimal(oHrInicialSabado.option('value')),
            HR_LIMITE_INTEGRACAO_SABADO: timeToDecimal(oHrLimiteSabado.option('value')),
            HR_INICIAL_INTEGRACAO_DOMINGO: timeToDecimal(oHrInicialDomingo.option('value')),
            HR_LIMITE_INTEGRACAO_DOMINGO: timeToDecimal(oHrLimiteDomingo.option('value'))
        };

        $.ajax({
            type: 'POST',
            url: '/Parametros/GravaParametrosCorporativos',
            data: { oParametrosIntegracaoECommerce: parametros },
            success: function (response) {
                if (response.result == 'error') {
                    exibeMensagem('error', 'Ocorreu um erro ao salvar os parâmetros', response.msg);
                }
                else {
                    exibeMensagem('success', 'Operação realizada!', 'Parâmetros salvos com sucesso');
                }
            },
            failure: function (response) {
                exibeMensagem('error', 'Ocorreu um erro ao salvar os parâmetros', response.responseText);
            }
        });
    }
}

function verificaHorarios() {
    $('#hr_Inicial_Dia_Util').dxValidator({ validationRules: [{ type: 'required', message: 'Horário inicial obrigatório quando informado o horário limite', }], validationGroup: "Corporativos" });
    $('#hr_Limite_Dia_Util').dxValidator({ validationRules: [{ type: 'required', message: 'Horário limite obrigatório quando informado o horário inicial', }], validationGroup: "Corporativos" });
    $('#hr_Inicial_Sabado').dxValidator({ validationRules: [{ type: 'required', message: 'Horário inicial obrigatório quando informado o horário limite', }], validationGroup: "Corporativos" });
    $('#hr_Limite_Sabado').dxValidator({ validationRules: [{ type: 'required', message: 'Horário limite obrigatório quando informado o horário inicial', }], validationGroup: "Corporativos" });
    $('#hr_Inicial_Domingo').dxValidator({ validationRules: [{ type: 'required', message: 'Horário inicial obrigatório quando informado o horário limite', }], validationGroup: "Corporativos" });
    $('#hr_Limite_Domingo').dxValidator({ validationRules: [{ type: 'required', message: 'Horário limite obrigatório quando informado o horário inicial', }], validationGroup: "Corporativos" });

    if (oHrInicialDiaUtil.option('value') == undefined || oHrInicialDiaUtil.option('value') == null || oHrInicialDiaUtil.option('value').toString().length == 0) {
        $('#hr_Limite_Dia_Util').dxValidator({ validationRules: [{ type: 'stringLength', min: 0, message: '', }], validationGroup: "Corporativos" });
    }

    if (oHrLimiteDiaUtil.option('value') == undefined || oHrLimiteDiaUtil.option('value') == null || oHrLimiteDiaUtil.option('value').toString().length == 0) {
        $('#hr_Inicial_Dia_Util').dxValidator({ validationRules: [{ type: 'stringLength', min: 0, message: '', }], validationGroup: "Corporativos" });
    }

    if (oHrInicialSabado.option('value') == undefined || oHrInicialSabado.option('value') == null || oHrInicialSabado.option('value').toString().length == 0) {
        $('#hr_Limite_Sabado').dxValidator({ validationRules: [{ type: 'stringLength', min: 0, message: '', }], validationGroup: "Corporativos" });
    }

    if (oHrLimiteSabado.option('value') == undefined || oHrLimiteSabado.option('value') == null || oHrLimiteSabado.option('value').toString().length == 0) {
        $('#hr_Inicial_Sabado').dxValidator({ validationRules: [{ type: 'stringLength', min: 0, message: '', }], validationGroup: "Corporativos" });
    }

    if (oHrInicialDomingo.option('value') == undefined || oHrInicialDomingo.option('value') == null || oHrInicialDomingo.option('value').toString().length == 0) {
        $('#hr_Limite_Domingo').dxValidator({ validationRules: [{ type: 'stringLength', min: 0, message: '', }], validationGroup: "Corporativos" });
    }

    if (oHrLimiteDomingo.option('value') == undefined || oHrLimiteDomingo.option('value') == null || oHrLimiteDomingo.option('value').toString().length == 0) {
        $('#hr_Inicial_Domingo').dxValidator({ validationRules: [{ type: 'stringLength', min: 0, message: '', }], validationGroup: "Corporativos" });
    }
}