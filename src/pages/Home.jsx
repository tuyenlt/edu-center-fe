import { useUserContext } from "@/providers/authContext";

export default function Home() {
    const { user, isAuthenticated } = useUserContext();

    return (
        <div>
            <h1>This is the Home page</h1>
            {isAuthenticated ? (
                <>
                    <div>Name: {user?.name}</div>
                    <div>Role: {user?.role}</div>
                    <div>email: {user?.email}</div>
                </>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}
