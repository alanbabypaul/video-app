import { uploadVideo } from '../services/allAPI';
import { React, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';


function Add({setuploadVideoServerResponse}) {
  const [show, setShow] = useState(false);
  const [video,setVideo] = useState({
    id:"",caption:"",url:"",embedLink:""
  })
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getEmbedLink=(e)=>{
    const {value} =e.target
    if(value){
      const link = `http://www.youtube.com/embed/${value.slice(-11)}`
      setVideo({...video,embedLink:link})
    }else{
      setVideo({...video,embedLink:""})
    }
    
  }
  console.log(video);
  const handleUpload= async (e)=>{
    const {id,caption,url,embedLink} = video
    if(!id || !caption || !url || !embedLink)
    {
      alert("plz fill the all form");
    }else{
      // make API
      const response = await uploadVideo(video)
      console.log(response);
      if(response.status>=200 && response.status<300){
        // set server response
        setuploadVideoServerResponse(response.data)
        alert(`'${response.data.caption}' video uploaded successfully`)
        // model hide
        handleClose()
      }else{
        console.log(response);
        alert("Can not perform the action......")
      }
    }
  }
  console.log(video);

  return (
    <>
      <div className='d-flex'>
        <h5>Upload New Videos</h5>
        <button onClick={handleShow} className='btn'><i className="fa-solid fa-circle-plus fs-5"></i></button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload New Videos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please Fill the Following Details</p>
          <Form className='border border-secondary rounded p-3'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter Video Id" onChange={(e)=>setVideo({...video,id:e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter Video Caption" onChange={(e)=>setVideo({...video,caption:e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter Video Image URL" onChange={(e)=>setVideo({...video,url:e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter YouTube Video Link" onChange={getEmbedLink}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpload} >Upload</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add