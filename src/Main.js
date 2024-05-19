import React, { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

import GlobalStyle from './global'
import AppRouters from './routes'
import { store } from './store'

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <AppRouters />
        <Toaster />
      </Provider>
      <GlobalStyle />
    </Suspense>
  )
}

export default App
