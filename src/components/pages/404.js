import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/errorMessage";


const Page404 = () => {
    return (
        <div>
            <ErrorMessage />
            <h1>404</h1>
            <h2>Page doesn't exist</h2>
            <Link to='/'>
                Back to main page
            </Link>
        </div>
    )
}

export default Page404;