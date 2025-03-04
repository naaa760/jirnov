"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarLoader } from "react-spinners";
import { formatDistanceToNow, isAfter, isBefore, format } from "date-fns";
import { Calendar, Timer, PlayCircle, StopCircle } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { useRouter, useSearchParams } from "next/navigation";
import { updateSprintStatus } from "@/actions/sprints";

export default function SprintManager({
  sprint,
  setSprint,
  sprints,
  projectId,
}) {
  const [status, setStatus] = useState(sprint.status);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    fn: updateStatus,
    loading,
    error,
    data: updatedStatus,
  } = useFetch(updateSprintStatus);

  const startDate = new Date(sprint.startDate);
  const endDate = new Date(sprint.endDate);
  const now = new Date();

  const canStart =
    isBefore(now, endDate) && isAfter(now, startDate) && status === "PLANNED";
  const canEnd = status === "ACTIVE";

  const handleStatusChange = async (newStatus) => {
    updateStatus(sprint.id, newStatus);
  };

  useEffect(() => {
    if (updatedStatus && updatedStatus.success) {
      setStatus(updatedStatus.sprint.status);
      setSprint({
        ...sprint,
        status: updatedStatus.sprint.status,
      });
    }
  }, [updatedStatus, loading]);

  const getStatusText = () => {
    if (status === "COMPLETED") {
      return `Sprint Ended`;
    }
    if (status === "ACTIVE" && isAfter(now, endDate)) {
      return `Overdue by ${formatDistanceToNow(endDate)}`;
    }
    if (status === "PLANNED" && isBefore(now, startDate)) {
      return `Starts in ${formatDistanceToNow(startDate)}`;
    }
    return null;
  };

  useEffect(() => {
    const sprintId = searchParams.get("sprint");
    if (sprintId && sprintId !== sprint.id) {
      const selectedSprint = sprints.find((s) => s.id === sprintId);
      if (selectedSprint) {
        setSprint(selectedSprint);
        setStatus(selectedSprint.status);
      }
    }
  }, [searchParams, sprints]);

  const handleSprintChange = (value) => {
    const selectedSprint = sprints.find((s) => s.id === value);
    setSprint(selectedSprint);
    setStatus(selectedSprint.status);
    router.replace(`/project/${projectId}`, undefined, { shallow: true });
  };

  return (
    <div className="space-y-4">
      {/* Sprint Selection and Status Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Select value={sprint.id} onValueChange={handleSprintChange}>
            <SelectTrigger className="w-full bg-black/20 border-[#DEB887]/10 text-white/90 rounded-xl hover:border-[#DEB887]/30 transition-colors">
              <SelectValue placeholder="Select Sprint" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1614] border-[#DEB887]/10">
              {sprints.map((sprint) => (
                <SelectItem
                  key={sprint.id}
                  value={sprint.id}
                  className="text-white/90 focus:bg-[#DEB887]/10 focus:text-white"
                >
                  <div className="flex items-center space-x-2">
                    <span>{sprint.name}</span>
                    <Badge
                      variant="outline"
                      className="ml-2 text-xs border-[#DEB887]/20"
                    >
                      {sprint.status}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {canStart && (
            <Button
              onClick={() => handleStatusChange("ACTIVE")}
              disabled={loading}
              className="bg-gradient-to-r from-emerald-600/90 to-emerald-800/90 hover:from-emerald-600 hover:to-emerald-800 text-white/90 border border-emerald-500/20 shadow-lg transition-all duration-300"
            >
              <PlayCircle className="mr-2 h-4 w-4" />
              Start Sprint
            </Button>
          )}
          {canEnd && (
            <Button
              onClick={() => handleStatusChange("COMPLETED")}
              disabled={loading}
              className="bg-gradient-to-r from-red-600/90 to-red-800/90 hover:from-red-600 hover:to-red-800 text-white/90 border border-red-500/20 shadow-lg transition-all duration-300"
            >
              <StopCircle className="mr-2 h-4 w-4" />
              End Sprint
            </Button>
          )}
        </div>
      </div>

      {/* Sprint Details */}
      <div className="flex flex-wrap gap-4 items-center text-sm">
        <div className="flex items-center text-white/70">
          <Calendar className="h-4 w-4 mr-2 text-[#DEB887]/70" />
          <span>
            {format(startDate, "MMM d, yyyy")} -{" "}
            {format(endDate, "MMM d, yyyy")}
          </span>
        </div>

        <div className="flex items-center text-white/70">
          <Timer className="h-4 w-4 mr-2 text-[#DEB887]/70" />
          <span>{formatDistanceToNow(endDate)} remaining</span>
        </div>

        {getStatusText() && (
          <Badge
            variant="outline"
            className={`border-[#DEB887]/20 text-white/90 ${
              status === "COMPLETED"
                ? "bg-emerald-500/10"
                : status === "ACTIVE" && isAfter(now, endDate)
                ? "bg-red-500/10"
                : "bg-[#DEB887]/10"
            }`}
          >
            {getStatusText()}
          </Badge>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="pt-2">
          <BarLoader width={"100%"} color="#DEB887" />
        </div>
      )}

      {/* Error State */}
      {error && <p className="text-red-400/90 text-sm mt-2">{error.message}</p>}
    </div>
  );
}
