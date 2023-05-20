import Link from 'next/link';
export default function Register(){
    return(
    <div className='bg-sky-950 w-screen h-screen flex justify-center items-center'>
        <div className='bg-white w-[300px] h-[500px] flex flex-col justify-center gap-y-3 items-center'>
            <p className='text-xl'>Зарегистрируйтесь</p>
            <form className='justify-between items-center flex flex-col'>
                <input type="text" placeholder='Введите ваше имя' className='border-b-black my-5 border-2 border-x-0 border-t-0 focus:outline-none' />
                <input type="email" placeholder='Введите ваш Email' className='my-5 border-b-black border-2 border-x-0 border-t-0 focus:outline-none'/>
                <input type="password" name="" id="" className='border-b-black border-2 border-x-0 border-t-0 focus:outline-none my-5'  placeholder='Введите ваш пароль'/>
                <input type="file" name="" id="avatar" className='my-5 w-[200px] hidden' />
                <label htmlFor="avatar" className='my-5 cursor-pointer'>Загрузите ваш аватар</label>
                <button className='bg-cyan-500 hover:bg-cyan-600 w-[200px] h-10 rounded-lg'>Зарегистрироваться</button>
            </form>
            <p>Уже есть аккаунт? <Link href="Login">Войдите</Link></p>
        </div>
    </div>
    )
}