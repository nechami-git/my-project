import { useEffect, useState } from 'react';
import '../CssPages/App.css'; // תקשרי לקובץ CSS שלך

const PromoBanner = ({ messages, delay = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const showInterval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setVisible(true);
      }, 500); // תואם ל-transition
    }, delay);

    return () => clearInterval(showInterval);
  }, [messages, delay]);

  return (
    <div className={`promo-banner ${visible ? 'show' : ''}`}>
      {messages[currentIndex]}
    </div>
  );
};

export default PromoBanner;
