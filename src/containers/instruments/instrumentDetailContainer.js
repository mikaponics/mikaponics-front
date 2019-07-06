import React, { Component } from 'react';
import { connect } from 'react-redux';

import CameraInstrumentDetailComponent from "../../components/instruments/cameraInstrumentDetailComponent";
import InstrumentDetailComponent from "../../components/instruments/instrumentDetailComponent";
import { pullInstrument } from "../../actions/instrumentActions";
import { clearFlashMessage } from "../../actions/flashMessageActions";
import { CAMERA_INSTRUMENT_TYPE } from "../../constants/api";


class InstrumentDetailContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            instrumentSlug: slug,
        }
    }

    componentDidMount() {
        this.props.pullInstrument(this.props.user, this.props.match.params.slug);
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    componentWillUnmount() {
        this.props.clearFlashMessage(); // Clear the messages.

        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        const { typeOf } = this.props.instrument;
        const isCamera = typeOf === CAMERA_INSTRUMENT_TYPE;
        const isNotCamera = typeOf !== CAMERA_INSTRUMENT_TYPE;
        console.log(typeOf, "|", isCamera, "|", isNotCamera);
        return (
            <div>
                {isNotCamera &&
                    <div>
                        <InstrumentDetailComponent
                            user={this.props.user}
                            instrument={this.props.instrument}
                            flashMessage={this.props.flashMessage}
                        />
                    </div>
                }
                {isCamera &&
                    <div>
                        <CameraInstrumentDetailComponent
                            user={this.props.user}
                            instrument={this.props.instrument}
                            flashMessage={this.props.flashMessage}
                        />
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        instrument: store.instrumentState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullInstrument: (user, instrumentSlug) => {
            dispatch(
                pullInstrument(user, instrumentSlug)
            )
        },
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstrumentDetailContainer);
