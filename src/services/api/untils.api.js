import api from "."

export const utilApi = {
    uploadAvatar: async (file) => {
        try {
            const formData = new FormData();
            console.log(file);
            formData.append("image", file);
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }
            const response = await api.post("/upload/avatar", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true
            });

            return response.data;
        } catch (error) {
            console.error("Error uploading avatar:", error);
            throw error;
        }
    },
}