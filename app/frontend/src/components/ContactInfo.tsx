
import Script from "next/script";
const ContactInfo = ({ contact }) => {
    const { name, id} = contact || {};
    if (!contact) {
      return (
        <p>Empty contact</p>
        )
    }
    return (
      <>
        <p>{id}</p>
        <div>
          <strong>{name}</strong>
        </div>
      </>
    );
  }
  
  export default ContactInfo;