import { useParams } from 'react-router';
import NavBarUser from './NavBarUser';
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