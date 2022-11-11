import { useParams } from 'react-router';
import NavBarUser from './NavBarUser';
import PostContent from '../content/PostContent';

function PostPage() {

    const {id} = useParams();
    console.log(id);

    return (
        <>
            <NavBarUser />
            <PostContent postId={id}/>
        </>
    )
}

export default PostPage;