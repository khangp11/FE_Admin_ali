import { useApiUrl, useCustom, useTranslate } from "@refinedev/core";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { BarChart, Bar, Tooltip, ResponsiveContainer } from "recharts";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import dayjs from "dayjs";
import { ChartTooltip } from "../chartTooltip";
import { ISalesChart } from "../../../interfaces";

export const DailyOrders: React.FC = () => {
    const t = useTranslate();

    const API_URL = useApiUrl();
    const url = `${API_URL}/allnews`;

    const { data } = useCustom<{
        data: number;
        total: number;
        trend: number;
    }>({
        url,
        method: "get"
    });

    return (
        <Stack
            justifyContent="space-between"
            sx={{
                height: "230px",
                p: 1,
                background: "url(images/daily-order.png)",
                backgroundColor: "#332a4b",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography
                    variant="h5"
                    sx={{ color: "#fff", fontWeight: 700, mb: 0 }}
                >
                    {t("Tổng Bài Viết")}
                </Typography>

                <Stack direction="row" alignItems="center">
                    <Typography
                        sx={{ fontWeight: 700, fontSize: 24, color: "#fff" }}
                    >
                        {data?.data.data ?? 0}
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};
