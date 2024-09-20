'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '@mui/material/Pagination';

const PaginationComponent = ({total_pages}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1;

    const handlePageChange = (event, value) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', value);

        router.push(`?${params.toString()}`);
    };

    return (
        <Pagination
            page={currentPage}
            count={total_pages}
            variant="outlined"
            color="secondary"
            onChange={handlePageChange}
        />
    );
};

export default PaginationComponent;