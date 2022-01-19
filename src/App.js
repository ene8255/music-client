import './App.css';
import Header from './include/Header';
import Nav from './include/Nav';
import MainPage from './main';
import RecommendPage from './recommend';
import List from './playlist/List';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/recommend" element={<RecommendPage />} />
        <Route path="/playlist/:category" element={<List />} />
      </Routes>
    </div>
  );
}

export default App;
