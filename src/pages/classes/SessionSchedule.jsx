import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, Pencil } from 'lucide-react';

export default function SessionScheduleDialog({
  session,
  index,
  setCustomLessonIndex,
  onConfirm,
  maxIndex,
}) {
  const [date, setDate] = useState(new Date());
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');
  const [room, setRoom] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!session) return;

    const start = new Date(session.start_time);
    const end = new Date(session.end_time);

    setDate(session.start_time ? start : new Date());
    setStartHour(session.start_time ? formatHour(start.getHours()) : '');
    setEndHour(session.end_time ? formatHour(end.getHours()) : '');
    setRoom(session.room?.toString() || '');
  }, [session]);

  const formatHour = (h) => h.toString().padStart(2, '0') + ':00';

  const hours = useMemo(
    () => Array.from({ length: 17 }, (_, i) => formatHour(i + 7)),
    []
  );

  const filteredEndHours = useMemo(() => {
    if (!startHour) return hours;
    return hours.filter((h) => h > startHour);
  }, [startHour, hours]);

  useEffect(() => {
    if (endHour && startHour && endHour <= startHour) {
      setEndHour('');
    }
  }, [startHour, endHour]);

  const handlePrevSession = () => {
    if (index > 0) setCustomLessonIndex(index - 1);
  };

  const handleNextSession = () => {
    if (index < maxIndex - 1) setCustomLessonIndex(index + 1);
  };
  const handleDialog = () => {
    setOpen(false);
    setCustomLessonIndex(undefined);
  };
  const handleConfirm = () => {
    if (!date || !startHour || !endHour || room.trim() === '') {
      alert('Please fill all information');
      return;
    }

    const startH = +startHour.split(':')[0];
    const endH = +endHour.split(':')[0];
    if (startH >= endH) return;

    const startDate = new Date(date);
    const endDate = new Date(date);
    startDate.setHours(startH, 0, 0, 0);
    endDate.setHours(endH, 0, 0, 0);

    onConfirm?.({
      title: session.title,
      description: session.description,
      type: session.type,
      start_time: startDate.toISOString(),
      end_time: endDate.toISOString(),
      room,
    });

    toast(`Scheduled: ${startDate.toLocaleString()}`);
  };

  return (
    <Dialog onOpenChange={handleDialog}>
      <DialogTrigger>
        <Pencil className="w-5 h-5" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="grid items-center gap-5 grid-cols-6 w-3/4">
            <div className="col-span-5">
              Session {index + 1}: {session?.title}
            </div>
            <div className="col-span-1 flex text-gray-500 space-x-2">
              <ChevronLeft
                className="cursor-pointer hover:text-black"
                onClick={handlePrevSession}
              />
              <ChevronRight
                className="cursor-pointer hover:text-black"
                onClick={handleNextSession}
              />
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          {/* Date */}
          <div className="flex flex-col items-start">
            <label className="text-sm mb-1">Date</label>
            <Input
              type="date"
              value={date.toISOString().split('T')[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
            />
          </div>

          {/* Start + End Time */}
          <div className="flex gap-4">
            <div className="flex flex-col items-start">
              <label className="text-sm mb-1">Start Time</label>
              <Select onValueChange={setStartHour} value={startHour}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Start" />
                </SelectTrigger>
                <SelectContent>
                  {hours.map((h) => (
                    <SelectItem key={h} value={h}>
                      {h}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col items-start">
              <label className="text-sm mb-1">End Time</label>
              <Select onValueChange={setEndHour} value={endHour}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="End" />
                </SelectTrigger>
                <SelectContent>
                  {filteredEndHours.map((h) => (
                    <SelectItem key={h} value={h}>
                      {h}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Room */}
          <div className="flex flex-col items-start">
            <label className="text-sm mb-1">Room</label>
            <Input
              placeholder="Enter a room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>

          <Button onClick={handleConfirm}>Confirm</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
