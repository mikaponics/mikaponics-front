import React, { Component } from 'react';
import { Link } from "react-router-dom";
import classnames from 'classnames';


export default class ProductionInspectionCreateWizardNavigationComponent extends Component {
    render() {
        const {
            productionInspectionDetail=null,
            productionCropInspectionDetail=null,
            isFirst,
            isLast
        } = this.props;

        // DEFENSIVE CODE: DO NOT LOAD THE STEP NAVIGATION IF NO DETAILS OBJECT.
        if (productionInspectionDetail === undefined || productionInspectionDetail === null) { return null; }

        // EXTRACT THE `CROP INSPECTIONS` ASSOCIATED WITH THIS `INSPECTION`.
        const cropInspectionsArr = productionInspectionDetail.crops;

        // VARIABLE USED FOR POPULATING OUR GUI.
        const elements = [];

        // GENERATE A UNIQUE STEP NAVIGATION TAB BASED ON THE `CROP INSPECTION`
        // THAT WE HAVE INSIDE OUR `INSPECTION` OBJECT.
        let finalNum = cropInspectionsArr.length + 2;
        for (let i = 0; i < cropInspectionsArr.length; i++) {
            let num = i + 2;
            let cropInspectionItem = cropInspectionsArr[i];

            // DETECT THAT THE `CROP INSPECTION` WE ARE SEARCHING FOR MATCHES
            // THE `CROP INSPECTION` ADDED IN THIS COMPONENTS PARAMTER PROPS.
            let isThis = false;
            if (productionCropInspectionDetail !== undefined && productionCropInspectionDetail !== null) {
                isThis = (cropInspectionItem.slug === productionCropInspectionDetail.slug) &&
                         (isLast === false) &&
                         (isFirst === false);
            }

            // GENERATE OUR STEP NAVIGATION.
            elements.push(
                <div id="step-5" className={classnames('st-grey', { 'active': isThis })}>
                    <span className="num">{num}.</span><span className="">{cropInspectionItem.productionCropName}</span>
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
