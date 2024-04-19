import {FC} from "react";
import {Stack, Typography} from "@mui/joy";
import {useParams} from "react-router-dom";

export const SubmittedVideoDetailsPage: FC = () => {
    const {videoId} = useParams();

    return (<Stack>
        <Typography>Submitted video {videoId}</Typography>
    </Stack>)
}
