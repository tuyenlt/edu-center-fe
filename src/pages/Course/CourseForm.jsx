import React, { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { addNewCourse, editCourse } from '@/services/api/courses.api'

export default function CourseForm({
	course = null,
	onSuccess = () => { },
	mode: forcedMode = null,
}) {
	const navigate = useNavigate()
	const isEdit = forcedMode
		? forcedMode === 'edit'
		: Boolean(course && course._id)

	// khởi tạo defaultValues, lấy từ course nếu edit, hoặc giá trị rỗng nếu add
	const defaultValues = {
		name: '',
		goal: '',
		course_level: '',
		img_url: '',
		price: 0,
		course_programs: [
			{ title: '', description: '', lessons: [{ title: '', description: '', type: '' }] },
		],
		...course, // nếu course có, sẽ override các trường trên
	}

	const form = useForm({ defaultValues })
	const { control, handleSubmit, reset } = form

	// fieldArray cho chương (course_programs)
	const {
		fields: chapters,
		append: appendChapter,
		remove: removeChapter,
	} = useFieldArray({
		control,
		name: 'course_programs',
	})

	// tags riêng
	const [tags, setTags] = useState(defaultValues.tags || [])
	const [tagInput, setTagInput] = useState('')

	// nếu prop course thay đổi (ví dụ user back vào edit khác), reset form+tags
	useEffect(() => {
		reset(defaultValues)
		setTags(defaultValues.tags || [])
	}, [course])

	const onSubmit = async data => {
		const payload = { ...data, tags }
		try {
			if (isEdit) {
				await editCourse(course._id, payload)
			} else {
				await addNewCourse(payload)
			}
			onSuccess(payload)
		} catch (err) {
			console.error(err)
		}
	}

	const handleAddTag = () => {
		const t = tagInput.trim()
		if (t && !tags.includes(t)) {
			setTags([...tags, t])
			setTagInput('')
		}
	}
	const handleRemoveTag = t => setTags(tags.filter(x => x !== t))

	return (
		<div className="max-w-3xl mx-auto p-6">
			<h1 className="text-2xl font-semibold mb-6">
				{isEdit ? 'Edit Course' : 'Add New Course'}
			</h1>
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					{/* Name */}
					<FormField
						control={control}
						name="name"
						rules={{ required: 'Name is required' }}
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

					{/* Goal */}
					<FormField
						control={control}
						name="goal"
						rules={{ required: 'Goal is required' }}
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

					{/* Level */}
					<FormField
						control={control}
						name="course_level"
						rules={{ required: 'Level is required' }}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Level</FormLabel>
								<Select value={field.value} onValueChange={field.onChange}>
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

					{/* Image URL */}
					<FormField
						control={control}
						name="img_url"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Image URL</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Price */}
					<FormField
						control={control}
						name="price"
						rules={{
							required: 'Price is required',
							min: { value: 0, message: 'Price must be ≥ 0' },
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price (VND)</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Tags */}
					<div>
						<Label className="mb-2">Tags</Label>
						<div className="flex gap-2 mb-2 items-center">
							<Input
								placeholder="New tag"
								value={tagInput}
								onChange={e => setTagInput(e.target.value)}
							/>
							<Button type="button" variant="outline" onClick={handleAddTag}>
								Add
							</Button>
						</div>
						<div className="flex flex-wrap gap-2">
							{tags.map((t, i) => (
								<div
									key={i}
									className="flex items-center gap-1 px-2 py-1 bg-muted rounded"
								>
									<span className="text-sm text-muted-foreground">{t}</span>
									<button
										type="button"
										onClick={() => handleRemoveTag(t)}
										className="ml-1 text-sm"
									>
										×
									</button>
								</div>
							))}
						</div>
					</div>

					{/* Chapters & Lessons */}
					<div>
						<h2 className="text-lg font-semibold mb-4">Chapters</h2>
						{chapters.map((chap, chapIndex) => (
							<ChapterFields
								key={chap.id}
								nestIndex={chapIndex}
								control={control}
								removeChapter={() => removeChapter(chapIndex)}
							/>
						))}

						<Button
							type="button"
							variant="outline"
							onClick={() =>
								appendChapter({
									title: '',
									description: '',
									lessons: [{ title: '', description: '', type: '' }],
								})
							}
						>
							+ Add Chapter
						</Button>
					</div>

					<Button type="submit" className="w-full">
						{isEdit ? 'Update Course' : 'Submit Course'}
					</Button>
				</form>
			</Form>
		</div>
	)
}

// Nested component for one chapter with its lessons
function ChapterFields({ nestIndex, control, removeChapter }) {
	const { fields: lessons, append, remove } = useFieldArray({
		control,
		name: `course_programs.${nestIndex}.lessons`,
	})

	return (
		<div className="border p-4 mb-6 rounded space-y-4">
			<div className="flex justify-between items-center">
				<h3 className="font-semibold">Chapter {nestIndex + 1}</h3>
				<Button type="button" variant="destructive" size="sm" onClick={removeChapter}>
					Remove Chapter
				</Button>
			</div>

			{/* Chapter Title */}
			<FormField
				control={control}
				name={`course_programs.${nestIndex}.title`}
				rules={{ required: 'Title is required' }}
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

			{/* Chapter Description */}
			<FormField
				control={control}
				name={`course_programs.${nestIndex}.description`}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Description</FormLabel>
						<FormControl>
							<Textarea {...field} />
						</FormControl>
					</FormItem>
				)}
			/>

			{/* Lessons */}
			<div className="space-y-4">
				<h4 className="font-medium">Lessons</h4>
				{lessons.map((lesson, lessonIndex) => (
					<div key={lesson.id} className="border p-3 rounded space-y-2">
						<div className="flex justify-between items-center">
							<span>Lesson {lessonIndex + 1}</span>
							<Button
								type="button"
								variant="destructive"
								size="sm"
								onClick={() => remove(lessonIndex)}
							>
								Remove
							</Button>
						</div>

						{/* Lesson Title */}
						<FormField
							control={control}
							name={`course_programs.${nestIndex}.lessons.${lessonIndex}.title`}
							rules={{ required: 'Title is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Lesson Title</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Lesson Description */}
						<FormField
							control={control}
							name={`course_programs.${nestIndex}.lessons.${lessonIndex}.description`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Lesson Description</FormLabel>
									<FormControl>
										<Textarea {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						{/* Lesson Type */}
						<FormField
							control={control}
							name={`course_programs.${nestIndex}.lessons.${lessonIndex}.type`}
							rules={{ required: 'Type is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Lesson Type</FormLabel>
									<FormControl>
										<Input {...field} placeholder="e.g. listening, reading…" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				))}

				<Button type="button" variant="outline" onClick={() => append({ title: '', description: '', type: '' })}>
					+ Add Lesson
				</Button>
			</div>
		</div>
	)
}
