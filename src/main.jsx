import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Defer heavy Font Awesome CSS to after initial render to improve FCP/LCP
const loadFontAwesome = () => import('@fortawesome/fontawesome-free/css/all.min.css').catch(() => {});
if ('requestIdleCallback' in window) {
  // @ts-ignore
  window.requestIdleCallback(loadFontAwesome);
} else {
  setTimeout(loadFontAwesome, 0);
}
