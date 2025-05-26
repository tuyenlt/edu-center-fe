import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { toast } from 'sonner';

export default function PaymentManage() {
    const [bills, setBills] = useState([]);
    const [selected, setSelected] = useState(new Set());
    const [bulkOpen, setBulkOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [transactionId, setTransactionId] = useState('');
    const [bankName, setBankName] = useState('');

    // pagination + filters
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [page, setPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        fetchBills();
    }, []);

    const fetchBills = async () => {
        try {
            const { data } = await api.get('/bills/list');
            setBills(data);
            setSelected(new Set());
            setPage(1);
        } catch (err) {
            toast.error('Failed to load bills');
        }
    };

    // derive type options from bills
    const types = Array.from(new Set(bills.map(b => b.type)));

    // filtered by search, status, type
    const filteredBills = bills.filter(b => {
        const term = searchTerm.toLowerCase();
        const matchesText =
            b.user.name.toLowerCase().includes(term) ||
            b.user.email.toLowerCase().includes(term);
        const matchesStatus =
            statusFilter === 'all' || b.status === statusFilter;
        const matchesType =
            typeFilter === 'all' || b.type === typeFilter;
        return matchesText && matchesStatus && matchesType;
    });

    const totalPages = Math.max(1, Math.ceil(filteredBills.length / pageSize));
    const startIdx = (page - 1) * pageSize;
    const currentBills = filteredBills.slice(startIdx, startIdx + pageSize);

    // reset page when filters/search change
    useEffect(() => {
        setPage(1);
    }, [searchTerm, statusFilter, typeFilter]);

    // toggle single bill
    const toggle = id => {
        const s = new Set(selected);
        if (s.has(id)) s.delete(id);
        else s.add(id);
        setSelected(s);
    };
    const unpaidIds = bills.filter(b => b.status === 'unpaid').map(b => b._id);
    const allSelected = unpaidIds.length > 0 && unpaidIds.every(id => selected.has(id));

    // toggle all unpaid
    const toggleAll = () => {
        if (allSelected) setSelected(new Set());
        else setSelected(new Set(unpaidIds));
    };

    // bulk pay
    const handleBulkPay = async () => {
        try {
            await api.patch('/bills/pay', {
                ids: Array.from(selected),
                payment_method: paymentMethod,
                payment_details: {
                    transactionId: paymentMethod === 'banking' ? transactionId : undefined,
                    bankName: paymentMethod === 'banking' ? bankName : undefined,
                },
            });
            toast.success('Payment successful');
            setBulkOpen(false);
            fetchBills();
        } catch {
            toast.error('Payment failed');
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Payment Management</h1>

            {/* Filters + Bulk Pay */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <Input
                    placeholder="Search by user or email..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="col-span-1"
                />
                <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                    className="col-span-1"
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                </Select>
                <Select
                    value={typeFilter}
                    onValueChange={setTypeFilter}
                    className="col-span-1"
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {types.map(t => (
                            <SelectItem key={t} value={t}>
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Dialog open={bulkOpen} onOpenChange={setBulkOpen}>
                    <DialogTrigger asChild>
                        <Button
                            disabled={selected.size === 0}
                            className="col-span-1"
                        >
                            Pay Selected ({selected.size})
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm Bulk Payment</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-2">
                            <RadioGroup
                                value={paymentMethod}
                                onValueChange={setPaymentMethod}
                                className="flex gap-4"
                            >
                                <label>Totals Amount { }</label>
                                <label className="flex items-center space-x-2">
                                    <RadioGroupItem value="cash" />
                                    <span>Cash</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <RadioGroupItem value="banking" />
                                    <span>Banking</span>
                                </label>
                            </RadioGroup>

                            {paymentMethod === 'banking' && (
                                <>
                                    <Input
                                        placeholder="Transaction ID"
                                        value={transactionId}
                                        onChange={e => setTransactionId(e.target.value)}
                                    />
                                    <Input
                                        placeholder="Bank Name"
                                        value={bankName}
                                        onChange={e => setBankName(e.target.value)}
                                    />
                                </>
                            )}
                        </div>
                        <DialogFooter>
                            <Button onClick={handleBulkPay}>Confirm Payment</Button>
                            <Button variant="secondary" onClick={() => setBulkOpen(false)}>
                                Cancel
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardContent className="space-y-2">
                    {/* Table header */}
                    <div className="grid grid-cols-12 gap-2 border-b pb-2 font-semibold">
                        <div className="col-span-1">
                            <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
                        </div>
                        <div className="col-span-3">User</div>
                        <div className="col-span-2">Amount</div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-2">Method</div>
                        <div className="col-span-2">Status</div>
                    </div>

                    {/* Rows */}
                    {currentBills.length > 0 ? (
                        currentBills.map(bill => (
                            <div
                                key={bill._id}
                                className={`grid grid-cols-12 gap-2 items-center py-2 border-b hover:bg-gray-50 ${bill.status === 'paid' ? 'opacity-60' : ''
                                    }`}
                            >
                                <div className="col-span-1">
                                    <Checkbox
                                        disabled={bill.status === 'paid'}
                                        checked={selected.has(bill._id)}
                                        onCheckedChange={() => toggle(bill._id)}
                                    />
                                </div>
                                <div className="col-span-3">
                                    <div className="">{bill.user.name}</div>
                                    <div className="text-gray-500">{bill.user.email}</div>
                                </div>
                                <div className={`col-span-2 ${bill.type === "tuition" ? "text-green-500" : "text-red-500"}`}>{bill.amount.toLocaleString()}₫</div>
                                <div className="col-span-2 capitalize">{bill.type}</div>
                                <div className="col-span-2 capitalize">{bill.payment_method}</div>
                                <div className="col-span-2 capitalize">{bill.status}</div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center py-4">No bills found.</p>
                    )}

                    {/* Pagination */}
                    <div className="flex items-center justify-center space-x-4 py-4">
                        <Button
                            size="sm"
                            disabled={page <= 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                        >
                            Previous
                        </Button>
                        <span>
                            Page {page} of {totalPages}
                        </span>
                        <Button
                            size="sm"
                            disabled={page >= totalPages}
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        >
                            Next
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
