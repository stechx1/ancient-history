/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from '../styles/Blog.module.css'
import { useRouter } from 'next/router'

const BlogItem = ({ image, heading, para, date, slug, seen, timeOfPost }) => {
    const router = useRouter();
    const handleClick = () => {
        router.push({
          pathname: `/blog/${slug}`,
      })
    }
    return (
        <>
            <div onClick={handleClick} className={`${styles.BlogItemContainer} my-4`}>
                {/* <img src={image} alt='blogImage' className='img-fluid my-3' /> */}
                <div className={`${styles.image} my-2`} style={{ height:'50vh', backgroundImage: `url(${image})`}}>

                </div>
                <h4>{heading.length  > 70 ? heading.slice(0, 70) : heading}{heading.length > 70 && '...'}</h4>
                <button className={`${styles.simpleButton} text-start px-0 py-2 `}>Read More</button>
                <hr />
                <div className='d-flex justify-content-between'>
                    <span className={styles.date} > {date}</span>
                </div>
            </div>
        </>
    )
}

export default BlogItem