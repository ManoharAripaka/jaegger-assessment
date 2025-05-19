import React, { lazy, useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataEnd, fetchDataStart, loadData, setViewCartInHeader, triggerScroll } from './redux/reducer';
const Selection = lazy(() => import('./components/selection/Selection'));
const Details = lazy(() => import('./components/details/Details'));
const Header = lazy(() => import('./components/header/Header'));

function App() {
    const { loading } = useSelector((state) => state.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDataStart());
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                dispatch(loadData(data))
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                dispatch(fetchDataEnd())
            });
    }, []);

    const handleScroll = (event) => {
        const scrollTop = event.target.scrollTop;
        if (scrollTop > 0) {
            dispatch(triggerScroll(true));
        } else {
            dispatch(triggerScroll(false));
        }
        // Trigger another function for add to cart button
        
        const selectionWrapper = document.querySelector('.selection-wrapper');
        const rect = selectionWrapper.getBoundingClientRect();
        dispatch(setViewCartInHeader(rect.top < window.innerHeight && rect.bottom >= 108));
    }

    return (
        <div className="App">
            {!loading ? 
                <div>
                    <Header />
                    <div className='main-wrapper' onScroll={handleScroll}>
                        <Selection />
                        <Details />
                    </div>
                </div> : 
                <div className='load-class'>Loading...</div>
            }
        </div>
    );
}

export default App;