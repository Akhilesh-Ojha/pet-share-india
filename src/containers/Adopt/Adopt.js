import React, { createRef, useState, useEffect } from "react";
// import { getCurrentUser } from "../../services/user.service";

import { Grid, Icon, Card, Sticky, Ref, Segment, Dimmer, Header, Form, Button, Image, Popup, List } from 'semantic-ui-react';

// import PetshareLogo from '../../assets/petshare_logo';
import PetsJson from '../../assets/json/pets.json';
import './Adopt.scss';


// const navLinks = ["Home", "Adopters", "Guardians", "Help", "Contact"];
// function Navbar(props) {
//     return (
//         <div className="navbar">
//             <img src={PetshareLogo} alt={"Petshare India"} className="pethshare-logo"></img>
//             <div className="navbar-links">
//                 {/* <Grid verticalAlign="middle" only="computer"> */}
//                 {navLinks.map((item) => (
//                     <a href="" className="navlink" key={item}>
//                         {item}
//                     </a>
//                 ))}
//                 {/* <a href="" >
//                     <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' avatar className="user-avatar" bordered />
//                 </a> */}
//                 <LogoutPopup />
//                 {/* </Grid> */}
//             </div>
//         </div>
//     );
// }

function LogoutPopup(props) {
    return (
        <Popup
            trigger={
                <Image src='https://react.semantic-ui.com/images/avatar/small/helen.jpg'
                    avatar
                    className="user-avatar"
                    bordered
                />}
            // flowing
            hoverable
            position='bottom right'
            // open
            className="logout-popup"
        >
            <List selection verticalAlign='middle'>
                <List.Item>
                    {/* <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' /> */}
                    <Icon name="setting" size="large" />
                    <List.Content>
                        <List.Header>Settings</List.Header>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <Icon name="envelope" size="large" />
                    {/* <Image avatar src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' /> */}
                    <List.Content>
                        <List.Header>Messages</List.Header>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <Icon name="bell" size="large" />
                    {/* <Image avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' /> */}
                    <List.Content>
                        <List.Header>Notifications</List.Header>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <Icon name="sign out" size="large" />
                    {/* <Image avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' /> */}
                    <List.Content>
                        <List.Header>Logout</List.Header>
                    </List.Content>
                </List.Item>
            </List>
        </Popup>
    )
}

const postAuthorLink = authorObj => (
    <a>
        <Icon name='user' />
        {authorObj.name}
    </a>
)

function PetCard(props) {
    const [dimmerActive, setDimmerActive] = useState(false);
    const { petObj } = props;

    return (
        <Card
            // key={petObj.id}
            fluid
            link
            className="pet-card"
            onMouseEnter={e => setDimmerActive(true)}
            onMouseLeave={e => setDimmerActive(false)}
        >
            <Dimmer.Dimmable blurring dimmed={dimmerActive}>
                <Dimmer active={dimmerActive} inverted>
                    <div className="dimmer-content">
                        Know More
                            <Icon name="arrow right" />
                    </div>
                </Dimmer>
                <div className="pet-image">
                    <img src={petObj.imageUrl} alt={petObj.name} />
                </div>
            </Dimmer.Dimmable>
            {/* <Image src={petObj.imageUrl} ui={false} className="pet-image" /> */}
            <Card.Content>
                <Card.Header>{petObj.name}</Card.Header>
                <Card.Meta>
                    <span className=''>{petObj.breed}</span>
                </Card.Meta>
                <Card.Description className="pet-description">
                    {petObj.description.length > 175 ? `${petObj.description.slice(0, 175)}...` : petObj.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                {postAuthorLink(petObj.authorInfo)}
            </Card.Content>
        </Card>
    )


};

function FilterPanel(props) {
    const [formState, setFormState] = useState({});

    const locationOptions = [
        { key: 'delhi', text: 'Delhi', value: 'delhi' },
        { key: 'bengaluru', text: 'Bengaluru', value: 'bengaluru' },
        { key: 'mumbai', text: 'Mumbai', value: 'mumbai' },
        { key: 'ahmedabad', text: 'Ahmedabad', value: 'ahmedabad' }
    ];
    const typeOfPetOptions = [
        { key: 'dog', text: 'Dog', value: 'dog' },
        { key: 'cat', text: 'Cat', value: 'cat' },
        { key: 'fish', text: 'Fish', value: 'fish' },
        { key: 'reptile', text: 'Reptile', value: 'reptile' }
    ];
    const breedOptions = [
        { key: 'affenpinscher', text: 'Affenpinscher', value: 'affenpinscher' },
        { key: 'poodle', text: 'Poodle', value: 'poodle' },
        { key: 'germanShephard', text: 'German Shephard', value: 'germanShephard' },
        { key: 'bulldog', text: 'Bulldog', value: 'bulldog' },
        { key: 'chihuahua', text: 'Chihuahua', value: 'chihuahua' },
        { key: 'rottweiler', text: 'Rottweiler', value: 'rottweiler' },
        { key: 'shibaInu', text: 'Shiba Inu', value: 'shibaInu' },
    ];

    const handleChange = (e, { name, value }) => setFormState({
        ...formState,
        [name]: value
    });


    console.log('FORM STATE: ', formState);

    return (
        <Segment raised>
            <Header as="h3">Filters</Header>
            <Form>
                <Form.Select
                    fluid
                    name="location"
                    label='Location'
                    options={locationOptions}
                    placeholder='Choose location...'
                    onChange={handleChange}
                />
                <Form.Select
                    fluid
                    name="typeOfPet"
                    label='Type of pet'
                    options={typeOfPetOptions}
                    placeholder='Choose type of pet...'
                    onChange={handleChange}
                />
                <Form.Select
                    fluid
                    name="breed"
                    label='Breed'
                    options={breedOptions}
                    placeholder='Choose breed...'
                    onChange={handleChange}
                />

                <Form.Field>
                    <label>Gender</label>
                    <Form.Group className="gender-radios">
                        <Form.Radio
                            name="gender"
                            label='Male'
                            value='male'
                            checked={formState.gender && formState.gender === 'male'}
                            onChange={handleChange}
                        />
                        <Form.Radio
                            name="gender"
                            label='Female'
                            value='female'
                            checked={formState.gender && formState.gender === 'female'}
                            onChange={handleChange}
                        />
                        <Form.Radio
                            name="gender"
                            label="Doesn't matter"
                            value='any'
                            checked={formState.gender && formState.gender === 'any'}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form.Field>

                <div className="filter-form-buttons">
                    <Button>Submit</Button>
                    <Button inverted color='red' floated="right">
                        Clear
                </Button>
                </div>
            </Form>
        </Segment>
    )
}


const FilterIcon = () => {


    // const [eventsEnabled] = useBooleanKnob({
    //     name: 'eventsEnabled',
    //     initialValue: true,
    //   })
    //   const [open, setOpen] = useBooleanKnob({ name: 'open' })

    const style = {
        padding: 0,
        border: 0
    };

    return (
        <Popup
            // content={FilterPanel}
            // eventsEnabled={eventsEnabled}
            // on='click'
            // onClose={() => setOpen(false)}
            // onOpen={() => setOpen(true)}
            // open={open}
            flowing
            hideOnScroll
            style={style}
            on="click"
            position='bottom left'
            trigger={<Icon name="filter" size="large" circular />}
        >
            <FilterPanel />
        </Popup>)

}
function Adopt(props) {

    const pageRef = createRef();
    const innerContainerRef = createRef();


    // const [petsList, setPetsList] = useState([]);

    // console.log('PETS: ', PetsJson.pets);


    // useEffect(() => {
    //     fetch('data/pets.json')
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log('DATA: ', data);
    //             setPetsList(data.pets)
    //         }).catch(error => console.group('error: ', error));
    // })

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
                        <Sticky context={innerContainerRef} offset={110} only="mobile">
                            {/* <div className="filter-icon"> */}
                            {/* <Icon name="filter" size="large" circular /> */}
                            {FilterIcon()}
                            {/* </div> */}
                        </Sticky>
                    </Grid.Column>
                    <Grid.Column mobile={13} tablet={10} computer={12} className="pet-cards-container">
                        {/* <Grid container columns={3}>
                                    {PetsJson.pets.map((item, index) =>
                                        <Grid.Column mobile={16} tablet={8} computer={5} key={'pet-' + index}>
                                            <PetCard petObj={item} />
                                        </Grid.Column>
                                    )}
                                </Grid> */}
                        {/* <Sticky> */}
                        <Card.Group itemsPerRow={3} doubling stackable>
                            {PetsJson.pets.map((item, index) => <PetCard petObj={item} />)}
                        </Card.Group>
                        {/* </Sticky> */}
                    </Grid.Column>
                </Grid>
            </Ref>
        </div>

    )
};

export default Adopt;
