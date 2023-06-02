'use strict'

const books = [
    {
        author: "Люсі Фолі",
        name: "Список запрошених",
        price: 70
    },
    {
        author: "Сюзанна Кларк",
        name: "Джонатан Стрейндж і м-р Норрелл",
    },
    {
        name: "Дизайн. Книга для недизайнерів.",
        price: 70
    },
    {
        author: "Алан Мур",
        name: "Неономікон",
        price: 70
    },
    {
        author: "Террі Пратчетт",
        name: "Рухомі картинки",
        price: 40
    },
    {
        author: "Анґус Гайленд",
        name: "Коти в мистецтві",
    }
];

class Iteam {
    constructor(e) {

        if ( e.author === undefined){
            throw new InvalidError('author');
        }
        if (e.name === undefined){
            throw new InvalidError('name');
        }
        if (e.price === undefined){
            throw new InvalidError('price');
        }

        this.author = e.author;
        this.name = e.name;
        this.price = e.price;
    }

    render() {

        const div = document.querySelector('#root');
        const list = `<ul>
                                    <li>${this.author}</li>
                                    <li>${this.name}</li>
                                    <li>${this.price}</li>
                                </ul> `

        div.insertAdjacentHTML('beforeend',list);

    }
}

class InvalidError extends Error {
    constructor(e) {
        super();
        this.name = 'InvalidError';
        this.message = `InvalidError ${e} `;

    }

}

books.forEach( e => {

    try {

        new Iteam(e).render();

    }catch (error) {

        if (error.name === 'InvalidError'){
            console.log(error)
        }else{
            throw error
        }
    }

});


