import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Item from '../components/Item';

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const url = process.env.REACT_APP_SERVER_ADDRESS + process.env.REACT_APP_SERVER_PORT + '/api/items/';
      try {
        setError(null);
        setItems([]);
        setLoading(true);
        const response = await axios.get(url);
        setItems(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchItems();
  }, []);

  return (
    <div>
      <Link to="/upload">상품 업로드</Link>
      <ul>
        {items.map((item) => {
          return (
            <Link to={`/items/${item.id}`}>
              <li key={item.id}>
                <Item {...item} />
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
