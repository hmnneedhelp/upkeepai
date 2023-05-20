import Head from "next/head";
import ContactInfo from "../../components/ContactInfo";
import Script from 'next/script'
export const getServerSideProps = async (context) => {
    const { id } = context.params;
    const response = await fetch(`http://46.243.227.95:8000/objects/` +context.id);
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
    <main className='bg-white'>
      <Head>
        <title>Contact page</title>
      </Head>
      <h1>Contact page</h1>
    <ContactInfo contact={contact} />
    </main>
  );
  
  export default Contact;