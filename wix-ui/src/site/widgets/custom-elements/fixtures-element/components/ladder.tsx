import { Table, TableColumn, TableToolbar } from "@wix/design-system"
import React from "react"

export const Ladder: ViewType = (props: ViewProps) => {
    const columns: TableColumn<Competition>[] = [
        { title: "Pos", render: (row) => row.displayName },
        { title: "Team", render: (row) => row.displayName },
        { title: "PTS", render: (row) => row.displayName },
        // TODO: Change this name or add tool tip
        { title: "P", render: (row) => row.displayName },
        { title: "W", render: (row) => row.displayName },
        { title: "L", render: (row) => row.displayName },
        { title: "For", render: (row) => row.displayName },
        { title: "Agst", render: (row) => row.displayName },
    ]

    return (
        <Table data={props.competitions} columns={columns}>
            <TableToolbar>
                <TableToolbar.Title>Ladder</TableToolbar.Title >
                <TableToolbar.Label></TableToolbar.Label>
            </TableToolbar>
            <Table.Content titleBarVisible={false} />
        </Table >
    )
}
