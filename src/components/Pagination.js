'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '@mui/material/Pagination';
import {Box, Button, IconButton} from "@mui/material";
import ShuffleIcon from '@mui/icons-material/Shuffle';

const PaginationComponent = ({total_pages}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || -1;

    const handlePageChange = (event, value) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', value);

        window.location.href = `?${params.toString()}`;
        // router.push(`?${params.toString()}`);
    };

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} mb={10}>
            <Pagination
                page={currentPage}
                count={total_pages}
                variant="outlined"
                shape="rounded"
                color="primary"
                onChange={handlePageChange}
                siblingCount={2}
                boundaryCount={1}
            />
            <Button
                startIcon={<ShuffleIcon />}
                onClick={(event) => handlePageChange(event, -1)}
            >
                Shuffle
            </Button>
        </Box>
    );
};

export default PaginationComponent;