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