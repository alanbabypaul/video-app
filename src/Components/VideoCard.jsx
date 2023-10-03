import React,{useState} from 'react'
import {Card,Modal} from 'react-bootstrap';


function VideoCard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Card>
      <Card.Img variant="top" onClick={handleShow} src="https://miro.medium.com/v2/resize:fit:1200/1*y6C4nSvy2Woe0m7bWEn4BA.png" />
      <Card.Body>
        <Card.Title className='d-flex justify-content-between align-items-center'>
          <h6>Video Caption</h6>
          <button className='btn'><i class="fa-solid fa-trash text-danger"></i></button>
        </Card.Title>
      </Card.Body>
    </Card>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe className='w-100' height={'360px'} src="https://www.youtube.com/embed/t-2X1fiS61U?autoplay=1" title="How To Create Dynamic Pages in React" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default VideoCard