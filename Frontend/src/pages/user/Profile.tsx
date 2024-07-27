import React from 'react';

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 p-4 bg-spotify-grey 800">
          <div className="text-center mb-6">
            <img
              className="w-24 h-24 mx-auto rounded-full"
              src="your-profile-picture-url"
              alt="Profile"
            />
            <h2 className="mt-4 text-xl font-semibold">Your Name</h2>
            <p className="text-gray-400">Full Stack Developer</p>
            <button className="mt-4 px-4 py-2 bg-spotify-green text-white rounded">Following</button>
            <button className="mt-2 px-4 py-2 bg-gray-700 text-white rounded">Message</button>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-gray-400">About Me</h3>
              <p className="text-gray-200">I make occasional beats when I'm bored</p>
            </div>
            <div>
              <h3 className="text-gray-400">Skills</h3>
              <ul className="text-gray-200">
                <li>React</li>
                <li>TypeScript</li>
                <li>Node.js</li>
                <li>MongoDB</li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Featured Projects</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded">
                  <div>
                    <h4 className="text-lg font-semibold">Project 1</h4>
                    <p className="text-gray-400">Description of project 1</p>
                  </div>
                  <button className="px-4 py-2 bg-spotify-green text-white rounded">View</button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded">
                  <div>
                    <h4 className="text-lg font-semibold">Project 2</h4>
                    <p className="text-gray-400">Description of project 2</p>
                  </div>
                  <button className="px-4 py-2 bg-spotify-green text-white rounded">View</button>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Recently Liked</h3>
              <ul className="space-y-4">
                <li className="p-4 bg-gray-800 rounded">
                  <h4 className="text-lg font-semibold">Article 1</h4>
                  <p className="text-gray-400">Description of article 1</p>
                </li>
                <li className="p-4 bg-gray-800 rounded">
                  <h4 className="text-lg font-semibold">Article 2</h4>
                  <p className="text-gray-400">Description of article 2</p>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
