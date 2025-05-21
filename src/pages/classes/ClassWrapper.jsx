import { useParams, Outlet } from 'react-router-dom';
import { ClassDataProvider } from '@/providers/ClassDataProvider';

export default function ClassWrapper() {
  const { classdetailId } = useParams();

  return (
    // <ClassDataProvider classId={classdetailId}>
    <ClassDataProvider>
      <Outlet />
    </ClassDataProvider>
  );
}
