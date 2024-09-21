'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '@mui/material/Pagination';
import {Box} from "@mui/material";

const PaginationComponent = ({total_pages}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1;

    const handlePageChange = (event, value) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', value);

        window.location.href = `?${params.toString()}`;
        // router.push(`?${params.toString()}`);
    };

    return (
        <Box display="flex" justifyContent="center" style={{maxWidth: '100%', width: '100%', overflowX: 'auto'}}>
            <Pagination
                size={"small"}
                page={currentPage}
                count={total_pages}
                variant="outlined"
                shape="rounded"
                color="secondary"
                onChange={handlePageChange}
                siblingCount={2}
                boundaryCount={1}
                showFirstButton
            />
        </Box>
    );
};

export default PaginationComponent;