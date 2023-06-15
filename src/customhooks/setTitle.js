import { useEffect } from "react";

const setTitle = (title) => {
  useEffect(() => {
    document.title = `Global Tongues | ${title} `;
  }, []);
};

export default setTitle;
