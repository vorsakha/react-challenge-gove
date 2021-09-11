const handleBlockScroll = (condition: boolean): void => {
  condition
    ? (document.getElementsByTagName("body")[0].style.overflow = "hidden")
    : (document.getElementsByTagName("body")[0].style.overflow = "visible");
};

export default handleBlockScroll;
