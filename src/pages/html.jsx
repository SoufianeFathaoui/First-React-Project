
import Header from '../comp/header';
import Footer from '../comp/Footer';
import MainContent from '../comp/MainContent';
import { Helmet  } from 'react-helmet-async';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../fireBase/config';
import { useNavigate } from "react-router-dom";


const Html = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if(!user && !loading)
    {
      navigate("/");
    }
    if(user){
      if(!user.emailVerified){
        navigate("/");
      }
    }
  });
    if(user){
      if(user.emailVerified){
        return (
        <>
            <Helmet>
              <title>About Page</title>
            <meta name="description" content="HTMLLLLLLLLLLLLLLLL" />
            </Helmet>
          <Header />
          <MainContent pageName="About Page"  />   
          <Footer />
        </>
        );
      }
    }
}

export default Html;
