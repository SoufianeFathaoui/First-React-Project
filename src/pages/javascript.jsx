import Header from "../comp/header";
import Footer from "../comp/Footer";
import { Helmet } from "react-helmet-async";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../fireBase/config';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import Moment from 'react-moment';
import { deleteUser } from "firebase/auth";
import '../index.css';
import  '../theme.css';

const Javascript = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if(!user && !loading )
    {
      navigate("/");
    }
    if(user){
      if(!user.emailVerified){
        navigate("/");
      }
    }
  });
  // <<<<<<<<<<<functions>>>>>>>>>>>>
  const deletUserBtn = (eo) => {
    const user = auth.currentUser;
                  deleteUser(user).then(() => {
                    // User deleted.
                  }).catch((error) => {
                    // An error ocurred
                    // ...
                  });
  }
  // <<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>
  if (loading) {
    return (
    <div>
        <Header />
        <main>
          <h1>Initialising User...</h1>
        </main>
        <Footer />
    </div>
    );
  }
  if (error) {
    return (
    <div>
        <Header />
        <main>
          <p>Error: {error}</p>
        </main>
        <Footer />
    </div>
    );
  }
  if(user){
    if(user.emailVerified){
      return (
        <>
          <Helmet>
            <title>Profile Page</title>
            <meta name="description" content="JAVASCRIPTTTTTTTTTTTTTTTTTTTTT" />
            <style type="text/css">{`
        `}</style>
          </Helmet>
              <Header />
              <main>
                <div className="user">
                  <h6>Welcome : M.{user.displayName}</h6>
                  <h6>Email : {user.email}</h6>  
                  <h6>Creation Time : <Moment  fromNow date={user.metadata.creationTime}  /></h6>
                  <h6>Last SignIn : <Moment fromNow date={user.metadata.lastSignInTime}/> </h6>
                <button onClick={(eo) => {
                  deletUserBtn(eo)
                }} className="deleteUser">Delete User</button>
                </div>
              </main>
              <Footer />
        </>
      );
    }
  }
};

export default Javascript;
