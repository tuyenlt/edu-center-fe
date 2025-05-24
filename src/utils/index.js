export const stringToColorClass = (str) => {
    const classes = [
        "bg-red-500",
        "bg-orange-500",
        "bg-amber-500",
        "bg-yellow-500",
        "bg-lime-500",
        "bg-green-500",
        "bg-teal-500",
        "bg-cyan-500",
        "bg-blue-500",
        "bg-indigo-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-rose-500",
        "bg-gray-500",
    ];

    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % classes.length;
    return classes[index];
};


export const activeClass =
    'data-[state=active]:text-blue-600 data-[state=active]:hover:bg-blue-50 ' +
    'data-[state=active]:after:content-[""] data-[state=active]:after:absolute ' +
    'data-[state=active]:after:-bottom-[1px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 ' +
    'data-[state=active]:after:h-0 data-[state=active]:after:border-t-4 data-[state=active]:after:bg-blue-600 ' +
    'data-[state=active]:after:rounded-t-md';



export function getIntervalTimePosition(checkStart, checkEnd, refTime) {
    const toMs = t =>
        t instanceof Date
            ? t.getTime()
            : typeof t === 'string'
                ? Date.parse(t)
                : Number(t);

    const start = toMs(checkStart);
    const end = toMs(checkEnd);
    const ref = toMs(refTime);

    if (start < ref) {
        return 'before';
    }
    if (end > ref) {
        return 'after';
    }
    return 'within';
}

export function getClassProgress(classData) {
    const totalSessions = classData.class_sessions.length;
    const completedSessions = classData.class_sessions.filter(session => getIntervalTimePosition(session.start_time, session.end_time, new Date()) === "before").length;

    if (totalSessions === 0) return 0;
    return Math.round((completedSessions / totalSessions) * 100);
}