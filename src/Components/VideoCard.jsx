import React,{useState} from 'react'
import {Card,Modal} from 'react-bootstrap';
import { deleteAVideo } from '../services/allAPI';


function VideoCard({displayData,setdeleteVideoStatus}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // delete video
  const removeVideo = async (id)=>{
    const response = await deleteAVideo(id)
    console.log(response);
    setdeleteVideoStatus(true)
  }

  return (
    <>
    <Card className='m-2'>
      <Card.Img variant="top" height={'180px'} onClick={handleShow} src={displayData?.url} />
      <Card.Body>
        <Card.Title className='d-flex justify-content-between align-items-center'>
          <h6>{displayData?.caption}</h6>
          <button className='btn' onClick={()=>removeVideo(displayData?.id)}><i class="fa-solid fa-trash text-danger"></i></button>
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