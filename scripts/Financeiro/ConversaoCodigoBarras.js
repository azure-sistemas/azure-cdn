function Build() {
    function d(b, d, c, a) {
        return c < 0 && (c += b.length),
            (a = void 0 !== a ? a : b.length) < 0 && (a = a + b.length - c),
            [b.slice(0, c), d.substr(0, a), d.slice(a), b.slice(c + a)].join("")
    }
    this.identificarTipoCodigo = a => {
        if ("string" != typeof a)
            throw TypeError("Insira uma string v\xe1lida!");
        return 44 == (a = a.replace(/[^0-9]/g, "")).length ? "CODIGO_DE_BARRAS" : 46 == a.length || 47 == a.length || 48 == a.length ? "LINHA_DIGITAVEL" : "TAMANHO_INCORRETO"
    }
    this.identificarTipoBoleto = a => {
        if ("string" != typeof (a = a.replace(/[^0-9]/g, "")))
            throw TypeError("Insira uma string v\xe1lida!");
        if ("00000000000000" == a.substr(-14) || "00000000000000" == a.substr(5, 14))
            return "CARTAO_DE_CREDITO";
        if ("8" != a.substr(0, 1))
            return "BANCO";
        if ("1" == a.substr(1, 1))
            return "ARRECADACAO_PREFEITURA";
        if ("2" == a.substr(1, 1))
            return "CONVENIO_SANEAMENTO";
        if ("3" == a.substr(1, 1))
            return "CONVENIO_ENERGIA_ELETRICA_E_GAS";
        if ("4" == a.substr(1, 1))
            return "CONVENIO_TELECOMUNICACOES";
        else if ("5" == a.substr(1, 1))
            return "ARRECADACAO_ORGAOS_GOVERNAMENTAIS";
        else if ("6" == a.substr(1, 1) || "9" == a.substr(1, 1))
            return "OUTROS";
        else if ("7" == a.substr(1, 1))
            return "ARRECADACAO_TAXAS_DE_TRANSITO"
    }
    this.identificarReferencia = a => {
        a = a.replace(/[^0-9]/g, "");
        let b = a.substr(2, 1);
        if ("string" != typeof a)
            throw TypeError("Insira uma string v\xe1lida!");
        switch (b) {
            case "6":
                return {
                    mod: 10,
                    efetivo: !0
                };
            case "7":
                return {
                    mod: 10,
                    efetivo: !1
                };
            case "8":
                return {
                    mod: 11,
                    efetivo: !0
                };
            case "9":
                return {
                    mod: 11,
                    efetivo: !1
                }
        }
    }
    this.identificarData = (a, e) => {
        a = a.replace(/[^0-9]/g, "");
        let b = this.identificarTipoBoleto(a);
        let d = "";
        let f = moment("1997-10-07");
        return "CODIGO_DE_BARRAS" === e ? d = "BANCO" == b || "CARTAO_DE_CREDITO" == b ? a.substr(5, 4) : "0" : "LINHA_DIGITAVEL" === e && (d = "BANCO" == b || "CARTAO_DE_CREDITO" == b ? a.substr(33, 4) : "0"),
            f.add(Number(d), "days"),
            f.toDate()
    }
    this.identificarValorCodBarrasArrecadacao = (b, e) => {
        b = b.replace(/[^0-9]/g, "");
        let g = this.identificarReferencia(b).efetivo, a = "", c;
        if (g) {
            "LINHA_DIGITAVEL" == e ? (a = b.substr(4, 14),
                a = b.split(""),
                a.splice(11, 1),
                a = a.join(""),
                a = a.substr(4, 11)) : "CODIGO_DE_BARRAS" == e && (a = b.substr(4, 11));
            let f = (c = a.substr(0, 9) + "." + a.substr(9, 2)).substr(1, 1);
            for (; "0" === f;)
                f = (c = d(c, "", 0, 1)).substr(1, 1)
        } else
            c = 0;
        return c
    }
    this.identificarValor = (b, f) => {
        let c = this.identificarTipoBoleto(b), e = "", a;
        if ("CODIGO_DE_BARRAS" == f) {
            if ("BANCO" == c || "CARTAO_DE_CREDITO" == c) {
                let g = (a = (e = b.substr(9, 10)).substr(0, 8) + "." + e.substr(8, 2)).substr(1, 1);
                for (; "0" === g;)
                    g = (a = d(a, "", 0, 1)).substr(1, 1)
            } else
                a = this.identificarValorCodBarrasArrecadacao(b, "CODIGO_DE_BARRAS")
        } else if ("LINHA_DIGITAVEL" == f) {
            if ("BANCO" == c || "CARTAO_DE_CREDITO" == c) {
                let h = (a = (e = b.substr(37)).substr(0, 8) + "." + e.substr(8, 2)).substr(1, 1);
                for (; "0" === h;)
                    h = (a = d(a, "", 0, 1)).substr(1, 1)
            } else
                a = this.identificarValorCodBarrasArrecadacao(b, "LINHA_DIGITAVEL")
        }
        return parseFloat(a)
    }
    this.digitosVerificadores = (a, b) => {
        switch (a = a.replace(/[^0-9]/g, ""),
        b) {
            case 10:
                return (a + this.calculaMod10(a)).toString();
            case 11:
                return (a + this.calculaMod11(a)).toString()
        }
    }
    this.codBarras2LinhaDigitavel = (a, j) => {
        a = a.replace(/[^0-9]/g, "");
        let h = this.identificarTipoBoleto(a)
            , b = "";
        if ("BANCO" == h || "CARTAO_DE_CREDITO" == h) {
            let c = a.substr(0, 4) + a.substr(19, 25) + a.substr(4, 1) + a.substr(5, 14)
                , k = c.substr(0, 9) + this.calculaMod10(c.substr(0, 9))
                , l = c.substr(9, 10) + this.calculaMod10(c.substr(9, 10))
                , m = c.substr(19, 10) + this.calculaMod10(c.substr(19, 10))
                , n = c.substr(29);
            b = (k + l + m + n).toString(),
                j && (b = b.slice(0, 5) + "." + b.slice(5, 10) + " " + b.slice(10, 15) + "." + b.slice(15, 21) + " " + b.slice(21, 26) + "." + b.slice(26, 32) + " " + b.slice(32, 33) + " " + b.slice(33))
        } else {
            let i = this.identificarReferencia(a), d, e, f, g;
            10 == i.mod ? (d = a.substr(0, 11) + this.calculaMod10(a.substr(0, 11)),
                e = a.substr(11, 11) + this.calculaMod10(a.substr(11, 11)),
                f = a.substr(22, 11) + this.calculaMod10(a.substr(22, 11)),
                g = a.substr(33, 11) + this.calculaMod10(a.substr(33, 11))) : 11 == i.mod && (d = a.substr(0, 11) + this.calculaMod11(a.substr(0, 11)),
                    e = a.substr(11, 11) + this.calculaMod11(a.substr(11, 11)),
                    f = a.substr(22, 11) + this.calculaMod11(a.substr(22, 11)),
                    g = a.substr(33, 11) + this.calculaMod11(a.substr(33, 11))),
                b = d + e + f + g
        }
        return b
    }
    this.linhaDigitavel2CodBarras = a => {
        a = a.replace(/[^0-9]/g, "");
        let c = this.identificarTipoBoleto(a)
            , b = "";
        return "BANCO" == c || "CARTAO_DE_CREDITO" == c ? b = a.substr(0, 4) + a.substr(32, 1) + a.substr(33, 14) + a.substr(4, 5) + a.substr(10, 10) + a.substr(21, 10) : ((a = a.split("")).splice(11, 1),
            a.splice(22, 1),
            a.splice(33, 1),
            a.splice(44, 1),
            b = a = a.join("")),
            b
    }
    this.calculaDVCodBarras = (a, c, b) => ((a = (a = a.replace(/[^0-9]/g, "")).split("")).splice(c, 1),
        a = a.join(""),
        10 === b) ? this.calculaMod10(a) : 11 === b ? this.calculaMod11(a) : void 0,
        this.validarCodigoComDV = (a, h) => {
            a = a.replace(/[^0-9]/g, "");
            let c, b;
            if ("LINHA_DIGITAVEL" === h) {
                if ("BANCO" == (c = this.identificarTipoBoleto(a, "LINHA_DIGITAVEL")) || "CARTAO_DE_CREDITO" == c) {
                    let j = a.substr(0, 9) + this.calculaMod10(a.substr(0, 9))
                        , k = a.substr(10, 10) + this.calculaMod10(a.substr(10, 10))
                        , l = a.substr(21, 10) + this.calculaMod10(a.substr(21, 10))
                        , m = a.substr(32, 1)
                        , n = a.substr(33);
                    b = (j + k + l + m + n).toString()
                } else {
                    let i = this.identificarReferencia(a), d, e, f, g;
                    if (10 == i.mod)
                        d = a.substr(0, 11) + this.calculaMod10(a.substr(0, 11)),
                            e = a.substr(12, 11) + this.calculaMod10(a.substr(12, 11)),
                            f = a.substr(24, 11) + this.calculaMod10(a.substr(24, 11)),
                            g = a.substr(36, 11) + this.calculaMod10(a.substr(36, 11));
                    else if (11 == i.mod) {
                        d = a.substr(0, 11),
                            e = a.substr(12, 11),
                            f = a.substr(24, 11),
                            g = a.substr(36, 11);
                        let o = parseInt(a.substr(11, 1))
                            , p = parseInt(a.substr(23, 1))
                            , q = parseInt(a.substr(35, 1))
                            , r = parseInt(a.substr(47, 1))
                            , s = this.calculaMod11(d) == o && this.calculaMod11(e) == p && this.calculaMod11(f) == q && this.calculaMod11(g) == r;
                        return s
                    }
                    b = d + e + f + g
                }
            } else if ("CODIGO_DE_BARRAS" === h) {
                if ("BANCO" == (c = this.identificarTipoBoleto(a)) || "CARTAO_DE_CREDITO" == c) {
                    let t = this.calculaDVCodBarras(a, 4, 11);
                    b = a.substr(0, 4) + t + a.substr(5)
                } else {
                    let u = this.identificarReferencia(a);
                    (b = a.split("")).splice(3, 1),
                        b = b.join("");
                    let v = this.calculaDVCodBarras(a, 3, u.mod);
                    b = b.substr(0, 3) + v + b.substr(3)
                }
            }
            return a === b
        }
    this.geraCodBarras = b => {
        b = b.replace(/[^0-9]/g, ""),
            this.identificarTipoBoleto(b);
        let a;
        (a = (a = this.linhaDigitavel2CodBarras(b)).split("")).splice(4, 1),
            a = a.join("");
        let c = this.calculaMod11(a);
        return a.substr(0, 4) + c + a.substr(4)
    }
    this.validarBoleto = a => {
        let c = this.identificarTipoCodigo(a)
            , b = {};
        if (36 == (a = a.replace(/[^0-9]/g, "")).length ? a += "00000000000" : 46 == a.length && (a += "0"),
            44 != a.length && 46 != a.length && 47 != a.length && 48 != a.length)
            b.sucesso = !1,
                b.codigoInput = a,
                b.mensagem = "O c\xf3digo inserido possui " + a.length + " d\xedgitos. Por favor insira uma numera\xe7\xe3o v\xe1lida. C\xf3digos de barras SEMPRE devem ter 44 caracteres num\xe9ricos. Linhas digit\xe1veis podem possuir 46 (boletos de cart\xe3o de cr\xe9dito), 47 (boletos banc\xe1rios/cobran\xe7a) ou 48 (contas conv\xeanio/arrecada\xe7\xe3o) caracteres num\xe9ricos. Qualquer caractere n\xe3o num\xe9rico ser\xe1 desconsiderado.";
        else if ("8" == a.substr(0, 1) && 46 == a.length && 47 == a.length)
            b.sucesso = !1,
                b.codigoInput = a,
                b.mensagem = "Este tipo de boleto deve possuir um c\xf3digo de barras 44 caracteres num\xe9ricos. Ou linha digit\xe1vel de 48 caracteres num\xe9ricos.";
        else if (this.validarCodigoComDV(a, c))
            switch (b.sucesso = !0,
            b.codigoInput = a,
            b.mensagem = "Boleto v\xe1lido",
            c) {
                case "LINHA_DIGITAVEL":
                    b.tipoCodigoInput = "LINHA_DIGITAVEL",
                        b.tipoBoleto = this.identificarTipoBoleto(a, "LINHA_DIGITAVEL"),
                        b.codigoBarras = this.linhaDigitavel2CodBarras(a),
                        b.linhaDigitavel = a,
                        b.vencimento = this.identificarData(a, "LINHA_DIGITAVEL"),
                        b.valor = this.identificarValor(a, "LINHA_DIGITAVEL");
                    break;
                case "CODIGO_DE_BARRAS":
                    b.tipoCodigoInput = "CODIGO_DE_BARRAS",
                        b.tipoBoleto = this.identificarTipoBoleto(a, "CODIGO_DE_BARRAS"),
                        b.codigoBarras = a,
                        b.linhaDigitavel = this.codBarras2LinhaDigitavel(a, !1),
                        b.vencimento = this.identificarData(a, "CODIGO_DE_BARRAS"),
                        b.valor = this.identificarValor(a, "CODIGO_DE_BARRAS")
            }
        else
            b.sucesso = !1,
                b.codigoInput = a,
                b.mensagem = "A valida\xe7\xe3o do d\xedgito verificador falhou. Tem certeza que inseriu a numera\xe7\xe3o correta?";
        return b
    }
    this.calculaMod10 = c => {
        c = c.replace(/\D/g, "");
        var a, e = 2, b = 0, d = "";
        for (a = c.length - 1; a >= 0; a--)
            d = e * parseInt(c.charAt(a)) + d,
                --e < 1 && (e = 2);
        for (a = 0; a < d.length; a++)
            b += parseInt(d.charAt(a));
        return 0 != (b %= 10) && (b = 10 - b),
            b
    }
    this.calculaMod11 = d => {
        let e = [4, 3, 2, 9, 8, 7, 6, 5]
            , f = 0
            , b = 0
            , a = 0;
        for (var c = 0; c < d.length; c++) {
            let g = e[b];
            b++,
                b %= e.length,
                f += g * parseInt(d.charAt(c))
        }
        return 0 == (a = f % 11) || 1 == a ? 0 : 10 == a ? 1 : 11 - a
    }
}

const conversorCodigoBarras = new Build();