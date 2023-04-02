import './App.css';
import io from 'socket.io-client';
import {useState} from 'react'; 
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import {Routes,Route} from 'react-router-dom';

function App() {

  // const [check,setCheck]=useState([false,false,false,false,false,false,false,false]);

  // const handleChange=(index)=>{
  //   setCheck(check => {
  //     return check.map((item, j) => {
  //       return j === index ? !item : item;
  //     })
  //   })
  // }

  return (
    <div className="App">

      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Chat/>}/>
      </Routes>

      
      {/* <div className="rectangle">

      <div className='rectangle1'>
      <input
          type="checkbox"
          checked={check[0]}
          onChange={()=>handleChange(0)}
          value={1}
        />
        <input
          type="checkbox"
          checked={check[1]}
          onChange={()=>handleChange(1)}
        />
      </div>

      <div className='rectangle2'>
      <input
          type="checkbox"
          checked={check[2]}
          onChange={()=>handleChange(2)}
        />
        <input
          type="checkbox"
          checked={check[3]}
          onChange={()=>handleChange(3)}
        />
      </div>

      <div className='rectangle3'>
      <input
          type="checkbox"
          checked={check[4]}
          onChange={()=>handleChange(4)}
        />
        <input
          type="checkbox"
          checked={check[5]}
          onChange={()=>handleChange(5)}
        />
      </div>

      <div className='rectangle4'>
      <input
          type="checkbox"
          checked={check[6]}
          onChange={()=>handleChange(6)}
        />
        <input
          type="checkbox"
          checked={check[7]}
          onChange={()=>handleChange(7)}
        />
      </div>

      </div> */}

    </div>
  );
}

export default App;
