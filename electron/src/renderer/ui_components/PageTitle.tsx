import React from 'react';

type PageTitleProps = {
    text: string;
};

const PageTitle: React.FC<PageTitleProps> = ({ text }) => {
    return (
        <div>
            <span className="text-3xl font-semibold">{text}</span>
            <hr className="w-[400px] mt-2" />
        </div>
    );
};

export default PageTitle;
