import './App.css';
import axios from 'axios';
import { useState } from 'react';
import Navbar from './components/navbar';
import { AiOutlineLoading } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import { TextField, InputAdornment } from '@mui/material';



// Add explanation message first

// Add RAG dataset explanation

// Automatically scroll down

// Fix no scroll

// fix reload page, still orginal dataset

// seperate app into components

// seperate 


function App() {
  
  const [pythonAPI, setPythonAPI] = useState('');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false)
  const [loadStatement, setLoadStatement] = useState('Ask Me Something...')

  const [userMsgs, setUserMsgs] = useState([])
  const [aiMsgs, setAiMsgs] = useState([])

  const childLoading = (value) => {
    if (value === false){
      setLoadStatement('Ask Me Something...')
    }else{
      setLoadStatement('Changing Dataset...')
    }
    setLoading(value)
  }

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const updateAIChat = (message) => {
    setAiMsgs([...aiMsgs, message])
    console.log(pythonAPI)
    setPythonAPI(pythonAPI + '\nMe: ' + input + '\nAI: ' + message );
    console.log(pythonAPI)
    
  };

  const updateUserChat = (message) => {
    setUserMsgs([...userMsgs, message])
    console.log(pythonAPI)
    setPythonAPI(pythonAPI + '\nMe: ' + input);
    console.log(pythonAPI)
  };


  const apiCall = () => {
    if(input === ''){return}
    updateUserChat(input)
    setLoading(true)
    setLoadStatement('Generating...')
    var question = input;
    setInput('')
    axios.get('http://localhost:5000/get_response', { params: {input: question}})    
    .then((data) => {
        updateAIChat(data.data);
        setLoading(false)
        setLoadStatement('Ask Me Something...')
      })
  };


  const handleKeyPress =  (event) => {
    if(event.key === 'Enter' && !loading){
      apiCall()
      setInput('')
     }
   }

  const inputStyle = {
      borderRadius: '5px',
    };

  return (
    <div className="App h-screen flex-col flex">
        <Navbar loadCheck={childLoading}/>
      {/* <header className="App-header"> */}
        <div className='p-5 flex-col flex grow'>
          <div className='apppp p-5 border rounded border-double gap-3 flex grow flex-col items-center'>
            <div className='flex-1 rounded shrink-0 flex-col justify-end overflow-y-scroll w-full'>
              {/* <p className='chatP'>{pythonAPI}</p> */}
            {userMsgs.map((userMsg, index) => (
              <div key={index} className='flex flex-col'>
                <p className='self-end border rounded m-1 p-1 max-w-[80%]' >User: {userMsg}</p>
                <p className='self-start border rounded m-1 p-1  max-w-[80%]'>AI: {aiMsgs[index]}</p>
              </div>
            ))}

            </div>
            <div className="prompt flex">
              <TextField variant='outlined' className='chatBox'
              sx={{bgcolor: 'white', width: '100%'}}
              InputProps={{
                endAdornment:  <InputAdornment sx={!loading ? { cursor: 'pointer' } : null} position='end'>
                  {loading && <AiOutlineLoading className='loading' size={30}/>}
                  {!loading && <IoIosSend size={30} color={'#14b8a6'} onClick={apiCall} disabled={loading}/>}
                  </InputAdornment>
            }}
              type="text" id="input" name="input" placeholder={loadStatement} value={input} onChange={handleChange} style={inputStyle} onKeyDown={handleKeyPress}/>
            </div>
          </div>
        </div>
      {/* </header> */}
    </div>
  );
}



export default App;


// Figure out how to host a ollama endpoint for connection

// maybe allow users to change the endpoint

// build script that allows the flask/ollama/node to be hosted all at once