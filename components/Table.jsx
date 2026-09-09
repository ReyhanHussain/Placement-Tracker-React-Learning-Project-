import React from 'react'

function Table({ AllInfos }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>ref</th>
                </tr>
            </thead>
            <tbody>
                {
                    AllInfos.map((singleInfo) => {
                        return (
                            <tr key={crypto.randomUUID()}>
                                <td>{singleInfo.company}</td>
                                <td>{singleInfo.role}</td>
                                <td><div className="statusCont">{singleInfo.status}</div></td>
                                <td>{singleInfo.date}</td>
                                <td>{singleInfo.ref}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default Table