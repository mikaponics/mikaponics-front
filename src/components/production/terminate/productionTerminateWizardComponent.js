import React, { Component } from 'react';
import { Link } from "react-router-dom";
import classnames from 'classnames';


export default class ProductionTerminateWizardComponent extends Component {
    render() {
        const { crop, crops, isFirst, isLast } = this.props;
        if (crops === undefined || crops === null) { return null; }
        const elements = [];

        let finalNum = crops.length + 2;
        for (let i = 0; i < crops.length; i++) {
            let num = i + 2;
            let searchCrop = crops[i];
            let isThis = (searchCrop === crop) && (isLast === false) && (isFirst === false);
            elements.push(
                <div id="step-5" className={classnames('st-grey', { 'active': isThis })}>
                    {isThis
                        ? <strong><span className="num">{num}.</span><span className="">{searchCrop.prettyName}</span></strong>
                        : <div><span className="num">{num}.</span><span className="">{searchCrop.prettyName}</span></div>
                    }
                </div>
            )
        }
        return (
            <div className="row">
                <div className="step-navigation">
                    <div id="step-1" className={classnames('st-grey', { 'active': isFirst })}>
                        {isFirst
                            ? <strong><span className="num">1.</span><span className="">Overall</span></strong>
                            : <div><span className="num">1.</span><span className="">Overall</span></div>
                        }

                    </div>
                    {elements}
                    <div id="step-5" className={classnames('st-grey', { 'active': isLast })}>
                        {isLast
                            ? <strong><span className="num">{finalNum}.</span><span className="">Review</span></strong>
                            : <div><span className="num">{finalNum}.</span><span className="">Review</span></div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
