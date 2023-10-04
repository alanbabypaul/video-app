import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap';

function WatchHistory() {
  return (
    <>
      <div className="container mt-5 mb-5 d-flex justify-content-between align-items-center">
        <div className="add-videos">
          <h1>Watch History</h1>
        </div>
        <Link to={'/home'} className='text-decoration-none text-white'>Back to Home</Link>
      </div>

      <div className="container w-100 mt-5 mb-5">

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Caption</th>
              <th>URL</th>
              <th>Time Stamp</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>https://youtu.be/MlnICsy5mmU</td>
              <td>I6/04/23</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  )
}
export default WatchHistory