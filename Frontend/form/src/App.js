import './App.css';
import Form from './pages/Form';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import UpdateForm from './pages/UpdateForm';
import Navbar from './component/Navbar';

function App() {
  return (
    <div>
       <Router>
    
     <Navbar />
     <Routes>
     <Route exact path='/' element={<Form />} />
     <Route exact path='/edit/:id' element={<UpdateForm />} />
     </Routes>
     </Router>
    </div>
  );
}

export default App;
