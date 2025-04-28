import { userApi } from "@/services/api/user.api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit, Star, Activity, MessageSquare } from "lucide-react";
import { useUserContext } from "@/providers/authContext";
import { utilApi } from "@/services/api/untils.api";
import { toast } from "sonner";
import api from "@/services/api";

export default function Profile() {
    const { id } = useParams();
    const { user } = useUserContext();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await userApi.getUserProfile(id);
            setUserData(data);
        };
        fetchData();
    }, [id]);

    const uploadAvatarImg = async (imgFile) => {
        try {
            const response = await utilApi.uploadAvatar(imgFile);
            if (!response) {
                toast.error("No response from server");
                return;
            }

            const userResponse = await api.patch("/users", {
                avatar_url: response.url,
            });

            toast.success("Avatar uploaded successfully");
            setUserData(userResponse.data);
        } catch (error) {
            console.error("Error uploading avatar:", error);
            toast.error("Error uploading avatar");
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6 max-w-screen-xl mx-auto mt-10">
            <div className="flex gap-16 items-start">
                <div className="space-y-8 max-w-75">
                    <div className="relative items-center flex flex-col">
                        <img src={userData.avatar_url} alt="" className="w-75 rounded-sm" />
                        {userData && user?._id === userData._id && (
                            <label className="absolute bottom-1 right-1 bg-white rounded-full p-1 cursor-pointer shadow-md">
                                <Edit className="w-5 h-5 text-gray-600" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => uploadAvatarImg(e.target.files[0])}
                                    className="hidden"
                                />
                            </label>
                        )}

                    </div>
                    <div className="flex">
                        <div className="font-bold text-muted-foreground">INFO</div>
                        <div className="w-full border-b-2 mb-1 ml-2"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                        <span className="font-medium">Phone:</span>
                        <span>{userData.phone || "-"}</span>

                        <span className="font-medium">Address:</span>
                        <span>{userData.address || "-"}</span>

                        <span className="font-medium">E-mail:</span>
                        <span>{userData.email || "-"}</span>

                        <span className="font-medium">Website:</span>
                        <a href={userData.website} className="text-blue-500">
                            {userData.website || "-"}
                        </a>

                        <span className="font-medium">Birthday:</span>
                        <span>{userData.birthday || "-"}</span>

                        <span className="font-medium">Gender:</span>
                        <span className="capitalize">{userData.gender || "-"}</span>
                    </div>
                    <div className="space-y-4">
                        <div className="flex">
                            <div className="font-bold text-muted-foreground">BIO</div>
                            <div className="w-full border-b-2 mb-1 ml-2"></div>
                        </div>
                        <div className="text-gray-600 text-sm">
                            {userData.bio || "Hi, I'm John Doe.I'm a software engineer with 5+ years of experience specializing in building web applications using React and Node.js. I'm passionate about clean code, scalable systems, and delivering meaningful products."}
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="border-b-2 h-75 flex flex-col justify-between">
                        <div className="wrapper">
                            <h2 className="text-2xl font-semibold">{userData.name}</h2>
                            <Badge className="capitalize mb-2">{userData.role}</Badge>

                            <div className="flex items-center gap-1 mb-4">
                                <Star className="text-blue-500 w-5 h-5 fill-current" />
                                <Star className="text-blue-500 w-5 h-5 fill-current" />
                                <Star className="text-blue-500 w-5 h-5 fill-current" />
                                <Star className="text-blue-500 w-5 h-5 fill-current" />
                                <Star className="text-gray-300 w-5 h-5 fill-current" />
                                <span className="ml-2 text-gray-600">8.6</span>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <button className="h-12 flex text-muted-foreground gap-2 font-bold text-lg items-center hover:border-b-blue-400 hover:border-b-3">
                                <MessageSquare className="w-5 h-5 fill-current" />
                                Send message
                            </button>
                            <button className="h-12 flex text-muted-foreground gap-2 font-bold text-lg items-center hover:border-b-blue-400 hover:border-b-3">
                                <Activity className="w-5 h-5 fill-current" />
                                Time line
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
