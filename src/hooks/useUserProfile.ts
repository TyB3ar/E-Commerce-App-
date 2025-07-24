import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../firebase/users";

export const useUserProfile = (uid: string | null) => {
  return useQuery({
    queryKey: ["userProfile", uid],
    queryFn: () => {
      if (!uid) {
        return Promise.reject("No UID provided");
      }
      return getUserProfile(uid);
    },
    enabled: !!uid, // Only run query if uid exists
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: false,
  });
};
