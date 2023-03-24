import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Chip, CircularProgress, Grid, Link, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form";
import { isEmail } from "utils";
import { AuthLayout } from "@/components/layouts"
import { ErrorOutline } from "@mui/icons-material";

import { AuthContext } from "context";
import { styles } from "./stylesLoginView";
type FormData = {
    email: string;
    password: string;
};

export const LoginView = () => {

    const router = useRouter()
    const { loginUser } = useContext(AuthContext)

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const onLogin = async ({ email, password }: FormData) => {
        setIsError(false);
        setIsLoading(true)

        const destination = router.query.p?.toString() || '/'

        const isValidLogin = await loginUser(email, password)
        setIsLoading(false)
        if (!isValidLogin) {
            setIsError(true)
            return
        }

        router.replace('/dashboard')
    }

    return (
        <AuthLayout title={"Monoma : Login"} >
            <form onSubmit={handleSubmit(onLogin)}>
                <Box sx={{ width: 350, padding: "10px 20px" }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h1" component='h1'>Iniciar Sesion</Typography>

                        </Grid>
                        <Grid item xs={12} mt={4} mb={4}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="email"
                                label='Correo'
                                placeholder="Your email"
                                {...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: isEmail
                                })}
                                //para volver booleano un objeto
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        </Grid>
                        <Grid
                            mb={4}
                            item
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                variant="outlined"
                                type='password'
                                label='Contrasena'
                                placeholder="Your password"
                                {...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Minimo 6 caracteres' }
                                })}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid mb={4} item xs={12}>
                            <Button
                                type="submit"
                                color="secondary"
                                className="circular-btn"
                                fullWidth
                                sx={styles.button}
                            >
                                {isLoading ? <CircularProgress /> : 'Ingresar'}
                            </Button>

                        </Grid>
                        <Box sx={{ width: "100%" }}>
                            {isError &&
                                <Chip
                                    sx={{ width: "100%" }}
                                    label='No reconocemos ese usuario / password'
                                    color="error"
                                    icon={<ErrorOutline />}
                                    className="fadeIn"
                                />
                            }
                        </Box>

                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}
