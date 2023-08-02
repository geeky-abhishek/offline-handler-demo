import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { OfflineSyncProvider } from 'offline-sync-handler-test'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <OfflineSyncProvider>
  <App />
</OfflineSyncProvider>,
)
