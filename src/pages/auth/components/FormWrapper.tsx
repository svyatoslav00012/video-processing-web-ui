import {Box} from "@mui/joy";
import {FC} from "react";

export const FormWrapper: FC = ({children}) => (<Box
    component="main"
    sx={{
        my: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: {xs: '100%', sm: 400},
        maxWidth: '100%',
        mx: 'auto',
        borderRadius: 'sm',
        '& form': {
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
        },
        [`& .MuiFormLabel-asterisk`]: {
            visibility: 'hidden',
        },
    }}
>{children}</Box>)
