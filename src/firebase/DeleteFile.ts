import { deleteObject, ref } from 'firebase/storage';
import { storage } from './Config';

const DeleteFile = (imageRef:string) => {
    const StorageRef = ref(storage, imageRef);
    return deleteObject(StorageRef);
};

export default DeleteFile;
