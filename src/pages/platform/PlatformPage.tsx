import {FC, useEffect} from "react";
import {Stack} from "@mui/joy";
import {Outlet, useNavigate} from "react-router-dom";
import {RoutePaths} from "../../data/constants/RoutePaths.ts";
import {useCurrentPath} from "../hooks/hooks.ts";

export const PlatformPage: FC = () => {
    const navigate = useNavigate()
    const path = useCurrentPath()

    useEffect(() => {
        if (path === RoutePaths.PLATFORM)
            navigate(RoutePaths.SUBMITTED_VIDEOS_LIST)
    }, []);

    return <Stack width='100%'>
        <Outlet/>
    </Stack>
}
