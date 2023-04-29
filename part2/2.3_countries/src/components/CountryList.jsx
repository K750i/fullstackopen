import { useState } from "react"
import Country from "./Country"

export default function CountryList({ country }) {
  const [show, setShow] = useState(false)

  return (
    <li>
      {country.name.common} <button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}</button>
      {show && <Country country={country} />}
    </li>
  )
}