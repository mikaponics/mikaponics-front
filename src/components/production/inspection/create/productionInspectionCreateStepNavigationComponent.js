import React, { Component } from 'react';
import { Link } from "react-router-dom";
import classnames from 'classnames';


export default class ProductionInspectionCreateStepNavigationComponent extends Component {
    render() {
        const {
            cropInspections,
            cropInspection,
            isFirst,
            isLast
        } = this.props;

        // DEFENSIVE CODE: DO NOT LOAD THE STEP NAVIGTION IF ARRAY WAS NOT DEFINED.
        if (cropInspections === undefined || cropInspections === null) { return null; }

        // VARIABLE USED FOR POPULATING OUR GUI.
        const elements = [];

        // GENERATE A STEP NAVIGATION TAB BASED PER `CROP INSPECTION` THAT WE HAVE.
        let finalNum = cropInspections.length + 2;
        for (let i = 0; i < cropInspections.length; i++) {
            let num = i + 2;
            let cropInspectionItem = cropInspections[i];

            // DETECT THAT THE `CROP INSPECTION` WE ARE SEARCHING FOR MATCHES
            // THE `CROP INSPECTION`.
            let isSelectedTab = false;
            if (cropInspection !== undefined && cropInspection !== null) {
                isSelectedTab = (cropInspectionItem.slug === cropInspection.slug) && (isLast === false) && (isFirst === false);
            }

            // GENERATE OUR STEP NAVIGATION FOR THE `CROP INSPECTION`.
            elements.push(
                <div id="step-5" className={classnames('st-grey', { 'active': isSelectedTab })}>
                    <span className="num">{num}.</span><span className="">{cropInspectionItem.prettyName}</span>
                </div>
            )
        }

        return (
            <div className="row">
                <div className="step-navigation">
                    <div id="step-1" className={classnames('st-grey', { 'active': isFirst })}>
                        <span className="num">1.</span><span className="">Overall</span>
                    </div>
                    {elements}
                    <div id="step-5" className={classnames('st-grey', { 'active': isLast })}>
                        <span className="num">{finalNum}.</span><span className="">Review</span>
                    </div>
                </div>
            </div>
        );
    }
}
