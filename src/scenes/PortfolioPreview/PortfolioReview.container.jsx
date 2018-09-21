import React, { Component } from "react";
import { css, cx } from "react-emotion";
import { relative } from "path";
import Heading from "../../components/Heading";
import Container from "../../components/Container";
import Button from "../../components/Button";
import { fontSize } from "../../styles/typography";
import spacing from "../../styles/spacing";
import AssistText from "../../components/AssistText";

function buildBarCss(holding, index) {
  return css`
    position: absolute;
    top: 0;
    width: 100%;
    overflow-y: hidden;
    opacity: 0;
    height: 0;
    /* transform-origin: center top; */
    transition: height 0.3s ease-out ${Math.max(0, index - (index - 0.6))}s,
      opacity 1s ease-in;
    background-color: ${BAR_COLORS[index]};

    &.animate {
      height: ${holding.weight * 2.25}%;
      opacity: 1;
    }
  `;
}

const BAR_COLORS = ["#711d45", "#78e0f0", "#f1cf89", "#ee995d"];
class PortfolioReview extends Component {
  state = { animateBar: false };

  componentDidMount() {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => this.setState({ animateBar: true }))
    );
  }

  render() {
    console.log("helo", this.props.location.state);
    const data = this.props.location.state;

    return (
      <div>
        <Container
          isColumn
          xAlign="center"
          className={css`
            background-color: #f5f5f5;
            padding: ${spacing.space3} 0;
            margin-bottom: ${spacing.space2};
          `}
        >
          <div style={{ maxWidth: "23em", paddingBottom: spacing.space1 }}>
            Based on your answers, we recommend the
          </div>
          <div
            className={css`
              font-weight: 700;
              font-size: ${fontSize.subHeading};
              padding-bottom: ${spacing.space3};
            `}
          >
            {data.portfolio.name}
          </div>
          <Button
            className={css`
              margin-bottom: ${spacing.space1};
            `}
          >
            Open My Account
          </Button>
          <AssistText>Question? Chat with us</AssistText>
        </Container>
        <div
          className={css`
            position: relative;
            left: 50px;
            margin-bottom: ${spacing.space3};

            &::before {
              content: "";
              border-left: 1px solid rgba(0, 0, 0, 0.68);
              position: absolute;
              top: -133px;
              bottom: -6px;
              left: -10px;
            }
          `}
        >
          <Heading tag="h4">Allocation</Heading>

          {/* <Heading style={{ fontWeight: 500 }}>Allocation</div> */}
        </div>
        <Container
          xAlign="space-around"
          className={css`
            min-height: 400px;
          `}
        >
          {data.holdings.map((holding, i) => (
            <div
              className={css`
                flex-basis: 20%;
              `}
            >
              <div
                className={css`
                  text-align: center;
                `}
              >
                <div style={{ fontWeight: 400 }}>{holding.assetClass}</div>
                <div>{`${holding.weight}%`}</div>
              </div>
              <div
                style={{ position: "relative", height: "100%", width: "100%" }}
              >
                <div
                  className={cx(
                    css`
                      ${buildBarCss(holding, i)};
                    `,
                    { animate: this.state.animateBar }
                  )}
                />
              </div>
            </div>
          ))}
        </Container>
        <Button style={{ float: "right" }} outline>
          About this Portfolio
        </Button>
      </div>
    );
  }
}

export default PortfolioReview;
