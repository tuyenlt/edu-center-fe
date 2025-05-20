import { toast } from "sonner";
import CourseForm from "./CourseForm";



export default function AddCourse() {
    const onSuccess = (data) => {
        toast("Create Course Success");
        console.log(data)
    }

    return (
        <CourseForm
            onSuccess={onSuccess}
        />
    )
}
