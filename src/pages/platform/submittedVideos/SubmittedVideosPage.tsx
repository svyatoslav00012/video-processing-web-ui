import {FC, useEffect} from "react";
import {Box, Stack, Typography} from "@mui/joy";
import {useQuery} from "@tanstack/react-query";
import {SearchAndCreateNew} from "./SearchAndCreateNew.tsx";
import {VideoTile} from "./videoTile/VideoTile.tsx";
import {Api} from "../../../data/api/Api.ts";
import {useQueryState} from "../../hooks/hooks.ts";
import {RoutePaths} from "../../../data/constants/RoutePaths.ts";
import {useNavigate} from "react-router-dom";

export const SubmittedVideosPage: FC = () => {
    const {data: videos, isLoading, isError, error} = useQuery({
        queryKey: ['submittedVideos'],
        queryFn: Api.getVideos,
        // onError: (error) => console.log('error', error)
    })

    const navigate = useNavigate()

    useEffect(() => {
        if(error?.response?.status === 401) {
            console.log('Unauthorized')
            navigate(RoutePaths.AUTH)
        }
    }, [error])

    const {value: searchQuery} = useQueryState(['search'], '')


    return (<Stack spacing={5} px={{xs: 1, md: 10}} pt={2}>
        {/*<Typography>Submitted videos</Typography>*/}
        <SearchAndCreateNew/>
        {isLoading && <Typography>Loading...</Typography>}
        {isError && <Typography>Error...</Typography>}
        {videos && <Box sx={{
            maxHeight: '80vh',
            overflowY: 'auto',
        }}>
            <Stack p={1} rowGap={5} direction='row' flexWrap='wrap' justifyContent='space-between'>
                {videos
                    .filter(v => v.videoFile.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(video => <VideoTile key={video.id} video={video}/>)}
            </Stack>
        </Box>}
    </Stack>)
}


