const getHeader = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  Authorization: `Bearer ${(window.idms || {}).accessToken}`,
  correlationId: Date.now() + Math.random(),
});

export {
  getHeader,
};
