import Head from "next/head";
import ContactInfo from "../../components/SearchInfo";
import Script from 'next/script';
import Link from "next/link";
export const getServerSideProps = async (context) => {
    const { id } = context.params;
    const response = await fetch(`http://46.243.227.95:8000/objects/`+ id + '?model=feature');
    const data = await response.json();
    console.log(data)
    if (!data) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: { contact: data },
    }
    
  };
  
  
  const Contact = ({ contact }) => ( 
    <main className='bg-white justify-center flex flex-col items-center w-auto mx-auto'>
      <Head>
        <title>{contact.name} </title>
      </Head>
      
      <Link href={'../'} className="my-5 top-5  border-[1px] border-black w-32 p-1 text-center rounded-md hover:bg-green-500 transition duration-300 text-black cursor-pointer"> <p>Назад</p> </Link>
      <h3>{contact.name}</h3>
    <ContactInfo contact={contact} />
    </main>
  );
  
  export default Contact;