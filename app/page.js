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
      {/* Enhanced Background with Beige Accents */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1A1614] to-black" />

        {/* Enhanced Beige Accent Circles */}
        <div className="absolute top-20 left-[20%] w-[600px] h-[600px] bg-gradient-radial from-[#DEB887]/10 to-transparent rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-40 right-[10%] w-[700px] h-[700px] bg-gradient-radial from-[#D2B48C]/10 to-transparent rounded-full blur-[150px] animate-pulse-slow delay-700" />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-gradient-radial from-[#BC8F8F]/8 to-transparent rounded-full blur-[100px] animate-float" />

        {/* Animated Light Beams */}
        <div className="absolute inset-0">
          <div className="light-beam-1" />
          <div className="light-beam-2" />
        </div>

        {/* Enhanced Grain Texture */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-noise" />
      </div>

      {/* Content wrapper with glass effect */}
      <div className="relative z-10">
        <div className="absolute inset-0 backdrop-blur-[1px]" />
        <Navbar />

        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
          {/* Glowing Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-beige/5 rounded-full blur-3xl animate-pulse delay-500" />
          </div>

          {/* Content */}
          <div className="text-center z-10 max-w-6xl mx-auto relative">
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

            <h1
              className={cn(
                "text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8 relative",
                styles.title
              )}
            >
              <span
                className={cn(
                  styles.visible,
                  "bg-clip-text text-transparent bg-gradient-to-r from-[#5C4033] via-[#8B4513] to-[#A0522D] relative z-10"
                )}
              >
                Screen Recordings
              </span>
              <br />
              <span
                className={cn(
                  styles.accentText,
                  "bg-clip-text text-transparent bg-gradient-to-r from-[#DEB887] to-[#F5DEB3] relative z-10"
                )}
              >
                Made Beautiful
              </span>
            </h1>
            <p className="font-cursive italic text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              "Where vision meets efficiency, and dreams transform into
              deliverables"
            </p>

            <div className="flex items-center justify-center gap-6">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 border-beige/20 text-beige hover:bg-beige/10 font-medium flex items-center gap-2"
              >
                <ArrowRight className="w-5 h-5" />
                Signup — It's Free
              </Button>
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section with scroll animation */}
        <section className="container mx-auto py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-white mb-12">
              Empowering your business for tomorrow
            </h2>
            <div
              ref={ref}
              className={cn(
                "rounded-2xl overflow-hidden transition-all duration-700 transform",
                "bg-[#1A1A1A]", // Dark background
                "border border-gray-800",
                "shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)]",
                "hover:shadow-[0_0_50px_-6px_rgba(255,255,255,0.1)]",
                "hover:scale-[1.02] transition-transform duration-500",
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
            >
              <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-blue-500/5" />

                {/* Dashboard image */}
                <Image
                  src="/dash.webp" // Make sure to add your dashboard image
                  alt="Dashboard Preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-gray-700 rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-gray-700 rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-gray-700 rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-gray-700 rounded-br-2xl" />
              </div>
            </div>

            <p className="text-center text-gray-400 mt-8 max-w-2xl mx-auto">
              No matter what project you're working on, we've got you covered
              with the best wireframe kits for any platform.
            </p>
          </div>
        </section>

        {/* Your existing features section */}
      </div>
    </main>
  );
}
