import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {SectionProps} from '../../utils/SectionProps';


const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool
}

const defaultProps = {
  ...SectionProps.defaults,
  split: false
}

function Cta(
  {
    className,
    topOuterDivider,
    bottomOuterDivider,
    topDivider,
    bottomDivider,
    hasBgColor,
    invertColor,
    split,
    ...props
  }) {

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
        <div className={innerClasses}>
          <div className="cta-slogan">
            <h4 className="m-0">
              Get updates about this and future projects?
            </h4>
          </div>
          <div className="cta-action">

            <div id="mc_embed_signup" className="p-8">
              <form
                action="https://tokenlocker.us1.list-manage.com/subscribe/post?u=d06099a33651374304048974a&amp;id=de4ac34f83"
                method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate"
                target="_blank" noValidate>
                <div id="mc_embed_signup_scroll">
                  <input type="email" name="EMAIL" className="email p-8" id="mce-EMAIL" placeholder="Your email"
                         required/>
                  <div style={{position: "absolute", left: "-5000px"}} aria-hidden="true">
                    <input type="text"
                           name="b_d06099a33651374304048974a_de4ac34f83"
                           tabIndex="-1" value=""/>
                  </div>
                  <button type="submit" value="Subscribe" name="subscribe"
                          id="mc-embedded-subscribe" className="button mt-8 ml-8">Subscribe
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

Cta.propTypes = propTypes;
Cta.defaultProps = defaultProps;

export default Cta;
