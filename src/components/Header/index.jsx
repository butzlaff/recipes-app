import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { ForkKnife } from '@phosphor-icons/react';
import './Header.css';
import SearchBar from '../SearchBar';

function Header({ title }) {
  const [showBar, setShowBar] = useState(null);
  const history = useHistory();
  const handlePerfil = () => {
    history.push('/profile');
  };
  const changeBar = (e) => {
    e.preventDefault();
    if (showBar) {
      setShowBar(false);
      return;
    }
    setShowBar(true);
  };

  return (
    <div className="flex flex-col gap-4 mb-4 items-center">
      <div
        className="
          bg-violet-900 w-full
          text-white py-2 px-3 flex
          items-center justify-center
        "
      >
        <h2 className="text-lg font-larger italic">
          RECIPES
          {' '}
          <span className="font-extrabold not-italic">app</span>
        </h2>
        <div className="flex gap-2 absolute right-3">
          <UserCircleIcon
            onClickCapture={ handlePerfil }
            data-testid="profile-top-btn"
            src="profileIcon"
            alt="profile-icon"
            className="w-8 h-8 hover:cursor-pointer"
          />
          {(title === 'Drinks' || title === 'Meals') && (
            <MagnifyingGlassIcon
              onClickCapture={ (e) => changeBar(e) }
              data-testid="search-top-btn"
              src="searchIcon"
              alt="search-top-btn"
              className="w-8 h-8 hover:cursor-pointer"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ForkKnife size={ 54 } weight="fill" className="text-yellow-400" />
        <h1
          className="text-violet-800 font-extrabold text-4xl capitalize"
          data-testid="page-title"
        >
          {title}
        </h1>
      </div>
      {showBar && <SearchBar />}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
