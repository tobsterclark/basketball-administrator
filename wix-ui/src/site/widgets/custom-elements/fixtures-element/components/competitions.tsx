import { Table, TableActionCell, TableColumn, TableToolbar } from "@wix/design-system"
import { DocSend, FunnelChart } from "@wix/wix-ui-icons-common"
import React from "react"
import { Results } from "./results"
import { Ladder } from "./ladder"


export const Competitions: ViewType = (props: ViewProps) => {
    const { onCompetitionSelect, competitions } = props

    const columns: TableColumn<Competition>[] = [
        { title: "", render: (row) => row.displayName },
        {
            title: "",
            render: (row) => (
                <TableActionCell
                    primaryAction={{ text: "Fixture", onClick: () => { }, visibility: 'always' }}
                    secondaryActions={[
                        {
                            text: "Results",
                            icon: <DocSend />,
                            onClick: () => { onCompetitionSelect(row, Results) }
                        },
                        {
                            text: "Ladder",
                            icon: <FunnelChart />,
                            onClick: () => { onCompetitionSelect(row, Ladder) }
                        }
                    ]}
                    numOfVisibleSecondaryActions={2}
                    alwaysShowSecondaryActions={true}
                />
            )
        }
    ]

    return (
        <Table data={competitions} columns={columns}>
            <TableToolbar>
                <TableToolbar.Title>Competitions</TableToolbar.Title >
            </TableToolbar>
            <Table.Content titleBarVisible={false} />
        </Table >
    )
}
