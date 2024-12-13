let tentativas = 1;
let range = 10;
let listaNumeroSecreto = [];
let numeroSecreto = geraNumeroAleatorio();

function seleciona(id){
    return document.querySelector(id);
}

function exibeTexto(id, texto){
    let elemento = seleciona(id);
    elemento.innerHTML = `${texto}`;
}

function geraNumeroAleatorio(){
    let numeroAleatorio = parseInt(Math.random() * range + 1)
    if (listaNumeroSecreto.length == range){
        listaNumeroSecreto = [];
    }
    if (listaNumeroSecreto.indexOf(numeroAleatorio) >= 0){
        return geraNumeroAleatorio();
    } else{
        listaNumeroSecreto.push(numeroAleatorio);
        return numeroAleatorio;
    }
}

function textoInicial(){
    exibeTexto('h1', "Jogo do número secreto");
    exibeTexto('.texto__paragrafo', `Digite um número entre 1 e ${range} para iniciar`);
}

function limpaInput(){
    seleciona('.container__input').focus();
    seleciona('.container__input').value = '';
}

function reset(){
    textoInicial();
    seleciona('h1').removeAttribute('class');
    seleciona('#reiniciar').setAttribute('disabled', true);
    limpaInput();
    numeroSecreto = geraNumeroAleatorio();
    tentativas = 1;
}

textoInicial();
seleciona('.container__input').focus();

function verificarChute(){
    console.log(tentativas);
    let input = seleciona('.container__input');
    let chute = input.value;
    let textoTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let dica = numeroSecreto > chute ? 'maior' : 'menor';

    if (chute.length > 0){
        if (chute == numeroSecreto){
            if (seleciona('h1').getAttribute('class') == 'acerto'){
                reset();
            } else{
                exibeTexto('h1', "Parabéns!!")
                seleciona('h1').setAttribute('class', 'acerto');
                exibeTexto('.texto__paragrafo', `Você acertou o número secreto em ${tentativas} ${textoTentativa}`)
                seleciona('#reiniciar').removeAttribute('disabled');
            }
        } else{
            exibeTexto('h1','Tente novamente!');
            seleciona('h1').setAttribute('class', 'erro');
            exibeTexto('.texto__paragrafo', `Dica: O número secreto é ${dica}!`);
            limpaInput();
        }
        tentativas++;
    } else{
        exibeTexto('h1', "ERRO");
        seleciona('h1').setAttribute('class', 'erro');
        exibeTexto('.texto__paragrafo', 'Digite algum número!');
    }
}

addEventListener('keydown', (e) => {
    if (e.key == 'Enter'){
        if (seleciona('h1').getAttribute('class') == 'acerto'){
            reset();
        } else{
            verificarChute();
        }
    }
})