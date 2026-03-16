import { useQuery } from "@tanstack/react-query";
import { getRandomTrack } from "../../services/track.service";

export const useRandomTracks = () => 
    useQuery({
        queryKey: ["randomTracks"],
        queryFn: getRandomTrack
    });