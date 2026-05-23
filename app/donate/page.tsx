"use client";

import {Button} from "@heroui/button";
import {useState} from "react";
import Link from "next/link";

export default function Donate() {

    const oneTimeDonationLinks = [
        {label: "$10", href: process.env.NEXT_PUBLIC_STRIPE_DONATE_10 ?? "#", visible: true},
        {label: "$25", href: process.env.NEXT_PUBLIC_STRIPE_DONATE_25 ?? "#", visible: true},
        {label: "$50", href: process.env.NEXT_PUBLIC_STRIPE_DONATE_50 ?? "#", visible: true},
        {label: "$100", href: process.env.NEXT_PUBLIC_STRIPE_DONATE_100 ?? "#", visible: true},
        {label: "Custom", href: process.env.NEXT_PUBLIC_STRIPE_DONATE_CUSTOM ?? "#", visible: true},
    ]

    const subscriptionsDonationLinks = [
        {label: "$5 p/m", href: "https://donate.stripe.com/test_bJeeVd4MO3qyctHeMr9Zm05", visible: true},
        {label: "$10 p/m", href: "https://donate.stripe.com/test_bJe8wPgvwaT0alz5bR9Zm06", visible: true},
        {label: "$20 p/m", href: "https://donate.stripe.com/test_fZu6oH2EG3qy2T70VB9Zm07", visible: true},
        {label: "$50 p/m", href: "https://donate.stripe.com/test_3cI14n3IK0em0KZawb9Zm09", visible: true},
        {label: "$100 p/m", href: "https://donate.stripe.com/test_bJedR96UW8KSalzcEj9Zm0a", visible: true},
    ]

    const [activeOption, setActiveOption] = useState<"onceOff" | "subscription">("onceOff");

    const optionToShow =
        activeOption === "onceOff"
            ? oneTimeDonationLinks
            : subscriptionsDonationLinks;

    const SwapOption = ((optionSelected: "onceOff" | "subscription") => {
        setActiveOption(optionSelected);
    })

    return (
        <div className="justify-center align-middle flex flex-col px-2 text-center w-full">
            <div className="flex flex-col items-center">
                <h1 className={"text-3xl font-bold text-textPrimary pb-5"}>Donate to Kiray Putjung</h1>
                <p className={"text-xl px-2 t text-center"}>Your donations help us to fund our cultural programs and community events.</p>
            </div>
            
                <div className="items-center justify-center py-5">
                    {/*todo:reactivate when api updated*/}
                    {/*<h3 className={"text-xl text-textPrimary pb-5"}>Select frequency:</h3>*/}
                    <h3 className={"text-xl text-textPrimary pb-5"}>Frequency:</h3>

                    <Button
                        className={`text-textLight px-10 text-2xl mx-5 my-2
                     ${activeOption == "onceOff" ? "bg-primary-button text-textLight" : "bg-gray-50 text-textPrimary"} `}
                        onPress={() => SwapOption("onceOff")}
                    >
                        One-Time</Button>
                    {/*<Button*/}
                    {/*    className={` text-textLight px-10 text-2xl mx-5 my-2*/}
                    {/*     ${activeOption == "subscription" ? "bg-primary-button text-textLight" : "bg-gray-50 text-textPrimary"} `}*/}
                    {/*    onPress={() => SwapOption("subscription")}*/}
                    {/*>Monthly</Button>*/}
                </div>
            
                <div className={"flex items-center justify-center pb-5 "}>
                    <h2 className={"text-xl"}>Please note that the payment page will open another tab.</h2>
                </div>

                <div className={"flex flex-col lg:flex-row items-center justify-center gap-4 pb-2"}>
                    {optionToShow.filter(
                        (donationOption) => donationOption.visible)
                        .map((donationOption) => (
                            <Link
                                key={donationOption.label}
                                href={donationOption.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-secondary-button py-2 px-5 text-xl text-textLight hover:bg-alt-button"
                            >
                                {donationOption.label}
                            </Link>
                        ))}
                </div>



            <div className={"py-2"}>
                <p> Kiray Putjung Aboriginal Corporation is endorsed as a Deductible Gift Recipient (DGR).</p>
                <p className={"py-2"}> Donations of $2 or more are tax deductible in Australia.</p>
                <p className={"py-2"}>No goods or services are provided in exchange for donations.</p>
            </div>


        </div>
    )
} 