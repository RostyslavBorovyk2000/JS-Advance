'use strict'

const API = "https://ajax.test-danit.com/api/swapi/films";
const root = document.querySelector("#root");
const charactersArr = [];


const renderFilms = (films) => {
    const filmsList = document.createElement("ul");
    filmsList.classList.add("films");

    films.forEach(({ episodeId, name, openingCrawl, characters }) => {
        charactersArr.push(characters);
        filmsList.innerHTML += `
			<li class="films__card">
				<h2 class="films__name">${name}</h2>
				<p class="films__episode">Episode: ${episodeId}</p>
				<p class="films__descr">
					${openingCrawl}
				</p>
				<div class="actors">
					<ul class="lds-spinner spinner">
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
					</ul>
				</div>
			</li>
		`;
    });

    getCharacters(charactersArr);

    root.append(filmsList);
};

// Якщо запити виконалися успішно, то викликається функція renderCharacters, яка отримує масив даних про charactersArr масив
//  елементів HTML, куди потрібно вставити список actors та index
//  Для кожного елементу actors[index] додається заголовок <h2> та елемент списку <ul> до якого додаються дані про акторів

const renderCharacters = (charactersArr, actors, index) => {
    const actorsList = document.createElement("ul");
    actorsList.classList.add("actors__list");

    charactersArr.forEach(({ name }) => {
        actorsList.innerHTML += `
						<li class="actors__name">${name}</li>
					`;
    });

    actors[index].innerHTML = `<h2 class="actors__title">Actors:</h2>`;
    actors[index].append(actorsList);
};

// Функція getFilms() використовує fetch() для отримання даних про фільми з API за допомогою вказаної адреси API.
// Після успішного отримання відповіді вона викликає функцію renderFilms(), передаючи в якості аргументу отриманий масив фільмів.
//  У випадку помилки вона виводить повідомлення про помилку.

const getFilms = (url) => {
    fetch(url)
        .then((response) => response.json())
        .then(renderFilms)
        .catch((err) => alert(err.message));
};

// Функція getCharacters() отримує масив charactersArr, який містить URL-адреси персонажів, що з'являються у фільмах,
// і для кожного фільму запускає послідовність запитів на сервер, щоб отримати дані про кожного персонажа.
//  Функція використовує Promise.all() для запуску послідовності запитів, що повертає масив результатів запитів на сервер.

const getCharacters = (charactersArr) => {
    charactersArr.forEach((characters, index) => {
        const promiceArr = [];

        characters.forEach((characterUrl) => {
            promiceArr.push(fetch(characterUrl).then((response) => response.json()));
        });

        Promise.all(promiceArr)
            .then((charactersArr) => {
                const actors = document.querySelectorAll(".actors");
                renderCharacters(charactersArr, actors, index);
            })
            .catch((err) => alert(err.message));
    });
};

getFilms(API);






