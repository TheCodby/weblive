import { Inter, Pangolin, IBM_Plex_Sans_Arabic } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const IBMar = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400"],
});
export const pangolin = Pangolin({
  subsets: ["latin"],
  weight: ["400"],
});
