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
