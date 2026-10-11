import Image from "next/image";

export type Annotation = {
  path?: string;
  text?: string;
  x?: number;
  y?: number;
};
export type ComparisonImage = {
  src: string;
  alt: string;
  annotations?: Annotation[];
};

export function BeforeAfter({
  before,
  after,
  caption,
}: {
  before: ComparisonImage;
  after: ComparisonImage;
  caption: string;
}) {
  return (
    <div>
      <div className="service-pair">
        {[
          { label: "Before", image: before },
          { label: "After", image: after },
        ].map(({ label, image }) => (
          <figure key={label}>
            <figcaption>{label}</figcaption>
            <div className="service-frame">
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={600}
                sizes="(max-width: 600px) 100vw, 448px"
              />
              <svg viewBox="0 0 800 600" aria-hidden="true" focusable="false">
                {image.annotations?.map((mark, index) => (
                  <g key={index}>
                    {mark.path && (
                      <path className="service-ink" d={mark.path} />
                    )}
                    {mark.text && (
                      <text
                        className="service-annotation"
                        x={mark.x}
                        y={mark.y}
                      >
                        {mark.text}
                      </text>
                    )}
                  </g>
                ))}
              </svg>
            </div>
          </figure>
        ))}
      </div>
      <p className="service-caption">{caption}</p>
    </div>
  );
}
