import React from "react";
import Header from "../comp/header";
import Footer from "../comp/Footer";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../fireBase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { sendEmailVerification } from "firebase/auth";

// import MainContent from "../comp/MainContent";

const SignUp = () => {
  const [user, loading] = useAuthState(auth);
  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);
  const [HasError, setHasError] = useState(false);
  const [ErrorLogin, setErrorLogin] = useState(null);
  const [UserName, setUserName] = useState(null);
  const [creationTime] = useState(null);
  const [lastSignInTime] = useState(null);
  const navigate = useNavigate();

  // <<<<<<<<<<<functions>>>>>>>>>>>>
  const signInBtn = (eo) => {
    eo.preventDefault();
    createUserWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Email verification sent!");
          // ...
        });
        updateProfile(auth.currentUser, {
          displayName: UserName,
          email: Email,
          creationTime: creationTime,
          lastSignInTime: lastSignInTime,
        })
          .then(() => {
            navigate("/");
            // Profile updated!
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorLogin(errorCode);
        switch (errorCode) {
          case "auth/email-already-in-use":
            setErrorLogin("This email is already use");
            break;
          case "auth/admin-restricted-operation":
            setErrorLogin("Email or password is empty !!");
            break;
          case "auth/invalid-email":
            setErrorLogin("Email is not correct !!");
            break;
          case "auth/internal-error":
            setErrorLogin("Password is empty !!");
            break;
          case "auth/user-not-found":
            setErrorLogin("User is not found !!");
            break;
          case "auth/wrong-password":
            setErrorLogin("Wrong password !!");
            break;
          case "auth/too-many-requests":
            setErrorLogin("Too many requests!! , Pleas try again");
            break;
          case "auth/weak-password":
            setErrorLogin("Weak Password !!");
            break;
          default:
            setErrorLogin(errorCode);
            break;
        }
        setHasError(true);
        // ..
      });
  };
  // <<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>
  if (loading) {
    return (
      <>
        <Header />
        <main>
          <h1>Initialising User...</h1>
        </main>
        <Footer />
      </>
    );
  }
  if (!user) {
    return (
      <>
        <Header />
        <main>
          <form>
            <h2>Create a new account</h2>
            <input
              onChange={(eo) => {
                setUserName(eo.target.value);
              }}
              type="text"
              id=""
              placeholder="Enter your name"
              required
            />
            <input
              onChange={(eo) => {
                setEmail(eo.target.value);
              }}
              type="email"
              id=""
              placeholder="Enter your Email"
              required
            />
            <input
              onChange={(eo) => {
                setPassword(eo.target.value);
              }}
              type="password"
              id=""
              placeholder="Enter your Password"
              required
            />
            <button
              onClick={(eo) => {
                signInBtn(eo);
              }}
            >
              Sign in
            </button>
            <p className="account">
              Are you already have an account{" "}
              <Link className="link" to="/Login">
                Login
              </Link>
            </p>
            {HasError && <p className="errorParagraph"> Oops! {ErrorLogin}</p>}
          </form>
        </main>
        <Footer />
      </>
    );
  }
  if (!user.emailVerified) {
    return (
      <div>
        <Header />
        <main>
          <h1>We send you an email to verify your account 🤚</h1>
        </main>
        <Footer />
      </div>
    );
  }
};

export default SignUp;
