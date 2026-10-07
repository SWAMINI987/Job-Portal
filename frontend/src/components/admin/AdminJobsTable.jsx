import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table'

import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from '../ui/popover'

import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {

    // Company search text
    const { searchCompanyByText } = useSelector(
        store => store.company
    )

    // All admin jobs
    const allAdminJobs = useSelector(
        store => store.job.allAdminJobs
    )

    // Filtered jobs
    const [filterJobs, setFilterJobs] = useState([])

    const navigate = useNavigate()


    // Filter jobs by company name
    useEffect(() => {

        const filteredCompany = allAdminJobs?.filter((job) => {

            if (!searchCompanyByText) {
                return true
            }

            return job?.company?.name
                ?.toLowerCase()
                .includes(searchCompanyByText.toLowerCase())

        })

        setFilterJobs(filteredCompany || [])

    }, [allAdminJobs, searchCompanyByText])


    return (
        <div>

            <Table>

                <TableCaption>
                    A list of your recent posted jobs
                </TableCaption>


                <TableHeader>

                    <TableRow>

                        <TableHead>
                            Company Name
                        </TableHead>

                        <TableHead>
                            Role
                        </TableHead>

                        <TableHead>
                            Date
                        </TableHead>

                        <TableHead className="text-right">
                            Action
                        </TableHead>

                    </TableRow>

                </TableHeader>


                <TableBody>

                    {filterJobs?.map((job) => (

                        <TableRow key={job._id}>

                            {/* Company Name */}
                            <TableCell>
                                {job?.company?.name || "N/A"}
                            </TableCell>


                            {/* Role */}
                            <TableCell>
                                {job?.title || "N/A"}
                            </TableCell>


                            {/* Date */}
                            <TableCell>
                                {job?.createdAt
                                    ? job.createdAt.split("T")[0]
                                    : "N/A"
                                }
                            </TableCell>


                            {/* Action */}
                            <TableCell className="text-right">

                                <Popover>

                                    <PopoverTrigger>
                                        <MoreHorizontal className="cursor-pointer" />
                                    </PopoverTrigger>


                                    <PopoverContent className="w-32">

                                        <div
                                            onClick={() =>
                                                navigate(
                                                    `/admin/jobs/${job._id}`
                                                )
                                            }
                                            className="flex items-center gap-2 w-fit cursor-pointer"
                                        >

                                            <Edit2 className="w-4" />

                                            <span>
                                                Edit
                                            </span>

                                        </div>
                                        <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                            <Eye className='w-4'/>
                                            <span>Applicants</span>
                                        </div>

                                    </PopoverContent>

                                </Popover>

                            </TableCell>

                        </TableRow>

                    ))}

                </TableBody>

            </Table>

        </div>
    )
}

export default AdminJobsTable