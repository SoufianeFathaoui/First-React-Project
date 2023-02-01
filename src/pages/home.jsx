import Header from "../comp/header";
import Footer from "../comp/Footer";
import MainContent from "../comp/MainContent";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../fireBase/config";
import ErrorPage from "./Error_page";
import '../index.css';

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  console.log(user);
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

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>

          {user && (
            <div>
              <Header />
              <main className="homePage">
                <h1>Welcome : M.{user.displayName}</h1>
                <h1>We send you an email to verify your account 🤚</h1>
              </main>
              <Footer />
            </div>
          )}
        </>
      );
    }
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>

          {user && (
            <div>
              <Header />
              <main>Welcome : M.{user.displayName}</main>
              <Footer />
            </div>
          )}
        </>
      );
    }
  }

  if (!user) {
    return (
      <div>
        <Header />
        <MainContent pageName="Please sign In to continue 🤚" />
        <Footer />
      </div>
    );
  }
};

export default Home;
