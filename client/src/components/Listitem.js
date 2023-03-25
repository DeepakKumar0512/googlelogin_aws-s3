import React from 'react'

const Listitem = (props) => {
  const {list}= props
  return (
    <div className='container mb-3 d-flex border-bottom'>
      <div className='container fw-bold p-3'>{list}</div>
      <button type="button" onClick={() => window.open('//localhost:5000/download/'+list, '_blank')} className="btn btn-dark m-3">Download</button>
    </div>
  )
}

export default Listitem