import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table'

import axios from 'axios'
import { toast } from 'sonner'

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '../ui/popover'

import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { APPLICATION_API_END_POINT } from '@/utils/constant'

const ApplicantsTable = () => {

    const { applicants } = useSelector((store) => store.application)

    // Status update handler
    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(
                `${APPLICATION_API_END_POINT}/status/${id}/update`,
                { status },
                {
                    withCredentials: true
                }
            )

            if (res.data.success) {
                toast.success("Status updated successfully")
            }

        } catch (error) {
            console.log(error)

            toast.error(
                error?.response?.data?.message ||
                "Failed to update status"
            )
        }
    }

    return (
        <div>
            <Table>

                <TableCaption>
                    A list of your recent applied user
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    {applicants?.map((application) => {

                        const resume =
                            application?.applicant?.profile?.resume

                        const resumeName =
                            application?.applicant?.profile?.resumeOriginalName

                        return (
                            <TableRow key={application._id}>

                                {/* Full Name */}
                                <TableCell>
                                    {application?.applicant?.fullname || "N/A"}
                                </TableCell>

                                {/* Email */}
                                <TableCell>
                                    {application?.applicant?.email || "N/A"}
                                </TableCell>

                                {/* Contact */}
                                <TableCell>
                                    {application?.applicant?.phoneNumber || "N/A"}
                                </TableCell>

                                {/* Resume */}
                                <TableCell>
                                    {resume ? (
                                        <a
                                            href={resume}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            {resumeName || "Resume.pdf"}
                                        </a>
                                    ) : (
                                        <span className="text-gray-500">
                                            NA
                                        </span>
                                    )}
                                </TableCell>

                                {/* Date */}
                                <TableCell>
                                    {application?.createdAt
                                        ? new Date(
                                            application.createdAt
                                        ).toLocaleDateString()
                                        : "N/A"}
                                </TableCell>

                                {/* Action */}
                                <TableCell className="text-right">

                                    {resume ? (

                                        <Popover>

                                            <PopoverTrigger>
                                        <MoreHorizontal className="h-5 w-5 cursor-pointer" />
                                         </PopoverTrigger>

                                            <PopoverContent className="w-32">

                                                <div className="flex flex-col gap-1">

                                                    {/* Accepted */}
                                                    <button
                                                        onClick={() =>
                                                            statusHandler(
                                                                "accepted",
                                                                application._id
                                                            )
                                                        }
                                                        className="text-left text-green-600 hover:bg-gray-100 p-2 rounded"
                                                    >
                                                        Accepted
                                                    </button>

                                                    {/* Rejected */}
                                                    <button
                                                        onClick={() =>
                                                            statusHandler(
                                                                "rejected",
                                                                application._id
                                                            )
                                                        }
                                                        className="text-left text-red-600 hover:bg-gray-100 p-2 rounded"
                                                    >
                                                        Rejected
                                                    </button>

                                                </div>

                                            </PopoverContent>

                                        </Popover>

                                    ) : (

                                        <span className="text-red-600 font-medium">
                                            Rejected
                                        </span>

                                    )}

                                </TableCell>

                            </TableRow>
                        )
                    })}

                </TableBody>

            </Table>
        </div>
    )
}

export default ApplicantsTable