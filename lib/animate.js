/**
 * Animates DOM element using {@link https://daneden.github.io/animate.css|animate.css}
 * @param {HTMLElement} element - the element to apply animation on
 * @param {string} animationName - name of animation see {@link https://daneden.github.io/animate.css|animate.css} for details
 * @param {Function=} callback - callback function to be executed after finishing the animation
 */
export default (element, animationName, callback) => {
  if (!element) return;
  element.classList.add('animated', animationName);

  const handleAnimationEnd = () => {
    element.classList.remove('animated', animationName);
    element.removeEventListener('animationend', handleAnimationEnd);
    if (typeof callback === 'function') callback();
  };

  element.addEventListener('animationend', handleAnimationEnd);
};
