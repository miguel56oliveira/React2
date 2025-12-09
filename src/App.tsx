import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home.tsx";
import Games from "./pages/Games.tsx";
import GameDetails from "./pages/GameDetails.tsx";
import Search from "./pages/Search.tsx";
import Contact from "./pages/Contact.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register";
import Cart from "./pages/Cart";


function App() {
  return (
    <div className="app-root">
      <div className="app-content">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jogos" element={<Games />} />
          <Route path="/jogo/:id" element={<GameDetails />} />
          <Route path="/pesquisa/:texto" element={<Search />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/carrinho" element={<Cart />} /> 
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
