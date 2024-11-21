import api from "./axios";

const postApi = {
    getPostById: async (postId) => {
      const response = await api.get(`/${postId}`);
      return response.data;
    },
    getGenres: async (genre) => {
          const response = await api.get(`/genre/movie/list`); 
          return response.data; 
        },
  };

export default postApi;
