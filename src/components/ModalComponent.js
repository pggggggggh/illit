'use client';

import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Modal, Paper, Typography } from "@mui/material";
import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";

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
                        <ImageUploader setImages={setImages} />
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
