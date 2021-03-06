import React, { Component } from "react";
import { css } from "react-emotion";
import { connect } from "react-redux";
import AssistText from "../../../components/AssistText";
import Button from "../../../components/Button";
import ButtonWithIcon from "../../../components/ButtonWithIcon";
import Container from "../../../components/Container";
import Heading from "../../../components/Heading";
import ICONS from "../../../css/icons";
import spacing from "../../../css/spacing";
import { fontSize } from "../../../css/typography";
import {
  fontWeight500,
  marginBottom2,
  marginBottom3,
  marginRight2,
  paddingBottom1,
  paddingBottom3,
  paddingY3,
  relativeHeightWidth100,
  textAlignCenter
} from "../../../css/utilities";

function buildBarCss(holding, index) {
  return `
    position: absolute;
    top: 0;
    width: 100%;
    overflow-y: hidden;
    height: ${holding.weight * 1.5}%;
    background-color: ${BAR_COLORS[index]};
    animation: slide-in 0.8s forwards cubic-bezier(0.8, 0.02, 0.45, 0.91);

    @keyframes slide-in {
      0% {
        opacity: 0;
        transform: translateY(-50%);
      }

      50% {
        opacity: 1;
      }

      70%, 100% {
        transform: translateY(0);
      }
    }
    `;
}

const BAR_COLORS = ["#711d45", "#78e0f0", "#f1cf89", "#ee995d"];
class PortfolioReview extends Component {
  state = {};

  // activateModal = () => {
  //   this.setState({ modalActive: true });
  // };

  // deactivateModal = () => {
  //   this.setState({ modalActive: false });
  // };

  render() {
    const data = this.props.portfolio;

    return (
      <React.Fragment>
        {/* {this.state.modalActive && (
          <AriaModal
            titleText="Create an account"
            onExit={this.deactivateModal}
            underlayStyle={{ paddingTop: "2em" }}
            escapeExits={false}
            underlayClickExits={false}
            underlayColor="radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4) 0, rgba(0, 0, 0, 0.7) 100%);"
            initialFocus="#first_name"
          >
            <Register handleCloseModal={this.deactivateModal} />
          </AriaModal>
        )} */}
        <Container
          isColumn
          xAlign="center"
          className={css`
            background-color: #f5f5f5;
            ${textAlignCenter};
            ${paddingY3};
            ${marginBottom2};
            /* padding-top: 0; */
          `}
        >
          <div className={paddingBottom1}>
            Based on your answers, we recommend the
          </div>
          <div
            className={css`
              font-weight: 700;
              font-size: ${fontSize.subHeading};
              ${paddingBottom3};
            `}
          >
            {data.portfolio.name}
          </div>
          <Button
            className={css`
              margin-bottom: ${spacing.space1};
            `}
            onClick={this.activateModal}
          >
            Fund My Account
          </Button>
          <AssistText>Question? Chat with us</AssistText>
        </Container>
        <div
          className={css`
            position: relative;
            margin-left: ${spacing.space4};
            ${marginBottom3};

            &::before {
              content: "";
              position: absolute;
              top: -190px;
              bottom: 0;
              left: -15px;
              border-left: 1px solid rgba(0, 0, 0, 0.5);
            }
          `}
        >
          <Heading tag="h4">Allocation</Heading>
        </div>
        <Container
          xAlign="space-around"
          className={css`
            min-height: 17em;
            max-height: 17em;
          `}
        >
          {data.holdings.map((holding, i) => (
            <div
              className={css`
                flex-basis: 20%;
              `}
              key={holding.ticker}
            >
              <div className={textAlignCenter}>
                <div>{holding.assetClass}</div>
                <div className={fontWeight500}>{`${holding.weight}%`}</div>
              </div>
              <div className={relativeHeightWidth100}>
                <div
                  className={css`
                    ${buildBarCss(holding, i)};
                  `}
                />
              </div>
            </div>
          ))}
        </Container>
        <ButtonWithIcon
          className={css`
            position: relative;
            float: right;
            top: -${spacing.space4};
            ${marginRight2};
          `}
          icon={ICONS.HELP}
          outline
        >
          Learn more
        </ButtonWithIcon>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  portfolio: state.portfolioReview
});

export default connect(
  mapStateToProps,
  null
)(PortfolioReview);
