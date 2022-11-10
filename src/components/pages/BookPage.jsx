import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useParams } from 'react-router';
import NavBarLanding from '../NavBarLanding';
import NavBarUser from '../NavBarUser';
import HomeContent from '../content/HomeContent';
import BookContent from '../content/BookContent';

function BookPage() {

    const {id} = useParams();
    console.log(id);

    return (
        <>
            <NavBarUser />
            <BookContent bookId={id}/>
        </>
    )
}

export default BookPage;