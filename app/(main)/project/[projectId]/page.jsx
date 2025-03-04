"use client";

import { getProject } from "@/actions/projects";
import { notFound } from "next/navigation";
import SprintCreationForm from "../_components/create-sprint";
import SprintBoard from "../_components/sprint-board";
import styled from "styled-components";

// Styled component for spiral animation
const SpiralWrapper = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  opacity: 0.1;
  pointer-events: none;

  .spiral {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px solid #deb887;
    border-radius: 50%;
    animation: spiral 20s linear infinite;
  }

  ${[...Array(5)]
    .map(
      (_, i) => `
    .spiral:nth-child(${i + 1}) {
      animation-delay: ${i * 0.2}s;
      transform: scale(${1 + i * 0.2});
    }
  `
    )
    .join("")}

  @keyframes spiral {
    0% {
      transform: rotate(0deg) scale(1);
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      transform: rotate(360deg) scale(0.5);
      opacity: 0;
    }
  }
`;

export default async function ProjectPage({ params }) {
  const { projectId } = params;
  const project = await getProject(projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0C0A09]">
      {/* Background Effects */}
      <div className="fixed inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1A1614]/90 to-black" />

        {/* Grainy texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-soft-light" />

        {/* Responsive Spiral animations */}
        <SpiralWrapper className="absolute top-20 left-[5%] scale-75 sm:scale-100 animate-fade-in-delay hidden sm:block">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="spiral" />
          ))}
        </SpiralWrapper>

        <SpiralWrapper className="absolute bottom-40 right-[5%] scale-75 sm:scale-150 animate-fade-in-delay hidden sm:block">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="spiral" />
          ))}
        </SpiralWrapper>

        {/* Responsive Glass-like beige circles */}
        <div className="absolute top-[-20%] left-[10%] w-[80vw] sm:w-[50vw] h-[80vw] sm:h-[50vw] rounded-full bg-[#DEB887]/[0.02] backdrop-blur-3xl" />
        <div className="absolute bottom-[-10%] right-[5%] w-[60vw] sm:w-[40vw] h-[60vw] sm:h-[40vw] rounded-full bg-[#8B4513]/[0.01] backdrop-blur-2xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 relative z-10">
        {/* Project Header */}
        <div className="sticky top-0 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-4 bg-[#0C0A09]/80 backdrop-blur-md border-b border-[#DEB887]/10">
          <div className="relative mb-4 sm:mb-6 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold bg-gradient-to-r from-[#DEB887] via-[#D2B48C] to-[#8B4513] bg-clip-text text-transparent px-4">
              {project.name}
            </h1>
          </div>

          {/* Sprint Creation Form with animation */}
          <div className="animate-slide-up">
            <SprintCreationForm
              projectTitle={project.name}
              projectId={projectId}
              projectKey={project.key}
              sprintKey={project.sprints?.length + 1}
            />
          </div>
        </div>

        {/* Sprint Board or Empty State */}
        <div className="mt-6 animate-fade-in-delay">
          {project.sprints.length > 0 ? (
            <div className="relative group">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-[#DEB887]/10 via-[#8B4513]/5 to-[#DEB887]/10 rounded-xl sm:rounded-2xl opacity-50 group-hover:opacity-70 transition-all duration-1000" />
              <div className="relative rounded-xl sm:rounded-2xl bg-black/40 border border-[#DEB887]/10 backdrop-blur-md">
                <div className="overflow-x-auto">
                  <div className="min-w-[768px] lg:w-full p-4 sm:p-6">
                    <SprintBoard
                      sprints={project.sprints}
                      projectId={projectId}
                      orgId={project.organizationId}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 sm:p-12 rounded-xl sm:rounded-2xl bg-black/40 border border-[#DEB887]/10 backdrop-blur-md">
              <p className="text-[#DEB887] text-base sm:text-lg">
                Create a Sprint from button above
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced scrollbar styling */}
      <style jsx global>{`
        /* Custom Scrollbar for Webkit browsers */
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
          border: 2px solid transparent;
          background-clip: padding-box;
        }

        /* Firefox scrollbar */
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(222, 184, 135, 0.3) rgba(0, 0, 0, 0.2);
        }

        /* Horizontal scroll snap on mobile */
        @media (max-width: 1024px) {
          .overflow-x-auto {
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
          }

          .min-w-[768px] {
            scroll-snap-align: start;
            scroll-padding: 1rem;
          }
        }

        /* Hide scrollbar on mobile while preserving functionality */
        @media (max-width: 640px) {
          .overflow-x-auto {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }
        }

        /* Prevent body scroll when modal is open */
        body.modal-open {
          overflow: hidden;
          position: fixed;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
