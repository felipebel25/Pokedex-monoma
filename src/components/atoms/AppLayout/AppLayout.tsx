import { PropsWithChildren, useContext } from "react";
import Head from "next/head"
import { NavBarDashboard } from "@molecules";
import { AuthContext } from "@/context";

interface Props extends PropsWithChildren {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
}

export const AppLayout = ({ children, title, pageDescription, imageFullUrl }: Props) => {
    const { user } = useContext(AuthContext)
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={pageDescription} />
                <meta name="og:title" content={title} />
                <meta name="og:description" content={pageDescription} />
            </Head>
            {user?.name &&
                <nav>
                    <NavBarDashboard />
                </nav>
            }
            <main style={{ height: "100vh", overflow: "hidden" }}>
                {children}
            </main>

        </>
    )
}
