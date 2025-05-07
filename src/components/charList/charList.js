import { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import abyss from '../../resources/img/abyss.jpg';
import './charList.scss';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import MarvelService from '../../services/MarvelService';
import CharListItem from '../charListItem/charListItem';

import useRickAndMorty from '../../services/RickAndMorty';

const CharList = (props) => {

    const [list, setList] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(1);
    const [charEnded, setCharEnded] = useState(false);
    const [clickId, setClickId] = useState(false);

    useEffect(() => {
        getRickItems(true);
    }, [])

    // const onCharClick = (id) => {
    //     setClickId(id)
    // };

    // marvelService = new MarvelService();

    const { loading, error, getAllCharacter } = useRickAndMorty();

    // getItems = (offset) => {
    //     this.onCharListLoading();
    //     this.marvelService.getAllCharacters(offset)
    //         .then(this.updateList)
    //         .catch(this.onError)

    // }

    const getRickItems = (initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacter(offset)
            .then(updateList)
    }

    const updateList = (newList) => {
        // let charEnd = false;
        // if (newList.length < 9) {
        //     charEnd = true;
        // }

        setList(list => [...list, ...newList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        // setCharEnded(charEnd);
    }

    console.log('charList');

    const { onCharSelected } = props;
    // const { list, loading, error, newItemLoading, offset, charEnded } = this.state;

    const errorMsg = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;
    // const content = list ? list.map((item) => (
    //     <CharListItem key={item.id} id={item.id} name={item.name} img={item.thumbnail} onCharSelected={onCharSelected} />
    // )) : null

    // const content = list ? list.map((item) => (
    //     <CharListItem key={item.id}
    //         id={item.id}
    //         name={item.name}
    //         img={item.image}
    //         onCharSelected={onCharSelected}
    //         isSelectedChar={props.selectedChar == item.id} />
    // )) : null

    const content = list.map((item, i) => (
        <CharListItem key={item.id}
            id={item.id}
            name={item.name}
            img={item.image}
            onCharSelected={onCharSelected}
            isSelectedChar={props.selectedChar == item.id}
            style={{ animationDelay: `${i * 0.2}s` }} />
    ));

    return (
        <div className="char__list">
            <ul className="char__grid" style={{ display: loading ? 'block' : 'grid' }}>
                {content}
                {spinner}
                {errorMsg}
            </ul>
            <button
                onClick={() => getRickItems()}
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                className="char__btn button button_main button_long">
                <div className="inner">Load more</div>
            </button>
        </div>
    )

}


export default CharList;