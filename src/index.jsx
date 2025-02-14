import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux'
import '@ant-design/v5-patch-for-react-19'

import store from "./redux/store.js";

import './styles.css';
import App from "./pages/App.jsx"

const root = document.getElementById('root');

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)