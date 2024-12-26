import React, { useState } from "react";
import axios from "axios";
import './Admin.css'

  const Admin = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [tamil, setTamil] = useState(null);
  const [english, setEnglish] = useState(null);

  const titleFn = (e) => {
    setTitle(e.target.value)
  };
  const authorFn = (e) => {
    setAuthor(e.target.value)
  };
  const contentFn = (e) => {
    setContent(e.target.value)
  };

  const handleFile = (e, type) => {
    const file = e.target.files[0];
    if (type == "tamil") {
      setTamil(file);
    } else if (type == "english") {
      setEnglish(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tamil && !english) {
      alert("Please select Tamil and English videos");
      return;
    }

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("author", author);
    formdata.append("content", content);
    formdata.append("tamil", tamil);
    formdata.append("english", english);

    try {
      const response = await axios.post(
        "http://localhost:3000/literature", formdata);

      if (response.status === 200) {
        alert("Data send successfully");
        setTitle("");
        setAuthor("");
        setContent("");
        setTamil(null);
        setEnglish(null);
      }
    } catch (error) {
      console.log("Error", error.message);
      alert("Data not sent admin to backend");
    }
  };
  return (
    <div className="adminpage">
      <h1>Admin Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Tilte:
          <input
            type="text"
            name="title"
            value={title}
            onChange={titleFn}
            required
          />
        </label>{" "}
        <br />
        <label htmlFor="author">
          Author Name:
          <input
            type="text"
            name="author"
            value={author}
            onChange={authorFn}
            required
          />
        </label>{" "}
        <br />
        <label htmlFor="textarea">
          Content:
          <textarea
            name="textarea"
            id=""
            onChange={contentFn}
            value={content}
            required
          />
        </label>{" "}
        <br />
        <label htmlFor="tamil">
          {" "}
          Tamil vedio:
          <input
            type="file"
            name="tamil"
            onChange={(e) => handleFile(e, "tamil")}
            required
          />
        </label>{" "}
        <br />
        <label htmlFor="english">
          {" "}
          English vedio:
          <input
            type="file"
            name="english"
            onChange={(e) => handleFile(e, "english")}
            required
          />
        </label>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Admin;
