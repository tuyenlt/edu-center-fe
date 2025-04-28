import ClassExerciseCard from './ClassExerciseCard';

export default function ClassAssignmentSummary() {
  return (
    <div className="grid grid-flow-row col-start-4 row-span-full">
      <h2 className="text-neutral-700 text-2xl">My Assignment</h2>
      <ClassExerciseCard></ClassExerciseCard>
      <ClassExerciseCard></ClassExerciseCard>
      <ClassExerciseCard></ClassExerciseCard>
    </div>
  );
}
