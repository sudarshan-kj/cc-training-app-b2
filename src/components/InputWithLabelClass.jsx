import { Component } from "react";

class InputWithLabelClass extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    //prior to unmount
  }

  componentDidUpdate() {
    //this would run based on previous props
  }

  componentDidMount() {
    //this would run only once!
  }

  render() {
    const { onChange, value, children, id, autoFocus } = this.props;
    return (
      <>
        <label htmlFor={id}>{children}</label>
        <input
          autoFocus={autoFocus}
          id={id}
          value={value}
          onChange={onChange}
        />
      </>
    );
  }
}

export default InputWithLabelClass;
