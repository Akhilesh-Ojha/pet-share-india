import React, { useState } from 'react';
import { Popup, Segment, Header, Form, Icon, Button } from 'semantic-ui-react';

import './FilterPanel.scss';

export const FilterIcon = () => {

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

export const FilterPanel = props => {
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
