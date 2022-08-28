/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from "next/router";
import Aside from '../components/Admin/Aside'
import styles from '../styles/CreatePost.module.css'
import btnStyles from '../styles/Aside.module.css'
import { db } from '../config/FirebaseConfig';
import { auth } from "../config/FirebaseConfig";
import { storage } from "../config/FirebaseConfig";
import {
    ref,
    getDownloadURL,
    uploadBytesResumable,
} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import LoadingSpinner from '../components/Spinner/LoadingSpinner';
import Router from 'next/router';

const CreatePost = () => {
    const router = useRouter();
    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
          if (!user) {
            router.push("/auth/login");
          }
        });
      });
    //Post Related
    const [data, setData] = useState({ title: '', content: '', redirect: '', slug:'' })
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const [loading, setLoading] = useState(false)

    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const imageRef = useRef();
    const uploadImage = () => {
        imageRef.current.click();
    }
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageURL, setImageURL] = useState('')
    const captureImage = (e) => {
        const image = e.target.files[0]
        setName(e.target.files[0].name)
        setUrl(e.target.files)
        const showImage = URL.createObjectURL(image)
        setImageLoaded(true);
        setImageURL(showImage);
    }
    const addPost = async () => {
        const downloadURI = await ManageImage();
        var d = new Date(Date.now());
        await addDoc(collection(db, 'posts'), {
            title: data.title,
            content: data.content,
            redirect: data.redirect,
            postImage: downloadURI,
            slug:data.slug,
            date: d.toString()
        })
            .then(() => {
                setLoading(false);
                Router.push('/create-post')

            })
            .catch((e) => {
                console.log(e)
            })
    }
    const ManageImage = async () => {
        setLoading(true)
        const imgRef = ref(storage, `images/${name + Date.now()} `);
        await uploadBytesResumable(imgRef, url[0]).then(() => {
            console.log("Image Uploaded");
        });

        const downloadURI = await getDownloadURL(imgRef);
        return downloadURI;
    };

    return (
        <>
            <div className={` ${styles.mainContainer} container-fluid d-flex`}>
                <div className={styles.left}>
                    <Aside isLoading={loading} />
                </div>
                <div className={`${styles.right} w-100 d-flex gap-5 px-3`}>
                    <div className={`d-flex flex-column gap-4 ${styles.upper} `}>
                        <input onChange={onChange} type="text" name="title" id="title" placeholder='Enter title here' />
                        <input onChange={onChange} type="text" name="slug" id="slug" placeholder='Enter slug here' />
                        <textarea onChange={onChange} name="content" id="content" rows="20" placeholder='Enter post'></textarea>
                    </div>
                    <div className={`d-flex flex-column justify-content-around ${styles.lower} `}>
                        <div className='d-flex flex-column gap-3'>
                            <button disabled={loading} onClick={addPost} className={`${btnStyles.addButton} w-100`}>{loading ? <LoadingSpinner /> : 'Publish'}</button>
                        </div>
                        <div className="d-flex flex-column gap-3">
                            <input onChange={onChange} type="text" name="redirect" id="redirect" placeholder='https://example.com' />
                            <button disabled={loading} className={`${btnStyles.addButton} w-100`}>Redirect</button>
                        </div>
                        <div className='d-flex flex-column gap-3'>
                            {!imageLoaded ? <div onClick={uploadImage} className={styles.thumbnail}>
                                <span>Click to Choose image</span>
                            </div> : <div>
                                <img src={imageURL} alt="uploadedImage" className='img-fluid' />
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <input onChange={captureImage} ref={imageRef} className={styles.hiddenInput} type="file" name="picture" id="picture" />
        </>
    )
}

export default CreatePost