import Link from "next/link";

const FACEBOOK_URL =
    "https://www.facebook.com/KirayPutjungAboriginalCorporation93";

// Replace with your Stripe or Square payment link
const DONATE_URL = "https://donate.example.com";

export default function Home() {
    return (
        <div className="min-h-screen bg-[#F6E6D6] flex items-center justify-center px-6">
            <main className="max-w-3xl w-full text-center space-y-10 py-20">
                {/* Header */}
                <div className="space-y-4">
                    <h1 className="text-4xl sm:text-5xl font-semibold text-[#3B2416]">
                        Kiray Putjung Aboriginal Corporation
                    </h1>

                    <div className="w-24 h-1 bg-[#C86B2B] mx-auto rounded-full" />

                    <h2 className="text-xl sm:text-2xl text-[#5A3320] font-medium">
                        Our website is currently being refreshed
                        
                    </h2>
                </div>

                {/* Intro Text */}
                <p className="text-lg text-[#6A3D26] leading-relaxed max-w-2xl mx-auto">
                    We are updating our website to better reflect our community, culture,
                    and the work we do. Thank you for your patience while we make these improvements.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href={"https://donate.stripe.com/test_3cIdR95QS0emfFTeMr9Zm01"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-3 rounded-full
                       bg-[#3B2416] text-white shadow-md hover:shadow-lg
                       hover:bg-[#4A2C1B] transition-all duration-200 w-full sm:w-auto"
                    >
                        Donate
                    </Link>

                    <Link
                        href={FACEBOOK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-3 rounded-full
                       bg-[#C86B2B] text-white shadow-md hover:shadow-lg
                       hover:bg-[#B85F24] transition-all duration-200 w-full sm:w-auto"
                    >
                        Facebook
                    </Link>
                </div>

                <div className="text-sm text-[#6A3D26]">
                    For enquiries, please contact us via email:{" "}
                    <a
                        href="mailto:contact@kiray.org"
                        className="underline hover:no-underline font-medium"
                    >
                        contact@kiray.org
                    </a>
                </div>

                {/*/!* Donation Compliance Statement *!/*/}
                {/*<div className="text-sm text-[#6A3D26] max-w-xl mx-auto">*/}
                {/*    Kiray Putjung Aboriginal Corporation is endorsed as a Deductible Gift Recipient (DGR).*/}
                {/*    Donations of $2 or more are tax deductible in Australia.*/}
                {/*    No goods or services are provided in exchange for donations.*/}
                {/*</div>*/}

                {/* Acknowledgement of Country */}
                <div className="pt-10 border-t border-[#E3B895] text-left max-w-2xl mx-auto">
                    <p className="text-sm text-[#6A3D26] leading-relaxed mt-6">
            <span className="font-semibold text-[#5A3320]">
              Acknowledgement of Country
            </span>
                        <br />
                        We acknowledge the Wonnarua people who are the Traditional Custodians of the lands on which we work and live,
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
    );
}