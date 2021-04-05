import React from 'react';
import classNames from 'classnames';
import {SectionSplitProps} from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';

const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

function FeaturesSplit(
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
) {

  const outerClasses = classNames(
    'features-split section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-split-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );

  const sectionHeader = {
    title: '',
    paragraph: 'Have you ever seen a token you once owned jump 10x after a year since you sold it and regretted it?'
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content data-reveal-600"/>
          <div className={splitClasses}>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left"
                   data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Secure and open source
                </div>
                <h3 className="mt-0 mb-12">
                  Easy to use
                </h3>
                <p className="m-0">
                  By depositing your tokens in a time-locked smart contract wallet you prevent market volatility
                  influencing your long term investing decisions.
                </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                   data-reveal-container=".split-item">
                <Image
                  src={require('./../../assets/images/drawn_illustration.png')}
                  alt="Features split 01"
                  width={528}
                  height={396}/>
              </div>
            </div>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-right"
                   data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                 No hidden fees
                </div>
                <h3 className="mt-0 mb-12">
                  Transparent costs
                </h3>
                <p className="m-0">
                  After the time period you set when depositing passes, you will be able to withdraw your tokens and the
                  only cost will be the transaction gas cost.
                </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                   data-reveal-container=".split-item">
                <Image
                  src={require('./../../assets/images/drawn_illustration_2.png')}
                  alt="Features split 02"
                  width={528}
                  height={396}/>
              </div>
            </div>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left"
                   data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Prevents hasty decisions
                </div>
                <h3 className="mt-0 mb-12">
                  Keep your long term plans
                </h3>
                <p className="m-0">
                  If you change your mind and want to instantly withdraw without respecting the locked time period in
                  order to discourage the user a fee of 20 percent will be applied.
                </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                   data-reveal-container=".split-item">
                <Image
                  src={require('./../../assets/images/drawn_illustration_3.png')}
                  alt="Features split 03"
                  width={528}
                  height={396}/>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
