
import { LoginPage } from './pages/login.jsx';
import { HomePage } from './pages/home.jsx';
import { MenuBar } from './components/menuBar.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
    <div>
      <MenuBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
