export function PricingRows() {
  return (
    <div>
      <article className="service-pricing-row">
        <div>
          <h3>Taste audit</h3>
          <p className="service-price">EUR 300</p>
          <p className="service-caption">Fixed price. No call needed.</p>
        </div>
        <div>
          <p>
            One agreed flow. A recorded walkthrough, your top 10 fixes ranked,
            and one redesigned screen as an annotated mockup or isolated coded
            preview.
          </p>
          <p className="service-muted" style={{ marginTop: 12 }}>
            Delivered within 3 business days after complete intake. Full refund
            if it isn't useful.
          </p>
        </div>
      </article>
      <article className="service-pricing-row">
        <div>
          <h3>Polish sprint</h3>
          <p className="service-price">From EUR 1,500</p>
        </div>
        <div>
          <p>
            One flow or 3 to 5 screens, implemented as reviewable pull requests
            in your codebase.
          </p>
          <p className="service-muted" style={{ marginTop: 12 }}>
            Final quote and timing after a codebase check. Your audit fee is
            credited if you upgrade.
          </p>
        </div>
      </article>
    </div>
  );
}
