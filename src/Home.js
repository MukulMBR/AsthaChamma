import { useNavigate } from 'react-router-dom';
import Card from './Card';

const Home = () => {
    const navigate = useNavigate()
    const onCardClick =()=>{
        navigate('/board')
    }

    return (
        <div className='card-container'>
            <Card tittle="5x5 Game" des="Need to play a 5x5 Chowka Bhara game" onclick ={onCardClick}/>
            <Card tittle="7x7 Game" des="Need to play a 7x7 Chowka Bhara game" onclick ={onCardClick}/>
            <Card tittle="9x9 Game" des="Need to play a 9x9 Chowka Bhara game" onclick ={onCardClick}/>
        </div>
    )
}

export default Home;