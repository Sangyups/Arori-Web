import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

import Item from '../components/Item';
import ThreejsLoader from '../components/ThreejsLoader';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const url = process.ENV.REACT_APP_SERVER_ADDRESS + process.ENV.REACT_APP_SERVER_PORT + `/api/items/${id}`;
      try {
        setError(null);
        setItem(null);
        setLoading(true);
        const response = await axios.get(url);
        setItem(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchItems();
  }, []);

  if (!item) return null;

  return (
    <div>
      <Link to="/">Home</Link>
      <Item {...item} />
      <ThreejsLoader fileName={item.fileName} />
    </div>
  );
};

export default ItemDetail;
