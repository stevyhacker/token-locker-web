import React from 'react';
// import sections
import Cta from '../components/sections/Cta';
import ContactForm from "../components/sections/ContactForm";


function Contact() {

  return (
    <div>
      <ContactForm/>
      <Cta split/>
    </div>
  );
}

export default Contact;
