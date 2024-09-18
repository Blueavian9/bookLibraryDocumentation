export const addBook = async (bookData) => {
  // In a real application, this would make an API call
  // For now, we'll just return a mock response
  return Promise.resolve({ id: Date.now(), ...bookData });
};
