import PageContainer from '../ui_components/PageContainer';
import PageTitle from '../ui_components/PageTitle';

const Dashboard = () => {
    return (
        <PageContainer>
            <div>
                <PageTitle text="NSBL Mangement app" />

                <div className="w-full h-full flex flex-col gap-2 pt-6">
                    <div className="w-full h-1/5 mb-20 pb-10 relative">
                        {/* <span className="text-lg font-semibold">Your Courses</span>
						<hr className="w-[125px]"></hr> */}
                        <div className="absolute w-full ">
                            <div className="overflow-x-auto flex gap-6 pt-4 pb-4 min-width-max pr-[200px]">
                                <p className='font-bold text-lg'>Version 0.1.0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default Dashboard;
