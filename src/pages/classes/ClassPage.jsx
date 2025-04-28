import ClassAssignmentSummary from './ClassAssignmentSummary';
import { ClassCard } from './ClassCard';
export default function ClassPage() {
  return (
    <div class="grid grid-cols-4 items-start gap-x-15">
      <div className=" grid grid-cols-3 col-span-3 gap-x-7 gap-y-7">
        <ClassCard></ClassCard>
        <ClassCard></ClassCard>
        <ClassCard></ClassCard>
        <ClassCard></ClassCard>
      </div>
      <div className="col-span-1">
        <ClassAssignmentSummary></ClassAssignmentSummary>
      </div>
    </div>
  );
}
