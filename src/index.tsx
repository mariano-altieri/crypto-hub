import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import './index.css'
import App from './App'
import { NavigationProvider } from './components/hooks/useNavigation'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const queryClient = new QueryClient()

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <NavigationProvider>
                <App />
            </NavigationProvider>
        </QueryClientProvider>
    </React.StrictMode>
)
