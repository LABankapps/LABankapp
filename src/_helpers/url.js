const url = () => {
  return process.env.NODE_ENV === 'development' && "http://localhost:8000";
}

export { url };
