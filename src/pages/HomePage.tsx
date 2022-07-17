import React, { useEffect, useState } from "react";
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from "../store/github/github.api";

import "../styles/HomePage.css";
import { useDebounce } from "../hooks/debounce";
import { RepoCard } from "../components/RepoCard";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search);
  const [dropdown, setDropdown] = useState(false);

  const [getUserRepos, { isLoading: reposIsLoading, data: repos }] =
    useLazyGetUserReposQuery();

  const {
    isLoading,
    isError,
    data: users,
  } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
  });

  function handleClick(userName: string) {
    getUserRepos(userName);
    setDropdown(false);

    console.log(repos);
  }

  useEffect(() => {
    setDropdown(debounced.length > 3 && users?.length! > 0);

    return () => {};
  }, [debounced, users]);

  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center pt-3 mx-auto w-100 h-100">
        {isError && <p className="center text-danger">Somthing went wrong</p>}
        <div className="position-relative w-50">
          <input
            type="text"
            className="border-1 py-2 px-4 w-100 rounded-2"
            placeholder="Search for Github username"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
          {dropdown && (
            <ul className="list-unstyled position-absolute dropdown">
              {isLoading && <p>Loading</p>}
              {users?.map((user) => (
                <li
                  key={user.id}
                  onClick={() => {
                    handleClick(user.login);
                  }}
                  className="py-2 px-4 user-hover bg-white"
                >
                  {user.login}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="w-50">
          {reposIsLoading && <p>Загрузка репозиториев</p>}
          {repos?.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
