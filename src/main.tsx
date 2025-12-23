import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.tsx'
import { SharingSystemProvider } from './features/sharing-system/SharingSystemProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SharingSystemProvider>
      <App />
    </SharingSystemProvider>
  </StrictMode>,
)
