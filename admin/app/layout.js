// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import SideBar from "./components/SideBar";
// import { Inter } from "next/font/google";
// import Header from "./components/Header";

// const inter = Inter({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
// });
// export const metadata = {
//   title: "Grocery Admin Panel",
//   description: "Grocery Admin Panel",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={`${inter.className}`}>
//         {/* <div className="mainWrapper flex ">
//           <div className="sidebarWrapper w-[18%] h-screen bg-white border-r border-[rgba(0,0,0,0.2)] shadow-md">
//             <SideBar />
//           </div>
//           <div className="mainContent w-[82%]">
//             <Header />
//             {children}
//           </div>
//         </div> */}
//         <div className="mainWrapper flex">
//           <div className="sidebarWrapper w-[18%] sticky top-0 h-screen bg-white border-r border-[rgba(0,0,0,0.2)] shadow-md">
//             <SideBar />
//           </div>

//           <div className="mainContent w-[82%]">
//             <Header />
//             {children}
//           </div>
//         </div>
//       </body>
//     </html>
//   );
// }

import "./globals.css";
import { Inter } from "next/font/google";
import LayoutWrapper from "./LogoutWrapper";
import ThemeProvider from "./components/context/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Grocery Admin Panel",
  description: "Grocery Admin Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
