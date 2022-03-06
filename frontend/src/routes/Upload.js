import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Upload = () => {
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const children = e.target.children;

    formData.append(children[0].name, children[0].value);
    formData.append(children[2].name, children[2].value);
    formData.append(children[4].name, children[4].value);
    if (children[6].files[0]) {
      formData.append(children[6].name, children[6].files[0]);
    }

    const config = {
      Headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const url = process.env.REACT_APP_SERVER_ADDRESS + process.env.REACT_APP_SERVER_PORT + '/api/items/';
    await axios
      .post(url, formData, config)
      .then(() => navigate('/'))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <form className="upload-form" onSubmit={onSubmit}>
        <input type="text" placeholder="아이템 이름" name="name" />
        <br />
        <input type="text" placeholder="아이템 설명" name="desc" />
        <br />
        <input type="text" placeholder="아이템 가격" name="price" />
        <br />
        <input type="file" accept="video/*" name="file" />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Upload;
