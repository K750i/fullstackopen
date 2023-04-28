import axios from 'axios'
import { useState, useEffect } from 'react'
import Display from './components/Display'

function App() {
  const [countries, setCountries] = useState([])
  const [keyword, setKeyword] = useState('')
  const [selected, setSelected] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])

  function findCountries(e) {
    const currentKeyword = e.target.value
    setKeyword(currentKeyword)
    setSelected(countries.filter(country => {
      const name = country.name.common.toLowerCase()
      return name.includes(currentKeyword.toLowerCase())
    }))
  }

  return (
    <div>
      <h1>Country Information</h1>
      <p>
        <label htmlFor="country">Find countries: </label>
        <input type="text" id='country' placeholder='New Zealand' value={keyword} onChange={findCountries} />
      </p>
      {keyword && <Display countries={selected} />}
    </div>
  )
}

export default App
