import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const url = "http://localhost:7000";

interface IApplication {
    email: string;
    applicationId: string;
    tutorRole: string;
    age: string;
    gender: string;
    phone: string;
    degree: string;
    fieldOfStudy: string;
    institution: string;
    graduationYear: string;
    status: string; 
}

const ApplicationList: React.FC = () => {

    const navigate = useNavigate()
    const [applications, setApplication] = useState<IApplication[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<IApplication[]>(`${url}/admin/getapplications`);
                setApplication(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);

    const handleViewClick = async (applicationId: string) => {
        try {
       
            const response = await axios.get(`${url}/admin/applicationview/${applicationId}`)
            console.log(response.data, "contoller");
            
            navigate('/admin/applicationdetails', { state: { applicationData: response.data } });
            
        } catch (error) {
            
        }
        
    };

    return (
        <div className="p-6 mt-16">
       
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-black text-gray-400 uppercase text-sm leading-normal">
                    
                            <th className="py-3 px-6 text-left">Role</th>
                            <th className="py-3 px-6 text-left">Institution</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Phone No.</th>
                            <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {applications.map((application) => (
                            <tr key={application.applicationId} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap flex items-center">
                                    <div className="flex items-center">
                                        <div className="mr-2">
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${application.gender === 'male' ? 'M' : 'F'}`}
                                                alt="avatar"
                                                className="w-8 h-8 rounded-full"
                                            />
                                        </div>
                                       
                                    </div>
                                
                                    <span>{application.tutorRole}</span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span>{application.institution}</span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span>{application.email}</span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span>{application.phone}</span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <button
                                        onClick={() => handleViewClick(application.applicationId)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-full text-xs hover:bg-blue-600"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApplicationList;
