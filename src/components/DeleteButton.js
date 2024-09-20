'use client';

import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";

export default function DeleteButton({url}) {
    const handleDelete = async (url) => {
        console.log(url)
        try {
            console.log(url)
            await fetch(process.env.NEXT_PUBLIC_API_URL + "/kkt?url=" + url, {
                method: "DELETE"
            });
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (<IconButton
        onClick={() => handleDelete(url)} // 삭제 처리 함수
        sx={{
            position: 'absolute',
            top: 8,  // 위에서 8px
            right: 8, // 오른쪽에서 8px
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // 배경색 설정
            '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)', // 호버 시 배경색
            }
        }}
    >
        <DeleteIcon/>
    </IconButton>);
};