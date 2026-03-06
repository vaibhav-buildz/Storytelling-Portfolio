import { Shield, Code, Terminal } from "lucide-react";
import DisplayCards from "./ui/display-cards";

export default function Certifications() {
    const certCards = [
        {
            icon: <Terminal className="size-4 text-[#00bfff]" />,
            title: "Git Fundamentals",
            description: "Advanced Version Control",
            date: "2026",
            link: "#", // Replace with your actual certificate URL
            iconClassName: "text-[#00bfff]",
            titleClassName: "text-[#00bfff] font-mono",
            className:
                "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/80 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 bg-[url('https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2688&auto=format&fit=crop')] bg-cover bg-center overflow-hidden",
        },
        {
            icon: <Code className="size-4 text-[#00ff88]" />,
            title: "Python Programming",
            description: "Software Development",
            date: "2026",
            link: "#", // Replace with your actual certificate URL
            iconClassName: "text-[#00ff88]",
            titleClassName: "text-[#00ff88] font-mono",
            className:
                "[grid-area:stack] translate-x-6 translate-y-6 md:translate-x-12 md:translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/80 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center overflow-hidden",
        },
        {
            icon: <Shield className="size-4 text-[#ffcb4d]" />,
            title: "Ethical Hacking",
            description: "A hands-on course covering ethical hacking methodologies, penetration testing techniques, vulnerability assessment, web application security, and real-world offensive security practices.",
            date: "2025",
            link: "#", // Replace with your actual certificate URL
            iconClassName: "text-[#ffcb4d]",
            titleClassName: "text-[#ffcb4d] font-mono",
            className:
                "[grid-area:stack] translate-x-12 translate-y-12 md:translate-x-24 md:translate-y-20 hover:translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/80 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center overflow-hidden",
        },
    ];

    return (
        <section id="certs" className="relative w-full py-32 bg-[#121212] z-30 min-h-screen flex items-center overflow-hidden">
            <div className="max-w-7xl mx-auto w-full px-6 md:px-16 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">

                {/* Text Content Block */}
                <div className="flex flex-col items-start text-left lg:w-1/2">
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium text-[#f2ede4] mb-4 tracking-tight">
                        Verified{" "}
                        <span className="font-cormorant italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00bfff] to-[#00ff88]">
                            Expertise.
                        </span>
                    </h3>
                    <p className="text-white/40 font-mono text-sm mt-2 mb-8 tracking-widest uppercase">
                        {`// Continuous learning & credentials`}
                    </p>
                    <p className="text-white/70 text-lg leading-relaxed max-w-md">
                        Committed to mastering new technologies and modern paradigms.
                        Hover over the cards to explore the certifications that back my architectural decisions.
                    </p>
                    {/* Background embellishment */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#00bfff]/5 rounded-full blur-[120px] pointer-events-none -z-10" />
                </div>

                {/* Display Cards Block */}
                <div className="lg:w-1/2 flex justify-center lg:justify-end mt-12 lg:mt-0 relative">
                    <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#00ff88]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
                    <DisplayCards cards={certCards} />
                </div>
            </div>
        </section>
    );
}
