import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';

const Home = () => {
  const navigate = useNavigate();

  const onCardClick = (gameType) => {
    if (gameType === '5x5') {
      navigate('/board5x5');
    } else if (gameType === '7x7') {
      navigate('/board7x7');
    } else if (gameType === '9x9') {
      navigate('/board9x9');
    }
  };

  return (
    <div className='card-container'>
      <Card tittle="5x5 Game" des="Need to play a 5x5 Chowka Bhara game" onclick={() => onCardClick('5x5')} />
      <Card tittle="7x7 Game" des="Need to play a 7x7 Chowka Bhara game" onclick={() => onCardClick('7x7')} />
      <Card tittle="9x9 Game" des="Need to play a 9x9 Chowka Bhara game" onclick={() => onCardClick('9x9')} />
    </div>
  );
};

export default Home;
