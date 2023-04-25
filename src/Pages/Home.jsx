import React, { useState, useEffect } from "react";
import { Container, Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../Components/Header/Header";
import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import cheerio from "cheerio";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");
  const [articleData, setArticleData] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
      const response = await axios.get(url);
      console.log(response.data);
      const $ = cheerio.load(response.data);
      const title = $('meta[property="og:title"]').attr("content");
      const description = $('meta[property="og:description"]').attr("content");
      const imageUrl = $('meta[property="og:image"]').attr("content");
      setArticleData({ title, description, imageUrl });
      if (!title || !description || !imageUrl) {
        throw new Error("Missing meta tags");
      }
      setTitle(title);
      setDescription(description);
      setImageUrl(imageUrl);
      handleCloseModal();
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
        <h1>Home Page</h1>
        {/* End of modal */}
        {/* Display article */}
        {articleData && (
          <div>
            <img src={articleData.imageUrl} alt={articleData.title} />
            <h2>{articleData.title}</h2>
            <p>{articleData.description}</p>
          </div>
        )}
        {/* End of display article */}
      </Container>
    </>
  );
}

export default Home;
