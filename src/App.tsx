import {createBrowserRouter, Link, RouterProvider} from 'react-router-dom';
import {Box, CssBaseline, CssVarsProvider, Stack, Typography} from "@mui/joy";
import theme from "./theme.tsx";
import {FC} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AuthPage} from "./pages/auth/AuthPage.tsx";
import {SignInForm} from "./pages/auth/components/SignInForm.tsx";
import {InitResetPasswordProcessForm} from "./pages/auth/components/InitResetPasswordProcessForm.tsx";
import {SignUpForm} from "./pages/auth/components/SignUpForm.tsx";
import {RoutePaths} from "./data/constants/RoutePaths.ts";
import {PlatformPage} from "./pages/platform/PlatformPage.tsx";
import {SubmittedVideosPage} from "./pages/platform/submittedVideos/SubmittedVideosPage.tsx";
import {SubmitVideoFormPage} from "./pages/platform/submitVideoForm/SubmitVideoFormPage.tsx";
import {SubmittedVideoDetailsPage} from "./pages/platform/submittedVideoDetails/SubmittedVideoDetailsPage.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const PAGES = [
    {
        path: RoutePaths.AUTH,
        element: <AuthPage/>,
        children: [
            {
                path: RoutePaths.SIGN_IN,
                element: <SignInForm/>,
            },
            {
                path: RoutePaths.SIGN_UP,
                element: <SignUpForm/>,
            },
            {
                path: RoutePaths.RESET_PASSWORD_INIT,
                element: <InitResetPasswordProcessForm/>,
            },
        ]
    },
    {
        path: RoutePaths.PLATFORM,
        element: <PlatformPage/>,
        children: [
            {
                path: RoutePaths.SUBMITTED_VIDEOS_LIST,
                element: <SubmittedVideosPage/>,
            },
            {
                path: RoutePaths.SUBMIT_VIDEO,
                element: <SubmitVideoFormPage/>,
            },
            {
                path: RoutePaths.SUBMITTED_VIDEO_DETAILS(),
                element: <SubmittedVideoDetailsPage/>,
            }
        ]
    }
]

const pathsListWithNested = PAGES.flatMap(page => page.children ? [page.path, ...page.children.map(c => c.path)] : [page.path])

const Navigation: FC = () => (<Stack spacing={1} width='100%' m={10}>
    <Typography pb={3} level='h3'>Welcome</Typography>
    {pathsListWithNested.map(p => <Box key={p}><Typography><Link to={p}>{p}</Link></Typography></Box>)}
</Stack>)

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigation/>,
    },
    ...PAGES
]);

const queryClient = new QueryClient()
const App: FC = () => {
    return <CssVarsProvider disableTransitionOnChange theme={theme}>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
            <CssBaseline/>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </CssVarsProvider>;
};

export default App;
