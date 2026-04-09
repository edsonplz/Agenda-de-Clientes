// Pegando os elementos do DOM

const form = document.getElementById('contact-form');
const contactList = document.getElementById('contact-list');
const saveButton = document.getElementById('save-btn');
const search = document.getElementById('search');
const phone = document.getElementById('phone');
const exportButton = document.getElementById('export-btn');
const editIndex = document.getElementById('edit-index');

// Recuperar contatos do Local Storage ou Inicializar com um array vazio
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

// Salvar contatos no Local Storage
function saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

//Renderizar a lista de contatos
function renderContacts(filter = '') {
    contactList.innerHTML = '';

    contacts.forEach((contact, index) => {
        if (contact.name.toLowerCase().includes(filter.toLowerCase()) ||
            contact.phone.includes(filter) ||
            contact.email.toLowerCase().includes(filter.toLowerCase())
        ) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${contact.name}</td>
                <td>${contact.phone}</td>
                <td>${contact.email}</td>
                <td>
                    <button class="actions-buttons edit-btn" data-index="${index}">Editar</button>
                    <button class="actions-buttons delete-btn" data-index="${index}">Excluir</button>
                </td>
            `;
            contactList.appendChild(row);
        }
    });
}

//Aplicar mascara de telefone
document.addEventListener("DOMContentLoaded", function() {
    if(phone) {
        //Adicionando um evento de input para o campo de telefone
        phone.addEventListener("input", function(e){
            const target = e.target; // Pegando o valor do campo de telefone
            const value = target.value.replace(/\D/g, ''); // Removendo todos os caracteres que não são dígitos

            if(value.length > 0) {
                if(value.length < 2) {
                    value = `(${value}`; // Adicionando ( antes do DDD
                } else if(value.length < 7) {
                    value = `(${value.substring(0, 2)}) ${value.substring(2)}`; // adicionando ) e espaço após o DDD
                } else {
                    value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`; // adicionando - após os primeiros 5 dígitos
                }
            }
            target.value = value; // Atualizando o valor do campo de telefone com a formatação aplicada
        })
    }
})

// validar Numero de telefone
async function validatePhone(phone) {
    const apiKey = 'fc04abe721bc8e96db34d3a9f2e2f1ae'; // Pegando chave da API do numverify
    const formattedPhone = phone.replace(/\D/g, ''); // Removendo caracteres não numéricos do telefone

    try {
        const response = await fetch(`http://apilayer.net/api/validate?access_key=${apiKey}&number=${formattedPhone}`); // Fazendo a requisição para a API do numverify
        const data = await response.json(); // Convertendo a resposta para JSON

        if (!data.valid) {
            alert('Número de telefone inválido. Por favor, insira um número válido.'); // Exibindo uma mensagem de erro para o usuário
            return false; // Retornando falso para indicar que o número de telefone é inválido
        }
        return true; // Retornando verdadeiro para indicar que o número de telefone é válido
        
    } catch (error) {
        console.error('Erro ao validar o número de telefone:', error); // Exibindo uma mensagem de erro para o usuário no console
        alert('Ocorreu um erro ao validar o número de telefone. Por favor, tente novamente mais tarde.'); // Exibindo uma mensagem de erro para o usuário na tela
        return false;
    }
}