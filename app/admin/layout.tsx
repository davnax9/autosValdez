import ToastNotification from "@/components/ui/ToastNotification";

import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";


export default async function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <header className="bg-black">
                    <Header />
                </header>

                <main className="flex-1 p-5">
                    {children}
                </main>

                <footer className="bg-black">
                    <Footer />
                </footer>
            </div>

            <ToastNotification />
        </>
    )
}