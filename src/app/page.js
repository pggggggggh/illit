import Image from "next/image";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Container, Pagination,
    Typography,
    useMediaQuery
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {Masonry} from "@mui/lab";
import UploadModal from "@/components/ModalComponent";
import SearchFilter from "@/components/SearchFilter";
import PaginationComponent from "@/components/Pagination";

export default async function Home({searchParams}) {
    const queryString = new URLSearchParams(searchParams).toString();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}?${queryString}`, {
        cache: 'no-store'
    });
    const res_json = await res.json();
    const data = res_json["images"]
    const total_pages = res_json["total_pages"]

    const handlePageChange = (event, newPage) => {
        if (typeof window !== 'undefined') {
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('page', newPage);
            window.location.href = newUrl.toString();
        }
    };

    return (
        <Container maxWidth="lg" sx={{}}>
            <SearchFilter/>

            <Masonry columns={{xs: 1, sm: 3}} spacing={1}>
                <Card
                    key={100}
                    sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover .image': {
                            transform: 'scale(1.1)',
                        }
                    }}
                >
                    <CardMedia>
                        <Image
                            className="image"
                            src={"/images/hero.png"}
                            alt={""}
                            layout="responsive"
                            width={600}
                            height={900}
                            style={{
                                transition: "transform 0.3s ease-in-out",
                                position: "relative"
                            }}
                        />
                    </CardMedia>
                    <CardContent
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            zIndex: 2,
                        }}
                    >
                        <div>
                            <Typography
                                sx={{
                                    fontStyle: 'italic',
                                    fontWeight: '400',
                                    lineHeight: '0.8',
                                    fontSize: 'h3.fontSize',
                                    letterSpacing: "-0.05em",
                                }}
                                gutterBottom
                            >
                                ILLIT Photo Archive
                            </Typography>
                            <UploadModal/>
                        </div>
                    </CardContent>
                </Card>
                {data.map((item, index) => (
                    <Card
                        key={index}
                        sx={{
                            overflow: 'hidden',
                            '&:hover .image': {
                                transform: 'scale(1.1)',
                            }
                        }}
                    >
                        <CardMedia>
                            <a href={item.url} download target="_self">
                                <Image
                                    className="image"
                                    src={item.url}
                                    alt={""}
                                    layout="responsive"
                                    width={item.width}
                                    height={item.height}
                                    style={{transition: "transform 0.3s ease-in-out"}}
                                />
                            </a>
                        </CardMedia>
                    </Card>
                ))}
            </Masonry>
            <Box display={"flex"} justifyContent={"center"}>
                <PaginationComponent total_pages={total_pages}/>
            </Box>
        </Container>
    );
};
