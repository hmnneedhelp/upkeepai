import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return(
        <main className='absolute z-10'>
            <div className="absolute inset-y-0 left-0 w-16 h-screen bg-slate-100 shadow-inner">
                <div className="flex col justify-center align-top mt-6">
                    <Link href="/profile">
                        <Image
                        className=""
                        src="/user.png"
                        alt="Profile icon"
                        width={32}
                        height={32}
                        priority
                        />
                    </Link>
                </div>
            </div>
        </main>
    )
}