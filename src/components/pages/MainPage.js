import { useState } from 'react';
import RandomChar from '../randomChar/randomChar';
import CharList from '../charList/charList';
import CharInfo from '../charInfo/charInfo';
import SearchForm from '../searchForm/searchForm';
import ErrorBoundary from '../errorBoundary/errorBoundary';

import vision from '../../resources/img/vision.png';

const MainPage = () => {


    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id);
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} selectedChar={selectedChar} />
                </ErrorBoundary>
                <div className="char__info-search">
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                    <SearchForm />
                </div>
            </div>
            <img className='bg-decoration' src={vision} alt="vision" />
        </>
    )
}

export default MainPage;