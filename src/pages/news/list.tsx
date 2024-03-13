import React, { useCallback } from "react";
import {
    HttpError,
    IResourceComponentsProps,
    useTranslate,
} from "@refinedev/core";
import {
    BooleanField,
    DateField,
    EditButton,
    List,
    NumberField,
    SaveButton,
    useDataGrid,
} from "@refinedev/mui";
import { useForm, useModalForm } from "@refinedev/react-hook-form";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender, Row } from "@tanstack/react-table";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import Edit from "@mui/icons-material/Edit";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";

import { EditProduct } from "../../components";
import { ICategory, IProduct, Nullable, INews } from "../../interfaces";

export const NewList: React.FC<IResourceComponentsProps> = () => {
    const {
        refineCore: { onFinish, id, setId },
        register,
        handleSubmit,
    } = useForm<INews>({
        refineCoreProps: {
            redirect: false,
            action: "edit",
        },
    });

    const t = useTranslate();

    const columns = React.useMemo<ColumnDef<INews>[]>(
        () => [
            {
                id: "id",
                header: t("ID"),
                accessorKey: "id",
                cell: function render({ getValue }) {
                    const numericValue: number = Number(getValue());
                    return <span>{numericValue}</span>;
                },
            },
            {
                id: "image",
                accessorKey: "image",
                header: t("Hình Ảnh"),
                cell: function render({ row, getValue }) {
                    const imageSrc = getValue() as string;
                    if (imageSrc) {
                        return (
                            <Stack direction="row" alignItems="center" spacing={3}>
                                <img src={imageSrc} alt="Hình ảnh" style={{ width: 50, height: 50 }} />
                            </Stack>
                        );
                    } else {
                        return <span>Không có hình ảnh</span>;
                    }
                },
            },
            {
                id: "name",
                header: t("Tiêu Đề"),
                accessorKey: "name",
                cell: function render({ getValue }) {
                    return <span>{getValue() as string}</span>;
                },
            },
            {
                id: "name_category",
                header: t("Danh Mục"),
                accessorKey: "name_category",
                cell: function render({ getValue }) {
                    return <span>{getValue() as string}</span>;
                },
            },
            {
                id: "sort_order",
                header: t("Sắp Xếp"),
                accessorKey: "sort_order",
                cell: function render({ getValue }) {
                    return <span>{getValue() as string}</span>;
                },
            },
            {
                id: "status",
                header: t("Trạng Thái"),
                accessorKey: "status",
                cell: function render({ getValue }) {
                    const numericValue: number = Number(getValue());
                    return <span>{numericValue === 1 ? "Hiển Thị" : "nháp"}</span>;
                },
            },

            {
                id: "actions",
                header: t("table.actions"),
                accessorKey: "id",
                cell: function render({ getValue }) {
                    return (
                        <Stack direction="row">
                            {id ? (
                                <>
                                    <EditButton
                                        onClick={() => {
                                            handleEditButtonClick(
                                                getValue() as string,
                                            );
                                        }}
                                    >
                                        Edit
                                    </EditButton>
                                    <div>Cancel</div>
                                </>
                            ) : (
                                <IconButton
                                    onClick={() => {
                                        setId(getValue() as string);
                                    }}
                                >
                                    <Edit fontSize="small" />
                                </IconButton>
                            )}
                        </Stack>
                    );
                },
            },
        ],
        [t],
    );

    const {
        options: {
            state: { pagination },
            pageCount,
        },
        getHeaderGroups,
        getRowModel,
        setPageIndex,
        setPageSize,
        refineCore: { tableQueryResult },
    } = useTable<INews>({
        columns,
        initialState: {
            sorting: [{ id: "title", desc: false }],
        },
    });


    const handleEditButtonClick = (editId: string) => {
        setId(editId);
    };

    const renderEditRow = useCallback((row: Row<INews>) => {
        const { id, image, name, status, name_category } = row.original;

        return (
            <TableRow key={`edit-${id}-inputs`}>
                <TableCell
                    sx={{
                        flex: "1",
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={3}
                        alignContent="center"
                        alignItems="center"
                    >
                        <TextField
                            fullWidth
                            id="id"
                            type="text"
                            size="small"
                            defaultValue={id}
                            {...register("id", {
                                required: t("errors.required.field", {
                                    field: "id",
                                }),
                            })}
                        />
                        <TextField
                            fullWidth
                            id="iamge"
                            type="text"
                            size="small"
                            defaultValue={image}
                            {...register("iamge", {
                                required: t("errors.required.field", {
                                    field: "iamge",
                                }),
                            })}
                        />
                        <TextField
                            fullWidth
                            id="name"
                            type="text"
                            size="small"
                            defaultValue={name}
                            {...register("name", {
                                required: t("errors.required.field", {
                                    field: "name",
                                }),
                            })}
                        />
                        <TextField
                            fullWidth
                            id="name_category"
                            type="text"
                            size="small"
                            defaultValue={name_category}
                            {...register("name_category", {
                                required: t("errors.required.field", {
                                    field: "name_category",
                                }),
                            })}
                        />
                        <TextField
                            fullWidth
                            id="status"
                            type="text"
                            size="small"
                            defaultValue={status}
                            {...register("status", {
                                required: t("errors.required.field", {
                                    field: "status",
                                }),
                            })}
                        />

                    </Stack>
                </TableCell>
                <TableCell
                    sx={{
                        maxWidth: "150px",
                    }}
                >
                    <SaveButton type="submit">{t("buttons.save")}</SaveButton>
                    <Button onClick={() => setId(undefined)}>
                        {t("buttons.cancel")}
                    </Button>
                </TableCell>
            </TableRow>
        );
    }, []);

    return (
        <List wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}>
            <form onSubmit={handleSubmit(onFinish)}>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            {getHeaderGroups().map((headerGroup) => (
                                <TableRow
                                    key={`header-group-${headerGroup.id}`}
                                >
                                    {headerGroup.headers.map((header) => (
                                        <TableCell
                                            key={`header-group-cell-${header.id}`}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody>
                            {getRowModel().rows.map((row) => {
                                return (
                                    <React.Fragment key={row.id}>
                                        {id ===
                                            (row.original as INews).id ? (
                                            renderEditRow(row)
                                        ) : (
                                            <TableRow>
                                                {row
                                                    .getAllCells()
                                                    .map((cell) => {
                                                        return (
                                                            <TableCell
                                                                key={cell.id}
                                                            >
                                                                {flexRender(
                                                                    cell.column
                                                                        .columnDef
                                                                        .cell,
                                                                    cell.getContext(),
                                                                )}
                                                            </TableCell>
                                                        );
                                                    })}
                                            </TableRow>
                                        )}
                                        {row.getIsExpanded() ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={
                                                        row.getVisibleCells()
                                                            .length
                                                    }
                                                >
                                                </TableCell>
                                            </TableRow>
                                        ) : null}
                                    </React.Fragment>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        {
                            label: "All",
                            value: tableQueryResult.data?.total ?? 100,
                        },
                    ]}
                    showFirstButton
                    showLastButton
                    count={pageCount || 0}
                    rowsPerPage={pagination?.pageSize || 10}
                    page={pagination?.pageIndex || 0}
                    onPageChange={(_, newPage: number) => setPageIndex(newPage)}
                    onRowsPerPageChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                    ) => {
                        setPageSize(parseInt(event.target.value, 10));
                        setPageIndex(0);
                    }}
                />
            </form>
        </List>
    );
};

