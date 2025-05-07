import { Component } from 'react';
import { useRef } from 'react';
import abyss from '../../resources/img/abyss.jpg';
import './charListItem.scss';


const CharListItem = (props) => {


    // let styleImg = null;
    // if (this.props.img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    //     styleImg = 'fill';
    // }
    // else {
    //     styleImg = 'cover';
    // }

    // style={{ objectFit: styleImg }}

    return (
        <li style={props.style}
            ref={props.nodeRef}
            onClick={() => props.onCharSelected(props.id)}
            className={props.isSelectedChar ? 'char__item char__item_selected' : 'char__item'}>
            <img src={props.img} alt="abyss" />
            <div className="char__name">{props.name}</div>
        </li>
    )

}



export default CharListItem;