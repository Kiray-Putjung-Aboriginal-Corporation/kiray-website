import Link from "next/link";

const FACEBOOK_URL =
    "https://www.facebook.com/KirayPutjungAboriginalCorporation93";

// Temporary donation link (replace with your Stripe Payment Link or Square Payment Link)
const DONATE_URL = "https://donate.example.com";

export default function Home() {
    return (
        <div className="min-h-screen bg-[#F6E6D6] flex items-center justify-center px-6">
            <main className="max-w-2xl w-full text-center space-y-8 py-20">
                <div className="space-y-4">
                    <h1 className="text-4xl sm:text-5xl font-semibold text-[#3B2416]">
                        Kiray Putjung Aboriginal Corporation
                    </h1>

                    <div className="w-24 h-1 bg-[#C86B2B] mx-auto rounded-full" />

                    <h2 className="text-xl sm:text-2xl text-[#5A3320] font-medium">
                        Our website is currently being refreshed
                    </h2>
                </div>

                <p className="text-lg text-[#6A3D26] leading-relaxed">
                    We are updating our website to better reflect our community, our culture,
                    and the work we do. Thank you for your patience while we make these improvements.
                </p>

                {/* Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    {/*<Link*/}
                    {/*    href={DONATE_URL}*/}
                    {/*    target="_blank"*/}
                    {/*    rel="noopener noreferrer"*/}
                    {/*    className="inline-flex items-center justify-center px-8 py-3 rounded-full*/}
                    {/*   bg-[#3B2416] text-white shadow-md hover:shadow-lg*/}
                    {/*   hover:bg-[#4A2C1B] transition-all duration-200 w-full sm:w-auto"*/}
                    {/*>*/}
                    {/*    Donate*/}
                    {/*</Link>*/}

                    <Link
                        href={FACEBOOK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit Kiray Putjung Aboriginal Corporation on Facebook"
                        className="inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full
                       bg-[#C86B2B] text-white shadow-md hover:shadow-lg
                       hover:bg-[#B85F24] transition-all duration-200 w-full sm:w-auto"
                    >
                        {/* Facebook Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5"
                        >
                            <path d="M22 12.07C22 6.55 17.52 2 12 2S2 6.55 2 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.9h-2.33V22c4.78-.8 8.44-4.94 8.44-9.93z" />
                        </svg>
                        Facebook
                    </Link>
                </div>

                <div className="text-sm text-[#7A4A32]">
                    Facebook:{" "}
                    <Link
                        href={FACEBOOK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:no-underline"
                    >
                        KirayPutjungAboriginalCorporation93
                    </Link>
                </div>

                {/* Acknowledgement */}
                <div className="pt-10 border-t border-[#E3B895] text-left">
                    <p className="text-sm text-[#6A3D26] leading-relaxed mt-6">
            <span className="font-semibold text-[#5A3320]">
              Acknowledgement of Country
            </span>
                        <br />
                        We acknowledge the Traditional Custodians of the lands on which we work and
                        live, and pay our respects to Elders past and present. We extend that respect
                        to all Aboriginal and Torres Strait Islander peoples.
                    </p>
                </div>

                <div className="pt-10 text-sm text-[#7A4A32]">
                    © {new Date().getFullYear()} Kiray Putjung Aboriginal Corporation
                </div>
            </main>
        </div>
    );
}