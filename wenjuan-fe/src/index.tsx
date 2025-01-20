import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// antd 提示的重置浏览器样式
import 'antd/dist/reset.css'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
