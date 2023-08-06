const container = document.createElement('div');
const conteudo = document.createElement('div');
const fonte = document.createElement('style');
const titulo = document.createElement('h1');
const inputTexto = document.createElement('input');
const botao = document.createElement('button');
const lista = document.createElement('ul');

container.className = 'container';
conteudo.className = 'conteudo';

titulo.textContent = 'Lista de tarefas';


inputTexto.type = 'text';
inputTexto.className = 'input-tarefa';
inputTexto.placeholder = 'Escreva sua tarefa';

botao.className = 'btn-tarefa';
botao.textContent = 'Enviar Tarefa';

lista.className = 'tarefas';

//colocar os componentes no html 

document.head.appendChild(fonte)
document.body.appendChild(container); 

container.appendChild(conteudo);

conteudo.appendChild(titulo);
conteudo.appendChild(inputTexto);
conteudo.appendChild(botao);
conteudo.appendChild(lista);

inputTexto.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        if (!inputTexto.value) return;
        criaTarefa(inputTexto.value);
    }
});

function limparInput() {
    inputTexto.value = '';
    inputTexto.focus();
}

function criaBotaoApagar(li) {
    const botaoApagar = document.createElement('button');
    li.innerText += ' ';
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    li.appendChild(botaoApagar);
}

function criarLi() {
    const li = document.createElement('li');
    li.style.backgroundColor = 'gray'
    li.style.color = 'white'
    li.style.margin = '10px 10px 10px 10px'
    li.style.padding = '30px'
    li.style.borderRadius = '10px'
    li.style.textAlign = 'justify'
    li.style.fontSize = '1.4em'
    return li;
}


function criaTarefa(textInput) {
    const li = criarLi();


    const textoLi = document.createElement('h2')
    textoLi.innerText = textInput;
    li.appendChild(textoLi);

    lista.appendChild(li);
    limparInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

botao.addEventListener('click', function () {
    if (!inputTexto.value) return;
    criaTarefa(inputTexto.value);
});


document.addEventListener('click', function (e) {
    const el = e.target;
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }
});

function salvarTarefas() {
    const liTarefas = lista.querySelectorAll('li');
    const listaDeTarefas = [];

    for (const lista of liTarefas) {
        let tarefaTexto = lista.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim('');
        console.log(tarefaTexto);
        listaDeTarefas.push(tarefaTexto)

    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('lista', tarefasJSON);
}

function adicionaTarefasSalvas() {
    const lista = localStorage.getItem('lista');

    const listaDeTarefas = JSON.parse(lista);

    for (let lista of listaDeTarefas) {
        criaTarefa(lista);

    }
}

adicionaTarefasSalvas();

//estilos

fonte.innerHTML = `@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap');
.btn-tarefa:hover {
    background-color: gray;
    transition: .3s;
    color: white;
}
.apagar:hover {
    background-color: gray;
    transition: .4s;
    color: white;
}
ul {
    padding: 0px;
}

li {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    background-color: gray;
    color: white;
    border-radius: 10px;
    padding: 10px;
}

li button {
    border-radius: 10px;
    margin: 10px auto 10px auto;
    padding: 6px;
    font-family: Open Sans, sans-serif;
    borderRadius: 10px;
    cursor: pointer;
}`;

body.style.backgroundColor = 'rgb(17, 86, 102)';

container.style.backgroundColor = 'white';
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.maxWidth = '740px';
container.style.padding = '30px'
container.style.margin = '5% auto 0px auto'
container.style.borderRadius = '10px'

conteudo.style.display = 'flex'
conteudo.style.alignSelf = 'center'
conteudo.style.flexDirection = 'column'

titulo.style.fontSize = '3em'
titulo.style.textAlign = 'center'
titulo.style.fontFamily = 'Open Sans, sans-serif'
titulo.style.textTransform = 'Uppercase';

inputTexto.style.margin = '0px auto 20px auto';
inputTexto.style.width = '300px';
inputTexto.style.padding = '10px';
inputTexto.style.fontSize = '1.2em';
inputTexto.style.borderRadius = '10px';

botao.style.width = '200px';
botao.style.margin = '0px auto 20px auto';
botao.style.padding = '10px';
botao.style.fontFamily = 'Open Sans, sans-serif';
botao.style.borderRadius = '10px';
botao.style.cursor = 'pointer';
