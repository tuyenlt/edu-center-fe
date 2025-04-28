export default function SessionInfo({ session, index, ...props }) {
    const date = session.start_time ? new Date(session.start_time).toDateString() : "";
    const startHour = session.start_time ? `${new Date(session.start_time).getHours()}:00` : "";
    const endHour = session.end_time ? `${new Date(session.end_time).getHours()}:00` : "";

    return (
        <div
            className="w-full rounded-2xl bg-muted p-5 shadow-md transition-colors hover:bg-muted/90"
            {...props}
        >
            <div className="text-lg font-semibold text-primary mb-2">
                Session {index}: {session.title}
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-2">
                <div className="flex items-center gap-2">
                    <span className="font-medium">📅 Date:</span>
                    <span>{date}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-medium">🕒 Time:</span>
                    <span>{startHour}{startHour ? " - " : ""}{endHour}</span>
                </div>
            </div>

            {session.room && (
                <div className="text-sm text-muted-foreground">
                    <span className="font-medium">🏫 Room:</span> {session.room}
                </div>
            )}
        </div>
    );
}
