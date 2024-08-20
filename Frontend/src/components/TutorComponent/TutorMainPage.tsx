import React from 'react';

const TutorMainPage = () => {
    return (
        <>
        <div className='w-full h-20 font-poppins'>
            <h2 className='text-black font-bold'>Welcome Back , Alexis!</h2>
            <p 
            className='font-normal pt-2'
            >Track your performance, manage your courses, and access key statistics to enhance your tutoring experience. 
                Get an overview of your activity and stay updated with your progress all in one place</p>
        </div>
        
        <div className='w-full flex h-60  gap-2 justify-between'>
            <div className='h-52  mt-5 ml-2 w-[650px] bg-green-600 shadow-lg rounded-md'></div>
            <div className='h-52 mt-5 ml-2  mr-2 w-full '>
                <div className='flex w-full gap-2 h-full '>
                    <div className=' w-full h-full   flex-col gap-2'>
                        <div className=' bg-[#fafbfe] shadow-lg h-1/2 w-full rounded-sm'>
                        <h3 className='font-medium pt-3 pl-5'>New students</h3>
                        <p className='pt-2 pl-6 font-bold text-xl text-green-500'>2.539</p>
                        <p className='pt-1 pl-4 text-gray-500 text-[12px]'>"80% increase in the past 20 days"</p>
                        </div>
                        <div className=' bg-[#fafbfe] shadow-lg h-1/2 w-full mt-2 rounded-sm'>
                        <h3 className='font-medium pt-3 pl-5'>Total students</h3>
                        <p className='pt-2 pl-6 font-bold text-xl text-green-500'>124</p>
                        <p className='pt-1 pl-4 text-gray-500 text-[12px]'>"80% increase in the past 20 days"</p></div>
                    </div>
                    <div className=' w-full h-full  flex-col'>
                    <div className=' bg-[#fafbfe] shadow-lg h-1/2 w-full rounded-sm'>
                    <h3 className='font-medium pt-3 pl-5'>Total income</h3>
                        <p className='pt-2 pl-6 font-bold text-xl text-green-500'>$10,876</p>
                        <p className='pt-1 pl-4 text-gray-500 text-[12px]'>"20% increase in the past 20 days"</p></div>
                    <div className=' bg-[#fafbfe] shadow-lg h-1/2 w-full mt-2 rounded-sm'>
                    <h3 className='font-medium pt-3 pl-5'>New students</h3>
                        <p className='pt-2 pl-6 font-bold text-xl text-green-500'>2.539</p>
                        <p className='pt-1 pl-4 text-gray-500 text-[12px]'>"80% increase in the past 20 days"</p></div>
                    </div>
                </div>

            </div>
        </div>
       
      
        </>
    );
}

export default TutorMainPage;
