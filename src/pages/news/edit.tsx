import {
    HttpError,
    IResourceComponentsProps,
    useApiUrl,
    useTranslate,
} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { Create } from "@refinedev/mui";
import InputMask from "react-input-mask";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Avatar from "@mui/material/Avatar";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import type { TextFieldProps } from "@mui/material/TextField";

import { ICategory, INews, IStore } from "../../interfaces";
import { watch } from "fs";
import axios from "axios";
import { Button, Checkbox, Chip, CircularProgress, Input, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";

interface Item {
    id: number;
    name: string;
    name_en: string;
}
export const NewsEdit: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const {
        register,
        control,
        formState: { errors },
        saveButtonProps,
    } = useForm<INews, HttpError, INews>();

    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("refine-auth");
        const fetchData = async () => {
            if (control._formValues.id) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/news/${control._formValues.id}`, {
                        headers: {
                            'token': `${token}`
                        }
                    })
                    const cat = response.data.category_id;
                    const catIds = cat.split(',').map((item: string) => parseInt(item.trim()));
                    console.log(catIds);
                    setSelectedItems(catIds);


                } catch (error) {
                    console.error('Error fetching category data:', error);
                }
            }
        };
        fetchData();
    }, [control._formValues.id]);

    useEffect(() => {
        const token = localStorage.getItem("refine-auth");

        axios.get('http://localhost:8080/api/category', {
            headers: {
                'token': `${token}`
            }
        })
            .then(response => {
                const data: Item[] = response.data;
                setItems(data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    console.log(selectedItems);

    const handleCheckboxChange = (id: number) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    return (
        <Create saveButtonProps={saveButtonProps}>
            <form>
                <Grid
                    container
                    marginTop="8px"
                    sx={{
                        marginX: { xs: "0px" },
                        paddingX: { xs: 1, md: 4 },
                    }}
                >
                    <Grid item xs={12} md={4}>
                        <Stack gap="24px">
                            <FormControl>
                                <TextField
                                    {...register("category_id")}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                    style={{ display: "none" }}

                                />
                                <TextField
                                    {...register("id")}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                    style={{ display: "none" }}
                                />
                                <FormLabel
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                    required
                                >
                                    {t("Tiêu đề (tiếng việt)")}
                                </FormLabel>
                                <TextField
                                    {...register("name")}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                />
                                {errors.name && (
                                    <FormHelperText error>
                                        {errors.name.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl>
                                <FormLabel
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                    required
                                >
                                    {t("Giới thiệu (tiếng việt)")}
                                </FormLabel>
                                <TextField
                                    {...register("content")}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                />
                                {errors.content && (
                                    <FormHelperText error>
                                        {errors.content.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl>
                                <FormLabel
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                    required
                                >
                                    {t("Nội dung (tiếng việt)")}
                                </FormLabel>
                                <TextField
                                    {...register("description")}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                />
                                {errors.description && (
                                    <FormHelperText error>
                                        {errors.description.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            {/* Upload File */}
                            <FormControl>
                                <FormLabel
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                    required
                                >
                                    {t("Upload File")}
                                </FormLabel>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                    }}
                                />
                                {errors.file && (
                                    <FormHelperText error>
                                        {errors.file.message}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <div>
                                {items.map((item: Item) => (
                                    <FormControlLabel
                                        key={item.id}
                                        control={
                                            <Checkbox
                                                checked={selectedItems?.includes(item.id)}
                                                onChange={() => handleCheckboxChange(item.id)}
                                            />
                                        }
                                        label={item.name}
                                    />
                                ))}
                            </div>
                        </Stack>
                    </Grid>
                    {/* tieng anh  */}
                    <Grid item xs={12} md={4}>
                        <Stack gap="24px">
                            <FormControl>
                                <FormLabel
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                    required
                                >
                                    {t("Tiêu đề (English)")}
                                </FormLabel>
                                <TextField
                                    {...register("name_en")}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                />
                                {errors.name_en && (
                                    <FormHelperText error>
                                        {errors.name_en.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl>
                                <FormLabel
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                    required
                                >
                                    {t("Giới thiệu (English)")}
                                </FormLabel>
                                <TextField
                                    {...register("content_en")}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                />
                                {errors.content_en && (
                                    <FormHelperText error>
                                        {errors.content_en.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl>
                                <FormLabel
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                    required
                                >
                                    {t("Nội dung (English)")}
                                </FormLabel>
                                <TextField
                                    {...register("description_en")}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                />
                                {errors.description_en && (
                                    <FormHelperText error>
                                        {errors.description_en.message}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            {/* Upload File */}
                            <FormControl>
                                <FormLabel
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                    required
                                >
                                    {t("Upload File")}
                                </FormLabel>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                    }}
                                />
                                {errors.file && (
                                    <FormHelperText error>
                                        {errors.file.message}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <div>
                                {items.map((item) => (
                                    <FormControlLabel
                                        key={item.id}
                                        control={
                                            <Checkbox
                                                checked={selectedItems.includes(item.id)}
                                                onChange={() => handleCheckboxChange(item.id)}
                                            />
                                        }
                                        label={item.name_en}
                                    />
                                ))}
                                <div>
                                    {selectedItems.map((itemId) => {
                                        const selectedItem = items.find(item => item.id === itemId);
                                        return (
                                            <Chip key={itemId} label={selectedItem ? selectedItem.name_en : "Unknown"} onDelete={() => handleCheckboxChange(itemId)} />
                                        );
                                    })}
                                </div>
                            </div>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Create>
    );
};
function setValue(arg0: string, imageUpload: any, arg2: { shouldValidate: boolean; }) {
    throw new Error("Function not implemented.");
}

