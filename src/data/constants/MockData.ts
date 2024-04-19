import {Tasks} from "./Tasks.ts";
import {PlatformStats, SubmittedVideo, SubmitVideoDTO} from "../types/types.ts";

const ThumbnailUrls = [
    'https://i.ytimg.com/vi/71wM2TgL6J8/maxresdefault.jpg',
    'https://i.ytimg.com/vi/aR8GcGLWmDU/maxresdefault.jpg',
    'https://i.ytimg.com/vi/IJcSnc93EcM/maxresdefault.jpg',
    'https://i.ytimg.com/vi/auY9uQTqeME/maxresdefault.jpg',
    'https://i.ytimg.com/vi/L2vJHPAU7nE/maxresdefault.jpg',
    'https://i.ytimg.com/vi/cuJW3jHNR_E/maxresdefault.jpg',
    'https://i.ytimg.com/vi/gek0W9Tm8ug/maxresdefault.jpg',
    'https://i.ytimg.com/vi/6CWq8wyS90o/maxresdefault.jpg',
    'https://i.ytimg.com/vi/tAFoBIfUsxM/maxresdefault.jpg',
    'https://i.ytimg.com/vi/XXg0a8pkHi0/maxresdefault.jpg'
]
// export const MockedVideos: SubmittedVideo[] = [
//     {
//         id: '12345',
//         videoFile: {name: 'video1.mp4', url: 'http://example.com/video1.mp4'},
//         micAudioFile: {name: 'audio1.wav', url: 'http://example.com/audio1.wav'},
//         previewSdUrl: ThumbnailUrls[0],
//         previewHdUrl: ThumbnailUrls[0],
//         metadata: {
//             originalDuration: 123,
//             finalDuration: 110,
//             width: 1920,
//             height: 1080,
//             rotation: 90,
//         },
//         options: {
//             marginBefore: 0.5,
//             marginAfter: 1,
//             dbUp: 3,
//         },
//         tasks: [
//             Tasks.SWAP_AND_SYNC_AUDIO,
//             Tasks.CUT_SILENCE,
//             Tasks.ADJUST_VOLUME,
//             Tasks.TRANSCRIBE
//         ],
//         status: 'done',
//         processingStatus: {
//             steps: [
//                 {step: 'SWAP_AND_SYNC_AUDIO', status: 'done'},
//                 {step: 'TRANSCRIBE', status: 'done'},
//             ],
//         },
//         outputFile: {name: 'output1.mp4', url: 'http://example.com/output1.mp4'},
//     },
//     {
//         id: '67890',
//         videoFile: {name: 'video2.mp4', url: 'http://example.com/video2.mp4'},
//         options: {
//             marginBefore: 1,
//             marginAfter: 0.3,
//         },
//         tasks: [Tasks.CUT_SILENCE],
//         status: 'in_queue',
//         queuePosition: 3,
//     },
//     {
//         id: '111213',
//         videoFile: {name: 'video3.mp4', url: 'http://example.com/video3.mp4'},
//         micAudioFile: {name: 'audio3.wav', url: 'http://example.com/audio3.wav'},
//         previewSdUrl: ThumbnailUrls[2],
//         previewHdUrl: ThumbnailUrls[2],
//         metadata: {
//             originalDuration: 150,
//             finalDuration: 145,
//             width: 1920,
//             height: 1080,
//             rotation: 270,
//         },
//         options: {
//             marginBefore: 10,
//             marginAfter: 15,
//             dbUp: -2,
//         },
//         tasks: [Tasks.ADJUST_VOLUME, Tasks.SWAP_AND_SYNC_AUDIO],
//         status: 'error',
//         error: 'Adjust volume task failed',
//         outputFile: {name: 'output3.mp4', url: 'http://example.com/output3.mp4'},
//     },
//     {
//         id: '213123',
//         videoFile: {name: 'video4.mp4', url: 'http://example.com/video4.mp4'},
//         previewSdUrl: ThumbnailUrls[3],
//         previewHdUrl: ThumbnailUrls[3],
//         metadata: {
//             originalDuration: 45,
//             width: 640,
//             height: 360,
//             rotation: 0,
//         },
//         options: {
//             marginBefore: 5,
//             marginAfter: 5,
//             dbUp: 0,
//         },
//         tasks: [Tasks.TRANSCRIBE],
//         status: 'in_queue',
//         queuePosition: 1,
//     },
//     {
//         id: '321321',
//         videoFile: {name: 'video5.mp4', url: 'http://example.com/video5.mp4'},
//         micAudioFile: {name: 'audio5.wav', url: 'http://example.com/audio5.wav'},
//         previewSdUrl: ThumbnailUrls[4],
//         previewHdUrl: ThumbnailUrls[4],
//         metadata: {
//             originalDuration: 200,
//             finalDuration: 190,
//             width: 1280,
//             height: 720,
//             rotation: 90,
//         },
//         options: {
//             marginBefore: 10,
//             marginAfter: 10,
//             dbUp: 1,
//         },
//         tasks: [Tasks.CUT_SILENCE, Tasks.ADJUST_VOLUME],
//         status: 'processing',
//         processingStatus: {
//             progress: 50,
//             steps: [
//                 {step: 'CUT_SILENCE', status: 'todo'},
//                 {step: 'ADJUST_VOLUME', status: 'in_progress'},
//             ],
//         },
//         outputFile: {name: 'output5.mp4', url: 'http://example.com/output5.mp4'},
//     },
//     {
//         id: '421214',
//         videoFile: {name: 'video6.mp4', url: 'http://example.com/video6.mp4'},
//         micAudioFile: {name: 'audio6.wav', url: 'http://example.com/audio6.wav'},
//         previewSdUrl: ThumbnailUrls[5],
//         previewHdUrl: ThumbnailUrls[5],
//         metadata: {
//             originalDuration: 180,
//             width: 1920,
//             height: 1080,
//             rotation: 180,
//         },
//         options: {
//             marginBefore: 5,
//             marginAfter: 5,
//             dbUp: -1,
//         },
//         tasks: [Tasks.SWAP_AND_SYNC_AUDIO, Tasks.TRANSCRIBE],
//         status: 'in_queue',
//         queuePosition: 2,
//     },
//     {
//         id: '543245',
//         videoFile: {name: 'video7.mp4', url: 'http://example.com/video7.mp4'},
//         micAudioFile: {name: 'audio7.wav', url: 'http://example.com/audio7.wav'},
//         previewSdUrl: ThumbnailUrls[6],
//         previewHdUrl: ThumbnailUrls[6],
//         metadata: {
//             originalDuration: 100,
//             finalDuration: 95,
//             width: 1280,
//             height: 720,
//             rotation: 0,
//         },
//         options: {
//             marginBefore: 10,
//             marginAfter: 10,
//             dbUp: 3,
//         },
//         tasks: [Tasks.CUT_SILENCE],
//         status: 'done',
//         processingStatus: {
//             steps: [
//                 {step: 'CUT_SILENCE', status: 'done'},
//             ],
//         },
//         outputFile: {name: 'output7.mp4', url: 'http://example.com/output7.mp4'},
//     }
// ]

export const MockedPlatformStats: PlatformStats = {
    totalVideosProcessed: 123,
    totalMinutesProcessed: 456,
    totalSilenceMinutesRemoved: 789,
    totalEditingTimeSavedInMinutes: 101112,
}

export const DefaultSubmitVideoForm: SubmitVideoDTO = {
    videoFile: undefined,
    micAudioFile: undefined,
    options: {
        marginBefore: 0.5,
        marginAfter: 1,
    },
    tasks: [Tasks.CUT_SILENCE]
}

