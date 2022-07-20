import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import { useState } from 'react';
import { useNavigate } from "react-router-dom"

export default function CreateForm () {
    var [title, setTitle] = useState(()=>{
        if (localStorage.getItem("title") !== null) {
            return localStorage.getItem("title");
        } 
        else return "";
    });
    var [image, setImage] = useState(()=>{
        if (localStorage.getItem("image") !== null) return localStorage.getItem("image");
        else return "";
    });
    var [description, setDescription] = useState(()=>{
        if (localStorage.getItem("description") !== null) return localStorage.getItem("description");
        else return "";
    });
    var [error, setError] = useState({
        titleError:"",
        descriptionError:""
    });
    var navigate = useNavigate();
    
    var handleTitle =(e) =>{
        setTitle(e.target.value);
    }

    var handleImage =(e) =>{
        setImage(e.target.value); 
    }

    var handleDescription =(e) =>{
        setDescription(e.target.value);
    }

    var handleSubmit = (e) => {
        e.preventDefault();
        var copyError = {...error}

        //validation
        if (title.length < 3 || title.length > 10){
            copyError.titleError = "Title length should be between 3 and 10"
        }
        
        if (description.length < 10 || description.length > 100){
            copyError.descriptionError = "Description length should be between 10 and 100."
        }
        setError(copyError);

        if (copyError.titleError === "" && copyError.descriptionError === ""){
            var allCards = JSON.parse(localStorage.getItem("data")).data;
            var card = {"title":title, "image":image, "description":description}
            allCards.push(card);
            var json = {"data":allCards};
            localStorage.setItem("data",JSON.stringify(json));
            navigate("/");
        }
    }

    return (
        <Container style={{borderStyle: "outset"}} className="p-4 mt-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" onChange={handleTitle} value={title} placeholder="Enter Title" required/>
                </Form.Group>
                {error.titleError}
                <Form.Group className="mb-3 mt-2" controlId="image">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control type="text" onChange={handleImage} value={image} placeholder="Enter image url" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" onChange={handleDescription} value={description} placeholder="Enter description" required/>
                </Form.Group>
                {error.descriptionError}<br/>
                <Button variant="primary" type="submit" className='mt-2'>
                    Submit
                </Button>
            </Form>
        </Container>     
    )
}