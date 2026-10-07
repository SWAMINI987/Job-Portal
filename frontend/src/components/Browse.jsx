import React, { useEffect, useMemo } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/jobSlice";

const Browse = () => {
    useGetAllJobs();

    const dispatch = useDispatch();

    const { allJobs, searchedQuery } = useSelector((store) => store.job);

    // Search query according to jobs filter
    const filteredJobs = useMemo(() => {

        // If no search query, show all jobs
        if (!searchedQuery?.trim()) {
            return allJobs || [];
        }

        const searchWords = searchedQuery
            .toLowerCase()
            .trim()
            .split(/\s+/);

        return (allJobs || []).filter((job) => {

            const searchableText = `
                ${job?.title || ""}
                ${job?.description || ""}
                ${job?.location || ""}
                ${job?.jobType || ""}
                ${job?.experienceLevel || ""}
                ${job?.position || ""}
                ${job?.company?.name || ""}
            `.toLowerCase();

            // At least one searched word should match
            return searchWords.some((word) =>
                searchableText.includes(word)
            );
        });

    }, [allJobs, searchedQuery]);

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    return (
        <div>
            <Navbar />

            <div className="max-w-7xl mx-auto my-10">

                <h1 className="font-bold text-xl my-10">
                    Search Results ({filteredJobs.length})
                </h1>

                {filteredJobs.length === 0 ? (

                    <div className="text-center mt-10">
                        <h2 className="text-xl font-semibold">
                            Job not found
                        </h2>
                    </div>

                ) : (

                    <div className="grid grid-cols-3 gap-4">

                        {filteredJobs.map((job) => (
                            <Job
                                key={job._id}
                                job={job}
                            />
                        ))}

                    </div>

                )}

            </div>
        </div>
    );
};

export default Browse;