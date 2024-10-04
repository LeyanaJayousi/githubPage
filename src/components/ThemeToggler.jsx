import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../AppContext';
import lightIcon from './images/light.png';
import darkIcon from './images/dark.png';
import './ThemeToggler.css'; // Import CSS file for styles

function ThemeToggler({ onClick }) {
  const { darkMode } = useContext(AppContext);

  const handleOnClick = () => {
    darkMode.toggle();
    onClick();
  };

  return (
    <div className="theme-toggler">
      <button
        type="button"
        onClick={handleOnClick}
        className="theme-toggle-button"
      >
        <img
          src={darkMode.value ? lightIcon : darkIcon}
          alt={darkMode.value ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="theme-icon"
        />
      </button>
    </div>
  );
}

ThemeToggler.propTypes = {
  onClick: PropTypes.func,
};

ThemeToggler.defaultProps = {
  onClick: () => {},
};

export default ThemeToggler;
