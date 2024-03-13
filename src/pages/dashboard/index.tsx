import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import { useTranslate } from "@refinedev/core";

import {
    DailyOrders,
    DailyRevenue,
    DeliveryMap,
    NewCustomers,
    OrderTimeline,
    RecentOrders,
    TrendingMenu,
} from "../../components/dashboard";

export const DashboardPage: React.FC = () => {
    const t = useTranslate();

    return (
        <>
            <Grid container columns={24} spacing={2}>
                <Grid item xs={24} sm={24} md={24} lg={12} xl={7}>
                    <Card>
                        <DailyOrders />
                    </Card>
                </Grid>
                <Grid item xs={24} sm={24} md={24} lg={12} xl={7}>
                    <Card>
                        <NewCustomers />
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Card>
                        <OrderTimeline />
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};
