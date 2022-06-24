import {Skeleton} from "@mui/material"
import {FC} from "react"
import StyledTableCell from "./StyledTableCell"
import StyledTableRow from "./StyledTableRow"

interface Props {
    rowCount: number
    cellCount: number
}

const TableLoadingMockup: FC<Props> = ({rowCount, cellCount}) => {
    return (
        <>
            {[...Array(rowCount)].map(() => (
                <StyledTableRow>
                    {[...Array(cellCount)].map(() => (
                        <StyledTableCell>
                            <Skeleton height='60px' sx={{margin: 0}}/>
                        </StyledTableCell>
                    ))}
                </StyledTableRow>
            ))}
        </>
    )
}

export default TableLoadingMockup