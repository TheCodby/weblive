export const metadata = {
  title: {
    template: "WebLive | %s",
    default: "WebLive",
  },
  description: "A web application for live streaming",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
