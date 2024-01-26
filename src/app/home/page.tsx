import React from "react";
const Home = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-blue-900 mb-2 font-bold">Shops Finder</h1>
      <div className="m-2">
        <h2 className="text-blue-800">
          Some of the technologies and features included in this project:
        </h2>
        <ul className="list-disc ml-3 [&_li]:mb-1">
          <li>Nextjs 14 with App Router</li>
          <li>
            Route Groups, Dynamic Routes, Parallel Routes, Intercepting Routes,
            Route Handlers ...
          </li>
          <li>Fully authentication which includes:</li>
          <ul className="list-disc ml-3">
            <li>Signin with NextAuth providers, credentials</li>
            <li>Activate the account using a link sent via email</li>
            <li>Reset the forgotten password</li>
          </ul>
          <li>Fully Responsive Web Design using Tailwind CSS</li>
          <li>User Dashboard (partially under construction)</li>
          <li>(Other features are still under construction)</li>
        </ul>
      </div>
      <div className="m-1 shadow-sm hover:shadow-md w-fit p-1">
        <h2 className="text-blue-800">
          To test this web application without signing up, you can use the
          following credentials:
        </h2>
        <p>
          <span className="font-bold">Email:&nbsp;</span>
          developerpro1000@gmail.com
        </p>
        <p>
          <span className="font-bold">Password:&nbsp;</span>1111111111
        </p>
      </div>
    </div>
  );
};
export default Home;
