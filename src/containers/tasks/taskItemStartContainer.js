import React, { Component } from 'react';
import { connect } from 'react-redux';

import TaskItemStartComponent from "../../components/tasks/taskItemStartComponent";
import { pullTaskItemDetail } from "../../actions/taskItemDetailActions";


class TaskItemStartContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            taskSlug: slug,
            isLoading: false
        }
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullTaskItemDetail(this.props.user, this.props.match.params.slug);
    } // end FUNC.

    onClick(e) {
        e.preventDefault();
        if (this.props.taskDetail.typeOf === 1) {
            const aURL = '/task/production-inspection/'+this.props.taskDetail.productionInspectionSlug;
            this.props.history.push(aURL);
        }
    }

    render() {
        return (
            <TaskItemStartComponent
               taskDetail={this.props.taskDetail}
               user={this.props.user}
               onClick={this.onClick}
               isLoading={this.state.isLoading}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        taskDetail: store.taskItemDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullTaskItemDetail: (user, taskSlug) => {
            dispatch(
                pullTaskItemDetail(user, taskSlug)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskItemStartContainer);
