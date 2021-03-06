import * as React from 'react';
import { TextInput } from 'react-native';
import { FormProps } from './FormProps';

export default ({ register, errors, setValue, children }: FormProps) => {
  const Inputs = React.useRef<Array<TextInput>>([]);
  //console.log("REFS: " + JSON.stringify(Inputs, null, 4));
  //console.log("REFS: " + Inputs);

  React.useEffect(() => {
    (Array.isArray(children) ? children : [children]).forEach((child) => {
      if (child.props.name) {
        register(child.props.name);
        console.log('REGISTER: ' + child.props.name);
      }
    });
  }, [register]);

  return (
    <>
      {(Array.isArray(children) ? [...children] : [children]).map(
        (child, i) => {
          return child.props.name
            ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  ref: (e: TextInput) => {
                    Inputs.current[i] = e;
                  },
                  onChangeText: (v: string) =>
                    setValue(child.props.name, v, { shouldValidate: false }),
                  onSubmitEditing: () => {
                    Inputs.current[i + 1]
                      ? Inputs.current[i + 1].focus()
                      : Inputs.current[i].blur();
                  },
                  blurOnSubmit: false,
                  key: child.props.name,
                  error: errors[child.props.name],
                },
              })
            : child;
        }
      )}
    </>
  );
};
