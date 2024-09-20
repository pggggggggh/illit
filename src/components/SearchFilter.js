"use client";

import {Box, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const memberList = ["YUNAH", "MINJU", "MOKA", "WONHEE", "IROHA"];
const tagList = [
    {
        label: "None",
        value: ""
    },
    {
        label: "GIF",
        value: "gif"
    },
    {
        label: "Selfie",
        value: "selfie"
    },
    {
        label: "Close-up",
        value: "close_up"
    },
    {
        label: "Article",
        value: "article"
    },
    {
        label: "Stage",
        value: "stage"
    },
];

export default function SearchFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedMembers, setSelectedMembers] = useState(
        searchParams.get("members") ? searchParams.get("members").split(",") : []
    );
    const [tag, setTag] = useState("");

    const handleMemberChange = (event) => {
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

        const params = new URLSearchParams(searchParams);
        if (newSelectedMembers.length > 0) {
            params.set("members", newSelectedMembers.join(","));
        } else {
            params.delete("members");
        }

        router.push(`?${params.toString()}`);
    };

    const handleTagChange = (event) => {
        const {value} = event.target;
        const params = new URLSearchParams(searchParams);
        setTag(value);
        if (value !== "") {
            params.set("tags", value);
        } else {
            params.delete("tags");
        }

        router.push(`?${params.toString()}`);
    };

    return (
        <Box sx={{display:'flex', alignItems: "center", px: 1}}>
            <Box sx={{flexGrow: 1}}>
                <FormControlLabel
                    key={"ILLIT"}
                    control={
                        <Checkbox
                            checked={selectedMembers.length === memberList.length}
                            onChange={handleMemberChange}
                            value={"ILLIT"}
                        />
                    }
                    label={"ILLIT"}
                />
                {memberList.map((member) => (
                    <FormControlLabel
                        key={member}
                        control={
                            <Checkbox
                                checked={selectedMembers.includes(member)}
                                onChange={handleMemberChange}
                                value={member}
                            />
                        }
                        label={member}
                    />
                ))}
            </Box>
            <FormControl sx={{m: 1, minWidth: 120}} size="small">
                <InputLabel id="demo-select-small-label">Tag</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={tag}
                    label="Tag"
                    onChange={handleTagChange}
                >
                    {tagList.map((tag, index) => (
                        <MenuItem key={index} value={tag.value}>{tag.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
