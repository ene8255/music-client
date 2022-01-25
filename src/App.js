import './App.css';
import Header from './components/include/Header';
import Nav from './components/include/Nav';
import MainPage from './components/Main';
import RecommendPage from './components/Recommend';
import PlaylistPage from './components/Playlist';
import SongPage from './components/Song';
import CreatePage from './components/CreatePlaylist';
import AddPage from './components/AddSong';
import EditPlaylistPage from './components/EditPlaylist';
import EditSongPage from './components/EditSong';
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
        <Route path="/recommend" element={<RecommendPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
