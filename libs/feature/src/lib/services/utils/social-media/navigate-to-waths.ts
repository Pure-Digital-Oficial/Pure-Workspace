export const navigateToWaths = (
  phone: string,
  message: string,
  inPage?: boolean
) => {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${phone}?text=${encodedMessage}`;

  window.open(url, inPage === true ? '_self' : '_blank');
};
