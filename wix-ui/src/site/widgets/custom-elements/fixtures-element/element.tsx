import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import { WixDesignSystemProvider } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { Fixtures } from './components/fixtures';
import { Competitions } from './components/competitions';

type Props = {
    name: string;
};

const exampleData: Competition[] = [
    { displayName: "Years 3/4" },
    { displayName: "Years 5/6" },
    { displayName: "Years 7/8" },
    { displayName: "Years 9-12" },
    { displayName: "Adults" }
]

function CustomElement(props: Props) {
    const [view, setView] = useState<ViewType>(Competitions)

    return (
        <WixDesignSystemProvider>
            <div>
                {view({ onCompetitionSelect: (competition: Competition, view: ViewType) => { setView(view) }, competitions: exampleData })}
            </div>
        </WixDesignSystemProvider>
    );
}

const customElement = reactToWebComponent(
    CustomElement,
    React,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReactDOM as any,
    {
        props: {
            name: 'string',
        },
    }
);

export default customElement;
