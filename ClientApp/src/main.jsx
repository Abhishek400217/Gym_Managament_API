import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { PlansProvider } from './context/PlansContext.jsx'
import { PaymentsProvider } from './context/PaymentsContext.jsx'
import { MembersProvider } from './context/MembersContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <PlansProvider>
          <PaymentsProvider>
            <MembersProvider>
              <App />
            </MembersProvider>
          </PaymentsProvider>
        </PlansProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)