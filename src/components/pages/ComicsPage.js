import ComicsList from '../comicsList/comicsList';
import { Helmet } from 'react-helmet';
const ComicsPage = () => {

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our comics"
                />
                <title>Comics page</title>
            </Helmet>
            <ComicsList />
        </>
    )
}

export default ComicsPage;