import { students } from '../data';
import { headers } from '../data';
import { TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
export default function Grade({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return <div>Loading...</div>; // Hoặc anh thêm skeleton/loading spinner cũng được
  }

  return (
    <TabsContent value="grade" className="mx-auto mt-[57px]">
      <div className="w-full overflow-auto min-h-screen bg-white">
        <Table className="w-full table-fixed border-collapse text-sm">
          <TableHeader>
            <TableRow>
              {/* Cột đầu tiên: Học sinh */}
              <TableHead className="border-t-0 border-l-0  text-left text-xs text-gray-500 w-48">
                Sort by first name
              </TableHead>

              {/* Các cột điểm */}
              {headers.map((h, idx) => (
                <TableHead
                  key={idx}
                  className={cn(
                    'text-left align-top border border-gray-300 px-2 py-1',
                    idx === 0 && 'border-l-0',
                    idx === headers.length - 1 && 'border-r-0',
                    'border-t-0'
                  )}
                >
                  <div className="text-xs text-gray-500">{h.date}</div>
                  <div className="text-purple-700 font-medium">{h.title}</div>
                  <div className="text-gray-400 text-xs">{h.type}</div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {students.map((student, i) => (
              <TableRow key={i}>
                {/* Cột tên học sinh */}
                <TableCell
                  className={cn(
                    'border border-gray-300 text-sm font-medium py-2',
                    'border-l-0',
                    i === students.length - 1 && 'border-b-0'
                  )}
                >
                  {student.name}
                </TableCell>

                {/* Các điểm */}
                {student.scores.map((score, j) => (
                  <TableCell
                    key={j}
                    className={cn(
                      'border border-gray-300 text-sm py-2 px-2',
                      j === 0 && 'border-l-0',
                      j === headers.length - 1 && 'border-r-0',
                      i === students.length - 1 && 'border-b-0',
                      score === 'Missing' ? 'text-red-500' : 'text-gray-800'
                    )}
                  >
                    {score ?? '—'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TabsContent>
  );
}
