import {
    HttpError,
    IResourceComponentsProps,
    useTranslate,
} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { Edit } from "@refinedev/mui";
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

import { ICategory, IStore } from "../../interfaces";
import { TextareaAutosize } from "@mui/material";

export const CategoryEdit: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const {
        register,
        control,
        refineCore: { formLoading },
        formState: { errors },
        saveButtonProps,
        setValue,
    } = useForm<ICategory, HttpError, ICategory>();

    return (
        <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
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

                            {/* Name (tiếng việt) */}
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
                                    {t("Name (tiếng việt)")}
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
                                    {t("Description (tiếng việt)")}
                                </FormLabel>
                                <TextareaAutosize
                                    {...register("description")}
                                    placeholder={t("Enter description")}
                                    style={{
                                        width: "100%", // Kích thước rộng bằng 100%
                                        minHeight: "100px", // Độ cao tối thiểu là 100px
                                        padding: "8px",
                                        border: "1px solid #ced4da",
                                        borderRadius: "4px",
                                        resize: "vertical",
                                        fontSize: "14px",
                                        backgroundColor: "#333", // Màu nền tối
                                        color: "#fff", // Màu chữ trắng
                                    }}
                                />
                                {errors.description && (
                                    <FormHelperText error>
                                        {errors.description.message}
                                    </FormHelperText>
                                )}
                            </FormControl>



                            {/* Sort order */}
                            <FormControl>
                                <FormLabel
                                    required
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                >
                                    {t("Sort order")}
                                </FormLabel>
                                <TextField
                                    {...register("sort_order", {
                                        required: t("errors.required.field", {
                                            field: "sort_order",
                                        }),
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                />
                                {errors.sort_order && (
                                    <FormHelperText error>
                                        {errors.sort_order.message}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            {/* Parent ID */}
                            <FormControl>
                                <FormLabel
                                    required
                                    sx={{
                                        marginBottom: "8px",
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        color: "text.primary",
                                    }}
                                >
                                    {t("Parent ID")}
                                </FormLabel>
                                <TextField
                                    {...register("parent_id", {
                                        required: t("errors.required.field", {
                                            field: "parent_id",
                                        }),
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                />
                                {errors.parent_id && (
                                    <FormHelperText error>
                                        {errors.parent_id.message}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            {/* Status */}
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
                                    {t("Status")}
                                </FormLabel>
                                <Controller
                                    control={control}
                                    name="status"
                                    rules={{
                                        required: t("errors.required.common"),
                                    }}
                                    render={({ field }) => (
                                        <RadioGroup
                                            id="status"
                                            {...field}
                                            row
                                        >
                                            <FormControlLabel
                                                value={1}
                                                control={<Radio />}
                                                label={t("True")}
                                                checked={field.value === 1}
                                            />
                                            <FormControlLabel
                                                value={0}
                                                control={<Radio />}
                                                label={t("False")}
                                                checked={field.value === 0}
                                            />
                                        </RadioGroup>
                                    )}
                                />
                                {errors.status && (
                                    <FormHelperText error>
                                        {errors.status.message}
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
                        </Stack>
                    </Grid>

                    {/* English input */}
                    <Grid item xs={12} md={4}>
                        <Stack gap="24px">
                            {/* Name (English) */}
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
                                    {t("Name (English)")}
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
                            {/* Description (English) */}
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
                                    {t("Description (English)")}
                                </FormLabel>
                                <TextareaAutosize
                                    {...register("description_en")}
                                    placeholder={t("Enter description")}
                                    style={{
                                        width: "100%", // Kích thước rộng bằng 100%
                                        minHeight: "100px", // Độ cao tối thiểu là 100px
                                        padding: "8px",
                                        border: "1px solid #ced4da",
                                        borderRadius: "4px",
                                        resize: "vertical",
                                        fontSize: "14px",
                                        backgroundColor: "#333", // Màu nền tối
                                        color: "#fff", // Màu chữ trắng
                                    }}
                                />
                                {errors.description_en && (
                                    <FormHelperText error>
                                        {errors.description_en.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Edit>
    );
};
