import api from '@/services/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Payment() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const { data } = await api.get('/bills/list');
      const unpaid = data.filter((b) => b.status === 'unpaid');
      setBills(unpaid);
    } catch (err) {
      console.error('Failed to fetch bills', err);
      toast.error('Failed to load bills');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md overflow-auto h-[396px]">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-lg">Unpaid Payments</h2>
        <Link
          to="/payment-manage"
          className="text-blue-700 text-sm font-medium"
        >
          See all
        </Link>
      </div>
      <div className="space-y-4">
        {bills.length === 0 ? (
          <p className="text-center py-4">No unpaid bills found.</p>
        ) : (
          <>
            {/* Hàng tiêu đề */}
            <div className="grid grid-cols-13 gap-4 items-center py-2 border-b font-semibold text-gray-700 bg-gray-100 rounded-md">
              <div className="col-span-1"></div>
              <div className="col-span-4">User</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-3">Amount</div>
              <div className="col-span-3">Method</div>
            </div>

            {/* Danh sách bills */}
            {bills.map((bill) => (
              <div
                key={bill._id}
                className="grid grid-cols-13 gap-4 items-center py-3 border-b hover:bg-gray-50 transition"
              >
                <div className="col-span-1"></div>

                <div className="col-span-4">
                  <div className="font-medium">{bill.user.name}</div>
                  <div className="text-sm text-gray-500 break-all">
                    {bill.user.email}
                  </div>
                </div>
                <div className="col-span-2 capitalize text-gray-700">
                  {bill.type}
                </div>
                <div className="col-span-3 text-red-500 font-semibold">
                  {bill.amount.toLocaleString()}₫
                </div>
                <div className="col-span-3 capitalize text-gray-600">
                  {bill.payment_method}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
