import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { AuthLayout } from "@atoms";
import { LoginView } from "@organisms"

import { pokeApi } from "@services";
import { AuthContext } from "@context";

const LoginPage = () => {
    const { push } = useRouter();
    const { user } = useContext(AuthContext)
    useEffect(() => {
        (async () => {
            const { data } = await pokeApi.get('/user/validate-token');
            if (data.user.name) push('/');
        })();
    }, [])

    return (
        <>
            <AuthLayout title={"Monoma : Login"} >
                {!user?.name ? <LoginView /> : ""}
            </AuthLayout>
        </>
    )
}
export default LoginPage
