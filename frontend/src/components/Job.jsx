import React from 'react';
import { Bookmark } from 'lucide-react';
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const Job = ({job}) => {
  const navigate = useNavigate(); 
  
  return(
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
      <div className='flex items-center justify-between'>

      <p className='text-sm text-gray-500'>2 days ago</p>
      <Button variant="outline" className="rounded-full" size="icon"><Bookmark/></Button>
       </div>

      <div className='flex items-center gap-2 my-2'>
      <Button className="p-6" variant="outline" size="icon">
        <Avatar>
          <AvatarImage src={job?.company.logo}/>
        </Avatar>
      </Button>
      <div>
        <h1 className='font-medium text-lg '>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>India</p>
      </div>
    </div>
    <div>
      <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
      <p className='text-sm text-gray-600'>{job?.description}</p>
       </div>
        <div className="flex items-center gap-2 mt-4">
  <Badge
    variant="ghost"
    className="text-blue-700 border border-blue-200 rounded-full px-3 py-1 font-bold"
  >
  {job?.position}Positions
  </Badge>

  <Badge
    variant="ghost"
    className="text-[#F83002] border border-red-200 rounded-full px-3 py-1 font-bold"
  >
    {job?.jobType}
  </Badge>

  <Badge
    variant="ghost"
    className="text-[#7209b7] border border-purple-200 rounded-full px-3 py-1 font-bold"
  >
    {job?.salary}LPA
  </Badge>
</div>
<div className='flex items-center gap-4 mt-4'>
<Button
  onClick={() => {
    console.log("SELECTED JOB:", job);
    console.log("JOB ID:", job?._id);
    console.log("NAVIGATION URL:", `/description/${job?._id}`);
    navigate(`/description/${job?._id}`);
  }}
  variant="outline"
>
  Details
</Button>

<Button className="bg-[#7209b7]">
  Save For Later
</Button>
</div>
</div>
  )
}
  
          

export default Job;  

