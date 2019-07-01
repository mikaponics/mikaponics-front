import PropTypes from 'prop-types';
import React, {Fragment} from 'react';

import { BootstrapAlert } from "./bootstrap/bootstrapAlert";

/**
 * TODO: FINISH IMPLEMENTING.
 */
export const ServiceNoticeComponent = ({ user }) => {
    const text = <Fragment>
        <strong><i className="fas fa-server">&nbsp;</i>Service Notice</strong> - Please note a subscription is required. To subscribe to the service, please start by <a href='/account/subscription'>clicking here</a>.
    </Fragment>;
    return (
        <BootstrapAlert type="info" value={text} />
    )
}

ServiceNoticeComponent.propTypes = {
    object: PropTypes.object,
}

ServiceNoticeComponent.defaultProps = {
    object: null
}
