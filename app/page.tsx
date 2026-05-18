import Link from "next/link";
import RefreshWebsitePopUp from "@/components/RefreshWebsitePopUp";
import Image from "next/image";
import React from "react";

const FACEBOOK_URL =
    "https://www.facebook.com/KirayPutjungAboriginalCorporation93";
const LINKEDIN_URL =
    "https://www.facebook.com/KirayPutjungAboriginalCorporation93";
const INSTAGRAM_URL =
    "https://www.instagram.com/kirayputjung?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";


export default function Home() {
    return (
        <>
            <RefreshWebsitePopUp></RefreshWebsitePopUp>
            <div className="bg-background flex px-6">
                <main className=" w-full text-center space-y-10">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-8">
                        {/* Text column */}
                        <div className="space-y-4 text-4xl sm:text-5xl font-semibold text-textPrimary lg:text-left">
                            <h1 className="underline">Strong Culture</h1>
                            <h1 className="underline text-textSecondary lg:pl-30">
                                Strong People
                            </h1>
                            <h1 className="underline text-textMuted lg:pl-60">
                                Strong Future
                            </h1>
                        </div>

                        {/* Image beside text */}
                        <Image
                            className="hidden lg:block w-105 h-auto"
                            src="/images/logos/kiray/KirayLogoPlaceholder.png"
                            alt="Kiray Putjung Aboriginal Corporation Logo"
                            width={640}
                            height={640}
                            priority
                        />
                    </div>

                    <div>
                        <p>
                            Kiray Putjung Aboriginal Corporation is committed to empowering our community through
                            culture, connection, capacity building and opportunity.
                        </p>
                    </div>


                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <p>Find us on social Media:</p>
                        <Link
                            href={FACEBOOK_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex text-xl items-center justify-center px-8 py-3 rounded-full
                            bg-secondary-button text-textLight shadow-md hover:shadow-lg
                            hover:bg-tertiary-button transition-all duration-200 w-full sm:w-auto"
                        >
                            Facebook
                        </Link>
                        <Link
                            href={INSTAGRAM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xl justify-center px-8 py-3 rounded-full
                            bg-secondary-button text-textLight shadow-md hover:shadow-lg
                            hover:bg-tertiary-button transition-all duration-200 w-full sm:w-auto"
                        >
                            Instagram
                        </Link>
                        {/*<Link*/}
                        {/*    href={LINKEDIN_URL}*/}
                        {/*    target="_blank"*/}
                        {/*    rel="noopener noreferrer"*/}
                        {/*    className="inline-flex items-center text-xl justify-center px-8 py-3 rounded-full*/}
                        {/*    bg-secondary-button text-textLight shadow-md hover:shadow-lg*/}
                        {/*    hover:bg-tertiary-button transition-all duration-200 w-full sm:w-auto"*/}
                        {/*>*/}
                        {/*    Linkedin*/}
                        {/*</Link>*/}
                    </div>

                    <div className="text-md text-textPrimary">
                        For enquiries, please contact us via email:
                        <a
                            href="mailto:contact@kiray.org"
                            className="underline hover:no-underline font-medium"
                        >
                            contact@kiray.org
                        </a>

                        <p className={"pt-5"}>Or head over and fill out our
                            <Link
                                href="/contact"
                                className="inline-flex uppercase items-center justify-center px-8 mx-3 py-3 rounded-full
                            bg-tertiary-button text-textLight shadow-md hover:shadow-lg
                            hover:bg-alt-button transition-all duration-200 w-full sm:w-auto"
                            >
                                Contact form
                            </Link>and we will get back to you.</p>
                    </div>


                    {/* Acknowledgement of Country */}
                    <div className="pt-10 border-t border-[#E3B895] text-left max-w-2xl mx-auto">
                        <p className="text-sm text-textPrimary leading-relaxed mt-6">
            <span className="font-semibold text-textPrimary">
              Acknowledgement of Country
            </span>
                            <br/>
                            We acknowledge the Wonnarua people who are the Traditional Custodians of the lands on which
                            we
                            work and live,
                            and pay our respects to Elders past and present. We extend that respect to all
                            Aboriginal and Torres Strait Islander peoples.
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="pt-10 text-xs text-textPrimary space-y-2 max-w-2xl mx-auto">

                        <div>ABN 46 494 381 610</div>
                        <div>
                            An Aboriginal and Torres Strait Islander Corporation registered under the CATSI Act
                        </div>
                        <div>
                            Registered Charity with the Australian Charities and Not-for-profits Commission (ACNC)
                        </div>

                        <div>
                            Email:{" "}
                            <a
                                href="mailto:contact@kiray.org"
                                className="underline hover:no-underline"
                            >
                                contact@kiray.org
                            </a>
                        </div>

                        <div>
                            © {new Date().getFullYear()} Kiray Putjung Aboriginal Corporation
                        </div>
                    </div>

                </main>
            </div>
        </>
    );
}