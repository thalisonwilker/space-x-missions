import React, { Component } from 'react'

import axios from 'axios'

export default class List extends Component {

    constructor(props){
        super(props)
        this.state = {
                    missions: []
                }
        axios.get('https://api.spacexdata.com/v3/launches')
        .then( resp => {
            console.log(resp);
            
            this.setState({ ...this, missions: resp.data})
        })
        
    }

    toggle = () => {
        this.setState({ open: true })
    }

    showState = () => {
        console.log(this.state.missions)
    }

    listGroupItem = props => {
        return 
    }


    render(){
        
        return <div className="container">

                <div className="col-md-8 mx-auto">
                <ul className="list-group">
                    {
                    this.state.missions.map( (mission) => {
                        return <li className="list-group-item my-2" key={mission.flight_number}>
                        <div className="media">
                            <img  style={{maxWidth: 100}} className="img-fluid" src={mission.links.mission_patch_small}/>
                        <div className="media-body">
                            <h4 className="text-center">
                            {mission.mission_name}
                            </h4>
                            <p className="text-center mt-2 ">
                                <a data-toggle="collapse"
                                data-target={'#collapse'+mission.flight_number} className="btn btn-sm btn-primary" href="#">More Info ..</a>
                            </p>
                            <div id={'collapse'+mission.flight_number} className="collapse">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                    Details: {mission.details}
                                    </li>
                                    <li className="list-group-item">
                                    Launch Success: <span className={
                                        mission.launch_success
                                        ? 'badge badge-success' : 'badge badge-danger'
                                    }>
                                    {
                                        mission.launch_success
                                        ? 'yes' : 'no'
                                    }
                                    </span>
                                    </li>
                                    <li className="list-group-item">
                                        Launch Date Local: {mission.launch_date_local}
                                    </li>
                                    <li className="list-group-item">
                                        Rocket name: {mission.rocket.rocket_name}
                                    </li>
                                    
                                    <li className="list-group-item">
                                        Rocket type: {mission.rocket.rocket_type}
                                    </li>

                                </ul>
                            </div>
                        </div>
                        </div>
                        
                        </li>
                        })
                    }
                </ul>
                </div>

            </div>
    }

}