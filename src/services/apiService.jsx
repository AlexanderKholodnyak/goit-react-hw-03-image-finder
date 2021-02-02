import axios from 'axios';

const apiService = async (query, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=18452046-d075d28130c097165687e8e16&image_type=photo&orientation=horizontal&per_page=12`,
  );
  return data.hits;
};

export default apiService;

// ----
// function fetchImages(query, page) {
//   return fetch(
//     `https://pixabay.com/api/?q=${query}&page=${page}&key=18452046-d075d28130c097165687e8e16&image_type=photo&orientation=horizontal&per_page=12`,
//   ).then(response => {
//     if (response.ok) {
//       console.log(response);
//       return response.json();
//     }

//     return Promise.reject(new Error('No response from server'));
//   });
// }

// const apiService = { fetchImages };

// export default apiService;
