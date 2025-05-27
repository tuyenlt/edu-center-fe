import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';

/**
 * TeacherForm: form for editing teacher info.
 * Props:
 * - teacher: object to populate initial values
 * - open: boolean to control dialog visibility
 * - onSave: fn(updatedData)
 * - onCancel: fn()
 */
export default function TeacherForm({ teacher, open, onSave, onCancel, mode = 'edit' }) {
    const initial = {
        name: teacher?.name || '',
        email: teacher?.email || '',
        dob: teacher?.personal_info?.dob
            ? format(new Date(teacher?.personal_info.dob), 'yyyy-MM-dd')
            : '',
        address: teacher?.personal_info?.address || '',
        hourly_wage: teacher?.hourly_wage || 0,
        bank_name: teacher?.payment_info?.bank_name || '',
        bank_account: teacher?.payment_info?.bank_account || '',
        account_holder: teacher?.payment_info?.account_holder_name || '',
    };

    if (mode === 'add') {
        initial.password = '';
    }

    const [form, setForm] = useState(initial);

    useEffect(() => {
        setForm(initial);
    }, [teacher]);

    const handleSave = () => {
        if (!form.name || !form.email || !form.dob) {
            toast.error('Please fill in all required fields.');
            return;
        }
        if (mode === 'add' && !form.password) {
            toast.error('Please enter a password.');
            return;
        }

        const data = {
            name: form.name,
            email: form.email,
            hourly_wage: Number(form.hourly_wage),
            personal_info: { dob: form.dob, address: form.address },
            payment_info: {
                bank_name: form.bank_name,
                bank_account: form.bank_account,
                account_holder_name: form.account_holder,
            },
        }
        if (mode === 'add') {
            data.password = form.password;
            data.role = 'teacher';
        }

        onSave(data);
    };

    return (
        <Dialog open={open} onOpenChange={val => (val ? null : onCancel())}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Teacher</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <Input
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            className="mt-1 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <Input
                            type="email"
                            value={form.email}
                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            className="mt-1 w-full"
                        />
                    </div>
                    {mode === 'add' && (
                        <div>
                            <label className="block text-sm font-medium">Password</label>
                            <Input
                                type="password"
                                value={form.password || ''}
                                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                                className="mt-1 w-full"
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium">Date of Birth</label>
                        <Input
                            type="date"
                            value={form.dob}
                            onChange={e => setForm(f => ({ ...f, dob: e.target.value }))}
                            className="mt-1 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Address</label>
                        <Input
                            value={form.address}
                            onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                            className="mt-1 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Hourly Wage</label>
                        <Input
                            type="number"
                            value={form.hourly_wage || ''}
                            onChange={e => setForm(f => ({ ...f, fixed_salary: e.target.value }))}
                            className="mt-1 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Bank Name</label>
                        <Input
                            value={form.bank_name}
                            onChange={e => setForm(f => ({ ...f, bank_name: e.target.value }))}
                            className="mt-1 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Bank Account</label>
                        <Input
                            value={form.bank_account}
                            onChange={e => setForm(f => ({ ...f, bank_account: e.target.value }))}
                            className="mt-1 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Account Holder</label>
                        <Input
                            value={form.account_holder}
                            onChange={e => setForm(f => ({ ...f, account_holder: e.target.value }))}
                            className="mt-1 w-full"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSave}>Save</Button>
                    <Button variant="secondary" onClick={onCancel} className="ml-2">
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
