import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import Book from './Pages/Books';
import { AuthContextProvider } from './context/AuthContext';
import Protected from './Components/Protected';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/book" element={<Protected><Book /></Protected>} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
