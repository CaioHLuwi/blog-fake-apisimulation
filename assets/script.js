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

        for(i of data){
            //Adiciona todos os elementos necessários para criação de um post
            const divElement = document.createElement('div');
            const h2Element = document.createElement('h2');
            const paragraphElement = document.createElement('p');
            const hrElement = document.createElement('hr');

            //Insere o titulo e corpo do post dentro dos elementos criados anteriormente
            h2Element.textContent = `${data[i].title}`
            paragraphElement.textContent = `${data[i].body}`
            
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

readPosts();