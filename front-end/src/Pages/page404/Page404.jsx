
import { Helmet } from "react-helmet";
import Error404 from "../../Components/404/Error404";

const Page404 = () => {
 
  return (
    <>
         <Helmet>
        <title>404 | Gamz </title>
      </Helmet>
      <Error404></Error404>
    </>
  );
};

export default Page404;
