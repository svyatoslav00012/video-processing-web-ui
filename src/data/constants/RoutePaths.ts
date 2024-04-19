export const RoutePaths = {
    AUTH: '/auth',
    SIGN_IN: '/auth/sign-in',
    SIGN_UP: '/auth/sign-up',
    RESET_PASSWORD_INIT: '/auth/password/reset/init',
    PLATFORM: '/platform',
    SUBMITTED_VIDEOS_LIST: '/platform/submitted-videos',
    SUBMIT_VIDEO: '/platform/submit-video',
    SUBMITTED_VIDEO_DETAILS: (videoId?: string) => `/platform/submitted-videos/${videoId || ':videoId'}`,
}
