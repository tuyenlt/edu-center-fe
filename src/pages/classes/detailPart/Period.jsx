import { chapters } from '../data';
import { TabsContent } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
export default function Period() {
  return (
    <TabsContent value="period" className="w-4/5 mx-auto mt-5 pt-20">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Các buổi học</h2>
        </div>

        {/* Accordion Chapters */}
        <Accordion type="multiple" className="w-full space-y-3">
          {chapters.map((chapter) => (
            <AccordionItem
              key={chapter.id}
              value={`item-${chapter.id}`}
              className="border rounded-lg shadow-sm bg-white"
            >
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-100 rounded-t-lg font-medium text-gray-800">
                <div className="w-full flex justify-between items-center">
                  <span>{chapter.title}</span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-4 pb-4">
                {chapter.lessons ? (
                  <Accordion type="multiple" className="space-y-2">
                    {chapter.lessons.map((lesson) => (
                      <AccordionItem
                        key={lesson.id}
                        value={`item-lesson-${lesson.id}`}
                        className="border rounded-md"
                      >
                        <AccordionTrigger className="px-3 py-2 hover:bg-gray-50 text-gray-700 font-medium">
                          <div className="w-full flex justify-between items-center">
                            <span>{lesson.title}</span>
                            <span className="text-sm text-muted-foreground">
                              {lesson.duration || ''}
                            </span>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="px-4 py-2 text-sm text-gray-600">
                          <p>Nội dung chi tiết bài học</p>
                          {lesson.hasResources && (
                            <Button variant="outline" className="mt-3">
                              Tài liệu
                            </Button>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p className="text-sm text-gray-500 px-3">
                    Không có bài học nào.
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </TabsContent>
  );
}
