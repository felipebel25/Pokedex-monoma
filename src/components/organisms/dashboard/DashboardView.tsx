import { MainDashboard } from "@/components/molecules/dashboard/main/MainDashboard"
import { NavBarDashboard } from "@/components/molecules/dashboard/navbar/NavBarDashboard"
import { Box } from "@mui/material"
interface Props {
    data: any;
}

export const DashboardView = ({ data }: Props) => {
    return (
        <Box sx={{ height: "100vh", overflow: "hidden" }}>
            <NavBarDashboard />
            <MainDashboard data={data} />
        </Box>
    )
}