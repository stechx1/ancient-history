/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from '../styles/Blog.module.css'
import { useRouter } from 'next/router'

const BlogItem = ({ image, heading, para, date, seen, timeOfPost }) => {
    const router = useRouter();
    const handleClick = () => {
        router.push({
          pathname: `/blog/${heading}`,
          query: {
              fbclid: 'fbclid',
          }
      })
    }
    return (
        <>
            <div className={`${styles.BlogItemContainer} my-4`}>
                <img src={image} alt='blogImage' className='img-fluid my-3' />
                <h4>{heading}</h4>
                <span className='text-muted'>{para.length > 70 ? para.slice(0, 20)  : para}{para.length > 70 && '...'}</span>
                <button onClick={handleClick} className={`${styles.simpleButton} text-start px-0 py-2 `}>Read More</button>
                <hr />
                <div className='d-flex justify-content-between'>
                    <span className={styles.date} > {date}</span>

                </div>
            </div>
        </>
    )
}

export default BlogItem