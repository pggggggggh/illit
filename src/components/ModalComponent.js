'use client';

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup, Grid2,
    IconButton,
    Modal,
    Paper,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const memberList = ["YUNAH", "MINJU", "MOKA", "WONHEE", "IROHA"];

const UploadModal = () => {
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        let newSelectedMembers;
        if (checked) {
            if (value === "ILLIT") newSelectedMembers = memberList;
            else newSelectedMembers = [...selectedMembers, value];
        } else {
            if (value === "ILLIT") newSelectedMembers = [];
            else newSelectedMembers = selectedMembers.filter((member) => member !== value);
        }
        setSelectedMembers(newSelectedMembers);
    };

    const handleConfirm = async () => {
        if (selectedMembers.length === 0) return;
        if (images.length === 0) return;

        const formData = new FormData();
        selectedMembers.map(value => {
            formData.append("members", value);
        })
        images.map(image => {
            formData.append("files", image.file);
        });

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/upload", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error);
        }

        window.location.reload()
    };

    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        const mappedFiles = acceptedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setFiles((prevFiles) => {
            const newFiles = [...prevFiles, ...mappedFiles];
            setImages(newFiles);
            return newFiles;
        });
    }, [setImages]);

    const handleRemove = (file) => {
        setFiles((prevFiles) => {
            const filteredFiles = prevFiles.filter((f) => f.file !== file);
            setImages(filteredFiles);
            return filteredFiles;
        });
        URL.revokeObjectURL(file.preview);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/gif': [],
            'image/webp': [],
        },
        maxSize: 20 * 1024 * 1024,
        maxFiles: 20,
    });

    return (
        <>
            <Button variant="contained" onClick={handleOpen}>
                Upload
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        maxWidth: 600
                    }}
                >
                    <Paper sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Typography mb={3}>Note that uploading Weverse DM images are prohibited!<br />Up to 20MB & 20 files at once</Typography>

                        <Box sx={{width: "100%", mb: 5}}>
                            <Box
                                {...getRootProps()}
                                sx={{
                                    border: "1px dashed #ccc",
                                    padding: "20px",
                                    textAlign: "center",
                                    cursor: "pointer",
                                }}
                            >
                                <input {...getInputProps()} />
                                <Typography>Drop files here, or click to upload</Typography>
                            </Box>

                            {files.length > 0 && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        overflowX: "auto",
                                        mt: 2,
                                        gap: 2,
                                    }}
                                >
                                    {files.map(({file, preview}, index) => (
                                        <Box key={index} sx={{position: "relative", minWidth: "150px"}}>
                                            <img
                                                src={preview}
                                                alt={`preview ${index}`}
                                                style={{
                                                    width: "100%",
                                                    height: "150px",
                                                    objectFit: "contain",
                                                    borderRadius: "8px",
                                                }}
                                            />
                                            <IconButton
                                                sx={{
                                                    position: "absolute",
                                                    top: 3,
                                                    right: 3,
                                                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                                                }}
                                                onClick={() => handleRemove(file)}
                                            >
                                                <CloseIcon sx={{fontSize: 16, color: "black"}}/>
                                            </IconButton>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Box>

                        <FormControl component="fieldset">
                            <Typography textAlign={"center"}>These are all pics of:</Typography>
                            <FormGroup aria-label="position">
                                <Grid2 container>
                                    <Grid2 key={"ILLIT"} size={{xs: 6, lg: 4}} textAlign={"center"}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedMembers.length === memberList.length}
                                                    onChange={handleCheckboxChange}
                                                    value={"ILLIT"}
                                                />
                                            }
                                            label={"ILLIT"}
                                            labelPlacement="bottom"
                                            sx={{margin: 0.5}}
                                        />
                                    </Grid2>
                                    {memberList.map((member) => (
                                        <Grid2 key={member} size={{xs: 6, lg: 4}} textAlign={"center"}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={selectedMembers.includes(member)}
                                                        onChange={handleCheckboxChange}
                                                        value={member}
                                                    />
                                                }
                                                label={member}
                                                labelPlacement="bottom"
                                                sx={{margin: 0.5}}
                                            />
                                        </Grid2>
                                    ))}
                                </Grid2>
                            </FormGroup>
                        </FormControl>

                        <Button variant="contained" onClick={handleConfirm} sx={{mt: 2}}>
                            Upload!
                        </Button>
                    </Paper>
                </Box>
            </Modal>
        </>
    );
};

export default UploadModal;
