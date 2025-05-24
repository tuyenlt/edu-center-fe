import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "@/providers/authContext";
import api from "@/services/api";
import { userApi } from "@/services/api/user.api";
import { utilApi } from "@/services/api/untils.api";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Star, MessageSquare, Activity } from "lucide-react";
import { toast } from "sonner";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function Profile() {
    const { id } = useParams();
    const { user } = useUserContext();
    const [userData, setUserData] = useState(null);
    const isSelf = user?._id === userData?._id;

    useEffect(() => {
        userApi.getUserProfile(id).then(setUserData).catch(console.error);
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

    if (!userData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <main className="max-w-3xl mx-auto p-6 space-y-8">
            {/* Header */}
            <section className="text-center space-y-4">
                <div className="relative inline-block">
                    <Avatar className="h-32 w-32">
                        {userData.avatar_url ? (
                            <AvatarImage src={userData.avatar_url} alt={userData.name} />
                        ) : (
                            <AvatarFallback>{userData.name[0]}</AvatarFallback>
                        )}
                    </Avatar>
                    {isSelf && (
                        <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow cursor-pointer">
                            <Edit className="w-5 h-5 text-gray-600" />
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleAvatarUpload(e.target.files[0])}
                            />
                        </label>
                    )}
                </div>

                <h1 className="text-3xl font-semibold">{userData.name}</h1>
                <Badge className="uppercase">{userData.role}</Badge>

                <div className="flex items-center justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-5 h-5 ${i < 4 ? "text-yellow-500 fill-current" : "text-gray-300"
                                }`}
                        />
                    ))}
                    <span className="ml-2 text-gray-600">8.6</span>
                </div>

                <div className="flex items-center justify-center space-x-4">
                    <Button variant="outline" icon={<MessageSquare className="w-5 h-5" />}>
                        Send Message
                    </Button>
                    <Button variant="outline" icon={<Activity className="w-5 h-5" />}>
                        Timeline
                    </Button>
                    {isSelf && (
                        <Button variant="primary" icon={<Edit className="w-5 h-5" />}>
                            Edit Profile
                        </Button>
                    )}
                </div>
            </section>

            {/* Details */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Info card */}
                <Card>
                    <CardContent>
                        <h2 className="text-lg font-medium mb-4">Personal Info</h2>
                        <dl className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                            <dt className="font-semibold">Phone</dt>
                            <dd>{userData.phone || "—"}</dd>

                            <dt className="font-semibold">Email</dt>
                            <dd>{userData.email || "—"}</dd>

                            <dt className="font-semibold">Address</dt>
                            <dd>{userData.address || "—"}</dd>

                            <dt className="font-semibold">Website</dt>
                            <dd>
                                {userData.website ? (
                                    <a
                                        href={userData.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        {userData.website}
                                    </a>
                                ) : (
                                    "—"
                                )}
                            </dd>

                            <dt className="font-semibold">Birthday</dt>
                            <dd>{userData.birthday || "—"}</dd>

                            <dt className="font-semibold">Gender</dt>
                            <dd className="capitalize">{userData.gender || "—"}</dd>
                        </dl>
                    </CardContent>
                </Card>

                {/* Bio card */}
                <Card>
                    <CardContent>
                        <h2 className="text-lg font-medium mb-4">About Me</h2>
                        <p className="text-gray-700 leading-relaxed">
                            {userData.bio ||
                                "Hi! I'm a passionate developer. I enjoy building clean, scalable web applications and learning new technologies."}
                        </p>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
}
