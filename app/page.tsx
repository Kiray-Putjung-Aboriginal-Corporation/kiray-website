import Link from "next/link";
import RefreshWebsitePopUp from "@/components/RefreshWebsitePopUp";

const FACEBOOK_URL =
    "https://www.facebook.com/KirayPutjungAboriginalCorporation93";

// Replace with Stripe or Square payment link
const DONATE_URL = "https://donate.stripe.com/test_3cIdR95QS0emfFTeMr9Zm01";

export default function Home() {
    return (
        <>
            <RefreshWebsitePopUp></RefreshWebsitePopUp>
            <div className="min-h-screen bg-background flex justify-center px-6">
                <main className="max-w-3xl w-full text-center space-y-10">
                    {/* Header */}
                    <div className="space-y-4 text-4xl sm:text-5xl font-semibold text-left text-textPrimary">
                        <h1 className={""}>Strong Culture</h1>
                        <h1 className={"text-textSecondary"}>Strong People</h1>
                        <h1 className={"text-textMuted"}>Strong Future</h1>
                        {/*<div className="w-24 h-1 bg-[#C86B2B] mx-auto rounded-full"/>*/}
                    </div>

                    <p>
                        Kiray Pujung Aboriginal Corporation is committed to empowering our community through
                        culture, connection, capacity building and opportunity.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <p>Find us on social Media</p>
                        <Link
                            href={FACEBOOK_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-3 rounded-full
                            bg-secondary-button text-textPrimary shadow-md hover:shadow-lg
                            hover:bg-tertiary-button transition-all duration-200 w-full sm:w-auto"
                        >
                            Facebook
                        </Link>
                        <Link
                            href={FACEBOOK_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-3 rounded-full
                            bg-secondary-button text-textPrimary shadow-md hover:shadow-lg
                            hover:bg-tertiary-button transition-all duration-200 w-full sm:w-auto"
                        >
                            Instagram
                        </Link>
                        <Link
                            href={FACEBOOK_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-3 rounded-full
                            bg-secondary-button text-textPrimary shadow-md hover:shadow-lg
                            hover:bg-tertiary-button transition-all duration-200 w-full sm:w-auto"
                        >
                            Linkedin
                        </Link>
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
                                className="inline-flex items-center justify-center px-8 mx-3 py-3 rounded-full
                            bg-tertiary-button text-textLight shadow-md hover:shadow-lg
                            hover:bg-alt-button transition-all duration-200 w-full sm:w-auto"
                            >
                                Contact form
                            </Link>and we will get back to you</p>
                    </div>

                    {/* Donation Compliance Statement */}
                    <div className="text-sm text-[#6A3D26] max-w-xl mx-auto">
                        Kiray Putjung Aboriginal Corporation is endorsed as a Deductible Gift Recipient (DGR).
                        Donations of $2 or more are tax deductible in Australia.
                        No goods or services are provided in exchange for donations.
                    </div>

                    {/* Acknowledgement of Country */}
                    <div className="pt-10 border-t border-[#E3B895] text-left max-w-2xl mx-auto">
                        <p className="text-sm text-[#6A3D26] leading-relaxed mt-6">
            <span className="font-semibold text-[#5A3320]">
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
                    <div className="pt-10 text-xs text-[#7A4A32] space-y-2 max-w-2xl mx-auto">
                        <div>
                            © {new Date().getFullYear()} Kiray Putjung Aboriginal Corporation
                        </div>
                        <div>ABN 46 494 381 610</div>
                        <div>
                            An Aboriginal and Torres Strait Islander Corporation registered under the CATSI Act
                        </div>
                        <div>
                            Registered Charity with the Australian Charities and Not-for-profits Commission (ACNC)
                        </div>
                        
                        <div className="text-sm text-[#6A3D26] max-w-xl mx-auto">
                            Kiray Putjung Aboriginal Corporation is endorsed as a Deductible Gift Recipient (DGR).
                            Donations of $2 or more are tax deductible in Australia.
                            No goods or services are provided in exchange for donations.
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
                    </div>

                </main>
            </div>
        </>
    );
}