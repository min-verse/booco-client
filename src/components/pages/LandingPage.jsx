import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router';
import NavBarLanding from '../NavBarLanding';
import LandingContent from '../content/LandingContent';

import { useSelector } from 'react-redux';

function LandingPage() {

  const navigate = useNavigate();
  

  const goToUserHome = ()=>{
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
    </>
  )
};

export default LandingPage;
