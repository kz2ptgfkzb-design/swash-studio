import { LegalPage, LegalSection } from '@/components/LegalPage';

export const metadata = {
  title: 'Terms of Service',
  description:
    'The terms that govern working with Swash Studio: the free demo, revisions, payment, ownership, hosting, and retainers.',
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      updated="Last updated: July 2026"
      intro="These terms explain how working with Swash Studio (&ldquo;Swash&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) works, from the first brief through to launch and beyond. The specifics of any paid project are set out in a separate engagement letter or proposal; where that document and these terms differ, the engagement letter wins."
    >
      <LegalSection heading="The brief and the demo">
        <p>
          Sending a brief costs nothing and commits you to nothing. Within about
          48 hours of receiving it, we send a recorded walkthrough of a real,
          working preview of your site. You can request changes in any format,
          and we revise until you are happy or decide not to proceed. You owe us
          nothing for the brief, the demo, or the revisions.
        </p>
      </LegalSection>

      <LegalSection heading="Starting an engagement">
        <p>
          If you sign off on the demo and want to proceed, we confirm the scope,
          timeline, and fee in an engagement letter or written proposal. Work on
          the final build begins once that is agreed. The fee stated there is
          the fee you pay for the scope described; we do not pad estimates, and
          we absorb scope creep that we cause.
        </p>
      </LegalSection>

      <LegalSection heading="Payment">
        <p>
          You can pay in full once you sign off on the build, or split the fee
          into two equal payments: the first on sign-off and the second before
          launch. Either way, the site goes fully live only once the final
          payment has cleared. Any third-party costs (for example paid fonts,
          stock imagery, or premium plugins) are quoted separately and are not
          included in the studio fee unless we say so in writing.
        </p>
      </LegalSection>

      <LegalSection heading="Ownership and portfolio use">
        <p>
          Once you have paid in full, the deliverables we create for you -
          including the brand assets, the site, and its source code - are yours.
          Third-party components (fonts, stock media, open-source libraries)
          remain under their own licenses, which we pass on to you. Unless you
          ask us otherwise in writing, we may show the work we did for you in our
          portfolio and case studies.
        </p>
      </LegalSection>

      <LegalSection heading="After launch">
        <p>
          Every engagement includes 30 days of post-launch polish for bugs and
          small tweaks at no extra cost. After that, you can either take the
          site fully into your own hands (every build ships with a CMS you can
          update) or keep us on.
        </p>
        <p>
          <strong className="text-ink-700">Hosting.</strong> We offer optional
          hosting for a flat monthly fee, quoted when we scope the project. If
          you prefer, we will hand the site over for you to host yourself.
        </p>
        <p>
          <strong className="text-ink-700">Retainer.</strong> Our optional
          monthly retainer covers ongoing changes with a 48-hour turnaround on
          most requests. It is month-to-month with no minimum term; you can
          pause or cancel any month.
        </p>
      </LegalSection>

      <LegalSection heading="Your responsibilities">
        <p>
          You confirm that any content, logos, images, or other material you
          give us is yours to use or properly licensed, and that we may use it
          to build your project. You are responsible for reviewing the work and
          giving timely feedback so we can hit the agreed timeline.
        </p>
      </LegalSection>

      <LegalSection heading="Liability">
        <p>
          We take real care with every build, but we provide our services
          &ldquo;as is&rdquo; and cannot guarantee specific business outcomes
          such as traffic, rankings, or revenue. To the extent the law allows,
          our total liability for any claim relating to a project is limited to
          the fees you paid us for that project. We are not liable for indirect
          or consequential losses.
        </p>
      </LegalSection>

      <LegalSection heading="Confidentiality">
        <p>
          We keep what you share with us confidential and use it only to do your
          work. We expect the same care with anything we share with you.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These terms are governed by the laws of the Republic of South Africa,
          and any dispute will be dealt with there.
        </p>
      </LegalSection>

      <LegalSection heading="Changes and contact">
        <p>
          We may update these terms from time to time; the current version
          always lives on this page. Questions about anything here? Email{' '}
          <a href="mailto:hello@swash.studio" className="text-ink-700 underline decoration-lime-300 underline-offset-4">hello@swash.studio</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
