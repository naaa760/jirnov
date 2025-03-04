"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Layout,
  Calendar,
  BarChart,
  ArrowRight,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CompanyCarousel from "@/components/company-carousel";
import Image from "next/image";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import styles from "./page.module.css";
import { useInView } from "react-intersection-observer";
import { useScroll, motion, useTransform } from "framer-motion";
import { useRef } from "react";

const faqs = [
  {
    question: "What is ZCRUM?",
    answer:
      "ZCRUM is a powerful project management tool designed to help teams organize, track, and manage their work efficiently. It combines intuitive design with robust features to streamline your workflow and boost productivity.",
  },
  {
    question: "How does ZCRUM compare to other project management tools?",
    answer:
      "ZCRUM offers a unique combination of intuitive design, powerful features, and flexibility. Unlike other tools, we focus on providing a seamless experience for both agile and traditional project management methodologies, making it versatile for various team structures and project types.",
  },
  {
    question: "Is ZCRUM suitable for small teams?",
    answer:
      "Absolutely! ZCRUM is designed to be scalable and flexible. It works great for small teams and can easily grow with your organization as it expands. Our user-friendly interface ensures that teams of any size can quickly adapt and start benefiting from ZCRUM's features.",
  },
  {
    question: "What key features does ZCRUM offer?",
    answer:
      "ZCRUM provides a range of powerful features including intuitive Kanban boards for visualizing workflow, robust sprint planning tools for agile teams, comprehensive reporting for data-driven decisions, customizable workflows, time tracking, and team collaboration tools. These features work seamlessly together to enhance your project management experience.",
  },
  {
    question: "Can ZCRUM handle multiple projects simultaneously?",
    answer:
      "Yes, ZCRUM is built to manage multiple projects concurrently. You can easily switch between projects, and get a bird's-eye view of all your ongoing work. This makes ZCRUM ideal for organizations juggling multiple projects or clients.",
  },
  {
    question: "Is there a learning curve for new users?",
    answer:
      "While ZCRUM is packed with features, we've designed it with user-friendliness in mind. New users can quickly get up to speed thanks to our intuitive interface, helpful onboarding process, and comprehensive documentation.",
  },
];

const features = [
  {
    title: "Intuitive Kanban Boards",
    description:
      "Visualize your workflow and optimize team productivity with our easy-to-use Kanban boards.",
    icon: Layout,
  },
  {
    title: "Powerful Sprint Planning",
    description:
      "Plan and manage sprints effectively, ensuring your team stays focused on delivering value.",
    icon: Calendar,
  },
  {
    title: "Comprehensive Reporting",
    description:
      "Gain insights into your team's performance with detailed, customizable reports and analytics.",
    icon: BarChart,
  },
];

export default function Home() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { scrollYProgress } = useScroll();

  // Create transform values for floating images with enhanced downward animation
  const floatingImageProps = {
    initial: { opacity: 1, scale: 1, y: 0 },
    style: {
      opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]),
      scale: useTransform(scrollYProgress, [0, 0.3], [1, 0.95]),
      y: useTransform(scrollYProgress, [0, 0.3], [0, 300]), // Increased downward movement
      transition: { duration: 3, ease: "easeOut" },
      willChange: "transform, opacity",
    },
  };

  // Different timing and movement for each image
  const imageVariants = {
    first: {
      ...floatingImageProps,
      style: {
        ...floatingImageProps.style,
        y: useTransform(scrollYProgress, [0, 0.25], [0, 250]),
        opacity: useTransform(scrollYProgress, [0, 0.25], [1, 0]),
      },
    },
    second: {
      ...floatingImageProps,
      style: {
        ...floatingImageProps.style,
        y: useTransform(scrollYProgress, [0.05, 0.3], [0, 350]),
        opacity: useTransform(scrollYProgress, [0.05, 0.3], [1, 0]),
      },
    },
    third: {
      ...floatingImageProps,
      style: {
        ...floatingImageProps.style,
        y: useTransform(scrollYProgress, [0.1, 0.35], [0, 400]),
        opacity: useTransform(scrollYProgress, [0.1, 0.35], [1, 0]),
      },
    },
    fourth: {
      ...floatingImageProps,
      style: {
        ...floatingImageProps.style,
        y: useTransform(scrollYProgress, [0.15, 0.4], [0, 300]),
        opacity: useTransform(scrollYProgress, [0.15, 0.4], [1, 0]),
      },
    },
  };

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Add this right after the main opening tag to create a global background effect */}
      <div className="absolute inset-0 bg-gradient-radial from-[#1A1614] via-black to-black" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-[20%] w-[800px] h-[800px] bg-gradient-radial from-[#DEB887]/5 to-transparent rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-40 right-[10%] w-[600px] h-[600px] bg-gradient-radial from-[#8B4513]/5 to-transparent rounded-full blur-[100px] animate-pulse-slow delay-700" />
      </div>

      {/* Content wrapper - Remove the blur effect */}
      <div className="relative z-10">
        <Navbar className="text-white" />

        {/* Also update these background effects to be less blurry */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1A1614] to-black" />

          {/* Reduce blur radius on accent circles */}
          <div className="absolute top-20 left-[20%] w-[600px] h-[600px] bg-gradient-radial from-[#DEB887]/10 to-transparent rounded-full blur-[60px] animate-pulse-slow" />
          <div className="absolute bottom-40 right-[10%] w-[700px] h-[700px] bg-gradient-radial from-[#D2B48C]/10 to-transparent rounded-full blur-[80px] animate-pulse-slow delay-700" />
          <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-gradient-radial from-[#BC8F8F]/8 to-transparent rounded-full blur-[40px] animate-float" />

          {/* Keep light beams and grain texture as they are */}
          <div className="absolute inset-0">
            <div className="light-beam-1" />
            <div className="light-beam-2" />
          </div>
          <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-noise" />
        </div>

        {/* Update hero section glowing effects to be less blurry */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-beige/5 rounded-full blur-xl animate-pulse delay-500" />
        </div>

        {/* Hero Section - Reduced sizes */}
        <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 pb-24">
          {/* Sparkle/Star Effect Layer */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{
                  opacity: 0.1,
                  scale: 0.5,
                  x: Math.random() * window?.innerWidth || 1000,
                  y: Math.random() * window?.innerHeight || 1000,
                }}
                animate={{
                  opacity: [0.1, 0.8, 0.1],
                  scale: [0.5, 1, 0.5],
                  y: [null, "-20vh"],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 2,
                }}
                style={{
                  filter: "blur(0.5px)",
                  boxShadow: "0 0 4px 1px rgba(255,255,255,0.4)",
                }}
              />
            ))}
          </div>

          {/* Static Stars Background */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="star"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  "--duration": `${Math.random() * 3 + 2}s`,
                  "--delay": `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Shooting Stars */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent"
                style={{
                  width: "100px",
                  transform: "rotate(-45deg)",
                }}
                initial={{
                  x: "-100%",
                  y: Math.random() * 500,
                  opacity: 0,
                }}
                animate={{
                  x: "200%",
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 10 + 5,
                  ease: "linear",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Floating Images around the text */}
          <motion.div
            className="absolute -left-24 top-0 w-24 h-24 floating-image"
            {...imageVariants.first}
          >
            <Image
              src="/i1.png"
              alt="Feature 1"
              fill
              className="object-contain"
            />
          </motion.div>

          <motion.div
            className="absolute -right-20 top-12 w-20 h-20 floating-image"
            {...imageVariants.second}
          >
            <Image
              src="/i2.png"
              alt="Feature 2"
              fill
              className="object-contain"
            />
          </motion.div>

          <motion.div
            className="absolute -left-16 bottom-0 w-16 h-16 floating-image"
            {...imageVariants.third}
          >
            <Image
              src="/i3.png"
              alt="Feature 3"
              fill
              className="object-contain"
            />
          </motion.div>

          <motion.div
            className="absolute -right-24 bottom-12 w-24 h-24 floating-image"
            {...imageVariants.fourth}
          >
            <Image
              src="/i4.png"
              alt="Feature 4"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Add subtle shine effect behind the title */}
          <div className="absolute -inset-x-20 top-0 -bottom-20 bg-gradient-radial from-beige/20 to-transparent opacity-50 blur-2xl" />

          <h1 className="text-center space-y-2">
            <span
              className={cn(
                styles.visible,
                "block text-[42px] sm:text-[52px] md:text-[64px] font-medium leading-[1.1] bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#CD853F] bg-clip-text text-transparent relative z-10"
              )}
            >
              Screen Recordings
            </span>
            <span
              className={cn(
                styles.accentText,
                "block text-[42px] sm:text-[52px] md:text-[64px] font-medium leading-[1.1] bg-gradient-to-r from-[#DEB887] via-[#F5DEB3] to-[#FFDEAD] bg-clip-text text-transparent relative z-10"
              )}
            >
              Made Beautiful
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[#DEB887]/80 max-w-2xl mx-auto mt-8 mb-12 italic text-center">
            "Where vision meets efficiency, and dreams transform into
            deliverables"
          </p>

          <div className="flex items-center justify-center gap-6">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 border-beige/20 text-beige hover:bg-beige/10 font-medium flex items-center gap-2"
            >
              m
              <ArrowRight className="w-5 h-5" />
              Signup — It's Free
            </Button>
          </div>
        </section>

        {/* Partner Logos - Reduced sizes */}
        <section className="relative py-24 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4">
            <div className="relative">
              <div className="flex gap-x-6 sm:gap-x-8 md:gap-x-12 logos-slide animate-marquee">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Image
                    key={num}
                    src={`/${num}.svg`}
                    alt={`Partner Logo ${num}`}
                    width={60}
                    height={40}
                    className="w-[60px] sm:w-[80px] md:w-[100px] lg:w-[120px] h-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    priority
                  />
                ))}
              </div>

              <div className="flex gap-x-6 sm:gap-x-8 md:gap-x-12 logos-slide animate-marquee2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Image
                    key={num}
                    src={`/${num}.svg`}
                    alt={`Partner Logo ${num}`}
                    width={60}
                    height={40}
                    className="w-[60px] sm:w-[80px] md:w-[100px] lg:w-[120px] h-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    priority
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Insights Section - Reduced sizes */}
        <section className="relative z-10 py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-100px",
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="max-w-6xl mx-auto relative z-10"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Metrics Insights
                </h2>
                <p className="text-base text-gray-400 max-w-xl mx-auto">
                  Gain deeper understanding and drive strategic decisions with
                  actionable data analytics.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold">
                      <span className="text-[#4A9DFF]">Speed up</span>{" "}
                      <span className="text-white">your process</span>
                    </h3>
                    <p className="text-gray-400 text-lg">
                      Streamline operations effortlessly with our integrated
                      tool solutions, ensuring a cohesive workflow environment.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { icon: "⚡", text: "Reducing errors by 25%" },
                      { icon: "📈", text: "Increase team productivity by 30%" },
                      { icon: "💻", text: "Reducing IT overhead" },
                      {
                        icon: "🔄",
                        text: "Unified user experience across applications",
                      },
                      { icon: "✨", text: "...And more" },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 group border-gradient-beige rounded-xl p-4 hover:bg-gradient-beige-subtle transition-all duration-300"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-b from-[#DEB887] to-[#8B4513] bg-opacity-10 flex items-center justify-center glow-beige-hover">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#DEB887] to-[#8B4513]" />
                        </div>
                        <span className="text-gray-300 group-hover:text-beige transition-colors">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-6 pt-4">
                    {[
                      { number: "500+", label: "Downloads" },
                      { number: "400+", label: "App store reviews" },
                      { number: "5.0", label: "Ratings" },
                    ].map((metric, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="text-center group"
                      >
                        <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-beige to-beige/70 bg-clip-text text-transparent group-hover:from-beige group-hover:to-white transition-all duration-300">
                          {metric.number}
                        </div>
                        <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                          {metric.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, rotateY: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative perspective-[2000px] w-full"
                >
                  <motion.div
                    className="relative preserve-3d w-full flex items-center justify-center"
                    animate={{
                      rotateY: 360,
                    }}
                    transition={{
                      duration: 20,
                      ease: "linear",
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  >
                    <div className="w-[90%] md:w-[80%]">
                      <Image
                        src="/cl.png"
                        alt="Metrics Dashboard"
                        width={600}
                        height={400}
                        className="w-full h-auto backface-hidden object-contain"
                        priority
                        quality={100}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Client Management Section - Reduced sizes */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6 lg:max-w-[90%]">
                <h2 className="text-[48px] font-medium leading-tight text-white">
                  Working with clients
                  <span className="block">can get messy.</span>
                  <span className="block">Not with Orchestra.</span>
                </h2>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 mt-1 flex items-center justify-center rounded-full bg-white/10 text-white text-sm">
                      1
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base text-white/90">
                          A space designed for agencies and their teams
                        </h3>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-white/40"
                        >
                          <path
                            d="M7 17L17 7M17 7H8M17 7V16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <p className="mt-1.5 text-sm text-[#98989A] leading-relaxed">
                        Offer each customer a dedicated client portal while
                        managing all clients, team members, and collaborators in
                        one place. No more switching apps or tabs—boost your
                        agency's efficiency instantly.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 mt-1 flex items-center justify-center rounded-full bg-white/10 text-white text-sm">
                      2
                    </div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base text-white/90">
                        Stay organized and work with tasks
                      </h3>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-white/40"
                      >
                        <path
                          d="M7 17L17 7M17 7H8M17 7V16"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 mt-1 flex items-center justify-center rounded-full bg-white/10 text-white text-sm">
                      3
                    </div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base text-white/90">
                        Share knowledge with documents
                      </h3>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-white/40"
                      >
                        <path
                          d="M7 17L17 7M17 7H8M17 7V16"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative lg:-right-12 xl:-right-24">
                <div className="relative w-[120%]">
                  <Image
                    src="/dashboard.png"
                    alt="Orchestra Dashboard"
                    width={1000}
                    height={625}
                    className="w-full h-auto rounded-lg"
                    quality={100}
                    priority
                  />

                  <div className="absolute inset-0 rounded-lg shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section - Reduced sizes */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-white mb-10">
                Empowering your business for tomorrow
              </h2>
              <div
                ref={ref}
                className={cn(
                  "rounded-2xl overflow-hidden transition-all duration-700 transform",
                  "bg-[#1A1A1A]",
                  "border border-gray-800",
                  "shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)]",
                  "hover:shadow-[0_0_50px_-6px_rgba(255,255,255,0.1)]",
                  "hover:scale-[1.02] transition-transform duration-500",
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                )}
              >
                <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-blue-500/5" />

                  <Image
                    src="/dash.webp"
                    alt="Dashboard Preview"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                  />

                  <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-gray-700 rounded-tl-2xl" />
                  <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-gray-700 rounded-tr-2xl" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-gray-700 rounded-bl-2xl" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-gray-700 rounded-br-2xl" />
                </div>
              </div>

              <p className="text-center text-gray-400 mt-6 max-w-xl mx-auto text-sm">
                No matter what project you're working on, we've got you covered
                with the best wireframe kits for any platform.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section with Zig-zag Layout */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Standard Plan - Left Positioned */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative group w-[380px] -rotate-6 ml-4"
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-b from-[#1A1A1A] to-black border border-white/5 overflow-hidden">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-semibold text-white">
                        STANDARD
                      </h3>
                      <div className="px-3 py-1 text-sm text-white/80 rounded-full bg-white/5">
                        Free • Personal
                      </div>
                    </div>

                    <p className="text-gray-400 mb-8">
                      Ideal for individuals new to Fineva
                    </p>

                    <ul className="space-y-4 mb-8">
                      <li className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-white/20 rounded-full mr-3" />
                        Limited transaction insights
                      </li>
                      <li className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-white/20 rounded-full mr-3" />
                        Core financial management features
                      </li>
                      <li className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-white/20 rounded-full mr-3" />
                        Basic customer support
                      </li>
                    </ul>

                    <button className="w-full py-3 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors group-hover:bg-white/10">
                      Get Started
                      <span className="ml-2">→</span>
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Premium Plan - Center and Higher */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative group w-[380px] mx-auto -mt-12 z-10"
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-b from-[#2A2A2A] to-[#1A1A1A] border border-white/10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] to-transparent" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-semibold text-white">
                        PREMIUM
                      </h3>
                      <div className="px-3 py-1 text-sm text-white/80 rounded-full bg-white/10">
                        $12.99/month • Personal
                      </div>
                    </div>

                    <p className="text-gray-400 mb-8">
                      Perfect for users seeking advanced tools
                    </p>

                    <ul className="space-y-4 mb-8">
                      <li className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-white/30 rounded-full mr-3" />
                        Enhanced transaction analytics
                      </li>
                      <li className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-white/30 rounded-full mr-3" />
                        Priority customer support
                      </li>
                      <li className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-white/30 rounded-full mr-3" />
                        Access to premium features
                      </li>
                    </ul>

                    <button className="w-full py-3 rounded-full bg-white text-black hover:bg-white/90 transition-colors">
                      Get Started
                      <span className="ml-2">→</span>
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Enterprise Plan - Right Positioned */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative group w-[380px] rotate-6 ml-auto -mt-12"
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-b from-[#242424] to-[#1A1A1A] border border-white/5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-semibold text-white">
                        ENTERPRISE
                      </h3>
                      <div className="px-3 py-1 text-sm text-white/80 rounded-full bg-white/5">
                        $24.99/month • Business
                      </div>
                    </div>

                    <p className="text-gray-400 mb-8">
                      Tailored for small businesses and enterprises
                    </p>

                    <ul className="space-y-4 mb-8">
                      <li className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-white/20 rounded-full mr-3" />
                        Comprehensive financial insights
                      </li>
                      <li className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-white/20 rounded-full mr-3" />
                        Dedicated account manager
                      </li>
                      <li className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-white/20 rounded-full mr-3" />
                        Multi-user access
                      </li>
                    </ul>

                    <button className="w-full py-3 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors group-hover:bg-white/10">
                      Get Started
                      <span className="ml-2">→</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Add decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-gradient-to-l from-blue-500/10 to-transparent rounded-full blur-3xl" />
          </div>
        </section>

        {/* Schedule Demo Section */}
        <section className="py-24 relative overflow-hidden">
          {/* Background gradients */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1614] to-black/90" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#DEB887]/5 via-transparent to-[#8B4513]/5" />

            {/* Animated gradient orbs */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-[#DEB887]/10 to-transparent rounded-full blur-[80px] animate-pulse-slow" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-[#8B4513]/10 to-transparent rounded-full blur-[80px] animate-pulse-slow delay-700" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#DEB887]/5 to-transparent rounded-full blur-[100px] animate-pulse-slow delay-300" />
          </div>

          {/* Content container with enhanced backdrop */}
          <div className="container mx-auto px-4 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent backdrop-blur-[2px]" />
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start relative">
              {/* Left Content */}
              <div className="space-y-8">
                <h2 className="text-[48px] font-medium leading-tight text-white">
                  Schedule demo
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  We're here to assist you every step of the way. Whether you
                  have questions, feedback, or are interested in collaborating,
                  don't hesitate to reach out.
                </p>

                {/* Updated Feature Points */}
                <div className="space-y-5">
                  {[
                    {
                      title: "Connect all your tools in one place",
                      description:
                        "Seamlessly integrate with your existing workflow",
                    },
                    {
                      title: "Stay ahead with cutting-edge features",
                      description:
                        "Access the latest innovations in project management",
                    },
                    {
                      title: "Tailor our platform to your needs",
                      description:
                        "Customize your workspace exactly how you want it",
                    },
                    {
                      title: "24/7 Support: Always here to help",
                      description: "Get assistance whenever you need it",
                    },
                    {
                      title: "And much more to explore",
                      description:
                        "Discover all the powerful features we offer",
                    },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 group border-gradient-beige rounded-xl p-4 hover:bg-gradient-beige-subtle transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-b from-[#DEB887] to-[#8B4513] bg-opacity-10 flex items-center justify-center glow-beige-hover">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#DEB887] to-[#8B4513]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white/90 group-hover:text-[#DEB887] transition-colors">
                          {feature.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Form - Updated styling with adjusted width and matching pricing card style */}
              <div className="relative group max-w-lg mx-auto lg:ml-auto">
                {/* Background gradient effects - Updated to match pricing cards */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#2A2A2A] to-[#1A1A1A] rounded-2xl backdrop-blur-md" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] to-transparent rounded-2xl border border-white/10" />

                {/* Glow effects - Updated to match pricing cards */}
                <div className="absolute -inset-0.5 bg-gradient-to-b from-[#DEB887]/20 to-[#8B4513]/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Form content */}
                <div className="relative p-7 rounded-2xl">
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm text-white/80 mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 text-sm rounded-lg bg-gradient-beige-subtle border-gradient-beige focus:glow-beige transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-white/80 mb-1.5">
                        First name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your first name"
                        className="w-full px-3 py-2 text-sm rounded-lg bg-gradient-beige-subtle border-gradient-beige focus:glow-beige transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-white/80 mb-1.5">
                        Last name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your last name"
                        className="w-full px-3 py-2 text-sm rounded-lg bg-gradient-beige-subtle border-gradient-beige focus:glow-beige transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-white/80 mb-1.5">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="w-full px-3 py-2 text-sm rounded-lg bg-gradient-beige-subtle border-gradient-beige focus:glow-beige transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-white/80 mb-1.5">
                        Message
                      </label>
                      <textarea
                        placeholder="Enter your message"
                        rows={3}
                        className="w-full px-3 py-2 text-sm rounded-lg bg-gradient-beige-subtle border-gradient-beige focus:glow-beige transition-all duration-300 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-beige hover:opacity-90 transition-all duration-300 glow-beige-hover"
                    >
                      Send
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M1 8h14M9 2l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
