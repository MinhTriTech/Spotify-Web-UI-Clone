import { useQuery } from "@tanstack/react-query";
import { getRandomUser } from "../../services/user.service";

export const useRandomUsers = () => 
    useQuery({
        queryKey: ["randomUsers"],
        queryFn: getRandomUser
    });