import React from 'react';
import '../App.css';
import axios from 'axios';
import { useState, useRef} from 'react';



function Navbar({loadCheck}) {

  const [uploadedFiles, setUploadedFiles] = useState(['tinytweets.json'])
  const [filePicker, setFilePicker] = useState('tinytweets.json')


  const fileInputRef=useRef();

  const openFileBrowser = () => {
    fileInputRef.current.click();
  }

  const handleRAGChange = (event) => {
    setFilePicker(event.target.value);
    changeDataset(event.target.value)
  };

  const uploadDataset = () => {
    if (fileInputRef.current.files.length === 0) {
      return;
    }
    const formData = new FormData();
    formData.append('file', fileInputRef.current.files[0]);
    axios.post('http://localhost:5000/upload', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    .then(function (response) {
      setUploadedFiles([...uploadedFiles, fileInputRef.current.files[0].name])
    });
  };

  const changeDataset = (file) => {
    console.log(file)
    loadCheck(true)
    axios.get('http://localhost:5000/changeRAG', { params: {filename: file}})
    .then((data) => {
        console.log('Changed dataset')
        loadCheck(false)
        })
  }

    // const navStyle = {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     color: 'white',
    //     borderBottom: '1px solid white',
    //     position: 'fixed',
    //     top: '0',
    //     width: '100%',
    // };

    return (
        // <nav className=''>
        //     <h1>Ollama Client</h1>
        //     {/* <button onClick={openFileBrowser} className='button'>Upload</button> */}
        //     <button onClick={openFileBrowser} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Upload</button>

        //     <input onChange={uploadDataset} multiple={false} ref={fileInputRef} type='file'hidden/>
        //     <select onChange={handleRAGChange}>
        //         {uploadedFiles.map((file, i) => { return <option key={i}>{file}</option>})}
        //     </select>
        //     {/* <button onClick={changeDataset} className='button'>Change</button> */}
        // </nav>
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-grow text-white mr-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
            <span className="font-semibold text-xl tracking-tight">RAG Chatbot </span>
        </div>
        <div className="w-full block flex px-5 lg:flex lg:items-center lg:w-auto">
            <button onClick={openFileBrowser} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Upload</button>
        </div>
        <div className="w-full block lg:flex lg:w-auto">
            <input onChange={uploadDataset} multiple={false} ref={fileInputRef} type='file'hidden/>
            <select onChange={handleRAGChange} className='block w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-1 pr-5 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
                {uploadedFiles.map((file, i) => { return <option key={i}>{file}</option>})}
            </select>
        </div>
      </nav>
    );
}
export default Navbar;