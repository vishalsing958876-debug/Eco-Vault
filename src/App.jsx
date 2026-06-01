import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Guide from './pages/Guide';
import Commerce from './pages/Commerce';
import About from './pages/About';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div id="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/commerce" element={<Commerce />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
