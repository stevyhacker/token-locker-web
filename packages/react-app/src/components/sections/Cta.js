import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {SectionProps} from '../../utils/SectionProps';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool
}

const defaultProps = {
  ...SectionProps.defaults,
  split: false
}

const post = async (data) => {
  const url = "https://oc6wd9kndf.execute-api.eu-central-1.amazonaws.com/email/signup";

  const params = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  const response = await fetch(url, params);

  if (response.status < 200 && response.status >= 300) {
    const res = await response.json();

    throw new Error(res);
  }

  return response.json();
};

function isEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
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

  const [email, setEmail] = useState();
  const [emailLabel, setEmailLabel] = useState("Your email here");

  function handleChange(event) {
    const email = event.target.value;
    setEmail(email)
  }

  function handleSubmit() {
    if (isEmail(email)) {
      const payload = {
        "email": email
      };

      post(payload)
        .then(() => {
          setEmailLabel("Your email is saved.")
        })
        .catch(error => {
          // this.setState({error: error.message, submitted: false});
        });
    }
  }

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
          <div className="cta-slogan">
            <h4 className="m-0">
              Get updates about this and future projects?
            </h4>
          </div>
          <div className="cta-action">
            <ValidatorForm
              onSubmit={handleSubmit}
              onError={errors => console.log(errors)}>
              <TextValidator
                label={emailLabel}
                onChange={handleChange}
                name="email"
                value={email}
                validators={['isEmail']}
                errorMessages={['Email is not valid']}
              />
            </ValidatorForm>
          </div>
        </div>
      </div>
    </section>
  );
}

Cta.propTypes = propTypes;
Cta.defaultProps = defaultProps;

export default Cta;
