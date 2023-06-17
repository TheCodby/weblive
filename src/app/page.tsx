import GuestJoin from "./components/guest-join";
import LoginCard from "./components/login-card";
import PageWraper from "./components/page-wrapper";

export default function Home() {
  return (
    <PageWraper className="flex flex-col md:flex-row gap-4 justify-center items-center absolute w-full h-full">
      <LoginCard />
      <GuestJoin />
    </PageWraper>
  );
}
