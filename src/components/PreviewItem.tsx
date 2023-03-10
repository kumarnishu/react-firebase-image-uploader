import { Cancel, Delete} from '@mui/icons-material';
import {
    IconButton, ImageListItem, ImageListItemBar, Stack, Tooltip
} from '@mui/material';
import { useEffect, useState } from 'react';
import DeleteFile from '../firebase/DeleteFile';
import uploadFile from '../firebase/UploadFile';
import CircularProgressWithLabel from './CircularProgressWithLabel';

function ProgressItem({ file }: { file: File }) {
    const [progress, setProgress] = useState(0)
    const [localImageUrl, setLocalImageurl] = useState<string>()
    const [remoteImg, setRemoteImg] = useState<{
        url: string,
        imageRef: string
    }>()

    async function handleDelete() {
        if (remoteImg) {
            await DeleteFile(remoteImg.imageRef)
            setRemoteImg(undefined)
        }
    }
    function removeImage() {
        if (localImageUrl) {
            URL.revokeObjectURL(localImageUrl)
            setLocalImageurl(undefined)
        }
    }
    // handling upload
    useEffect(() => {
        if (file) {
            setLocalImageurl(URL.createObjectURL(file))
            upload()
        }
        async function upload() {
            await uploadFile(file, `images/${file.name}`, setProgress, setRemoteImg)
        }
    }, [file])

    // handling remote images
    useEffect(() => {
        if (remoteImg) {
            if (localImageUrl) {
                setLocalImageurl(undefined)
                URL.revokeObjectURL(localImageUrl)
            }
        }
        // on unmounting
        return () => {
            if (localImageUrl)
                URL.revokeObjectURL(localImageUrl)
        }
    }, [remoteImg, localImageUrl])

    return (
        <>
            {
                remoteImg ?
                    <ImageListItem sx={{ position: "relative" }} cols={1} rows={1}>
                        <img
                            src={remoteImg.url}
                            alt="rooms"
                            style={{ height: '100%', opacity: remoteImg ? 1 : 0.3,background:'cover' }}
                        />
                        <ImageListItemBar
                            position="top"
                            actionIcon={
                                <Tooltip
                                    title="delete"
                                >
                                    <IconButton
                                        sx={{
                                            color: 'red', zIndex: 2,
                                            backgroundColor: 'rgba(0,0,0,0.8'
                                        }}
                                        onClick={handleDelete}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            }
                        >
                        </ImageListItemBar>


                    </ImageListItem>
                    : null
            }
            {
                localImageUrl ?
                    <ImageListItem sx={{ position: "relative" }} cols={1} rows={1}>
                        <img
                            src={localImageUrl}
                            alt="rooms"
                            loading="lazy"
                            style={{ height: '100%', opacity: 0.3, background: 'cover' }}
                        />
                        <ImageListItemBar
                            sx={{
                                background: 'none'
                            }}
                            position="top"
                            actionIcon={
                                <Tooltip
                                    title="remove"
                                >

                                    <IconButton
                                        sx={{ color: 'red', zIndex: 2 }}
                                        onClick={removeImage}
                                    >
                                        <Cancel />
                                    </IconButton>
                                </Tooltip>

                            }
                        >
                        </ImageListItemBar>
                        <Stack
                            sx={{
                                position: 'absolute',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%'
                            }}
                        >{
                                <CircularProgressWithLabel value={progress} />
                            }
                        </Stack>
                    </ImageListItem>
                    : null
            }
        </>
    )
}
export default ProgressItem