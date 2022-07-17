import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { IRepo } from "../models/models";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

export function RepoCard({ repo }: { repo: IRepo }) {
  const { addFavourite, removeFavourite } = useActions();
  const { favour } = useAppSelector((state) => state.github);

  const [isFav, setIsFav] = useState(favour.includes(repo.url));

  const addToFavour = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addFavourite(repo.url);
    setIsFav(true);
  };

  const removeFromFavour = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFavourite(repo.url);
    setIsFav(false);
  };

  return (
    <Card className="user-hover pt-1 mt-2 px-5 mb-2 rounded-3">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="text-reset  text-decoration-none"
      >
        <Card.Title>{repo.full_name}</Card.Title>
        <Card.Text className="">
          <p>
            Forks: <span>{repo.forks}</span> / Watchers:{" "}
            <span>{repo.watchers}</span>
          </p>
          <p>{repo?.description}</p>
          {!isFav && (
            <Button onClick={addToFavour} className="btn-success">
              Add
            </Button>
          )}
          {isFav && (
            <Button onClick={removeFromFavour} className="btn-primary">
              Remove
            </Button>
          )}
        </Card.Text>
      </a>
    </Card>
  );
}
