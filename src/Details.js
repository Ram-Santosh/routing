import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/esm/Container';

export default function Details () {
    var [card, selectedCard] = useState({});
    var navigate = useNavigate();

    useEffect(()=>{
        var title = localStorage.getItem("seletedCard");
        var allCards = JSON.parse(localStorage.getItem("data")).data;
        var selected = allCards.filter((c) => {
            if (c.title === title) return c;
        })
        selectedCard(selected[0]);
    },[])
    
    var handleEdit = (title, image, description) => {
        localStorage.setItem("title",title);
        localStorage.setItem("image",image);
        localStorage.setItem("description",description);
        navigate("/create-form")
    }

    var handleDelete = (title) => {
        var allCards = JSON.parse(localStorage.getItem("data")).data;
        var del = allCards.filter((c) => {
            if (c.title !== title) return c;
        })
        var json = {"data":del};
        localStorage.setItem("data",JSON.stringify(json));
        navigate("/");
    }

    return (
        <Container className='mt-5'>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={card.image} style={{objectFit:"cover", width: '18rem', height:"15vh"}}/>
                <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.description}</Card.Text>
                <Button variant="primary" onClick={() => handleEdit(card.title,card.image,card.description)}>Edit</Button>&nbsp;&nbsp;
                <Button variant="primary" onClick={() => handleDelete(card.title)}>Delete</Button>
                </Card.Body>
            </Card>
        </Container>
    )
}