

export default function BillItem({ bill }) {
    return (
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
    )
}