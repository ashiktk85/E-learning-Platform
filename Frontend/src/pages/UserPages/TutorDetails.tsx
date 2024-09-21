import React from 'react';
import Navbar from '../../components/UserComponent/Navbar';
import Footer from '../../components/common/UserCommon/Footer';
import { useParams } from 'react-router-dom';

const TutorDetails = () => {
    const {id} = useParams()

    return (
        < >
            <Navbar />
            <main className="relative flex h-[500px] flex-col bg-black overflow-x-hidden font-sans mt-16">

            </main>
            <main className="relative flex min-h-screen flex-col bg-white overflow-x-hidden font-sans mt-16">

            </main>
            <Footer />
        </>
    );
}

export default TutorDetails;
