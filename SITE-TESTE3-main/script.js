// =========================================
// PROJETO MAR - SCRIPT GLOBAL
// HOME + LOGIN
// =========================================

"use strict";

// =========================================
// INICIALIZAÇÃO GLOBAL
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    iniciarHome();

    iniciarLogin();
});

// =========================================
// HOME - INTRODUÇÃO CINEMATOGRÁFICA
// =========================================

function iniciarHome() {

    // =====================================
    // BOTÃO PRINCIPAL HOME
    // =====================================

    const botaoEntrar =
        document.querySelector(".epic-button");

    // =====================================
    // SE NÃO EXISTIR BOTÃO HOME
    // ENCERRA ESTA FUNÇÃO
    // =====================================

    if (!botaoEntrar) {
        return;
    }

    // =====================================
    // TRANSIÇÃO PARA LOGIN
    // =====================================

    window.irParaLogin = function () {

        document.body.style.opacity = "0";

        document.body.style.transition =
            "opacity 0.8s ease";

        setTimeout(() => {

            window.location.href =
                "login.html";

        }, 800);
    };

    // =====================================
    // ÁUDIO CINEMATOGRÁFICO
    // =====================================

    window.tocarMusica = function (id) {

        const som =
            document.getElementById(id);

        if (!som) {
            return;
        }

        const todosAudios =
            document.querySelectorAll("audio");

        const duracaoFade = 800;

        // =================================
        // FADE OUT
        // =================================

        const fadeOut = (audio) => {

            if (!audio || audio.paused) {
                return;
            }

            const intervaloFade =
                setInterval(() => {

                    if (audio.volume > 0.05) {

                        audio.volume -= 0.05;

                    } else {

                        audio.pause();

                        audio.currentTime = 0;

                        audio.volume = 1;

                        clearInterval(intervaloFade);
                    }

                }, duracaoFade / 20);
        };

        // =================================
        // MESMO ÁUDIO
        // =================================

        if (!som.paused) {

            fadeOut(som);

            return;
        }

        // =================================
        // PARA OUTROS ÁUDIOS
        // =================================

        todosAudios.forEach((audio) => {

            if (audio !== som) {

                fadeOut(audio);
            }
        });

        // =================================
        // FADE IN
        // =================================

        som.volume = 0;

        som.play()

            .then(() => {

                const intervaloFadeIn =
                    setInterval(() => {

                        if (som.volume < 0.95) {

                            som.volume += 0.05;

                        } else {

                            som.volume = 1;

                            clearInterval(intervaloFadeIn);
                        }

                    }, duracaoFade / 20);
            })

            .catch((erro) => {

                console.error(
                    "Erro ao reproduzir áudio:",
                    erro
                );
            });
    };
}

// =========================================
// LOGIN - PROJETO MAR
// =========================================

function iniciarLogin() {

    // =====================================
    // FORMULÁRIO LOGIN
    // =====================================

    const formLogin =
        document.getElementById("form-login");

    // =====================================
    // GUARD CLAUSE
    // =====================================

    if (!formLogin) {
        return;
    }

    // =====================================
    // INPUT NOME
    // =====================================

    const campoNome =
        document.getElementById(
            "campo-login-nome"
        );

    // =====================================
    // BOTÃO LOGIN
    // =====================================

    const botaoEntrar =
        document.getElementById(
            "btn-login-entrar"
        );

    // =====================================
    // VALIDAÇÃO ESTRUTURAL
    // =====================================

    if (!campoNome || !botaoEntrar) {

        console.error(
            "Elementos do login não encontrados."
        );

        return;
    }

    // =====================================
    // SUBMIT FORMULÁRIO
    // =====================================

    formLogin.addEventListener("submit", (e) => {

        // =================================
        // BLOQUEIA RELOAD
        // =================================

        e.preventDefault();

        e.stopPropagation();

        // =================================
        // CAPTURA NOME
        // =================================

        const nomeDigitado =
            campoNome.value.trim();

        // =================================
        // VALIDAÇÃO
        // =================================

        if (!nomeDigitado) {

            campoNome.focus();

            return;
        }

        // =================================
        // SALVA LOCALSTORAGE
        // =================================

        try {

            localStorage.setItem(
                "nomeHeroi",
                nomeDigitado
            );

        } catch (erro) {

            console.error(
                "Erro ao salvar localStorage:",
                erro
            );
        }

        // =================================
        // DESABILITA BOTÃO
        // =================================

        botaoEntrar.disabled = true;

        // =================================
        // TRANSIÇÃO VISUAL
        // =================================

        document.body.style.opacity = "0";

        document.body.style.transition =
            "opacity 0.6s ease";

        // =================================
        // REDIRECIONAMENTO
        // =================================

        setTimeout(() => {

            window.location.replace(
                "busca.html"
            );

        }, 600);
    });
}