import { Box, Paper } from '@mui/material';
import { useState } from 'react';
import PreviewList from './PreviewList';


const AddImages = () => {
  const [files, setFiles] = useState<File[]>();
  console.log("files:", files)
  return (
    <>
      <Paper
        sx={{
          cursor: 'pointer',
          background: '#fafafa',
          color: '#bdbdbd',
          border: '1px dashed #ccc',
          '&:hover': { border: '1px solid #ccc' },
        }}
      >
        <Box style={{ padding: '16px' }}>
          <input type="file" multiple accept='image/*' onChange={(e) => {
            if (e.target.files) {
              let data: File[] | undefined = []
              if (files)
                data = files
              for (let i = 0; i < e.target.files.length; i++) {
                data = [...data, e.target.files[i]]
              }
              setFiles(data)
            }
          }} />
          <em>(images with *.jpeg, *.png, *.jpg extension will be accepted)</em>
        </Box>
      </Paper>
      <PreviewList files={files} />
    </>
  );
};

export default AddImages;
