import React, { useState } from 'react'
import styles from '../styles/BlogPost.module.css'
import { useRouter } from 'next/router'

const Blogpost = () => {
  const [image, setImage] = useState('')

  const router = useRouter();

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={`container d-flex flex-column gap-4 ${styles.blogPostContainer} `}>
          <img src={router.query.image} className="img-fluid  " />
          <span className={styles.pHeading}>{router.query.heading}</span>
          <div className='gap-4 d-flex flex-column'>
            <p>{router.query.para}</p>
          </div>
          <hr />
        </div>
      </div>
    </>
  )
}

export default Blogpost