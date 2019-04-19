import React, { Component } from 'react';
import { Link } from "react-router-dom";


class DeviceItem extends Component {
    render() {
        const { deviceObj } = this.props;
        return (
            <div className="col-sm-3" key={deviceObj.absoluteUrl}>
                <div className="card box-shadow text-center mx-auto">
                    <div className="card-custom-top-2">
                        <i className="fas fa-cube fa-3x"></i>
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">{deviceObj.name}</h3>
                        <p className="card-text">{deviceObj.description}</p>
                        <Link to={deviceObj.absoluteUrl} className="btn btn-success btn-lg">
                            View&nbsp;<i className="fas fa-arrow-circle-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}


class DeviceListComponent extends Component {
    render() {
        const { deviceList } = this.props;
        let elements = [];

        if (deviceList && deviceList.results) {
            for (let i = 0; i < deviceList.results.length; i++) {
                let device = deviceList.results[i];
                elements.push(
                    <DeviceItem deviceObj={device} key={device.absoluteUrl} />
                )
            }
        }

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-cubes"></i>&nbsp;Devices</li>
                    </ol>
                </nav>
                <h1><i className="fas fa-cubes"></i>&nbsp;Devices</h1>
                <hr />
                <div className="card-group row">
                    {elements}
                </div>
            </div>
        );
    }
}

export default DeviceListComponent;
