import type {Metadata} from "next";
import {ButtonLink} from "@/components/ui/ButtonLink";
import {Container} from "@/components/ui/Container";
import {PageHero} from "@/components/ui/PageHero";

export const metadata: Metadata = {title: "Members"};

export default function MembersPage() {
  return (
    <>
      <PageHero
        eyebrow="Members"
        title="The member portal is being prepared"
        description="Member sign-in and registration will be added when the secure Clerk integration and member services are ready."
      />
      <section className="bg-background py-16">
        <Container className="text-center">
          <p className="mx-auto max-w-2xl leading-7 text-textSecondary">If you have a membership question in the meantime, please contact the Kiray Putjung team.</p>
          <div className="mt-7"><ButtonLink href="/contact">Contact us</ButtonLink></div>
        </Container>
      </section>
    </>
  );
}
