import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {SectionProps} from '../../utils/SectionProps';
import Image from "../elements/Image";

const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool
}

const defaultProps = {
  ...SectionProps.defaults,
  split: false
}

function CtaDonate(
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  split,
  ...props
) {

  const outerClasses = classNames(
    'cta section center-content-mobile reveal-from-bottom',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'cta-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider',
    split && 'cta-split'
  );

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div
          className={innerClasses}
        >
          <div className="center-content">
            <h5 className="m-0">
              Donate ETH here to support the development:
            </h5>
            <p className="mb-16">
              0x400Fc9C7F01Df3aa919659De434E0c584e68CB29
            </p>
            <Image
              src={require('./../../assets/images/donate_wallet_qr.png')}
              alt="Features split 01"
              width={275}
              height={225}/>
          </div>
        </div>
      </div>
    </section>
  );
}

CtaDonate.propTypes = propTypes;
CtaDonate.defaultProps = defaultProps;

export default CtaDonate;
