import {FC} from "react";
import {Chip, Stack, Typography} from "@mui/joy";
import {Preview} from "./preview/Preview.tsx";
import {Tasks} from "../../../../data/constants/Tasks.ts";
import {SubmittedVideo} from "../../../../data/types/types.ts";

export const VideoTile: FC<{ video: SubmittedVideo }> = ({video}) => {
    return <Stack spacing={1}
                  sx={{
                      cursor: 'pointer',
                      // border: '1px solid grey',
                      borderRadius: 10,
                      p: 1,
                      width: 400,
                      backgroundColor: theme => theme.palette.primary[100],
                      ':hover': {
                          backgroundColor: theme => theme.palette.primary[200]
                      }
                  }}>
        <Typography level='h4'>{video.videoFile.name}</Typography>
        <Preview url={video.previewSdUrl}
                 alt={video.videoFile.name}
                 duration={video.metadata?.originalDuration}
                 width={video.metadata?.width}
                 height={video.metadata?.height}/>
        <Stack direction='row' justifyContent='space-between' >
            <Stack>
                <Typography level='title-md'>Files:</Typography>
                <Typography>{video.videoFile.name}</Typography>
                {video.micAudioFile?.name && <Typography>{video.micAudioFile?.name}</Typography>}
            </Stack>
            <Stack spacing={1}>
                <Typography level='title-md'>Tasks:</Typography>
                {video.tasks.map(task => <Chip key={task}>{getTaskText(video.options, task)}</Chip>)}
            </Stack>
        </Stack>
    </Stack>
}

const getTaskText = (options: SubmittedVideo['options'], task: Task) => {
    switch (task) {
        case Tasks.CUT_SILENCE:
            return `Cut silence ${options.marginBefore}s:${options.marginAfter}s`
        case Tasks.ADJUST_VOLUME:
            return `Adjust volume: ${options.dbUp}db`
        case Tasks.SWAP_AND_SYNC_AUDIO:
            return `Swap and sync audio`
        case Tasks.TRANSCRIBE:
            return `Transcribe`
    }
}
