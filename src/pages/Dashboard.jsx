import api from "@/services/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {

    const [res, setRes] = useState();

    const test = async () => {
        try {
            const response = await api.get("/mail-test");
            setRes(response.data);
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>This is dashboard
            <div className="">
                {res ? res : "null"}
            </div>
            <Button onClick={test}>Send</Button>
        </div>

    );
}