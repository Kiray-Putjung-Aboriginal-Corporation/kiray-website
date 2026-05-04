"use client";

import React, {useState} from "react";
import Link from "next/link";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle} from "@heroui/navbar";

export const KirayLogo = () => {
    return (
        <div className={"bg-background text mx-auto ml-5"}>Kiray Pujung</div>
    );
};

export default function SiteNavbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const navigationItems = [
        "Events",
        "About Us",
        "Sponsors",
        "Contact Us",
        "Donate",
    ]

    return (
        <Navbar className="bg-background text-textLight shadow-sm">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"/>
                <NavbarBrand><KirayLogo/></NavbarBrand>
            </NavbarContent>
            
            <NavbarContent className={isOpen ? "text-gray-light sm-flex" : "hidden"}>
                <NavbarItem isActive>
                    <Link href="/contact">Contect</Link>
                </NavbarItem>
            </NavbarContent>
        </Navbar>

    );
}

