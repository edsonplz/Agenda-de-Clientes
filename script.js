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