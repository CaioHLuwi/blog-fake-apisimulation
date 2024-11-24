// https://jsonplaceholder.typicode.com/posts
async function readPosts() {
    const spanElement = document.createElement('span');
    let postArea = document.querySelector('.posts');
    // Requisição para encontrar os dados na API através do método GET
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let data = await response.json(); // JSON recebido e convertido para um objeto JS
    let loadingPosts = spanElement.textContent = 'Carregando...'; // Texto fictício enquanto não é encontrado nenhuma informação na API.
    postArea.append(loadingPosts);

    if(data.length > 0 ){
        postArea.innerHTML = ''

        for(let post in data){
            //Adiciona todos os elementos necessários para criação de um post
            const divElement = document.createElement('div');
            const h2Element = document.createElement('h2');
            const paragraphElement = document.createElement('p');
            const hrElement = document.createElement('hr');

            //Insere o titulo e corpo do post dentro dos elementos criados anteriormente
            h2Element.textContent = `${data[post].title}`
            paragraphElement.textContent = `${data[post].body}`
            
            // Acrescenta todos os elementos dentro da div logs chamada postArea.
            postArea.append(divElement);
            divElement.append(h2Element);
            divElement.append(paragraphElement);
            divElement.append(hrElement);
        }
    } else { 
        // Caso não encontre nenhum JSON, ou seja, a requisição falhe, exibe um texto mostrando isso
        spanElement.innerText = 'Não foi encontrado nenhum post.'
    }
}

async function createPost(title, body) {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts', 
        { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                body,
                userId: 2
            })
        }
    );
    let json = response.json();

    console.log(json);    
    // Não vai ser necessário fazer nada com a resposta gerada pelo fetch nesse projeto.

    /* Aciona a função 'readPosts()' para recarregar os posts e dar a impressão de que um novo post 
    foi adicionado */

    document.querySelector('#titleField').value = '';
    document.querySelector('#contentField').value = '';
    
    readPosts();
}

let insertButton = document.querySelector('#insertButton')

insertButton.addEventListener('click', () => {
    let titlePost = document.querySelector('#titleField').value;
    let contentPost = document.querySelector('#contentField').value;

    if(titlePost != '' && contentPost != ''){
        createPost(titlePost, contentPost);
    } else {
        alert('Preencha os dois campos corretamente.');
    }
})

readPosts();