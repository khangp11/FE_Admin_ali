import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
    IResourceComponentsProps,
    useNavigation,
    useShow,
    useTranslate,
    useUpdate,
} from "@refinedev/core";
import { List } from "@refinedev/mui";
import dayjs from "dayjs";

import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MopedIcon from "@mui/icons-material/Moped";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

import { CourierInfoBox, Map, MapMarker } from "../../components";
import { useOrderCustomKbarActions } from "../../hooks";
import { IEvent, IOrder, IProduct, Iorderdetail } from "../../interfaces";
import axios from "axios";
import { useEffect, useState } from "react";

export const OrderShow: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();

    const { queryResult } = useShow<IOrder>();
    const record = queryResult.data?.data;


    const canAcceptOrder = record?.status === "Pending";
    const canRejectOrder =
        record?.status === "Pending" ||
        record?.status === "Ready" ||
        record?.status === "On The Way";

    const fakeEvents = [
        { status: 'Pending', date: '2024-02-01T10:30:00Z' },
        { status: 'Ready', date: '2024-02-02T11:45:00Z' },
        { status: 'On The Way', date: '' },
        { status: 'Cancelled', date: '' },
    ];
    const mapStatusToNumber = (status: any) => {
        switch (status) {
            case 'Pending':
                return 0;
            case 'Ready':
                return 1;
            case 'On The Way':
                return 2;
            case 'Cancelled':
                return 3;
            default:
                return 0;
        }
    };
    const activeStep = record?.status ? mapStatusToNumber(record.status) : 0;

    const [product, setListProduct] = useState<Iorderdetail[]>([]);
    const [product2, setListProduct2] = useState<IProduct[]>([]);
    const id = record?.id

    useEffect(() => {
        const id = record?.id;

        if (id) {
            async function fetchData() {
                try {
                    const response = await axios.get(`http://localhost:8080/api/orderss/${id}`);
                    setListProduct(response.data || []);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
            fetchData();
        }
    }, [id]);
    useEffect(() => {
        const updatedProducts = product.map(item => item.food);
        setListProduct2(updatedProducts);
    }, [product]);
    console.log(product2);

    const columnsProduct = [
        { field: 'id', headerName: 'ID', flex: 1 },
        {
            field: 'image',
            headerName: 'Image',
            flex: 1,
            renderCell: (params: any) => (
                <img src={`http://res.cloudinary.com/dlxwm5pax/image/upload/v1700937458/${params.value}.jpg`} alt="Product Image" style={{ width: '100%', height: 'auto' }} />
            ),
        },
        { field: 'food_name', headerName: 'Name', flex: 1 },
        { field: 'quantity', headerName: 'Quantity', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 1 },
        {
            field: 'price',
            headerName: 'Price',
            flex: 1,
            renderCell: (params: any) => {
                const priceInVND = (params.value).toLocaleString() + ' VND';
                return <span>{priceInVND}</span>;
            },
        },
        { field: 'star', headerName: 'Star', flex: 1 },
        { field: 'discount', headerName: 'Discount', flex: 1 },

    ];

    const { goBack } = useNavigation();
    const { mutate } = useUpdate();

    const theme = useTheme();

    const isSmallOrLess = useMediaQuery(theme.breakpoints.down("sm"));

    const columns = React.useMemo<GridColDef<IProduct>[]>(
        () => [
            {
                field: "fullname",
                headerName: t("orders.deliverables.fields.items"),
                width: 300,
                renderCell: function render({ row }) {
                    return (
                        <Stack direction="row" spacing={4} alignItems="center">
                            <Avatar
                                sx={{ width: 108, height: 108 }}
                                src={row.image[0]}
                            />
                            <Box>
                                <Typography
                                    variant="body1"
                                    whiteSpace="break-spaces"
                                >
                                    {row.food_name}
                                </Typography>
                                <Typography variant="caption">
                                    #{row.id}
                                </Typography>
                            </Box>
                        </Stack>
                    );
                },
            },
            {
                field: "quantity",
                headerName: t("orders.deliverables.fields.quantity"),
                width: 150,
                sortable: false,
                valueGetter: () => "1x",
            },
            {
                field: "price",
                headerName: t("orders.deliverables.fields.price"),
                width: 100,
                type: "number",
            },
            {
                field: "price",
                headerName: t("orders.deliverables.fields.total"),
                width: 100,
                type: "number",
            },
        ],
        [t],
    );

    const CustomFooter = () => (
        <Stack direction="row" spacing={4} justifyContent="flex-end" p={1}>
            <Typography sx={{ color: "primary.main" }} fontWeight={700}>
                {t("orders.deliverables.mainTotal")}
            </Typography>
            <Typography>{record?.price.toLocaleString() + ' VND'}</Typography>
        </Stack>
    );

    const handleMutate = (status: { id: number; text: string }) => {
        if (record) {
            mutate({
                resource: "orders",
                id: record.id.toString(),
                values: {
                    status,
                },
            });
        }
    };

    useOrderCustomKbarActions(record);

    return (
        <Stack spacing={2}>
            <Card>
                <CardHeader
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                    title={
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="h6">
                                {t("orders.fields.orderID")}
                            </Typography>
                            <Typography variant="caption">{`#${record?.id ?? ""
                                }`}</Typography>
                        </Stack>
                    }
                    avatar={
                        <IconButton onClick={goBack}>
                            <ArrowBackIcon />
                        </IconButton>
                    }

                // action={
                //     <Stack direction="row" spacing={2}>
                //         <Button
                //             disabled={!canAcceptOrder}
                //             variant="outlined"
                //             size="small"
                //             startIcon={<CheckOutlinedIcon />}
                //             onClick={() =>
                //                 handleMutate({
                //                     id: 2,
                //                     text: "Ready",
                //                 })
                //             }
                //         >
                //             {t("buttons.accept")}
                //         </Button>
                //         <Button
                //             disabled={!canRejectOrder}
                //             variant="outlined"
                //             size="small"
                //             color="error"
                //             startIcon={
                //                 <CloseOutlinedIcon sx={{ bg: "red" }} />
                //             }
                //             onClick={() =>
                //                 handleMutate({
                //                     id: 5,
                //                     text: "Cancelled",
                //                 })
                //             }
                //         >
                //             {t("buttons.reject")}
                //         </Button>
                //     </Stack>
                // }
                />
                <CardContent>
                    <Stepper
                        nonLinear
                        activeStep={activeStep}
                        orientation={isSmallOrLess ? 'vertical' : 'horizontal'}
                    >
                        {fakeEvents.map((event, index) => (
                            <Step key={index}>
                                <StepLabel
                                    optional={
                                        <Typography variant="caption">
                                            {dayjs(event.date).format('L LT')}
                                        </Typography>
                                    }
                                >
                                    {event.status}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </CardContent>
            </Card>

            {/* <Paper sx={{ padding: 2 }}>
                <Stack
                    direction="row"
                    flexWrap="wrap"
                    justifyContent={isSmallOrLess ? "center" : "space-between"}
                >
                    <Stack
                        direction={isSmallOrLess ? "column" : "row"}
                        alignItems={isSmallOrLess ? "center" : "flex-start"}
                        textAlign={isSmallOrLess ? "center" : "left"}
                        gap={2}
                    >
                        <Avatar
                            alt={record?.user.username}
                            // src={record?.avatar[0].url}
                            sx={{ width: 100, height: 100 }}
                        />
                        <Box>
                            <Typography>COURIER</Typography>
                            <Typography variant="h6">
                                {record?.user.fullname}
                            </Typography>
                            <Typography variant="caption">
                                ID #{record?.user.id}
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack
                        direction="row"
                        gap={2}
                        padding={1}
                        flexWrap="wrap"
                        justifyContent="center"
                    >
                        <CourierInfoBox
                            text={t("orders.courier.phone")}
                            icon={<PhoneIphoneIcon sx={{ fontSize: 36 }} />}
                            value={record?.courier.gsm}
                        />
                        <CourierInfoBox
                            text={t("orders.courier.deliveryTime")}
                            icon={<MopedIcon sx={{ fontSize: 36 }} />}
                            value="15:05"
                        />
                    </Stack>
                </Stack>
            </Paper> */}

            <List
                headerProps={{
                    title: t("orders.deliverables.deliverables"),
                }}
            >
                <DataGrid
                    autoHeight
                    columns={columnsProduct}
                    rows={product2 || []}
                    hideFooterPagination
                    rowHeight={124}
                    components={{
                        Footer: CustomFooter,
                    }}
                />
            </List>

        </Stack>
    );
};
