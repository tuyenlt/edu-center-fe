import api from ".";

export const userApi = {
    getUserProfile: async (id) => {
        try {
            const response = await api.get(`/users/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching user with id ${id}:`, error);
            return null;
        }
    }
}