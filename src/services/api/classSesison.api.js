import api from ".";

export const classSessionApi = {
    getAllClassSession: async () => {
        try {
            const response = await api.get("/class-sessions");
            return response.data;
        } catch (error) {
            console.error("Error fetching class sessions:", error);
            return [];
        }
    },

    getClassSessionById: async (id) => {
        try {
            const response = await api.get(`/class-sessions/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching class session with id ${id}:`, error);
            return null;
        }
    },

    addNewClassSession: async (classSessionData) => {
        try {
            const response = await api.post("/class-sessions", classSessionData);
            return response.data;
        } catch (error) {
            console.error("Error adding class session:", error);
            throw error;
        }
    },

    editClassSession: async (id, updatedData) => {
        try {
            const response = await api.patch(`/class-sessions/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error(`Error updating class session with id ${id}:`, error);
            throw error;
        }
    },

    deleteClassSession: async (id) => {
        try {
            const response = await api.delete(`/class-sessions/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting class session with id ${id}:`, error);
            throw error;
        }
    },

}
