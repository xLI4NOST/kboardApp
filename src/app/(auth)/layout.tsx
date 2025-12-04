
export default function AuthLayout({children,}: { children: React.ReactNode; }) {
    return (
        <div className={`font-noto min-h-screen bg-[#985ACE] flex items-center justify-center w-full font-bold`}>
                {children}
        </div>
    );
}