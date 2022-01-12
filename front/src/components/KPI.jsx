import React from 'react'



class KPI extends React.Component {
    constructor(props) {
        super(props)
        this.setState = {
            KPIUsers: 0,

        }
    }

    render() {
        return (
            <div className="grid-account-items">
                <h3>KPI</h3>
                <span>Number of Users: </span>
            </div>
        )
    }
}

export default KPI