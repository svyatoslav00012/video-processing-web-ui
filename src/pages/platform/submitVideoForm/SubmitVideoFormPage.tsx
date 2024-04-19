import {ChangeEvent, FC, useEffect, useState} from "react";
import {
    Button,
    Checkbox,
    FormControl,
    FormHelperText,
    FormLabel,
    IconButton,
    Input,
    Link,
    Stack,
    Typography
} from "@mui/joy";
import {useMutation} from "@tanstack/react-query";
import {SubmitVideoDTO} from "../../../data/types/types.ts";
import {Tasks} from "../../../data/constants/Tasks.ts";
import {DefaultSubmitVideoForm} from "../../../data/constants/MockData.ts";
import {Api, DownloadFileUrl} from "../../../data/api/Api.ts";
import {useQueryState} from "../../hooks/hooks.ts";
import {useNavigate} from "react-router-dom";
import {RoutePaths} from "../../../data/constants/RoutePaths.ts";
import {InputFileUpload} from "./UploadFileButton.tsx";
import {AudioFile, Cancel, FilePresent, FileUpload, VideoFile} from "@mui/icons-material";
import axios from "axios";


type FileUploadProgress = {
    videoFile: number | undefined,
    micAudioFile: number | undefined,

    videoFileError: string | undefined,
    micAudioFileError: string | undefined,

    videoFileCancel: () => void,
    micAudioFileCancel: () => void
}

const DefaultFileUploadProgress: FileUploadProgress = {
    videoFile: undefined,
    micAudioFile: undefined,
    videoFileError: undefined,
    micAudioFileError: undefined,
    videoFileCancel: () => alert('cancel not implemented'),
    micAudioFileCancel: () => alert('cancel not implemented')
}

export const SubmitVideoFormPage: FC = () => {
    const {
        value: submitVideoDTO,
        setValue: setSubmitVideoDTO
    } = useQueryState<SubmitVideoDTO>(['submitVideoForm'], DefaultSubmitVideoForm);


    const [fileUploadProgress, setFileUploadProgress] = useState<FileUploadProgress>(DefaultFileUploadProgress)

    const navigate = useNavigate()

    const {mutate, isPending, isSuccess, error} = useMutation({
        mutationFn: Api.processVideo,
        onSuccess: () => {
            setSubmitVideoDTO(DefaultSubmitVideoForm)
            navigate(RoutePaths.SUBMITTED_VIDEOS_LIST)
        }
    })

    if (!submitVideoDTO) return null


    const uploadFile = (key: string) => async (files: FileList) => {
        const cancelTokenSource = axios.CancelToken.source()

        const cancelUpload = () => {
            cancelTokenSource.cancel("Upload cancelled")
            setSubmitVideoDTO(prev => ({...prev, [key]: undefined}))
            setFileUploadProgress(p => ({
                ...p,
                [key]: undefined,
            }))
        }

        setFileUploadProgress(p => ({
            ...p,
            [key]: 0,
            [`${key}Error`]: undefined,
            [`${key}Cancel`]: cancelUpload
        }))
        setSubmitVideoDTO(prev => ({
            ...prev,
            [key]: {name: files[0].name}
        }))

        try {
            const serverFileName = await Api.uploadFile(
                files[0],
                p => setFileUploadProgress(pr => ({...pr, [key]: p})),
                cancelTokenSource.token
            )
            setSubmitVideoDTO(prev => ({
                ...prev, [key]: {name: files[0].name, serverFileName: serverFileName}
            }))
            setFileUploadProgress(p => ({
                ...p,
                [`${key}Cancel`]: () => {
                    p[`${key}Cancel`]();
                    Api.deleteFile(serverFileName)
                },
            }))
        } catch (err) {
            setSubmitVideoDTO(prev => ({...prev, [key]: undefined}))
            setFileUploadProgress(p => ({
                ...p,
                [key]: undefined,
                [`${key}Error`]: err
            }))
        }
    }

    const noTasksSelected = submitVideoDTO.tasks?.length === 0

    const toggleTask = (task: string) => (e) => {
        const isChecked = e.target.checked
        const newTaskList = submitVideoDTO.tasks.filter(t => t !== task)
        if (isChecked) {
            newTaskList.push(task)
            newTaskList.sort()
        }
        console.log(newTaskList)
        setSubmitVideoDTO(prev => ({...prev, tasks: newTaskList}))
    }

    const isTaskSelected = (task: string): boolean => submitVideoDTO.tasks?.includes(task)

    return (<Stack justifyContent='center' alignItems='center' width='100%' height='100%'>
        <Stack spacing={4} p={1} pt={4} width={{xs: '100%', md: 400}}>
            <Typography level='title-lg'>Submit video</Typography>
            <Stack component='form'
                   spacing={2}
                   onSubmit={e => {
                       e.preventDefault()
                       mutate(submitVideoDTO)
                   }}>
                <FormControl>
                    <FormLabel>Video file</FormLabel>
                    {!submitVideoDTO.videoFile?.name && <InputFileUpload onFilesSelect={uploadFile('videoFile')}
                                                                         fileInputProps={{accept: "video/mp4,video/x-m4v,video/*"}}/>}
                    {submitVideoDTO.videoFile?.name &&
                        <FileUploadProgress fileType='video'
                                            fileName={submitVideoDTO.videoFile?.name || ''}
                                            onCancel={fileUploadProgress.videoFileCancel}
                                            progress={fileUploadProgress.videoFile || 0}
                                            error={fileUploadProgress.videoFileError}
                        />}
                    {submitVideoDTO.videoFile?.serverFileName &&
                        <Link href={DownloadFileUrl(submitVideoDTO.videoFile.serverFileName)}
                              target='_blank'>Download</Link>}
                </FormControl>
                <FormControl>
                    <FormLabel>Mic audio file</FormLabel>
                    {!submitVideoDTO.micAudioFile?.name && <InputFileUpload onFilesSelect={uploadFile('micAudioFile')}
                                                                            fileInputProps={{accept: "audio/*"}}/>}
                    {submitVideoDTO.micAudioFile?.name &&
                        <FileUploadProgress fileType='audio'
                                            fileName={submitVideoDTO.micAudioFile?.name || ''}
                                            onCancel={fileUploadProgress.micAudioFileCancel}
                                            progress={fileUploadProgress.micAudioFile || 0}
                                            error={fileUploadProgress.micAudioFileError}
                        />}
                </FormControl>
                <FormControl>
                    <Checkbox label="Swap video's audio to microphone audio"
                              disabled={!submitVideoDTO.micAudioFile}
                              checked={isTaskSelected(Tasks.SWAP_AND_SYNC_AUDIO)}
                              onChange={toggleTask(Tasks.SWAP_AND_SYNC_AUDIO)}/>
                    {!submitVideoDTO.micAudioFile &&
                        <FormHelperText level='body-xs'>mic audio not provided</FormHelperText>}
                </FormControl>
                <Checkbox label="Remove silence"
                          checked={isTaskSelected(Tasks.CUT_SILENCE)}
                          onChange={toggleTask(Tasks.CUT_SILENCE)}
                />
                {/*<Checkbox label="Adjust volume"*/}
                {/*          checked={isTaskSelected(Tasks.ADJUST_VOLUME)}*/}
                {/*          onChange={toggleTask(Tasks.ADJUST_VOLUME)}/>*/}
                <Checkbox label="Transcribe output"
                          checked={isTaskSelected(Tasks.TRANSCRIBE)}
                          onChange={toggleTask(Tasks.TRANSCRIBE)}/>
                <Button disabled={!submitVideoDTO.videoFile || noTasksSelected || isSuccess}
                        loading={isPending}
                        type='submit'>
                    Submit
                </Button>
                {error && <Typography color='error'>{error}</Typography>}

            </Stack>
        </Stack>
    </Stack>)
}

type FileUploadProgressProps = {
    fileType: 'video' | 'audio'
    fileName: string
    progress: number
    error?: string,
    onCancel: () => void
}

const FileUploadProgress: FC<FileUploadProgressProps> = ({
                                                             fileType,
                                                             fileName,
                                                             progress,
                                                             error,
                                                             onCancel
                                                         }) => {
    return <Stack spacing={1} alignItems='center' direction={{sm: 'row'}}>
        {fileType === 'video' ? <VideoFile/> : <AudioFile/>}
        <Typography>{fileName}</Typography>
        <Typography>{progress}%</Typography>
        {error && <Typography color='error'>{error}</Typography>}
        <IconButton p={0} onClick={onCancel}>
            <Cancel p={0} m={0}/>
        </IconButton>
    </Stack>
}
