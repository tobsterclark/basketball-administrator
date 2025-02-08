/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    ArrowTrendingUpIcon,
    CalendarDaysIcon,
    ChartBarSquareIcon,
    Cog6ToothIcon,
    GlobeAsiaAustraliaIcon,
    LifebuoyIcon,
    Squares2X2Icon,
    WrenchIcon,
} from '@heroicons/react/24/solid';
import Logo from '../../../assets/LogoUI.png';
import { CakeIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const locationPathName = useLocation().pathname;

    const primary = 'rgb(236, 113, 36)';

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
                name: 'Game Results',
                link: '/results',
                icon: <ChartBarSquareIcon className={iconStyle} />,
            },
            {
                name: 'Roster',
                link: '/roster',
                icon: <CalendarDaysIcon className={`${iconStyle}`} />,
            },
            // Divider
            {
                name: '',
                link: '',
                icon: <hr className="w-full border-t border-gray-300" />,
            },
            {
                name: 'Term Setup',
                link: '/term-setup',
                icon: <WrenchIcon className={iconStyle} />,
            },
            {
                name: 'Game Setup',
                link: '/game-setup',
                icon: <LifebuoyIcon className={iconStyle} />,
            },
            {
                name: '',
                link: '',
                icon: <hr className="w-full border-t border-gray-300" />,
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
            {
                name: 'Age Groups',
                link: '/agegroups',
                icon: <CakeIcon className={iconStyle} />,
            },
            ...(process.env.NODE_ENV === 'development'
                ? [
                      {
                          name: '',
                          link: '',
                          icon: (
                              <hr className="w-full border-t border-gray-300" />
                          ),
                      },
                      {
                          name: 'Admin',
                          link: '/admin',
                          icon: <Cog6ToothIcon className={iconStyle} />,
                      },
                  ]
                : []),
        ];

        return (
            <div className={divStyle}>
                {linkList.map((value, index) => {
                    if (value.name === '') {
                        return (
                            <div key={index} className="my-1">
                                {value.icon}
                            </div>
                        );
                    }

                    let fullLinkStyle = linkStyle;
                    fullLinkStyle += ` rounded-lg text-slate-950 ${
                        locationPathName === value.link ||
                        (value.link === '/roster' &&
                            locationPathName === '/runsheets')
                            ? `bg-nsbl_primary shadow-sm`
                            : 'hover:bg-gray-100 bg-transparent'
                    }`;

                    const customMargin = 'my-2';

                    return (
                        <Link
                            to={value.link}
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            className={`${fullLinkStyle} ${customMargin}`}
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
            <div className="flex-col gap-2 items-center justify-start">
                {/* <LogoSVG className="h-16" /> */}

                {/* <h1 className="text-lg font-bold underline underline-offset-4 decoration-4 decoration-dustyBlue pb-4">
                    NSBL
                </h1> */}
                <img src={Logo} alt="logo" className="h-24 pl-4" />
            </div>
            {links('flex flex-col gap-2', 'flex gap-3 p-2', 'w-6 h-6', '')}
            <button
                type="button"
                // onClick={() => {
                // 	navigate(`/profile`)
                // }}
                className="font-extralight flex gap-3 mx-2"
            >
                {/* <Cog6ToothIcon
                    className="w-6 h-6 "
                    style={{ strokeWidth: 1 }}
                />
                Settings */}
            </button>
        </div>
    );

    const medium = () => (
        <div className="hidden md:flex flex-col justify-between items-center px-1 h-full pt-20 pb-5 w-fit min-w-fit text-xs border-r-2 border-dashed relative dark:bg-darkbg dark:border-darkgray">
            {/* <LogoSVG className="h-16" /> */}
            {links(
                'flex flex-col mx-2 dark:text-darktext',
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
                {/* <Cog6ToothIcon
                    className="w-6 h-6 "
                    style={{ strokeWidth: 1 }}
                />
                Settings */}
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
