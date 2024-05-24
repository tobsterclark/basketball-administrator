import React, { ReactNode } from 'react';

type PageContainerProps = {
    children: ReactNode;
};

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
    return (
        <div className="w-full h-full pl-12 pt-14 pr-12 overflow-y-auto">
            {children}
        </div>
    );
};

export default PageContainer;
