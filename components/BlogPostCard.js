/* eslint-disable @next/next/no-img-element */
import React from 'react'
import buttonStyles from '../styles/Blog.module.css'
import styles from '../styles/BlogPost.module.css'

const BlogPostCard = ({heading, source}) => {
  return (
    <>
        <div className={`container ${styles.blogPostCardContainer} `}>
            <img src={source} className="img-fluid" width={500} height={500} alt="post-image" />
            <span className={`${styles.secHeading} fs-5`}>{heading}</span>
            <div>
                <button className={`${buttonStyles.simpleButton} text-start `}>Read More <i className="fa fa-long-arrow-right" aria-hidden="true"></i></button>
            </div>
        </div>
    </>
  )
}

export default BlogPostCard