import { ChevronUp } from "lucide-react";   
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { APP_NAME } from "@/lib/constant";

export const Footer = () => {
    return (
        <footer className="bg-black text-white underlin-link">
            <div className="w-full">
                <Button
                variant="ghost"
                className="bg-gray-800 w-full rounded-none"
                onClick={()=> window.scrollTo({top: 0, behavior: "smooth"})}
                >
                    <ChevronUp className="w-4 h-4 mr-2" />
                    Back to top
                </Button>
            </div>

            <div className="p-4">
                <div className="flex justify-center gap-3 text-sm">
                    <Link to="/pages/conditions-of-use"> Conditions of Use</Link>
                    <Link to="/pages/privacy-policy">Privacy Policy</Link>
                    <Link to="/pages/help">Help</Link>
                </div>
                <div className="flex justify-center text-sm">
                    <p>&copy; {new Date().getFullYear()} {APP_NAME}</p>
                </div>
                <div className="flex justify-center text-sm text-gray-400 mt-8">
                    9193, 2nd Floor, 5th Cross, Sector 1, HSR Layout, Bangalore - 560102
                </div>
            </div>
        </footer>
    )
}