'use client';

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    IconButton,
    Modal,
    Paper,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const UploadModal = () => {
    const [open, setOpen] = useState(false);
    const [selectedNames, setSelectedNames] = useState({
        YUNAH: false,
        MINJU: false,
        MOKA: false,
        WONHEE: false,
        IROHA: false,
    });
    const [images, setImages] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCheckboxChange = (event) => {
        setSelectedNames({
            ...selectedNames,
            [event.target.name]: event.target.checked,
        });
    };

    const handleConfirm = () => {
        const selectedValues = Object.keys(selectedNames).filter((name) => selectedNames[name]);
        console.log("Selected names:", selectedValues);
        console.log("Uploaded images:", images);
        handleClose();
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
        accept: "image/*",
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
                        <Typography mb={3}>Note that uploading Weverse DM images are prohibited!</Typography>

                        <Box sx={{ width: "100%", mb: 5 }}>
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
                                    {files.map(({ file, preview }, index) => (
                                        <Box key={index} sx={{ position: "relative", minWidth: "150px" }}>
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
                                                <CloseIcon sx={{ fontSize: 16, color: "black" }} />
                                            </IconButton>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Box>

                        <FormControl component="fieldset">
                            <Typography align="left">These are all pics of:</Typography>
                            <FormGroup aria-label="position" row>
                                {Object.keys(selectedNames).map((name) => (
                                    <FormControlLabel
                                        key={name}
                                        control={
                                            <Checkbox
                                                checked={selectedNames[name]}
                                                onChange={handleCheckboxChange}
                                                name={name}
                                            />
                                        }
                                        label={name}
                                        labelPlacement="bottom"
                                        sx={{ margin: 1 }}
                                    />
                                ))}
                            </FormGroup>
                        </FormControl>

                        <Button variant="contained" onClick={handleConfirm} sx={{ mt: 2 }}>
                            Upload!
                        </Button>
                    </Paper>
                </Box>
            </Modal>
        </>
    );
};

export default UploadModal;
