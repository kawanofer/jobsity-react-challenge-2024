import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

import { Readme } from './styles'

const README_PATH =
  'https://raw.githubusercontent.com/kawanofer/jobsity-react-challenge-2024/main/README.md'

function App() {
  const [md, setMd] = useState(null)

  useEffect(() => {
    fetch(README_PATH, { mode: 'cors' })
      .then((response) => response.text())
      .then((response) => {
        setMd(`${response}`)
      })
  }, [])

  return (
    <Readme>
      <ReactMarkdown allowDangerousHtml children={md} />
      <br />
      <br />
      <br />
      {md && <Link to='/calendar'>Go to Calendar page</Link>}
    </Readme>
  )
}

export default App
