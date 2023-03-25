import React,{useEffect,useState} from 'react'
import Listitem from './Listitem';
import axios from 'axios';

const Upload = () => {
  
  const [lists, setlists] = useState([])
  const [selectedFile, setSelectedFile] = useState(null);

  // function to get list of file
  const getList = async()=>{

    //GET request to get list
    const response =await fetch(`http://localhost:5000/list`, {
    method: 'GET'
    });
    const json =await response.json()
    if(response.status===500){
      alert("Server Error || Please try after some time")
    }
    else{
      setlists(json)
    }
  }
  useEffect(() =>{
    getList()
  }, [])

  const changehandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

// function to upload file
  const uploader = async(event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      // POST reuest to upload file
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response)
    } catch(error) {
      alert(error)
    }
    getList()
  };

  return (
    <div className="container mb-3">
      <label htmlFor="formFile" className="form-label">All type of file are allowed.</label>
      <input className="form-control mb-3" onChange={changehandler} name='file' type="file" id="formFile"></input>
      <button type="button" onClick={uploader} className="btn btn-success mb-3">Upload</button>
      <div className='container bg-body-secondary'><h2>List of Files</h2><hr/>
        {
          lists.map(list =>{
            return <Listitem key={list} list={list} /> })
        }
      </div>
    </div>
  )
}

export default Upload