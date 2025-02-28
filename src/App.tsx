import './App.css'
import { Router } from './Router'
import MuiThemeProvider from './theme/MuiTheme'
import Header from './components/header/Header';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { ToastContainer } from 'react-toastify';
function App() {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  return (
    <div className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>

        <MuiThemeProvider>
          <ToastContainer />
        <Header />
        <Router />
    </MuiThemeProvider>

    </div>
  )
}

export default App
