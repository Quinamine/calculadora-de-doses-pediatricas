location.href.includes('authz=1') && (() => {
    const body = document.querySelector("body");
    const caixaAlerta = document.querySelector(".caixa-alerta");
    const desfoque = document.querySelector(".blurring-div");
    body.classList.remove("--overflow-h");
    caixaAlerta.classList.add("--display-none");
    desfoque.classList.remove("--on");
})();