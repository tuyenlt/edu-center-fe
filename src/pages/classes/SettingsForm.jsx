import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { useLayoutContext } from '@/providers/LayoutProvider';
import { useEffect } from 'react';
// export default function SettingsForm({ onClose }) {
//   const { setIsRootLayoutHidden } = useLayoutContext();

//   // Ẩn RootLayout khi SettingsForm được mount
//   useEffect(() => {
//     setIsRootLayoutHidden(true);
//     return () => setIsRootLayoutHidden(false); // Hiện lại khi unmount
//   }, []);
//   return (
//     <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
//       <ArrowLeft onClick={onClose} />
//       {/* Phần 1: Thông tin chi tiết */}
//       <Card>
//         <CardContent className="space-y-4 p-6">
//           <h2 className="text-xl font-semibold">
//             Thông tin chi tiết về lớp học
//           </h2>

//           <div className="space-y-1">
//             <Label>Tên lớp học (bắt buộc)</Label>
//             <Input value="DCMDTD" disabled />
//           </div>

//           <div className="space-y-1">
//             <Label>Mô tả lớp học</Label>
//             <Input value="" disabled />
//           </div>

//           <div className="space-y-1">
//             <Label>Phần</Label>
//             <Input value="Section2" disabled />
//           </div>

//           <div className="space-y-1">
//             <Label>Phòng</Label>
//             <Input value="101 A2" disabled />
//           </div>

//           <div className="space-y-1">
//             <Label>Chủ đề</Label>
//             <Input value="Xây dựng trang web dăm bơ mẹ DTD" disabled />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Phần 2: Chung */}
//       <Card>
//         <CardContent className="space-y-4 p-6">
//           <h2 className="text-xl font-semibold">Chung</h2>

//           <div className="space-y-1">
//             <Label>Mã mời</Label>
//             <Input value="Đã hết" disabled />
//             <p className="text-sm text-muted-foreground">Quản lý mã mời</p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

export default function SettingsForm({ onClose }) {
  const { setIsRootLayoutHidden } = useLayoutContext();

  useEffect(() => {
    setIsRootLayoutHidden(true);
    return () => setIsRootLayoutHidden(false);
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
      <ArrowLeft onClick={onClose} />
      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-semibold">
            Thông tin chi tiết về lớp học
          </h2>

          <div className="space-y-1">
            <Label>Tên lớp học (bắt buộc)</Label>
            <Input value="DCMDTD" disabled />
          </div>

          <div className="space-y-1">
            <Label>Mô tả lớp học</Label>
            <Input value="" disabled />
          </div>

          <div className="space-y-1">
            <Label>Phần</Label>
            <Input value="Section2" disabled />
          </div>

          <div className="space-y-1">
            <Label>Phòng</Label>
            <Input value="101 A2" disabled />
          </div>

          <div className="space-y-1">
            <Label>Chủ đề</Label>
            <Input value="Xây dựng trang web dăm bơ mẹ DTD" disabled />
          </div>
        </CardContent>
      </Card>

      {/* Phần 2: Chung */}
      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-semibold">Chung</h2>

          <div className="space-y-1">
            <Label>Mã mời</Label>
            <Input value="Đã hết" disabled />
            <p className="text-sm text-muted-foreground">Quản lý mã mời</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
