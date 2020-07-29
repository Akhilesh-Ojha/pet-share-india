import React, { createRef, useState, useEffect } from "react";
import { Grid, Card, Sticky, Ref } from 'semantic-ui-react';
import Spinner from '../../components/UI/Spinner/Spinner';
import PetCard from './PetCard';
import { FilterPanel, FilterIcon } from '../../components/FilterPanel/FilterPanel';
import { ApiService } from '../../services';
// import PetsJson from '../../assets/json/pets.json';
import './Adopt.scss';






const petList = pets => {
    return pets.length > 0 ?
        <Card.Group itemsPerRow={3} doubling stackable>
            {pets.map((item, index) => <PetCard petObj={item} key={item.id} />)}
        </Card.Group>

        :

        <div className="no-pets">
            <h2>No Pets found!</h2>
        </div>

}

function Adopt(props) {

    // const pageRef = createRef();
    const [petsList, setPetsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const innerContainerRef = createRef();


    useEffect(() => {
        setLoading(true);
        ApiService.get('/pets').then(response => {
            console.log('REsponse: ', response);
            setPetsList(response.data.data);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            console.log('Error: ', err);
        })
    }, [])

    return (

        <div className="main-container">
            <Ref innerRef={innerContainerRef}>
                <Grid>
                    <Grid.Column tablet={6} computer={4} className="filter-container" only="computer">
                        <Sticky context={innerContainerRef} offset={110}>
                            <FilterPanel />
                        </Sticky>
                    </Grid.Column>
                    <Grid.Column mobile={3} only="mobile">
                        <Sticky context={innerContainerRef} offset={110}>
                            {/* <div className="filter-icon"> */}
                            {/* <Icon name="filter" size="large" circular /> */}
                            {FilterIcon()}
                            {/* </div> */}
                        </Sticky>
                    </Grid.Column>
                    <Grid.Column mobile={13} tablet={10} computer={12} className="pet-cards-container">
                    
                        {!loading  ? petList(petsList) :  <Spinner />}

                    </Grid.Column>
                </Grid>
            </Ref>
        </div>

    )
};

export default Adopt;
