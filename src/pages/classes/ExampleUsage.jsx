import { useState } from 'react';
import SessionScheduleDialog from './SessionSchedule';

export default function ExampleUsage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const session = {
    title: 'Buổi học đầu tiên',
    description: 'Giới thiệu môn học',
    type: 'lecture',
    start_time: '2025-05-25T08:00:00.000Z',
    end_time: '2025-05-25T10:00:00.000Z',
    room: 'A201',
  };

  const handleConfirm = (updatedSession) => {
    console.log('Dữ liệu đã chọn:', updatedSession);
    // TODO: cập nhật lại danh sách buổi học
  };

  return (
    <>
      <button onClick={() => setIsDialogOpen(true)}>Mở dialog</button>

      <SessionScheduleDialog
        session={session}
        index={1}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onConfirm={handleConfirm}
      />
    </>
  );
}
