'use strict'

const findId = async () => {

  try {

      const data = await axios.get('https://api.ipify.org/?format=json');

      const ip = data.data.ip;

      const button = document.querySelector('.button');

          button.addEventListener('click', async () => {

              const {data} = await axios.get(`http://ip-api.com/json/${ip}`);

              const body = document.querySelector('body');

              body.insertAdjacentHTML('beforeend', `<ul class="info" id="location-info">

    <li class="name-local">Країна: ${data.country}</li>
    
    <li class="name-local">Регіон: ${data.timezone}</li>
    
    <li class="name-local">Район: ${data.regionName}</li>
    
    <li class="name-local">Місто: ${data.city}</li>
    
  </ul>`)

              button.remove()


          })

  }catch(error){

      console.log(error)

  }

}

findId();

