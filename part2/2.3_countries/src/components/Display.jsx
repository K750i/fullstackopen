import Country from "./Country"

export default function Display({ countries }) {
  switch (true) {
    case countries.length === 0:
      return <div>No match found.</div>

    case countries.length === 1:
      return <Country country={countries[0]} />

    case countries.length > 10:
      return <div>Too many matches. Please specify another filter.</div>

    default:
      return (
        <ul>
          {
            countries.map(country =>
              <li key={country.name.common}>
                {country.name.common}
              </li>)
          }
        </ul>
      )
  }
}