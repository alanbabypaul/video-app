import { React, useEffect, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCategory } from '../services/allAPI';
import { getAllCategory } from '../services/allAPI';

function Category() {
  const [CategoryName,setCategoryName] =useState("")
  const [allCategories,setallCategories]  = useState([])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAddCategory = async () =>{
    if(CategoryName){
      let body={
        CategoryName
      }
      const response = await addCategory(body)
      if(response.status>=200 && response.status<300){
        // 
        handleClose()

        setCategoryName("")
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
  console.log(allCategories);
  useEffect(()=>{
    getCategory()
  },[])

  return (
    <>
    <div className='d-flex'>
        <button onClick={handleShow} className='btn btn-primary'>Add New Category</button>
    </div>
    {
      allCategories?allCategories?.map((item)=>(
        <div className='mt-3 ms-3 border rounded p-3'>
          <div className='d-flex justfy-content-between align-items-center'>
            <h6>{item?.CategoryName}</h6>
            <button className='btn'><i className='fa-solid fa-trash text-danger'></i></button>
          </div>
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