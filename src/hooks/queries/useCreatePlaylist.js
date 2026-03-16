import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlaylist } from "../../services/playlist.service";

export const useCreatePlaylist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPlaylist,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["myPlaylists"]
            });
        }
    });
};