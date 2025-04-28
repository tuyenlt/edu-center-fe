import { ArrowLeft } from "lucide-react";

export default function ReturnButton({ className, ...props }) {
    return (
        <div className={`flex text-lg text-muted-foreground items-center gap-2 cursor-pointer font-bold ${className ? className : ""}`} {...props}>
            <ArrowLeft className="w-6 h-6 border-2 border-muted-foreground rounded-md" />
            <span>Back</span>
        </div>
    );
}
