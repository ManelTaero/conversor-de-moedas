// TAXAS DE CÂMBIO
const taxas = {
    MZN: 1,
    USD: 1 / 63.91,
    EUR: 1 / 71.52,
    ZAR: 1 / 3.86
};

// SÍMBOLOS
const simbolos = {
    MZN: "MT",
    USD: "USD",
    EUR: "EUR",
    ZAR: "ZAR"
};

// ELEMENTOS HTML
const amount = document.getElementById("amount");
const from = document.getElementById("from");
const to = document.getElementById("to");
const output = document.getElementById("output");
const rate = document.getElementById("rate");
const error = document.getElementById("error");

let valorAtual = "0";

// ACTUALIZAR E CONVERTER
function atualizar() {
    amount.value = valorAtual || "0";
    converter();
}

// FORMATAR NÚMEROS
function formatar(valor, moeda) {
    return new Intl.NumberFormat("pt-MZ", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valor) + " " + simbolos[moeda];
}

// CONVERTER MOEDAS
function converter() {
    let valor = Number(valorAtual);

    error.textContent = "";

    if (valorAtual === "" || !Number.isFinite(valor) || valor < 0) {
        output.textContent = "—";
        rate.textContent = "Introduza um valor válido.";
        return;
    }

    let resultado = valor / taxas[from.value] * taxas[to.value];
    let taxa = taxas[to.value] / taxas[from.value];

    output.textContent = formatar(resultado, to.value);
    rate.textContent = `1 ${from.value} = ${taxa.toFixed(6)} ${to.value}`;
}

// BOTÕES NUMÉRICOS
document.querySelectorAll("[data-number]").forEach(botao => {
    botao.addEventListener("click", () => {
        if (valorAtual.length >= 15) return;

        let numero = botao.dataset.number;
        valorAtual = valorAtual === "0" ? numero : valorAtual + numero;

        atualizar();
    });
});

// APAGAR ÚLTIMO NÚMERO
document.getElementById("delete").addEventListener("click", () => {
    valorAtual = valorAtual.slice(0, -1);
    atualizar();
});

// PONTO DECIMAL
document.getElementById("decimal").addEventListener("click", () => {
    if (!valorAtual.includes(".")) {
        valorAtual += valorAtual === "" ? "0." : ".";
        atualizar();
    }
});

// TROCAR MOEDAS
document.getElementById("swap").addEventListener("click", () => {
    [from.value, to.value] = [to.value, from.value];
    converter();
});

// CONFIRMAR CONVERSÃO
document.getElementById("keyOK").addEventListener("click", () => {
    converter();
    error.textContent = "Conversão realizada!";
});

// LIMPAR TUDO
document.getElementById("clear").addEventListener("click", () => {
    valorAtual = "";
    amount.value = "0";
    output.textContent = "—";
    rate.textContent = "Introduza um valor para começar.";
    error.textContent = "";
});

// ACTUALIZAÇÃO AUTOMÁTICA
from.addEventListener("change", converter);
to.addEventListener("change", converter);

// INICIAR
atualizar();
