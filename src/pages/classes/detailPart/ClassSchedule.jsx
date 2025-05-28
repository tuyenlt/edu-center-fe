import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ScheduleCalendar from '@/components/shared/ScheduleCalendar';
import { TabsContent } from '@/components/ui/tabs';
import api from '@/services/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ClassSchedule() {
  const { classId } = useParams();
  const [classData, setClassData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/classes/${classId}`, {
        params: {
          populate_fields: ['class_sessions'],
        },
      })
      .then((response) => {
        setClassData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching class data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [classId]);

  return isLoading ? (
    <div className="flex items-center justify-center h-50">
      <LoadingSpinner />
    </div>
  ) : (
    <ScheduleCalendar scheduleData={classData.class_sessions} />
  );
}
