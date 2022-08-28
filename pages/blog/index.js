import React, {useEffect, useState} from 'react'
import BlogItem from '../../components/BlogItem'
import { db } from '../../config/FirebaseConfig'
import { getDocs, collection } from 'firebase/firestore'

const Blog = ({posts}) => {
    return (
        <>
            <div className="container my-5" style={{ backgroundImage: 'radial-gradient(at center center,rgb(241, 244, 255) 0%,white 83%)' }}>
                <h1 className='text-center fw-bold'>Posts</h1>
                <div className="container">
                    <div className="row">
                        {posts.map((post, index)=> <div key={index} className="col-md-4 col-sm-12">
                            <BlogItem slug={post.slug} image={post.postImage} heading={post.postTitle} para={post.content} date={post.date.slice(0, 16)} />
                        </div>  )}
                    </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = async(ctx) => {
  let posts = [];

  try {
    const postItems = [];
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      const { content, postImage, redirect, title, date, slug } = doc.data();
      postItems.push({
        postTitle:title,
        content:content,
        postImage:postImage,
        redirect:redirect,
        slug:slug,
        date:date
      });
    });
    posts = postItems;
  } catch (excep) {
    console.log(excep);
  }

return {
  props: {posts}
  }
}

export default Blog