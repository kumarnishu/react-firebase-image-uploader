import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React from 'react';
import { storage } from './Config';

const uploadFile = (file: File, imageRef: string, setProgress: React.Dispatch<React.SetStateAction<number>>, setRemoteImg: React.Dispatch<React.SetStateAction<{
    url: string;
    imageRef: string;
} | undefined>>) => {
    const storageRef = ref(storage, imageRef);
    // 'file' comes from the Blob or File API
    const upload = uploadBytesResumable(storageRef, file)
    upload.on('state_changed',
        (snapshot) => {
            
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress)
        },
        (error) => {
           console.log(error);
        },
        () => {
            getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
                setRemoteImg({ url: downloadURL, imageRef: imageRef })
            });
        }
    );
};

export default uploadFile;
