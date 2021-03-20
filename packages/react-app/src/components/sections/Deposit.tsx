import React from 'react';
import {SectionProps} from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import {useQuery} from "@apollo/react-hooks";
import GET_TRANSFERS from "../../graphql/subgraph";
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Slider from '@material-ui/core/Slider';
import {styled} from '@material-ui/core/styles';
import tokenList from "../../assets/tokens/coinGeckoTokenList.json";
import {Typography} from "@material-ui/core";

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

function Deposit() {

  const {loading, error, data} = useQuery(GET_TRANSFERS);

  React.useEffect(() => {
    if (!loading && !error && data && data.transfers) {
      console.log({transfers: data.transfers});
    }
  }, [loading, error, data]);

  const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
  }));

  const DepositButton = styled(Button)({
    background: 'linear-gradient(45deg, #429DDA 30%, #5773DD 90%)',
    border: 0,
    borderRadius: 3,
    // boxShadow: '0 2px 2px 2px rgba(33, 203, 243, .3)',
    color: 'white'
  });

  const classes = useStyles();

  function valuetext(value: number) {
    marks[0].value = value
    marks[0].label = value + "%"
    return `${value} %`;
  }

  const marks = [
    {
      value: 20,
      label: '20%',
    }
  ];

  return (
    <section className="hero section center-content">
      <div className="container-sm p-32">
        <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
          Lock <span className="text-color-primary">Token</span>
        </h1>
        <p className="mt-24 mb-32 reveal-from-bottom" data-reveal-delay="400">
          Pick an ERC20 token, choose the unlock date, set penalty fee and you are ready.
        </p>
        <div className="hero-inner">
          <div className="hero-content">
            <div className="container-xs">
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <div>
                  <h5 className="mt-32">Unlock time</h5>

                  <form noValidate>
                    <TextField
                      id="datetime-local"
                      type="datetime-local"
                      defaultValue="2022-01-01T00:00"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </form>

                  <h5 className="mt-16">Penalty fee</h5>
                  <p>This fee is only applied if you try to withdraw before the unlock time you have set above.</p>
                  <Typography id="discrete-slider-custom" gutterBottom/>
                  <Slider
                    defaultValue={20}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    valueLabelDisplay="off"
                    valueLabelFormat={valuetext}
                    marks={marks}
                    min={10}
                    max={100}
                  />
                </div>

                <Autocomplete
                  className="mt-24 mb-24"
                  options={tokenList.tokens}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField {...params} label="Select token" variant="outlined"/>}
                />

                <TextField id="standard-basic" type="number" variant="outlined" label="Amount"/>

                <ButtonGroup className="mt-32">
                  {/*<Button disabled wide wideMobile>Approve</Button>*/}
                  <DepositButton wide wideMobile>Deposit</DepositButton>
                </ButtonGroup>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Deposit.propTypes = propTypes;
Deposit.defaultProps = defaultProps;

export default Deposit;
