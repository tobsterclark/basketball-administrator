/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    ArrowTrendingUpIcon,
    CalendarDaysIcon,
    Cog6ToothIcon,
    GlobeAsiaAustraliaIcon,
    Squares2X2Icon,
} from '@heroicons/react/24/solid';

const Navbar = () => {
    const [mobileMenuShown, setMobileMenuShown] = useState<boolean>(false);
    const locationPathName = useLocation().pathname;

    const links = (
        divStyle: string,
        linkStyle: string,
        iconStyle: string,
        textStyle: string,
        mobile: boolean,
    ) => {
        const linkList: {
            name: string;
            link: string;
            icon: React.JSX.Element;
        }[] = [
            {
                name: 'Dashboard',
                link: '/',
                icon: <Squares2X2Icon className={iconStyle} />,
            },
            {
                name: 'Scores',
                link: '/question-finder',
                icon: <CalendarDaysIcon className={iconStyle} />,
            },
            {
                name: 'Players',
                link: '/question-search',
                icon: <GlobeAsiaAustraliaIcon className={iconStyle} />,
            },
            {
                name: 'Teams',
                link: '/courses',
                icon: <ArrowTrendingUpIcon className={iconStyle} />,
            },
        ];

        return (
            <div className={divStyle}>
                {linkList.map((value, index) => {
                    let fullLinkStyle = linkStyle;
                    if (!mobile) {
                        fullLinkStyle += ` rounded-lg ${
                            locationPathName === value.link
                                ? 'bg-red-500 shadow-sm'
                                : 'hover:bg-gray-100 bg-transparent'
                        }`;
                    }
                    return (
                        <Link
                            to={value.link}
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            className={fullLinkStyle}
                        >
                            {value.icon}
                            <span className={textStyle}>{value.name}</span>
                        </Link>
                    );
                })}
            </div>
        );
    };

    const large = () => (
        <div className="hidden text-md xl:flex flex-col justify-between h-full pt-20 pb-5 px-5 w-fit min-w-fit border-r-2 border-dashed">
            <div className="flex gap-2 items-center justify-start">
                {/* <LogoSVG className="h-16" /> */}
                <h1 className="text-lg font-bold underline underline-offset-4 decoration-4 decoration-dustyBlue shadow-xl">
                    NSBL
                </h1>
            </div>
            {links(
                'flex flex-col gap-8',
                'flex gap-3 p-2',
                'w-6 h-6',
                '',
                false,
            )}
            <button
                type="button"
                // onClick={() => {
                // 	navigate(`/profile`)
                // }}
                className="font-extralight flex gap-3 mx-2"
            >
                <Cog6ToothIcon
                    className="w-6 h-6 "
                    style={{ strokeWidth: 1 }}
                />
                Settings
            </button>
        </div>
    );

    const medium = () => (
        <div className="hidden md:flex flex-col justify-between items-center px-1 h-full pt-20 pb-5 w-fit min-w-fit text-xs border-r-2 border-dashed relative dark:bg-darkbg dark:border-darkgray">
            {/* <LogoSVG className="h-16" /> */}
            {links(
                'flex flex-col gap-6 mx-2 dark:text-darktext',
                'w-20 h-16 flex flex-col gap-1 justify-center items-center',
                'w-6 h-6',
                '',
                false,
            )}
            <button
                type="button"
                onClick={() => {
                    // navigate(`/profile`);
                }}
                className="font-light flex flex-col items-center justify-center gap-1 w-20 h-16 hover:bg-gray-100 rounded-xl dark:text-darktext dark:hover:bg-darkgray"
            >
                <Cog6ToothIcon
                    className="w-6 h-6 "
                    style={{ strokeWidth: 1 }}
                />
                Settings
            </button>
        </div>
    );

    const small = () => (
        <div
            className={`md:-right-1/2 absolute duration-300 right-0 bottom-0 h-full w-1/2 bg-gray-100 flex flex-col justify-around items-center p-5 ${
                mobileMenuShown ? 'flex' : '-right-1/2'
            }`}
        >
            <h1 className="text-2xl font-bold">Title</h1>
            {links('flex flex-col gap-10', 'flex gap-3', 'w-6 h-6', '', true)}
            <button
                type="button"
                onClick={() => {
                    // navigate(`/profile`);
                }}
                className="font-light flex gap-3"
            >
                <Cog6ToothIcon
                    className="w-6 h-6 "
                    style={{ strokeWidth: 1 }}
                />
                Settings
            </button>
        </div>
    );

    return (
        <nav className="overflow-hidden w-fit flex-none">
            {/* styles for screens greater than lg */}
            {large()}
            {/* styles for screens greater than md */}
            {medium()}
            {/* styles for screens smaller than md */}
            {small()}

            {/* Mobile Hambuger Menu */}
            <div
                className="absolute right-5 bottom-5 flex md:hidden bg-blue-500 flex-col gap-1 p-4 rounded-full"
                onClick={() => setMobileMenuShown(!mobileMenuShown)}
            >
                <div className="h-0.5 sm:flex hidden" />
                <div
                    className={`block bg-white w-4 duration-300 h-0.5 sm:w-8 sm:h-1 rounded-2xl ${
                        mobileMenuShown
                            ? 'translate-y-1.5 sm:translate-y-2 -rotate-45'
                            : ''
                    }`}
                />
                <div
                    className={`block bg-white w-4 duration-300 h-0.5 sm:w-8 sm:h-1 rounded-2xl ${
                        mobileMenuShown ? 'opacity-0' : ''
                    }`}
                />
                <div
                    className={`block bg-white w-4 duration-300 h-0.5 sm:w-8 sm:h-1 rounded-2xl ${
                        mobileMenuShown
                            ? '-translate-y-1.5 sm:-translate-y-2 rotate-45'
                            : ''
                    }`}
                />
                <div className="h-0.5 sm:flex hidden" />
            </div>
        </nav>
    );
};

export default Navbar;
