import React, { Component } from 'react';
import { Link } from "react-router-dom";
import classnames from 'classnames';


export default class ProductionTerminateWizard extends Component {
    render() {
        const { pageIndex=0, crops, isFirst, isLast } = this.props;
        if (crops === undefined || crops === null) { return null; }
        const elements = [];

        let finalNum = crops.length + 2;
        for (let i = 0; i < crops.length; i++) {
            let num = i + 2;
            let crop = crops[i];
            let isThis = (i === pageIndex) && (isLast === false) && (isFirst === false);
            elements.push(
                <div id="step-5" className={classnames('st-grey', { 'active': isThis })}>
                    <span className="num">{num}.</span><span className="">{crop.crop}</span>
                </div>
            )
        }
        return (
            <div className="row">
                <div className="step-navigation">
                    <div id="step-1" className={classnames('st-grey', { 'active': isFirst })}>
                        <span className="num">1.</span><span className="">Begin</span>
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
