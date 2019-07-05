import React, { Component } from 'react';
import { Link } from "react-router-dom";
import isEmpty from 'lodash/isEmpty';
import moment from 'moment'
import Moment from 'react-moment';
import 'moment-timezone';

import { FlashMessageComponent } from "../../flashMessageComponent";


class ProductionInspectionaRowComponent extends Component {
    render() {
        const { didPass, createdAt, absoluteUrl } = this.props.productionInspection;
        const { timezone } = this.props;
        const didNotPass = didPass === false;
        return (
            <tr key={createdAt}>
                <th scope="row">
                    {didPass &&
                        <i className={'fas fa-check-circle'} style={{color:'green'}}></i>
                    }
                    {didNotPass &&
                        <i className={'fas fa-times-circle'} style={{color:'red'}}></i>
                    }
                </th>
                <td>
                    <Moment tz={timezone} format="YYYY/MM/DD hh:mm:ss a">
                        {createdAt}
                    </Moment>
                </td>
                <td>
                    <Link to={absoluteUrl}>
                        View&nbsp;<i className="fas fa-chevron-right"></i>
                    </Link>
                </td>
            </tr>
        )
    }
}


class ProductionInspectionaTableComponent extends Component {
    render() {
        const { user, productionDetail, productionInspectionList } = this.props;
        if (productionInspectionList === undefined || productionInspectionList === null || productionInspectionList.results === null || productionInspectionList.results === undefined) {
            return null;
        }

        let tableRows = [];
        var arrayLength = productionInspectionList.results.length;
        for (var i = 0; i < arrayLength; i++) {
            let productionInspection =  productionInspectionList.results[i];
            tableRows.push(
                <ProductionInspectionaRowComponent
                    productionInspection={productionInspection}
                    key={productionInspection.createdAt}
                    timezone={user.timezone}
                />
            );
        }

        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Pass?</th>
                            <th scope="col">Timestamp</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        )
    }
}



class InstrumentDataTablePagination extends Component {
    render() {

        let nextButtonElement;
        let previousButtonElement;
        const { next, previous, page } = this.props.productionInspectionList;
        const { onPaginatorNextClick, onPaginatorPreviousClick, nextIsLoading, previousIsLoading } = this.props;
        const onlyOnePage = next && previous;

        if (next) {
            nextButtonElement = (
                <button
                    disabled={nextIsLoading}
                    className="btn btn-lg btn-success float-right"
                    onClick={onPaginatorNextClick}>
                        {nextIsLoading &&
                            <img src="/img/ajax-loading.gif" alt="Busy" height="32" width="32" />
                        }
                        Next&nbsp;<i className={'fas fa-arrow-right'}></i>
                </button>
            )
        }
        if (previous) {
            previousButtonElement = (
                <button
                    disabled={previousIsLoading}
                    className="btn btn-lg btn-success float-left"
                    onClick={onPaginatorPreviousClick}>
                        {previousIsLoading &&
                            <img src="/img/ajax-loading.gif" alt="Busy" height="32" width="32" />
                        }
                        <i className={'fas fa-arrow-left'}></i>&nbsp;Previous
                </button>
            )
        }

        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm">
                            {previousButtonElement}
                        </div>
                        {onlyOnePage &&
                            <div className="col-sm">
                                <p style={{textAlign: 'center'}}>Page: {page}</p>
                            </div>
                        }
                        <div className="col-sm">
                            {nextButtonElement}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


class ProductionInspectionComponent extends Component {
    render() {
        const { user, productionDetail, productionInspectionList, flashMessage, onAddClick } = this.props;
        const objectList = productionInspectionList.results;
        const isObjectListNotEmpty = isEmpty(objectList) === false;
        const isObjectListEmpty = isEmpty(objectList) === true;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/productions"><i className="fas fa-industry"></i>&nbsp;Crop Production</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/production/${productionDetail.slug}`}><i className="fas fa-leaf"></i>&nbsp;{productionDetail.name}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-eye"></i>&nbsp;Inspection
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1>
                    <i className="fas fa-eye"></i>&nbsp;Inspection
                </h1>

                {isObjectListNotEmpty &&
                    <div>
                        <section className="row text-center placeholders">
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to={`/production/${productionDetail.slug}/create-inspection/start`} className="d-block link-ndecor" title="Clients">
                                        <h1 className="circle-title">
                                            <i className="fas fa-plus"></i>
                                        </h1>
                                    </Link>
                                </div>
                                <h4>Add Inspection</h4>
                                <div className="text-muted">Add your production inspection</div>
                            </div>
                        </section>
                        <div className="row">
                            <div className="col-md-12">
                                <h2><i className="fas fa-th-list"></i>&nbsp;Table</h2>
                                <ProductionInspectionaTableComponent
                                    user={user}
                                    productionDetail={productionDetail}
                                    productionInspectionList={productionInspectionList}
                                />
                            </div>
                        </div>
                        <InstrumentDataTablePagination
                            productionInspectionList={productionInspectionList}
                            onPaginatorNextClick={null}
                            onPaginatorPreviousClick={null}
                            nextIsLoading={false}
                            previousIsLoading={false}
                        />
                    </div>
                }
                {isObjectListEmpty &&
                    <div className="jumbotron">
                        <h1 className="display-4">
                            <i className="fas fa-bullhorn"></i>&nbsp;Attention
                        </h1>
                        <p className="lead">You currently do not have any production inspections at the moment.</p>
                        <hr className="my-4" />
                        <p>If you would like to create an inspection, please start by clicking below.</p>
                        <p className="lead">
                            <button onClick={onAddClick} className="btn btn-success btn-lg">
                                <i className="fas fa-plus"></i>&nbsp;Add
                            </button>
                        </p>
                    </div>
                }
            </div>
        );
    }
}


export default ProductionInspectionComponent;
