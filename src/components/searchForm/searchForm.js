import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import SingleComicPage from '../pages/SingleComicPage';

import useRickAndMorty from '../../services/RickAndMorty';

import './searchForm.scss';
import '../../styles/button.scss';

const SearchForm = () => {
    const { loading, error, getSearchCharacter } = useRickAndMorty();
    const [data, setData] = useState('');
    const [searchError, setSearchError] = useState('');
    // const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        // console.log(data);
        if (data) {
            console.log(data);
            singleCharacter(data);
        }
    }, [data])

    const singleCharacter = (data) => {
        const char = {
            id: data.id,
            name: data.name,
            status: data.status,
            gender: data.gender,
            location: data.location.name
        }
        // console.log(char);
    }

    const updateData = (result) => {
        setSearchError('');
        setData(result.results[0]);

    }

    const search = (value) => {
        setData('');
        getSearchCharacter(value)
            .then(res => updateData(res))
            .catch(err => {
                if (err) {
                    setSearchError('Character not found')
                }
                setData('');
            })
        // setInputValue(value);
    }

    return (
        <Formik
            initialValues={
                {
                    name: ''
                }
            }
            validationSchema={Yup.object({
                name: Yup.string()
                    .min(2, 'Required min 2 symbols')
                    .required('This field is required')
            })}
            onSubmit={values => { search(values.name) }}>

            <div className="form">
                <div className="form__text">Or find a character by name:</div>
                <Form >
                    <div className="form__wrapper">
                        <Field className='form__input' name='name' type="text" placeholder='Enter name' />
                        <button className='button' type='submit'>Find</button>
                    </div>
                    <ErrorMessage className='error' name='name' component='div' />
                    {searchError ?
                        <div className='error'>The character was not found. Check the name and try again</div>
                        : null}
                    {data ?
                        <div className='success'>
                            <div className="success__msg">There is! Visit {data.name} page?</div>
                            <Link to={`/comics/${data.id}`}>
                                <button className='button button_secondary'>To page</button>
                            </Link>
                        </div>
                        : null}
                </Form>
            </div>

        </Formik>
    )
}

export default SearchForm;