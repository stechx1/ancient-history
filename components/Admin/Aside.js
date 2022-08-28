import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import styles from '../../styles/Aside.module.css'
import { useRouter } from 'next/router'
import { db } from '../../config/FirebaseConfig'
import { getDocs, collection } from 'firebase/firestore'
import LoadingSpinner from '../Spinner/LoadingSpinner'

const Aside = ({ isLoading }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  useEffect(() => {
    fetchPosts();
  }, [isLoading])

  const fetchPosts = async () => {
    try {
      const postItem = [];
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        const { content, postImage, redirect, title, date, slug } = doc.data();
        postItem.push({
          postTitle: title,
          content:content,
          postImage:postImage,
          redirect:redirect,
          slug:slug,
          date:date
        });
      });
      setPosts(postItem);
    } catch (excep) {
      console.log(excep);
    }
    setLoading(false)
  }

  const routeChange = (title, para, image, redirect, slug) => {
    router.push({
      pathname: '/blog-post-item',
      query: {
        title:title,
        para:para,
        image:image,
        slug:slug,
        redirect:redirect
    }
    })
  }

  return (
    <>
      <div className={`my-5 pr-5  ${styles.hideScroll} `}>
        <button style={{ display: 'flex' }} onClick={() => { router.push('/create-post') }} className={styles.addButton}>Add New Post</button>
        <div className='my-5'>
          <h3 className='text-center'>All Posts</h3>
          {loading ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> <LoadingSpinner /> </div> : posts.map((post) => <> <div style={{ cursor: 'pointer' }} onClick={() => { routeChange(post.postTitle, post.content, post.postImage, post.redirect, post.slug) }}> <PostCard title={post.postTitle} /> </div> </>)}

        </div>

      </div>
    </>
  )
}

export default Aside