import { useState } from 'react';
import { bookService } from '../services/PharmacyServices.ts';
import { type IBook } from '../data/packagesTypes.ts';

const useBook = () => {
  const [loading, setLoading] = useState(false);

  const onBook = (data: IBook) => {
    setLoading(true);
    bookService(data)
      .then(({ data }) => {
        window.location.href = data.bookingPaymentUrl;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { onBook, loading };
};

export default useBook;
