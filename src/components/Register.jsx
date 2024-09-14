'use client';

import React, { useEffect, useState, useContext } from "react";
import "../../globals.css";
import { authCheck } from "@/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CoolMode } from "./magicui/cool-mode";
import Particles from "./magicui/particles";
import { useTheme } from "next-themes";


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BorderBeam } from "./magicui/border-beam";
import { useToast } from "@/hooks/use-toast";
import { register } from "@/auth";
import Link from "next/link";
import { cn } from "@/lib/utils";



export default function Register() {

    const router = useRouter();
    const { toast } = useToast();
    const [showContent, setShowContent] = useState(false);

    const { theme, systemTheme, setTheme } = useTheme();
    const [color, setColor] = useState("#ffffff");

    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            console.log(theme);
            const passed = authCheck();
            if (passed) {
                router.push("/home");
            } else {
                setShowContent(true);
            }
        };

        checkAuth();
    }, []);

    useEffect(() => {
        if (theme !== 'system') {
            setTheme('system');
        }
    }, []);

    useEffect(() => {
        const setColorBasedOnTheme = () => {
            if (theme === 'system') {
                // Check the system preference
                setColor(systemTheme === 'dark' ? "#ffffff" : "#000000");
            } else {
                // Direct theme setting
                setColor(theme === "dark" ? "#ffffff" : "#000000");
            }
        };

        setColorBasedOnTheme();
        console.log("Current theme:", theme, "Color set to:", color);
    }, [theme, systemTheme]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;


        const result = register(username, password);

        if (result.data.ok) {
            console.log(result.data.message);
            toast({
                title: "Registration Successfull",
                description: result.data.message || 'An error occurred',
            });
            router.push("/login");
        } else {
            console.error('Registration error:');
            toast({
                title: "Registration Error",
                description: result.data.message || 'An error occurred',
            });
        }

    }

    const handleChange = (event) => {
        if (event.target.value.trim() !== password) {
            setError(true);
        } else {
            setError(false);
        }
    }

    if (!showContent) {

        return null;
    }


    return (
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">

            <Particles
                className="absolute inset-0"
                quantity={300}
                ease={80}
                color={color}
                refresh={true}
            />


            <Card className="w-4/5 lg:w-3/5 h-3/5 relative flex flex-col justify-between shadow-[0_0_30px_5px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_5px_rgba(255,255,255,0.1)] overflow-hidden"> {/* using custom shadows for a more soft spread out */}
                <div className="flex w-full justify-center pt-4">
                    <Image
                        src="/images/logo-2.png"
                        alt="IrusriLogo"
                        width={100}
                        height={100}
                        priority
                    />
                </div>

                <CardHeader>
                    <CardTitle>My Todo Register</CardTitle>
                    <CardDescription>Enter Your credentials</CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="registerForm" onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div>
                                <label htmlFor="username">Username</label>
                                <Input id="username" placeholder="username" required />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <Input id="password" placeholder="password" required onChange={(event) => setPassword(event.target.value.trim())} />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <Input id="confirmPassword" placeholder="confirm password" required onChange={handleChange} />
                            </div>
                            <span className={cn("text-red-500", {
                                "hidden": !error
                            })}>Passwords do no match!</span>
                        </div>
                    </form>

                </CardContent>
                <CardFooter className="relative flex justify-between">
                    <Link href={'/login'}>Login</Link>
                    <CoolMode>
                        <Button type="submit" form="registerForm" disabled={error} className={cn({
                            "opacity-50 cursor-not-allowed": error
                        })}>submit</Button>
                    </CoolMode>

                </CardFooter>
                <BorderBeam />
            </Card>

        </div>

    );
}