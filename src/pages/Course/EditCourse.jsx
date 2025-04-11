import { useForm, useFieldArray } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { editCourse } from "@/services/api/courses.api"

export default function EditCourse() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const course = state?.course

    const form = useForm({
        defaultValues: {
            name: course?.name || "",
            goal: course?.goal || "",
            course_level: course?.course_level || "",
            price: course?.price || 0,
            sessions_details: course?.sessions_details || [{ title: "", description: "", type: "" }],
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "sessions_details"
    })

    const [tags, setTags] = useState(course?.tags || [])
    const [tagInput, setTagInput] = useState("")

    const onSubmit = async (data) => {
        const updatedCourse = { ...data, tags }
        console.log("Updated course:", updatedCourse)
        try {
            await editCourse(course._id, updatedCourse)
        } catch (error) {
            console.log(error)
        }
        navigate(-1)
    }

    const handleAddTag = () => {
        if (tagInput && !tags.includes(tagInput)) {
            setTags([...tags, tagInput])
            setTagInput("")
        }
    }

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove))
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">Edit Course</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="name"
                        rules={{ required: "Course name is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="goal"
                        rules={{ required: "Goal is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Goal</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="course_level"
                        rules={{ required: "Level is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Level</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select level" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                                        <SelectItem value="Advanced">Advanced</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="price"
                        rules={{ required: "Price is required", min: 0 }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price ($)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div>
                        <Label className="mb-2">Tags</Label>
                        <div className="flex gap-2 mb-2 items-center">
                            <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} />
                            <Button type="button" variant="outline" className="h-10" onClick={handleAddTag}>Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, idx) => (
                                <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-muted">
                                    <span className="text-sm text-muted-foreground">{tag}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(tag)}
                                        className="ml-1 text-sm"
                                    >
                                        x
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">Sessions Details</h2>
                        {fields.map((item, index) => (
                            <div key={item.id} className="space-y-3 border p-4 mb-4 rounded-md">
                                <FormField
                                    control={form.control}
                                    name={`sessions_details.${index}.title`}
                                    rules={{ required: "Title is required" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`sessions_details.${index}.description`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`sessions_details.${index}.type`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Type</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="button" variant="destructive" onClick={() => remove(index)}>Remove Session</Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={() => append({ title: "", description: "", type: "" })}>
                            Add Session
                        </Button>
                    </div>

                    <Button type="submit" className="w-full">Update Course</Button>
                </form>
            </Form>
        </div>
    )
}
