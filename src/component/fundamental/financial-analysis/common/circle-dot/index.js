import React from 'react'
import './index.scss'

class CircleDot extends React.Component {

    constructor(props) {
        super(props);
    }

    caculateWidthHeightCircle = (keyTitle) => {
        let $width;
        let $height;
        if (keyTitle === 0) {
            $width = '14px';
            $height = '14px';
        } else {
            $width = '10px';
            $height = '10px';
        }

        return [$width, $height];
    }

    caclulateColorCircle = (value) => {
        if(value === undefined) {
            return;
        }
        let $classNameColor;
        if (value === 'Excellent') {
            $classNameColor = 'circle-excellent';
        } else if (value === 'Good') {
            $classNameColor = 'circle-good';
        } else if (value === 'Neutral') {
            $classNameColor = 'circle-neutral';
        } else if (value === 'Alert') {
            $classNameColor = 'circle-be-alert';
        } else if (value === 'Watch out') {
            $classNameColor = 'circle-watch-out';
        }

        return $classNameColor;
    }

    render() {
        const { keyTitle, value } = this.props;
        let [$width, $height] = this.caculateWidthHeightCircle(keyTitle);
        let $classNameColor = this.caclulateColorCircle(value);

        return (
            <div className="circle-dot">
                <div style={{ width: $width, height: $height }} className={`circle ${$classNameColor} `}></div>
            </div>
        );
    }
}

export default CircleDot;
