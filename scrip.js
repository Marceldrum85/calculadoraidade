// Algoritmo

// CALCULARIMC
// 1. Pegar os valores
// 2. Calcular o IMC
// 3. Gerar a classificação do IMC
// 4. Organizar as informações
// 5. Salvar os dados na lista
// 6. Ler a lista com os dados
// 7. Renderizar o conteudo no html
// 8. Botão de limpar os registros 


//Função principal
function cadastrarIdade(event) {
    // Previne que a tela se recarregue quando a função for executada

    event.preventDefault() 

    console.log("Funcionante!!!");

    let dadosUsuario = pegarValores();

    let idade = calcularIdade( dadosUsuario.dia, dadosUsuario.mes, dadosUsuario.ano)
    

    let classificacaoIdade = classificarIdade(idade);
    console.log(classificacaoIdade);

    let dadosUsuarioAtualizado = organizarDados(dadosUsuario, idade, classificacaoIdade);

    // Executa a função cadastrarUsuario passando como parametro o usuarioAtualizado
    cadastrarUsuario(dadosUsuarioAtualizado);
}



// passo 1 pegar valores

function pegarValores() {
     // Obtém os valores que foram digitados em cada elemento identificados pelo ID
    let nomeRecebido = document.getElementById("nome").value.trim();

    let diaRecebido = parseInt(document.getElementById("dia-nascimento").value);

    let mesRecebido = parseInt(document.getElementById("mes-nascimento").value);

    let anoRecebido = parseInt(document.getElementById("ano-nascimento").value);

    // Cria um objeto salvando os valores obtidos nos atributos
    let dadosUsuario = {
        nome: nomeRecebido,
        dia: diaRecebido,
        mes: mesRecebido,
        ano: anoRecebido  
    }

    console.log(dadosUsuario);

    // Retorna o objeto dadosUsuario
    return dadosUsuario

}

// passo 2 calcular Idade

    function calcularIdade(diaNascimento, mesNascimento, anoNascimento) {
        let hoje = new Date();
    
        // Diferença da idade sem mês e dia
        let idade = hoje.getFullYear() - anoNascimento;
    
        // Se o mês atual é maior que o do aniversário, então ele fez mais um ano de vida
        if (hoje.getMonth() > mesNascimento) {
            idade++;
        } 
        
        // Se os meses são os mesmos mas os dias atuais são maiores ou iguais ao dia de aniversário, então ele fez mais um ano de vida
        else if (hoje.getMonth() == mesNascimento && hoje.getDate() >= diaNascimento) {
            idade++;
        }


    console.log(idade);

    return idade;

}

// passo 3 Gerar a faixa Etaria

function classificarIdade(idade) {
    
   /* Resultado            Faixa
    0 à 12                Criança
    13 à 17                Adolescente
    18 à 65               Adulto
    Acima de 65         Idoso*/


    if (idade <=12 ){

        return "Voce ainda é crianca!!!";

    }else if (idade >12 && idade <=17){

        return "Voce ainda é Adolecente!!!"

    }else if (idade >=18 && idade <=65){

        return "Voce ja é Adulto!!!"

    }else{
        
        return "Idoso!!!"
    }
}

// passo 4 Organizar o objeto pessoa para salvar na lista

function organizarDados(dadosUsuario, idadeUsuario, classificacaoIdade) {


// Cria um novo objeto passando os atributos do objeto anterior e acrescenta novos atributos

let dadosUsuarioAtualizado = {
    ...dadosUsuario,
    idade: idadeUsuario,
    classificacao: classificacaoIdade

}
console.log(dadosUsuarioAtualizado);

return dadosUsuarioAtualizado;

}

//Passo 5 - Salvar

//Passo 5 - Salvar
function cadastrarUsuario(usuario) {
    // Cria um array vazio
    let listaUsuarios = [];

    // Verifica se existe o item "usuariosCadastrados" no localStorage
    //if (localStorage.getItem("usuariosCadastrados") == true) {
    if (localStorage.getItem("usuariosCadastrados")) {
        // Caso o item exista ele converte e salva no array criado
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    // Acrescenta o usuario recebido a lista
    listaUsuarios.push(usuario)

    // Salva o item "usuariosCadastrados" no localStorage com o conteudo do array convertido para string
    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
}


// Passo 6 - Ler lista
function carregarUsuarios() {
    // Cria um array vazio
    let listaUsuarios = [];

    // Verifica se existe o item "usuariosCadastrados" no localStorage
    if (localStorage.getItem("usuariosCadastrados")) {
        // Caso o item exista ele converte e salva no array criado
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    // Verifica se o tamanho do array é igual a zero
    if (listaUsuarios.length == 0) {
        // Se o tamanho do array for igual a zero,
        // Obtém o elemento html (tabela) pelo ID
        let tabela = document.getElementById("corpo-tabela");

        //Cria uma linha na tabela com a mensagem "Nenhum usuario cadastrado!""
        tabela.innerHTML = `<tr class="linha-mensagem">
        <td colspan="6">Nenhum usuario cadastrado!</td>
    </tr>`

    }else{
        // Se o tamanho do array for diferente de zero, ou seja tem algum item dentro do array
        // Executa a função montarTabela
        montarTabela(listaUsuarios);
    }
}

// Adiciona o evento a janela/navegador que executa a função carregarUsuarios quando o DOM estiver carregado
window.addEventListener('DOMContentLoaded', () => carregarUsuarios());


// Passo 7 - Montar tabela
function montarTabela(listaDeCadastrados) {
    // Obtém o elemento html (tabela) pelo ID
    let tabela = document.getElementById("corpo-tabela");

    // Cria uma variavel vazia
    let template = '';

    // console.log(listaDeCadastrados);

    // Obtém cada item dentro do array listaDeCadastrados
    listaDeCadastrados.forEach(pessoa => {
        // Cria uma linha de tabela mesclando tag html e valor dos atributos do objeto que esta dentro do array
        // E adiciona um bloco de codigo igual o a baixo dentro da variavel template para cada elemento do array
        template += `<tr>
        <td data-cell="nome">${pessoa.nome} </td>
                        <td data-cell="data de nascimento">${pessoa.dia}/ ${pessoa.mes}/ ${pessoa.ano}/</td>
                        <td data-cell="idade">${pessoa.idade}</td>
                        <td data-cell="faixa etária">${pessoa.classificacaoIdade}</td>
    </tr>`
    });

    // Adiciona o conteudo que esta dentro da variavel template ao elemento tabela
    tabela.innerHTML = template;
}

// Passo 8 - Limpar local storage
function deletarRegistros() {
    // Remove o item "usuariosCadastrados" do localStorage
    localStorage.removeItem("usuariosCadastrados")

    // Recarrega a pagina
    window.location.reload();
}  