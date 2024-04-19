import { FC, FormEvent } from "react";
import axios from 'axios';
import { Box, Button, Checkbox, FormControl, FormLabel, Input, Link as MuiLink, Stack, Typography } from "@mui/joy";
import {useMutation} from "@tanstack/react-query";
import {RoutePaths} from "../../../data/constants/RoutePaths.ts";
import {Link} from "react-router-dom";
import {FormWrapper} from "./FormWrapper.tsx";
import {Api} from "../../../data/api/Api.ts";


export const SignUpForm: FC = () => {
    const { mutate, isLoading, error, isSuccess } = useMutation({mutationFn: Api.signUp});

    return (
        <FormWrapper>
            <Stack gap={4} sx={{ mb: 2 }}>
                <SignUpHeader />
            </Stack>
            <Stack gap={4} sx={{ mt: 2 }}>
                <form
                    onSubmit={(event: FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formElements = event.currentTarget.elements;
                        const data = {
                            email: (formElements.namedItem("email") as HTMLInputElement).value,
                            password: (formElements.namedItem("password") as HTMLInputElement).value
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
                    <Stack gap={4} sx={{ mt: 2 }}>
                        <Button type="submit" fullWidth loading={isLoading}>
                            Sign up
                        </Button>
                        {error && <Typography color="error">Error: {error.response.data}</Typography>}
                        {isSuccess && <Typography color="success">Successfully registered</Typography>}
                    </Stack>
                </form>
            </Stack>
        </FormWrapper>
    );
}

const SignUpHeader: FC = () => {
    return (
        <Stack gap={1}>
            <Typography component="h1" level="h3">
                Sign up
            </Typography>
            <Typography level="body-sm">
                Have an account?{' '}
                <MuiLink component={Link} to={RoutePaths.SIGN_IN} level="title-sm">
                    Sign in!
                </MuiLink>
            </Typography>
        </Stack>
    );
}
