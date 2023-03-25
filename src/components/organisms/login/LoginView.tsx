import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Chip, CircularProgress, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form";

import { AuthContext } from "@context";
import { ErrorOutline, Visibility, VisibilityOff } from "@mui/icons-material";

import { styles } from "./stylesLoginView";


type FormData = {
    email: string;
    password: string;
};

export const LoginView = () => {
    const { replace } = useRouter()
    const { loginUser } = useContext(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);


    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    const onLogin = async ({ email, password }: FormData) => {
        setIsError(false);
        setIsLoading(true)
        const isValidLogin = await loginUser(email, password)

        setIsLoading(false)
        if (!isValidLogin) {
            setIsError(true)
            return
        }
        replace('/')
    }

    return (
        <form onSubmit={handleSubmit(onLogin)}>
            <Box sx={{ width: 350, padding: "10px 20px" }}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h1" component='h1'>Iniciar Sesión</Typography>
                    </Grid>
                    {/* ---------Input Email--------- */}
                    <Grid item xs={13} mt={4} mb={4}>
                        <TextField
                            fullWidth
                            sx={styles.input}
                            variant="outlined"
                            type="email"
                            label='Correo'
                            placeholder="Your email"
                            {...register('email', {
                                required: 'Este campo es requerido',
                            })}
                            //para volver booleano un objeto
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            InputLabelProps={{
                                shrink: true,
                                style: { fontSize: "1.4rem" }
                            }}
                            InputProps={{ style: { fontSize: '1.4rem' } }}
                        />
                    </Grid>
                    <Grid mb={4} item xs={12} >
                        {/* ---------Input Password--------- */}
                        <TextField
                            fullWidth
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            label='Contrasena'
                            placeholder="Your password"
                            {...register('password', {
                                required: 'Este campo es requerido',
                            })}
                            
                            InputLabelProps={{
                                shrink: true,
                                style: { fontSize: "1.4rem" }
                            }}
                            InputProps={{
                                style: { fontSize: '1.4rem' },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Grid>
                    {/* -----------button ingresar-------- */}
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
                    {/* ----------error credenciales incorrectas---------- */}
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
    )
}
