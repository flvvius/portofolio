export function PricingRows({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div>
      <article className="service-pricing-row">
        <div>
          <Heading>Taste audit</Heading>
          <p className="service-price">EUR 300</p>
          <p className="service-caption">Fixed price. No call needed.</p>
        </div>
        <div>
          <p>
            One flow, a recorded walkthrough, ten ranked fixes and one screen as
            an annotated mockup or isolated coded preview.
          </p>
          <p className="service-muted" style={{ marginTop: 12 }}>
            Within 3 business days of complete intake. Full refund if it isn't
            useful.
          </p>
        </div>
      </article>
      <article className="service-pricing-row">
        <div>
          <Heading>Polish sprint</Heading>
          <p className="service-price">From EUR 1,500</p>
        </div>
        <div>
          <p>One flow or 3 to 5 screens, implemented as reviewable PRs.</p>
          <p className="service-muted" style={{ marginTop: 12 }}>
            Quote and timing after a codebase check. Your audit fee is credited.
          </p>
        </div>
      </article>
    </div>
  );
}
