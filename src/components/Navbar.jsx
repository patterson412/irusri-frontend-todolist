'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../../globals.css";
import { HomeIcon, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/magicui/dock";
//import { ModeToggle } from "@/components/mode-toggle";
import BlurIn from "./magicui/blur-in";
import { authCheck } from "@/auth";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/auth";



/*const DATA = {
    navbar: [
        { href: "/home", icon: HomeIcon, label: "Home" },
    ],
};*/

export default function Navbar() {

    const { setTheme } = useTheme();

    const router = useRouter();
    const [showContent, setShowContent] = useState(false);

    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const passed = authCheck();
            if (passed) {
                setShowContent(true);
            } else {
                router.push("/login");
            }
        };

        checkAuth();
    }, []);


    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    const goHome = () => {
        window.location.href = '/home'; // I need to refresh when i go home thats why using this instead of router
    };


    if (!showContent) {
        return null;
    }


    return (
        <div className="grid grid-cols-1 relative px-5">
            <div className="relative flex justify-between items-center p-4">
                <BlurIn
                    word="MyTODO"
                    className="font-bold text-black dark:text-white"
                />

                <div>
                    <TooltipProvider>
                        <Dock direction="middle">
                            <DockIcon>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="size-12 rounded-full"
                                            onClick={goHome}
                                        >
                                            <HomeIcon className="size-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Log out</p>
                                    </TooltipContent>
                                </Tooltip>
                            </DockIcon>
                            <DockIcon>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="size-12 rounded-full"
                                            onClick={handleLogout}
                                        >
                                            <LogOut className="size-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Log out</p>
                                    </TooltipContent>
                                </Tooltip>
                            </DockIcon>
                            <Separator orientation="vertical" className="h-full" />
                            <DockIcon>
                                <Tooltip open={showTooltip}>
                                    <TooltipTrigger asChild>
                                        <div
                                            onMouseEnter={() => setShowTooltip(true)}
                                            onMouseLeave={() => setShowTooltip(false)}
                                        >
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="size-12 rounded-full"
                                                    >
                                                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                                        <span className="sr-only">Toggle theme</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => setTheme("light")}>
                                                        Light
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                                                        Dark
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => setTheme("system")}>
                                                        System
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Theme</p>
                                    </TooltipContent>
                                </Tooltip>
                            </DockIcon>
                        </Dock>
                    </TooltipProvider>
                </div>


            </div>
        </div>
    );
}