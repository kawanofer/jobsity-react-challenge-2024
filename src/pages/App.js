import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

import { Readme } from './styles'

const README_PATH =
  'https://raw.githubusercontent.com/Jobsity/ReactChallenge/main/README.md'

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
      {md && (
        <>
          <h2>Use our existing route to create you calendar!</h2>
          <Link to='/calendar'>Go to Calendar page</Link>
        </>
      )}
    </Readme>
  )
}

export default App
