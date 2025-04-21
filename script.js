'use strict';

// Constants
const BOX = document.getElementById('animatedBox');
const TRIGGER_ANIMATION_BTN = document.getElementById('triggerAnimation');
const SET_COLOR_BTN = document.getElementById('setColorPreference');
const LOCAL_STORAGE_KEY = 'preferredBackgroundColor';

/**
 * Adds animation class, then removes it after animation ends to allow retriggering.
 */
function triggerAnimation() {
  BOX.classList.add('animate');
  BOX.addEventListener('animationend', () => {
    BOX.classList.remove('animate');
  }, { once: true });
}

/**
 * Prompts user to set a preferred background color and saves it to localStorage.
 */
function setBackgroundColorPreference() {
  const color = prompt('Enter your preferred background color (e.g., "lightblue", "#ff0000"):');
  if (color) {
    document.body.style.setProperty('--background', color);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, color);
    } catch (error) {
      console.error('LocalStorage error:', error);
    }
  }
}

/**
 * Loads the preferred background color from localStorage if available.
 */
function loadBackgroundColorPreference() {
  try {
    const savedColor = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedColor) {
      document.body.style.setProperty('--background', savedColor);
    }
  } catch (error) {
    console.error('LocalStorage error:', error);
  }
}

/**
 * Initializes event listeners and loads stored settings.
 */
function init() {
  TRIGGER_ANIMATION_BTN.addEventListener('click', triggerAnimation);
  SET_COLOR_BTN.addEventListener('click', setBackgroundColorPreference);
  loadBackgroundColorPreference();
}

// Initialize the app after DOM content is loaded
document.addEventListener('DOMContentLoaded', init);
