import {FC, useEffect} from "react";
import {Box, Divider, Stack, Typography} from "@mui/joy";
import {Outlet, useNavigate} from "react-router-dom";
import {RoutePaths} from "../../data/constants/RoutePaths.ts";
import {useCurrentPath} from "../hooks/hooks.ts";
import {useQuery} from "@tanstack/react-query";
import {MockedPlatformStats} from "../../data/constants/MockData.ts";
import CountUp from "react-countup";
import {minutesToTimeText} from "../../data/tools.ts";

export const AuthPage: FC = () => {
    const navigate = useNavigate()
    const path = useCurrentPath()

    const {data: platformStats, isLoading, isError} = useQuery({
        queryKey: ['platformStats'],
        queryFn: async () => {
            return MockedPlatformStats
        }
    })

    useEffect(() => {
        if (path === RoutePaths.AUTH)
            navigate(RoutePaths.SIGN_IN)
    }, [path]);

    return <Stack height='100vh' direction='row' justifyContent='center' alignItems='center'>
        <Stack display={{xs: 'none', md: 'flex'}} flexGrow={1} height='100%' justifyContent='center' alignItems='center'>
            {platformStats && (<Stack p={1} spacing={3} width={{md: '90%', lg: '80%', xl: '60%'}}>
                <Typography fontSize={{sm: 30, md: 40, lg: 60, xl: 100}}
                            pb={{xs: 5, md: 10}}
                            textAlign='center'
                            sx={{color: 'grey'}}
                            level='h1'>
                    Magic video processor
                </Typography>
                <StatCountUp value={platformStats.totalVideosProcessed}
                             label='Total videos processed'
                             duration={2}
                />
                <StatCountUp value={platformStats.totalMinutesProcessed}
                             formatFn={minutesToTimeText}
                             label='Total time processed'
                             duration={3}
                />
                <StatCountUp value={platformStats.totalSilenceMinutesRemoved}
                             formatFn={minutesToTimeText}
                             label='Total silence removed'
                             duration={5}
                />
                <StatCountUp value={platformStats.totalEditingTimeSavedInMinutes}
                             formatFn={minutesToTimeText}
                             label='Total editing time saved'
                             duration={7}
                />
            </Stack>)}
        </Stack>
        <Divider sx={{display: {xs: 'none', md: 'flex'}}} orientation='vertical'/>
        <Box py={1} px={{xs: 1, md: 10}}>
            <Outlet/>
        </Box>
    </Stack>
}

type StatCountUpProps = {
    value: number,
    formatFn: (value: number) => string,
    label: string,
    duration?: number
}

const StatCountUp: FC<StatCountUpProps> = ({value, formatFn, label, duration}) => {
    return <CountUp
        start={0}
        end={value}
        formattingFn={formatFn}
        duration={duration || 3}
    >
        {({countUpRef}) => (<Stack>
            <Typography level='body-lg'>{label}</Typography>
            <Typography sx={{color: 'blue'}} fontSize={{xs: 20, md: 30, xl: 60}} ref={countUpRef}/>
        </Stack>)}
    </CountUp>
}

const formatStat = (formatFn: (value: number) => string, prefix: string) => (value: number) =>
    `${prefix}${formatFn(value)}`
