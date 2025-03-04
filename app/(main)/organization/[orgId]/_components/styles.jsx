"use client";

export default function GlobalStyles() {
  return (
    <style jsx global>{`
      .bg-noise {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
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
        animation: fadeIn 0.8s ease-out forwards;
      }

      .animate-fade-in-delay {
        animation: fadeIn 0.8s ease-out 0.2s forwards;
        opacity: 0;
      }

      /* Enhanced scrollbar */
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

      /* Card hover effects */
      .hover-card {
        transition: all 0.3s ease;
      }

      .hover-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(222, 184, 135, 0.1);
      }

      /* Gradient animations */
      @keyframes gradientShift {
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

      .animate-gradient {
        background-size: 200% 200%;
        animation: gradientShift 8s ease infinite;
      }
    `}</style>
  );
}
