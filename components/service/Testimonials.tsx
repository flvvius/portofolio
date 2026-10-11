import { testimonials, testimonialsEnabled } from "@/data/service";
export function Testimonials() {
  if (!testimonialsEnabled || !testimonials.length) return null;
  return <section className="service-section" aria-labelledby="testimonials"><h2 id="testimonials">What people say</h2>{testimonials.map(item => <figure key={item.name}><blockquote><p>{item.quote}</p></blockquote><figcaption>{item.name}, {item.role}</figcaption></figure>)}</section>;
}
