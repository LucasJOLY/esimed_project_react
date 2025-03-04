import './App.css'
import { Router } from './Router'
import MuiThemeProvider from './theme/MuiTheme'
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { ToastContainer } from 'react-toastify';
function App() {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  return (
    <div className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>

        <MuiThemeProvider>
          <ToastContainer />
          <Router />
        </MuiThemeProvider>

    </div>
  )
}

export default App
