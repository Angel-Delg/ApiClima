window.addEventListener('load', () => {
    // Capturamos los elementos de DOM

    // Elemento que engloba nuestra App => root
    let fechaActual = new Date()
    let horaActual = fechaActual.getHours()

    const valorTemperatura = document.getElementById('value-temperature')
    const descripcion = document.getElementById('description')

    const ciudadLocalizada = document.getElementById('city-location')
    const velocidadViento = document.getElementById('wind-speed')

    const iconoClima = document.getElementById('icon')
    const logo = document.getElementById('logo')

    // Accediendo a los datos del input para el cambio de información
    const DatoBuscador = document.getElementById('searchValue')
    const buttonBuscador = document.querySelector('.btn')

    const titleIcon = document.querySelector('.title')

    let city = 'Managua'
    // Obtener los datos del buscador


    // primero accedemos a los permisos de la geolocalizacion
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( position => {
            // Destructuramos el Objeto coordenadas y guardamos el resto de valores en un Objeto sobrante
            console.log(position)
            let coords = position.coords
            const { latitude: latitud, longitude: longitud, ...valores } = coords

            // Ubicación actual 
            // const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${API_KEY}`;
            
            const responseSearch = () => {

                DatoBuscador.addEventListener('change', event => {
                    console.log(event.target.value)
                    if(event.target.value.trim().length > 0) {
                        const value = event.target.value

                        buttonBuscador.addEventListener('click', () => {
                            console.log(value)
                            city = value

                            onResponseHandler()
                        })
                    }
                })

            }
            responseSearch()

            // Ubicación por ciudad

            // Funcion manejadora de la respuesta de la API
            const onResponseHandler = async () =>{
                
                const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=es&units=metric&appid=43496054b3c4f145d064fa2ba678f31d`
                // Manipulamos el manejo de errores
                try {
                    const response = await fetch(API_URL)
                    const responseJson = await response.json()
                    
                    // Imprimimos los datos de la repuesta
                    console.log(responseJson)

                    // llamos a la funcion que filtra la busqueda

                    let temperature = Math.round(responseJson.main.temp)
                    let description = responseJson.weather.map( data => data.description)

                    // Pasamos esos elementos
                    valorTemperatura.innerHTML = `${temperature} ºC`
                    descripcion.innerHTML = `${description}`

                    titleIcon.innerHTML = `${city} ${temperature} °C `

                    // segundo Bloque de información
                    ciudadLocalizada.innerHTML = `${city}`

                    // Valores de velocidad del Viento
                    let speed = responseJson.wind.speed
                    velocidadViento.innerHTML = `${speed} m/s`

                    if(horaActual >= 6 || fechaActual <= 17){
                        // Entonces estamos de dia
                        if(responseJson.weather[0].main === 'Clouds'){
                            iconoClima.src = 'animated/cloudy-day-1.svg'
                            logo.src = 'animated/cloudy-day-1.svg'

                        }
                        else if(responseJson.weather[0].main === 'Clear'){
                            iconoClima.src = 'animated/day.svg'
                            logo.src = 'animated/day.svg'
                        }
                        else if(responseJson.weather[0].main === 'Rain'){
                            iconoClima.src = 'animated/rainy-1.svg'
                            logo.src = 'animated/rainy-1.svg'
                        }
                        else if(responseJson.weather[0].main === 'Snow'){
                            iconoClima.src = 'animated/snowy-3.svg'
                            logo.src = 'animated/snowy-3.svg'
                        }
                        else if(responseJson.weather[0].main === 'Drizzle'){
                            iconoClima.src = 'animated/rainy-3.svg'
                            logo.src = 'animated/rainy-3.svg'
                        }

                    }
                    else{
                        // Entonces estamos de noche
                        if(responseJson.weather[0].main === 'Clouds'){
                            iconoClima.src = 'animated/cloudy-night-1.svg'
                            logo.src = 'animated/cloudy-night-3.svg'
                        }
                        else if(responseJson.weather[0].main === 'Clear'){
                            iconoClima.src = 'animated/night.svg'
                            logo.src = 'animated/night.svg'
                        }
                        else if(responseJson.weather[0].main === 'Rain'){
                            iconoClima.src = 'animated/rainy-5.svg'
                            logo.src = 'animated/rainy-5.svg'
                        }
                        
                        else if(responseJson.weather[0].main === 'Snow'){
                            iconoClima.src = 'animated/snowy-5.svg'
                            logo.src = 'animated/snowy-5.svg'
                        }
                        
                        else if(responseJson.weather[0].main === 'Drizzle'){
                            iconoClima.src = 'animated/rainy-3.svg'
                            logo.src = 'animated/rainy-3.svg'
                        }
                    }
                } 
                catch (error) {
                    // En caso de error tenemos un Objeto condatos { cod : 404 , messsage, 'city not found'}
 
                }
            }
            // Llamamos nuestra Funcion que hace la peticion
            onResponseHandler()
        })
    }
})