//função que obtem os dados do agendamento do colaborador
function agendaColaborador (){
    var nomeColaborador = document.getElementById("nome").value;
    var escritorioSelecionado = document.getElementById("cidade").value
    var dataAgendada = document.getElementById("data").value
    var numEstacao = document.getElementById("estacao").value
    
    document.getElementById("nome").value = "";//limpar campo do nome
    var dadosColaborador = {nome: nomeColaborador, data: dataAgendada, escritorio: escritorioSelecionado, estacao: numEstacao};
    return dadosColaborador;
}

//função que gera um vetor com o número de vagas ocupadas (inicializa com zero) de cada estação para um dia da semana (ex: segunda, terça, etc)
function vagasDiaSemana (numEstacoes){
    var diaSemana = []
    for (var i=0; i<numEstacoes; i++){
        diaSemana.push(0)
    }
    return diaSemana
}

//função que gera um array de duas dimensões com as vagas ocupadas de todos os dias da semana para um escritório
function vagasEscritorio (numEstacoes, numDias){
    var escritorio = []
    for (var i=0; i<numDias;i++){
        var diaSemana = vagasDiaSemana(numEstacoes)
        escritorio.push(diaSemana)
    }
    return escritorio
}

var numEstacoes = 4 //quantidade de estações
var numDias = 5 //cinco dias úteis

var escritorioSP = vagasEscritorio(numEstacoes,numDias);
var escritorioSantos = vagasEscritorio(numEstacoes,numDias);

var agendamento = [escritorioSP, escritorioSantos]; //array de três dimensões com as vagas ocupadas de todos os escritórios

console.log(agendamento)

//Transforma a string do nome do escritório em número: índice para ser usado no agendamento
function escritorioParaNum (dadosColaborador){
    for (var i=0;i<agendamento.length;i++){
        if (dadosColaborador.escritorio=='sp'){
            var numEscritorio = 0
        } else if(dadosColaborador.escritorio=='santos'){
            var numEscritorio = 1
        }
    }
    return numEscritorio
}

//Transforma a string do dia da semana em número: índice para ser usado no agendamento
function diaSemanaParaNum (dadosColaborador) {
    for (var i=0;i<escritorioSP.length;i++){
        if (dadosColaborador.data=='segunda'){
            var numDia=0
        } else if (dadosColaborador.data=='terca'){
            var numDia=1
        } else if (dadosColaborador.data=='quarta'){
            var numDia=2
        } else if (dadosColaborador.data=='quinta'){
            var numDia=3
        } else if (dadosColaborador.data=='sexta'){
            var numDia=4
        }
    }
    return numDia
}

//Tranforma a string do número da estação em índice para ser usado no agendamento
function estacaoParaNum (dadosColaborador){ 
    var numEstacao = parseFloat(dadosColaborador.estacao)-1
    return numEstacao
}

var numMaxVagasPorEstacao = 3 //número máximo de vagas por estação
var listaColabAgendados =[] //vetor para guardar as informações dos colaboradores agendados

function agendar() {
    var novoAgendamento = agendaColaborador()
    listaColabAgendados.push(novoAgendamento)// adiciona colaborador na lista de funcionários agendados
    console.log(listaColabAgendados)

    //obtem índices da posição do escritório, dia e estação no array do agendamento
    var numEscritorio = escritorioParaNum(novoAgendamento)
    var numDia = diaSemanaParaNum (novoAgendamento)
    var numEstacao = estacaoParaNum (novoAgendamento)

    var resultado = document.getElementById("resultado")

    if (agendamento[numEscritorio][numDia][numEstacao]<numMaxVagasPorEstacao){
        agendamento[numEscritorio][numDia][numEstacao]++
        resultado.innerHTML = "Agendamento realizado com sucesso!"
    } else {
        resultado.innerHTML = `Estação ${novoAgendamento.estacao} lotada nesse dia. Tente outra estação ou outro dia`
    }
    console.log(agendamento)
};