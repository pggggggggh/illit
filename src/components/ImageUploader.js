import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ImageUploader = ({ setImages }) => {
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
    );
};

export default ImageUploader;
