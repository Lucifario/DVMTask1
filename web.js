async function fetchBooks(searchTerm) {
    const url = `https://book-finder1.p.rapidapi.com/api/search?${searchTerm}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bf0645b0bbmshe24eacf6a22b898p1418e8jsncd1a7332aef3',
            'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        displayBooks(result);
    } catch (error) {
        console.error('Error:', error.message);
    }
}
function addToFavorites(event) {
    const book = event.target.closest('.book');
    const title = book.querySelector('h2').textContent.replace('Title: ', '');
    const author = book.querySelector('p:nth-child(2)').textContent.replace('Author: ', '');
    const isbn = book.querySelector('p:nth-child(4)').textContent.replace('ISBN: ', '');

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push({ title, author, isbn });
    localStorage.setItem('favorites', JSON.stringify(favorites));

    alert('Book added to favorites!');
}
document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', addToFavorites);
});
document.querySelector('.fa-heart').addEventListener('click', function() {
    window.location.href = 'favorite.html';
});
function displayBooks(books) {
    const bookContainer = document.querySelector('.books-container');
    bookContainer.innerHTML = ''; 
    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');

        const titleElement = document.createElement('h2');
        titleElement.textContent = `Title: ${book.title}`;

        const authorElement = document.createElement('p');
        authorElement.textContent = `Author: ${book.author}`;

        const summaryElement = document.createElement('p');
        summaryElement.textContent = `Summary: ${book.summary}`;

        const isbnElement = document.createElement('p');
        isbnElement.textContent = `ISBN: ${book.isbn}`;

        const releaseDateElement = document.createElement('p');
        releaseDateElement.textContent = `Release Date: ${book.release_date}`;

        bookElement.appendChild(titleElement);
        bookElement.appendChild(authorElement);
        bookElement.appendChild(summaryElement);
        bookElement.appendChild(isbnElement);
        bookElement.appendChild(releaseDateElement);

        bookContainer.appendChild(bookElement);
    });
}
function handleSearch() {
    const searchTerm = document.querySelector('#search-box').value;
    fetchBooks(`book_name=${searchTerm}&author_name=${searchTerm}`);
}
document.querySelector('#search-btn').addEventListener('click', handleSearch);
async function fetchAllBooks() {
    const url = 'https://book-finder1.p.rapidapi.com/api/search';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bf0645b0bbmshe24eacf6a22b898p1418e8jsncd1a7332aef3',
            'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        displayBooks(result);
    } catch (error) {
        console.error('Error:', error.message);
    }
}
document.querySelector('.navbar a[href="features.html"]').addEventListener('click', function(event) {
    event.preventDefault();
    fetchAllBooks(); 
});
window.onscroll = () => {
    if (window.scrollY > 80) {
        document.querySelector('.header-2').classList.add('active');
    } else {
        document.querySelector('.header-2').classList.remove('active');
    }
};
window.onload = () => {
    if (window.scrollY > 80) {
        document.querySelector('.header-2').classList.add('active');
    } else {
        document.querySelector('.header-2').classList.remove('active');
    }
};
