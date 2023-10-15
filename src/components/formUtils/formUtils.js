
export const handleSubmit = (e, query, callback) => {
  e.preventDefault();
  if (query.trim() !== '') {
    callback(query);
  }
};
