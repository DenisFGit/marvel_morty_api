
import { Component, useState, useEffect, useRef } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton';
import useRickAndMorty from '../../services/RickAndMorty';

import PropTypes from 'prop-types';
import loki from '../../resources/img/loki.png';
import './charInfo.scss';


const CharInfo = (props) => {

    const [char, setChar] = useState();
    const { loading, error, getCharacter, clearError } = useRickAndMorty();

    useEffect(() => {
        updateRickChar()
    }, [props.charId])

    useEffect(() => {

    })

    const updateRickChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);

    }

    const skeleton = char || loading || error ? null : <Skeleton />
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading || !char) ? <View char={char} /> : null


    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )

}

const View = ({ char }) => {

    // const { name, description, thumbnail, homepage, wiki, comics } = char;
    const { loading, error, getCharacter, getEpisodes } = useRickAndMorty();
    const { name, description, image, homepage, wiki, comics, episode } = char;
    const arr = episode.slice(0, 10);

    const [epList, setEpList] = useState([]);

    useEffect(() => {
        if (arr.length === 0) return;

        Promise.all(arr.map(item => getEpisodes(item)))
            .then(responses => setEpList(responses)) // Updates state
            .catch(error => console.error(error));
    }, [char]); // Re-run effect when `char` changes

    const episodeList = epList.map((item) => (
        <li key={item.id} className="char__comics-item">
            {`${item.episode} , ${item.name}`}
        </li>
    ));

    const isEpisodeList = epList.length === 0
        ? 'There are no episodes with this character available'
        : episodeList;


    return (
        <>
            <div className="char__info-wrapper">
                <div className="char__header">
                    <img src={image} alt={name} />
                    <div className="char__header-wrapper">
                        <div className="char__header-name">{name}</div>
                        <div className="char__header-btns">
                            <a href={homepage} className="button button_main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button_secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__desc">
                    {description}
                </div>
                <div className="char__comics">
                    <div className="char__comics-title">Comics:</div>
                    <ul className="char__comics-list">
                        {/* {isComics} */}
                        {isEpisodeList}
                    </ul>
                </div>
            </div>
        </>
    )
}


export default CharInfo;