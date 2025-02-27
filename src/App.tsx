import './App.css'
import { Router } from './Router'
import MuiThemeProvider from './theme/MuiTheme'
function App() {
  return (
    <>
    <MuiThemeProvider>
    <Router />
    </MuiThemeProvider>

    </>
  )
}

export default App
