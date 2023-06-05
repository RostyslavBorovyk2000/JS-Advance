'use strict'


class Card {
    fetchData(){
        const urlOne = 'https://ajax.test-danit.com/api/json/users';
        const urlTwo = 'https://ajax.test-danit.com/api/json/posts';
        const request1 = axios.get(urlOne);
        const request2 = axios.get(urlTwo);
        return axios.all([request1, request2])
            .then(axios.spread((response1, response2) => {
                const keysGroup1 = response1.data;
                const keysGroup2 = response2.data;
                this.renderCards(keysGroup1, keysGroup2);
            }))
            .catch(error => {
                console.error('Помилка при отриманні даних:', error);
            });
    }

    renderCards(keysGroup1, keysGroup2) {
        const body = document.querySelector("body");
        const cardSet = new Set();
        keysGroup1.forEach(user => {
            keysGroup2.forEach(post => {
                if (user.id === post.id) {
                    const cardId = `${user.id}-${post.id}`;
                    if (!cardSet.has(cardId)) {
                        cardSet.add(cardId);
                        body.insertAdjacentHTML('beforeend', `<div class="card">
            <h3 class="nyk-name">#${user.username}</h3>
            <h4 class="name-user">${user.name}</h4>
            <p class="post">${post.title}</p>
            <p class="body-key">${post.body}</p>
            <button class="btn-delete">Видалити</button>
          </div>`);
                    }
                }
            });
        });

        const btn = document.querySelectorAll('.btn-delete');
        console.log(btn)

    }
}
new Card().fetchData();




















