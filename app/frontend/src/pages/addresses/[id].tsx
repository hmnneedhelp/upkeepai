import Head from "next/head";
import ContactInfo from "../../components/ContactInfo";
import Script from 'next/script';
import Link from "next/link";
export const getServerSideProps = async (context) => {
    const { id } = context.params;
    const response = await fetch(`http://46.243.227.95:8000/objects/`+ id );
    const data = await response.json();
    
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
      
      <Link href={'/addresses'} className="absolute top-5 left-5"> <p>Назад</p> </Link>
      <h3>{contact.name}</h3>
    <ContactInfo contact={contact} />
    </main>
  );
  
  export default Contact;