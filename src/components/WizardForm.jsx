import { Formik } from "formik";
import React, { Component } from "react";
import PrevAndNextBtn from "./PrevAndNextBtn";

// type Props = {
//   setProgressBarWidth: (num: number) => void
// };
class Wizard extends Component {
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues
    };
  }

  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length),
      values
    }));

  previous = () => {
    const { children, setProgressBarWidth } = this.props;
    const childrenCount = React.Children.count(children);

    if (setProgressBarWidth !== undefined) {
      setProgressBarWidth(-childrenCount);
    }

    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }));
  };

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    return activePage.props.validate ? activePage.props.validate(values) : {};
    // try {
    //   if (!activePage.props.validationSchema) {
    //     return {};
    //   }
    //   await activePage.props.validationSchema.validate(values);
    // } catch (err) {
    //   console.log("err", err);
    // }
  };

  handleSubmit = (values, bag) => {
    const { children, onSubmit, setProgressBarWidth } = this.props;
    const { page } = this.state;
    const childrenCount = React.Children.count(children);
    const isLastPage = page === childrenCount - 1;

    if (isLastPage) {
      return onSubmit(values);
    }

    if (setProgressBarWidth !== undefined) {
      setProgressBarWidth(childrenCount);
    }

    this.next(values);

    bag.setSubmitting(false);
  };

  render() {
    const { children, idForFormEl, prevAndNextBtnClassName } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;

    return (
      <Formik
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form id={idForFormEl} onSubmit={handleSubmit}>
            {activePage}
            <PrevAndNextBtn
              className={prevAndNextBtnClassName}
              showBackBtn={page > 0}
              handleBackBtnClick={this.previous}
              isLastPage={isLastPage}
              isSubmitting={isSubmitting}
            />
          </form>
        )}
      </Formik>
    );
  }
}

export default Wizard;
