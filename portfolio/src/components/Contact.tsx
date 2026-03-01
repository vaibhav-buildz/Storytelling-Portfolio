"use client";

import { motion } from "framer-motion";

export default function Contact() {
    return (
        <section id="contact" className="relative w-full py-32 bg-[#121212] z-30 overflow-hidden flex flex-col">

            <div className="w-full flex justify-center mb-24 px-4 overflow-hidden">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                    className="text-[12vw] font-cormorant italic font-bold leading-none text-transparent whitespace-nowrap opacity-40 select-none pointer-events-none"
                    style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.3)" }}
                >
                    LET&apos;S TALK
                </motion.h2>
            </div>

            <div className="max-w-7xl mx-auto w-full px-6 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-20">

                {/* Left Column: Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    className="flex flex-col gap-12"
                >
                    <div>
                        <span className="uppercase text-xs font-mono tracking-widest text-white/40 mb-2 block">Reach Out</span>
                        <a
                            href="mailto:itzvaibhav@gmail.com"
                            className="text-3xl md:text-5xl lg:text-6xl font-sans tracking-tight hover:text-[#ff5533] transition-colors relative group block w-fit"
                            data-hoverable="true"
                        >
                            itzvaibhav@gmail.com
                            <span className="absolute left-0 bottom-0 w-0 h-1 bg-[#ff5533] transition-all duration-500 group-hover:w-full" />
                        </a>
                    </div>

                    <div>
                        <span className="uppercase text-xs font-mono tracking-widest text-white/40 mb-2 block">Location</span>
                        <p className="text-xl md:text-2xl font-light text-white/80">Greater Noida, India</p>
                    </div>

                    <div className="flex gap-6 mt-8">
                        {["GitHub", "LinkedIn", "Twitter"].map(social => (
                            <a
                                key={social}
                                href="#"
                                className="px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-colors font-medium text-sm"
                                data-hoverable="true"
                            >
                                {social}
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* Right Column: Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="flex flex-col gap-8"
                >
                    <div className="relative group">
                        <input
                            type="text"
                            id="name"
                            className="w-full bg-white/[0.02] border-b border-white/20 px-4 py-5 outline-none focus:border-[#00ff88] transition-colors peer text-white rounded-t-lg"
                            placeholder=" "
                            autoComplete="off"
                        />
                        <label
                            htmlFor="name"
                            className="absolute left-4 top-5 text-white/40 transition-all peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-[#00ff88] peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none"
                        >
                            Name
                        </label>
                    </div>

                    <div className="relative group">
                        <input
                            type="email"
                            id="email"
                            className="w-full bg-white/[0.02] border-b border-white/20 px-4 py-5 outline-none focus:border-[#00ff88] transition-colors peer text-white rounded-t-lg"
                            placeholder=" "
                            autoComplete="off"
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-4 top-5 text-white/40 transition-all peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-[#00ff88] peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none"
                        >
                            Email Address
                        </label>
                    </div>

                    <div className="relative group">
                        <textarea
                            id="message"
                            rows={4}
                            className="w-full bg-white/[0.02] border-b border-white/20 px-4 py-5 outline-none focus:border-[#00ff88] transition-colors peer text-white rounded-t-lg resize-none"
                            placeholder=" "
                        />
                        <label
                            htmlFor="message"
                            className="absolute left-4 top-5 text-white/40 transition-all peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-[#00ff88] peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none"
                        >
                            Your Message
                        </label>
                    </div>

                    <button
                        type="button"
                        className="w-fit px-10 py-4 bg-white text-black rounded-full font-medium tracking-wide hover:scale-105 active:scale-95 transition-transform"
                        data-hoverable="true"
                    >
                        Send Message
                    </button>
                </motion.div>

            </div>
        </section>
    );
}
