import React, { useState } from "react";
import { Container, Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../Components/Header/Header";
import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import cheerio from "cheerio";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const title = $('meta[property="og:title"]').attr("content");
      const description = $('meta[property="og:description"]').attr("content");
      const imageUrl = $('meta[property="og:image"]').attr("content");
      setTitle(title);
      setDescription(description);
      setImageUrl(imageUrl);
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

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
            padding: "10px",
            color: "#fff",
            float: "right",
          }}
          onClick={handleShowModal}
        >
          ADD ARTICLE +
        </Button>
        <hr />
        {/* Modal to add articles */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Article</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicUrl">
                <Form.Label>URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter URL"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        {/* End of modal */}
        {/* Display article */}
        {title && (
          <div>
            <img src={imageUrl} alt={title} />
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        )}
        {/* End of display article */}
      </Container>
    </>
  );
}

export default Home;
