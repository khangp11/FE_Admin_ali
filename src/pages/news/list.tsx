import React from "react";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import {
    IResourceComponentsProps,
    useModal,
    useNavigation,
    useShow,
    useTranslate,
} from "@refinedev/core";
import {
    BooleanField,
    DateField,
    List,
    TextFieldComponent,
    useDataGrid,
} from "@refinedev/mui";

import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import EditOutlined from "@mui/icons-material/EditOutlined";

import { StoreProducts } from "../../components/store";
import { ICategory, INews, IStore } from "../../interfaces";

export const NewsList: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();

    const { edit } = useNavigation();

    const { show, visible, close } = useModal();

    const { queryResult, setShowId } = useShow<INews>();

    const { data: showQueryResult } = queryResult;
    const record = showQueryResult?.data;

    const { dataGridProps } = useDataGrid<INews>({
        initialPageSize: 10,
    });

    const columns = React.useMemo<GridColDef<INews>[]>(
        () => [

            {
                field: "id",
                align: "center",
                headerName: t("stores.fields.id"),
            },
            {
                field: "avatar",
                headerName: "Hình ảnh",
                align: "center",
                renderCell: function render() {
                    return (
                        <Avatar
                            sx={{ width: 64, height: 64 }}
                            src="/images/default-store-img.png"
                            alt="Default Store Image"
                        />
                    );
                },
            },
            {
                field: "name",
                headerName: t("Tiêu đề"),
                flex: 1,
                minWidth: 160,
            },
            {
                field: "name_category",
                headerName: t("Danh mục"),
                flex: 1,
                minWidth: 160,
            },
            {
                field: "status",
                headerName: t("Status"),
                flex: 2,
                minWidth: 300,
                renderCell: (params) => {
                    const status = params.value;
                    return status === 1 ? "Hiển thị" : "Ẩn";
                },
            },
            {
                field: "category_id",
                headerName: t("ID"),
                flex: 1,
                minWidth: 160,

            },
            {
                field: "actions",
                headerName: t("table.actions"),
                type: "actions",
                getActions: ({ row }) => [
                    <GridActionsCellItem
                        key={1}
                        label={t("buttons.edit")}
                        icon={<EditOutlined />}
                        showInMenu
                        onClick={() => edit("news", row.id)}
                    />,
                ],
            },
        ],
        [t],
    );

    return (
        <Paper>
            <List
                canCreate
                wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}
            >
                <DataGrid
                    {...dataGridProps}
                    columns={columns}
                    rowHeight={80}
                    autoHeight
                    density="comfortable"
                    pageSizeOptions={[10, 20, 50, 100]}
                />
            </List>

        </Paper>
    );
};
