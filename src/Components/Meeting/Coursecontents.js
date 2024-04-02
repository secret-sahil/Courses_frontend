import { useEffect, useState } from 'react';
import { ReactComponent as Down } from '../../Assets/Icons/Down.svg'
import { IoBookOutline } from "react-icons/io5";
import { BASE_URL } from '../../Api/api';
import { TiFolderOpen } from "react-icons/ti";
import { Navigate, useNavigate } from 'react-router-dom';
import { MdOutlineFileUpload } from "react-icons/md";
import { MdClose, MdOutlineFileDownload } from "react-icons/md";


export default function Coursecontents({ data, completed_lessons,setMenu }) {


    const navigate = useNavigate()
    console.log(completed_lessons);

    const [clicked, setclicked] = useState(false);
    const [totallessons, setTotalLessons] = useState(0);
    const [openDropDown, setOpenDropdown] = useState('');
    let allchapters = []

    let completed = [];

    if (completed_lessons) {
        completed_lessons?.forEach((val) => {
            completed.push(val)

        })
    }

    const countLessons = () => {
        let temp = 0;
        data?.forEach((val) => {
            temp += val?.lessons?.length;
        })
        setTotalLessons(temp)

    }

    useEffect(() => {
        countLessons();
    }, [data])

    console.log(totallessons)

    function ClickSection(id) {
        if (!clicked) {
            setclicked(true);
            let inner = document.getElementById(id);
            // console.log(inner);
            inner.style.display = 'none';
        }
        else {
            setclicked(false)
            let inner = document.getElementById(id);

            // console.log(inner);
            inner.style.display = 'flex';
        }
    }

    console.log(openDropDown)


    const handleDropDown = (id) => {
        if (openDropDown) {
            setOpenDropdown("");
        }
        else {
            setOpenDropdown(id);
        }
    }

    const toggleMenu = () => {
        setMenu(false);
    };

    return (
        <div className="bg-[#E2FFF1] rounded-2xl border border-2 xsm:absolute xsm:top-[3rem] xsm:right-0 xsm:w-[80vw]">
            <div className="px-5 py-8 xsm:py-4 xsm:px-2">
                <div className="space-y-2 xsm:space-y-1">
                    <div className='flex flex-row justify-between'>
                        <p className="font-pop font-semibold text-[21px] text-[#1DBF73] xsm:text-[12px]">Course Contents</p>
                        {window.innerWidth <= 480 && (<MdClose className='cursor-pointer' onClick={toggleMenu} />)}
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-pop text-[12px] text-[#1DBF73] xsm:text-[10px]">{completed_lessons?.length}/{totallessons}  COMPLETED</p>
                        <img className="w-[19px] h-[19px] xsm:w-4 xsm:h-4" src="../Icons/Calender.svg" />
                    </div>
                    <div>
                        {/* progressbar */}
                        <hr />
                    </div>
                </div>
                {data?.map((val, ind) => {
                    return (
                        <>
                            <div className='mt-3 py-2 border border-[#1DBF73] px-4 bg-white rounded-xl cursor-pointer' key={ind}>
                                <div className=''>
                                    <div>
                                        <div className='' onClick={() => ClickSection(ind + 1)} >
                                            <div className='flex justify-between '>
                                                <p className='font-pop font-medium text-[12px] text-[#1DBF73] xsm:text-[10px]'>{val?.chapter_name}</p>
                                                <Down />
                                            </div>
                                            <div className='flex justify-between'>
                                                <div className='flex items-center ml-2 space-x-1'>
                                                    {/* <img className='text-[#252641CC]' src="../Icons/Clock.svg" /> */}
                                                    <p className='text-[#252641CC] text-[11px] font-pop font-medium'></p>
                                                </div>
                                                <div className='flex items-center space-x-1'>
                                                    <IoBookOutline className='text-[#252641CC] xsm:h-3 xsm:w-3' />
                                                    <p className='text-[#252641CC] text-[11px] font-pop font-medium xsm:text-[8px]'>{val?.lessons?.length} Lessons</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div id={ind + 1} className='pt-2'>
                                            <div className='w-full'>
                                                {val?.lessons?.map((chapter, index) => {


                                                    return (
                                                        <div className={`flex flex-col justify-between border-t py-2 w-full ${!completed?.includes(chapter?._id) ? 'cursor-not-allowed text-gray-300' : ''}`} key={index}>
                                                            <span className='flex justify-between'>
                                                                <p className="font-pop font-bold text-[11px] xsm:text-[8px]">{index + 1}. {chapter?.lesson_name}</p>
                                                                <p className='font-pop font-bold text-[11px] xsm:text-[8px]'>{chapter?.duration}</p>
                                                            </span>

                                                            {(chapter?.notes || chapter?.assignment) && <div className='relative'>
                                                                <button className='flex gap-2 align-middle justify-self-end border w-fit items-center px-2 mt-3 realtive xsm:mt-2' onClick={() => handleDropDown(chapter._id)}> <TiFolderOpen className='xsm:w-3 xsm:h-3' /> <p className='text-[12px] xsm:text-[6px]'> Resouces</p>  </button>
                                                                {openDropDown === chapter._id &&
                                                                    <ul className='list-none absolute top-10 left-0 bg-white text-sm  shadow-xl py-1 z-40 w-[11rem]'>
                                                                        {chapter?.notes && <span className=' flex justify-between items-center px-5 border-b-[1px] py-1'> <li className=' px-5' > Notes</li> <span className='flex gap-2'> <a href={chapter?.notes} target='_blank' ><MdOutlineFileDownload size={16} /></a></span> </span>}

                                                                        {chapter?.assignment && <span className='flex justify-between items-center px-5 py-1'> <li > Assignment</li> <span className='flex gap-2'> <a href={chapter?.assignment} target='_blank' ><MdOutlineFileDownload size={16} /></a>  <MdOutlineFileUpload size={16} />  </span> </span>}
                                                                    </ul>}
                                                            </div>}

                                                        </div>
                                                    )

                                                })}

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>
                    )
                })}


            </div>
        </div>
    );
}