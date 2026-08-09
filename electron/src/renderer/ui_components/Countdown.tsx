import { useEffect, useState } from 'react';

const segments: Record<string, number[]> = {
    '0': [0, 1, 2, 3, 4, 5],
    '1': [1, 2],
    '2': [0, 1, 6, 4, 3],
    '3': [0, 1, 2, 3, 6],
    '4': [5, 6, 1, 2],
    '5': [0, 5, 6, 2, 3],
    '6': [0, 5, 6, 4, 3, 2],
    '7': [0, 1, 2],
    '8': [0, 1, 2, 3, 4, 5, 6],
    '9': [0, 1, 2, 3, 5, 6],
};

function SevenSegmentDigit({ digit }: { digit: string }) {
    const activeSegments = segments[digit] ?? [];

    const segment = (
        index: number,
        type: 'h' | 'v',
        position: string
    ) => (
        <div
            className={`segment segment-${type} ${position} ${
                activeSegments.includes(index) ? 'segment-on' : ''
            }`}
        />
    );

    return (
        <div className="relative h-12 w-7">
            {segment(0, 'h', 'top')}
            {segment(1, 'v', 'upper-right')}
            {segment(2, 'v', 'lower-right')}
            {segment(3, 'h', 'bottom')}
            {segment(4, 'v', 'lower-left')}
            {segment(5, 'v', 'upper-left')}
            {segment(6, 'h', 'middle')}
        </div>
    );
}

function SevenSegmentNumber({ value }: { value: number }) {
    return (
        <div className="flex gap-0.5">
            {value
                .toString()
                .padStart(2, '0')
                .split('')
                .map((digit, index) => (
                    <SevenSegmentDigit
                        key={index}
                        digit={digit}
                    />
                ))}
        </div>
    );
}

function addYears(date: Date, years: number) {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
}

function addMonths(date: Date, months: number) {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}

function getTimeLeft(targetDate: Date) {
    const now = new Date();

    if (now >= targetDate) {
        return {
            years: 0,
            months: 0,
            weeks: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

    let cursor = new Date(now);

    // Years
    let years = targetDate.getFullYear() - cursor.getFullYear();

    let candidate = addYears(cursor, years);

    if (candidate > targetDate) {
        years--;
        candidate = addYears(cursor, years);
    }

    cursor = candidate;

    // Months
    let months =
        (targetDate.getFullYear() - cursor.getFullYear()) * 12 +
        (targetDate.getMonth() - cursor.getMonth());

    candidate = addMonths(cursor, months);

    if (candidate > targetDate) {
        months--;
        candidate = addMonths(cursor, months);
    }

    cursor = candidate;

    // Everything remaining is a simple duration
    let remaining = targetDate.getTime() - cursor.getTime();

    const WEEK = 7 * 24 * 60 * 60 * 1000;
    const DAY = 24 * 60 * 60 * 1000;
    const HOUR = 60 * 60 * 1000;
    const MINUTE = 60 * 1000;
    const SECOND = 1000;

    const weeks = Math.floor(remaining / WEEK);
    remaining -= weeks * WEEK;

    const days = Math.floor(remaining / DAY);
    remaining -= days * DAY;

    const hours = Math.floor(remaining / HOUR);
    remaining -= hours * HOUR;

    const minutes = Math.floor(remaining / MINUTE);
    remaining -= minutes * MINUTE;

    const seconds = Math.floor(remaining / SECOND);

    return {
        years,
        months,
        weeks,
        days,
        hours,
        minutes,
        seconds,
    };
}

export default function Countdown() {
    const targetDate = new Date('2029-07-01T00:00:00');

    const [timeLeft, setTimeLeft] = useState(() =>
        getTimeLeft(targetDate)
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const units = [
        {
            label: 'YEARS',
            value: timeLeft.years,
        },
        {
            label: 'MONTHS',
            value: timeLeft.months,
        },
        {
            label: 'WEEKS',
            value: timeLeft.weeks,
        },
        {
            label: 'DAYS',
            value: timeLeft.days,
        },
        {
            label: 'HOURS',
            value: timeLeft.hours,
        },
        {
            label: 'MINUTES',
            value: timeLeft.minutes,
        },
        {
            label: 'SECONDS',
            value: timeLeft.seconds,
        },
    ];

    return (
        <div className="pt-8">
            <h2 className="text-2xl font-bold">
                Countdown for new app launch
            </h2>

            <h3 className="text-md text-gray-900 font-semibold">
                (2-5 business years)
            </h3>

            <div
                className="
                    mt-6
                    w-[760px]
                    max-w-full
                    rounded-lg
                    border-4 border-gray-800
                    bg-[#111]
                    p-4
                    shadow-[inset_0_0_20px_rgba(0,0,0,0.8),6px_6px_0_#999]
                "
            >
                <div className="grid w-full grid-cols-7">
                    {units.map((unit, index) => (
                        <div
                            key={unit.label}
                            className="
                                relative
                                flex
                                min-w-0
                                items-start
                                justify-center
                            "
                        >
                            <div className="flex flex-col items-center">
                                <div className="rounded bg-black px-2.5 py-3">
                                    <SevenSegmentNumber
                                        value={unit.value}
                                    />
                                </div>

                                <span
                                    className="
                                        mt-2
                                        whitespace-nowrap
                                        font-mono
                                        text-[8px]
                                        font-bold
                                        tracking-[0.2em]
                                        text-gray-500
                                    "
                                >
                                    {unit.label}
                                </span>
                            </div>

                            {index < units.length - 1 && (
                                <div
                                    className="
                                        absolute
                                        -right-1
                                        top-7
                                        flex
                                        flex-col
                                        gap-2
                                    "
                                >
                                    <div className="h-1.5 w-1.5 rounded-full bg-gray-600" />
                                    <div className="h-1.5 w-1.5 rounded-full bg-gray-600" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .segment {
                    position: absolute;
                    background: #111;
                    opacity: 0.45;
                }

                .segment-h {
                    width: 21px;
                    height: 5px;

                    clip-path: polygon(
                        3px 0,
                        calc(100% - 3px) 0,
                        100% 50%,
                        calc(100% - 3px) 100%,
                        3px 100%,
                        0 50%
                    );
                }

                .segment-v {
                    width: 5px;
                    height: 19px;

                    clip-path: polygon(
                        50% 0,
                        100% 3px,
                        100% calc(100% - 3px),
                        50% 100%,
                        0 calc(100% - 3px),
                        0 3px
                    );
                }

                .segment-on {
                    background: #ff3b30;
                    opacity: 1;

                    box-shadow:
                        0 0 3px #ff3b30,
                        0 0 8px rgba(255, 59, 48, 0.65);
                }

                .top {
                    left: 3px;
                    top: 0;
                }

                .upper-right {
                    right: 0;
                    top: 2px;
                }

                .lower-right {
                    right: 0;
                    bottom: 2px;
                }

                .bottom {
                    left: 3px;
                    bottom: 0;
                }

                .lower-left {
                    left: 0;
                    bottom: 2px;
                }

                .upper-left {
                    left: 0;
                    top: 2px;
                }

                .middle {
                    left: 3px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            `}</style>
        </div>
    );
}