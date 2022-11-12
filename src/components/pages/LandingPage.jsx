import { useEffect } from 'react'
import { useNavigate } from 'react-router';
import NavBarLanding from "../users/NavBarLanding";
import LandingContent from '../content/LandingContent';
import LandingFooter from '../content/LandingFooter';

function LandingPage() {

  const navigate = useNavigate();


  const goToUserHome = () => {
    navigate("/home");
  }

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      goToUserHome();
    }
  }, []);

  return (
    <>
      <NavBarLanding />
      <LandingContent />
      <LandingFooter />
    </>
  )
};

export default LandingPage;
