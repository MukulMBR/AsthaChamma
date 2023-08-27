import React, { useState } from 'react';

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you can handle the form submission, like sending the data to a server
        console.log('Form submitted:', { name, email, message });
    };

    return (
        <div>
            <h1 className='text'>Contact Us</h1>

            <div className="contact-container">
                <div className="contact-form">
                    <h2 className='text'>Contact Form</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="message">Message:</label>
                            <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>

                <div className="contact-info">
                    <h2>Contact Information</h2>
                    <p>Address: Tenali, AndhraPradesh, India</p>
                    <p>Email: mukulmbr@gmail.com</p>
                    <p>Phone: </p>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
