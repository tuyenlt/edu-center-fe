import LoadingSpinner from "@/components/shared/LoadingSpinner";
import api from "@/services/api";
import { useEffect, useState } from "react"



export default function UserPayment({ user }) {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        api.get(`/users/${user._id}/bills`)
            .then((response) => {
                setBills(response.data);
                console.log("Bills fetched:", response.data);
            }).catch((error) => {
                console.error("Error fetching bills:", error);
            }).finally(() => {
                setLoading(false);
            })
    }, [user])

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <LoadingSpinner />
                </div>
            ) : bills.length > 0 ?
                bills.map((bill) => (
                    <div
                        key={bill._id}
                        className="flex justify-between items-center border-b border-gray-200 py-4 px-2"
                    >
                        {bill.type === "tuition" ? (
                            <div className="">
                                <span className="font-semibold">{bill.course.name}</span>
                            </div>
                        ) : bill.type === "salary" && (
                            <div className="flex flex-col">
                                <span className="font-semibold">{bill.session.class_id.class_name}</span>
                                <span className="text-gray-500">{new Date(bill.session.start_time).toLocaleDateString()}</span>
                            </div>
                        )}
                        <div className="col-span-2 capitalize">{bill.type}</div>
                        <div className={`col-span-2 ${bill.type === "tuition" ? "text-green-500" : "text-red-500"}`}>{bill.amount.toLocaleString()}₫</div>
                        <div className="col-span-2 capitalize">{bill.payment_method}</div>
                        <div className="col-span-2 capitalize">{bill.status}</div>
                    </div>
                )

                ) : (
                    <div className="text-center text-gray-500 py-10">
                        No payment records found.
                    </div>
                )
            }
        </div>
    )
}