import {matchRoutes, useLocation} from "react-router-dom";
import {RoutePaths} from "../../data/constants/RoutePaths.ts";
import {useQuery, useQueryClient} from "@tanstack/react-query";

const routes: {path: string}[] = Object
    .values(RoutePaths)
    .map(path => ({path: typeof path === 'string' ? path : path()}))

export const useCurrentPath = () => {
    const location = useLocation()

    const [{ route }] = matchRoutes(routes, location)

    return route.path
}

export const useQueryState = <T extends any>(key: string[], initialData: T) => {
    const queryClient = useQueryClient();
    const {data} = useQuery<T>({queryKey: key, initialData});
    return {
        value: data as T,
        setValue: (value: T | ((prev: T) => T)) => {
            console.log('setting value of ', key, 'to', value)
            queryClient.setQueryData(key, value)
        }
    }
}
