import React, { useEffect } from "react";
import axios from "axios";
import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {

    const dispatch = useDispatch();

    const { searchedQuery } = useSelector(
        store => store.job
    );

    useEffect(() => {

        const fetchAllJobs = async () => {
            try {

                const res = await axios.get(
                    `${JOB_API_END_POINT}/get?keyword=${encodeURIComponent(searchedQuery || "")}`,
                    {
                        withCredentials: true
                    }
                );

                console.log("SEARCH QUERY:", searchedQuery);
                console.log("JOB API RESPONSE:", res.data);

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }

            } catch (error) {
                console.log(error);
            }
        };

        fetchAllJobs();

    }, [dispatch, searchedQuery]);

};

export default useGetAllJobs;