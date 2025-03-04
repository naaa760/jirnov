"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarLoader } from "react-spinners";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import useFetch from "@/hooks/use-fetch";

import statuses from "@/data/status";
import { getIssuesForSprint, updateIssueOrder } from "@/actions/issues";

import SprintManager from "./sprint-manager";
import IssueCreationDrawer from "./create-issue";
import IssueCard from "@/components/issue-card";
import BoardFilters from "./board-filters";

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export default function SprintBoard({ sprints, projectId, orgId }) {
  const [currentSprint, setCurrentSprint] = useState(
    sprints.find((spr) => spr.status === "ACTIVE") || sprints[0]
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const {
    loading: issuesLoading,
    error: issuesError,
    fn: fetchIssues,
    data: issues,
    setData: setIssues,
  } = useFetch(getIssuesForSprint);

  const [filteredIssues, setFilteredIssues] = useState(issues);

  const handleFilterChange = (newFilteredIssues) => {
    setFilteredIssues(newFilteredIssues);
  };

  useEffect(() => {
    if (currentSprint.id) {
      fetchIssues(currentSprint.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSprint.id]);

  const handleAddIssue = (status) => {
    setSelectedStatus(status);
    setIsDrawerOpen(true);
  };

  const handleIssueCreated = () => {
    fetchIssues(currentSprint.id);
  };

  const {
    fn: updateIssueOrderFn,
    loading: updateIssuesLoading,
    error: updateIssuesError,
  } = useFetch(updateIssueOrder);

  const onDragEnd = async (result) => {
    if (currentSprint.status === "PLANNED") {
      toast.warning("Start the sprint to update board");
      return;
    }
    if (currentSprint.status === "COMPLETED") {
      toast.warning("Cannot update board after sprint end");
      return;
    }
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newOrderedData = [...issues];

    // source and destination list
    const sourceList = newOrderedData.filter(
      (list) => list.status === source.droppableId
    );

    const destinationList = newOrderedData.filter(
      (list) => list.status === destination.droppableId
    );

    if (source.droppableId === destination.droppableId) {
      const reorderedCards = reorder(
        sourceList,
        source.index,
        destination.index
      );

      reorderedCards.forEach((card, i) => {
        card.order = i;
      });
    } else {
      // remove card from the source list
      const [movedCard] = sourceList.splice(source.index, 1);

      // assign the new list id to the moved card
      movedCard.status = destination.droppableId;

      // add new card to the destination list
      destinationList.splice(destination.index, 0, movedCard);

      sourceList.forEach((card, i) => {
        card.order = i;
      });

      // update the order for each card in destination list
      destinationList.forEach((card, i) => {
        card.order = i;
      });
    }

    const sortedIssues = newOrderedData.sort((a, b) => a.order - b.order);
    setIssues(newOrderedData, sortedIssues);

    updateIssueOrderFn(sortedIssues);
  };

  if (issuesError) return <div>Error loading issues</div>;

  return (
    <div className="flex flex-col space-y-6">
      <div className="relative group">
        <div className="absolute -inset-[1px] bg-gradient-to-r from-[#DEB887]/10 via-[#8B4513]/5 to-[#DEB887]/10 rounded-xl opacity-50 group-hover:opacity-70 transition-all duration-1000" />
        <div className="relative p-4 rounded-xl bg-black/40 border border-[#DEB887]/10 backdrop-blur-md text-white/90">
          <SprintManager
            sprint={currentSprint}
            setSprint={setCurrentSprint}
            sprints={sprints}
            projectId={projectId}
          />
        </div>
      </div>

      {issues && !issuesLoading && (
        <div className="relative group">
          <div className="absolute -inset-[1px] bg-gradient-to-r from-[#DEB887]/10 via-[#8B4513]/5 to-[#DEB887]/10 rounded-xl opacity-50 group-hover:opacity-70 transition-all duration-1000" />
          <div className="relative p-4 rounded-xl bg-black/40 border border-[#DEB887]/10 backdrop-blur-md text-white/90">
            <BoardFilters issues={issues} onFilterChange={handleFilterChange} />
          </div>
        </div>
      )}

      {updateIssuesError && (
        <p className="text-red-400/90 text-center p-2">
          {updateIssuesError.message}
        </p>
      )}
      {(updateIssuesLoading || issuesLoading) && (
        <BarLoader className="mt-4" width={"100%"} color="#DEB887" />
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statuses.map((column) => (
            <Droppable key={column.key} droppableId={column.key}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`relative group rounded-xl transition-all duration-300 h-full ${
                    snapshot.isDraggingOver ? "ring-2 ring-[#DEB887]/30" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-black/40 border border-[#DEB887]/10 backdrop-blur-md rounded-xl" />

                  <div className="relative p-4 space-y-3 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-white/90 px-2 flex items-center">
                        <span className="w-2 h-2 rounded-full mr-2 bg-gradient-to-r from-[#DEB887] to-[#8B4513]" />
                        {column.name}
                      </h3>
                      <span className="text-sm text-white/60 px-2 bg-[#DEB887]/5 rounded-full py-0.5">
                        {filteredIssues?.filter(
                          (issue) => issue.status === column.key
                        ).length || 0}
                      </span>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 min-h-[200px] scrollbar-thin">
                      {filteredIssues
                        ?.filter((issue) => issue.status === column.key)
                        .map((issue, index) => (
                          <Draggable
                            key={issue.id}
                            draggableId={issue.id}
                            index={index}
                            isDragDisabled={updateIssuesLoading}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`transform transition-all duration-200 ${
                                  snapshot.isDragging
                                    ? "scale-105 rotate-1 shadow-2xl shadow-[#DEB887]/5"
                                    : ""
                                }`}
                              >
                                <div className="relative group/card">
                                  <div className="absolute -inset-[1px] bg-gradient-to-r from-[#DEB887]/10 via-[#8B4513]/5 to-[#DEB887]/10 rounded-lg opacity-0 group-hover/card:opacity-100 transition-all duration-500" />

                                  <div className="relative p-3 rounded-lg bg-black/40 border border-[#DEB887]/5 backdrop-blur-sm hover:border-[#DEB887]/20 transition-colors">
                                    <IssueCard
                                      issue={issue}
                                      onDelete={() =>
                                        fetchIssues(currentSprint.id)
                                      }
                                      onUpdate={(updated) =>
                                        setIssues((issues) =>
                                          issues.map((issue) => {
                                            if (issue.id === updated.id)
                                              return updated;
                                            return issue;
                                          })
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>

                    {column.key === "TODO" &&
                      currentSprint.status !== "COMPLETED" && (
                        <div className="sticky bottom-0 pt-3 bg-gradient-to-t from-black/40 to-transparent">
                          <Button
                            variant="ghost"
                            onClick={() => handleAddIssue(column.key)}
                            className="w-full bg-gradient-to-r from-[#DEB887]/10 to-[#8B4513]/10 hover:from-[#DEB887]/20 hover:to-[#8B4513]/20 text-white/90 border border-[#DEB887]/20 transition-all duration-300"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Create Issue
                          </Button>
                        </div>
                      )}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <IssueCreationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sprintId={currentSprint.id}
        status={selectedStatus}
        projectId={projectId}
        onIssueCreated={handleIssueCreated}
        orgId={orgId}
      />

      <style jsx global>{`
        @keyframes cardHover {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-2px);
          }
        }

        @keyframes glowPulse {
          0% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0.5;
          }
        }

        .card-hover {
          animation: cardHover 0.3s ease-out forwards;
        }

        .glow-pulse {
          animation: glowPulse 2s infinite;
        }

        /* Responsive scrollbar styling */
        @media (max-width: 640px) {
          .space-y-3 {
            max-height: 60vh;
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: rgba(222, 184, 135, 0.3) transparent;
          }

          .space-y-3::-webkit-scrollbar {
            width: 4px;
          }

          .space-y-3::-webkit-scrollbar-track {
            background: transparent;
          }

          .space-y-3::-webkit-scrollbar-thumb {
            background-color: rgba(222, 184, 135, 0.3);
            border-radius: 20px;
          }
        }
      `}</style>
    </div>
  );
}
