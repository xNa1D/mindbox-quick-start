import React from "react";
import { Container, Grid, GridColumn, Icon } from "semantic-ui-react";

const Footer = () => {
  return (
    <div>
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div>
            Поддержка и вопросы:
            <div>
              <a href="https://mindbox.slack.com/archives/C01G12FQQ0Z">
                #mindbox-quick-start
              </a>
            </div>
          </div>
          <div>
            <div>
              <Icon name="code" /> with <Icon name="heart" color="red" />
            </div>
            <div>
              by <a href="https://github.com/peter-nikitin">Petr Nikitin</a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
