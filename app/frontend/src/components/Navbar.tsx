import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return(
        <main className="absolute border-r-2 shadow-lg">
            <div className="ml-0 w-72 sticky h-screen">
                <div className="flex justify-between px-5 mt-5">
                    <Link href="/profile">
                        <Image className="inline-block" src="/user.png" alt="Profile icon" width={64} height={64} priority/>
                    </Link>
                    <span className="self-center font-bold text-lg text-right">Иванов Иван Иванович</span>
                </div>
                <div className="w-64 h-16 my-5 border-2 rounded-[15px] text-center border-black text-black mx-auto">
                    <p className="leading-tight w-40 m-auto py-4 align-middle">Обращения граждан</p>
                </div>
                <div className="w-64 h-16 my-5 border-2 rounded-[15px] text-center border-black text-black mx-auto">
                    <p className="leading-tight w-52 m-auto py-2 align-middle">Работы по содержанию (Техническое обслуживание)</p>
                </div>
                <div className="w-64 h-16 my-5 border-2 rounded-[15px] text-center border-black text-black mx-auto">
                    <p className="leading-tight w-40 m-auto py-4 align-middle">Текущие ремонты</p>
                </div>
                <div className="w-64 h-16 my-5 border-2 rounded-[15px] text-center border-black text-black mx-auto">
                    <p className="leading-tight w-40 m-auto py-4 align-middle">Капитальные ремноты</p>
                </div>
                <div className="w-64 h-16 my-5 border-2 rounded-[15px] text-center border-black text-black mx-auto">
                    <p className="leading-tight w-40 m-auto py-4 align-middle">Объекты</p>
                </div>
                <div className="w-64 h-16 my-5 border-2 rounded-[15px] text-center border-black text-black mx-auto">
                    <p className="leading-tight w-40 m-auto py-4 align-middle">Аналитика</p>
                </div>
            </div>
        </main>
    )
}