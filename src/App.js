import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Row, Col } from 'react-bootstrap';

var collection = [{"title":"Lush Rain forest", 
    "image":"https://images.unsplash.com/photo-1511884642898-4c92249e20b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", 
    "description":"Variety of animals call Tropical rain forest their home"}]
    
var json = {"data":collection};
if (localStorage.getItem("data") === null){
  localStorage.setItem("data",JSON.stringify(json));
}


function App() {
  var [cards, setCards] = useState([]);
  var navigate = useNavigate();
  
  useEffect(()=>{
    var cards = JSON.parse(localStorage.getItem("data")).data;
    setCards(cards);
  },[])

  var handleClick = (title) => {
    console.log(title)
    localStorage.setItem("seletedCard",title);
    navigate("/more-details");
  }

  var handleCreate = () => {
    navigate("/create-form");
  }

  console.log(cards)
  return (
    <div className="App">

      <Row className='mb-4'>
        <Button variant="primary" onClick={handleCreate}>Create</Button>     
      </Row>
      <Row>
        {cards.map((card, id)=>{
          var c = <Col md={{span:3, offset:1}}><Card style={{ width: '18rem' }} key={id}>
                    <Card.Img variant="top" src={card.image} style={{objectFit:"cover", width: '18rem', height:"15vh"}}/>
                    <Card.Body>
                      <Card.Title>{card.title}</Card.Title>
                      <Button variant="primary" onClick={()=>handleClick(card.title)}>More details</Button>
                    </Card.Body>
                  </Card></Col>;
          return c;
        })}
      </Row>
      
    </div>
  );
}

export default App;
