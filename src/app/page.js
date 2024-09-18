'use client';

import Image from "next/image";
import {
    Card,
    CardContent,
    CardMedia,
    Container,
    Typography,
    useMediaQuery
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {Masonry} from "@mui/lab";
import UploadModal from "@/components/ModalComponent";

export default function Home() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const columns = isSmallScreen ? 1 : 3;
    const itemData = [
        {
            src: "https://assets.teenvogue.com/photos/66159ed9db21f3a8c3c35fd1/master/w_1600,c_limit/ILLIT_first%20week_1.jpg",
            width: 1600,
            height: 1200,
            likes: 300,
        },
        {
            src: "https://assets.teenvogue.com/photos/66159eef540395ea08670ec2/2:3/w_1332,h_1998,c_limit/ILLIT_MV%20behind_all.jpg",
            width: 600,
            height: 900,
            likes: 200,
        }
    ];

    return (
        <Container maxWidth="lg" sx={{p: 4}}>
            <Masonry columns={columns} spacing={2}>
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
                                    fontWeight: '300',
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
                {itemData.map((item, index) => (
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
                            <Image
                                className="image"
                                src={item.src}
                                alt={""}
                                layout="responsive"
                                width={item.width}
                                height={item.height}
                                style={{transition: "transform 0.3s ease-in-out"}}
                            />
                        </CardMedia>
                    </Card>
                ))}
            </Masonry>
        </Container>
    );
};
