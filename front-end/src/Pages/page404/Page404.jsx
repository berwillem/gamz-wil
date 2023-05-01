import React from 'react';
import Navbar from "../../Components/Navbar/Navbar"
import Error404 from "../../Components/404/Error404"

const Page404 = (isDarkMode) => {
  const p=isDarkMode.isDarkMode
    return (
        <>
          <Navbar p={p}></Navbar>
          <Error404></Error404>

        </>
    );
};

export default Page404;