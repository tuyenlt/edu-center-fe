import { toast } from "sonner";
import CourseForm from "./CourseForm";
import { useLocation, useNavigate } from "react-router-dom";



export default function EditCourse() {
    const location = useLocation();
    const course = location.state.course;
    const navigate = useNavigate();
    const onSuccess = (data) => {
        toast("Edit Course Success");
        console.log(data)
        navigate(-1);
    }

    return (
        <CourseForm
            onSuccess={onSuccess}
            course={course}
        />
    )
}