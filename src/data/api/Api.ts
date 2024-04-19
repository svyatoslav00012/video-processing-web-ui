import axios from "axios";
import {SubmitVideoDTO} from "../types/types.ts";

export const Api = {
    signIn: async (data: { email: string, password: string, persistent: boolean }) =>
        axios.post("/api/v1/auth/signin", data).then(response => response.data),
    signUp: async (data: { email: string, password: string }) =>
        axios.post("/api/v1/auth/signup", data).then(response => response.data),

    getVideos: async () => axios.get("/api/v1/videos").then(response => response.data),
    getVideoById: async (videoId: string) => axios.get(`/api/v1/videos/${videoId}`).then(response => response.data),
    processVideo: async (data: SubmitVideoDTO) => axios.post("/api/v1/videos/process", data).then(response => response.data),

    uploadFile: async (file: File, onProgress, cancelToken) => {
        const formData = new FormData();
        formData.append("file", file);
        return axios.post(
            "/api/v1/file/upload",
            // "http://localhost:4000/api/v1/file/upload",
            formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: progressEvent => {
                    const percentCompleted = Math.round((progressEvent.loaded * 10000) / progressEvent.total) / 100;
                    onProgress(percentCompleted);
                },
                cancelToken
            })
            .then(response => response.data)
    },
    deleteFile: async (serverFilename: string) => axios.delete(`/api/v1/file/${serverFilename}`).then(response => response.data),
    testCookie: () => axios.get("/api/v1/file/upload/testcookie").then(response => response.data)
}

export const DownloadFileUrl = (serverFilename: string): string => `/api/v1/file/${serverFilename}`
