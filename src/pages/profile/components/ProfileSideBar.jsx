import React, { useState, useEffect } from "react";
import { Edit, Edit2 as EditIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AvatarUser from "@/components/shared/AvatarUser";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useUserContext } from "@/providers/authContext";

export default function ProfileSidebar({ userData, onSubmit, onAvatarUpload }) {
    const { user: currentUser } = useUserContext();
    const isSelf = currentUser?._id === userData._id;

    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        phone_number: ""
    });

    // Fill form when userData changes
    useEffect(() => {
        setFormData({
            name: userData.name || "",
            gender: userData.gender || "",
            phone_number: userData.phone_number || ""
        });
    }, [userData]);

    const handleSubmit = () => {
        onSubmit(formData);
        setEditing(false);
    };

    const handleAvatarChange = (file) => {
        onAvatarUpload(file);
    };

    if (!userData) {
        return (
            <div className="flex items-center justify-center h-full">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <section className="flex flex-col items-center space-y-4 p-4 bg-blue-500 text-white w-80 rounded-md shadow">
            {/* Toggle Edit */}
            {isSelf && (
                <div
                    className="self-end cursor-pointer flex items-center"
                    onClick={() => setEditing(!editing)}
                >
                    <Edit className="w-5 h-5 mr-1" />
                    {editing ? "Close" : "Edit"}
                </div>
            )}

            {/* Avatar */}
            <div className="relative">
                <AvatarUser user={userData} className="w-32 h-32" fallbackTextClass="text-5xl" />
                {isSelf && (
                    <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow cursor-pointer">
                        <Edit className="w-5 h-5 text-gray-600" />
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                if (e.target.files?.[0]) handleAvatarChange(e.target.files[0]);
                            }}
                        />
                    </label>
                )}
            </div>

            {/* Fields */}
            <div className="w-full space-y-4 ml-6 mt-4">
                {editing ? (
                    <>

                        <div>
                            <label className="block text-sm font-medium ">
                                Name
                            </label>
                            <Input
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="mt-1 w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium ">
                                Gender
                            </label>
                            <Input
                                value={formData.gender}
                                onChange={(e) =>
                                    setFormData({ ...formData, gender: e.target.value })
                                }
                                className="mt-1 w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium ">
                                Phone Number
                            </label>
                            <Input
                                value={formData.phone_number}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone_number: e.target.value })
                                }
                                className="mt-1 w-full"
                            />
                        </div>

                        <div className="flex justify-end space-x-2 pt-2">
                            <Button onClick={handleSubmit}>Save</Button>
                            <Button variant="secondary" onClick={() => setEditing(false)}>
                                Cancel
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <h3 className="text-sm font-medium text-gray-300">Name</h3>
                            <p className="mt-1">{userData.name || "—"}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-300">Role</h3>
                            <p className="mt-1">{userData.role || "—"}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-300">Email</h3>
                            <p className="mt-1">{userData.email || "—"}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-300">Gender</h3>
                            <p className="mt-1">{userData.gender || "—"}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-300">
                                Phone Number
                            </h3>
                            <p className="mt-1">
                                {userData.phone_number || "—"}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
