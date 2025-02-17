const main = document.querySelector("main");
const container = main.querySelector(".container");
const config_container = main.querySelector(".config_container");
const clock_timer = main.querySelector("#clock-time");
const btn_start = main.querySelector("#btn_start");
const btn_pause = main.querySelector("#btn_pause");

const input_minutos_trabalho = config_container.querySelector("#minutos");
const input_minutos_pausa = config_container.querySelector("#minutos_pausa");
const button_config = container.querySelector("#btn_config");
const button_save = config_container.querySelector("#btn_save");

let minutos_trabalho = 0;
let minutos_pausa = 0;
let tempo_restante = 0;
let timer_ativo = false;
let modo_pausa = false;
let timer_interval;

const formatTime = (minutes, seconds) => {
    return `
    ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const toggleConfigPanel = () => {
    config_container.style.display =
        config_container.style.display === "grid" ? "none" : "grid";
    container.style.display =
        config_container.style.display === "grid" ? "none" : "flex";
};

const validateAndSaveConfig = () => {
    minutos_trabalho = parseInt(input_minutos_trabalho.value);
    minutos_pausa = parseInt(input_minutos_pausa.value);

    const error_minutos = document.getElementById("error-minutos");
    const error_minutos_pausa = document.getElementById("error-minutos-pausa");
    let has_error = false;

    resetErrorsConfig();

    if (isNaN(minutos_trabalho) || minutos_trabalho < 15) {
        displayError(
            error_minutos,
            "Mínimo de 15 minutos.",
            input_minutos_trabalho,
            "error-input"
        );
        has_error = true;
    }
    if (isNaN(minutos_pausa) || minutos_pausa < 5) {
        displayError(
            error_minutos_pausa,
            "Mínimo de 5 minutos.",
            input_minutos_pausa,
            "error-input"
        );
        has_error = true;
    }

    if (has_error) return;

    tempo_restante = minutos_trabalho * 60;
    clock_timer.textContent = formatTime(minutos_trabalho, 0);

    toggleConfigPanel();
};

const displayError = (element, message, input, name) => {
    element.textContent = message;
    element.style.display = "block";
    input.classList.add(name);
};

const resetErrorsConfig = () => {
    const error_minutos = document.getElementById("error-minutos");
    const error_minutos_pausa = document.getElementById("error-minutos-pausa");

    error_minutos.textContent = "";
    error_minutos.style.display = "none";

    error_minutos_pausa.textContent = "";
    error_minutos_pausa.style.display = "none";

    input_minutos_trabalho.classList.remove("error-input");
    input_minutos_pausa.classList.remove("error-input");
};

const startTimer = () => {
    if (timer_ativo) return;

    timer_ativo = true;
    timer_interval = setInterval(updateTimer, 1000);
};

const updateTimer = () => {
    if (tempo_restante <= 0) {
        handleTimerEnd();
        return;
    }

    tempo_restante--;
    const minutos = Math.floor(tempo_restante / 60);
    const segundos = tempo_restante % 60;
    clock_timer.textContent = formatTime(minutos, segundos);
};

const handleTimerEnd = () => {
    if (!modo_pausa) {
        clearInterval(timer_interval);
        timer_ativo = false;
        modo_pausa = true;
        tempo_restante = minutos_pausa * 60;
        clock_timer.textContent = formatTime(minutos_pausa, 0);
        startTimer();
    } else {
        clearInterval(timer_interval);
        timer_ativo = false;
        modo_pausa = false;
    }
};

const pauseTimer = () => {
    clearInterval(timer_interval);
    timer_ativo = false;
};

button_config.addEventListener("click", toggleConfigPanel);
button_save.addEventListener("click", validateAndSaveConfig);
btn_pause.addEventListener("click", pauseTimer);
btn_start.addEventListener("click", startTimer);


import StyleMode from "./modules/StyleMode.js";
StyleMode()