import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import avengers from '../../resources/img/Avengers.png';
import avengersLogo from '../../resources/img/Avengers_logo.png';
import uw from '../../resources/img/UW.png';
import x_men from '../../resources/img/x-men.png';

import './comicsList.scss';

import useRickAndMorty from '../../services/RickAndMorty';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/spinner';




const ComicsList = () => {

    const [list, setList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(1);
    const { loading, error, getAllCharacterComics } = useRickAndMorty();

    useEffect(() => {
        getRickItems(true);
    }, [])

    const getRickItems = (initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacterComics(offset)
            .then(updateList)
    }

    const updateList = (newList) => {
        setList(list => [...list, ...newList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
    }

    const errorMsg = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    console.log(list);

    const content = list.map((item) => {
        return (
            <li className="comics__item" key={item.id}>
                <Link to={`/comics/${item.id}`}>
                    <img src={item.image} alt="UW" />
                    <div className="comics__title">{item.name}</div>
                    <div className="comics__price">{item.location.name}</div>
                </Link>
            </li>
        )
    })

    return (
        <div className="comics">
            <div className="comics__banner">
                <div className="comics__banner-wrapper">
                    <img src={avengers} alt="avengers" />
                    <div className="comics__text">
                        New comics every week!
                        Stay tuned!
                    </div>
                </div>
                <img src={avengersLogo} alt="avengers_logo" />
            </div>
            <ul className="comics__list">
                {errorMsg}
                {spinner}
                {content}
            </ul>
            <button className="char__btn button button_main button_long"
                onClick={() => getRickItems()}
                disabled={newItemLoading}>
                LOAD MORE
            </button>
        </div>
    )

}

export default ComicsList;