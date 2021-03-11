import React from 'react';
import classNames from 'classnames';
import {SectionSplitProps} from '../../utils/SectionProps';

const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

function ContactForm(
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
    'section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>

          <div className="split-item-content center-content center-content-mobile reveal-from-left">
            <div className="text-xxs text-color-primary fw-400 tt-u mb-8">
              All Feedback is appreciated
            </div>
            <h3 className="mt-0 mb-32">
              Contact Us
            </h3>
            <p className="m-0">
              If you have some questions or wish to give some thoughts on the app, don't hesitate to send us a message.<br/>
              In case you have issues with using the app we will try our best to assist you.<br/>
              You can always reach us via email at:
            </p>
            <h4 className="m-8">tokenlocker@protonmail.com</h4>
            <p className="mt-32">
              You can also follow @tokenlocker on Twitter or join the Telegram community.<br/>
              Direct links to the official social media accounts are on the right bottom corner.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

ContactForm.propTypes = propTypes;
ContactForm.defaultProps = defaultProps;

export default ContactForm;
