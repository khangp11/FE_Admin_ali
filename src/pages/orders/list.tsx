import React from "react";
import {
    BaseRecord,
    CrudFilters,
    getDefaultFilter,
    HttpError,
    IResourceComponentsProps,
    useExport,
    useNavigation,
    useTranslate,
    useUpdate,
} from "@refinedev/core";
import {
    DateField,
    ExportButton,
    List,
    NumberField,
    useAutocomplete,
    useDataGrid,
} from "@refinedev/mui";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { CustomTooltip, OrderStatus } from "../../components";
import { IOrder, IOrderFilterVariables } from "../../interfaces";

export const OrderList: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const { mutate } = useUpdate();

    const { dataGridProps, search, filters } = useDataGrid<
        IOrder,
        HttpError,
        IOrderFilterVariables
    >({
        initialPageSize: 10,
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const { q, user, status } = params;

            filters.push({
                field: "q",
                operator: "eq",
                value: q !== "" ? q : undefined,
            });
            filters.push({
                field: "user.id",
                operator: "eq",
                value: user,
            });

            filters.push({
                field: "status.text",
                operator: "in",
                value: (status ?? []).length > 0 ? status : undefined,
            });

            return filters;
        },
    });

    const columns = React.useMemo<GridColDef<IOrder>[]>(
        () => [

            {
                field: "id",
                headerName: t("ID"),
                description: t("ID"),
                headerAlign: "center",
                align: "center",
                flex: 1,
                minWidth: 100,
            },
            {
                field: "status",
                headerName: t("orders.fields.status"),
                headerAlign: "center",
                align: "center",

                flex: 1,
                minWidth: 100,
            },
            {
                field: "price",
                headerName: t("price"),
                headerAlign: "center",
                align: "center",
                renderCell: function render({ row }) {
                    return (
                        <Grid container alignItems="center">
                            <Grid item>
                                <NumberField
                                    options={{
                                        currency: "VND",
                                    }}
                                    value={row.price}
                                    sx={{ fontSize: "14px" }}
                                />
                            </Grid>
                            <Grid item sx={{ marginLeft: 1 }}>
                                {"VND"}
                            </Grid>
                        </Grid>
                    );
                },
                flex: 1,
                minWidth: 130,
            },
            {
                field: "address",
                headerName: t("Address"),

                valueGetter: ({ row }) => row.address,
                flex: 1,
                minWidth: 150,
                sortable: false,
            },
            {
                field: "payment",
                headerName: t("Payment"),
                valueGetter: ({ row }) => row.payment,
                flex: 1,
                minWidth: 150,
                sortable: false,
            },
            {
                field: "note",
                headerName: t("Note"),
                valueGetter: ({ row }) => row.note,
                flex: 1,
                minWidth: 150,
                sortable: false,
            },
            {
                field: "quantity",
                headerName: t("Quantity"),
                valueGetter: ({ row }) => row.quantity,
                flex: 1,
                minWidth: 150,
                sortable: false,
            },
            {
                field: "user_name",
                headerName: t("User_Name"),
                valueGetter: ({ row }) => row.user.username,
                flex: 1,
                minWidth: 150,
                sortable: false,
            },
            // {
            //     field: "products",
            //     headerName: t("orders.fields.products"),
            //     headerAlign: "center",
            //     align: "center",
            //     sortable: false,
            //     renderCell: function render({ row }) {
            //         return (
            //             <CustomTooltip
            //                 arrow
            //                 placement="top"
            //                 title={
            //                     <Stack sx={{ padding: "2px" }}>
            //                         {row.products.map((product) => (
            //                             <li key={product.id}>{product.name}</li>
            //                         ))}
            //                     </Stack>
            //                 }
            //             >
            //                 <Typography sx={{ fontSize: "14px" }}>
            //                     {t("orders.fields.itemsAmount", {
            //                         amount: row.products.length,
            //                     })}
            //                 </Typography>
            //             </CustomTooltip>
            //         );
            //     },
            //     flex: 1,
            //     minWidth: 100,
            // },
            {
                field: "date",
                headerName: t("orders.fields.createdAt"),
                flex: 1,
                minWidth: 170,
                renderCell: function render({ row }) {
                    return (
                        <DateField
                            value={row.date}
                            format="LLL"
                            sx={{ fontSize: "14px" }}
                        />
                    );
                },
            },
            {
                field: "actions",
                type: "actions",
                headerName: t("table.actions"),
                flex: 1,
                minWidth: 100,
                sortable: false,
                getActions: ({ id }) => [
                    <GridActionsCellItem
                        key={1}
                        icon={<CheckOutlinedIcon color="success" />}
                        sx={{ padding: "2px 6px" }}
                        label={t("buttons.accept")}
                        showInMenu
                        onClick={() => {
                            mutate({
                                resource: "orders",
                                id,
                                values: {
                                    status: {
                                        id: 2,
                                        text: "Ready",
                                    },
                                },
                            });
                        }}
                    />,
                    <GridActionsCellItem
                        key={2}
                        icon={<CloseOutlinedIcon color="error" />}
                        sx={{ padding: "2px 6px" }}
                        label={t("buttons.reject")}
                        showInMenu
                        onClick={() =>
                            mutate({
                                resource: "orders",
                                id,
                                values: {
                                    status: {
                                        id: 5,
                                        text: "Cancelled",
                                    },
                                },
                            })
                        }
                    />,
                ],
            },
        ],
        [t],
    );

    const { show } = useNavigation();

    const { isLoading, triggerExport } = useExport<IOrder>({
        filters,
        pageSize: 50,
        maxItemCount: 50,
        mapData: (item) => {
            return {
                id: item.id,
                price: item.price,
                // orderNumber: item.orderNumber,
                status: item.status,
                user: item.user.fullname,
            };
        },
    });

    const { register, handleSubmit, control } = useForm<
        BaseRecord,
        HttpError,
        IOrderFilterVariables
    >({
        defaultValues: {
            status: getDefaultFilter("status.text", filters, "in"),
            q: getDefaultFilter("q", filters, "eq"),
            store: getDefaultFilter("store.id", filters, "eq"),
            user: getDefaultFilter("user.id", filters, "eq"),
        },
    });

    const { autocompleteProps: storeAutocompleteProps } = useAutocomplete({
        resource: "stores",
        defaultValue: getDefaultFilter("store.id", filters, "eq"),
    });

    const { autocompleteProps: orderAutocompleteProps } = useAutocomplete({
        resource: "orderStatuses",
    });

    const { autocompleteProps: userAutocompleteProps } = useAutocomplete({
        resource: "users",
        defaultValue: getDefaultFilter("user.id", filters, "eq"),
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={3}>
                <Card sx={{ paddingX: { xs: 2, md: 0 } }}>
                    <CardHeader title={t("orders.filter.title")} />
                    <CardContent sx={{ pt: 0 }}>
                        <Box
                            component="form"
                            sx={{ display: "flex", flexDirection: "column" }}
                            autoComplete="off"
                            onSubmit={handleSubmit(search)}
                        >
                            <TextField
                                {...register("q")}
                                label={t("orders.filter.search.label")}
                                placeholder={t(
                                    "orders.filter.search.placeholder",
                                )}
                                margin="normal"
                                fullWidth
                                autoFocus
                                size="small"
                            />
                            <Controller
                                control={control}
                                name="status"
                                render={({ field }) => (
                                    <Autocomplete
                                        {...orderAutocompleteProps}
                                        {...field}
                                        multiple
                                        onChange={(_, value) => {
                                            field.onChange(
                                                value.map((p) => p.text ?? p),
                                            );
                                        }}
                                        getOptionLabel={(item) => {
                                            return item?.text
                                                ? item.text
                                                : item;
                                        }}
                                        isOptionEqualToValue={(option, value) =>
                                            value === undefined ||
                                            option?.id?.toString() ===
                                            (value?.id ?? value)?.toString()
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label={t(
                                                    "orders.filter.status.label",
                                                )}
                                                placeholder={t(
                                                    "orders.filter.status.placeholder",
                                                )}
                                                margin="normal"
                                                variant="outlined"
                                                size="small"
                                            />
                                        )}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="user"
                                render={({ field }) => (
                                    <Autocomplete
                                        {...userAutocompleteProps}
                                        {...field}
                                        onChange={(_, value) => {
                                            field.onChange(value?.id ?? value);
                                        }}
                                        getOptionLabel={(item) => {
                                            return item.username
                                                ? item.username
                                                : userAutocompleteProps?.options?.find(
                                                    (p) =>
                                                        p.id.toString() ===
                                                        item.toString(),
                                                )?.username ?? "";
                                        }}
                                        isOptionEqualToValue={(option, value) =>
                                            value === undefined ||
                                            option?.id?.toString() ===
                                            (value?.id ?? value)?.toString()
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label={t(
                                                    "orders.filter.user.label",
                                                )}
                                                placeholder={t(
                                                    "orders.filter.user.placeholder",
                                                )}
                                                margin="normal"
                                                variant="outlined"
                                                size="small"
                                            />
                                        )}
                                    />
                                )}
                            />
                            <br />
                            <Button type="submit" variant="contained">
                                {t("orders.filter.submit")}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} lg={9}>
                <List
                    wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}
                    headerProps={{
                        action: (
                            <ExportButton
                                onClick={triggerExport}
                                loading={isLoading}
                            />
                        ),
                    }}
                >
                    <DataGrid
                        {...dataGridProps}
                        columns={columns}
                        filterModel={undefined}
                        autoHeight
                        onRowClick={({ id }) => {
                            show("orders", id);
                        }}
                        pageSizeOptions={[10, 20, 50, 100]}
                        sx={{
                            ...dataGridProps.sx,
                            "& .MuiDataGrid-row": {
                                cursor: "pointer",
                            },
                        }}
                    />
                </List>
            </Grid>
        </Grid>
    );
};
