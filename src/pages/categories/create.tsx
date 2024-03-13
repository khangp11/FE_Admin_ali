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

import { ICategory, IStore } from "../../interfaces";
import { watch } from "fs";
import axios from "axios";
import { Button } from "@mui/material";

export const CategoryCreate: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const {
        register,
        control,
        formState: { errors },
        saveButtonProps,
    } = useForm<ICategory, HttpError, ICategory>();


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
                    <Grid mb={1} item xs={12} md={4}>
                        <Stack
                            gap={1}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Avatar
                                src="/images/default-store-img-lg.png"
                                sx={{
                                    width: {
                                        xs: 180,
                                        md: 256,
                                    },
                                    height: {
                                        xs: 180,
                                        md: 256,
                                    },
                                }}
                            />
                            <Typography fontWeight="bold" variant="body2">
                                {t("stores.selectLocation")}
                            </Typography>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Stack gap="24px">
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
                                                value={true}
                                                control={<Radio />}
                                                label={t("True")}
                                            />
                                            <FormControlLabel
                                                value={false}
                                                control={<Radio />}
                                                label={t("False")}
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

                            {/* Company ID */}
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
                                    {t("Company ID")}
                                </FormLabel>
                                <TextField
                                    {...register("company_id", {
                                        required: t("errors.required.field", {
                                            field: "company_id",
                                        }),
                                    })}
                                    size="small"
                                    margin="none"
                                    variant="outlined"
                                />
                                {errors.company_id && (
                                    <FormHelperText error>
                                        {errors.company_id.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            {/* name */}
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
                                    {t("Name")}
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
                            {/* description */}
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
                                    {t("Description")}
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

                        </Stack>
                    </Grid>
                    <Grid
                        sx={{
                            paddingX: {
                                xs: 0,
                                md: 4,
                            },
                        }}
                        item
                        xs={12}
                        md={4}
                    >
                    </Grid>
                </Grid>
            </form>
        </Create>

    );
};
function setValue(arg0: string, imageUpload: any, arg2: { shouldValidate: boolean; }) {
    throw new Error("Function not implemented.");
}

