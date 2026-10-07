import React, { useEffect } from "react";
import axios from "axios";
import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/getadminjobs`,
                    {
                        withCredentials: true
                    }
                );

                console.log("ADMIN JOB API RESPONSE:", res.data);

                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }

            } catch (error) {
                console.log(
                    "ADMIN JOB ERROR:",
                    error.response?.data || error.message
                );
            }
        };

        fetchAllAdminJobs();

    }, [dispatch]);
};

export default useGetAllAdminJobs;

