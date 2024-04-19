import { FC, FormEvent } from "react";
import axios from 'axios';
import { Box, Button, Checkbox, FormControl, FormLabel, Input, Link, Stack, Typography } from "@mui/joy";
import {useMutation} from "@tanstack/react-query";
import {FormWrapper} from "./FormWrapper.tsx";

const initResetPassword = async (data: { email: string }) => {
    return Promise.reject("Not implemented");
};

export const InitResetPasswordProcessForm: FC = () => {
    const { mutate, isLoading, error } = useMutation({
        mutationFn: initResetPassword,
        onSuccess: (data) => {
            console.log("Password reset initialized", data);
        },
        onError: (err: any) => {
            console.error("Login error:", err.message);
        }
    });

    return (
        <FormWrapper>
            <Stack gap={4} sx={{ mb: 2 }}>
                <FormHeader />
            </Stack>
            <Stack gap={4} sx={{ mt: 2 }}>
                <form
                    onSubmit={(event: FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formElements = event.currentTarget.elements;
                        const data = {
                            email: (formElements.namedItem("email") as HTMLInputElement).value,
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
                            Send email
                        </Button>
                        {error && <Typography color="error">Error: {(error as Error).message}</Typography>}
                    </Stack>
                </form>
            </Stack>
        </FormWrapper>
    );
}

const FormHeader: FC = () => {
    return (
        <Stack gap={1}>
            <Typography component="h1" level="h3">
                Reset password
            </Typography>
        </Stack>
    );
}
