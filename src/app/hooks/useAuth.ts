import { useQuery } from "@tanstack/react-query";

const useAuth = () => {
  const data = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      if (localStorage.getItem("token")) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/me/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        return data;
      } else {
        throw new Error("You are not logged in");
      }
    },
  });

  return data;
};
export default useAuth;
