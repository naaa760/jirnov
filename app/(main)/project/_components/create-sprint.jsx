"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { CalendarIcon, PlusCircle, XCircle } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format, addDays } from "date-fns";

import { sprintSchema } from "@/app/lib/validators";
import useFetch from "@/hooks/use-fetch";
import { createSprint } from "@/actions/sprints";

export default function SprintCreationForm({
  projectTitle,
  projectKey,
  projectId,
  sprintKey,
}) {
  const [showForm, setShowForm] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 14),
  });
  const router = useRouter();

  const { loading: createSprintLoading, fn: createSprintFn } =
    useFetch(createSprint);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sprintSchema),
    defaultValues: {
      name: `${projectKey}-${sprintKey}`,
      startDate: dateRange.from,
      endDate: dateRange.to,
    },
  });

  const onSubmit = async (data) => {
    await createSprintFn(projectId, {
      ...data,
      startDate: dateRange.from,
      endDate: dateRange.to,
    });
    setShowForm(false);
    router.refresh();
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#DEB887] via-[#D2B48C] to-[#8B4513] bg-clip-text text-transparent">
          {projectTitle}
        </h1>
        <Button
          onClick={() => setShowForm(!showForm)}
          variant={!showForm ? "default" : "destructive"}
          className={`transition-all duration-300 ${
            !showForm
              ? "bg-gradient-to-r from-[#DEB887]/90 to-[#8B4513]/90 hover:from-[#DEB887] hover:to-[#8B4513] text-white/90 border border-[#DEB887]/20 shadow-lg"
              : "bg-gradient-to-r from-red-600/90 to-red-800/90 hover:from-red-600 hover:to-red-800"
          }`}
        >
          {!showForm ? (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Sprint
            </>
          ) : (
            <>
              <XCircle className="mr-2 h-4 w-4" />
              Cancel
            </>
          )}
        </Button>
      </div>

      {showForm && (
        <div className="relative group animate-slide-up">
          <div className="absolute -inset-[1px] bg-gradient-to-r from-[#DEB887]/10 via-[#8B4513]/5 to-[#DEB887]/10 rounded-xl opacity-50 group-hover:opacity-70 transition-all duration-1000" />
          <Card className="relative bg-black/40 border-[#DEB887]/10 backdrop-blur-md">
            <CardContent className="pt-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col sm:flex-row gap-6 items-start sm:items-end"
              >
                <div className="flex-1 w-full">
                  <label className="block text-sm font-medium mb-2 text-white/70">
                    Sprint Name
                  </label>
                  <Input
                    {...register("name")}
                    readOnly
                    className="bg-black/20 border-[#DEB887]/10 text-white/90 placeholder:text-white/50 rounded-lg focus:border-[#DEB887]/30 focus:ring-[#DEB887]/10"
                  />
                  {errors.name && (
                    <p className="text-red-400/90 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="flex-1 w-full">
                  <label className="block text-sm font-medium mb-2 text-white/70">
                    Sprint Duration
                  </label>
                  <Controller
                    control={control}
                    name="dateRange"
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-black/20 border-[#DEB887]/10 text-white/90 hover:border-[#DEB887]/30 hover:bg-black/30"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-[#DEB887]" />
                            {dateRange.from && dateRange.to ? (
                              format(dateRange.from, "LLL dd, y") +
                              " - " +
                              format(dateRange.to, "LLL dd, y")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto bg-[#1A1614] border-[#DEB887]/10"
                          align="start"
                        >
                          <DayPicker
                            classNames={{
                              months:
                                "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                              month: "space-y-4",
                              caption:
                                "flex justify-center pt-1 relative items-center",
                              caption_label:
                                "text-sm font-medium text-white/90",
                              nav: "space-x-1 flex items-center",
                              nav_button:
                                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                              nav_button_previous: "absolute left-1",
                              nav_button_next: "absolute right-1",
                              table: "w-full border-collapse space-y-1",
                              head_row: "flex",
                              head_cell:
                                "text-white/50 rounded-md w-8 font-normal text-[0.8rem]",
                              row: "flex w-full mt-2",
                              cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-[#DEB887]/10 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                              day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
                              day_selected:
                                "bg-[#DEB887] text-white hover:bg-[#DEB887]/90 focus:bg-[#DEB887]/90",
                              day_today: "bg-[#DEB887]/10 text-white",
                              day_outside: "text-white/30",
                              day_disabled: "text-white/30",
                              day_range_middle:
                                "aria-selected:bg-[#DEB887]/20 aria-selected:text-white",
                              day_hidden: "invisible",
                            }}
                            mode="range"
                            disabled={[{ before: new Date() }]}
                            selected={dateRange}
                            onSelect={(range) => {
                              if (range?.from && range?.to) {
                                setDateRange(range);
                                field.onChange(range);
                              }
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={createSprintLoading}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#DEB887]/90 to-[#8B4513]/90 hover:from-[#DEB887] hover:to-[#8B4513] text-white/90 border border-[#DEB887]/20 shadow-lg transition-all duration-300"
                >
                  {createSprintLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating...
                    </span>
                  ) : (
                    "Create Sprint"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
