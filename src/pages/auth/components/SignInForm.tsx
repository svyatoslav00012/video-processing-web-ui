import {FC, FormEvent} from "react";
import axios from 'axios';
import {Box, Button, Checkbox, FormControl, FormLabel, Input, Stack, Typography, Link as MuiLink} from "@mui/joy";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {RoutePaths} from "../../../data/constants/RoutePaths.ts";
import {Link, useNavigate} from "react-router-dom";
import {FormWrapper} from "./FormWrapper.tsx";
import {Api} from "../../../data/api/Api.ts";


export const SignInForm: FC = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {mutate, isLoading, error, isSuccess} = useMutation({
        mutationFn: Api.signIn,
        onSuccess: (data) => {
            console.log("Login success:", data);
            queryClient.setQueryData(['userId'], data.userId);
            navigate(RoutePaths.SUBMITTED_VIDEOS_LIST);
        },
        onError: (err: any) => {
            console.error("Login error:", err.message);
        }
    });

    return (
        <FormWrapper>
            <Stack gap={4} sx={{mb: 2}}>
                <SignInHeader/>
            </Stack>
            <Stack gap={4} sx={{mt: 2}}>
                <form
                    onSubmit={(event: FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formElements = event.currentTarget.elements;
                        const data = {
                            email: (formElements.namedItem("email") as HTMLInputElement).value,
                            password: (formElements.namedItem("password") as HTMLInputElement).value,
                            persistent: (formElements.namedItem("persistent") as HTMLInputElement).checked,
                        };
                        mutate(data);
                    }}
                >
                    <FormControl required>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" name="email"/>
                    </FormControl>
                    <FormControl required>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" name="password"/>
                    </FormControl>
                    <Stack gap={4} sx={{mt: 2}}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Checkbox size="sm" label="Remember me" name="persistent"/>
                            <MuiLink level="title-sm" component={Link} to={RoutePaths.RESET_PASSWORD_INIT}>
                                Forgot your password?
                            </MuiLink>
                        </Box>
                        <Button type="submit" fullWidth loading={isLoading}>
                            Sign in
                        </Button>
                        {error && <Typography color="error">Error: {error.response.data?.substring(0, 100)}</Typography>}
                        {isSuccess && <Typography color="success">Successfully signed in</Typography>}
                    </Stack>
                </form>
            </Stack>
        </FormWrapper>
    );
}

const SignInHeader: FC = () => {
    return (
        <Stack gap={1}>
            <Typography component="h1" level="h3">
                Sign in
            </Typography>
            <Typography level="body-sm">
                New to this app?{' '}
                <MuiLink component={Link} to={RoutePaths.SIGN_UP} level="title-sm">
                    Sign up!
                </MuiLink>
            </Typography>
        </Stack>
    );
}
