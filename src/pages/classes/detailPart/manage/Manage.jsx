import { useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export default function ManageTab({ classdata }) {
    const [activeTab, setActiveTab] = useState('editInfo');

    const menu = [
        { id: 'editInfo', label: 'Edit Class Info' },
        { id: 'sessionSchedule', label: 'Session Schedule' },
        { id: 'teacherManage', label: 'Teacher Manage' },
        { id: 'studentManage', label: 'Student Manage' },
    ];

    return (
        <TabsContent value="manage" className="mx-auto mt-5 w-full pt-20 box-border">
            <div className="flex">
                {/* Sidebar */}
                <nav className="w-1/4 border-r bg-gray-50">
                    <ul>
                        {menu.map(item => (
                            <li key={item.id}>
                                <button
                                    onClick={() => setActiveTab(item.id)}
                                    className={cn(
                                        'w-full text-left px-4 py-2 hover:bg-gray-100',
                                        activeTab === item.id && 'bg-white font-semibold'
                                    )}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Content */}
                <div className="flex-1 p-4">
                    {activeTab === 'editInfo' && (
                        <div>Edit class information here.</div>
                    )}
                    {activeTab === 'sessionSchedule' && (
                        <div>Manage session schedule here.</div>
                    )}
                    {activeTab === 'teacherManage' && (
                        <div>Manage teachers here.</div>
                    )}
                    {activeTab === 'studentManage' && (
                        <div>Manage students here.</div>
                    )}
                </div>
            </div>
        </TabsContent>
    );
}
