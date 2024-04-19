import {FC} from "react";
import {Typography} from "@mui/joy";

export const PreviewOverlayBadge: FC<{ text: string, b?: string, t?: string, l?: string, r?: string }> =
    ({text, b, t, l, r}) => {
        return <Typography position='absolute'
                           bottom={b} top={t} left={l} right={r}
                           bgcolor='rgba(0,0,0,0.5)'
                           sx={{color: 'white'}}
                           p={1}
                           m={1}
                           zIndex={999}
                           level='body-xs'
                           borderRadius={5}>
            {text}
        </Typography>
    }
