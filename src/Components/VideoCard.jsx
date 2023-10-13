import React,{useState} from 'react'
import {Card,Modal} from 'react-bootstrap';
import { addToHistory, deleteAVideo } from '../services/allAPI';


function VideoCard({displayData,setdeleteVideoStatus,insideCategory}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // addTo history
  const handleShow = async()  =>{
  setShow(true);
  const {caption,embedLink} = displayData
  let today = new Date()
  let timeStamp = new Intl.DateTimeFormat('en-us',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(today)
  let videoDetails={
    caption,embedLink,timeStamp
  }
  await addToHistory(videoDetails)
  
  } 
  // delete video
  const removeVideo = async (id)=>{
    const response = await deleteAVideo(id)
    console.log(response);
    setdeleteVideoStatus(true)
  }

  const dragStrated = (e,id)=>{
    console.log("Drag Started... Video Id:"+id);
    e.dataTransfer.setData("videoId",id)
  }

  return (
    <>
    <Card className='m-2' draggable onDragStart={(e)=>dragStrated(e,displayData?.id)}>
      <Card.Img variant="top" height={'180px'} onClick={handleShow} src={displayData?.url} />
      <Card.Body>
        <Card.Title className='d-flex justify-content-between align-items-center'>
          <h6>{displayData?.caption}</h6>
          {insideCategory?"":<button className='btn' onClick={()=>removeVideo(displayData?.id)}><i class="fa-solid fa-trash text-danger"></i></button>}
          
        </Card.Title>
      </Card.Body>
    </Card>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe className='w-100' height={'360px'} src={`${displayData?.embedLink}?autoplay=1`} title="How To Create Dynamic Pages in React" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default VideoCard