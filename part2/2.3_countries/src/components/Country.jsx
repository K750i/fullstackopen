export default function Country({ country }) {
  const name = country.name.common
  const capital = country.capital[0]
  const population = new Intl.NumberFormat().format(country.population)
  const currencySymbol = Object.values(country.currencies)[0].symbol
  const currencyName = Object.values(country.currencies)[0].name
  const languages = Object.values(country.languages)
  const flagURL = country.flags.svg

  return (
    <div>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <p>Currency: {currencySymbol} ({currencyName})</p>
      <h3>Languages:</h3>
      <ul>
        {
          languages.map(language => <li key={language}>{language}</li>)
        }
      </ul>
      <p>
        <img src={flagURL} width="200px" />
      </p>
    </div>
  )
}