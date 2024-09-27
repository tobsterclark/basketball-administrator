/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    ArrowTrendingUpIcon,
    CalendarDaysIcon,
    Cog6ToothIcon,
    GlobeAsiaAustraliaIcon,
    Squares2X2Icon,
} from '@heroicons/react/24/solid';

const Navbar = () => {
    const locationPathName = useLocation().pathname;

    const links = (
        divStyle: string,
        linkStyle: string,
        iconStyle: string,
        textStyle: string,
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
                name: 'Roster',
                link: '/roster',
                icon: <CalendarDaysIcon className={iconStyle} />,
            },
            {
                name: 'Players',
                link: '/players',
                icon: <GlobeAsiaAustraliaIcon className={iconStyle} />,
            },
            {
                name: 'Teams',
                link: '/teams',
                icon: <ArrowTrendingUpIcon className={iconStyle} />,
            },
        ];

        return (
            <div className={divStyle}>
                {linkList.map((value, index) => {
                    let fullLinkStyle = linkStyle;
                    fullLinkStyle += ` rounded-lg ${
                        locationPathName === value.link
                            ? 'bg-red-500 shadow-sm'
                            : 'hover:bg-gray-100 bg-transparent'
                    }`;

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
            {links('flex flex-col gap-8', 'flex gap-3 p-2', 'w-6 h-6', '')}
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

    return (
        <nav className="overflow-hidden w-fit flex-none">
            {/* styles for screens greater than lg */}
            {large()}
            {/* styles for screens greater than md */}
            {medium()}
        </nav>
    );
};

export default Navbar;
