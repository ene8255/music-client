import './App.css';
import Header from './components/include/Header';
import Nav from './components/include/Nav';
import MainPage from './components/Main';
import PlaylistPage from './components/Playlist';
import SongPage from './components/Song';
import CreatePage from './components/CreatePlaylist';
import AddPage from './components/AddSong';
import EditPlaylistPage from './components/EditPlaylist';
import EditSongPage from './components/EditSong';
import RandomPage from './components/Random';
import SearchPage from './components/Search';
import Footer from './components/include/Footer';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/playlist/:id" element={<PlaylistPage />} />
        <Route path="/song/:id" element={<SongPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/editPlaylist/:id" element={<EditPlaylistPage />} />
        <Route path="/editSong/:id" element={<EditSongPage />} />
        <Route path="/recommend" element={<RandomPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
