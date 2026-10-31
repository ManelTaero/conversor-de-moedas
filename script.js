
// TAXAS DE CÂMBIO
const taxas = {
    MZN: 1,
    USD: 1 / 64,
    EUR: 1 / 69,
    ZAR: 1 / 3.5
};

// SÍMBOLOS DAS MOEDAS
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
const rateText = document.getElementById("rate");
const error = document.getElementById("error");

// VARIÁVEIS
let valorAtual = "1000";

// ACTUALIZAR CAMPO
function atualizarCampo() {
    amount.value = valorAtual || "0";
}

// FORMATAR RESULTADO
function formatar(numero, moeda) {
    return new Intl.NumberFormat("pt-MZ", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numero) + " " + simbolos[moeda];
}

// FUNÇÃO DE CONVERSÃO
function converter() {

    const valor = Number(valorAtual);

    error.textContent = "";

    if (
        valorAtual === "" ||
        !Number.isFinite(valor) ||
        valor < 0
    ) {
        output.textContent = "—";
        rateText.textContent = "Introduza um valor válido.";
        return;
    }

    // Converter para Meticais
    const emMeticais = valor / taxas[from.value];

    // Converter para moeda de destino
    const resultado = emMeticais * taxas[to.value];

    // Calcular taxa directa
    const taxaDirecta =
        taxas[to.value] / taxas[from.value];

    // Apresentar resultado
    output.textContent = formatar(
        resultado,
        to.value
    );

    rateText.textContent =
        `1 ${from.value} = ${
            new Intl.NumberFormat("pt-MZ", {
                maximumFractionDigits: 6
            }).format(taxaDirecta)
        } ${to.value}`;
}

// INSERIR NÚMEROS
document.querySelectorAll("[data-number]")
.forEach(botao => {

    botao.addEventListener("click", () => {

        const numero = botao.dataset.number;

        // Limitar tamanho do valor
        if (valorAtual.length >= 15) {
            return;
        }

        // Evitar zeros desnecessários no início
        if (valorAtual === "0") {
            valorAtual = numero;
        } else {
            valorAtual += numero;
        }

        atualizarCampo();
        converter();

    });

});

// APAGAR ÚLTIMO NÚMERO
document.getElementById("delete")
.addEventListener("click", () => {

    valorAtual = valorAtual.slice(0, -1);

    atualizarCampo();
    converter();

});

// INSERIR PONTO DECIMAL
document.getElementById("decimal")
.addEventListener("click", () => {

    if (!valorAtual.includes(".")) {

        if (valorAtual === "") {
            valorAtual = "0.";
        } else {
            valorAtual += ".";
        }

        atualizarCampo();
        converter();
    }

});

// TROCAR MOEDAS
document.getElementById("swap")
.addEventListener("click", () => {

    const anterior = from.value;

    from.value = to.value;
    to.value = anterior;

    converter();

});

// CONFIRMAR CONVERSÃO
document.getElementById("keyOK")
.addEventListener("click", () => {

    converter();

    error.textContent = "Conversão realizada!";

});

// LIMPAR TUDO
document.getElementById("clear")
.addEventListener("click", () => {

    valorAtual = "";

    atualizarCampo();

    output.textContent = "—";

    rateText.textContent =
        "Introduza um valor para começar.";

    error.textContent = "";

});

// ACTUALIZAR AO TROCAR MOEDAS
from.addEventListener("change", converter);
to.addEventListener("change", converter);

// INICIAR A APLICAÇÃO
atualizarCampo();
converter();
