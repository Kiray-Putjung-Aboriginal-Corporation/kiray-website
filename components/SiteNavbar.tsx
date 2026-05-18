"use client";

import React, {useState} from "react";
import Link from "next/link";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle} from "@heroui/navbar";
import {NavbarMenuItem} from "@heroui/react";
import Image from "next/image";

export const KirayLogo = () => {
    return (
        <div className="lg:hidden relative h-32 w-48 sm:h-40 sm:w-60 lg:h-45 lg:w-66.75">
            <Image
                src="/images/logos/kiray/KirayLogoPlaceholder.png"
                alt="Kiray Putjung Aboriginal Corporation Logo"
                fill
                sizes="(max-width: 640px) 192px, (max-width: 1024px) 240px, 267px"
                style={{
                    objectFit: "contain",
                    objectPosition: "left center",
                }}
                priority
            />
        </div>
    );
};

export default function SiteNavbar() {


    const [isOpen, setIsOpen] = React.useState(false);

    const navigationItems = [
        {label: "Home", href: "/", visible: true},
        {label: "Events", href: "/events", visible: false},
        {label: "About Us", href: "/about", visible: false},
        {label: "Contact Us", href: "/contact", visible: true},
        {label: "Sponsors", href: "/sponsors", visible: false},
        {label: "Donate", href: "/donate", visible: true},
    ]

    return (
        <Navbar
            isMenuOpen={isOpen}
            onMenuOpenChange={setIsOpen}
            maxWidth="full"
            className="bg-background text-primary"
            classNames={{
                wrapper: "h-[180px] sm:h-[210px] max-w-full px-3 sm:px-6 overflow-hidden",
                menu: "top-[180px] sm:top-[210px] bg-background px-6 pt-6 gap-5 border-t border-primary/20",
            }}
        >
            <NavbarContent className="w-full gap-2 sm:gap-6 justify-between">                {/* Mobile burger */}
                <NavbarMenuToggle
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    className="lg:hidden text-primary-button"
                />

                {/* Logo */}
                <NavbarBrand className="grow justify-center items-center lg:grow-0 lg:shrink-0">
                    <Link href="/">
                        <KirayLogo/>
                    </Link>
                </NavbarBrand>


                {/* Desktop nav links */}
                <div className="hidden lg:flex flex-1 content-start justify-evenly gap-6">
                    {navigationItems
                        .filter((item) => item.label !== "Donate")
                        .filter((item) => item.visible)
                        .map((item) => (
                            <NavbarItem key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`${item.visible ? "" : "hidden"}
                                    ${item.label == "Donate" ? "rounded-full bg-primary-button px-5 py-2 font-semibold text-background"
                                        : "text-2xl text-textPrimary font-semibold uppercase tracking-wide"}
                                      `}
                                    
                                >
                                    {item.label}
                                </Link>
                            </NavbarItem>
                        ))}
                </div>

                {/* Donate button */}
                <NavbarItem className="flex justify-end">
                    <Link
                        href={"/donate"}
                        className="rounded-full bg-primary-button px-5 py-2 text-2xl font-semibold text-background"
                    >
                        Donate
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {navigationItems
                    .filter((item) => item.visible)
                    .map((item) => (
                        <NavbarMenuItem key={item.href} className={item.visible ? "" : "hidden"}>
                            <Link
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
            </NavbarMenu>
        </Navbar>

    );
}

