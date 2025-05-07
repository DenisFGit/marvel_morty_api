import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import useRickAndMorty from '../../services/RickAndMorty';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const SingleComicPage = () => {

    const { comicId } = useParams();
    const [comic, setComic] = useState(null);
    const { loading, error, getCharacter, clearError } = useRickAndMorty();
    console.log(comicId);

    useEffect(() => {
        updateComic()
    }, [comicId])

    const updateComic = () => {
        clearError();
        getCharacter(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);

    }

    console.log(comic);
    // let content = <View comic={comic} />

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading || !comic) ? <View comic={comic} /> : null

    return (
        <div className="single">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({ comic }) => {

    const { name, gender, status, species, image, location, origin } = comic;
    return (
        <div className="single__comic">
            <img src={image} alt="char_image" />
            <div className="single__wrapper">
                <div className="single__name">{name}</div>
                <div className="single__gender">{gender}</div>
                <div className="single__location">{location.name}</div>
                <div className="single__origin">{origin.name}</div>
                <div className="single__species">{species}</div>
                <div className="single__status"> {status}</div>
            </div>
            <Link to='/comics' className="single__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;