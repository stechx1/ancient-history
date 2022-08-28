/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Aside from '../components/Admin/Aside'
import { useRouter } from 'next/router'
import styles from '../styles/BlogPost.module.css'


const BlogPostItem = () => {
    const router = useRouter();
    return (
        <>
            <div className={`container-fluid d-flex flex-md-row flex-column  `}>
                <div className={`left ${styles.AsideContianer} `}>
                    <Aside />
                </div>
                <div className={styles.mainContainer}>
                    <div className={`container d-flex flex-column gap-4 ${styles.blogPostContainer} `}>
                        <img src={router.query.image} className="img-fluid" alt="image" />
                        <span className={styles.pHeading}>{router.query.title}</span>
                        <div className='gap-4 d-flex flex-column'>
                            <p dangerouslySetInnerHTML={{__html: router.query.para}}></p>
                            <p dangerouslySetInnerHTML={{__html: router.query.slug}}></p>
                        </div>
                        <hr />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogPostItem