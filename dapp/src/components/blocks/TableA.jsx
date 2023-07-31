import cwhite from '../basics/Colors'
import {Box} from '@rebass/grid'
import React from 'react'
import Styled from 'styled-components'

const Table = Styled.table`
    margin-left: -30px;
    fontSize: 14px;
    & tr td:first-child {
        color: ${cwhite}
    }
    & tr {
        padding: 12px 30px;
    }
    & td {
        padding: 7px 30px;
    }
`

/*
    # Indicator A
    This components displays a value
*/
export default
    ({columns, rows, ...props}) =>
        <Box {...props}>
          {/* <Table>
            <tbody>
                <tr>
                    <th></th>
                    {columns.map((column, index) => <th key={index}>{column}</th>)}
                </tr>
                {rows.map((row, rindex) =>
                    <tr key={rindex}>
                        {row.map((field, index) => <td key={index}>{field}</td>)}
                    </tr>
                )}
            </tbody>
        </Table> */}

            <Table cla fontSize="14px">
                <tbody>
                    <tr>
                        <th></th>
                        {columns.map((column, index) => <th key={index}>{column}</th>)}
                    </tr>

                    {rows.map((row, rindex) =>
                        <td key={rindex}>
                            {row.map((price, pindex) =>
                            <tr key={pindex}>{rindex === 0 ? price : price}</tr>
                            )}
                        </td>
                    )}
                </tbody>
            </Table>
       </Box>
