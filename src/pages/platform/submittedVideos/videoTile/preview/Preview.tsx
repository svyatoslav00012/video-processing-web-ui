import {FC} from "react";
import {Box} from "@mui/joy";
import {Image} from "@mui/icons-material";
import {PreviewOverlayBadge} from "./PreviewOverlayBadge.tsx";
import {durationToText} from "../../../../../data/tools.ts";

type PreviewProps = {
    url: string | undefined
    alt: string,
    duration: number | undefined
    width: number | undefined
    height: number | undefined
}
export const Preview: FC<PreviewProps> = ({url, alt, duration, width, height}) => {
    const dimension = {
        maxWidth: '100%'
        // maxWidth: 400, maxHeight: 400, minWidth: 400
    }
    return (<Box justifyContent='center' display='flex' position='relative' width='100%'>
        {url && <img src={url} alt={alt} style={{...dimension}}/>}
        {!url && <Image sx={{fontSize: 200}}/>}
        {duration && <PreviewOverlayBadge b='0' r='0' text={durationToText(duration)}/>}
        {width && <PreviewOverlayBadge b='0' l='0' text={width + ':' + height}/>}
    </Box>)
}

