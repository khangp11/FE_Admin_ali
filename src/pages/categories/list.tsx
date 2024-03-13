import React, { useCallback, useState } from "react";
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
import {
    getDefaultFilter,
} from "@refinedev/core";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
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
import { ICategory, IProduct, Nullable } from "../../interfaces";
import axios from "axios";

export const CategoryList: React.FC<IResourceComponentsProps> = () => {
    const {
        refineCore: { onFinish, id, setId },
        register,
        handleSubmit,
    } = useForm<ICategory>({
        refineCoreProps: {
            redirect: false,
            action: "edit",
        },
    });

    const t = useTranslate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState<ICategory[]>([]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/category/searchname', {
                name: searchTerm
            });
            setSearchResult(response.data);
        } catch (error) {
            console.error("Lỗi khi tìm kiếm danh mục:", error);
        }
    };

    const columns = React.useMemo<ColumnDef<ICategory>[]>(
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
                id: "name",
                accessorKey: "name",
                header: t("name"),
                cell: function render({ row, getValue }) {
                    return (
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography>{getValue() as string}</Typography>
                        </Stack>
                    );
                },
            },
            {
                id: "status",
                accessorKey: "status",
                header: t("Status"),
                cell: function render({ row, getValue }) {
                    const status = getValue() as number;
                    return (
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography>{status == 1 ? "Hoạt động" : "Ẩn"}</Typography>
                        </Stack>
                    );
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
    } = useTable<ICategory>({
        columns,
        initialState: {
            sorting: [{ id: "title", desc: false }],
        },
    });


    const handleEditButtonClick = (editId: string) => {
        setId(editId);
    };

    const renderEditRow = useCallback((row: Row<ICategory>) => {
        const { id, name, status } = row.original;

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
            <Paper
                component="form"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: 400,
                }}
                onSubmit={handleSearch}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={t("Tiêu đề")}
                    inputProps={{
                        "aria-label": "product search",
                    }}
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <IconButton
                    type="submit"
                    sx={{ p: "10px" }}
                    aria-label="search"
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
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
                                            (row.original as ICategory).id ? (
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

