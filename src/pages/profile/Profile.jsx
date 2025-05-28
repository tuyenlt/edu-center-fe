import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "@/providers/authContext";
import api from "@/services/api";
import { userApi } from "@/services/api/user.api";
import { utilApi } from "@/services/api/untils.api";
import { Input } from "@/components/ui/input";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Star, MessageSquare, Activity, Edit2Icon, User } from "lucide-react";
import { toast } from "sonner";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import AvatarUser from "@/components/shared/AvatarUser";
import { cn } from "@/lib/utils";

// *** Thêm import Tabs từ shadcn-ui ***
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import ProfileSidebar from "./components/ProfileSideBar";
import { activeClass } from "@/utils";
import AssignmentStatsCard from "./components/AssignmentStatsCard";
import ClassesOfUser from "./components/ClassesOfUser";
import UserPayment from "./components/UserPayment";
import UserNotifies from "./components/UserNotifies";

const tabs = {
    classes: "Classes",
    payment: "Payment",
    notifies: "Notifies",
};


export default function Profile() {
    const { id } = useParams();
    const { user } = useUserContext();
    const [userData, setUserData] = useState(null);
    const isSelf = user?._id === userData?._id;

    useEffect(() => {
        userApi.getUserProfile(id).then((data) => {
            setUserData(data);
        }).catch(console.error);
    }, [id]);

    const handleAvatarUpload = async (file) => {
        try {
            const { url } = await utilApi.uploadAvatar(file);
            const { data } = await api.patch("/users", { avatar_url: url });
            setUserData(data);
            toast.success("Avatar updated!");
        } catch {
            toast.error("Upload failed");
        }
    };

    const onEditProfile = async (formData) => {
        try {
            const { data } = await api.patch("/users", formData);
            setUserData(data);
            toast.success("Profile updated!");
        } catch {
            toast.error("Update failed");
        }
    };

    if (!userData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <main className="flex flex-col lg:flex-row gap-6 p-6 bg-white min-h-[calc(100vh-96px)] max-w-screen-2xl m-auto">
            {/* Header */}
            <ProfileSidebar
                userData={userData}
                onAvatarUpload={handleAvatarUpload}
                onSubmit={onEditProfile}
            />
            <section className="w-full h-[calc(100vh-100px)] space-y-4">
                <div className="flex">
                    <AssignmentStatsCard user={userData} className="w-1/2" />
                </div>
                <Card className="w-full">
                    <CardContent className="flex flex-col gap-6">
                        <Tabs defaultValue="classes" className="w-full">
                            <div className="border-b bg-white flex items-center justify-between w-full ">
                                <TabsList className="bg-inherit h-full flex items-center p-0">
                                    {Object.entries(tabs).map(([key, value]) => (
                                        <TabsTrigger
                                            key={key}
                                            value={key}
                                            className={cn(
                                                'px-6 py-4 text-base font-medium relative text-gray-700 rounded-none hover:bg-gray-200 cursor-pointer',
                                                activeClass
                                            )}
                                        >
                                            {value}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </div>
                            <div className="">
                                <TabsContent value="classes">
                                    <ClassesOfUser userId={userData._id} />
                                </TabsContent>

                                <TabsContent value="payment">
                                    <UserPayment user={userData} />
                                </TabsContent>

                                <TabsContent value="notifies">
                                    <UserNotifies user={userData} />
                                </TabsContent>
                            </div>
                        </Tabs>
                    </CardContent>
                </Card>
            </section>


        </main>
    );
}
