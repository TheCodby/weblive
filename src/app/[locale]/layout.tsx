import Context from "./context";
import "./globals.css";
import Footer from "./components/footer";
import { ToastContainer } from "react-toastify";
import { notFound } from "next/navigation";
import Header from "./components/header";
import { getProfile } from "@/app/utils/server/user";
import "react-toastify/dist/ReactToastify.css";
import { IBMar, inter } from "../fonts";
import NextTopLoader from "nextjs-toploader";
import Sidebar from "./components/sidebar";
export default async function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = props.params.locale;
  const user = await getProfile();
  if (!locale) {
    notFound();
  }
  return (
    <html lang={locale} dir={locale == "ar" ? "rtl" : "ltr"} className="dark">
      <body
        className={`${
          locale == "ar" ? IBMar.className : inter.className
        } overflow-hidden`}
      >
        <div
          className="m-0 w-full h-full absolute -z-10 opacity-10 bg-blend-lighten"
          style={{
            backgroundColor: "#333136",
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z' fill='%23707070' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        ></div>
        <Context>
          <NextTopLoader showSpinner={false} color="#3366CC" />
          <main className="flex h-screen w-screen flex-col overflow-hidden">
            <div className="relative grow overflow-hidden">
              <div className="flex h-full w-full flex-col overflow-hidden">
                <Header user={user} locale={locale} />
                <div className="flex grow overflow-hidden">
                  <Sidebar user={user} locale={locale} />
                  <div
                    className={`relative h-full w-full grow overflow-hidden`}
                  >
                    <div className="relative z-10 h-full overflow-y-auto overflow-x-hidden">
                      <div className="overflow-hidden">
                        {props.children}
                        <footer className="text-white p-4">
                          <Footer locale={locale} />
                        </footer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <ToastContainer />
        </Context>
      </body>
    </html>
  );
}
