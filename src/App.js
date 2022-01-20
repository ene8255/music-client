import './App.css';
import Header from './include/Header';
import Nav from './include/Nav';
import MainPage from './main';
import RecommendPage from './recommend';
import List from './playlist/List';
import SongPage from './song';
import CreatePage from './createPlaylist';
import AddPage from './addSong';
import Footer from './include/Footer';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/playlist/:category" element={<List />} />
        <Route path="/song/:id" element={<SongPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/recommend" element={<RecommendPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
