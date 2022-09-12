import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Auth0ProviderWithHistory } from './auth/Auth0ProviderWithHistory'

import { store } from './redux/store'
import { App } from './App'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <StrictMode>
        <BrowserRouter>
            <Auth0ProviderWithHistory>
                <Provider store={store}>
                    <App />
                </Provider>
            </Auth0ProviderWithHistory>
        </BrowserRouter>
    </StrictMode>
)
