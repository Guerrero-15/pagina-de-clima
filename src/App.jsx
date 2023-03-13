import axios from 'axios'
import './App.css'
import Clima from './component/Clima'
import { useState, useEffect } from 'react'

function App() {

  const API_endpoint = "https://api.openweathermap.org/data/2.5/weather?"
  const API_key = "a115a6b1b95b388a75c000570c0c25ee"
  let lat = ""
  let lon = ""
  const [ character, setCharacter ] = useState({})

  useEffect(() => {
  
 
    navigator.geolocation.getCurrentPosition( position => {
        lat = (position.coords.latitude); 
        lon = (position.coords.longitude);

        axios
        .get(`${API_endpoint}lat=${lat}&lon=${lon}&appid=${API_key}`)
        .then( (resp) => setCharacter(resp.data))
        .catch( (error) => console.log(error) )
      })
    }, [])

    const [ text, setText ] = useState("")

const cityClimate = () => {

      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${API_key}`)
         .then( (resp) => setCharacter(resp.data))
         .catch( (error) => console.log(error) )
}
console.log(`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${API_key}`)
return (
  <div className="App">

    <div className="buscador"> 
      <input value={text} onChange={ (e) => setText(e.target.value)} className='buscador-imput' type="text" name="city" placeholder= "   Ciudad..."/>
      <button onClick={cityClimate} className='btn-buscador'>buscar<i className='bx bx-search-alt-2'></i></button>
    </div>

    <Clima data={character}/>
      
    </div>
  )
}

export default App