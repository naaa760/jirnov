"use client";

import { OrganizationList, useOrganization } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const customAppearance = {
  variables: {
    colorPrimary: "#DEB887",
    colorText: "rgba(255, 255, 255, 0.9)",
    colorTextSecondary: "rgba(255, 255, 255, 0.5)",
    colorBackground: "rgba(0, 0, 0, 0.4)",
    colorInputBackground: "rgba(0, 0, 0, 0.2)",
    colorInputText: "rgba(255, 255, 255, 0.9)",
    colorSuccess: "#10B981",
    colorDanger: "#EF4444",
    borderRadius: "0.75rem",
  },
  elements: {
    card: "backdrop-blur-md border border-[#DEB887]/10 shadow-xl",
    headerTitle: "text-white/90",
    headerSubtitle: "text-white/60",
    formButtonPrimary:
      "bg-gradient-to-r from-[#DEB887]/90 to-[#8B4513]/90 hover:from-[#DEB887] hover:to-[#8B4513] transition-all duration-300",
    formFieldInput:
      "bg-black/20 border-[#DEB887]/10 focus:border-[#DEB887]/30 transition-all duration-300",
    organizationSwitcherTrigger:
      "bg-black/20 border-[#DEB887]/10 hover:border-[#DEB887]/30",
    organizationPreview: "hover:bg-[#DEB887]/10 transition-colors duration-300",
  },
};

export default function Onboarding() {
  const { organization } = useOrganization();
  const router = useRouter();

  useEffect(() => {
    if (organization) {
      router.push(`/organization/${organization.slug}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organization]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0C0A09] flex justify-center items-start pt-14">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0">
        {/* Base gradient with beige tones */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1614] via-[#1A1614]/95 to-[#1A1614]" />

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-[#DEB887]/5 via-transparent to-transparent animate-pulse-slow" />

        {/* Enhanced grain effect */}
        <div className="absolute inset-0 bg-noise opacity-[0.15] mix-blend-overlay" />

        {/* Subtle grain animation */}
        <div className="absolute inset-0 bg-noise opacity-[0.08] mix-blend-overlay animate-grain" />

        {/* Enhanced glass-like beige circles */}
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-[#DEB887]/[0.03] backdrop-blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[90vw] h-[90vw] rounded-full bg-[#8B4513]/[0.02] backdrop-blur-2xl animate-pulse-slow" />

        {/* Additional decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-[#DEB887]/[0.02] backdrop-blur-xl animate-float" />
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 rounded-full bg-[#8B4513]/[0.02] backdrop-blur-xl animate-float-delayed" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[920px] px-4">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#DEB887] via-[#D2B48C] to-[#8B4513] bg-clip-text text-transparent mb-4">
            Welcome to Project Manager
          </h1>
          <p className="text-white/60 text-lg">
            Create or select an organization to get started
          </p>
        </div>

        <div className="relative group animate-fade-in-delay">
          <div className="absolute -inset-[1px] bg-gradient-to-r from-[#DEB887]/10 via-[#8B4513]/5 to-[#DEB887]/10 rounded-xl opacity-50 group-hover:opacity-70 transition-all duration-1000" />
          <div className="relative rounded-xl bg-black/40 border border-[#DEB887]/10 backdrop-blur-md p-1">
            <OrganizationList
              hidePersonal
              appearance={customAppearance}
              afterCreateOrganizationUrl="/organization/:slug"
              afterSelectOrganizationUrl="/organization/:slug"
            />
          </div>
        </div>
      </div>

      {/* Updated Global Styles */}
      <style jsx global>{`
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        @keyframes grain {
          0%,
          100% {
            transform: translate(0, 0);
          }
          10% {
            transform: translate(-2%, -2%);
          }
          20% {
            transform: translate(2%, 2%);
          }
          30% {
            transform: translate(-1%, 1%);
          }
          40% {
            transform: translate(1%, -1%);
          }
          50% {
            transform: translate(-2%, 2%);
          }
          60% {
            transform: translate(2%, -2%);
          }
          70% {
            transform: translate(-1%, -1%);
          }
          80% {
            transform: translate(1%, 1%);
          }
          90% {
            transform: translate(-2%, -2%);
          }
        }

        .animate-grain {
          animation: grain 8s steps(10) infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .animate-float {
          animation: float 15s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 18s ease-in-out infinite;
          animation-delay: -9s;
        }

        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fadeIn 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(222, 184, 135, 0.3);
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(222, 184, 135, 0.5);
        }
      `}</style>
    </div>
  );
}
