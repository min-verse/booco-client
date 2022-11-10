import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import NavBarLanding from '../NavBarLanding';
import NavBarUser from '../NavBarUser';
import HomeContent from '../content/HomeContent';

function HomePage() {
  return (
    <>
    <NavBarUser />
    <HomeContent />
    </>
  )
}

export default HomePage;