import React from 'react';

const About = () => {
    return (
        <section className='container mx-auto mb-8' id="about"  >
            <h2 className='mb-8 text-center text-3xl tracking-tighter lg:text-4xl'>
                About Us
            </h2>
            <div className='flex flex-wrap'>

                <div className='w-full p-4 lg:w-1/2'>
                    <img src="https://img.freepik.com/free-photo/student-class-taking-notes_23-2148888811.jpg?size=626&ext=jpg&uid=R138448332&ga=GA1.1.462934507.1724409785&semt=ais_hybrid"
                     alt=""
                     className='rounded-3xl lg:rotate-3' />
                </div>

            </div>
        </section>


    );
}

export default About;
