import { React, useEffect, useState } from 'react'
import { Button, Modal, Form,Row,Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCategory, getAVideo, updateCategory } from '../services/allAPI';
import { getAllCategory } from '../services/allAPI';
import { deleteCategory } from '../services/allAPI';
import VideoCard from './VideoCard';

function Category() {
  const [CategoryName,setCategoryName] =useState("")
  const [allCategories,setallCategories]  = useState([])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAddCategory = async () =>{
    if(CategoryName){
      let body={
        CategoryName,allVideos:[]
      }
      const response = await addCategory(body)
      if(response.status>=200 && response.status<300){
        // hide modal
        handleClose()
        // rest state
        setCategoryName("")
        // get category
        getCategory()
      }else{
        toast.error("Operation failde plz try after some time")
      }
      }else{
        toast.warning("pleace provide category name!!")
      }
  }
  const getCategory = async ()=>{
    // make api call
    const {data} = await getAllCategory()
    setallCategories(data);
  }

  const handleDelete = async (id)=>{
    await deleteCategory(id)
    getCategory()
  }
  console.log(allCategories);
  useEffect(()=>{
    getCategory()
  },[])

  const dargOver=(e)=>{
    console.log("Video drag over category")
    e.preventDefault()
  }

  const videoDrop = async (e,CategoryId)=>{
    // console.log("video Dropped inside category Id:"+CategoryId);
    const videoId = e.dataTransfer.getData("videoId")
    // console.log("Video Card Id:",videoId);
    // get Video details
    const {data} =await getAVideo(videoId)
    // 
    const selectedCategory = allCategories?.find(item=>item.id===CategoryId)
    selectedCategory.allVideos.push(data)
    console.log(selectedCategory);
    // make api call to update Category
    await updateCategory(CategoryId,selectedCategory)
    getCategory()
  }

  return (
    <>
    <div className='d-flex'>
        <button onClick={handleShow} className='btn btn-primary'>Add New Category</button>
    </div>
    {
      allCategories.length>0?allCategories?.map((item)=>(
        <div className='mt-2 m-5 border rounded p-3' droppable onDragOver={(e)=>dargOver(e)} onDrop={(e)=>videoDrop(e,item?.id)}>
          <div className='d-flex  align-items-center justify-content-between'>
            <h6>{item?.CategoryName}</h6>
            <button className='btn' onClick={()=>handleDelete(item?.id)}><i className='fa-solid fa-trash text-danger'></i></button>
          </div>
          <Row>
            {
              item?.allVideos && 
              item?.allVideos.map(card=>(
                <Col sm={12}>
                  <VideoCard displayData={card}/>
                </Col>
              ))
            }
          </Row>
        </div>
      )):<p className='fw-bolder fs-5 text-danger'>Nothing to Display!!!!!</p>
    }
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='border border-secondary rounded p-3'>
          <Form.Label>Enter Category Name</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e)=>setCategoryName(e.target.value)}>
              <Form.Control type="text" placeholder="Enter Category Name" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer 
      position='top-center'
      theme='colored'
      autoClose={2000}
      />
    </>
  )
}

export default Category