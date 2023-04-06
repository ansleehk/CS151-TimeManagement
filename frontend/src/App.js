import { LoginPage } from "./pages/login.jsx";
import { HomePage } from "./pages/home.jsx";
import { MenuBar } from "./components/menuBar.jsx";
import { RegisterPage} from "./pages/register.js"
import "./styles/app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <MenuBar />
        <div id="content-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
