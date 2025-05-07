import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import thor from '../../resources/img/thor.jpg';
import mjolnir from '../../resources/img/mjolnir.png';
import './randomChar.scss';

import useRickAndMorty from '../../services/RickAndMorty';

const RandomChar = () => {

    const [char, setChar] = useState({});
    const { loading, error, getCharacter, clearError } = useRickAndMorty();

    useEffect(() => {
        updateRickCharacter();
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
        // setLoading(false);
    }

    const updateRickCharacter = () => {
        // setLoading(true);
        clearError();
        const id = Math.floor(Math.random() * (100 - 1) + 1);
        getCharacter(id)
            .then(onCharLoaded)
        // .catch(onError);
    }


    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading) ? <View char={char} /> : null
    console.log(char);

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <div className="randomchar__title">
                    Random character for today! <br />
                    Do you want to get to know him better?
                </div>
                <div className="randomchar__choose">
                    Or choose another one
                </div>
                <a onClick={loading ? null : updateRickCharacter} href="#" className="button randomchar__try">
                    <div className="inner">try</div>
                </a>
                <img className='randomchar__mjolnir' src={mjolnir} alt="mjolnir" />

            </div>

        </div>
    )

}

const View = ({ char }) => {

    // const { name, description, thumbnail, homepage, wiki } = char;
    const { name, description, image, homepage, wiki } = char;
    let styleImg = null;
    // if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    //     styleImg = 'fill';
    // }
    // else {
    //     styleImg = 'cover';
    // }

    return (
        <div className="randomchar__block">
            <img className='randomchar__img' src={image} alt="" style={{ objectFit: styleImg }} />
            <div className="randomchar__info">
                <div className="randomchar__name">{name}</div>
                <div className="randomchar__desc">
                    {description ? description : 'No description'}
                </div>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button_main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button_secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}


export default RandomChar;