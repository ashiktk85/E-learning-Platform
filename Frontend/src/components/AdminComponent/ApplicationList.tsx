import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@nextui-org/react';

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

interface ApplicationListProps {
    setApplicationCount: (count: number) => void;
}

const ApplicationList: React.FC<ApplicationListProps> = ({ setApplicationCount }) => {

    const navigate = useNavigate();
    const [applications, setApplications] = useState<IApplication[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<IApplication[]>(`${url}/admin/getapplications`);
                setApplications(response.data);
                setApplicationCount(response.data.length);
            } catch (error) {
                console.error('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [setApplicationCount]);

    const handleViewClick = async (applicationId: string) => {
        try {
            const response = await axios.get(`${url}/admin/applicationview/${applicationId}`);
            navigate('/admin/applicationdetails', { state: { applicationData: response.data } });
        } catch (error) {
            console.error('Error fetching application details', error);
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
                            <th className="py-3 px-6 text-left">Status</th>
                            <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="py-3 px-6 text-center">
                                    <Skeleton className="w-full h-12" />
                                    <Skeleton className="w-full h-12 mt-2" />
                                    <Skeleton className="w-full h-12 mt-2" />
                                </td>
                            </tr>
                        ) : applications.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-3 px-6 text-center">
                                    No new applications.
                                </td>
                            </tr>
                        ) : (
                            applications.map((application) => (
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
                                    <td className="py-3 px-6 text-left text-orange-400">
                                        <span>{application.status}</span>
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
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApplicationList;
