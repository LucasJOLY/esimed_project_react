import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { IntlProvider } from 'react-intl'
import { messages } from './language/config/translation.ts'

const language = localStorage.getItem('language') || 'fr'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <IntlProvider messages={messages[language as keyof typeof messages]} locale={language} defaultLocale="fr">
      <App />
    </IntlProvider>
  </Provider>
)
