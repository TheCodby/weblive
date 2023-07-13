export const metadata = {
  title: {
    template: "WebLive | %s",
    default: "WebLive",
  },
  description: "A web application for live streaming",
  icons: {
    icon: "/assets/transparent-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
