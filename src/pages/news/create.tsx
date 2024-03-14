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
import { Button, Checkbox, CircularProgress, Input, useAutocomplete } from "@mui/material";
import { useEffect, useState } from "react";

interface Item {
    id: number;
    name: string;
    name_en: string;
}

export const NewsCreate: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const {
        register,
        control,
        formState: { errors },
        saveButtonProps,
        setValue,
        handleSubmit,
    } = useForm<INews, HttpError, INews>();

    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

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

    const [imageUrl, setImageUrl] = useState<string>("");


    const handleCheckboxChange = (id: number) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };
    const apiUrl = useApiUrl();
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();
        const target = event.target;
        const file: File = (target.files as FileList)[0];

        formData.append("file", file);

        const res = await axios.post<{ url: string }>(
            `${apiUrl}/media/upload`,
            formData,
            {
                withCredentials: false,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    token: localStorage.getItem('refine-auth')
                },
            },

        );
        const imageUpload: any = res.data;

        setValue("image", imageUpload, { shouldValidate: true });
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
                                    value={selectedItems.join(', ')}
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
                            {/* <FormControl>
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
                            </FormControl> */}

                            <div>
                                {items.map((item: Item) => (
                                    <FormControlLabel
                                        key={item.id}
                                        control={
                                            <Checkbox
                                                checked={selectedItems.includes(item.id)}
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

                            <Grid item xs={12} md={4}>
                                <FormControl>
                                    <FormLabel required>{t("products.fields.images.label")}</FormLabel>
                                    <Stack alignItems="center">
                                        <Avatar src={imageUrl} alt="Image" sx={{ width: 180, height: 180 }} />
                                        <input type="file" accept="image/*" onChange={handleFileChange} />
                                    </Stack>
                                    {errors.image && <FormHelperText error>{errors.image.message}</FormHelperText>}
                                </FormControl>
                            </Grid>


                            {/* Upload File */}
                            {/* <FormControl>
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
                            </FormControl> */}

                            <div>
                                {items.map((item: Item) => (
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

