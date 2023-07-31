import { useEffect } from "react";

const chatScrollBackground = (elementId) => {
  useEffect(() => {
    const handleScroll = () => {
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      const scrolledPercentage = scrollY / totalScrollHeight;

      const imageContainer = document.querySelector(elementId);
      if (imageContainer) {
        imageContainer.style.backgroundPosition = `center ${scrolledPercentage * 100}%`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [elementId]);
};

export default chatScrollBackground;
