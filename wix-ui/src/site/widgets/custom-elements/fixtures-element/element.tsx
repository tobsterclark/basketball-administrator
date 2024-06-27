import React from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import { Table, TableActionCell, TableColumn, TableToolbar, Text, WixDesignSystemProvider, InfoIcon } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { DocSend, FunnelChart } from '@wix/wix-ui-icons-common';

type Props = {
    name: string;
};

interface Competition {
    displayName: string
}

const exampleData: Competition[] = [
    { displayName: "Years 3/4" },
    { displayName: "Years 5/6" },
    { displayName: "Years 7/8" },
    { displayName: "Years 9-12" },
    { displayName: "Adults" }
]

function CustomElement(props: Props) {
    const columns: TableColumn<Competition>[] = [
        { title: "", render: (row) => row.displayName },
        {
            title: "",
            render: () => (
                <TableActionCell
                    primaryAction={{ text: "Fixture", onClick: () => { }, visibility: 'always' }}
                    secondaryActions={[
                        {
                            text: "Results",
                            icon: <DocSend />,
                            onClick: () => { }
                        },
                        {
                            text: "Ladder",
                            icon: <FunnelChart />,
                            onClick: () => { }
                        }
                    ]}
                    numOfVisibleSecondaryActions={2}
                    alwaysShowSecondaryActions={true}
                />
            )
        }
    ]

    return (
        <WixDesignSystemProvider>
            <div>
                <Table data={exampleData} columns={columns}>
                    <TableToolbar>
                        <TableToolbar.Title>Competitions</TableToolbar.Title >
                    </TableToolbar>
                    <Table.Content titleBarVisible={false} />
                </Table >
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
