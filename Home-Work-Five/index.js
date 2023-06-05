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





















// class Card {
//     constructor(name,username,email,title,body) {
//         this.name = name
//         this.username = username
//         this.email = email
//         this.title = title
//         this.body = body
//     }
//
//     render(){
//         const body = document.querySelector("body");
//         body.insertAdjacentHTML('beforeend', `<div class="card">
//                 <h3 class="nyk-name">#${this.username}</h3>
//                 <h4 class="name-user">${this.name}</h4>
//                 <a class="mail-user" href="${this.email}" type="mail">${this.email}</a>
//                 <p class="post">${this.title}</p>
//                 <p class="body-key">${this.body}</p>
//             <button class="btn-delete">Видалити</button>
//             </div>`);
//     }
// }
// axios.get('https://ajax.test-danit.com/api/json/users')
//     .then(({data}) => {
//         debugger
//          data.forEach(({name,username,email,id}) => {
//              const idOne = id;
//              axios.get('https://ajax.test-danit.com/api/json/posts')
//                  .then(({data}) => {
//                      data.forEach(({id,title,body}) => {
//                          const idTwo = id;
//                          if (idOne === idTwo){
//                              new Card(name,username,email,title,body).render()
//                          }
//                      })
//                  })
//          })
//     });







