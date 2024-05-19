import 'react-perfect-scrollbar/dist/css/styles.css'

import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  .poppins-regular {
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
  }

  .poppins-semibold {
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-style: normal;
  }

  .poppins-bold {
    font-family: "Poppins", sans-serif;
    font-weight: 700;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    color: #555;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    line-height: 1.4;

    > div {
      margin-top: 0;
    }
  }

  code {
    font-family: "Poppins", sans-serif;
  }

  * {
    box-sizing: border-box;
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #222;
    line-height: 1.1;

    + * {
      margin-top: 0.5rem;
    }
  }

  strong {
    color: #222;
  }

  li {
    margin-top: 0.25rem;
  }
`
