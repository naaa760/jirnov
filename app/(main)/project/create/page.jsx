"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useOrganization, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { projectSchema } from "@/app/lib/validators";
import { createProject } from "@/actions/projects";
import { BarLoader } from "react-spinners";
import OrgSwitcher from "@/components/org-switcher";
import styled from "styled-components";

const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.5);
  z-index: 0;
  opacity: 0.1;
  pointer-events: none;

  .main {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loaders,
  .loadersB {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loader {
    position: absolute;
    width: 1.15em;
    height: 13em;
    border-radius: 50px;
    background: #deb887;
  }

  .loader:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 1.15em;
    height: 5em;
    background: #deb887;
    border-radius: 50px;
    border: 1px solid #deb887;
    box-shadow: inset 5px 5px 15px rgba(222, 184, 135, 0.2),
      inset -5px -5px 15px rgba(222, 184, 135, 0.2);
    mask-image: linear-gradient(
      to bottom,
      black calc(100% - 48px),
      transparent 100%
    );
  }

  .loader::before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 1.15em;
    height: 4.5em;
    background: #deb887;
    border-radius: 50px;
    border: 1px solid #deb887;
    box-shadow: inset 5px 5px 15px rgba(222, 184, 135, 0.2),
      inset -5px -5px 15px rgba(222, 184, 135, 0.2);
    mask-image: linear-gradient(
      to top,
      black calc(100% - 48px),
      transparent 100%
    );
  }

  .loaderA {
    position: absolute;
    width: 1.15em;
    height: 13em;
    border-radius: 50px;
    background: transparent;
  }

  .ball0,
  .ball1,
  .ball2,
  .ball3,
  .ball4,
  .ball5,
  .ball6,
  .ball7,
  .ball8,
  .ball9 {
    width: 1.15em;
    height: 1.15em;
    box-shadow: rgba(222, 184, 135, 0.17) 0px -10px 10px 0px inset,
      rgba(222, 184, 135, 0.15) 0px -15px 15px 0px inset,
      rgba(222, 184, 135, 0.1) 0px -40px 20px 0px inset,
      rgba(222, 184, 135, 0.06) 0px 2px 1px,
      rgba(222, 184, 135, 0.09) 0px 4px 2px,
      rgba(222, 184, 135, 0.09) 0px 8px 4px,
      rgba(222, 184, 135, 0.09) 0px 16px 8px,
      rgba(222, 184, 135, 0.09) 0px 32px 16px,
      0px -1px 15px -8px rgba(222, 184, 135, 0.09);
    border-radius: 50%;
    transition: transform 800ms cubic-bezier(1, -0.4, 0, 1.4);
    background-color: #deb887;
    animation: 3.63s move ease-in-out infinite;
  }

  .loader:nth-child(2) {
    transform: rotate(20deg);
  }
  .loader:nth-child(3) {
    transform: rotate(40deg);
  }
  .loader:nth-child(4) {
    transform: rotate(60deg);
  }
  .loader:nth-child(5) {
    transform: rotate(80deg);
  }
  .loader:nth-child(6) {
    transform: rotate(100deg);
  }
  .loader:nth-child(7) {
    transform: rotate(120deg);
  }
  .loader:nth-child(8) {
    transform: rotate(140deg);
  }
  .loader:nth-child(9) {
    transform: rotate(160deg);
  }

  .loaderA:nth-child(2) {
    transform: rotate(20deg);
  }
  .loaderA:nth-child(3) {
    transform: rotate(40deg);
  }
  .loaderA:nth-child(4) {
    transform: rotate(60deg);
  }
  .loaderA:nth-child(5) {
    transform: rotate(80deg);
  }
  .loaderA:nth-child(6) {
    transform: rotate(100deg);
  }
  .loaderA:nth-child(7) {
    transform: rotate(120deg);
  }
  .loaderA:nth-child(8) {
    transform: rotate(140deg);
  }
  .loaderA:nth-child(9) {
    transform: rotate(160deg);
  }

  .ball1 {
    animation-delay: 0.2s;
  }
  .ball2 {
    animation-delay: 0.4s;
  }
  .ball3 {
    animation-delay: 0.6s;
  }
  .ball4 {
    animation-delay: 0.8s;
  }
  .ball5 {
    animation-delay: 1s;
  }
  .ball6 {
    animation-delay: 1.2s;
  }
  .ball7 {
    animation-delay: 1.4s;
  }
  .ball8 {
    animation-delay: 1.6s;
  }
  .ball9 {
    animation-delay: 1.8s;
  }

  @keyframes move {
    0% {
      transform: translateY(0em);
    }
    50% {
      transform: translateY(12em);
    }
    100% {
      transform: translateY(0em);
    }
  }
`;

const AnimatedGradientText = ({ children, className }) => {
  return (
    <span
      className={`animate-gradient bg-gradient-to-r from-[#DEB887] via-[#8B4513] to-[#DEB887] bg-clip-text text-transparent bg-300% ${className}`}
    >
      {children}
    </span>
  );
};

export default function CreateProjectPage() {
  const router = useRouter();
  const { isLoaded: isOrgLoaded, membership } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    if (isOrgLoaded && isUserLoaded && membership) {
      setIsAdmin(membership.role === "org:admin");
    }
  }, [isOrgLoaded, isUserLoaded, membership]);

  const {
    loading,
    error,
    data: project,
    fn: createProjectFn,
  } = useFetch(createProject);

  const onSubmit = async (data) => {
    if (!isAdmin) {
      alert("Only organization admins can create projects");
      return;
    }

    createProjectFn(data);
  };

  useEffect(() => {
    if (project) router.push(`/project/${project.id}`);
  }, [loading]);

  if (!isOrgLoaded || !isUserLoaded) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0C0A09]">
      {/* Subtle Gradient Background with Glassmorphism */}
      <div className="absolute inset-0">
        {/* Base gradient - more subtle */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1A1614]/90 to-black" />

        {/* Grainy texture - reduced opacity */}
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light" />

        {/* Glass-like beige circles */}
        <div className="absolute top-[-20%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#DEB887]/[0.03] backdrop-blur-3xl" />
        <div className="absolute bottom-[-10%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-[#8B4513]/[0.02] backdrop-blur-2xl" />

        {/* Subtle glow effects */}
        <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px]">
          <div className="absolute inset-0 rounded-full bg-[#DEB887]/[0.03] blur-3xl transform-gpu" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#DEB887]/[0.05] to-transparent rotate-45" />
        </div>
      </div>

      <div className="container mx-auto py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Animated Title */}
          <div className="relative mb-12 animate-fade-in">
            <h1 className="text-5xl sm:text-6xl text-center font-bold">
              <AnimatedGradientText>Create New Project</AnimatedGradientText>
            </h1>
            <div className="absolute -inset-x-20 top-0 h-px bg-gradient-to-r from-transparent via-[#DEB887]/20 to-transparent animate-width" />
            <div className="absolute -inset-x-20 bottom-0 h-px bg-gradient-to-r from-transparent via-[#DEB887]/20 to-transparent animate-width-delay" />
          </div>

          {!isAdmin ? (
            <div className="flex flex-col gap-4 items-center p-8 rounded-2xl bg-black/40 border border-[#DEB887]/10 backdrop-blur-md animate-slide-up">
              <span className="text-2xl bg-gradient-to-r from-[#DEB887] to-[#8B4513] bg-clip-text text-transparent">
                Oops! Only Admins can create projects.
              </span>
              <OrgSwitcher />
            </div>
          ) : (
            <div className="flex items-start gap-8 animate-fade-in">
              {/* Form Card with hover animations */}
              <div className="flex-1 relative group animate-slide-up">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#DEB887]/10 via-[#8B4513]/5 to-[#DEB887]/10 rounded-2xl opacity-50 group-hover:opacity-70 transition-all duration-1000 animate-pulse-slow" />

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="relative flex flex-col space-y-6 p-8 rounded-2xl bg-black/40 border border-[#DEB887]/10 backdrop-blur-md hover:shadow-[0_0_25px_rgba(222,184,135,0.1)] transition-all duration-500"
                >
                  {/* Animated input fields */}
                  <div className="space-y-2 transition-all duration-300 hover:translate-x-1">
                    <label className="text-[#DEB887]/90 text-sm">
                      Project Name
                    </label>
                    <Input
                      id="name"
                      {...register("name")}
                      className="bg-black/20 border-[#DEB887]/10 focus:border-[#DEB887]/30 text-white/90 placeholder:text-white/40 rounded-xl h-12 backdrop-blur-sm"
                      placeholder="Enter project name..."
                    />
                    {errors.name && (
                      <p className="text-red-400/90 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 transition-all duration-300 hover:translate-x-1">
                    <label className="text-[#DEB887]/90 text-sm">
                      Project Key
                    </label>
                    <Input
                      id="key"
                      {...register("key")}
                      className="bg-black/20 border-[#DEB887]/10 focus:border-[#DEB887]/30 text-white/90 placeholder:text-white/40 rounded-xl h-12 backdrop-blur-sm"
                      placeholder="Ex: RCYT"
                    />
                    {errors.key && (
                      <p className="text-red-400/90 text-sm mt-1">
                        {errors.key.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 transition-all duration-300 hover:translate-x-1">
                    <label className="text-[#DEB887]/90 text-sm">
                      Description
                    </label>
                    <Textarea
                      id="description"
                      {...register("description")}
                      className="bg-black/20 border-[#DEB887]/10 focus:border-[#DEB887]/30 text-white/90 placeholder:text-white/40 rounded-xl min-h-[120px] resize-none backdrop-blur-sm"
                      placeholder="Describe your project..."
                    />
                    {errors.description && (
                      <p className="text-red-400/90 text-sm mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Loading indicator */}
                  {loading && (
                    <div className="py-2">
                      <BarLoader width={"100%"} color="#DEB887" />
                    </div>
                  )}

                  {/* Animated button */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="relative overflow-hidden bg-gradient-to-r from-[#DEB887]/80 to-[#8B4513]/80 hover:from-[#DEB887]/90 hover:to-[#8B4513]/90 text-white/90 font-medium rounded-xl h-12 transition-all duration-300 backdrop-blur-sm transform hover:scale-[1.02] hover:shadow-lg"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-white/20 border-t-white/90 rounded-full" />
                          Creating...
                        </>
                      ) : (
                        "Create Project"
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#DEB887]/20 to-[#8B4513]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>

                  {/* Error Message */}
                  {error && (
                    <p className="text-red-400/90 text-center">
                      {error.message}
                    </p>
                  )}
                </form>
              </div>

              {/* Animated Side Loader */}
              <div className="w-[200px] h-[200px] sticky top-10 animate-fade-in-delay">
                <LoaderWrapper>
                  <div className="main">
                    <div className="up">
                      <div className="loaders">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className="loader" />
                        ))}
                      </div>
                      <div className="loadersB">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="loaderA">
                            <div className={`ball${i}`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </LoaderWrapper>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add noise animation keyframes */}
      <style jsx global>{`
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.05;
          mix-blend-mode: overlay;
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes width {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          100% {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        @keyframes slideUp {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-gradient {
          animation: gradient 8s linear infinite;
        }

        .bg-300\% {
          background-size: 300% 300%;
        }

        .animate-width {
          animation: width 1s ease-out forwards;
        }

        .animate-width-delay {
          animation: width 1s ease-out 0.2s forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fadeIn 1s ease-out 0.3s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
