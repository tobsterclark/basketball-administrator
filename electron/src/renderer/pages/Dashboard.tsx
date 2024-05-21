const Dashboard = () => {
    return (
        <div className="w-full h-full pl-20 pt-16 pr-8 overflow-y-auto dark:bg-darkbg dark:text-darktext">
            <div>
                <div>
                    <span className="text-3xl font-semibold dark:text-darkdecoration">
                        Welcome back, mr basketball.
                    </span>
                    <hr className="w-[400px] mt-2 dark:border-1 dark:border-darkgray" />
                    <div className="pt-2">
                        <span className="font-light dark:text-white italic text-sm">
                            Blah blah blah, i love basketball.
                        </span>
                    </div>
                </div>

                <div className="w-full h-full flex flex-col gap-2 pt-6">
                    <div className="w-full h-1/5 mb-20 pb-10 relative">
                        {/* <span className="text-lg font-semibold">Your Courses</span>
						<hr className="w-[125px]"></hr> */}
                        <div className="absolute w-full ">
                            <div className="overflow-x-auto flex gap-6 pt-4 pb-4 pl-1 min-width-max pr-[200px]">
                                <p>dashboard!!</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col xl:flex-row gap-2 h-3/5 pt-24 pb-24">
                        <div className="w-full xl:w-1/2 ">
                            <div className="w-full xl:w-[90%]">
                                <span className="text-lg font-semibold underline underline-offset-4 decoration-primary decoration-2">
                                    Latest gamez
                                </span>
                                <div className="bg-gray-100 shadow-md rounded-md">
                                    <p>game data or whatever</p>
                                </div>
                                {/* {tempgetLatestWorksheets()} */}
                            </div>
                        </div>
                        <div className="w-full pt-12 xl:pt-0 xl:w-1/2">
                            <div className="w-full xl:w-[90%] opacity-30 hover:cursor-not-allowed">
                                <span className="text-lg font-semibold underline underline-offset-4 decoration-primary decoration-2">
                                    Coolest people
                                </span>
                                <p>obviously me</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
