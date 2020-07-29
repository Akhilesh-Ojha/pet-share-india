import React, { useState } from 'react';
import { Card, Dimmer, Icon } from 'semantic-ui-react';
import './PetCard.scss'

const postAuthorLink = author => (
  <a>
      <Icon name='user' />
      {initialUpper(author)}
  </a>
)


const initialUpper = word => {
  return word ? word.charAt(0).toUpperCase() + word.slice(1, word.length) : ''
}


function PetCard(props) {
  const [dimmerActive, setDimmerActive] = useState(false);
  const { petObj } = props;

  return (
    <Card
      key={petObj.id}
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
          <img src={petObj.imageUrl[0]} alt={petObj.name} />
        </div>
      </Dimmer.Dimmable>
      {/* <Image src={petObj.imageUrl} ui={false} className="pet-image" /> */}
      <Card.Content>
        <Card.Header>{initialUpper(petObj.name)}</Card.Header>
        <Card.Meta>
          <span className=''>{initialUpper(petObj.petBreed)}</span>
        </Card.Meta>
        <Card.Description className="pet-description">
          {
            petObj.description ? 
            petObj.description.length > 175 ? `${petObj.description.slice(0, 175)}...` : petObj.description
            : ''
          }
        
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {postAuthorLink(petObj.author)}
      </Card.Content>
    </Card>
  )
};


export default PetCard;