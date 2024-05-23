import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import AuthProvider from './Context/AuthProvider';
import PrivateOutlet from './Components/PrivateOutlet/PrivateOutlet';
import Register from './Components/Register/Register'
function App() {

  //  console.log(backendData.users.length)
   
  return (
    <div className=" container mt-4">

      <AuthProvider>


        <Routes>
          <Route path="/" element={<PrivateOutlet/>}> 
            <Route path="/Home" element={<Home/>}/>
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>

      </AuthProvider>
     
       
    </div>
  );
}

export default App;
