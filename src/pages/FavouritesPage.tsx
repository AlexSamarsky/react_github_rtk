import React from "react";
import { useAppSelector } from "../hooks/redux";

const FavouritesPage = () => {
  const { favour } = useAppSelector((state) => state.github);

  if (!favour.length) return <p>No favorites urls</p>;

  return (
    <div className="d-flex flex-column align-items-center justify-content-center pt-3 mx-auto w-100 h-100">
      <ul className="list-unstyled">
        {favour.map((link) => (
          <li key={link}>
            <a
              href={link}
              target="_blank"
              className="text-reset text-decoration-none"
              rel="noreferrer"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavouritesPage;
