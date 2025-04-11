import api from "."


export const getAllCourse = async () => {
    try {
        const response = await api.get("/courses")
        return response.data
    } catch (error) {
        console.error("Error fetching courses:", error)
        return []
    }
}

export const getCourseById = async (id) => {
    try {
        const response = await api.get(`/courses/${id}`)
        return response.data
    } catch (error) {
        console.error(`Error fetching course with id ${id}:`, error)
        return null
    }
}

export const addNewCourse = async (courseData) => {
    try {
        const response = await api.post("/courses", courseData)
        return response.data
    } catch (error) {
        console.error("Error adding course:", error)
        throw error
    }
}

export const editCourse = async (id, updatedData) => {
    try {
        const response = await api.patch(`/courses/${id}`, updatedData)
        return response.data
    } catch (error) {
        console.error(`Error updating course with id ${id}:`, error)
        throw error
    }
}

export const deleteCourse = async (id) => {
    try {
        const response = await api.delete(`/courses/${id}`)
        return response.data
    } catch (error) {
        console.error(`Error deleting course with id ${id}:`, error)
        throw error
    }
}
