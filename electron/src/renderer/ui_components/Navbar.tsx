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

    return <nav className="overflow-hidden w-fit flex:none">{large()}</nav>;
};

export default Navbar;
