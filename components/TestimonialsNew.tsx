import Image from "next/image";

const testimonials = [
  {
    id: 1,
    quote:
      "As the Team Lead of the IT division, Flavius was a passionate worker who knew how to motivate his team. He was always friendly and encouraging, while assertive enough to make sure no deadlines are passed.",
    name: "Alexandru Predescu",
    role: "Director of IT @ SiSC",
    photo: "/predescu.jpg",
  },
  {
    id: 2,
    quote:
      "Flavius was the person I learned with for every exam, and the person with whom I realized every team project. He is smart, dedicated to programming, and very organized. I had a lot to learn from him.",
    name: "Andreea Maria Constantin",
    role: "Dev Engineer @ ING Hubs",
    photo: "/andreea.jpg",
  },
  {
    id: 3,
    quote:
      "I highly recommend Flavius as a software developer. He's incredibly innovative, hardworking, and always open to new ideas. His problem-solving skills and adaptability make him a valuable teammate.",
    name: "Radu Petruța",
    role: "Full Stack Engineer @ Operative",
    photo: "/petruta.jpg",
  },
];

const TestimonialsNew = () => {
  return (
    <section id="testimonials" className="py-20 relative">
      {/* Section header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-cyan-400 font-mono">&gt;</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            peer<span className="text-cyan-400">.</span>reviews
          </h2>
        </div>
        <p className="text-gray-400 font-mono text-sm ml-6">
          // cat testimonials.json | jq &apos;.reviews[]&apos;
        </p>
      </div>

      {/* Testimonials grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, idx) => (
          <div
            key={testimonial.id}
            className="group bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300 relative overflow-hidden"
          >
            {/* Quote mark */}
            <div className="absolute top-4 right-4 text-6xl text-cyan-500/10 font-serif">
              &ldquo;
            </div>

            {/* JSON-style index */}
            <div className="text-cyan-500/30 font-mono text-sm mb-4">
              [{idx}]:
            </div>

            {/* Quote */}
            <blockquote className="text-gray-300 text-sm leading-relaxed mb-6 relative z-10">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-cyan-500/10">
              <Image
                src={testimonial.photo}
                alt={testimonial.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div>
                <div className="text-white font-medium text-sm">
                  {testimonial.name}
                </div>
                <div className="text-cyan-400 font-mono text-xs">
                  {testimonial.role}
                </div>
              </div>
            </div>

            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsNew;
