"use strict";

// =========================================
// API GEMINI
// =========================================

const apiKey =
    "AIzaSyDCoguuQUTVRRHq3XeS7SMDvaEIfy0OceQ";

// =========================================
// ELEMENTOS
// =========================================

const formBusca =
    document.getElementById("form-busca");

const campoBusca =
    document.getElementById("campo-busca");

const resultadoLoading =
    document.getElementById("resultado-loading");

const conteudoTexto =
    document.getElementById("conteudo-texto");

const resultadoPesquisa =
    document.getElementById("resultado-pesquisa");

// =========================================
// NOME HERÓI
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    const nomeSalvo =
        localStorage.getItem("nomeHeroi");

    const nomeHeroi =
        document.getElementById("nome-heroi");

    if (nomeSalvo && nomeHeroi) {

        nomeHeroi.textContent =
            nomeSalvo;
    }

});

// =========================================
// FORMATAR TEXTO
// =========================================

function formatarTexto(texto) {

    let html = texto;

    // =====================================
    // TÍTULOS
    // =====================================

    html = html.replace(
        /^### (.*$)/gim,
        "<h3>$1</h3>"
    );

    html = html.replace(
        /^## (.*$)/gim,
        "<h2>$1</h2>"
    );

    html = html.replace(
        /^# (.*$)/gim,
        "<h1>$1</h1>"
    );

    // =====================================
    // NEGRITO
    // =====================================

    html = html.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );

    // =====================================
    // ITÁLICO
    // =====================================

    html = html.replace(
        /\*(.*?)\*/g,
        "<em>$1</em>"
    );

    // =====================================
    // LINHAS HORIZONTAIS
    // =====================================

    html = html.replace(
        /^---$/gim,
        "<hr>"
    );

    // =====================================
    // LISTAS
    // =====================================

    html = html.replace(
        /^\* (.*$)/gim,
        "• $1"
    );

    // =====================================
    // QUEBRAS DE LINHA
    // =====================================

    html = html.replace(
        /\n/g,
        "<br>"
    );

    return html;
}

// =========================================
// CONSULTAR GEMINI
// =========================================

async function consultarGemini(pergunta) {

    const url =
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

    try {

        const response = await fetch(url, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                contents: [
                    {
                        parts: [
                            {
                                text: pergunta
                            }
                        ]
                    }
                ]

            })

        });

        if (!response.ok) {

            throw new Error(
                "Erro na API Gemini."
            );
        }

        const data =
            await response.json();

        console.log(data);

        return data?.candidates?.[0]?.content?.parts?.[0]?.text
            || "Nenhuma resposta encontrada.";

    } catch (erro) {

        console.error(erro);

        return "O Oráculo não conseguiu responder agora.";
    }

}

// =========================================
// SUBMIT FORM
// =========================================

formBusca.addEventListener("submit", async (event) => {

    event.preventDefault();

    const pergunta =
        campoBusca.value.trim();

    if (!pergunta) return;

    resultadoLoading.classList.remove("hidden");

    resultadoPesquisa.classList.add("hidden");

    const resposta =
        await consultarGemini(pergunta);

    resultadoLoading.classList.add("hidden");

    conteudoTexto.innerHTML =
        formatarTexto(resposta);

    resultadoPesquisa.classList.remove("hidden");

});