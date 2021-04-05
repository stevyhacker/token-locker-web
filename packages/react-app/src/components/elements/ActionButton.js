import {styled} from "@material-ui/core/styles";
import Button from "./Button";

const ActionButton = styled(Button)({
  background: 'linear-gradient(45deg, #429DDA 30%, #5773DD 90%)',
  border: 0,
  borderRadius: 3,
  // boxShadow: '0 2px 2px 2px rgba(33, 203, 243, .3)',
  color: 'white'
});

export default ActionButton
