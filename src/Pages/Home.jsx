import React, { useState, useEffect } from "react";
import { Container, Modal, Button, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../Components/Header/Header";
import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import { articles } from "../assets/data/data";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");
  const [articleData, setArticleData] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [cards, setCards] = useState([]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setUrl("");
    setTitle("");
    setDescription("");
    setImageUrl("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get(`http://localhost:3001/home?url=${url}`);
      const articleData = response.data;
      setArticleData(articleData);
      setTitle(articleData.title);
      setDescription(articleData.description);
      setImageUrl(articleData.imageUrl);
      handleCloseModal();

      const newCard = (
        <Card
          key={articleData.id}
          class="mt-5 rounded-top"
          style={{
            width: "18rem",
            height: "100%",
            border: "1px solid #d3d3d3",
          }}
        >
          <div>
            <img
              src={articleData.imageUrl}
              alt={articleData.title}
              class="img-fluid rounded-t-5"
              // style={{ width: "200px", height: "200px" }}
            />
            <h2 class="fs-6 w-8 mt-2 px-2">{articleData.title}</h2>
            <p class="fs-6 w-10 mt-3 px-2 pb-3">{articleData.description}</p>
          </div>
          <div
            className="icons mx-3 pr-3"
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
            }}
          >
            <ShareOutlinedIcon style={{ pointer: "cursor" }} />
            <FavoriteBorderOutlinedIcon style={{ pointer: "cursor" }} />
          </div>
        </Card>
      );
      setCards((prevCards) => [...prevCards, newCard]);
    } catch (error) {
      console.log(error);
      setError("Invalid URL or missing meta tags");
    }
    setIsLoading(false);
  };

  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (title || description || imageUrl) {
      setTitle("");
      setDescription("");
      setImageUrl("");
    }
  }, [url]);

  return (
    <>
      <Container>
        <Header />
        <div className="d-flex mb-4 justify-content-end">
          <p style={{ marginRight: "3%" }}>Welcome, {user?.displayName}</p>
          {user?.displayName ? (
            <button onClick={handleSignOut}>Log out</button>
          ) : (
            <Link to="/signin">
              <button>Login</button>
            </Link>
          )}
        </div>
        <Button
          style={{
            backgroundColor: "#6E5773",
            border: "none",
            padding: "10px 30px",
            marginBottom: "30px",
            color: "#fff",
            float: "right",
          }}
          onClick={handleShowModal}
        >
          Add New Article
        </Button>
        <hr></hr>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Article</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Article URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter article URL"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </Form>
            {error && (
              <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            )}
          </Modal.Body>
        </Modal>
        {/* End of modal */}
        {/* Display article */}
        <div class="d-grid" style={{}}>
          {cards}
        </div>

        {/* End of display article */}
      </Container>
    </>
  );
}

export default Home;
