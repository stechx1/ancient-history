import React, {useEffect, useState} from 'react'
import BlogItem from '../components/BlogItem'
import {useRouter} from 'next/router'
import { db } from '../config/FirebaseConfig'
import { getDocs, collection } from 'firebase/firestore'

const Blog = () => {
    const [posts, setPosts] = useState([])
    const router = useRouter();
    useEffect(() => {
      fetchPosts();
    }, [])
  
    const fetchPosts = async ()=>{
        try {
          const postItem = [];
          const querySnapshot = await getDocs(collection(db, "posts"));
          querySnapshot.forEach((doc) => {
            const { content, postImage, redirect, title, date } = doc.data();
            postItem.push({
              postTitle:title,
              content:content,
              postImage:postImage,
              redirect:redirect,
              date:date
            });
          });
          setPosts(postItem);
        } catch (excep) {
          console.log(excep);
        }
      }
    return (
        <>
            <div className="container my-5" style={{ backgroundImage: 'radial-gradient(at center center,rgb(241, 244, 255) 0%,white 83%)' }}>
                <h1 className='text-center fw-bold'>Posts</h1>
                <div className="container">
                    <div className="row">
                        {posts.map((post, index)=> <div key={index} className="col-md-4 col-sm-12">
                            <BlogItem image={post.postImage} heading={post.postTitle} para={post.content} date="January 20, 2021" />
                        </div>  )}
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog