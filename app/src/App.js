import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Y_Auth from './components/Y_Auth/Y_Auth';
import PullAll from './components/PullAll/PullAll';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Y_Auth />} />
          <Route path='pullAll' element={<PullAll />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
