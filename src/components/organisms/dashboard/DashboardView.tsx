import { AppLayout } from "@atoms";
import { MainDashboard } from "@/components/molecules/dashboard/main/MainDashboard";

interface Props {
    data: any;
}

export const DashboardView = ({ data }: Props) => {
    return (
        <AppLayout title="Dashboard : Monoma" pageDescription="pokemones, monoma, pokemon">
            <MainDashboard data={data} />
        </AppLayout>
    )
}