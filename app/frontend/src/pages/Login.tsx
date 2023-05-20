'use client';
import Link from 'next/link';
export default function Login(){
    return(
        <main>
            <div>
                <div className='bg-sky-950 w-screen h-screen flex justify-center items-center'>
                    <div className='bg-white w-[300px] h-[500px] flex flex-col justify-around gap-y-3 items-center'>
                        <p className='text-lg'>Вход</p>
                        <form className='items-center flex flex-col'>
                            <input type="email" placeholder='Введите ваш Email' className=' border-b-black border-2 border-x-0 border-t-0 focus:outline-none'/>
                            <input type="password" name="" id="" className='my-8 border-b-black border-2 border-x-0 border-t-0 focus:outline-none '  placeholder='Введите ваш пароль'/>
                            <button className='bg-cyan-500 hover:bg-cyan-600 w-[200px] h-10 rounded-lg'>Войти</button>
                        </form>
                        <div>Ещё нет аккаунта? <Link href="Register">Зарегистрируйтесь</Link></div>
                    </div>
                </div>
            </div>
        </main>
    )
}