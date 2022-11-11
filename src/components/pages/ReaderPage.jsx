import { useParams } from 'react-router';
import NavBarUser from '../NavBarUser';
import ReaderContent from '../content/ReaderContent';

function ReaderPage() {

    const {id} = useParams();
    console.log(id);

    return (
        <>
            <NavBarUser />
            <ReaderContent readerId={id}/>
        </>
    )
}

export default ReaderPage;