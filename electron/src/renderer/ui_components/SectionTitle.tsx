import React from 'react';

type SectionTitleProps = {
    text: string;
};

const SectionTitle: React.FC<SectionTitleProps> = ({ text }) => {
    return (
        <div>
            <span className="text-2xl font-bold">{text}</span>
        </div>
    );
};

export default SectionTitle;
