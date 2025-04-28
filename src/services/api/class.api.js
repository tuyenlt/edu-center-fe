import api from ".";

export const classApi = {
    getAllClass: async () => {
        try {
            const response = await api.get("/classes");
            return response.data;
        } catch (error) {
            console.error("Error fetching classes:", error);
            return [];
        }
    },

    getClassById: async (id) => {
        try {
            const response = await api.get(`/classes/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching class with id ${id}:`, error);
            return null;
        }
    },

    addNewClass: async (classData) => {
        try {
            const response = await api.post("/classes", classData);
            return response.data;
        } catch (error) {
            console.error("Error adding class:", error);
            throw error;
        }
    },

    editClass: async (id, updatedData) => {
        try {
            const response = await api.patch(`/classes/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error(`Error updating class with id ${id}:`, error);
            throw error;
        }
    },

    deleteClass: async (id) => {
        try {
            const response = await api.delete(`/classes/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting class with id ${id}:`, error);
            throw error;
        }
    },

    addSession: async (classId, sessionData) => {
        try {
            const response = await api.post(`/classes/${classId}/add-session`, sessionData);
            return response.data;
        } catch (error) {
            console.error(`Error adding session to class with id ${classId}:`, error);
            throw error;
        }
    }
}