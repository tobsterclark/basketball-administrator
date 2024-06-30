
type ViewType = (props: ViewProps) => React.JSX.Element

type ViewProps = {
    onCompetitionSelect: (competition: Competition, view: ViewType) => void,
    competitions: Competition[]
}

interface Competition {
    displayName: string
}
