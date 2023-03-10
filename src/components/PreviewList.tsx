import { ImageList } from '@mui/material';
import PreviewItem from './PreviewItem';

const PreviewList = ({ files }: { files: File[] | undefined }) => {
    return (
        <ImageList
            rowHeight={250}
            sx={{
                '&.MuiImageList-root': {
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(250px, 1fr))!important',
                },
            }}
        >
            <>
                {
                    files?.map((file, index) => {
                        return (
                            <PreviewItem key={index} file={file} />
                        )
                    })
                }
            </>
        </ImageList>
    );
};

export default PreviewList;
