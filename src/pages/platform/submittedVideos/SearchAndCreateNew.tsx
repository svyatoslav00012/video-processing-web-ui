import {FC} from "react";
import {Button, Input, Stack} from "@mui/joy";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import {RoutePaths} from "../../../data/constants/RoutePaths.ts";
import {useQueryState} from "../../hooks/hooks.ts";

export const SearchAndCreateNew: FC = () => {
    const {value: searchQuery, setValue} = useQueryState(['search'], '')

    return <Stack direction='row' alignItems='stretch' justifyContent='space-between'>
        <Input
            value={searchQuery || ''}
            onChange={e => setValue(e.target.value)}
            placeholder="Search"
            startDecorator={<SearchRoundedIcon/>}
            aria-label="Search"
        />
        <Button component={Link} to={RoutePaths.SUBMIT_VIDEO}>Process new video</Button>
    </Stack>
}
