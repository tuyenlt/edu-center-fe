import React, { useState, useMemo } from 'react';
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  parseISO,
  addWeeks,
  subWeeks,
  set,
} from 'date-fns';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ScheduleCalendar({
  scheduleData = [],
  onSelectDate = () => {},
  prevScheduleData = [],
}) {
  // ------------------------------------------------------------------------
  // 1) State và constant
  // ------------------------------------------------------------------------
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [expandedDay, setExpandedDay] = useState(null);

  // Merge data: nếu có prevScheduleData thì đánh dấu thêm thuộc tính `prev: true`
  const allData = useMemo(
    () => [
      ...scheduleData.filter((i) => i.start_time),
      ...prevScheduleData.map((i) => ({ ...i, prev: true })),
    ],
    [scheduleData, prevScheduleData]
  );

  // Mảng giờ từ 7 → 22  (tổng cộng 16 giờ)
  const hours = useMemo(() => Array.from({ length: 16 }, (_, i) => i + 7), []);

  // Chiều cao mỗi slot 1 giờ (giống code gốc: dur * 48px)
  const HOUR_SLOT_HEIGHT = 48;

  // ------------------------------------------------------------------------
  // 2) Tính toán các nhóm sự kiện (merging) cho mỗi ngày trong tuần, lưu cả chi tiết buổi
  // ------------------------------------------------------------------------
  const groupedEventsByDay = useMemo(() => {
    const result = {};
    const startDateOfWeek = startOfWeek(currentWeek, { weekStartsOn: 1 }); // tuần bắt đầu Monday

    for (let d = 0; d < 7; d++) {
      const day = addDays(startDateOfWeek, d);
      const dayKey = format(day, 'yyyy-MM-dd');

      // Lọc ra tất cả event trong ngày đó
      const eventsOfDay = allData.filter((item) =>
        isSameDay(parseISO(item.start_time), day)
      );

      // Chuyển thành mảng interval { start: Date, end: Date, prev: boolean?, _original: ev }
      const intervals = eventsOfDay.map((ev) => {
        const start = parseISO(ev.start_time);
        const end = parseISO(ev.end_time);
        return {
          start,
          end,
          prev: ev.prev || false,
          _original: ev,
        };
      });

      // Sort theo thời gian bắt đầu
      intervals.sort((a, b) => a.start - b.start);

      // Merge overlapping intervals, đồng thời giữ danh sách chi tiết trong `events`
      const groups = [];
      intervals.forEach((interval) => {
        if (groups.length === 0) {
          groups.push({
            start: interval.start,
            end: interval.end,
            events: [interval._original],
            anyPrev: interval.prev || false,
          });
        } else {
          const lastGroup = groups[groups.length - 1];
          // Nếu event mới bắt đầu trước (<=) end của nhóm cuối → gộp
          if (interval.start <= lastGroup.end) {
            // cập nhật end = max(end cũ, end mới)
            lastGroup.end = new Date(
              Math.max(lastGroup.end.getTime(), interval.end.getTime())
            );
            // Thêm event gốc vào mảng events
            lastGroup.events.push(interval._original);
            if (interval.prev) lastGroup.anyPrev = true;
          } else {
            // Tạo nhóm mới
            groups.push({
              start: interval.start,
              end: interval.end,
              events: [interval._original],
              anyPrev: interval.prev || false,
            });
          }
        }
      });

      result[dayKey] = groups;
    }

    return result; // Ví dụ: { "2025-06-02": [ { start, end, events: [ev1,ev2], anyPrev }, … ], … }
  }, [allData, currentWeek]);

  // ------------------------------------------------------------------------
  // 3) Header: Tháng và nút Prev/Next tuần
  // ------------------------------------------------------------------------
  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={() => setCurrentWeek((prev) => subWeeks(prev, 1))}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-bold">
          {format(currentWeek, 'MMMM yyyy')}
        </h2>
        <Button
          variant="ghost"
          onClick={() => setCurrentWeek((prev) => addWeeks(prev, 1))}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );

  // ------------------------------------------------------------------------
  // 4) Render tên các ngày (Mon, Tue, …) phía trên
  // ------------------------------------------------------------------------
  const renderDays = () => {
    const startDate = startOfWeek(currentWeek, { weekStartsOn: 1 });
    const days = [
      <div key="time" className="text-center font-medium text-gray-600">
        Time
      </div>,
    ];

    for (let i = 0; i < 7; i++) {
      const day = addDays(startDate, i);
      const isToday = isSameDay(day, new Date());
      days.push(
        <div
          key={i}
          className={`text-center font-medium px-2 py-1 cursor-pointer ${
            isToday
              ? 'bg-blue-200 text-blue-800 font-bold'
              : 'text-gray-600 hover:bg-blue-50'
          }`}
          onClick={() => setExpandedDay(day)}
        >
          {format(day, 'EEE d')}
        </div>
      );
    }

    return (
      <div
        className="grid grid-cols-8 "
        // style={{ width: `calc(100% - 15.26px)` }}
      >
        {days}
      </div>
    );
  };

  // ------------------------------------------------------------------------
  // 5) Render lưới giờ + ngày, kèm overlay các khối merged có chi tiết từng buổi
  // ------------------------------------------------------------------------
  const renderWeekCells = () => {
    const startDate = startOfWeek(currentWeek, { weekStartsOn: 1 });

    return (
      <div className="flex flex-col">
        {hours.map((hour, hIdx) => (
          <div key={hIdx} className="grid grid-cols-8 border border-t-0">
            {/* Cột đầu (thời gian) */}
            <div className="p-2 text-sm text-right pr-4 border-r bg-gray-50 font-medium flex items-center justify-center">
              {hour}:00
            </div>

            {/* Các cột tương ứng 7 ngày */}
            {Array.from({ length: 7 }).map((_, dIdx) => {
              const day = addDays(startDate, dIdx);
              const dayKey = format(day, 'yyyy-MM-dd');
              const groups = groupedEventsByDay[dayKey] || [];

              // 1) Tìm group bắt đầu đúng giờ này
              const groupStartAtThisHour = groups.find(
                (g) => g.start.getHours() === hour
              );

              // 2) Nếu không phải giờ bắt đầu, nhưng thuộc khoảng của một group đã merge
              const isInsideExistingGroup = groups.some(
                (g) => g.start.getHours() < hour && g.end.getHours() > hour
              );

              // Lấy background và opacity nếu có thành phần `prev: true`
              const baseBg = groupStartAtThisHour
                ? groupStartAtThisHour.anyPrev
                  ? 'bg-gray-300/50'
                  : 'bg-blue-100'
                : '';

              return (
                <div
                  key={`${dIdx}-${hour}`}
                  className={`relative border-r last:border-r-0 h-12 p-0`}
                  style={{ overflow: 'visible' }}
                  onClick={() => {
                    // Khi click: lấy ra thời điểm bắt đầu của ô này (hour, phút = 0)
                    const newDate = new Date(day);
                    newDate.setHours(hour, 0, 0, 0);
                    setSelectedDate(newDate);
                    onSelectDate(newDate);
                    setExpandedDay(day);
                  }}
                >
                  {/* Nếu có group bắt đầu tại cell này → render khối block với chi tiết buổi */}
                  {groupStartAtThisHour &&
                    (() => {
                      const g = groupStartAtThisHour;
                      // Tính offset phút trong cell (nếu start không phải phút 0)
                      const minuteOffset = g.start.getMinutes();
                      const topOffsetInCell =
                        (minuteOffset / 60) * HOUR_SLOT_HEIGHT;
                      // Duration tổng của group (giờ + phút) → thành px
                      const durationHrs =
                        (g.end.getTime() - g.start.getTime()) /
                        (1000 * 60 * 60);
                      const heightPx = durationHrs * HOUR_SLOT_HEIGHT;

                      return (
                        <div
                          className={`absolute z-10 border text-[10px] leading-tight p-1 rounded shadow-sm ${baseBg} border-blue-400`}
                          style={{
                            top: topOffsetInCell,
                            height: heightPx,
                            left: 0,
                            right: 0,
                          }}
                        >
                          {/* Lặp qua từng event gốc trong nhóm */}
                          {g.events.map((ev, idx) => {
                            const s = parseISO(ev.start_time);
                            const e = parseISO(ev.end_time);
                            return (
                              <div
                                key={idx}
                                className={`mb-0.5 ${
                                  ev.prev ? 'opacity-50' : 'opacity-100'
                                }`}
                                title={`Room ${ev.room} • ${
                                  ev.title
                                } • ${format(s, 'HH:mm')}–${format(
                                  e,
                                  'HH:mm'
                                )}`}
                              >
                                <span className="text-[11px] font-medium text-blue-900 truncate block">
                                  Room {ev.room}
                                  {ev.class_name ? ` – ${ev.class_name}` : ''}
                                </span>
                                <span className="text-[11px] font-medium text-blue-800 truncate block">
                                  {ev.title}
                                </span>
                                <span className="text-[11px] font-medium text-muted-foreground">
                                  {format(s, 'HH:mm')}–{format(e, 'HH:mm')}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}

                  {/* Nếu rơi vào khung giờ nằm giữa một group đã merge (không phải start) → chỉ render ô trống để tránh show block lặp */}
                  {isInsideExistingGroup && !groupStartAtThisHour && (
                    <div className="absolute inset-0 bg-transparent" />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  // ------------------------------------------------------------------------
  // 6) Phần modal list chi tiết khi click vào ngày (expandedDay)
  // ------------------------------------------------------------------------
  const renderExpandedDayModal = () => {
    if (!expandedDay) return null;

    const dayKey = format(expandedDay, 'yyyy-MM-dd');
    const allEventsOnDay = allData.filter((item) =>
      isSameDay(parseISO(item.start_time), expandedDay)
    );

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-[rgba(0,0,0,0.5)]"
          onClick={() => setExpandedDay(null)}
        />

        <div className="relative bg-white rounded-lg shadow-lg w-[90vw] max-w-3xl max-h-[80vh] overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-lg">
              Schedules for {format(expandedDay, 'PPP')}:
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpandedDay(null)}
            >
              Close
            </Button>
          </div>
          <ul className="space-y-2">
            {allEventsOnDay.map((ev, i) => {
              const s = parseISO(ev.start_time);
              const e = parseISO(ev.end_time);
              return (
                <li key={i} className="text-sm">
                  {format(s, 'HH:mm')} - {format(e, 'HH:mm')} : Room {ev.room}{' '}
                  {ev.class_name ? `- ${ev.class_name}` : ''} - {ev.title}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  // ------------------------------------------------------------------------
  // 7) Kết hợp tất cả
  // ------------------------------------------------------------------------
  return (
    <div className="max-w-8xl mx-auto mt-10 border w-full min-w-5xl">
      <CardContent className="p-6">
        <div className="sticky top-0 bg-white z-20 py-6 shadow-sm">
          {renderHeader()}
          {renderDays()}
        </div>

        {renderWeekCells()}
        {renderExpandedDayModal()}
      </CardContent>
    </div>
  );
}
