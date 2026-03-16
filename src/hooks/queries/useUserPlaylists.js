import { useQuery } from "@tanstack/react-query";
import { getMyPlaylists } from "../../services/playlist.service";

export const useUserPlaylists = () => 
    useQuery({
        queryKey: ["myPlaylists"],
        queryFn: getMyPlaylists
    });