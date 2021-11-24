import { FormControl as FormChakra } from "@chakra-ui/react";

const FormControl = (props) => {
  return (
    <FormChakra {...props} className="form-control">
      {props.children}
    </FormChakra>
  );
};

export default FormControl;
