import React from 'react';

const UserTable = () => {
  // Sample data for demonstration
  const users = [
    {
      profilePic: 'https://via.placeholder.com/40',
      name: 'John Doe',
      email: 'john.doe@example.com',
      subscriptionStatus: 'Active',
      joinedDate: '2022-01-15',
      status: 'Active',
    },
    {
      profilePic: 'https://via.placeholder.com/40',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      subscriptionStatus: 'Inactive',
      joinedDate: '2021-12-01',
      status: 'Inactive',
    },
    {
      profilePic: 'https://via.placeholder.com/40',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      subscriptionStatus: 'Active',
      joinedDate: '2023-03-22',
      status: 'Active',
    },
  ];

  return (
    <div className='mt-20 col-span-12 w-full'>
      <div className="overflow-hidden rounded-lg shadow-md">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className='bg-admin-secondary text-white'>
              <th className="px-4 py-2 text-left">Profile</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Subscription Status</th>
              <th className="px-4 py-2 text-left">Joined Date</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Block</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b border-gray-200 bg-white rounded-md shadow-sm mb-2">
                <td className="px-4 py-2">
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.subscriptionStatus}</td>
                <td className="px-4 py-2">{user.joinedDate}</td>
                <td className="px-4 py-2">{user.status}</td>
                <td className="px-4 py-2">
                  <button className="bg-red-500 text-white px-2 py-1 rounded">
                    Block
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
