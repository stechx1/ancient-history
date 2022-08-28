import React from 'react'
import styles from '../../styles/Aside.module.css'
const PostCard = ({title}) => {
  return (
    <>
      <div className={`d-flex flex-column my-4`}>
        
        <div>
          <h5>{title}</h5>
          <hr />
        </div>
      </div>
    </>
  ) 
}

export default PostCard