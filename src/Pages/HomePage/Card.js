import './home.css'
const Card = (props) => {
  console.log('Mukul',props);
  const {tittle,des,onclick} = props;
    return(
        <div className='card' onClick={() => onclick()}>
        <h1>{tittle}</h1>
        <h3>{des}</h3>
      </div>
    )
}

export default Card;