import { FormControl as FormChakra } from "@chakra-ui/core";

const FormControl = (props) => {
  return (
    <FormChakra {...props} className="form-control">
      {props.children}
    </FormChakra>
  );
};

export default FormControl;
