import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import TextArea from 'antd/lib/input/TextArea';
import { Input, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';


// Kontakt administrator
// Emailjs.com
// npm i @emailjs/browser

export const ContactUs = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_leueslv', 'template_n3sdp27', form.current, 'Fam7t3ec-5rGwrY8o')
            .then(( ) => {
                message.success('Poruka je uspesno poslata');
                console.log(emailjs);
            }, (error) => {
                message.error({ success: false, message: error.message });
            });

         setTimeout(() => {
            message.success('Poruka je uspesno poslata');
         }, 2000);   
    };

    return (

        <form ref={form} onSubmit={sendEmail} layout="vertical">
            <label>Vaše ime i prezime:</label><br />
            <Input className='forName' type="text" name="user_name" required /><br />
            <label>Email:</label><br />
            <Input className='forEmail' placeholder='primer@gmail.com' prefix={<MailOutlined className="site-form-item-icon" />} type="email" name="user_email"  required/><br />
            <label>Pišite nam:</label><br/>
            <TextArea className='textArea' placeholder='Pitanja, primedbe...' name='message' rows={4} required/><br /><br />
            <Input  className='send-message' type="submit" value="Send" />
        </form>
    );
};
