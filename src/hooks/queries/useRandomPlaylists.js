import { useQuery } from "@tanstack/react-query";
import { getRandomPlaylists } from "../../services/playlist.service";

export const useRandomPlaylists = () => 
    useQuery({
        queryKey: ["randomPlaylists"],
        queryFn: getRandomPlaylists
    });